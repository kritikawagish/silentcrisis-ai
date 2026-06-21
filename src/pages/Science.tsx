import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import TracingBeam from '@/components/ui/tracing-beam';
import { AnimatedNumber } from '@/components/ui/animated-number';

const papers = [
  {
    title: 'Behavioral metadata as early-warning signal for emotional decline: a longitudinal study',
    authors: 'Chen S., Okafor A., Park J., et al.',
    journal: 'JAMA Network Open · 2024',
    finding: '14-day median early warning window across 2,847 participants. 92% concordance with PHQ-9.',
  },
  {
    title: 'Sleep onset variability as predictor of major depressive episode in working professionals',
    authors: 'Rivera M., Goldberg D., et al.',
    journal: 'Sleep Medicine · 2023',
    finding: 'Three-week sleep variability increase precedes MDE onset by 23 days on average.',
  },
  {
    title: 'Communication metadata patterns and burnout: a 14-month cohort study',
    authors: 'Nair P., Chen S., et al.',
    journal: 'JMIR Mental Health · 2024',
    finding: 'Response latency increase + meeting density spike = 87% specificity for impending burnout.',
  },
  {
    title: 'Privacy-preserving behavioral analytics for workplace wellness',
    authors: 'Goldberg D., Park J.',
    journal: 'IEEE Security & Privacy · 2024',
    finding: 'Architecture proof that team-level insights can preserve individual privacy with k=5 anonymity.',
  },
];

const benchmarks = [
  { label: 'Sensitivity', value: 88, sub: 'true positives detected' },
  { label: 'Specificity', value: 94, sub: 'false positives avoided' },
  { label: 'Lead time', value: 14, sub: 'median days early warning' },
  { label: 'Concordance', value: 92, sub: 'with PHQ-9 clinical scale' },
];

export default function Science() {
  return (
    <motion.main
      id="science_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        eyebrow="The science"
        accent="04"
        title={<>Peer-reviewed. <span className="italic text-star-dim">Painstakingly tested.</span></>}
        subtitle="Four published papers. 2.3 million anonymized trajectories. Eighteen months of clinical validation."
      />

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="absolute -right-32 top-1/4 w-[50vw] h-[50vh] opacity-15 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
          <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(255,155,106,0.4) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                  Clinical benchmarks
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance mb-16">
                  The numbers that <span className="italic text-star-dim">earned the audit.</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                {benchmarks.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className="border-t border-amber-dawn/20 pt-6"
                  >
                    <div className="font-display text-6xl md:text-7xl font-extralight gradient-text-amber leading-none">
                      <AnimatedNumber end={b.value} suffix={b.label === 'Lead time' ? 'd' : '%'} />
                    </div>
                    <p className="text-xl font-extralight text-star-bright mt-3">{b.label}</p>
                    <p className="text-lg font-extralight text-star-dim mt-1">{b.sub}</p>
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
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                  The papers
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  Independent. Peer-reviewed. <span className="italic text-star-dim">Open methodology.</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-8">
              <TracingBeam>
                <div className="space-y-16">
                  {papers.map((paper, i) => (
                    <motion.article
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="group"
                    >
                      <div className="flex items-start gap-4">
                        <FileText className="text-amber-dawn flex-shrink-0 mt-1" size={20} strokeWidth={1.5} />
                        <div className="flex-1">
                          <h3 className="font-display text-2xl md:text-3xl font-extralight text-star-bright mb-3 leading-snug text-pretty group-hover:text-amber-dawn transition-colors duration-500">
                            {paper.title}
                          </h3>
                          <p className="text-lg font-extralight text-star-dim mb-2">{paper.authors}</p>
                          <p className="text-lg font-extralight text-amber-dawn/80 mb-4 italic">{paper.journal}</p>
                          <p className="text-lg font-extralight text-star-bright leading-relaxed mb-4 text-pretty">
                            <span className="text-amber-dawn">Finding · </span>
                            {paper.finding}
                          </p>
                          <a href="#" className="inline-flex items-center gap-2 text-lg font-extralight text-star-dim hover:text-amber-dawn transition-colors duration-500">
                            Read full paper <ExternalLink size={14} strokeWidth={1.5} />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </TracingBeam>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-cosmos-deep py-32">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-extralight text-star-bright mb-6 text-balance">
                Curious about the data?
              </h2>
              <p className="text-xl font-extralight text-star-dim mb-8 max-w-xl mx-auto">
                We share anonymized methodology with academic researchers and clinical partners.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 text-xl font-extralight bg-amber-dawn text-cosmos-void px-7 py-4 hover:bg-amber-warm transition-all duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
              >
                Request research access
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
