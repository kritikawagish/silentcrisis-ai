import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

const Item: React.FC<{ item: FAQItem; defaultOpen?: boolean }> = ({ item, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-star-bright/10 py-6 cursor-pointer group" onClick={() => setOpen(!open)}>
      <div className="flex items-start gap-6">
        <span className="font-display text-2xl text-amber-dawn/60 mt-1 min-w-[40px]">{item.number}</span>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-extralight text-star-bright group-hover:text-amber-dawn transition-colors duration-300">
              {item.question}
            </h3>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4 }}>
              <ChevronDown className="text-star-dim" size={24} />
            </motion.div>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="text-lg font-extralight text-star-dim leading-relaxed pt-5 pr-8">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC<FAQProps> = ({ items, title = 'Quietly asked', subtitle }) => {
  return (
    <div className="w-full">
      {title && <h2 className="font-display text-4xl md:text-6xl font-extralight text-star-bright mb-3 text-balance">{title}</h2>}
      {subtitle && <p className="text-xl font-extralight text-star-dim mb-12 max-w-2xl">{subtitle}</p>}
      <div className="divide-y divide-star-bright/5">
        {items.map((item, idx) => <Item key={idx} item={item} defaultOpen={idx === 0} />)}
      </div>
    </div>
  );
};

export default FAQ;
