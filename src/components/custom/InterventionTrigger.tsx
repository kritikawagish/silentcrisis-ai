import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, X, Sparkles } from 'lucide-react';

interface InterventionTriggerProps {
  autoTrigger?: boolean;
}

export default function InterventionTrigger({ autoTrigger = true }: InterventionTriggerProps) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'detected' | 'intervention'>('detected');

  useEffect(() => {
    if (!autoTrigger) return;
    const t1 = setTimeout(() => setVisible(true), 1200);
    const t2 = setTimeout(() => setPhase('intervention'), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [autoTrigger]);

  const reset = () => {
    setVisible(false);
    setPhase('detected');
    setTimeout(() => setVisible(true), 600);
    setTimeout(() => setPhase('intervention'), 2800);
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-lg p-6 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-dawn to-transparent" />

            {phase === 'detected' ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-amber-dawn"
                  />
                  <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn">
                    Pattern detected
                  </span>
                </div>
                <p className="text-xl font-extralight text-star-bright leading-relaxed mb-2">
                  Your response times slowed 38% this week. Sleep window narrowed by 47 minutes.
                </p>
                <p className="text-lg font-extralight text-star-dim">
                  Early indicators of cognitive load building. Preparing a gentle response…
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-aurora-green/15 flex items-center justify-center">
                      <Wind className="text-aurora-green" size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-extralight uppercase tracking-wide-cosmic text-aurora-green">
                        Intervention · 4 min
                      </p>
                      <h3 className="font-display text-2xl font-extralight text-star-bright">
                        Box breathing
                      </h3>
                    </div>
                  </div>
                  <button onClick={reset} className="text-star-dim hover:text-star-bright transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <p className="text-lg font-extralight text-star-dim leading-relaxed mb-5">
                  Slow inhale 4 seconds. Hold 4. Exhale 4. Hold 4. Repeat until the cosmos feels closer.
                </p>
                <div className="flex items-center gap-3">
                  <button className="text-lg font-extralight bg-amber-dawn text-cosmos-void px-5 py-2 hover:bg-amber-warm transition-colors duration-300">
                    Begin
                  </button>
                  <button className="text-lg font-extralight text-star-dim hover:text-star-bright px-4 py-2 transition-colors">
                    Later
                  </button>
                  <Sparkles className="text-amber-dawn/40 ml-auto" size={14} />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!visible && (
        <button
          onClick={reset}
          className="glass rounded-lg px-5 py-3 text-lg font-extralight text-star-dim hover:text-amber-dawn transition-colors"
        >
          Trigger sample intervention →
        </button>
      )}
    </div>
  );
}
