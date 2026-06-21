import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Heart, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import InterventionTrigger from '@/components/custom/InterventionTrigger';
import WellnessSparkline from '@/components/custom/WellnessSparkline';
import RiskMeter from '@/components/custom/RiskMeter';

const onboardingSteps = [
  { num: '01', title: 'Connect quietly', desc: 'Link your calendar and one communication app. Two minutes. No deep questions.' },
  { num: '02', title: 'Baseline learns', desc: 'For 14 days, we listen. You do nothing. The platform learns your normal rhythm.' },
  { num: '03', title: 'Insight begins', desc: 'On day 15, your personal constellation comes alive. The watch begins.' },
];

const personalFeatures = [
  { title: 'Private by design', desc: 'Your data is encrypted with your personal key. Even we cannot read it.' },
  { title: 'No content access', desc: 'We see when you sent a message, never what you said. Metadata only.' },
  { title: 'One-tap delete', desc: 'Export everything. Delete everything. Anytime, no questions.' },
  { title: 'Gentle by default', desc: 'Interventions are always opt-in. Nothing alarms. Nothing nags.' },
];

export default function ForIndividuals() {
  return (
    <motion.main
      id="individuals_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        eyebrow="For You"
        accent="02"
        title={<>A quiet companion <span className="italic text-star-dim">for your own mind.</span></>}
        subtitle="Your patterns. Your data. Your early warning. Free for 30 days. No card required."
      >
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-3 text-xl font-extralight bg-amber-dawn text-cosmos-void px-7 py-4 hover:bg-amber-warm transition-all duration-500"
            style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
          >
            Start free for 30 days
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
          </Link>
          <Link
            to="/science"
            className="text-xl font-extralight text-star-bright border border-star-bright/20 px-7 py-4 hover:border-amber-dawn/60 hover:text-amber-dawn transition-all duration-500"
          >
            See the science
          </Link>
        </div>
      </PageHeader>

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="absolute -left-32 top-1/4 w-[40vw] h-[60vh] opacity-15 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 40% 50%)' }}>
          <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(255,155,106,0.4) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 mb-16">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                  Three steps. One promise.
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  The onboarding is the easiest <span className="italic text-star-dim">two minutes of your week.</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {onboardingSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    className="glass p-8 clip-notch-tr h-full"
                  >
                    <span className="font-display text-8xl font-extralight gradient-text-amber leading-none">
                      {step.num}
                    </span>
                    <h3 className="font-display text-2xl font-extralight text-star-bright mt-4 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-lg font-extralight text-star-dim leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-void py-32 overflow-hidden">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                  What it feels like
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance mb-7">
                  An intervention that <span className="italic text-star-dim">actually feels gentle.</span>
                </h2>
                <p className="text-xl font-extralight text-star-dim leading-relaxed">
                  Click the button below to see what happens when SilentCrisis notices something.
                  This is the actual interaction — soft, optional, and over in seconds.
                </p>
              </motion.div>
            </div>
            <div className="col-span-12 px-4 md:col-start-8 md:col-span-5 mt-10 md:mt-0">
              <InterventionTrigger autoTrigger />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 mb-16">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                  Your personal dashboard
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  What you&apos;ll actually look at.
                </h2>
              </motion.div>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="glass p-7 clip-notch-tr md:col-span-2 h-full">
                  <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn mb-3 block">
                    Wellness trajectory · 17 days
                  </span>
                  <WellnessSparkline />
                </div>
                <div className="glass p-7 clip-notch-tr flex flex-col items-center justify-center h-full">
                  <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal mb-4 block text-center">
                    Today
                  </span>
                  <RiskMeter value={28} size={180} label="Current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-void py-32 overflow-hidden">
        <div className="absolute -right-20 top-1/4 w-[40vw] h-[60vh] opacity-15 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
          <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(163,128,255,0.4) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-5">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <div className="inline-flex items-center gap-2 mb-6">
                  <Lock className="text-amber-dawn" size={20} strokeWidth={1.5} />
                  <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/80">
                    Privacy isn&apos;t a policy. It&apos;s the architecture.
                  </span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance mb-6">
                  Your data. <span className="italic text-star-dim">Truly yours.</span>
                </h2>
                <p className="text-xl font-extralight text-star-dim leading-relaxed">
                  HIPAA-compliant, SOC 2 Type II certified, encrypted with personal keys we mathematically
                  cannot access. You can see everything, export everything, delete everything.
                </p>
              </motion.div>
            </div>
            <div className="col-span-12 px-4 md:col-start-8 md:col-span-5 mt-10 md:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalFeatures.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="glass p-5 h-full"
                  >
                    <Check className="text-aurora-green mb-3" size={18} strokeWidth={1.5} />
                    <h4 className="font-display text-xl font-extralight text-star-bright mb-2">{f.title}</h4>
                    <p className="text-lg font-extralight text-star-dim leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-deep py-32">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 text-center">
              <Heart className="text-amber-dawn mx-auto mb-6" size={32} strokeWidth={1.2} />
              <h2 className="font-display text-4xl md:text-6xl font-extralight text-star-bright mb-6 text-balance">
                The quiet watch is waiting for you.
              </h2>
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-3 text-xl font-extralight bg-amber-dawn text-cosmos-void px-8 py-5 hover:bg-amber-warm transition-all duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '40px' }}
              >
                Begin your 30 days free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </Link>
              <p className="text-lg font-extralight text-star-faint mt-5">
                No card required · Cancel anytime · 14-day baseline
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
