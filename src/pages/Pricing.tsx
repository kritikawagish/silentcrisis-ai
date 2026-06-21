import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import FAQ from '@/components/ui/faq-section';

const tiers = [
  {
    name: 'Personal',
    price: 'Free',
    desc: '30 days, then $9/month. Cancel anytime.',
    features: [
      'Personal wellness dashboard',
      'Calendar + 1 communication integration',
      'AI early-warning engine',
      '6 intervention types',
      'Full data export & delete',
      'Email support',
    ],
    cta: 'Start free trial',
    ctaLink: '/dashboard',
    highlight: false,
    color: 'amber-dawn',
  },
  {
    name: 'Personal Plus',
    price: '$19',
    period: '/month',
    desc: 'For people who want the full quiet watch.',
    features: [
      'Everything in Personal',
      'All sleep & health integrations',
      'All 12 intervention types',
      'Trusted contact escalation',
      'Therapist handoff network',
      'Priority support',
      '14-month historical view',
    ],
    cta: 'Choose Plus',
    ctaLink: '/dashboard',
    highlight: true,
    color: 'amber-dawn',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Wellness intelligence for teams of 50+.',
    features: [
      'Everything in Plus, for every employee',
      'Anonymized team analytics',
      'HR & wellness program integration',
      'Custom integrations',
      'Dedicated success manager',
      'On-premise deployment available',
      'SOC 2 / HIPAA documentation',
    ],
    cta: 'Talk to sales',
    ctaLink: '/contact',
    highlight: false,
    color: 'violet-signal',
  },
];

const faqItems = [
  { number: '01', question: 'Is the free trial really free?', answer: 'Yes — no credit card required. You get full Personal-tier access for 30 days, including the 14-day baseline and 16 days of active monitoring. We will email before any charge.' },
  { number: '02', question: 'Can I switch between tiers?', answer: 'Anytime. Upgrade and the difference is prorated. Downgrade and the change takes effect at the end of your current billing cycle. No traps.' },
  { number: '03', question: 'Do you offer student or nonprofit pricing?', answer: 'Yes. 50% off Personal Plus for verified students. Nonprofits get Enterprise at Personal Plus pricing per employee, with a 12-month minimum.' },
  { number: '04', question: 'What about enterprise security requirements?', answer: 'We provide a complete security packet including SOC 2 Type II report, HIPAA BAA, penetration test summaries, and on-request architecture review with your security team.' },
];

export default function Pricing() {
  return (
    <motion.main
      id="pricing_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        eyebrow="Pricing"
        accent="06"
        title={<>Honest pricing. <span className="italic text-star-dim">No surprises.</span></>}
        subtitle="Start free for 30 days. Upgrade when you're ready. Cancel anytime."
      />

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="absolute -right-32 top-1/3 w-[40vw] h-[60vh] opacity-15 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
          <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(255,155,106,0.4) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {tiers.map((tier, i) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className={`relative glass-strong p-10 h-full flex flex-col transition-all duration-500 ${
                      tier.highlight ? 'border-2 border-amber-dawn/50' : 'border border-star-bright/10'
                    }`}
                  >
                    {tier.highlight && (
                      <span className="absolute -top-4 left-8 bg-amber-dawn text-cosmos-void text-lg font-extralight uppercase tracking-wide-cosmic px-4 py-1 rotate-[-2deg]">
                        Most chosen
                      </span>
                    )}
                    <h3 className="font-display text-3xl font-extralight text-star-bright mb-3">{tier.name}</h3>
                    <p className="text-lg font-extralight text-star-dim mb-6">{tier.desc}</p>
                    <div className="mb-8">
                      <span className="font-display text-6xl font-extralight gradient-text-amber leading-none">
                        {tier.price}
                      </span>
                      {tier.period && <span className="text-xl font-extralight text-star-dim ml-2">{tier.period}</span>}
                    </div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="text-aurora-green mt-1 flex-shrink-0" size={16} strokeWidth={1.5} />
                          <span className="text-lg font-extralight text-star-bright leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={tier.ctaLink}
                      className={`group inline-flex items-center justify-center gap-3 text-xl font-extralight px-7 py-4 transition-all duration-500 mt-auto ${
                        tier.highlight
                          ? 'bg-amber-dawn text-cosmos-void hover:bg-amber-warm'
                          : tier.color === 'violet-signal'
                          ? 'bg-violet-signal text-cosmos-void hover:bg-violet-deep'
                          : 'border border-star-bright/20 text-star-bright hover:border-amber-dawn/60 hover:text-amber-dawn'
                      }`}
                      style={tier.highlight || tier.color === 'violet-signal' ? { clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' } : undefined}
                    >
                      {tier.cta}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-void py-32 overflow-hidden">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-9">
              <FAQ items={faqItems} title="Pricing questions." subtitle="The honest answers." />
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
