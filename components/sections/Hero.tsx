'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TextReveal from '@/components/ui/TextReveal';
import MatrixParticles from '@/components/ui/MatrixParticles';

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryBtn?: string;
  primaryBtnHref?: string;
  secondaryBtn?: string;
  secondaryBtnHref?: string;
  companyReg?: string;
}

export default function Hero({
  title,
  subtitle,
  primaryBtn = "Start Your Project",
  primaryBtnHref = "/start-your-project",
  secondaryBtn = "View Our Work",
  secondaryBtnHref = "/portfolio",
  companyReg = "EST. 2026 • VYGRID DIGITAL STUDIO"
}: HeroProps) {
  const defaultTitle1 = "Your digital presence,";
  const defaultTitle2 = "Perfected.";
  
  let titleLine1 = defaultTitle1;
  let titleLine2 = defaultTitle2;

  if (title) {
    if (title.includes(',')) {
      const parts = title.split(',');
      titleLine1 = parts[0] + ',';
      titleLine2 = parts.slice(1).join(',').trim();
    } else {
      titleLine1 = title;
      titleLine2 = '';
    }
  }

  const defaultSub = "Building fast, modern, and user-focused digital solutions that elevate your brand and strengthen your online presence.";
  const displaySub = subtitle || defaultSub;

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[650px] bg-[#0A0A0A] overflow-hidden select-none px-6 md:px-12 pt-8 pb-16 flex flex-col justify-between border-b border-white/5">
      
      {/* Background Matrix Particle canvas animation */}
      <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none">
        <MatrixParticles />
      </div>

      {/* Top Header Row within Hero (Index metadata counters) */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 z-10">
        <div className="font-mono text-[9px] sm:text-xs tracking-[0.2em] text-[#888888] uppercase">
          {companyReg}
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#C8B89A] font-bold">
          29 / 03
        </div>
      </div>

      {/* Bottom-left anchored core text blocks */}
      <div className="z-10 text-left max-w-4xl space-y-8 mt-auto">
        
        {/* Display typography layout */}
        <div className="space-y-2">
          {titleLine1 && (
            <TextReveal
              as="h1"
              text={titleLine1}
              className="font-serif font-light text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-[#F5F0EB]"
            />
          )}
          {titleLine2 && (
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
                className="font-serif font-light italic text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-[#C8B89A] block"
              >
                {titleLine2}
              </motion.h1>
            </div>
          )}
        </div>

        {/* Constrained descriptive subtext */}
        <p className="font-grotesque font-bold text-base sm:text-lg text-[#888888] leading-relaxed max-w-[60ch]">
          {displaySub}
        </p>

        {/* CTA text links */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href={primaryBtnHref}
            className="px-6 py-3.5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center space-x-2"
          >
            <span>{primaryBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0A]" />
          </Link>
          <Link
            href={secondaryBtnHref}
            className="font-grotesque font-bold text-xs uppercase tracking-widest text-[#F5F0EB] hover:text-[#C8B89A] transition-colors duration-300 link-draw py-2.5 flex items-center space-x-2"
          >
            <span>{secondaryBtn}</span>
            <ArrowRight className="w-4 h-4 text-[#C8B89A]" />
          </Link>
        </div>

      </div>

      {/* Background Noise element */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-10" />

    </section>
  );
}

