import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingDown,
  Moon,
  Calendar,
  MessageSquare,
  Coffee,
  Sparkles,
  Bell,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import WellnessSparkline from '@/components/custom/WellnessSparkline';
import RiskMeter from '@/components/custom/RiskMeter';
import ConstellationMap from '@/components/custom/ConstellationMap';
import SignalCard from '@/components/custom/SignalCard';
import InterventionTrigger from '@/components/custom/InterventionTrigger';
import { AnimatedNumber } from '@/components/ui/animated-number';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const signals = [
  {
    icon: Moon,
    title: 'Sleep cadence',
    description: 'Variability up 18% over baseline.',
    status: 'watching' as const,
    data: [62, 65, 60, 58, 55, 52, 48, 45, 42, 40],
  },
  {
    icon: Calendar,
    title: 'Calendar density',
    description: 'Meeting load 22% above your norm.',
    status: 'elevated' as const,
    data: [40, 45, 50, 55, 60, 68, 75, 78, 82, 85],
  },
  {
    icon: MessageSquare,
    title: 'Response latency',
    description: 'Reply window widening gradually.',
    status: 'watching' as const,
    data: [30, 35, 40, 45, 50, 55, 62, 68, 70, 74],
  },
  {
    icon: Coffee,
    title: 'Breaks taken',
    description: 'Down to 1.2/day from your usual 3.4.',
    status: 'elevated' as const,
    data: [50, 48, 45, 42, 38, 35, 32, 30, 28, 25],
  },
];

const interventionLog = [
  { id: 'log-1', time: '12 min ago', type: 'Box breathing',      outcome: 'Engaged · 4 min',              color: '#7fd9b8' },
  { id: 'log-2', time: '4h ago',     type: 'Calendar protect',   outcome: 'Accepted · 90 min protected',  color: '#7fd9b8' },
  { id: 'log-3', time: '1d ago',     type: 'Reflection prompt',  outcome: 'Completed',                    color: '#7fd9b8' },
  { id: 'log-4', time: '3d ago',     type: 'Connection nudge',   outcome: 'Reached out to support',       color: '#7fd9b8' },
  { id: 'log-5', time: '5d ago',     type: 'Cognitive reframe',  outcome: 'Completed reflection',         color: '#7fd9b8' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.main
      id="dashboard_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-cosmos-void min-h-screen"
    >
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <PageHeader
        eyebrow="Live demo · Sample user: Maya R."
        accent="05"
        title={
          <>
            The dashboard,{' '}
            <span className="italic text-star-dim">in motion.</span>
          </>
        }
        subtitle="This is the actual interface. Live data, real interactions, sample patterns showing how the system catches early decline."
      />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <section className="relative w-full bg-cosmos-void pb-32">
        <div className="relative max-w-[2400px] mx-auto px-4 md:px-8">

          {/* User identity bar */}
          <div className="grid grid-cols-12 mb-8">
            <div className="col-span-12 md:col-start-2 md:col-span-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-strong p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-dawn to-violet-signal flex items-center justify-center text-cosmos-void font-display text-2xl shrink-0">
                    M
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extralight text-star-bright">
                      Maya Rivera
                    </p>
                    <p className="text-lg font-extralight text-star-dim">
                      Day 47 · Baseline established · Active monitoring
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-dawn animate-pulse-soft shrink-0" />
                  <span className="text-lg font-extralight text-amber-dawn">
                    Pattern shift detected ·{' '}
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Top KPI row ─────────────────────────────────────────────── */}
          {/*
            FIX: Original layout placed col-start-2 only on the first panel
            and left the remaining two without explicit column positions,
            causing the 12-column grid to overflow (1 + 3 + 5 + 3 = 12 cols
            consumed, but col-start-2 on the first shifts everything by 1 so
            the last panel spills past column 12).

            Solution: remove col-start on individual panels and instead wrap
            the three panels in a shared 10-column container (col-start-2,
            col-span-10) that internally uses a 10-column sub-grid. This
            keeps all panels perfectly aligned with the user bar above and
            signal grid below.
          */}
          <div className="grid grid-cols-12 gap-5 mb-5">
            <div className="col-span-12 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-10 gap-5 h-full">

                {/* Risk meter */}
                <div className="md:col-span-3">
                  <div className="glass p-7 clip-notch-tr h-full flex flex-col items-center justify-center">
                    <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal mb-4">
                      Current Risk
                    </span>
                    <RiskMeter value={42} size={180} label="" showValue />
                    <p className="text-lg font-extralight text-star-dim text-center mt-4">
                      Up from 28 last week
                    </p>
                  </div>
                </div>

                {/* Wellness sparkline */}
                <div className="md:col-span-4">
                  <div className="glass p-7 clip-notch-tr h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn">
                        Wellness · 17 days
                      </span>
                      <TrendingDown
                        className="text-amber-dawn shrink-0"
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>
                    {/* Pass width as a hint only — the SVG internally uses width="100%" */}
                    <WellnessSparkline width={500} height={180} />
                    <p className="text-lg font-extralight text-star-dim mt-4">
                      Intervention on day 9 turned the trajectory. Recovery at +23%.
                    </p>
                  </div>
                </div>

                {/* Weekly stats */}
                <div className="md:col-span-3">
                  <div className="glass p-7 clip-notch-tr h-full flex flex-col">
                    <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-aurora-green mb-4">
                      This week
                    </span>
                    <div className="flex-1 space-y-5">
                      <div>
                        <div className="font-display text-5xl font-extralight gradient-text-amber leading-none">
                          <AnimatedNumber end={5} />
                        </div>
                        <p className="text-lg font-extralight text-star-dim mt-1">
                          Interventions delivered
                        </p>
                      </div>
                      <div>
                        <div className="font-display text-5xl font-extralight gradient-text-amber leading-none">
                          <AnimatedNumber end={4} />
                        </div>
                        <p className="text-lg font-extralight text-star-dim mt-1">
                          Engaged with (80%)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Middle row: Constellation + Active intervention ──────────── */}
          {/*
            FIX: Original used md:col-span-6 and md:col-span-5 without a
            shared col-start-2 wrapper, misaligning these panels with the
            rest of the page. Now both panels live inside the same 10-column
            wrapper used by every other row.
          */}
          <div className="grid grid-cols-12 gap-5 mb-5">
            <div className="col-span-12 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-10 gap-5 h-full">

                {/* Constellation map */}
                <div className="md:col-span-6">
                  <div className="glass p-7 clip-notch-tr h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal">
                        Your constellation · live
                      </span>
                      <Sparkles
                        className="text-violet-signal shrink-0"
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex justify-center">
                      <ConstellationMap variant="bright" width={400} height={400} />
                    </div>
                    <p className="text-lg font-extralight text-star-dim text-center mt-4">
                      Hover the stars — your signals respond.
                    </p>
                  </div>
                </div>

                {/* Active intervention */}
                <div className="md:col-span-4">
                  <div className="glass p-7 clip-notch-tr h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn">
                        Active intervention
                      </span>
                      <Bell
                        className="text-amber-dawn shrink-0"
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>
                    <InterventionTrigger autoTrigger />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Behavioral signal grid ───────────────────────────────────── */}
          <div className="grid grid-cols-12 gap-5 mb-5">
            <div className="col-span-12 md:col-start-2 md:col-span-10">
              <h3 className="font-display text-3xl font-extralight text-star-bright mb-5">
                Behavioral signals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {signals.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <SignalCard {...s} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Intervention log ─────────────────────────────────────────── */}
          {/*
            FIX: Using stable `id` keys from each log entry instead of the
            array index `i`, preventing React reconciliation issues when the
            list is reordered or updated.
          */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-start-2 md:col-span-10">
              <div className="glass p-7 clip-notch-tr">
                <h3 className="font-display text-3xl font-extralight text-star-bright mb-6">
                  Recent intervention log
                </h3>
                <div className="space-y-4">
                  {interventionLog.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="flex items-center gap-4 pb-4 border-b border-star-bright/5 last:border-0"
                    >
                      <span className="text-lg font-extralight text-star-faint min-w-[100px]">
                        {item.time}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-extralight text-star-bright truncate">
                          {item.type}
                        </p>
                        <p className="text-lg font-extralight text-star-dim truncate">
                          {item.outcome}
                        </p>
                      </div>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: `0 0 8px ${item.color}`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </motion.main>
  );
}
