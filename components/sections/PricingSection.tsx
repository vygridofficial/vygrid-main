'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

interface ServicePricingItem {
  id: string;
  serviceName: string;
  priceRange: string;
  features: string[];
  imageUrl?: string;
}

interface PricingSectionProps {
  servicePricing?: ServicePricingItem[];
}

// Always-visible fallback data — shown when Firestore has no servicePricing yet
const FALLBACK_PRICING: ServicePricingItem[] = [
  {
    id: 'fallback-1',
    serviceName: 'Custom Website Development',
    priceRange: 'From ₹7,500',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    features: [
      'Up to 8 custom page templates',
      'CMS integration (Sanity / Firebase)',
      'Responsive & mobile-first design',
      'Page speed & SEO optimisation',
      'Schema.org structured data',
    ],
  },
  {
    id: 'fallback-2',
    serviceName: 'Logo & Brand Identity Kit',
    priceRange: 'From ₹5,000',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    features: [
      '3 unique logo design directions',
      'Primary, horizontal & icon monograms',
      'Full vector source file delivery',
      'Social media posting matrices',
      '80-page brand guidelines PDF',
    ],
  },
  {
    id: 'fallback-3',
    serviceName: 'App Development',
    priceRange: 'From ₹12,500',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    features: [
      'iOS & Android cross-platform build',
      'Firebase / Supabase backend',
      'Push notifications & auth flows',
      'App Store submission support',
      'QA-tested before handoff',
    ],
  },
  {
    id: 'fallback-4',
    serviceName: 'SEO & Digital Marketing',
    priceRange: 'From ₹3,500',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    features: [
      'Technical SEO audit & fixes',
      'Core Web Vitals optimisation',
      'Schema markup & rich results',
      'Google Search Console setup',
      'Monthly ranking reports',
    ],
  },
];

export default function PricingSection({ servicePricing }: PricingSectionProps) {
  // Use Firestore data if it exists and has items, otherwise fall back
  const items =
    servicePricing && servicePricing.length > 0 ? servicePricing : FALLBACK_PRICING;

  const defaultImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/5 select-none relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C8B89A]/3 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
              03 / INVESTMENT MATRIX
            </span>
            <h2 className="font-serif italic font-light text-4xl sm:text-7xl text-[#F5F0EB]">
              Pricing & Curation
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[300px] leading-relaxed">
            Transparent flat rates. Full codebase and asset ownership. No hidden monthly maintainers.
          </span>
        </div>

        {/* Disclaimer Notice */}
        <div className="mb-10 border border-[#C8B89A]/20 bg-[#C8B89A]/5 px-5 py-4 flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 w-4 h-4 text-[#C8B89A]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </span>
          <div className="space-y-0.5">
            <span className="block font-mono text-[9px] font-bold tracking-widest uppercase text-[#C8B89A]">
              PRICING NOTICE
            </span>
            <p className="font-grotesque text-[11px] text-[#888888] font-light leading-relaxed">
              All prices listed are <span className="text-[#F5F0EB] font-normal">base development estimates</span> for standard project scopes. Final pricing is determined after project discovery and may vary based on additional requirements, custom integrations, third-party services, or extended timelines. A detailed quote will be provided before any work commences.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {items.map((item, idx) => {
            const displayImage =
              item.imageUrl || defaultImages[idx % defaultImages.length];
            return (
              <div
                key={item.id || idx}
                className="border border-white/10 bg-[#111111]/30 hover:border-[#C8B89A]/50 hover:bg-[#111111]/70 transition-all duration-500 flex flex-col justify-between group"
              >
                {/* Card image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={displayImage}
                    alt={item.serviceName}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] tracking-widest text-[#888888] block uppercase">
                      STUDIO DELIVERABLE
                    </span>
                    <h3 className="font-grotesque font-bold text-sm uppercase tracking-wider text-[#F5F0EB] leading-tight">
                      {item.serviceName}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="py-3 border-t border-b border-white/5 flex items-baseline space-x-2">
                    <span className="font-serif italic text-2xl text-[#F5F0EB]">
                      {item.priceRange}
                    </span>
                    <span className="font-mono text-[8px] text-[#888888] uppercase">FLAT RATE</span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2 flex-grow">
                    {(item.features || []).slice(0, 5).map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start space-x-2 text-[11px] text-[#888888] font-grotesque font-light"
                      >
                        <Check className="w-3 h-3 text-[#C8B89A] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/start-your-project?service=${encodeURIComponent(item.serviceName)}`}
                    className="mt-4 w-full py-3 block text-center font-mono text-[9px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#C8B89A] hover:text-[#C8B89A] transition-all duration-300"
                  >
                    INQUIRE NOW &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between border border-white/10 bg-[#111111]/50 p-8 sm:p-12 gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif italic text-2xl text-[#F5F0EB]">
              Need a bespoke system audit?
            </h4>
            <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed max-w-md">
              Explore our full package catalogue, download our technical checklists, or alternate between Web and Branding options.
            </p>
          </div>
          <Link
            href="/pricing"
            className="px-8 py-4 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 whitespace-nowrap"
          >
            <span>EXPLORE FULL PRICING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
