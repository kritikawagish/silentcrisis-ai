import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';

interface HeroEntranceProps {
  onComplete: () => void;
}

export default function HeroEntrance({ onComplete }: HeroEntranceProps) {
  const [show, setShow] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const isReload = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    const played = sessionStorage.getItem('entrancePlayed');
    if (isReload || !played) {
      setShow(true);
      sessionStorage.setItem('entrancePlayed', 'true');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (!show) return;
    if (!svgRef.current) return;

    // Animate stars appearing
    anime({
      targets: svgRef.current.querySelectorAll('.entrance-star'),
      opacity: [0, 1],
      scale: [0, 1],
      delay: anime.stagger(120, { start: 600 }),
      duration: 900,
      easing: 'easeOutCubic',
    });

    // Animate lines drawing
    const lines = svgRef.current.querySelectorAll<SVGLineElement>('.entrance-line');
    lines.forEach((line, i) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
    });
    anime({
      targets: lines,
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 0.6],
      delay: anime.stagger(80, { start: 1800 }),
      duration: 1200,
      easing: 'easeInOutCubic',
    });

    // Animate logo text in at end
    anime({
      targets: '.entrance-brand-text',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: 3200,
      duration: 900,
      easing: 'easeOutCubic',
    });

    const final = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(final);
      anime.remove(svgRef.current?.querySelectorAll('.entrance-star') || []);
      anime.remove(svgRef.current?.querySelectorAll('.entrance-line') || []);
      anime.remove('.entrance-brand-text');
    };
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="hero_entrance"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-cosmos-void flex items-center justify-center overflow-hidden"
        >
          {/* Aurora glow background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2] }}
            transition={{ duration: 4.5, times: [0, 0.5, 1] }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255,155,106,0.15) 0%, rgba(163,128,255,0.08) 35%, transparent 70%)',
            }}
          />

          {/* Drifting nebula */}
          <motion.div
            animate={{ rotate: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 30% 60%, rgba(163,128,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(255,155,106,0.08) 0%, transparent 50%)',
            }}
          />

          {/* Constellation */}
          <svg ref={svgRef} viewBox="0 0 100 100" className="relative z-10 w-[280px] md:w-[420px] overflow-visible">
            <defs>
              <radialGradient id="entStarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffd4b0" />
                <stop offset="50%" stopColor="#ff9b6a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff9b6a" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Constellation lines */}
            <line className="entrance-line" x1="50" y1="50" x2="22" y2="28" stroke="#a380ff" strokeWidth="0.18" opacity="0" />
            <line className="entrance-line" x1="50" y1="50" x2="78" y2="28" stroke="#a380ff" strokeWidth="0.18" opacity="0" />
            <line className="entrance-line" x1="50" y1="50" x2="26" y2="72" stroke="#a380ff" strokeWidth="0.18" opacity="0" />
            <line className="entrance-line" x1="50" y1="50" x2="74" y2="72" stroke="#a380ff" strokeWidth="0.18" opacity="0" />
            <line className="entrance-line" x1="22" y1="28" x2="78" y2="28" stroke="#ff9b6a" strokeWidth="0.18" opacity="0" />
            <line className="entrance-line" x1="26" y1="72" x2="74" y2="72" stroke="#ff9b6a" strokeWidth="0.18" opacity="0" />
            <line className="entrance-line" x1="22" y1="28" x2="26" y2="72" stroke="#ff9b6a" strokeWidth="0.18" opacity="0" />
            <line className="entrance-line" x1="78" y1="28" x2="74" y2="72" stroke="#ff9b6a" strokeWidth="0.18" opacity="0" />

            {/* Stars */}
            {[
              { x: 50, y: 50, r: 2.5 },
              { x: 22, y: 28, r: 1.6 },
              { x: 78, y: 28, r: 1.6 },
              { x: 26, y: 72, r: 1.6 },
              { x: 74, y: 72, r: 1.6 },
              { x: 50, y: 14, r: 1 },
              { x: 50, y: 86, r: 1 },
              { x: 12, y: 50, r: 1 },
              { x: 88, y: 50, r: 1 },
            ].map((s, i) => (
              <g key={i} className="entrance-star" style={{ opacity: 0, transformBox: 'fill-box', transformOrigin: 'center' }}>
                <circle cx={s.x} cy={s.y} r={s.r * 3} fill="url(#entStarGlow)" opacity="0.5" />
                <circle cx={s.x} cy={s.y} r={s.r * 0.6} fill="#ffd4b0" />
              </g>
            ))}
          </svg>

          {/* Brand mark */}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 entrance-brand-text opacity-0">
            <p className="font-display text-2xl md:text-3xl font-extralight text-star-bright text-center tracking-editorial">
              SilentCrisis
            </p>
            <p className="text-lg font-extralight text-star-dim text-center mt-1 uppercase tracking-wide-cosmic">
              Patterns spoken
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
