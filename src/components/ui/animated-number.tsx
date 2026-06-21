import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  start?: number;
  end?: number;
  decimals?: number;
  font?: React.CSSProperties;
  color?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedNumber({
  start = 0,
  end = 100,
  decimals = 0,
  font,
  color,
  suffix = '',
  prefix = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(start);
  const spring = useSpring(value, { damping: 30, stiffness: 60 });
  const display = useTransform(spring, num => {
    const n = Number(num);
    const fixed = n.toFixed(decimals);
    return n >= 1e3 ? Number(fixed).toLocaleString() : fixed;
  });

  useEffect(() => {
    value.set(isInView ? end : start);
  }, [start, end, isInView, value]);

  return (
    <span ref={ref} style={{ display: 'inline-block', color, ...font }}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default AnimatedNumber;
