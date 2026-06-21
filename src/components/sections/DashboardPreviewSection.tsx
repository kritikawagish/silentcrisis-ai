import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown, AlertCircle, Heart } from 'lucide-react';
import { MaskExpand } from '@/components/ui/mask-expand';
import WellnessSparkline from '@/components/custom/WellnessSparkline';
import RiskMeter from '@/components/custom/RiskMeter';

const panels = [
  {
    label: 'Wellness Trend',
    icon: TrendingDown,
    color: '#ff9b6a',
    content: (
      <div className="p-8 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn">
            Wellness Trend · 17 days
          </span>
        </div>
        <h3 className="font-display text-3xl font-extralight text-star-bright mb-4">
          Decline caught, recovery underway
        </h3>
        <p className="text-lg font-extralight text-star-dim mb-6">
          Sleep + calendar + response signals showed convergent decline on day 9. Intervention
          delivered. Recovery trajectory at 23%.
        </p>
        <div className="flex-1 flex items-end">
          <WellnessSparkline />
        </div>
      </div>
    ),
  },
  {
    label: 'Risk Status',
    icon: AlertCircle,
    color: '#a380ff',
    content: (
      <div className="p-8 h-full flex flex-col items-center justify-center">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-violet-signal mb-6">
          Composite Risk Index
        </span>
        <RiskMeter value={32} size={220} label="Current Status" />
        <p className="text-lg font-extralight text-star-dim text-center mt-6 max-w-xs">
          Down from 67 last week. Two interventions delivered. Sleep cadence normalizing.
        </p>
      </div>
    ),
  },
  {
    label: 'Intervention Log',
    icon: Heart,
    color: '#7fd9b8',
    content: (
      <div className="p-8 h-full flex flex-col">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-aurora-green mb-6">
          Recent Interventions
        </span>
        <div className="space-y-4 flex-1">
          {[
            { time: '2h ago', type: 'Box breathing', outcome: 'Engaged · 4 min' },
            { time: '1d ago', type: 'Calendar suggestion', outcome: 'Accepted · 90 min protected' },
            { time: '3d ago', type: 'Connection nudge', outcome: 'Reached out to support contact' },
            { time: '5d ago', type: 'Cognitive reframe', outcome: 'Completed reflection' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 pb-3 border-b border-star-bright/5"
            >
              <span className="text-lg font-extralight text-star-faint min-w-[60px]">{item.time}</span>
              <div className="flex-1">
                <p className="text-lg font-extralight text-star-bright">{item.type}</p>
                <p className="text-lg font-extralight text-star-dim">{item.outcome}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-aurora-green" />
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function DashboardPreviewSection() {
  return (
    <section id="home_dashboard_preview" className="relative w-full bg-cosmos-deep overflow-visible py-32">
      <div className="absolute -left-32 top-1/4 w-[50vw] h-[50vh] opacity-25 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 40% 50%)' }}>
        <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(255,155,106,0.4) 0%, transparent 70%)' }} />
      </div>

      <div className="absolute right-4 md:right-8 top-20 rotate-90 origin-top-right z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          04 / VISUALIZE
        </span>
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12 gap-y-12 items-center">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                The dashboard
              </span>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance">
                Patterns made visible.{' '}
                <span className="italic text-star-dim">Stories made clear.</span>
              </h2>
              <p className="text-xl font-extralight text-star-dim leading-relaxed mt-7">
                Three panels you actually look at. Not 40 dashboards you scroll past.
                Hover to expand any panel.
              </p>
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-3 mt-10 text-xl font-extralight bg-amber-dawn text-cosmos-void px-7 py-4 hover:bg-amber-warm transition-all duration-500"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
              >
                Open live demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          <div className="col-span-12 px-4 md:col-start-7 md:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-[520px]"
            >
              <MaskExpand
                orientation="horizontal"
                collapsedSize={90}
                expandedSize={520}
                gap={8}
                borderRadius={8}
                defaultExpanded={0}
              >
                {panels.map((panel, i) => (
                  <div key={i} className="w-full h-full glass-strong rounded relative">
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                      <panel.icon style={{ color: panel.color }} size={16} strokeWidth={1.5} />
                      <span className="text-lg font-extralight uppercase tracking-wide-cosmic" style={{ color: panel.color }}>
                        {panel.label}
                      </span>
                    </div>
                    <div className="pt-12 h-full">{panel.content}</div>
                  </div>
                ))}
              </MaskExpand>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
