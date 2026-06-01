'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { team as fallbackTeam } from '@/lib/data';
import { fetchCMSData } from '@/app/actions/cms';


interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [cmsData, setCmsData] = useState<any | null>(null);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const res = await fetchCMSData();
        setCmsData(res);
      } catch (err) {
        console.error("Failed to load About Modal CMS data", err);
      }
    }
    if (isOpen) {
      loadAboutData();
    }
  }, [isOpen]);

  const aboutPageSettings = cmsData?.aboutPageSettings;
  const displayTeam = cmsData?.team || fallbackTeam;

  // Capture Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const marqueeWords = ["LISTEN", "CREATE", "OBSESS", "INSPIRE"];
  const scrollWords = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#0A0A0A] backdrop-blur-sm"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full lg:w-[60%] z-50 bg-[#111111] border-l border-white/10 flex flex-col overflow-y-auto no-scrollbar select-none text-[#F5F0EB]"
          >
            {/* Header / Close button */}
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 bg-[#111111] sticky top-0 z-20">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888]">
                02 / ABOUT THE STUDIO
              </span>
              <button
                onClick={onClose}
                className="text-[#F5F0EB] hover:text-[#C8B89A] transition-colors focus:outline-none flex items-center space-x-2 font-mono text-[10px] tracking-widest"
              >
                <span>CLOSE</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content Grid */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-12 items-stretch">
              
              {/* Left Column: Rich Editorial Vision Copy */}
              <div className="md:col-span-5 p-8 md:p-10 bg-[#0C0C0D] border-r border-white/5 flex flex-col justify-between select-none">
                <div className="space-y-6">
                  <span className="font-mono text-[9px] tracking-widest text-[#C8B89A] block uppercase">
                    THE VYGRID CONVICTION
                  </span>
                  <h4 className="font-serif italic text-2xl text-[#F5F0EB] tracking-tight leading-tight">
                    {aboutPageSettings?.introHeading || "Linear purism and mathematical structure."}
                  </h4>
                  <p className="font-grotesque font-light text-xs text-[#888888] leading-relaxed whitespace-pre-wrap">
                    {aboutPageSettings?.introParagraph1 || "Founded in Q2 2022, Vygrid Digital Studio was born out of absolute frustration with sluggish, generic visual templates. We believe web engineering is not a collection of arbitrary visual gimmicks, but a strict discipline of mathematical precision."}
                  </p>
                  <p className="font-grotesque font-light text-xs text-[#888888] leading-relaxed whitespace-pre-wrap">
                    {aboutPageSettings?.introParagraph2 || "By removing decorative visual clutter, rounded corners, and excessive styling frames, we let typography and generous layout spacing guide user interactions naturally."}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center font-mono text-[8px] tracking-wider text-[#444444]">
                    <span>STUDIO TIMELINE:</span>
                    <span className="text-[#C8B89A]">EST. Q2 2022</span>
                  </div>
                  <div className="flex justify-between items-center font-mono text-[8px] tracking-wider text-[#444444]">
                    <span>DEPLOYMENT AUDIT:</span>
                    <span className="text-emerald-500">100/100 SPEED</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Founder Info & narrative */}
              <div className="md:col-span-7 p-8 md:p-12 space-y-12 bg-[#111111]">
                
                {/* Core Narrative */}
                <div className="space-y-6">
                  <h3 className="font-serif italic text-3xl sm:text-4xl text-[#F5F0EB] tracking-tight">
                    {aboutPageSettings?.title || "Restraint, precision, structure."}
                  </h3>
                  {aboutPageSettings?.subtitle ? (
                    <p className="font-grotesque font-light text-sm sm:text-base text-[#888888] leading-relaxed max-w-xl whitespace-pre-wrap">
                      {aboutPageSettings.subtitle}
                    </p>
                  ) : (
                    <>
                      <p className="font-grotesque font-light text-sm sm:text-base text-[#888888] leading-relaxed max-w-xl">
                        Vygrid Digital Studio is an editorial-grade custom web development and brand identity studio. We work with established, founder-led brands whose visual presence hasn&apos;t caught up to what they&apos;ve built.
                      </p>
                      <p className="font-grotesque font-light text-sm sm:text-base text-[#888888] leading-relaxed max-w-xl">
                        We eliminate rounded corners, decorative gradients, and unnecessary visual clutter. We believe typography, generous layout spacing, and deliberate weighting are the core coordinates of premium execution.
                      </p>
                    </>
                  )}
                </div>

                {/* Team Grid */}
                <div className="space-y-6">
                  <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
                    OUR CORE DIRECTORS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {displayTeam.map((member: any) => (
                      <div key={member.name} className="space-y-3">
                        <div className="relative aspect-square w-full bg-[#1A1A1A]">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-grotesque font-bold text-xs uppercase tracking-wider text-[#F5F0EB]">{member.name}</h5>
                          <span className="font-mono text-[9px] text-[#888888] uppercase tracking-widest">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities list */}
                <div className="space-y-4">
                  <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
                    STUDIO CONVICTIONS
                  </h4>
                  <ul className="space-y-3 font-grotesque text-sm font-light text-[#888888]">
                    <li className="flex items-center space-x-2 text-[#F5F0EB]">
                      <span className="w-1.5 h-1.5 bg-[#C8B89A]" />
                      <span>Zero border-radius templates — strictly linear layouts</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-white/20" />
                      <span>Playfair Display serif headings matched to grotesque Inter body</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-white/20" />
                      <span>Targeting 98+ PageSpeed core web vitals on edge CDNs</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>

            {/* Word Marquee at the very bottom */}
            <div className="w-full bg-[#0A0A0B] py-6 border-t border-white/5 overflow-hidden relative">
              <div className="flex animate-marquee-slow whitespace-nowrap min-w-full items-center justify-around">
                {scrollWords.map((word, idx) => (
                  <div
                    key={idx}
                    className="inline-flex mx-8 font-mono text-[10px] font-bold text-white/30 hover:text-[#C8B89A] transition-colors duration-300 pointer-events-none select-none items-center"
                  >
                    <span>{word}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B89A]/30 ml-8" />
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
