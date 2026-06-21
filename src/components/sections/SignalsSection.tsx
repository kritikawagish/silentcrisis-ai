import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Calendar, MessageSquare, Activity, Coffee, GitBranch } from 'lucide-react';
import SignalCard from '@/components/custom/SignalCard';
import Particles from '@/components/ui/particles';

const signals = [
  {
    icon: Moon,
    title: 'Sleep cadence',
    description: 'Subtle drift in sleep onset, wake time, and quality — the body before the mind.',
    data: [62, 65, 60, 58, 55, 52, 48, 45, 42, 40],
    status: 'watching' as const,
  },
  {
    icon: Calendar,
    title: 'Calendar density',
    description: 'Meetings stacked too tight, breaks vanishing, weekends bleeding into weekdays.',
    data: [40, 45, 50, 55, 60, 68, 75, 78, 82, 85],
    status: 'elevated' as const,
  },
  {
    icon: MessageSquare,
    title: 'Response latency',
    description: 'How quickly someone replies — and how the rhythm shifts when energy fades.',
    data: [30, 35, 40, 45, 50, 55, 62, 68, 70, 74],
    status: 'watching' as const,
  },
  {
    icon: Activity,
    title: 'Language sentiment',
    description: 'Quietly tracked tone in opt-in communication — without reading content.',
    data: [70, 68, 65, 62, 60, 58, 55, 52, 50, 48],
    status: 'normal' as const,
  },
  {
    icon: Coffee,
    title: 'Breaks taken',
    description: 'How often someone steps away. The absence of pauses is its own signal.',
    data: [50, 48, 45, 42, 38, 35, 32, 30, 28, 25],
    status: 'elevated' as const,
  },
  {
    icon: GitBranch,
    title: 'Task switching',
    description: 'Cognitive load measured through context shifts — a quiet kind of exhaustion.',
    data: [45, 48, 52, 55, 58, 62, 65, 68, 70, 72],
    status: 'watching' as const,
  },
];

export default function SignalsSection() {
  return (
    <section id="home_signals" className="relative w-full bg-cosmos-deep overflow-visible py-32">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Particles particleCount={80} particleColors={['#ff9b6a', '#a380ff']} speed={0.04} particleBaseSize={50} alphaParticles />
      </div>

      <div className="absolute right-4 md:right-8 top-20 rotate-90 origin-top-right z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          02 / SIGNALS
        </span>
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="max-w-3xl mb-20"
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                What we listen to
              </span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                Twelve quiet signals.{' '}
                <span className="italic text-star-dim">One whole picture.</span>
              </h2>
              <p className="text-xl font-extralight text-star-dim leading-relaxed mt-7 max-w-2xl">
                We don&apos;t read your messages or watch your face. We notice the rhythm —
                the pace of how you work, rest, and respond. Patterns, not content.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-lg font-extralight text-star-dim">
                <span className="font-display text-3xl text-amber-dawn/80">12</span>
                <span>signal types · 3 data sources · 0 content read</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {signals.map((signal, i) => (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SignalCard {...signal} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
