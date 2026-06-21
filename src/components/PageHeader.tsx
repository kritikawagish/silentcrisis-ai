import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Particles from './ui/particles';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  accent?: string;
}

export default function PageHeader({ eyebrow, title, subtitle, children, accent = '00' }: PageHeaderProps) {
  return (
    <header className="relative w-full bg-cosmos-void overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Particles particleCount={120} particleColors={['#ff9b6a', '#a380ff']} speed={0.05} particleBaseSize={60} alphaParticles />
      </div>

      <div className="absolute -right-32 top-1/4 w-[50vw] h-[60vh] opacity-20 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
        <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(163,128,255,0.5) 0%, transparent 70%)' }} />
      </div>

      <div className="absolute left-4 md:left-8 bottom-12 -rotate-90 origin-bottom-left z-10 pointer-events-none">
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-star-faint/40">
          {accent} / PAGE
        </span>
      </div>

      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-px bg-amber-dawn" />
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/80">
                  {eyebrow}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] font-extralight text-star-bright tracking-editorial text-balance max-w-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xl md:text-2xl font-extralight text-star-dim leading-relaxed mt-8 max-w-2xl text-pretty">
                  {subtitle}
                </p>
              )}
              {children && <div className="mt-10">{children}</div>}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
