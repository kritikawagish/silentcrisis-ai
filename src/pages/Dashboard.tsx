import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingDown, AlertCircle, Heart, Activity, Moon, Calendar,
  MessageSquare, Coffee, Brain, GitBranch, Sparkles, Bell,
  ArrowRight, RotateCcw, Database
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import WellnessSparkline from '@/components/custom/WellnessSparkline';
import RiskMeter from '@/components/custom/RiskMeter';
import ConstellationMap from '@/components/custom/ConstellationMap';
import SignalCard from '@/components/custom/SignalCard';
import InterventionTrigger from '@/components/custom/InterventionTrigger';
import { AnimatedNumber } from '@/components/ui/animated-number';

import { computeRisk, computeRiskHistory, DEFAULT_BASELINE } from '@/lib/riskEngine';
import { computeBaseline, getBaselineStatus } from '@/lib/baselineEngine';
import {
  getCheckIns, getCheckInHistory, getLatestCheckIn,
  getRiskHistory, getUserProfile, seedDemoData, clearAllData,
  type StoredCheckIn
} from '@/lib/storageEngine';
import { selectIntervention, INTERVENTION_LIBRARY } from '@/lib/interventionEngine';

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [checkIns, setCheckIns] = useState<StoredCheckIn[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  // Load data
  useEffect(() => {
    loadData();
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const existing = getCheckIns();
    setCheckIns(existing);
  };

  const handleLoadDemo = () => {
    seedDemoData();
    loadData();
    setIsDemo(true);
  };

  const handleClearData = () => {
    clearAllData();
    setCheckIns([]);
    setIsDemo(false);
  };

  // Derived computations
  const profile = getUserProfile();
  const history = useMemo(() => getCheckInHistory(), [checkIns]);
  const baseline = useMemo(() => computeBaseline(history), [history]);
  const baselineStatus = useMemo(() => getBaselineStatus(baseline.days_tracked), [baseline]);
  const latestCheckIn = useMemo(() => getLatestCheckIn(), [checkIns]);

  const currentRisk = useMemo(() => {
    if (!latestCheckIn) return null;
    return computeRisk({
      sleep_hours: latestCheckIn.sleep_hours,
      meetings: latestCheckIn.meetings,
      response_time_min: latestCheckIn.response_time_min,
      breaks: latestCheckIn.breaks,
      mood_score: latestCheckIn.mood_score,
      task_switches: latestCheckIn.task_switches,
    }, baseline);
  }, [latestCheckIn, baseline]);

  const riskHistoryData = useMemo(() => {
    return computeRiskHistory(history, baseline);
  }, [history, baseline]);

  const currentIntervention = useMemo(() => {
    if (!currentRisk) return INTERVENTION_LIBRARY[0];
    return selectIntervention(currentRisk.tier, currentRisk.signals);
  }, [currentRisk]);

  // Sparkline data from risk history
  const sparklineData = useMemo(() => {
    if (riskHistoryData.length === 0) return [50, 50, 50, 50, 50];
    // Invert risk to show as "wellness" (100 - risk)
    return riskHistoryData.map(d => 100 - d.risk);
  }, [riskHistoryData]);

  // Find intervention point (day with highest risk)
  const interventionIndex = useMemo(() => {
    if (riskHistoryData.length === 0) return 0;
    let maxRisk = 0;
    let maxIdx = 0;
    riskHistoryData.forEach((d, i) => {
      if (d.risk > maxRisk) { maxRisk = d.risk; maxIdx = i; }
    });
    return maxIdx;
  }, [riskHistoryData]);

  // Signal cards from latest check-in
  const signalCards = useMemo(() => {
    if (!currentRisk) return [];
    const iconMap: Record<string, any> = {
      sleep_hours: Moon,
      meetings: Calendar,
      response_time_min: MessageSquare,
      breaks: Coffee,
      mood_score: Brain,
      task_switches: GitBranch,
    };
    const labelMap: Record<string, string> = {
      sleep_hours: 'Sleep cadence',
      meetings: 'Calendar density',
      response_time_min: 'Response latency',
      breaks: 'Breaks taken',
      mood_score: 'Mood sentiment',
      task_switches: 'Task switching',
    };
    const descMap: Record<string, (s: any) => string> = {
      sleep_hours: (s) => `${s.value.toFixed(1)}h vs baseline ${s.baseline_mean.toFixed(1)}h (${s.z_score > 0 ? '+' : ''}${s.z_score.toFixed(1)}σ)`,
      meetings: (s) => `${s.value} meetings vs baseline ${s.baseline_mean.toFixed(1)} (${s.z_score > 0 ? '+' : ''}${s.z_score.toFixed(1)}σ)`,
      response_time_min: (s) => `${s.value}min avg vs baseline ${s.baseline_mean.toFixed(0)}min (${s.z_score > 0 ? '+' : ''}${s.z_score.toFixed(1)}σ)`,
      breaks: (s) => `${s.value} breaks vs baseline ${s.baseline_mean.toFixed(1)} (${s.z_score > 0 ? '+' : ''}${s.z_score.toFixed(1)}σ)`,
      mood_score: (s) => `Score ${s.value.toFixed(0)} vs baseline ${s.baseline_mean.toFixed(0)} (${s.z_score > 0 ? '+' : ''}${s.z_score.toFixed(1)}σ)`,
      task_switches: (s) => `${s.value} switches vs baseline ${s.baseline_mean.toFixed(0)} (${s.z_score > 0 ? '+' : ''}${s.z_score.toFixed(1)}σ)`,
    };

    return currentRisk.signals.map(s => {
      // Build historical data for this signal from check-in history
      const signalHistory = checkIns.map(c => (c as any)[s.signal] as number).slice(-10);

      return {
        icon: iconMap[s.signal] || Activity,
        title: labelMap[s.signal] || s.signal,
        description: descMap[s.signal]?.(s) || `Z-score: ${s.z_score.toFixed(2)}`,
        status: s.status as 'normal' | 'watching' | 'elevated',
        data: signalHistory.length > 0 ? signalHistory : [50, 50, 50, 50, 50],
      };
    });
  }, [currentRisk, checkIns]);

  // Risk history entries for the log
  const riskLog = useMemo(() => getRiskHistory().slice(-5).reverse(), [checkIns]);

  // ─── EMPTY STATE ───────────────────────────────────────────────
  if (checkIns.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow="DASHBOARD"
          title={<>The dashboard, in motion.</>}
          subtitle="Your personal wellness constellation — powered by real data, computed by the risk engine."
        />
        <section className="relative px-6 pb-32 max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 space-y-6">
            <Database className="w-12 h-12 text-star-faint mx-auto" />
            <h2 className="text-2xl font-display text-star-bright">No check-in data yet</h2>
            <p className="text-star-dim max-w-md mx-auto">
              The dashboard needs at least one daily check-in to compute your risk constellation.
              Start a check-in, or load the demo dataset to see the engine in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/check-in"
                className="flex items-center justify-center gap-2 bg-amber-dawn text-cosmos-void font-medium px-6 py-3 rounded-xl hover:bg-amber-warm transition-colors"
              >
                Start your first check-in
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleLoadDemo}
                className="flex items-center justify-center gap-2 glass text-star-bright px-6 py-3 rounded-xl hover:bg-cosmos-surface transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-dawn" />
                Load 17-day demo data
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ─── FULL DASHBOARD ────────────────────────────────────────────
  const tierColors = {
    WATCHING: '#7fd9b8',
    ELEVATED: '#ff9b6a',
    CRITICAL: '#ff6b8a',
  };

  return (
    <>
      <PageHeader
        eyebrow="DASHBOARD"
        title={<>The dashboard, in motion.</>}
        subtitle="Live data. Real computation. Your personal risk constellation."
      />

      <section className="relative px-6 pb-32 max-w-7xl mx-auto">

        {/* User header */}
        <div className="flex items-center justify-between mb-8 glass rounded-2xl p-4 px-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-dawn to-violet-signal flex items-center justify-center text-cosmos-void font-bold text-sm">
              {(profile?.name || 'U')[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-star-bright font-medium">{profile?.name || 'User'}</h3>
              <p className="text-xs text-star-dim">
                Day {checkIns.length} · {baselineStatus.message}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-star-faint">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {isDemo && (
              <button
                onClick={handleClearData}
                className="text-xs text-star-faint hover:text-warn-pink flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Clear demo
              </button>
            )}
          </div>
        </div>

        {/* ─── Top row: 3 KPI panels ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Risk Score */}
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-xs tracking-widest text-star-dim uppercase mb-2">Current Risk</p>
            <RiskMeter value={currentRisk?.risk_index || 0} size={140} />
            {currentRisk && (
              <p className="text-xs text-star-faint mt-2">
                {currentRisk.convergence_count} signal{currentRisk.convergence_count !== 1 ? 's' : ''} deviating ·
                cluster factor {currentRisk.temporal_cluster_factor}×
              </p>
            )}
          </div>

          {/* Wellness Sparkline */}
          <div className="glass rounded-2xl p-6">
            <p className="text-xs tracking-widest text-star-dim uppercase mb-2">
              Wellness · {checkIns.length} days
            </p>
            <WellnessSparkline
              data={sparklineData}
              interventionIndex={interventionIndex}
              width={400}
              height={140}
              showLabels={true}
            />
          </div>

          {/* Stats */}
          <div className="glass rounded-2xl p-6">
            <p className="text-xs tracking-widest text-star-dim uppercase mb-4">This period</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-star-dim text-sm">Check-ins</span>
                <span className="text-star-bright text-xl font-display">
                  <AnimatedNumber value={checkIns.length} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-star-dim text-sm">Avg sleep</span>
                <span className="text-star-bright text-xl font-display">
                  {(history.reduce((s, h) => s + h.sleep_hours, 0) / Math.max(history.length, 1)).toFixed(1)}h
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-star-dim text-sm">Avg risk</span>
                <span className="text-star-bright text-xl font-display">
                  {riskHistoryData.length > 0
                    ? (riskHistoryData.reduce((s, d) => s + d.risk, 0) / riskHistoryData.length).toFixed(0)
                    : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-star-dim text-sm">Baseline</span>
                <span className="text-sm" style={{ color: baselineStatus.established ? '#7fd9b8' : '#ff9b6a' }}>
                  {baselineStatus.established ? '✓ Established' : `${baselineStatus.progress}%`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Middle row: Constellation + Intervention ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs tracking-widest text-star-dim uppercase mb-2">Your constellation · live</p>
            <ConstellationMap width={450} height={350} variant="labeled"
              stars={currentRisk?.signals.map((s, i) => ({
                id: i,
                x: [50, 20, 80, 25, 75, 50][i] || 50,
                y: [50, 25, 30, 75, 75, 12][i] || 50,
                size: Math.max(2, Math.min(6, Math.abs(s.z_score) * 2 + 2)),
                label: s.signal.replace(/_/g, ' ').split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
                dimmed: s.status === 'normal',
              })) || undefined}
            />
            <p className="text-xs text-star-faint mt-2">
              Star brightness = deviation magnitude. Hover to interact.
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <p className="text-xs tracking-widest text-star-dim uppercase mb-2">Active intervention</p>
            <InterventionTrigger />
          </div>
        </div>

        {/* ─── Signal grid ─────────────────────────────── */}
        <div className="mb-8">
          <h3 className="text-sm tracking-widest text-star-dim uppercase mb-4 flex items-center gap-2">
            Behavioral signals
            <span className="text-xs text-star-faint font-normal normal-case tracking-normal">
              — computed from your check-in data
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {signalCards.map((s, i) => (
              <SignalCard key={i} {...s} />
            ))}
          </div>
        </div>

        {/* ─── Risk History Log ─────────────────────────── */}
        {riskLog.length > 0 && (
          <div className="glass rounded-2xl p-6 mb-8">
            <h3 className="text-sm tracking-widest text-star-dim uppercase mb-4">Risk computation log</h3>
            <div className="space-y-3">
              {riskLog.map((entry, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-star-faint/10 last:border-0">
                  <span className="text-xs text-star-faint w-20">{entry.date}</span>
                  <div className="flex-1">
                    <span className="text-sm text-star-bright">
                      Risk: {entry.risk_index.toFixed(0)}
                    </span>
                    <span
                      className="ml-2 text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${tierColors[entry.tier as keyof typeof tierColors] || '#7fd9b8'}20`,
                        color: tierColors[entry.tier as keyof typeof tierColors] || '#7fd9b8',
                      }}
                    >
                      {entry.tier}
                    </span>
                  </div>
                  <span className="text-xs text-star-faint">
                    {entry.convergence_count} signals
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Actions ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/check-in"
            className="flex-1 flex items-center justify-center gap-2 bg-amber-dawn text-cosmos-void font-medium py-3 rounded-xl hover:bg-amber-warm transition-colors"
          >
            New check-in
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/science"
            className="flex-1 flex items-center justify-center gap-2 glass text-star-bright py-3 rounded-xl hover:bg-cosmos-surface transition-colors"
          >
            How the engine works
          </Link>
        </div>
      </section>
    </>
  );
}

