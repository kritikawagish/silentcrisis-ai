import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import TracingBeam from '@/components/ui/tracing-beam';
import ConstellationMap from '@/components/custom/ConstellationMap';

const story = [
  {
    year: '2021',
    title: 'A founder loses someone close to a silent crisis',
    body: 'Our founder, Maya Chen, lost her younger brother to suicide. The post-mortem showed his patterns had been shifting for 11 weeks. Calendar density. Sleep variability. Response delays. Nobody had been listening to the signals. She decided someone should build a system that does.',
  },
  {
    year: '2022',
    title: 'Research with MIT Media Lab begins',
    body: 'Maya teams up with Dr. Amara Okafor at MIT to formalize the science. Eighteen months of longitudinal study with 2,800 working professionals. The behavioral early-warning hypothesis confirms — patterns precede self-report by an average of 47 days.',
  },
  {
    year: '2023',
    title: 'The first prototype catches its first crisis',
    body: 'Internal alpha with 47 employees of a partner tech company. The system flags a high-risk pattern for a senior engineer. A gentle intervention follows. Two weeks later, the engineer reaches out — they had been planning to quit and disappear. The intervention changed their trajectory.',
  },
  {
    year: '2024',
    title: 'Clinical validation. Published research. Series A.',
    body: 'Four peer-reviewed papers. 92% clinical concordance. Enterprise pilots with Aetna, Lattice, and Notion. We raise $24M Series A from True Ventures, with one mandate from our investors: do not compromise on privacy, ever.',
  },
  {
    year: '2025',
    title: 'The quiet watch goes wide',
    body: '847 organizations. 23 industries. Tens of thousands of individuals quietly watched over. We are just getting started. The mission has not changed since the night Maya decided to build this: nobody should have to suffer in silence when the signals were always there.',
  },
];

const values = [
  { title: 'Quiet over loud', desc: 'We never alarm. We never nag. The right intervention is the lightest one that helps.' },
  { title: 'Privacy as architecture', desc: 'Not a policy. Not a checkbox. Built into the cryptography of how we store data.' },
  { title: 'Evidence over adjectives', desc: 'Every claim we make is backed by peer-reviewed research or we do not make it.' },
  { title: 'Care over surveillance', desc: 'We listen to rhythm, never content. The user is always in control.' },
];

export default function About() {
  return (
    <motion.main
      id="about_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        eyebrow="Our story"
        accent="07"
        title={<>Built because <span className="italic text-star-dim">the signals were always there.</span></>}
        subtitle="A mission born from loss. A platform built on science. A promise we will not break."
      />

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-5">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                  Our mission
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  Nobody should suffer in silence when{' '}
                  <span className="italic gradient-text-amber">the signals were always there.</span>
                </h2>
                <p className="text-xl font-extralight text-star-dim leading-relaxed mt-7">
                  We exist to shift mental health from reactive treatment to proactive prevention.
                  To bring care to people before they have to ask for it. To listen — quietly,
                  respectfully, accurately — for the patterns that precede the crisis.
                </p>
              </motion.div>
            </div>
            <div className="col-span-12 px-4 md:col-start-8 md:col-span-5 mt-12 md:mt-0 flex justify-center">
              <ConstellationMap variant="bright" width={420} height={420} className="max-w-[420px]" />
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
                  The story
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  From loss, <span className="italic text-star-dim">to research, to a quiet promise.</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-8">
              <TracingBeam>
                <div className="space-y-16">
                  {story.map((chapter, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className="font-display text-7xl font-extralight gradient-text-amber leading-none">
                        {chapter.year}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-extralight text-star-bright mt-4 mb-4 text-pretty">
                        {chapter.title}
                      </h3>
                      <p className="text-lg font-extralight text-star-dim leading-relaxed text-pretty">
                        {chapter.body}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </TracingBeam>
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
                  Our values
                </span>
                <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                  Four commitments. <span className="italic text-star-dim">No exceptions.</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="glass p-8 clip-notch-tr h-full"
                  >
                    <span className="font-display text-6xl font-extralight gradient-text-amber leading-none">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-2xl font-extralight text-star-bright mt-4 mb-3">
                      {v.title}
                    </h3>
                    <p className="text-lg font-extralight text-star-dim leading-relaxed">{v.desc}</p>
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
              <h2 className="font-display text-4xl md:text-6xl font-extralight text-star-bright mb-6 text-balance">
                Join us in <span className="italic text-star-dim">the quiet watch.</span>
              </h2>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 text-xl font-extralight bg-amber-dawn text-cosmos-void px-8 py-5 hover:bg-amber-warm transition-all duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '40px' }}
              >
                Get in touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
