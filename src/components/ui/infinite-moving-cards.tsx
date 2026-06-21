import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MovingCardItem {
  quote: string;
  name: string;
  title: string;
}

interface InfiniteMovingCardsProps {
  items: MovingCardItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach(item => {
        const duplicated = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicated);
      });
      containerRef.current.style.setProperty('--animation-direction', direction === 'left' ? 'forwards' : 'reverse');
      containerRef.current.style.setProperty(
        '--animation-duration',
        speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s'
      );
      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[320px] md:w-[440px] max-w-full shrink-0 rounded-lg border border-amber-dawn/10 bg-cosmos-deep/60 backdrop-blur-sm px-8 py-7"
          >
            <blockquote>
              <p className="relative z-20 text-lg font-extralight leading-relaxed text-star-bright">
                {item.quote}
              </p>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-dawn to-violet-signal flex items-center justify-center text-cosmos-void font-display text-lg">
                  {item.name[0]}
                </div>
                <span className="flex flex-col">
                  <span className="text-lg font-normal text-star-bright">{item.name}</span>
                  <span className="text-lg font-extralight text-star-dim">{item.title}</span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
