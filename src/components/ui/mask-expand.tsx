import React, { useState, ReactNode, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MaskExpandProps {
  children?: ReactNode | ReactNode[];
  orientation?: 'horizontal' | 'vertical';
  collapsedSize?: number;
  expandedSize?: number;
  gap?: number;
  animationDuration?: number;
  borderRadius?: number;
  defaultExpanded?: number;
  className?: string;
}

export function MaskExpand({
  children = [],
  orientation = 'horizontal',
  collapsedSize = 80,
  expandedSize = 400,
  gap = 8,
  animationDuration = 0.5,
  borderRadius = 12,
  defaultExpanded = 0,
  className,
}: MaskExpandProps) {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpanded);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isHorizontal = orientation === 'horizontal';
  const childrenArray = Array.isArray(children) ? children : children ? [children] : [];

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    gap: `${gap}px`,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  };

  const getItemSize = (index: number): number => {
    const baseSize = index === expandedIndex ? expandedSize : collapsedSize;
    const hoverExpansion = 8;
    if (hoveredIndex === index && index !== expandedIndex) return baseSize + hoverExpansion;
    if (hoveredIndex !== null && hoveredIndex !== index && index !== expandedIndex) {
      const reductionPerItem = hoverExpansion / Math.max(1, childrenArray.length - 2);
      return Math.max(baseSize - reductionPerItem, baseSize * 0.9);
    }
    return baseSize;
  };

  const getItemStyle = (index: number): CSSProperties => {
    const isExpanded = index === expandedIndex;
    const size = getItemSize(index);
    return {
      borderRadius: `${borderRadius}px`,
      overflow: 'hidden',
      cursor: isExpanded ? 'default' : 'pointer',
      position: 'relative',
      flexShrink: 0,
      ...(isHorizontal ? { width: `${size}px`, height: '100%' } : { height: `${size}px`, width: '100%' }),
    };
  };

  return (
    <div className={className} style={containerStyle}>
      <AnimatePresence>
        {childrenArray.map((child, index) => (
          <motion.div
            key={index}
            style={getItemStyle(index)}
            onClick={() => setExpandedIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ [isHorizontal ? 'width' : 'height']: getItemSize(index) }}
            transition={{ duration: animationDuration, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>{child}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default MaskExpand;
