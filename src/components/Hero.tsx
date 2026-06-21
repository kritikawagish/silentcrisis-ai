import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroEntrance from './HeroEntrance';
import Aurora from './ui/aurora';
import Particles from './ui/particles';
import SplitText from './ui/split-text';
import FlipWords from './ui/flip-words';

export default function Hero() {
  const [entranceDone, setEntranceDone] = useState(false);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMove);
    return () => el?.removeEventListener('mousemove', handleMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <HeroEntrance onComplete={() => setEntranceDone(true)} />
      <section
        ref={heroRef}
        id="home_hero"
        className="relative w-full min-h-screen overflow-hidden bg-cosmos-void"
      >
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="https://content-studio.biela.dev/cover/3840x2160/i/images-library/6a36e9eb01fcc1c945701954/1781983711736-6a36e9eb01fcc1c945701954/originals/1781984259501.png/cinematic-slow-aerial-dolly-through-deep-cosmic-nebula-at-dusk-3840x2160.webp?search_term=cosmic,nebula,space,stars&img_prompt=Cinematic+slow+aerial+dolly+through+deep+cosmic+nebula+at+dusk.+Vast+indigo+and+violet+gas+clouds+with+amber+star+formation+regions+burning+warm.+Soft+volumetric+light+rays+piercing+through+cosmic+dust.+Tiny+distant+pinpoint+stars+scattered.+Atmospheric+particle+drift+in+slow+motion.+Hyper-realistic+NASA+Hubble+deep+field+aesthetic+with+painterly+warmth.+Color+palette+deep+indigo,+violet+nebula+gas,+warm+amber-coral+star+regions,+soft+lavender+mist.+Professional+cinema+film+grade,+IMAX+quality.&w=1920&h=1080&type=image"
          >
            <source
              src="https://content-studio.biela.dev/videos-library/6a36e9eb01fcc1c945701954/1781983711736-6a36e9eb01fcc1c945701954/originals/1781984320020.mp4?search_term=cosmic,nebula,space,stars,galaxy&img_prompt=Cinematic+slow+aerial+dolly+through+deep+cosmic+nebula+at+dusk.+Vast+indigo+and+violet+gas+clouds+with+amber+star+formation+regions+burning+warm.+Soft+volumetric+light+rays+piercing+through+cosmic+dust.+Tiny+distant+pinpoint+stars+scattered+throughout.+Atmospheric+particle+drift+in+slow+motion.+Hyper-realistic+NASA+Hubble+deep+field+aesthetic+with+painterly+warmth.+Color+palette+deep+indigo,+violet+nebula+gas,+warm+amber-coral+star+regions,+soft+lavender+mist.+Professional+cinema+film+grade,+IMAX+quality.&w=1920&h=1080&type=video"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-cosmos-void/30 via-cosmos-void/40 to-cosmos-void" />
        </div>

        {/* Aurora layer */}
        <div className="absolute inset-0 z-[1] opacity-50 pointer-events-none">
          <Aurora colorStops={['#ff9b6a', '#a380ff', '#13082e']} amplitude={0.6} blend={0.6} speed={0.3} />
        </div>

        {/* Particles layer */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <Particles
            particleCount={140}
            particleColors={['#ff9b6a', '#a380ff', '#f4ecdf']}
            speed={0.06}
            particleBaseSize={70}
            alphaParticles
            moveParticlesOnHover
            particleHoverFactor={0.5}
          />
        </div>

        {/* Cursor halo */}
        {entranceDone && (
          <motion.div
            className="pointer-events-none absolute z-[3] w-64 h-64 rounded-full"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-50%',
              background: 'radial-gradient(circle, rgba(255,155,106,0.12) 0%, transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Vertical text accent */}
        <div className="absolute right-6 md:right-10 bottom-16 -rotate-90 origin-bottom-right z-10 pointer-events-none hidden md:block">
          <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/30">
            EST. 2025 / EARLY WARNING SYSTEM
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[2400px] mx-auto min-h-screen flex items-center pt-32 pb-20">
          <div className="grid grid-cols-12 w-full">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 lg:col-start-2 lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={entranceDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-12 h-px bg-amber-dawn" />
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/80">
                  Behavioral Early Warning · v2.5
                </span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-[0.95] font-extralight text-star-bright text-balance tracking-editorial max-w-5xl">
                <SplitText
                  text="We see the signals"
                  tag="span"
                  className="block"
                />
                <span className="block mt-2">
                  <span className="text-star-dim italic font-extralight">before the </span>
                  <FlipWords
                    words={['burnout.', 'breakdown.', 'silence.', 'crisis.', 'collapse.']}
                  />
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={entranceDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-xl md:text-2xl font-extralight text-star-dim leading-relaxed max-w-2xl mt-10 text-pretty"
              >
                SilentCrisis listens for the quiet behavioral patterns that precede mental decline —
                weeks before a crisis whispers. So care can arrive on time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={entranceDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-12"
              >
                <Link
                  to="/for-individuals"
                  className="group relative text-xl font-extralight bg-amber-dawn text-cosmos-void px-7 py-4 hover:bg-amber-warm transition-all duration-500 flex items-center gap-3"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
                >
                  For Individuals
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
                </Link>
                <Link
                  to="/for-teams"
                  className="group text-xl font-extralight text-star-bright border border-star-bright/20 px-7 py-4 hover:border-amber-dawn/60 hover:text-amber-dawn transition-all duration-500 flex items-center gap-3"
                >
                  For Teams & HR
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={entranceDone ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 2 }}
                className="mt-16 flex items-center gap-6 text-lg font-extralight text-star-faint"
              >
                <span>Trusted in pilot by</span>
                <div className="flex items-center gap-5">
                  <span className="text-star-dim">Aetna Health</span>
                  <span className="text-star-faint/40">·</span>
                  <span className="text-star-dim">MIT Wellness</span>
                  <span className="text-star-faint/40">·</span>
                  <span className="text-star-dim">Headspace Labs</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entranceDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-lg font-extralight text-star-faint uppercase tracking-wide-cosmic"
          >
            Continue
          </motion.span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-amber-dawn/60 to-transparent"
          />
        </motion.div>
      </section>
    </>
  );
}
