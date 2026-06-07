'use client';

import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import TextReveal from '@/components/ui/TextReveal';
import PlanContactModal from '@/components/ui/PlanContactModal';

interface ServicePricingItem {
  id: string;
  serviceName: string;
  priceRange: string;
  features: string[];
  imageUrl?: string;
}

interface PricingClientProps {
  servicePricing?: ServicePricingItem[];
  pageSettings?: {
    sectionLabel: string;
    heading: string;
    description: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
  };
}

// Fallback cards shown when no admin data exists yet
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

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
];

export default function PricingClient({ servicePricing, pageSettings }: PricingClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <PricingPageContent servicePricing={servicePricing} pageSettings={pageSettings} />
    </Suspense>
  );
}

function PricingPageContent({ servicePricing, pageSettings }: PricingClientProps) {
  const items =
    servicePricing && servicePricing.length > 0 ? servicePricing : FALLBACK_PRICING;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ServicePricingItem | null>(null);

  const openModal = (item: ServicePricingItem) => {
    setSelectedPlan(item);
    setModalOpen(true);
  };

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-28 min-h-screen selection:bg-[#C8B89A] selection:text-[#0A0A0A]">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
        >
          <span>← BACK TO HOME</span>
        </Link>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#C8B89A] block uppercase">
            {pageSettings?.sectionLabel || 'INVESTMENT MATRIX'}
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text={pageSettings?.heading || 'Transparent Rates.'} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl whitespace-pre-line"
          >
            {pageSettings?.description || 'No hidden retainers, no hourly inflation. Full codebase and asset ownership with strict flat rates matching your deliverables.'}
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const image = item.imageUrl || DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length];
            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: idx * 0.07 }}
                className="border border-white/10 bg-[#111111]/40 hover:border-[#C8B89A]/50 transition-all duration-500 flex flex-col group"
              >
                {/* Card image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={image}
                    alt={item.serviceName}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
                </div>

                <div className="p-8 flex flex-col flex-grow space-y-5">
                  {/* Title */}
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] tracking-widest text-[#555555] block uppercase">
                      STUDIO DELIVERABLE
                    </span>
                    <h3 className="font-grotesque font-bold text-sm uppercase tracking-wider text-[#F5F0EB] leading-tight">
                      {item.serviceName}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-t border-b border-white/5 flex items-baseline space-x-2">
                    <span className="font-serif italic text-3xl text-[#F5F0EB]">
                      {item.priceRange}
                    </span>
                    <span className="font-mono text-[9px] text-[#888888] uppercase">FLAT RATE</span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 flex-grow">
                    {(item.features || []).map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start space-x-3 text-xs text-[#888888] font-grotesque font-light"
                      >
                        <Check className="w-3.5 h-3.5 text-[#C8B89A] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — now opens modal */}
                  <div className="pt-4 border-t border-white/5">
                    <button
                      onClick={() => openModal(item)}
                      className="w-full py-4 block text-center font-mono text-[10px] font-bold tracking-widest uppercase border border-white/10 hover:border-[#C8B89A] hover:text-[#C8B89A] transition-all duration-300 cursor-pointer bg-transparent text-[#F5F0EB]"
                    >
                      CHOOSE THIS PLAN →
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between border border-white/10 bg-[#111111]/50 p-8 sm:p-12 gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif italic text-2xl text-[#F5F0EB]">
              {pageSettings?.ctaTitle || 'Need a bespoke package?'}
            </h4>
            <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed max-w-md whitespace-pre-line">
              {pageSettings?.ctaDescription || "Every project is different. Tell us about yours and we'll craft a solution around your exact requirements and budget."}
            </p>
          </div>
          <Link
            href="/start-your-project"
            className="px-8 py-4 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center space-x-2 whitespace-nowrap"
          >
            <span>{pageSettings?.ctaButtonText || 'START YOUR PROJECT'}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </section>

      {/* Plan Contact Modal */}
      {selectedPlan && (
        <PlanContactModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          planName={selectedPlan.serviceName}
          planPrice={selectedPlan.priceRange}
          planFeatures={selectedPlan.features}
        />
      )}
    </div>
  );
}
