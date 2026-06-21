import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface RiskMeterProps {
  value?: number; // 0-100
  size?: number;
  label?: string;
  showValue?: boolean;
}

export default function RiskMeter({ value = 32, size = 160, label = 'Risk', showValue = true }: RiskMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(value * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  const radius = size / 2 - 12;
  const circumference = Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  const getColor = (v: number) => {
    if (v < 30) return '#7fd9b8';
    if (v < 55) return '#ff9b6a';
    if (v < 80) return '#ff9b6a';
    return '#ff6b8a';
  };

  const getStatus = (v: number) => {
    if (v < 30) return 'Healthy';
    if (v < 55) return 'Watching';
    if (v < 80) return 'Elevated';
    return 'Critical';
  };

  const color = getColor(animated);

  return (
    <div ref={ref} className="inline-flex flex-col items-center gap-2" style={{ width: size }}>
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <path
          d={`M 12 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 12} ${size / 2}`}
          fill="none"
          stroke="#a89cc4"
          strokeOpacity="0.15"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <motion.path
          d={`M 12 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 12} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 8px ${color}aa)` }}
        />
        {showValue && (
          <text
            x={size / 2}
            y={size / 2 - 4}
            textAnchor="middle"
            fill="#f4ecdf"
            fontSize="28"
            fontFamily="Fraunces, serif"
            fontWeight="300"
          >
            {Math.round(animated)}
          </text>
        )}
      </svg>
      <div className="flex items-center gap-2 -mt-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
        <span className="text-lg font-extralight uppercase tracking-wide-cosmic" style={{ color }}>
          {getStatus(animated)}
        </span>
      </div>
      {label && <span className="text-lg font-extralight text-star-dim uppercase tracking-wider">{label}</span>}
    </div>
  );
}
