'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { testimonials as fallbackTestimonials } from '@/lib/data';

interface TestimonialsProps {
  testimonials?: any[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const displayTestimonials = testimonials || fallbackTestimonials;
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? displayTestimonials.length - 1 : prev - 1));
  }, [displayTestimonials]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((prev) => (prev === displayTestimonials.length - 1 ? 0 : prev + 1));
  }, [displayTestimonials]);

  useEffect(() => {
    if (displayTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [handleNext, activeIdx, displayTestimonials]);

  if (displayTestimonials.length === 0) return null;

  const current = displayTestimonials[activeIdx];
  const padIndex = (activeIdx + 1).toString().padStart(2, '0');
  const totalCount = displayTestimonials.length.toString().padStart(2, '0');

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/5 relative overflow-hidden select-none text-left">
      
      {/* Background blurred grayscale image swap */}
      {current?.avatar && (
        <div className="absolute inset-0 z-0 opacity-[0.04] filter blur-xl grayscale scale-105 pointer-events-none transition-all duration-1000">
          <Image
            src={current.avatar}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Testimonial header bar */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase">
              04 / TESTIMONIALS
            </span>
            <span className="text-white/10">&middot;</span>
            <a 
              href="/submit-review"
              className="font-mono text-[9px] tracking-wider text-[#888888] hover:text-[#C8B89A] uppercase transition-colors border-b border-dashed border-[#888888]/20 hover:border-[#C8B89A]/50 pb-0.5"
            >
              Share Your Feedback &rarr;
            </a>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-[#888888]">
            {padIndex} / {totalCount}
          </div>
        </div>

        {/* Carousel Quote container */}
        <div className="min-h-[220px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full space-y-8"
            >
              {/* Huge editorial serif quote */}
              <h3 className="font-serif italic font-light text-2xl sm:text-3xl lg:text-4xl text-[#F5F0EB] leading-relaxed max-w-4xl">
                &ldquo;{current?.comment}&rdquo;
              </h3>

              {/* Attribution details */}
              <div className="flex items-center space-x-4">
                {current?.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 grayscale flex-shrink-0">
                    <Image
                      src={current.avatar}
                      alt={current.name || ''}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-[#111111] flex items-center justify-center text-xs font-mono text-[#C8B89A] flex-shrink-0">
                    {(() => {
                      const parts = (current?.name || '').trim().split(/\s+/);
                      if (parts.length >= 2) {
                        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                      }
                      return (current?.name || '').substring(0, 2).toUpperCase();
                    })()}
                  </div>
                )}
                <div className="text-left font-grotesque">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#F5F0EB]">
                    {current?.name}
                  </h4>
                  <span className="font-mono text-[9px] text-[#888888] uppercase tracking-widest block mt-0.5">
                    {current?.role} &middot; <span className="text-[#C8B89A]">{current?.company}</span>
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual controls (prev / next arrows matching Monolog style) */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          <div className="flex space-x-1.5">
            {displayTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIdx ? 1 : -1);
                  setActiveIdx(idx);
                }}
                className={`h-0.5 transition-all duration-300 ${
                  activeIdx === idx ? 'bg-[#C8B89A] w-8' : 'bg-white/10 w-4 hover:bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handlePrev}
              className="text-[#888888] hover:text-[#F5F0EB] transition-colors focus:outline-none flex items-center justify-center p-2 border border-white/10"
              aria-label="Previous quote"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="text-[#888888] hover:text-[#F5F0EB] transition-colors focus:outline-none flex items-center justify-center p-2 border border-white/10"
              aria-label="Next quote"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

