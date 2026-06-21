import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 80,
  duration = 0.9,
  ease = 'power3.out',
  from = { opacity: 0, y: 60, filter: 'blur(8px)' },
  to = { opacity: 1, y: 0, filter: 'blur(0px)' },
  threshold = 0.1,
  tag = 'p',
  textAlign = 'left',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.fonts && document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;
      // Split by words (NEVER by characters per system rules)
      const words = text.split(' ');
      el.innerHTML = words
        .map(w => `<span class="split-word inline-block" style="will-change:transform,opacity">${w}</span>`)
        .join(' ');
      const wordEls = el.querySelectorAll<HTMLElement>('.split-word');
      gsap.fromTo(
        wordEls,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start: `top ${(1 - threshold) * 100}%`,
            once: true,
          },
        }
      );
    },
    { dependencies: [text, fontsLoaded], scope: ref }
  );

  const style: React.CSSProperties = {
    textAlign,
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
  };
  const classes = `split-parent inline-block ${className}`;

  switch (tag) {
    case 'h1':
      return <h1 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{text}</h1>;
    case 'h2':
      return <h2 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{text}</h2>;
    case 'h3':
      return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{text}</h3>;
    case 'h4':
      return <h4 ref={ref as React.RefObject<HTMLHeadingElement>} style={style} className={classes}>{text}</h4>;
    case 'span':
      return <span ref={ref as React.RefObject<HTMLSpanElement>} style={style} className={classes}>{text}</span>;
    default:
      return <p ref={ref as React.RefObject<HTMLParagraphElement>} style={style} className={classes}>{text}</p>;
  }
};

export default SplitText;
