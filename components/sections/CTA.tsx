'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] text-[#F5F0EB] relative select-none overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between min-h-[500px]">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
            05 / CONTACT
          </span>
        </div>

        {/* Massive displays across multiple lines */}
        <div className="font-serif font-light text-4xl sm:text-7xl lg:text-9xl leading-none text-left tracking-tighter max-w-5xl space-y-2">
          <div>Ready to build</div>
          <div className="italic text-[#888888]">an experience</div>
          <div>that moves</div>
          <Link href="/about" className="block text-[#C8B89A] flex items-center group cursor-pointer select-none">
            <motion.div
              whileHover={{
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
              className="flex items-center"
            >
              &rarr; People
            </motion.div>
          </Link>
        </div>

        {/* Footer split details (blockquote left, CTA button right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 pt-12 border-t border-white/5 items-end">
          
          {/* Bottom-left: Thin blockquote */}
          <div className="lg:col-span-6 space-y-3 text-left">
            <span className="font-mono text-[9px] text-[#444444] uppercase tracking-wider block">
              CLIENT CONVICTION
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#888888] leading-relaxed max-w-md">
              &ldquo;Vygrid does not just build code; they capture the brand legacy of our studio and package it for premium returns.&rdquo;
            </p>
            <span className="font-mono text-[10px] text-[#F5F0EB] block">
              &mdash; Genevieve Thorne, Luxe Realty Group
            </span>
          </div>

          {/* Bottom-right: Tell us your story text link & tight founder photo */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-end justify-start lg:justify-end gap-8 text-left">
            
            {/* Founder cropped photo */}
            <div className="relative w-28 h-28 bg-[#1A1A1B] flex-shrink-0 grayscale">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Lead Director Alex"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>

            {/* Direct text link */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-[#444444] uppercase tracking-wider block">
                PARTNER UP
              </span>
              <Link
                href="/contact"
                className="font-grotesque font-bold text-sm uppercase tracking-widest text-[#F5F0EB] hover:text-[#C8B89A] transition-colors duration-300 link-draw py-2 flex items-center space-x-2"
              >
                <span>Tell us your story</span>
                <ArrowRight className="w-4 h-4 text-[#C8B89A]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
