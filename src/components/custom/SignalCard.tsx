import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SignalCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  data?: number[];
  threshold?: number;
  status?: 'normal' | 'watching' | 'elevated';
}

const statusColors = {
  normal: '#7fd9b8',
  watching: '#ff9b6a',
  elevated: '#ff6b8a',
};

export default function SignalCard({
  icon: Icon,
  title,
  description,
  data = [40, 45, 42, 50, 48, 55, 52, 60, 58, 65],
  threshold = 70,
  status = 'normal',
}: SignalCardProps) {
  const color = statusColors[status];
  const max = Math.max(...data, threshold);
  const min = Math.min(...data, 0);
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - ((v - min) / (max - min)) * 100,
  }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const thresholdY = 100 - ((threshold - min) / (max - min)) * 100;

  return (
    <motion.div
      className="glass clip-notch-tr p-6 h-full flex flex-col group"
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(255, 155, 106, 0.1)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded flex items-center justify-center bg-cosmos-elevated/40 group-hover:bg-amber-dawn/10 transition-colors duration-500">
          <Icon className="text-amber-dawn" size={20} strokeWidth={1.2} />
        </div>
        <span
          className="text-lg font-extralight uppercase tracking-wide-cosmic"
          style={{ color }}
        >
          ● {status}
        </span>
      </div>
      <h3 className="font-display text-2xl font-extralight text-star-bright mb-2">{title}</h3>
      <p className="text-lg font-extralight text-star-dim leading-relaxed flex-1 mb-5">{description}</p>
      <svg viewBox="0 0 100 60" className="w-full h-16" preserveAspectRatio="none">
        <line x1="0" x2="100" y1={thresholdY * 0.6} y2={thresholdY * 0.6} stroke="#a89cc4" strokeOpacity="0.3" strokeDasharray="2 2" strokeWidth="0.4" />
        <path d={path.replace(/(-?\d+\.?\d*)/g, (m, n, idx) => {
          // scale y to 60 range
          return idx % 2 === 1 ? String(Number(m) * 0.6) : m;
        })} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y * 0.6} r="0.8" fill={color} />
        ))}
      </svg>
    </motion.div>
  );
}
