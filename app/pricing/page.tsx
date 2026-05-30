'use client';

import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { webPricingTiers, brandPricingTiers } from '@/lib/data';
import TextReveal from '@/components/ui/TextReveal';
import Accordion from '@/components/ui/Accordion';

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <PricingPageContent />
    </Suspense>
  );
}

function PricingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab') || 'web';
  const activeTab = tabParam === 'brand' ? 'brand' : 'web';

  const activeTiers = activeTab === 'web' ? webPricingTiers : brandPricingTiers;

  const setActiveTab = (tab: 'web' | 'brand') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push('/pricing?' + params.toString(), { scroll: false });
  };

  const faqs = activeTab === 'web' 
    ? [
        { q: "How long does a custom Next.js website build take?", a: "A bespoke site takes 4 to 8 weeks on average. Landing pages can be delivered in 2 to 3 weeks, while dense enterprise portals require 8 to 12 weeks of structured development." },
        { q: "Will my website achieve 95+ speed scores on mobile?", a: "Yes. We strictly target 98+ scores using static generation, dynamic CDN caching, and zero-bloat custom code structures." },
        { q: "Do you offer post-launch maintenance agreements?", a: "Yes, our dedicated SLAs cover daily off-site database backups, security auditing, and continuous page speed checks." }
      ]
    : [
        { q: "What files do I receive upon branding handoff?", a: "You receive industry-standard vector files (.AI, .EPS, .SVG, .PDF) alongside high-res rasters (.PNG, .JPG) for dark/light interfaces." },
        { q: "How many revisions are included in the projects?", a: "Starter plans include 2 rounds, while Studio plans include 3 rounds. Enterprise plans feature unlimited adjustments until completion." },
        { q: "Can you design physical packaging formats?", a: "Yes, we specialize in high-end structural custom unboxing designs with spot-UV hot-foil specifications." }
      ];

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

      {/* Hero / Header Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#C8B89A] block uppercase">
            05 / INVESTMENT MATRIX
          </span>
          <h1 className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text="Transparent Tiers." />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl"
          >
            No hidden retainers, no hourly inflation. We deliver full codebase and vector ownership with strict flat rates matching your digital deliverables.
          </motion.p>
        </div>
      </section>

      {/* Tab Switcher Panel */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex border border-white/10 p-1.5 max-w-md bg-[#111111]/30">
          <button
            onClick={() => setActiveTab('web')}
            className={`flex-1 py-3 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'web'
                ? 'bg-[#C8B89A] text-[#0A0A0A]'
                : 'text-[#888888] hover:text-[#F5F0EB]'
            }`}
          >
            CUSTOM WEB DEVELOPMENT
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`flex-1 py-3 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'brand'
                ? 'bg-[#C8B89A] text-[#0A0A0A]'
                : 'text-[#888888] hover:text-[#F5F0EB]'
            }`}
          >
            LOGO & BRAND IDENTITY
          </button>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {activeTiers.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: idx * 0.05 }}
                className={`border p-8 md:p-10 flex flex-col justify-between space-y-8 relative bg-[#111111]/40 ${
                  tier.recommended ? 'border-[#C8B89A]' : 'border-white/10'
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-8 bg-[#C8B89A] text-[#0A0A0A] px-3 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest">
                    RECOMMENDED PACKAGE
                  </span>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-grotesque font-bold text-base uppercase tracking-wider text-[#F5F0EB]">
                      {tier.name}
                    </h3>
                    <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed min-h-[40px]">
                      {tier.description}
                    </p>
                  </div>

                  <div className="py-4 border-t border-b border-white/5 flex items-baseline space-x-2">
                    <span className="font-serif italic text-3xl sm:text-4xl text-[#F5F0EB]">
                      {tier.price}
                    </span>
                    <span className="font-mono text-[9px] text-[#888888] uppercase">FLAT RATE</span>
                  </div>

                  <ul className="space-y-3.5">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-xs text-[#888888] font-grotesque font-light">
                        <Check className="w-3.5 h-3.5 text-[#C8B89A] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <Link
                    href={`/start-your-project?package=${encodeURIComponent(tier.name)}&type=${encodeURIComponent(activeTab === 'web' ? 'Web Development' : 'Branding')}`}
                    className={`w-full py-4 block text-center font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                      tier.recommended
                        ? 'bg-[#C8B89A] text-[#0A0A0A] hover:bg-[#F5F0EB]'
                        : 'border border-white/10 hover:border-[#C8B89A] hover:text-[#C8B89A]'
                    }`}
                  >
                    CHOOSE THIS PLAN →
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 border-t border-white/10 pt-20">
        <div className="text-center space-y-2 mb-12">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
            05 / CLARIFICATION
          </span>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
            Tiers Inquiries
          </h2>
        </div>

        <Accordion items={faqs} />
      </section>
    </div>
  );
}
