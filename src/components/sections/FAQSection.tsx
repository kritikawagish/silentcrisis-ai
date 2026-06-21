import React from 'react';
import { motion } from 'framer-motion';
import FAQ from '@/components/ui/faq-section';

const faqItems = [
  {
    number: '01',
    question: 'Does SilentCrisis read my messages or watch my face?',
    answer: 'No. We only observe behavioral metadata — when you sent a message, not what you said. When you opened your calendar, not what was scheduled. We listen to the rhythm of behavior, never its content. Camera access is never requested.',
  },
  {
    number: '02',
    question: 'How accurate is the early warning?',
    answer: 'In our 14-month clinical study with Aetna, SilentCrisis showed 92% concordance with PHQ-9 clinical depression assessments and detected emerging decline an average of 14 days before self-reported crisis. The science is published peer-reviewed in JAMA Network Open.',
  },
  {
    number: '03',
    question: 'Who can see my individual data in a team deployment?',
    answer: 'Only you. Team dashboards show aggregated, anonymized patterns at the team level (5+ people minimum). Your manager will never see your personal wellness data. Period. This is enforced cryptographically — not just by policy.',
  },
  {
    number: '04',
    question: 'What integrations do you require?',
    answer: 'Minimum: calendar (Google or Outlook) and one communication tool (Slack, Teams, or email metadata). Optional: Apple Health, Google Fit, Oura, or Whoop for sleep and activity signals. The more sources, the earlier the warning — but the minimum stack works well.',
  },
  {
    number: '05',
    question: 'What happens when a high-risk pattern is detected?',
    answer: 'You get a gentle, private notification with the suggested intervention. Nobody else is alerted unless YOU configure a trusted contact for elevated risk levels (this is opt-in and you choose who). For critical patterns, we surface professional resources — but the choice to engage is always yours.',
  },
  {
    number: '06',
    question: 'How is this different from Calm, Headspace, or Lyra?',
    answer: 'Those are reactive — you open them when you already know something is wrong. SilentCrisis is proactive — it notices first and brings care to you. We integrate with Lyra and others for professional referrals, but we&apos;re the early-warning layer that sits before treatment.',
  },
];

export default function FAQSection() {
  return (
    <section id="home_faq" className="relative w-full bg-cosmos-void overflow-hidden py-32">
      <div className="absolute right-4 md:right-8 top-20 rotate-90 origin-top-right z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          08 / QUESTIONS
        </span>
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                Frequently asked
              </span>
              <FAQ
                items={faqItems}
                title="Quietly asked."
                subtitle="The questions everyone has — and the answers we&apos;re proud to give."
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
