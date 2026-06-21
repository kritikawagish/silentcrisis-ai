import React from 'react';
import { motion } from 'framer-motion';
import { Timeline } from '@/components/ui/timeline';
import { Spotlight } from '@/components/ui/spotlight-new';

const stages = [
  {
    title: 'Listen',
    content: (
      <div>
        <h4 className="font-display text-2xl md:text-3xl font-extralight text-star-bright mb-4">
          Continuous, consented signal capture
        </h4>
        <p className="text-lg font-extralight text-star-dim leading-relaxed mb-5">
          With explicit permission, SilentCrisis observes 12 behavioral patterns through
          calendars, communication metadata, sleep/activity APIs, and optional self-check-ins.
          Content is never read — only the rhythm of behavior.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Calendar API', 'Slack metadata', 'Apple Health', 'Google Fit', 'Self check-ins'].map(s => (
            <span key={s} className="text-lg font-extralight text-amber-dawn/70 border border-amber-dawn/20 px-3 py-1">
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Baseline',
    content: (
      <div>
        <h4 className="font-display text-2xl md:text-3xl font-extralight text-star-bright mb-4">
          Personal pattern learning · 14 days
        </h4>
        <p className="text-lg font-extralight text-star-dim leading-relaxed">
          Two weeks of quiet observation. We learn YOUR rhythm — not a generic norm. Your typical
          sleep window, your usual response cadence, your meeting density when you&apos;re thriving.
          The baseline is uniquely yours, refined continuously.
        </p>
      </div>
    ),
  },
  {
    title: 'Detect',
    content: (
      <div>
        <h4 className="font-display text-2xl md:text-3xl font-extralight text-star-bright mb-4">
          AI pattern recognition · real-time
        </h4>
        <p className="text-lg font-extralight text-star-dim leading-relaxed">
          Our temporal pattern recognition model — trained on 2.3M anonymized wellness trajectories
          — identifies deviation clusters that precede emotional decline by 14–47 days. Not single
          metrics, but constellations of subtle shifts.
        </p>
      </div>
    ),
  },
  {
    title: 'Respond',
    content: (
      <div>
        <h4 className="font-display text-2xl md:text-3xl font-extralight text-star-bright mb-4">
          Contextual, gentle intervention
        </h4>
        <p className="text-lg font-extralight text-star-dim leading-relaxed">
          When patterns suggest building risk, SilentCrisis delivers the lightest effective response
          — a breathing exercise, a calendar suggestion, a connection to your support network,
          or in elevated cases, a discreet handoff to professional resources.
        </p>
      </div>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="home_how" className="relative w-full bg-cosmos-void overflow-hidden py-32">
      <Spotlight />

      <div className="absolute left-4 md:left-8 top-32 -rotate-90 origin-top-left z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          03 / METHOD
        </span>
      </div>

      <div className="absolute right-10 top-20 z-10 pointer-events-none">
        <span className="font-display text-[10rem] md:text-[14rem] font-extralight text-star-faint/[0.04] leading-none">
          4
        </span>
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-16"
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                The architecture of attention
              </span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                Four stages.{' '}
                <span className="italic text-star-dim">One quiet promise:</span>{' '}
                we&apos;ll see it before you do.
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
            <Timeline data={stages} />
          </div>
        </div>
      </div>
    </section>
  );
}
