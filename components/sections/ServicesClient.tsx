'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Globe, 
  ShoppingBag, 
  LayoutDashboard, 
  Zap, 
  FolderEdit, 
  ShieldCheck,
  Compass, 
  Layers, 
  Mail, 
  Share2, 
  RefreshCw, 
  Presentation,
  Plus,
  Minus
} from 'lucide-react';
import { webServices as fallbackWeb, brandServices as fallbackBrand } from '@/lib/data';
import TextReveal from '@/components/ui/TextReveal';

// Dynamic Icon Mapper
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  ShoppingBag,
  LayoutDashboard,
  Zap,
  FolderEdit,
  ShieldCheck,
  Compass,
  Layers,
  Mail,
  Share2,
  RefreshCw,
  Presentation
};

interface ServicesClientProps {
  webServices?: any[];
  brandServices?: any[];
}

export default function ServicesClient({ webServices, brandServices }: ServicesClientProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number | null>(null);

  const displayWeb = webServices || fallbackWeb;
  const displayBrand = brandServices || fallbackBrand;

  // Combine services with categorisation
  const allServices = [
    ...displayWeb.map(s => ({ ...s, group: "CUSTOM WEB DEVELOPMENT" })),
    ...displayBrand.map(s => ({ ...s, group: "LOGO & BRAND IDENTITY" }))
  ];

  const handleRowClick = (idx: number) => {
    setMobileActiveIdx(mobileActiveIdx === idx ? null : idx);
  };

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-28 min-h-screen selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
        >
          <span>← BACK TO HOME</span>
        </Link>
      </div>

      {/* Hero / Header Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#C8B89A] block uppercase">
            02 / CORE CAPABILITIES
          </span>
          <h1 className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text="Bespoke Briefings." />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl"
          >
            Hover or tap to reveal capabilities. Every service follows our mathematical grid alignment, typographic precision, and strict performance targets.
          </motion.p>
        </div>
      </section>

      {/* Interactive Hover-Reveal List */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-t border-white/10 divide-y divide-white/10">
          {allServices.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Globe;
            const isHovered = hoveredIdx === idx;
            const isMobileOpen = mobileActiveIdx === idx;
            const isOpen = isHovered || isMobileOpen;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleRowClick(idx)}
                className="py-8 md:py-10 cursor-pointer transition-colors duration-300 select-none block group outline-none"
              >
                {/* Row Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-6 md:space-x-8">
                    <span className="font-mono text-xs text-[#888888] select-none block min-w-[20px]">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <IconComponent className="w-5 h-5 text-[#888888] group-hover:text-[#C8B89A] transition-colors duration-300 flex-shrink-0" />
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6 gap-1">
                      <h3 className="font-grotesque font-bold text-base sm:text-lg uppercase tracking-wider text-[#F5F0EB] group-hover:text-[#C8B89A] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <span className="font-mono text-[8px] text-[#444444] group-hover:text-[#C8B89A]/50 tracking-widest uppercase transition-colors duration-300">
                        {service.group}
                      </span>
                    </div>
                  </div>
                  
                  {/* Plus / Minus Indicator Icon */}
                  <div className="text-[#888888] group-hover:text-[#C8B89A] transition-colors duration-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                {/* Sliding Reveal Body */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pl-12 md:pl-14 pt-6 space-y-6 max-w-4xl">
                    <p className="font-grotesque text-sm text-[#888888] font-light leading-relaxed max-w-2xl">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-2.5">
                      {service.features?.map((feature: string, fIdx: number) => (
                        <span
                          key={fIdx}
                          className="font-mono text-[9px] border border-white/10 px-3 py-1 bg-[#111111] text-[#888888] uppercase tracking-wider"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTAs Inside Expansion */}
                    <div className="flex items-center space-x-6 pt-4">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="font-mono text-[10px] font-bold tracking-widest text-[#C8B89A] hover:text-[#F5F0EB] transition-colors duration-300 uppercase flex items-center space-x-1"
                      >
                        <span>BOOK BRIEFING</span>
                        <span>&rarr;</span>
                      </Link>
                      
                      <Link
                        href={service.group === "CUSTOM WEB DEVELOPMENT" ? "/services/web-development" : "/services/logo-branding"}
                        className="font-mono text-[9px] text-[#555555] hover:text-[#888888] tracking-widest uppercase transition-colors duration-300"
                      >
                        VIEW DETAIL MATRIX
                      </Link>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
