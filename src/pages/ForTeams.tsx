import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Users, Shield, Building, BarChart3 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { AnimatedNumber } from '@/components/ui/animated-number';
import BentoGrid from '@/components/ui/bento-grid-creator';

const roiStats = [
  { value: 4200, prefix: '$', label: 'per employee', sub: 'annual burnout cost saved' },
  { value: 67, suffix: '%', label: 'reduction', sub: 'in unplanned mental health leave' },
  { value: 9, suffix: 'x', label: 'ROI', sub: 'documented at enterprise scale' },
];

const integrations = [
  { name: 'Slack', desc: 'Metadata only · no content read' },
  { name: 'Microsoft Teams', desc: 'Activity rhythm · presence signals' },
  { name: 'Google Workspace', desc: 'Calendar density · meeting patterns' },
  { name: 'Outlook 365', desc: 'Calendar density · meeting patterns' },
  { name: 'Workday', desc: 'PTO patterns · leave indicators' },
  { name: 'BambooHR', desc: 'Wellness program integration' },
  { name: 'Lyra Health', desc: 'Direct professional handoff' },
  { name: 'Modern Health', desc: 'Coaching escalation pathway' },
];

const compliance = ['HIPAA', 'SOC 2 Type II', 'GDPR', 'ISO 27001', 'CCPA', 'PIPEDA'];

export default function ForTeams() {
  return (
    <motion.main
      id="teams_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        eyebrow="For Teams & HR"
        accent="03"
        title={<>Wellness intelligence <span className="italic text-star-dim">at the speed of prevention.</span></>}
        subtitle="Aggregate team-level patterns. Individual privacy preserved. Burnout caught weeks before it costs you a person."
      >
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 text-xl font-extralight bg-violet-signal text-cosmos-void px-7 py-4 hover:bg-violet-deep transition-all duration-500"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
          >
            Book enterprise demo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
          </Link>
          <Link
            to="/pricing"
            className="text-xl font-extralight text-star-bright border border-star-bright/20 px-7 py-4 hover:border-violet-signal/60 hover:text-violet-signal transition-all duration-500"
          >
            View pricing
          </Link>
        </div>
      </PageHeader>

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="absolute -right-32 top-1/4 w-[50vw] h-[60vh] opacity-20 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
          <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(163,128,255,0.5) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 mb-16">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal/80 block mb-6">
                  The economics of prevention
                </span>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  Burnout costs companies <span className="italic text-star-dim">an average of $4,200 per employee per year.</span> We change that math.
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {roiStats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    className="border-t border-violet-signal/20 pt-6"
                  >
                    <div className="font-display text-7xl md:text-8xl font-extralight gradient-text-amber leading-none">
                      <AnimatedNumber end={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} />
                    </div>
                    <p className="text-xl font-extralight text-star-bright mt-4">{s.label}</p>
                    <p className="text-lg font-extralight text-star-dim mt-1">{s.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-void py-32 overflow-hidden">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 mb-16">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal/80 block mb-6">
                  Integrations
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  Lives where your team already <span className="italic text-star-dim">does its quiet work.</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {integrations.map((int, i) => (
                  <motion.div
                    key={int.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="glass p-6 h-full hover:border-violet-signal/30 transition-colors duration-500"
                  >
                    <h4 className="font-display text-2xl font-extralight text-star-bright mb-2">{int.name}</h4>
                    <p className="text-lg font-extralight text-star-dim leading-relaxed">{int.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-5">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <div className="inline-flex items-center gap-2 mb-6">
                  <Shield className="text-violet-signal" size={20} strokeWidth={1.5} />
                  <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal/80">
                    Enterprise security
                  </span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance mb-6">
                  Compliance built in. <span className="italic text-star-dim">Not bolted on.</span>
                </h2>
                <p className="text-xl font-extralight text-star-dim leading-relaxed">
                  Individual data is mathematically inaccessible to anyone but the user — not even your CISO.
                  Aggregated team views require a minimum cohort of 5 people. We pass independent annual audits.
                </p>
              </motion.div>
            </div>
            <div className="col-span-12 px-4 md:col-start-8 md:col-span-5 mt-10 md:mt-0">
              <div className="grid grid-cols-2 gap-4">
                {compliance.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="glass-strong p-6 flex items-center justify-center text-center hover:border-violet-signal/40 transition-colors duration-500"
                  >
                    <span className="font-display text-2xl font-extralight text-star-bright">{c}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-void py-32">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 text-center">
              <Users className="text-violet-signal mx-auto mb-6" size={32} strokeWidth={1.2} />
              <h2 className="font-display text-4xl md:text-6xl font-extralight text-star-bright mb-4 text-balance">
                Your people deserve <span className="italic text-star-dim">attention before crisis.</span>
              </h2>
              <p className="text-xl font-extralight text-star-dim mb-8 max-w-2xl mx-auto">
                Custom enterprise pricing scales with team size and integration depth. Pilots typically take 6 weeks.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 text-xl font-extralight bg-violet-signal text-cosmos-void px-8 py-5 hover:bg-violet-deep transition-all duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '40px' }}
              >
                Schedule enterprise demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
