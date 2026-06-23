import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface TimelineEntry {
  title: string;
  content: ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
}

export const Timeline = ({ data }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 10%', 'end 50%'] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-body" ref={containerRef}>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-32 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-cosmos-deep flex items-center justify-center border border-amber-dawn/20">
                <div className="h-4 w-4 rounded-full bg-amber-dawn/30 border border-amber-dawn/50 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-display font-extralight text-star-dim">
                {item.title}
              </h3>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-display font-extralight text-star-dim">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + 'px' }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(168,156,196,0.2)_10%,rgba(168,156,196,0.2)_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-amber-dawn via-violet-signal to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;

