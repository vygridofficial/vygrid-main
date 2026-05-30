'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const spotlightPlans = [
    {
      category: "CUSTOM WEB DEVELOPMENT",
      name: "Studio Site Package",
      price: "$7,500",
      description: "Complete strategic web platform with tailored content management controls and full animations.",
      features: [
        "Up to 8 custom page templates",
        "Headless CMS integration (Sanity)",
        "Immersive interactive canvas elements",
        "Fully optimized mobile responsiveness",
        "Schema.org & dynamic OG Tags",
        "Stripe payment/checkout hooks"
      ],
      link: "/pricing?tab=web"
    },
    {
      category: "LOGO & BRAND IDENTITY",
      name: "Studio Identity Package",
      price: "$5,000",
      description: "Comprehensive visual branding system, responsive vectors, brand book, and synced corporate kit.",
      features: [
        "3 Unique logo design directions",
        "Primary, horizontal, & icon monograms",
        "Spot-UV custom stationery specs",
        "Social media posting matrices",
        "Detailed 80-page brand book PDF",
        "Synced Figma Styles Library"
      ],
      link: "/pricing?tab=brand"
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/5 select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2.5">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
              05 / STUDIO RATES
            </span>
            <h2 className="font-serif italic font-light text-4xl sm:text-6xl text-[#F5F0EB]">
              Pricing & Curation
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[280px] leading-relaxed">
            Transparent flat rates with full code and asset ownership. No hidden monthly maintainers.
          </span>
        </div>

        {/* Flagship Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {spotlightPlans.map((plan, idx) => (
            <div
              key={idx}
              className="border border-white/10 p-8 sm:p-10 bg-[#111111]/30 hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-8 relative"
            >
              <span className="absolute top-8 right-8 bg-[#C8B89A]/10 text-[#C8B89A] px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest">
                FLAGSHIP
              </span>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#888888] block">
                    {plan.category}
                  </span>
                  <h3 className="font-grotesque font-bold text-lg uppercase tracking-wider text-[#F5F0EB]">
                    {plan.name}
                  </h3>
                  <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="py-4 border-t border-b border-white/5 flex items-baseline space-x-2">
                  <span className="font-serif italic text-3xl text-[#F5F0EB]">
                    {plan.price}
                  </span>
                  <span className="font-mono text-[8px] text-[#888888] uppercase">FLAT RATE</span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-[11px] text-[#888888] font-grotesque font-light">
                      <Check className="w-3 h-3 text-[#C8B89A] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/5">
                <Link
                  href={plan.link}
                  className="w-full py-3.5 block text-center font-mono text-[10px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#C8B89A] hover:text-[#C8B89A] transition-all duration-300"
                >
                  VIEW PLAN IN MATRIX &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Redirect */}
        <div className="flex flex-col sm:flex-row items-center justify-between border border-white/10 bg-[#111111]/50 p-8 sm:p-12 gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif italic text-2xl text-[#F5F0EB]">
              Need a bespoke dynamic audit?
            </h4>
            <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed max-w-md">
              Explore our full package catalog, download our technical checklists, or alternate between Web and Branding service options.
            </p>
          </div>
          <Link
            href="/pricing"
            className="px-8 py-4 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 whitespace-nowrap"
          >
            <span>EXPLORE FULL PRICING MATRIX</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
