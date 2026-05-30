'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TextReveal from '@/components/ui/TextReveal';
import ImageReveal from '@/components/ui/ImageReveal';
import Accordion from '@/components/ui/Accordion';
import { webServices, webFAQs, projects } from '@/lib/data';

export default function WebDevelopmentClient() {
  const relatedProjects = projects.filter(p => p.category === 'Web Development' || p.category === 'E-Commerce').slice(0, 3);

  const priceTiers = [
    {
      name: "Starter Site",
      price: "$3,500",
      description: "Perfect for bold startups needing high-converting visibility fast.",
      features: [
        "Custom Animated Landing Page",
        "Pristine Framer Motion reveals",
        "Zod Validated Contact Form",
        "98+ Lighthouse Speed Score",
        "Basic static metadata setup",
        "1 Week post-launch assistance"
      ],
      recommended: false,
    },
    {
      name: "Studio Site",
      price: "$7,500",
      description: "Complete strategic web platform with content management controls.",
      features: [
        "Up to 8 custom page templates",
        "Headless CMS integration (Sanity)",
        "Immersive interactive canvas elements",
        "Fully optimized mobile responsiveness",
        "Schema.org & dynamic OG Tags",
        "Stripe payment/checkout hooks",
        "4 Weeks post-launch optimization"
      ],
      recommended: true,
    },
    {
      name: "Enterprise App",
      price: "$15,000+",
      description: "Bespoke SaaS portal, dense dashboard or multi-vendor commerce.",
      features: [
        "Tailored web application structure",
        "Real-time WebSocket server feeds",
        "Secure custom Database structures",
        "Multi-tier user dashboard access",
        "Stripe split subscription billing",
        "Dense Recharts analytics logs",
        "Dedicated quarterly engineers SLA"
      ],
      recommended: false,
    }
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
            01 / SERVICES / WEB DEVELOPMENT
          </span>
          <h1 className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text="Custom Web Development." />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl"
          >
            Engineered using Next.js, TypeScript, and Framer Motion. We build blistering fast interfaces, highly converting checkouts, and dense software dashboards. Every layout is strictly responsive, using responsive spacing systems and zero bloated dependencies.
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
              Core Competencies
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888]">
            PRAGMATIC COMPUTATIONAL WORKFLOWS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {webServices.map((service, idx) => (
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

      {/* 3. PRICING MATRIX */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              03 / FLAT RATES
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Pricing & Curation
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[280px] leading-relaxed">
            Transparent scaling tiers with no hidden retainers. We deliver full codebase ownership.
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
                  <span className="font-mono text-[10px] text-[#888888] uppercase">FLAT RATE</span>
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

      {/* 4. RELATED PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              04 / CASE STUDIES
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Proven Web Projects
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888]">
            PRODUCTION BENCHMARKS & INQUIRIES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProjects.map((project) => (
            <Link
              href={`/portfolio/${project.slug}`}
              key={project.id}
              className="border border-white/10 bg-[#111111] p-6 space-y-6 block group hover:border-[#C8B89A] transition-colors duration-500"
            >
              <div className="relative aspect-[16/10] w-full bg-[#1A1A1A] overflow-hidden">
                <ImageReveal className="w-full h-full">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:scale-103 group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-w-768px) 100vw, 300px"
                  />
                </ImageReveal>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[9px] text-[#C8B89A] tracking-wider block uppercase">
                  {project.category}
                </span>
                <h3 className="font-grotesque font-bold text-sm tracking-wide text-[#F5F0EB] group-hover:text-[#C8B89A] transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </Link>
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

        <Accordion items={webFAQs} />
      </section>

      {/* 6. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 border border-white/10 bg-[#111111] p-8 md:p-16 flex flex-col md:flex-row items-stretch justify-between gap-8 relative overflow-hidden">
        <div className="space-y-4 max-w-xl">
          <span className="font-mono text-[9px] tracking-widest text-[#C8B89A] block uppercase">
            COMMISSION A PROJECT
          </span>
          <h2 className="font-serif italic text-3xl md:text-5xl text-[#F5F0EB] tracking-tight">
            Ready to secure 99+ speed scores and custom layouts?
          </h2>
          <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed max-w-sm">
            Let&apos;s map your system requirements and coordinate a customized digital launch blueprint.
          </p>
        </div>

        <div className="flex items-center md:justify-end">
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#C8B89A] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#F5F0EB] hover:text-[#0A0A0A] transition-all duration-300"
          >
            START WEB PROJECT →
          </Link>
        </div>
      </section>
    </div>
  );
}
