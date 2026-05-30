'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [timeString, setTimeString] = useState('');

  // Live ticking clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeString(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0A0A0A] text-[#F5F0EB] pt-20 pb-8 border-t border-white/5 font-grotesque select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Left Column: Studio branding & navigation */}
          <div className="md:col-span-6 space-y-8">
            <div className="space-y-3 text-left">
              <span className="font-mono text-sm tracking-[0.2em]">VYGRID</span>
              <p className="text-[#888888] font-light text-sm max-w-xs leading-relaxed">
                Bespoke digital architecture and brand identity curation for established founder-led businesses.
              </p>
            </div>

            {/* Navigation block */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-wider">
              <Link href="/" className="hover:text-[#C8B89A] transition-colors">Home</Link>
              <Link href="/about" className="hover:text-[#C8B89A] transition-colors">About</Link>
              <Link href="/portfolio" className="hover:text-[#C8B89A] transition-colors">Work</Link>
              <Link href="/services/web-development" className="hover:text-[#C8B89A] transition-colors">Services</Link>
              <Link href="/contact" className="hover:text-[#C8B89A] transition-colors">Contact</Link>
            </div>
          </div>

          {/* Right Column: details, clock, booking status, and socials */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-4 text-left md:text-right">
            
            {/* Booking Status & Live Clock */}
            <div className="space-y-3">
              <div className="font-mono text-[10px] tracking-[0.15em] text-[#C8B89A] uppercase">
                BOOKING PROJECTS FOR Q2 2026
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#444444] block">
                  LOCAL TIME (UTC)
                </span>
                <span className="font-mono text-sm font-bold text-[#F5F0EB] block tracking-widest">
                  {timeString || "00:00:00"}
                </span>
              </div>
            </div>

            {/* Social channels (text only + Arrow) */}
            <div className="space-y-3 flex flex-col items-start sm:items-end">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#444444] block">
                CONNECT ONLINE
              </span>
              <div className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider items-start sm:items-end">
                <a href="#" className="hover:text-[#C8B89A] transition-colors inline-flex items-center space-x-1">
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#444444]" />
                </a>
                <a href="#" className="hover:text-[#C8B89A] transition-colors inline-flex items-center space-x-1">
                  <span>Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-[#444444]" />
                </a>
                <a href="#" className="hover:text-[#C8B89A] transition-colors inline-flex items-center space-x-1">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#444444]" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-left">
          
          {/* Copyright in tiny mono */}
          <div className="font-mono text-[9px] text-[#444444] tracking-wider">
            &copy; {currentYear} VYGRID DIGITAL STUDIO &middot; BRUTALIST LUXERY &middot; ALL RIGHTS RESERVED.
          </div>

          {/* Back to top text link */}
          <button
            onClick={handleScrollToTop}
            className="font-grotesque text-xs font-bold uppercase tracking-wider text-[#888888] hover:text-[#F5F0EB] transition-colors focus:outline-none"
          >
            Back to top &uarr;
          </button>
        </div>

      </div>
    </footer>
  );
}
