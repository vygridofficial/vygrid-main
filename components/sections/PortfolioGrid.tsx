'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects as fallbackProjects } from '@/lib/data';
import ImageReveal from '@/components/ui/ImageReveal';

interface PortfolioGridProps {
  projects?: any[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const displayProjects = projects || fallbackProjects;
  // Grab top 5 projects for the home page horizontal slider
  const featured = displayProjects.slice(0, 5);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (containerRef.current) {
        const cardWidth = containerRef.current.firstElementChild?.clientWidth || 300;
        const maxScrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        
        if (containerRef.current.scrollLeft >= maxScrollLeft - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          containerRef.current.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
        }
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, [featured]);

  const scrollLeft = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.firstElementChild?.clientWidth || 300;
      containerRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.firstElementChild?.clientWidth || 300;
      containerRef.current.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/5 select-none overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
        <div className="space-y-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
            03 / PORTFOLIO
          </span>
          <h2 className="font-serif italic font-light text-3xl sm:text-6xl text-[#F5F0EB]">
            Selected Cases
          </h2>
        </div>
        
        {/* Helper drag instructions */}
        <span className="hidden sm:inline-block font-mono text-[10px] text-[#444444] tracking-widest uppercase">
          scroll horizontally &rarr;
        </span>
      </div>

      {/* Horizontal snap scroll row wrapper with floating buttons */}
      <div className="relative w-full group">
        {/* Floating Navigation Controls */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-4 top-[35%] -translate-y-1/2 z-20 border border-white/10 bg-[#0A0A0A]/90 hover:bg-[#C8B89A] hover:text-[#0A0A0A] text-[#F5F0EB] p-4 transition-all duration-300 pointer-events-auto items-center justify-center cursor-pointer select-none"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-4 top-[35%] -translate-y-1/2 z-20 border border-white/10 bg-[#0A0A0A]/90 hover:bg-[#C8B89A] hover:text-[#0A0A0A] text-[#F5F0EB] p-4 transition-all duration-300 pointer-events-auto items-center justify-center cursor-pointer select-none"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={containerRef}
          className="w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar space-x-8 px-6 md:px-12 pb-10"
          style={{ scrollBehavior: 'smooth' }}
        >
          {featured.map((project, idx) => {
            // Zero-padded index number
            const padIdx = (idx + 1).toString().padStart(2, '0');
            const totalIdx = featured.length.toString().padStart(2, '0');

            return (
              <div
                key={project.id}
                className="flex-shrink-0 w-[70vw] sm:w-[45vw] lg:w-[32vw] snap-align-start flex flex-col space-y-6 group cursor-pointer"
              >
                <Link href={`/portfolio/${project.slug}`}>
                  {/* 1. Sharp visual thumbnail using ImageReveal */}
                  <ImageReveal className="relative aspect-[16/10] bg-[#111111]">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover grayscale filter transition-all duration-700 group-hover:grayscale-0 group-hover:scale-103"
                      sizes="(max-w-768px) 70vw, 450px"
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
                        {padIdx} / {totalIdx}
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
                        {project.metrics && project.metrics[0]?.value} {project.metrics && project.metrics[0]?.label.split(' ')[0]}
                      </span>
                    </div>

                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

