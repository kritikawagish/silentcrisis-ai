import React, { ReactNode } from 'react';

interface BentoCell {
  content: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

interface BentoGridProps {
  cells: BentoCell[];
  gridColumns?: number;
  gridRows?: number;
  gap?: number;
  className?: string;
}

export default function BentoGrid({ cells, gridColumns = 3, gridRows = 2, gap = 16, className }: BentoGridProps) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows}, minmax(200px, auto))`,
        gap: `${gap}px`,
        width: '100%',
      }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          className={cell.className}
          style={{
            gridColumn: cell.colSpan ? `span ${cell.colSpan}` : 'span 1',
            gridRow: cell.rowSpan ? `span ${cell.rowSpan}` : 'span 1',
            overflow: 'hidden',
          }}
        >
          {cell.content}
        </div>
      ))}
    </div>
  );
}
