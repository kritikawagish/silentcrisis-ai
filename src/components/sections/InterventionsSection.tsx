import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Wind, MessageCircle, Calendar, Users, Brain, Phone } from 'lucide-react';

const interventions = [
  { icon: Wind, title: 'Box breathing', duration: '4 min', desc: 'Slow cardiac coherence reset for stress spikes.', tier: 'Level 1' },
  { icon: Brain, title: 'Cognitive reframe', duration: '6 min', desc: 'Guided thought restructuring for rumination patterns.', tier: 'Level 2' },
  { icon: Calendar, title: 'Calendar protect', duration: 'instant', desc: 'Block 90 minutes of recovery time on overloaded days.', tier: 'Level 1' },
  { icon: MessageCircle, title: 'Reflection prompt', duration: '3 min', desc: 'A single, gentle question delivered at the right moment.', tier: 'Level 1' },
  { icon: Users, title: 'Connection nudge', duration: '— min', desc: 'Suggest reaching out to a designated support contact.', tier: 'Level 2' },
  { icon: Phone, title: 'Professional handoff', duration: 'on request', desc: 'Discreet escalation to in-network therapy resources.', tier: 'Level 3' },
];

export default function InterventionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home_interventions" className="relative w-full bg-cosmos-void overflow-hidden py-32">
      <div className="absolute left-4 md:left-8 top-20 -rotate-90 origin-top-left z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          05 / INTERVENT.
        </span>
      </div>

      <div className="absolute -right-32 top-1/3 w-[40vw] h-[60vh] opacity-15 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
        <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(127,217,184,0.4) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="max-w-3xl mb-16"
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                When pattern meets care
              </span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                A library of gentle responses.{' '}
                <span className="italic text-star-dim">The lightest touch that helps.</span>
              </h2>
              <p className="text-xl font-extralight text-star-dim leading-relaxed mt-7">
                Every intervention is matched to the pattern detected — and to the person.
                We escalate only when truly needed. No alarms. No overreach.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 border border-amber-dawn/20 text-lg font-extralight text-amber-dawn/70 rotate-[-1deg]">
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-green" />
                Backed by CBT · ACT · Mindfulness research
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="relative overflow-x-auto hide-scrollbar mt-8 pb-8">
        <div className="flex gap-5 px-4 md:px-[8.33vw] min-w-max">
          {interventions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="w-[320px] md:w-[360px] flex-shrink-0 glass clip-notch-tr p-7 group hover:border-amber-dawn/40 transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded flex items-center justify-center bg-cosmos-elevated/40 group-hover:bg-amber-dawn/10 transition-colors duration-500">
                  <item.icon className="text-amber-dawn" size={20} strokeWidth={1.2} />
                </div>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint">
                  {item.tier}
                </span>
              </div>
              <h3 className="font-display text-2xl font-extralight text-star-bright mb-2">{item.title}</h3>
              <p className="text-lg font-extralight text-star-dim leading-relaxed mb-6">{item.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-star-bright/5">
                <span className="text-lg font-extralight text-star-faint">{item.duration}</span>
                <span className="text-lg font-extralight text-amber-dawn group-hover:translate-x-1 transition-transform duration-500">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
