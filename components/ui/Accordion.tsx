'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("w-full divide-y divide-white/10 border-t border-b border-white/10", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-6 flex flex-col justify-start">
            <button
              onClick={() => toggleIndex(index)}
              className="flex justify-between items-center w-full text-left font-grotesque font-bold text-[#F5F0EB] hover:text-[#C8B89A] transition-colors duration-300"
            >
              <span className="text-base sm:text-lg tracking-tight">{item.q}</span>
              {/* Morphing indicator + to - */}
              <div className="w-5 h-5 relative flex items-center justify-center flex-shrink-0 ml-4">
                {/* Horizontal line */}
                <div className="absolute w-4 h-[1.5px] bg-current" />
                {/* Vertical line (disappears/rotates when open) */}
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0, scaleY: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute w-[1.5px] h-4 bg-current"
                />
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className="font-grotesque font-light text-sm sm:text-base text-[#888888] leading-relaxed pt-4 max-w-3xl">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
