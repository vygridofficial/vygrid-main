'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/data';
import ImageReveal from '@/components/ui/ImageReveal';

export default function PortfolioGrid() {
  // Grab top 5 projects for the home page horizontal slider
  const featured = projects.slice(0, 5);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/5 select-none overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
        <div className="space-y-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
            03 / PORTFOLIO
          </span>
          <h2 className="font-serif italic font-light text-4xl sm:text-6xl text-[#F5F0EB]">
            Selected Cases
          </h2>
        </div>
        
        {/* Helper drag instructions */}
        <span className="hidden sm:inline-block font-mono text-[10px] text-[#444444] tracking-widest uppercase">
          scroll horizontally &rarr;
        </span>
      </div>

      {/* Horizontal snap scroll row */}
      <div
        ref={containerRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar space-x-8 px-6 md:px-12 pb-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {featured.map((project, idx) => {
          // Zero-padded index number
          const padIdx = (idx + 1).toString().padStart(2, '0');

          return (
            <div
              key={project.id}
              className="flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[45vw] snap-align-start flex flex-col space-y-6 group cursor-pointer"
            >
              <Link href={`/portfolio/${project.slug}`}>
                {/* 1. Sharp visual thumbnail using ImageReveal */}
                <ImageReveal className="relative aspect-[16/10] bg-[#111111]">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover grayscale filter transition-all duration-700 group-hover:grayscale-0 group-hover:scale-103"
                    sizes="(max-w-768px) 80vw, 600px"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/10 group-hover:bg-transparent transition-all duration-300" />
                </ImageReveal>

                {/* 2. Metadata overlay bar */}
                <div className="flex flex-col space-y-3 pt-4 text-left">
                  
                  {/* Category and Index Row */}
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <span className="text-[#C8B89A] tracking-wider uppercase font-bold">
                      {project.category}
                    </span>
                    <span className="text-[#444444]">
                      {padIdx} / 05
                    </span>
                  </div>

                  {/* Project name & outcomes */}
                  <div className="space-y-1">
                    <h3 className="font-serif italic text-2xl text-[#F5F0EB] group-hover:text-[#C8B89A] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-grotesque font-light text-xs sm:text-sm text-[#888888]">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Metric Result highlights */}
                  <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                    <span className="font-mono text-[9px] text-[#444444] uppercase tracking-wider">
                      IMPACT RESULT
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#F5F0EB] uppercase tracking-widest bg-white/5 px-2.5 py-1">
                      {project.metrics[0]?.value} {project.metrics[0]?.label.split(' ')[0]}
                    </span>
                  </div>

                </div>
              </Link>
            </div>
          );
        })}
      </div>

    </section>
  );
}
