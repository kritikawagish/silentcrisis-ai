import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Activity, Bell, Shield, Calculator, TrendingUp } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const stages = [
  {
    number: '01',
    label: 'Listen',
    title: 'Continuous, consented signal capture',
    icon: Database,
    color: '#ff9b6a',
    description: 'With explicit permission, SilentCrisis observes 12 behavioral patterns through metadata APIs. Content is never accessed — only timing, frequency, and rhythm.',
    technical: 'Google Calendar API returns event count, duration, and start/end timestamps. Slack Events API provides message send timestamps and thread response gaps — no message bodies. Apple Health and Google Fit return aggregated sleep and activity data via HealthKit/Fit REST APIs.',
    tags: ['Google Calendar API', 'Slack Events API', 'Apple HealthKit', 'Google Fit REST', 'Self check-ins'],
  },
  {
    number: '02',
    label: 'Baseline',
    title: 'Personal pattern learning · 14 days',
    icon: TrendingUp,
    color: '#a380ff',
    description: 'Over 14 days, the system computes your personal baseline for each signal. This is your rhythm — not a population average. The baseline re-calibrates weekly.',
    technical: 'For each signal, the baseline is the rolling 14-day mean (μ) and standard deviation (σ). This uses simple descriptive statistics — not machine learning. The personalisation comes from using your own history, not a trained model. This approach was chosen for interpretability and clinical reproducibility.',
    tags: ['Rolling 14-day mean', 'Standard deviation (σ)', 'Per-user, not population', 'Weekly recalibration'],
  },
  {
    number: '03',
    label: 'Detect',
    title: 'Z-score deviation scoring · real-time',
    icon: Calculator,
    color: '#7fd9b8',
    description: 'When new data arrives, each signal is scored as a Z-score against your baseline. When 3 or more signals deviate simultaneously, the Composite Risk Index rises.',
    technical: 'For each signal i: Z_i = (x_i − μ_i) / σ_i. Convergence score = Σ(Z_i × w_i) where weights are tuned against PHQ-9 concordance data from the Aetna pilot. Composite Risk Index = min(100, convergence_score × temporal_cluster_factor). Temporal cluster factor amplifies scores when deviations persist for 3+ consecutive days. This is statistical signal processing, not machine learning — it is transparent, explainable, and clinically auditable.',
    tags: ['Z-score per signal', 'Weighted convergence sum', 'Temporal cluster factor', 'Risk Index 0–100'],
  },
  {
    number: '04',
    label: 'Respond',
    title: 'Contextual, gentle intervention',
    icon: Bell,
    color: '#f4ecdf',
    description: 'When patterns suggest building risk, SilentCrisis delivers the lightest effective response. The choice to engage is always the user\'s.',
    technical: 'Intervention matching is rule-based: each risk level (Watching: 30–59, Elevated: 60–79, Critical: 80+) maps to an intervention tier (1–3). Tier 1 interventions (box breathing, reflection prompt) fire first. Tier 2 (cognitive reframe, calendar protect) fire if Tier 1 was declined or risk persists. Tier 3 (professional handoff) is always opt-in.',
    tags: ['Level 1–3 escalation', 'Rule-based matching', 'CBT / ACT backed', 'Always opt-in'],
  },
];

const signals = [
  { name: 'Sleep cadence', source: 'Apple Health / Oura', metric: 'Sleep onset drift vs baseline' },
  { name: 'Calendar density', source: 'Google Calendar API', metric: 'Meetings/week vs personal norm' },
  { name: 'Response latency', source: 'Slack Events API', metric: 'Reply time distribution shift' },
  { name: 'Language sentiment', source: 'Opt-in self check-in', metric: 'Tone score vs baseline' },
  { name: 'Breaks taken', source: 'Google Calendar API', metric: 'Gap length between events' },
  { name: 'Task switching', source: 'Calendar API', metric: 'Context-shift frequency' },
  { name: 'Weekend activity', source: 'Calendar API + Health', metric: 'Work events on Sat/Sun' },
  { name: 'Meeting duration', source: 'Google Calendar API', metric: 'Avg duration vs baseline' },
  { name: 'Activity level', source: 'Apple Health / Google Fit', metric: 'Step count vs baseline' },
  { name: 'Sleep duration', source: 'Apple Health / Oura', metric: 'Total sleep vs baseline' },
  { name: 'HRV (optional)', source: 'Oura / Whoop', metric: 'Heart rate variability trend' },
  { name: 'Check-in frequency', source: 'Self check-in', metric: 'Skipped check-ins (signal itself)' },
];

export default function HowItWorks() {
  return (
    <>
      <Nav />
      <main className="bg-cosmos-void min-h-screen pt-32">

        {/* Hero */}
        <section className="relative max-w-[2400px] mx-auto px-4 md:px-[8.33vw] pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
              The architecture
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] font-extralight text-star-bright tracking-editorial mb-8">
              Four stages.{' '}
              <span className="italic text-star-dim">One quiet promise:</span>
              <br />we'll see it before you do.
            </h1>
            <p className="text-xl font-extralight text-star-dim leading-relaxed max-w-2xl">
              SilentCrisis uses statistical signal processing — not a black-box ML model —
              so every risk score is explainable, auditable, and clinically grounded.
            </p>
          </motion.div>
        </section>

        {/* Technical honesty banner */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] mb-20">
          <div className="border-l-2 border-amber-dawn/40 pl-6 py-2">
            <p className="text-base font-extralight text-star-dim leading-relaxed">
              <span className="text-amber-dawn font-normal">Technical transparency: </span>
              The detection engine is Z-score statistical deviation scoring, not machine learning.
              We chose this because it is interpretable, reproducible, and directly auditable against
              clinical benchmarks like the PHQ-9. A simple, honest method that works is better than a
              complex model that can't be explained to a clinician.
            </p>
          </div>
        </section>

        {/* 4 stages */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] mb-32">
          <div className="space-y-0">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="grid grid-cols-12 gap-6 items-start py-16 border-t border-star-bright/5"
              >
                {/* Left: stage label */}
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center"
                      style={{ backgroundColor: `${stage.color}15` }}>
                      <stage.icon style={{ color: stage.color }} size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-extralight uppercase tracking-wide-cosmic"
                        style={{ color: stage.color }}>
                        {stage.number} / {stage.label}
                      </p>
                    </div>
                  </div>
                  <h2 className="font-display text-2xl font-extralight text-star-bright leading-tight">
                    {stage.title}
                  </h2>
                </div>

                {/* Middle: description */}
                <div className="col-span-12 md:col-span-4">
                  <p className="text-base font-extralight text-star-dim leading-relaxed mb-5">
                    {stage.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stage.tags.map(tag => (
                      <span key={tag}
                        className="text-xs font-extralight px-2.5 py-1 border border-star-bright/10 text-star-dim">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: technical detail */}
                <div className="col-span-12 md:col-span-5">
                  <div className="glass rounded p-5 border-l-2"
                    style={{ borderLeftColor: `${stage.color}40` }}>
                    <p className="text-xs font-extralight uppercase tracking-wide-cosmic mb-3"
                      style={{ color: stage.color }}>
                      Technical implementation
                    </p>
                    <p className="text-sm font-extralight text-star-dim leading-relaxed font-mono">
                      {stage.technical}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 12 signals table */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-sm font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
              All 12 signals
            </span>
            <h2 className="font-display text-4xl font-extralight text-star-bright mb-10">
              What we measure. Exactly.
            </h2>

            <div className="border border-star-bright/5 rounded overflow-hidden">
              <div className="grid grid-cols-3 gap-0 bg-cosmos-deep px-5 py-3">
                <p className="text-xs font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70">Signal</p>
                <p className="text-xs font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70">Data source</p>
                <p className="text-xs font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70">Metric computed</p>
              </div>
              {signals.map((sig, i) => (
                <div key={sig.name}
                  className={`grid grid-cols-3 gap-0 px-5 py-3.5 border-t border-star-bright/5
                    ${i % 2 === 0 ? 'bg-cosmos-void' : 'bg-cosmos-deep/30'}`}>
                  <p className="text-sm font-extralight text-star-bright">{sig.name}</p>
                  <p className="text-sm font-extralight text-star-dim">{sig.source}</p>
                  <p className="text-sm font-extralight text-star-dim">{sig.metric}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-l-2 border-aurora-green/40 pl-5 py-1">
              <p className="text-sm font-extralight text-star-dim">
                <span className="text-aurora-green">Zero content access.</span>{' '}
                Calendar event titles, message content, and health specifics are never read.
                Only counts, durations, and timestamps are processed.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Privacy */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] mb-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <span className="text-sm font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                Privacy architecture
              </span>
              <h2 className="font-display text-4xl font-extralight text-star-bright mb-6">
                Metadata only.<br />
                <span className="italic text-star-dim">Always.</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'OAuth 2.0 scoped to read-only calendar and health metadata' },
                  { icon: Shield, text: 'No message content, calendar titles, or health details stored' },
                  { icon: Shield, text: 'Team deployments: cryptographic anonymisation, minimum group size 5' },
                  { icon: Shield, text: 'Individual data is never visible to managers or HR admins' },
                  { icon: Shield, text: '90-day metadata TTL — data auto-purges after 3 months' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon className="text-aurora-green flex-shrink-0 mt-0.5" size={14} strokeWidth={1.5} />
                    <p className="text-sm font-extralight text-star-dim">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 md:col-start-7 md:col-span-6">
              <div className="glass-strong p-8 rounded border border-star-bright/5">
                <p className="text-sm font-extralight uppercase tracking-wide-cosmic text-violet-signal mb-4">
                  Current build status
                </p>
                {[
                  { status: 'working', label: 'Google Calendar OAuth integration', note: 'Live — connect on dashboard' },
                  { status: 'working', label: 'Z-score risk scoring engine', note: 'Fully implemented' },
                  { status: 'working', label: 'Composite Risk Index UI', note: 'Real-time display' },
                  { status: 'working', label: 'Tiered intervention library', note: '6 interventions across 3 levels' },
                  { status: 'mocked', label: 'Slack Events API', note: 'Architecture ready, OAuth pending' },
                  { status: 'mocked', label: 'Apple Health / Google Fit', note: 'UI complete, API pending' },
                  { status: 'planned', label: 'Persistent user accounts', note: 'Next milestone' },
                  { status: 'planned', label: 'Push notifications', note: 'Next milestone' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-star-bright/5 last:border-0">
                    <p className="text-sm font-extralight text-star-bright">{item.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extralight text-star-faint">{item.note}</span>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0
                        ${item.status === 'working' ? 'bg-aurora-green'
                          : item.status === 'mocked' ? 'bg-amber-dawn'
                          : 'bg-violet-signal/50'}`} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-star-bright/5">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-aurora-green" /><span className="text-xs text-star-faint">Working</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-dawn" /><span className="text-xs text-star-faint">Mocked</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-signal/50" /><span className="text-xs text-star-faint">Planned</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] pb-32 text-center">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-3 bg-amber-dawn text-cosmos-void text-lg font-extralight px-8 py-4 hover:bg-amber-warm transition-colors duration-300"
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)', paddingRight: '36px' }}
          >
            See it live in the dashboard
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

