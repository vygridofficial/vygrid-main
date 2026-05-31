'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu, Landmark } from 'lucide-react';

export default function StartProject() {
  const steps = [
    {
      num: "01 / PLAN",
      title: "Architectural Curation",
      icon: Compass,
      desc: "We formulate visual systems governed by strict typographic weights, baseline grids, spacious linear wireframes, and zero bloated template overhead. Restraint as a premium coordinate."
    },
    {
      num: "02 / BUILD",
      title: "Performance Engineering",
      icon: Cpu,
      desc: "Our developers construct blistering fast pipelines using Next.js App Router, TypeScript, and Framer Motion. Engineered for sub-second loading speeds on edge CDN networks."
    },
    {
      num: "03 / SECURE",
      title: "Generational Integration",
      icon: Landmark,
      desc: "We secure custom metadata schemas, seamless headless CMS dashboards, Zod contact pipelines, and daily databases snapshots, guaranteeing complete client independence."
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/5 relative select-none overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
              04.1 / INITIATION
            </span>
            <h2 className="font-serif italic font-light text-4xl sm:text-7xl text-[#F5F0EB]">
              Start Your Project
            </h2>
          </div>
          <p className="font-grotesque font-light text-sm text-[#888888] max-w-[32ch] leading-relaxed">
            Our three-phase structural pipeline from blueprints to premium edge deployments.
          </p>
        </div>

        {/* Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: idx * 0.12 }}
                className="border border-white/10 bg-[#111111]/30 p-8 flex flex-col justify-between h-[280px] group hover:border-[#C8B89A] transition-colors duration-500 relative"
              >
                <div className="space-y-6">
                  {/* Meta tag */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-[#C8B89A] tracking-wider font-bold">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#444444] group-hover:text-[#C8B89A] transition-colors duration-500" />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-3">
                    <h3 className="font-serif italic text-xl text-[#F5F0EB] group-hover:text-[#C8B89A] transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="font-grotesque font-light text-xs text-[#888888] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="w-full h-[1px] bg-white/5 absolute bottom-0 left-0 scale-x-0 group-hover:scale-x-100 group-hover:bg-[#C8B89A] transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
