import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User, Building2 } from 'lucide-react';
import Aurora from '@/components/ui/aurora';
import { TextRevealCard } from '@/components/ui/text-reveal-card';

export default function FinalCTASection() {
  return (
    <section id="home_final_cta" className="relative w-full bg-cosmos-void overflow-hidden py-32">
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <Aurora colorStops={['#ff9b6a', '#a380ff', '#7fd9b8']} amplitude={1} blend={0.5} speed={0.5} />
      </div>

      <div className="absolute left-4 md:left-8 top-32 -rotate-90 origin-top-left z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          07 / BEGIN
        </span>
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                The quiet watch begins
              </span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] font-extralight text-star-bright tracking-editorial text-balance">
                You don&apos;t need to wait for a crisis{' '}
                <span className="italic gradient-text-amber">to ask for help.</span>
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-12 mb-16">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
            <TextRevealCard
              text="Before the crisis whispers..."
              revealText="early enough to help arrives."
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-6">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -6 }}
              className="glass-strong p-10 h-full border border-amber-dawn/10 hover:border-amber-dawn/40 transition-colors duration-500"
              style={{ borderRadius: '4px' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-dawn/10 flex items-center justify-center">
                  <User className="text-amber-dawn" size={20} strokeWidth={1.5} />
                </div>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn">
                  For You
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-extralight text-star-bright mb-4">
                Your own quiet observer
              </h3>
              <p className="text-lg font-extralight text-star-dim leading-relaxed mb-8">
                A personal early-warning companion that learns your rhythm and gently nudges
                when it drifts. Private. Encrypted. Yours.
              </p>
              <Link
                to="/for-individuals"
                className="group inline-flex items-center gap-3 text-xl font-extralight bg-amber-dawn text-cosmos-void px-7 py-4 hover:bg-amber-warm transition-all duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
              >
                Start free for 30 days
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          <div className="col-span-12 px-4 md:col-start-7 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-strong p-10 h-full border border-violet-signal/10 hover:border-violet-signal/40 transition-colors duration-500"
              style={{ borderRadius: '4px' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-violet-signal/10 flex items-center justify-center">
                  <Building2 className="text-violet-signal" size={20} strokeWidth={1.5} />
                </div>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal">
                  For Teams
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-extralight text-star-bright mb-4">
                Aggregate wellness intelligence
              </h3>
              <p className="text-lg font-extralight text-star-dim leading-relaxed mb-8">
                Anonymized team-level patterns for HR and wellness leaders.
                Individual privacy preserved. Organizational health visible.
              </p>
              <Link
                to="/for-teams"
                className="group inline-flex items-center gap-3 text-xl font-extralight bg-violet-signal text-cosmos-void px-7 py-4 hover:bg-violet-deep transition-all duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
              >
                Book enterprise demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
