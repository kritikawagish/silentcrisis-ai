import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '@/components/ui/animated-number';
import ConstellationMap from '@/components/custom/ConstellationMap';

export default function ProblemSection() {
  const dimmedStars = [
    { id: 0, x: 50, y: 50, size: 6 },
    { id: 1, x: 20, y: 25, size: 3, dimmed: true },
    { id: 2, x: 80, y: 30, size: 4 },
    { id: 3, x: 25, y: 75, size: 3, dimmed: true },
    { id: 4, x: 75, y: 75, size: 4, dimmed: true },
    { id: 5, x: 50, y: 12, size: 2 },
    { id: 6, x: 50, y: 88, size: 2, dimmed: true },
    { id: 7, x: 10, y: 50, size: 2 },
    { id: 8, x: 90, y: 50, size: 2, dimmed: true },
  ];

  return (
    <section
      id="home_problem"
      className="relative w-full bg-cosmos-void overflow-visible py-32"
    >
      {/* Background organic shape */}
      <div className="absolute -right-32 top-1/4 w-[60vw] h-[80vh] opacity-30 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
        <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(163,128,255,0.4) 0%, transparent 70%)' }} />
      </div>

      {/* Vertical text accent */}
      <div className="absolute left-4 md:left-8 top-20 -rotate-90 origin-top-left z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          01 / THE PROBLEM
        </span>
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-6 lg:col-start-2 lg:col-span-5 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                The unseen crisis
              </span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                Most crises don&apos;t arrive.{' '}
                <span className="italic text-star-dim">They emerge —</span>{' '}
                quietly, weeks in advance.
              </h2>
              <p className="text-xl font-extralight text-star-dim leading-relaxed max-w-xl mt-8">
                By the time someone says &ldquo;I&apos;m not okay,&rdquo; the patterns have been there
                for an average of 47 days. Sleep cycles changed. Response times slowed. Conversations
                grew shorter. The signals were always there —{' '}
                <span className="text-amber-dawn">nobody was reading them.</span>
              </p>

              <div className="mt-12 flex flex-wrap items-end gap-10">
                <div>
                  <div className="font-display text-7xl font-extralight gradient-text-amber leading-none">
                    <AnimatedNumber end={73} suffix="%" />
                  </div>
                  <p className="text-lg font-extralight text-star-dim mt-3 max-w-[200px] leading-snug">
                    of mental health crises show measurable behavioral signs weeks before escalation
                  </p>
                </div>
                <span className="text-lg font-extralight text-star-faint italic">
                  — WHO Mental Health Report, 2024
                </span>
              </div>

              <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-amber-dawn/20 text-lg font-extralight text-amber-dawn/80 rotate-[-2deg]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-dawn animate-pulse-soft" />
                Reuters · WHO Joint Brief 2024
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-start-8 md:col-span-5 lg:col-start-8 lg:col-span-5 mt-16 md:mt-0 flex justify-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <ConstellationMap
                stars={dimmedStars}
                variant="dimming"
                width={500}
                height={500}
                className="w-full max-w-[500px]"
              />
              <span className="absolute -bottom-4 right-0 text-lg font-extralight text-star-faint italic">
                4 stars dimming. Pattern detected.
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
