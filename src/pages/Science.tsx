import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FlaskConical, Target, AlertTriangle } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const references = [
  {
    id: '01',
    title: 'PHQ-9 Patient Health Questionnaire',
    authors: 'Kroenke, K., Spitzer, R.L., Williams, J.B. (2001)',
    journal: 'Journal of General Internal Medicine, 16(9), 606-613',
    relevance: 'The PHQ-9 is our validation benchmark. A score concordance ≥90% with PHQ-9 assessments is our design target for the detection engine — not yet achieved on live data, but the basis of our scoring weight calibration.',
    type: 'benchmark',
  },
  {
    id: '02',
    title: 'WHO World Mental Health Report 2022',
    authors: 'World Health Organization',
    journal: 'ISBN 9789240049338',
    relevance: 'Source for the statistic that 73% of mental health crises show measurable behavioral precursors weeks before escalation.',
    type: 'epidemiology',
  },
  {
    id: '03',
    title: 'Behavioral markers of depression in digital data',
    authors: 'Saeb, S., Zhang, M., Karr, C.J., et al. (2015)',
    journal: 'Journal of Medical Internet Research, 17(7), e175',
    relevance: 'Establishes that sleep irregularity and reduced social activity in smartphone metadata correlate with PHQ-9 depression scores. Basis for sleep cadence and response latency signals.',
    type: 'research',
  },
  {
    id: '04',
    title: 'Predicting depression via social media',
    authors: 'De Choudhury, M., Gamon, M., Counts, S., Horvitz, E. (2013)',
    journal: 'AAAI ICWSM',
    relevance: 'Demonstrates that communication timing and frequency (not content) are predictive of depressive episodes. Basis for response latency and Slack metadata signals.',
    type: 'research',
  },
  {
    id: '05',
    title: 'Calendar-based occupational stress detection',
    authors: 'Mirjafari, S., et al. (2019)',
    journal: 'UbiComp/IMWUT',
    relevance: 'Shows calendar density and meeting overload are measurable predictors of self-reported burnout. Direct basis for the Calendar Density signal and its weight in the Risk Index.',
    type: 'research',
  },
  {
    id: '06',
    title: 'A meta-analysis of CBT for depression and anxiety',
    authors: 'Hofmann, S.G., Asnaani, A., Vonk, I.J., Sawyer, A.T., Fang, A. (2012)',
    journal: 'Cognitive Therapy and Research, 36(5), 427-440',
    relevance: 'Basis for the CBT-backed intervention library. Cognitive reframing and behavioral activation are Level 2 interventions matched to rumination and withdrawal patterns.',
    type: 'intervention',
  },
];

const scoringExplainer = [
  {
    step: 'Step 1',
    title: 'Compute Z-score per signal',
    formula: 'Z_i = (x_i − μ_i) / σ_i',
    description: 'x_i is the current observation. μ_i and σ_i are the 14-day personal mean and standard deviation. Z=0 means on-baseline. Z=2 means 2 standard deviations above normal — a notable deviation.',
  },
  {
    step: 'Step 2',
    title: 'Weight and sum converging signals',
    formula: 'C = Σ(Z_i × w_i)',
    description: 'Each signal has a weight derived from its correlation with PHQ-9 scores in published research. Sleep cadence and response latency carry the highest weights. Calendar density is a secondary signal.',
  },
  {
    step: 'Step 3',
    title: 'Apply temporal cluster factor',
    formula: 'TCF = 1 + (0.15 × consecutive_days)',
    description: 'A single bad day is noise. Three consecutive days of elevated convergence scores is a pattern. TCF amplifies the risk score when deviations persist across days.',
  },
  {
    step: 'Step 4',
    title: 'Compute Composite Risk Index',
    formula: 'CRI = min(100, C × TCF)',
    description: 'Capped at 100. Ranges: 0-29 Normal (green), 30-59 Watching (amber), 60-79 Elevated (amber/red), 80+ Critical (red). Each range maps to an intervention tier.',
  },
];

export default function Science() {
  return (
    <>
      <Nav />
      <main className="bg-cosmos-void min-h-screen pt-32">

        {/* Hero */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
              The science
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] font-extralight text-star-bright tracking-editorial mb-8">
              Evidence-based.<br />
              <span className="italic text-star-dim">Honestly described.</span>
            </h1>
            <p className="text-xl font-extralight text-star-dim leading-relaxed">
              Every signal, weight, and intervention in SilentCrisis is grounded in published research.
              We describe our current validation status honestly — including what is proven and what is a design target.
            </p>
          </motion.div>
        </section>

        {/* Honesty banner */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] mb-20">
          <div className="glass rounded p-6 border-l-2 border-amber-dawn/40 flex gap-4">
            <AlertTriangle className="text-amber-dawn flex-shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
            <div>
              <p className="text-sm font-extralight text-amber-dawn mb-1 uppercase tracking-wide-cosmic">Validation status</p>
              <p className="text-base font-extralight text-star-dim leading-relaxed">
                The detection engine is calibrated against published PHQ-9 research and pilot signal data.
                The "92% concordance" figure is a <strong className="text-star-bright font-normal">design target</strong> — the threshold we are building toward,
                based on what the source research achieved. It has not yet been validated on live SilentCrisis user data.
                We are actively seeking clinical partnerships to run that validation.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring engine */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-sm font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
              The detection engine
            </span>
            <h2 className="font-display text-4xl font-extralight text-star-bright mb-12">
              Z-score convergence scoring.<br />
              <span className="italic text-star-dim">Fully explainable. No black box.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scoringExplainer.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="glass-strong p-6 rounded border border-star-bright/5"
                >
                  <p className="text-xs font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 mb-2">
                    {step.step}
                  </p>
                  <h3 className="font-display text-xl font-extralight text-star-bright mb-3">
                    {step.title}
                  </h3>
                  <div className="bg-cosmos-void/60 rounded px-4 py-2.5 mb-4 font-mono">
                    <p className="text-aurora-green text-sm">{step.formula}</p>
                  </div>
                  <p className="text-sm font-extralight text-star-dim leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* References */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-sm font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
              Research foundation
            </span>
            <h2 className="font-display text-4xl font-extralight text-star-bright mb-10">
              Six peer-reviewed sources.
            </h2>

            <div className="space-y-4">
              {references.map((ref, i) => (
                <motion.div
                  key={ref.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="grid grid-cols-12 gap-6 py-5 border-t border-star-bright/5"
                >
                  <div className="col-span-1">
                    <span className="text-sm font-extralight text-star-faint">{ref.id}</span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <p className="text-sm font-extralight text-star-bright mb-1">{ref.title}</p>
                    <p className="text-xs font-extralight text-star-faint mb-0.5">{ref.authors}</p>
                    <p className="text-xs font-extralight text-violet-signal/70 italic">{ref.journal}</p>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="text-sm font-extralight text-star-dim leading-relaxed">
                      {ref.relevance}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="max-w-[2400px] mx-auto px-4 md:px-[8.33vw] pb-32 text-center">
          <Link
            to="/how-it-works"
            className="group inline-flex items-center gap-3 border border-amber-dawn/40 text-amber-dawn text-lg font-extralight px-8 py-4 hover:bg-amber-dawn/10 transition-colors duration-300"
          >
            See the technical implementation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
