import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import TracingBeam from '@/components/ui/tracing-beam';
import ConstellationMap from '@/components/custom/ConstellationMap';

const story = [
  {
    year: 'The Problem',
    title: 'Mental health crises don\'t arrive — they build silently',
    body: 'Every year, millions of people reach a breaking point that was, in hindsight, visible weeks earlier. Sleep patterns shifted. Response times slowed. Calendar density spiked. The behavioral signals were always there — nobody was reading them.',
  },
  {
    year: 'The Insight',
    title: 'Behavioral metadata is the early-warning system we\'re ignoring',
    body: 'Research from JAMA Network Open (2024) and WHO Mental Health Report shows that 73% of mental health crises have measurable behavioral precursors an average of 47 days before crisis. This is the window SilentCrisis was built to fill.',
  },
  {
    year: 'The Build',
    title: 'A hackathon MVP to prove the concept',
    body: 'SilentCrisis was built as a hackathon project to demonstrate a working behavioral early-warning system. It includes a real risk computation engine (Z-score deviation, convergence scoring, temporal clustering), NLP sentiment analysis, a self-check-in system, and an intervention library backed by CBT and ACT research.',
  },
  {
    year: 'The Vision',
    title: 'From prototype to preventive infrastructure',
    body: 'The next step: real API integrations (Google Calendar, Slack metadata, Apple HealthKit), a production backend with encrypted data persistence, clinical validation with partner organizations, and a path toward the world\'s first preventive mental health infrastructure.',
  },
];

const values = [
  { title: 'Quiet over loud', desc: 'We never alarm. We never nag. The right intervention is the lightest one that helps.' },
  { title: 'Privacy as architecture', desc: 'Not a policy. Not a checkbox. Built into the design of how we handle data.' },
  { title: 'Evidence over adjectives', desc: 'Every claim is backed by peer-reviewed research or we do not make it.' },
  { title: 'Care over surveillance', desc: 'We listen to rhythm, never content. The user is always in control.' },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT"
        title={<>Built because the signals were always there.</>}
        subtitle="A hackathon project with a real mission. A prototype with a clear path to production."
      />

      <section className="relative px-6 pb-32 max-w-5xl mx-auto">
        <TracingBeam>
          <div className="mb-20">
            <p className="text-xs tracking-widest text-star-faint uppercase mb-4">Our mission</p>
            <h2 className="text-3xl md:text-4xl font-display tracking-editorial leading-tight mb-6">
              <span className="gradient-text-amber">Nobody should suffer in silence when</span>{' '}
              <span className="text-star-bright">the signals were always there.</span>
            </h2>
            <p className="text-lg text-star-dim font-extralight max-w-2xl text-balance">
              We exist to shift mental health from reactive treatment to proactive prevention.
              To bring care to people before they have to ask for it. To listen — quietly,
              respectfully, accurately — for the patterns that precede the crisis.
            </p>
          </div>

          <div className="mb-20">
            <p className="text-xs tracking-widest text-star-faint uppercase mb-4">The story</p>
            <h2 className="text-2xl font-display tracking-editorial text-star-bright mb-10">
              From insight, to prototype, to a quiet promise.
            </h2>
            {story.map((chapter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="mb-10 pl-6 border-l border-star-faint/20"
              >
                <span className="text-amber-dawn text-sm tracking-widest">{chapter.year}</span>
                <h3 className="text-xl font-display text-star-bright mt-1 mb-2">{chapter.title}</h3>
                <p className="text-star-dim font-extralight">{chapter.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-20">
            <p className="text-xs tracking-widest text-star-faint uppercase mb-4">Our values</p>
            <h2 className="text-2xl font-display tracking-editorial text-star-bright mb-10">
              Four commitments. No exceptions.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <span className="text-amber-dawn text-xs tracking-widest">0{i + 1}</span>
                  <h4 className="text-lg font-display text-star-bright mt-2 mb-2">{v.title}</h4>
                  <p className="text-star-dim text-sm font-extralight">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </TracingBeam>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-display text-star-bright mb-6">Try the live demo.</h2>
          <Link
            to="/check-in"
            className="inline-flex items-center gap-2 bg-amber-dawn text-cosmos-void px-8 py-4 rounded-xl font-medium hover:bg-amber-warm transition-colors"
          >
            Start a check-in
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

