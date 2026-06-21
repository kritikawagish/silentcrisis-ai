import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  label?: string;
  dimmed?: boolean;
}

interface Edge {
  from: number;
  to: number;
}

interface ConstellationMapProps {
  stars?: Star[];
  edges?: Edge[];
  width?: number;
  height?: number;
  variant?: 'bright' | 'dimming' | 'labeled';
  className?: string;
}

const defaultStars: Star[] = [
  { id: 0, x: 50, y: 50, size: 6 },
  { id: 1, x: 20, y: 25, size: 3 },
  { id: 2, x: 80, y: 30, size: 4 },
  { id: 3, x: 25, y: 75, size: 3 },
  { id: 4, x: 75, y: 75, size: 4 },
  { id: 5, x: 50, y: 12, size: 2 },
  { id: 6, x: 50, y: 88, size: 2 },
  { id: 7, x: 10, y: 50, size: 2 },
  { id: 8, x: 90, y: 50, size: 2 },
];

const defaultEdges: Edge[] = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 },
  { from: 1, to: 5 }, { from: 2, to: 5 }, { from: 3, to: 6 }, { from: 4, to: 6 },
  { from: 1, to: 7 }, { from: 3, to: 7 }, { from: 2, to: 8 }, { from: 4, to: 8 },
];

export default function ConstellationMap({
  stars = defaultStars,
  edges = defaultEdges,
  width = 500,
  height = 500,
  variant = 'bright',
  className,
}: ConstellationMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const handleMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    const handleLeave = () => setMouse(null);
    svg.addEventListener('mousemove', handleMove);
    svg.addEventListener('mouseleave', handleLeave);
    return () => {
      svg.removeEventListener('mousemove', handleMove);
      svg.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const getStarOpacity = (star: Star) => {
    if (variant === 'dimming' && star.dimmed) return 0.2;
    if (!mouse) return variant === 'dimming' && star.dimmed ? 0.2 : 0.85;
    const dx = star.x - mouse.x;
    const dy = star.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.min(1, 0.5 + (30 - Math.min(dist, 30)) / 30);
  };

  const getEdgeOpacity = (edge: Edge) => {
    const a = stars[edge.from];
    const b = stars[edge.to];
    if (!a || !b) return 0.15;
    if (!mouse) return 0.18;
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const dx = midX - mouse.x;
    const dy = midY - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return Math.min(0.6, 0.15 + (40 - Math.min(dist, 40)) / 80);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      width={width}
      height={height}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd4b0" />
          <stop offset="40%" stopColor="#ff9b6a" />
          <stop offset="100%" stopColor="#ff9b6a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="starGlowViolet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4ecdf" />
          <stop offset="40%" stopColor="#a380ff" />
          <stop offset="100%" stopColor="#a380ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map((edge, i) => {
        const a = stars[edge.from];
        const b = stars[edge.to];
        if (!a || !b) return null;
        return (
          <motion.line
            key={`edge-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#a380ff"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: getEdgeOpacity(edge) }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: getEdgeOpacity(edge) }}
          />
        );
      })}

      {stars.map((star, i) => (
        <g key={`star-${star.id}`}>
          <motion.circle
            cx={star.x}
            cy={star.y}
            r={star.size * 0.8}
            fill="url(#starGlow)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.08 }}
            style={{ opacity: getStarOpacity(star) * 0.4 }}
          />
          <motion.circle
            cx={star.x}
            cy={star.y}
            r={star.size * 0.25}
            fill={star.dimmed ? '#a89cc4' : '#ffd4b0'}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
            style={{ opacity: getStarOpacity(star) }}
          />
          {variant === 'labeled' && star.label && (
            <motion.text
              x={star.x + star.size * 0.5 + 2}
              y={star.y + 1}
              fill="#a89cc4"
              fontSize="2.2"
              fontFamily="DM Sans, sans-serif"
              fontWeight="300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.75 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 + i * 0.08 }}
            >
              {star.label}
            </motion.text>
          )}
        </g>
      ))}
    </svg>
  );
}
