'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TextReveal from '@/components/ui/TextReveal';

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[650px] bg-[#0A0A0A] overflow-hidden select-none px-6 md:px-12 py-16 flex flex-col justify-between border-b border-white/5">
      
      {/* Background visual placeholder (Muted image with opacity swept) */}
      <div className="absolute inset-0 z-0 opacity-20 filter grayscale pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
          alt="Studio Background Grid"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Top Header Row within Hero (Index metadata counters) */}
      <div className="w-full flex justify-between items-start z-10">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#888888]">
          EST. 2022 &middot; VYGRID DIGITAL STUDIO
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] font-bold">
          01 / 03
        </div>
      </div>

      {/* Bottom-left anchored core text blocks */}
      <div className="z-10 text-left max-w-4xl space-y-8 mt-auto">
        
        {/* Tiny mono header tag */}
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#C8B89A] uppercase">
          CORE STRATEGIC CAPABILITIES
        </div>

        {/* Display typography layout */}
        <div className="space-y-2">
          <TextReveal
            as="h1"
            text="We build custom websites."
            className="font-serif font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-[#F5F0EB]"
          />
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
              className="font-serif font-light italic text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-[#C8B89A] block"
            >
              We design iconic brands.
            </motion.h1>
          </div>
        </div>

        {/* Constrained descriptive subtext */}
        <p className="font-grotesque font-light text-base sm:text-lg text-[#888888] leading-relaxed max-w-[60ch]">
          Vygrid is an obsessively minimal engineering studio. We build change-making digital products and custom identity kits for established founder-led organizations.
        </p>

        {/* CTA text links */}
        <div className="pt-4 flex items-center">
          <Link
            href="/portfolio"
            className="font-grotesque font-bold text-xs uppercase tracking-widest text-[#F5F0EB] hover:text-[#C8B89A] transition-colors duration-300 link-draw py-2 flex items-center space-x-2"
          >
            <span>View Our Work</span>
            <ArrowRight className="w-4 h-4 text-[#C8B89A]" />
          </Link>
        </div>

      </div>

      {/* Background Noise element */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-10" />

    </section>
  );
}
