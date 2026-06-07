'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import TextReveal from '@/components/ui/TextReveal';
import Accordion from '@/components/ui/Accordion';
import { brandServices, brandFAQs } from '@/lib/data';

interface LogoBrandingClientProps {
  companyName?: string;
}

export default function LogoBrandingClient({ companyName }: LogoBrandingClientProps) {
  const displayCompanyName = companyName || "Vygrid Digital Studio";
  const displayCompanyNameClean = displayCompanyName.replace(/Digital Studio/i, '').trim();
  const displayLetter = displayCompanyNameClean.charAt(0).toUpperCase() || "V";
  const displayInitials = displayCompanyNameClean
    .split(/\s+/)
    .map((w: string) => w.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase() || "VG";
  const priceTiers = [
    {
      name: "Starter Logo",
      price: "₹2,000",
      description: "Basic strategic emblem and clean typographic mark for new ideas.",
      features: [
        "2 Bespoke vector directions",
        "Primary logo & Icon version",
        "Selected color guidelines",
        "Clean Vector master files (.ai, .svg)",
        "2 Rounds of adjustments",
        "1 Week delivery cycle"
      ],
      recommended: false,
    },
    {
      name: "Studio Identity",
      price: "₹5,000",
      description: "Comprehensive visual branding, guidelines, and corporate kit.",
      features: [
        "3 Unique logo design directions",
        "Primary, horizontal, & icon monograms",
        "Spot-UV custom stationery specs",
        "Social media posting matrices",
        "Detailed 80-page brand book PDF",
        "Synced Figma Styles Library",
        "3 Rounds of layout adjustments",
        "3 Weeks expert delivery"
      ],
      recommended: true,
    },
    {
      name: "Enterprise Refresh",
      price: "₹10,000+",
      description: "Legacy re-branding, custom packaging design, and commercial pitch deck templates.",
      features: [
        "In-depth market competitor analysis",
        "Legacy transition strategic plan",
        "Custom box packaging die-lines",
        "Tactile linen stock printer matches",
        "30-Slide Keynote investor deck template",
        "Master digital patterns & patterns guides",
        "Unlimited custom adjustments",
        "5 Weeks priority delivery"
      ],
      recommended: false,
    }
  ];

  const deliverables = [
    { label: "Vector Masters", detail: ".AI / .EPS / .PDF files fully scalable without pixel decay" },
    { label: "Web Optimized SVGs", detail: "Lightweight, responsive vector graphics optimized for CSS styling" },
    { label: "High-Res Rasters", detail: "Transparent PNGs and print-ready JPGs optimized for dark & light displays" },
    { label: "Print Specifications", detail: "Specific Pantone color guidelines and textured paper stock coordinates" },
    { label: "Figma Library Guide", detail: "Synced colors, heading tokens, and component files for your frontend devs" }
  ];

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-24 space-y-24 md:space-y-36 selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
        >
          <span>← BACK</span>
        </Link>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#888888] block uppercase">
            01 / SERVICES / LOGO & BRAND IDENTITY
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text="Logo & Brand Design." />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl"
          >
            Crafting mathematically precise geometric logos, iconic identity guidelines, B2B presentation boards, and unified Figma design systems. Every curve, line, and typeface is designed with rigorous intent to project credibility and premium legacy.
          </motion.p>
        </div>
      </section>

      {/* 2. CAPABILITIES GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              02 / CAPABILITIES
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Core Offerings
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888]">
            BRAND ARCHITECTURES & ALIGNMENTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {brandServices.map((service, idx) => (
            <div key={idx} className="p-8 md:p-10 space-y-8 bg-[#111111]/30 hover:bg-[#111111]/70 transition-colors duration-500 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="font-mono text-xs text-[#C8B89A] font-bold block">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="font-grotesque font-bold text-sm tracking-wider uppercase text-[#F5F0EB]">
                  {service.title}
                </h3>
                <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-2 pt-6 border-t border-white/5">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center space-x-2 text-[11px] font-mono text-[#888888]">
                    <span className="w-1 h-1 bg-[#C8B89A]" />
                    <span>{feature.toUpperCase()}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LOGO VARIANT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              03 / VISUAL FRAMEWORKS
            </span>
            <h2 className="font-serif italic text-3xl md:text-5xl text-[#F5F0EB] tracking-tight">
              Responsive Typography & Marks
            </h2>
            <p className="font-grotesque text-sm text-[#888888] font-light leading-relaxed max-w-lg">
              A premium brand must function flawlessly across every medium. We design custom vector frameworks that preserve legibility, contrast, and balance, whether embossed on heavy linen letterheads or rendered as a 16px digital icon.
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            {deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <span className="font-mono text-xs text-[#C8B89A] font-bold mt-0.5 select-none">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-grotesque font-bold text-xs uppercase tracking-wider text-[#F5F0EB]">{item.label}</h4>
                  <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 border border-white/10 bg-[#111111] p-8 flex flex-col justify-between relative">
          <span className="font-mono text-[9px] tracking-widest text-[#888888] block uppercase mb-8 border-b border-white/5 pb-4">
            {displayCompanyName.toUpperCase()} BRAND MONOGRAM EXPERIMENT
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            <div className="border border-white/10 bg-[#0A0A0A] p-6 flex flex-col justify-center items-center h-32 select-none">
              <span className="font-mono text-base font-bold tracking-[0.2em] text-[#F5F0EB]">{displayCompanyNameClean.toUpperCase()}</span>
              <span className="font-mono text-[8px] text-[#C8B89A] uppercase tracking-widest mt-2">Primary Mark</span>
            </div>

            <div className="bg-[#F5F0EB] p-6 flex flex-col justify-center items-center h-32 select-none text-[#0A0A0A]">
              <span className="font-mono text-base font-bold tracking-[0.1em]">{displayCompanyNameClean.toUpperCase()}.</span>
              <span className="font-mono text-[8px] text-[#0A0A0A]/40 uppercase tracking-widest mt-2">Alt Stamp</span>
            </div>

            <div className="border border-white/10 bg-[#0A0A0A] p-6 flex flex-col justify-center items-center h-32 select-none">
              <div className="w-10 h-10 border border-white/20 text-[#C8B89A] font-mono text-base flex items-center justify-center">
                {displayLetter}
              </div>
              <span className="font-mono text-[8px] text-[#888888] uppercase tracking-widest mt-2">Minimal Symbol</span>
            </div>

            <div className="border border-white/10 bg-[#1A1A1B] p-6 flex flex-col justify-center items-center h-32 select-none">
              <span className="font-mono text-lg font-bold text-white border border-white px-3 py-1">{displayInitials}</span>
              <span className="font-mono text-[8px] text-[#888888] uppercase tracking-widest mt-2">Mono Stamp</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING TIERS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              04 / PRICING
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Pricing & Deliverables
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[280px] leading-relaxed">
            Consistent, high-impact visuals designed to position your studio for premium returns.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {priceTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`border p-8 flex flex-col justify-between space-y-8 relative ${
                tier.recommended ? 'border-[#C8B89A]' : 'border-white/10'
              } bg-[#111111]`}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-6 bg-[#C8B89A] text-[#0A0A0A] px-3 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest">
                  RECOMMENDED
                </span>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-grotesque font-bold text-base uppercase tracking-wider text-[#F5F0EB]">
                    {tier.name}
                  </h3>
                  <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="py-4 border-t border-b border-white/5 flex items-baseline space-x-2">
                  <span className="font-serif italic text-3xl sm:text-4xl text-[#F5F0EB]">
                    {tier.price}
                  </span>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2.5 text-xs text-[#888888] font-grotesque font-light">
                      <Check className="w-3.5 h-3.5 text-[#C8B89A] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/5">
                <Link
                  href="/contact"
                  className={`w-full py-3 block text-center font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                    tier.recommended
                      ? 'bg-[#C8B89A] text-[#0A0A0A] hover:bg-[#F5F0EB]'
                      : 'border border-white/10 hover:border-[#C8B89A] hover:text-[#C8B89A]'
                  }`}
                >
                  SELECT PLAN →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
            05 / CLARIFICATION
          </span>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
            Frequently Asked Queries
          </h2>
        </div>

        <Accordion items={brandFAQs} />
      </section>

      {/* 6. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 border border-white/10 bg-[#111111] p-8 md:p-16 flex flex-col md:flex-row items-stretch justify-between gap-8 relative overflow-hidden">
        <div className="space-y-4 max-w-xl">
          <span className="font-mono text-[9px] tracking-widest text-[#C8B89A] block uppercase">
            COMMISSION AN IDENTITY
          </span>
          <h2 className="font-serif italic text-3xl md:text-5xl text-[#F5F0EB] tracking-tight">
            Forge a strategic, geometric brand legacy.
          </h2>
          <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed max-w-sm">
            Let&apos;s audit your current positioning and coordinate a custom brand roadmap.
          </p>
        </div>

        <div className="flex items-center md:justify-end">
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#C8B89A] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#F5F0EB] hover:text-[#0A0A0A] transition-all duration-300"
          >
            START BRAND PROJECT →
          </Link>
        </div>
      </section>
    </div>
  );
}
