'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { stats as fallbackStats } from '@/lib/data';

interface StatsProps {
  stats?: Array<{ label: string; value: string }>;
}

export default function Stats({ stats }: StatsProps) {
  const displayStats = stats || fallbackStats;

  return (
    <section className="bg-[#0A0A0A] border-t border-b border-white/5 py-12 md:py-16 font-grotesque select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-stretch gap-8 md:gap-0 divide-y-0 md:divide-x divide-white/10">
          {displayStats.map((stat, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.08 }}
                className="text-left md:text-center flex flex-col justify-center items-start md:items-center px-6 space-y-2 md:flex-1"
              >
                {/* Number in serif italic */}
                <div className="font-serif italic font-light text-4xl sm:text-5xl text-[#F5F0EB]">
                  {stat.value}
                </div>
                {/* Labels in mono caps */}
                <div className="font-mono text-[9px] sm:text-[10px] text-[#888888] uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

