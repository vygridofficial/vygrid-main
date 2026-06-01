'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverHighlight?: boolean;
}

export default function Card({
  children,
  className,
  delay = 0,
  hoverHighlight = true,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-2%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
      className={cn(
        "bg-[#111111] border border-white/5 p-8 relative flex flex-col justify-between text-left transition-colors duration-300 rounded-none shadow-none",
        hoverHighlight && "hover:border-[#C8B89A]/30 hover:bg-[#151517]",
        className
      )}
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
