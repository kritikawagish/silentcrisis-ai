import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WellnessSparklineProps {
  data?: number[];
  interventionIndex?: number;
  width?: number;
  height?: number;
  showLabels?: boolean;
}

const defaultData = [78, 76, 74, 71, 68, 64, 60, 56, 52, 50, 53, 58, 64, 70, 75, 79, 82];

export default function WellnessSparkline({
  data = defaultData,
  interventionIndex = 9,
  width = 600,
  height = 180,
  showLabels = true,
}: WellnessSparklineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const pathRef = useRef<SVGPathElement>(null);
  const declineRef = useRef<SVGPathElement>(null);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const padding = 20;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const points = data.map((v, i) => ({
    x: padding + (i / (data.length - 1)) * innerW,
    y: padding + innerH - ((v - min) / (max - min)) * innerH,
  }));

  const declinePath = points
    .slice(0, interventionIndex + 1)
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const recoveryPath = points
    .slice(interventionIndex)
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  useEffect(() => {
    if (!isInView) return;
    [declineRef.current, pathRef.current].forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 2200, delay: i * 800, fill: 'forwards', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    });
  }, [isInView]);

  const intervention = points[interventionIndex];

  return (
    <svg ref={ref} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="declineFade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff6b8a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff6b8a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="recoveryFade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7fd9b8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7fd9b8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid baseline */}
      <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="#a89cc4" strokeOpacity="0.15" strokeDasharray="2 4" />

      {/* Decline path with fill */}
      {isInView && (
        <motion.path
          d={`${declinePath} L ${points[interventionIndex].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
          fill="url(#declineFade)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      )}
      <path ref={declineRef} d={declinePath} fill="none" stroke="#ff6b8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Recovery path with fill */}
      {isInView && (
        <motion.path
          d={`${recoveryPath} L ${points[points.length - 1].x} ${height - padding} L ${intervention.x} ${height - padding} Z`}
          fill="url(#recoveryFade)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
        />
      )}
      <path ref={pathRef} d={recoveryPath} fill="none" stroke="#7fd9b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Intervention marker */}
      <motion.circle
        cx={intervention.x}
        cy={intervention.y}
        r="6"
        fill="#ff9b6a"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 2.5, type: 'spring', stiffness: 120 }}
      />
      <motion.circle
        cx={intervention.x}
        cy={intervention.y}
        r="12"
        fill="none"
        stroke="#ff9b6a"
        strokeOpacity="0.4"
        animate={isInView ? { r: [12, 20, 12], opacity: [0.6, 0, 0.6] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: 3 }}
      />

      {showLabels && (
        <>
          <motion.text
            x={intervention.x}
            y={intervention.y - 20}
            textAnchor="middle"
            fill="#ff9b6a"
            fontSize="11"
            fontFamily="DM Sans, sans-serif"
            fontWeight="400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.8 }}
          >
            INTERVENTION
          </motion.text>
          <motion.text
            x={padding}
            y={padding - 4}
            fill="#a89cc4"
            fontSize="10"
            fontFamily="DM Sans, sans-serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Wellness Score
          </motion.text>
        </>
      )}
    </svg>
  );
}
