import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '@/components/ui/animated-number';
import InfiniteMovingCards from '@/components/ui/infinite-moving-cards';
import Particles from '@/components/ui/particles';

const testimonials = [
  {
    quote: 'SilentCrisis flagged our engineering lead nine days before he asked for medical leave. The intervention they suggested may have saved his career.',
    name: 'Sarah Chen',
    title: 'Chief People Officer, Lattice',
  },
  {
    quote: 'I didn\'t know my sleep was drifting. The dashboard showed me a pattern I couldn\'t see. Quiet, useful, never alarming.',
    name: 'Marcus Rivera',
    title: 'Software Engineer · Individual user',
  },
  {
    quote: 'The accuracy is the thing. We had a 91% concordance with our clinical assessments. This is the first wellness tool I\'ve trusted.',
    name: 'Dr. Amara Okafor',
    title: 'Director of Behavioral Health, Aetna',
  },
  {
    quote: 'We measure burnout in weeks lost. SilentCrisis turned that into days, then hours. The ROI conversation writes itself.',
    name: 'James Park',
    title: 'VP Operations, Notion',
  },
  {
    quote: 'It feels like the platform genuinely cares — not surveillance, not nagging. Just quiet attention when I need it.',
    name: 'Priya Nair',
    title: 'Product Designer · 14 months active',
  },
  {
    quote: 'Pattern recognition without content access was our deal-breaker requirement. SilentCrisis is the only platform that gets it right.',
    name: 'David Goldberg',
    title: 'CISO, fintech enterprise',
  },
];

export default function TrustSection() {
  return (
    <section id="home_trust" className="relative w-full bg-cosmos-deep overflow-hidden py-32">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Particles particleCount={100} particleColors={['#ff9b6a', '#a380ff', '#7fd9b8']} speed={0.05} particleBaseSize={60} alphaParticles />
      </div>

      <div className="absolute right-4 md:right-8 top-20 rotate-90 origin-top-right z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          06 / EVIDENCE
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
              className="max-w-3xl mb-16"
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                Evidence, not adjectives
              </span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                What the data says.{' '}
                <span className="italic text-star-dim">And what the people do.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
              {[
                { value: 847, suffix: '', label: 'organizations active', sub: 'across 23 industries' },
                { value: 92, suffix: '%', label: 'clinical concordance', sub: 'vs. PHQ-9 assessment' },
                { value: 14, suffix: ' days', label: 'average early warning', sub: 'before self-reported decline' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="border-t border-amber-dawn/20 pt-6"
                >
                  <div className="font-display text-7xl md:text-8xl font-extralight gradient-text-amber leading-none">
                    <AnimatedNumber end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xl font-extralight text-star-bright mt-4">{stat.label}</p>
                  <p className="text-lg font-extralight text-star-dim mt-1">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
      </div>
    </section>
  );
}
