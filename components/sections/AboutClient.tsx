'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { team } from '@/lib/data';
import TextReveal from '@/components/ui/TextReveal';
import ImageReveal from '@/components/ui/ImageReveal';

export default function AboutClient() {
  const convictions = [
    {
      num: "I.",
      title: "Precision Engineering",
      description: "We are obsessed with pixel measurements, layout boundaries, speed benchmarks, and bulletproof web architectures."
    },
    {
      num: "II.",
      title: "Creative Integrity",
      description: "We never take visual shortcuts. Our identity design frameworks are mathematically precise and strategically positioned."
    },
    {
      num: "III.",
      title: "Active Partnership",
      description: "We work directly as an extension of your growth team, ensuring design assets support real-world commercial results."
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "DISCOVERY",
      description: "We dig deep into your product metrics, market challenges, user profiles, and design preferences before drawing a single grid line."
    },
    {
      step: "02",
      title: "DESIGN",
      description: "We construct high-fidelity visual guidelines, responsive design structures, custom typography monograms, and wireframes."
    },
    {
      step: "03",
      title: "DEVELOP",
      description: "Our engineers build using Next.js App Router, TypeScript, and Framer Motion, securing fast loading times and pristine code structures."
    },
    {
      step: "04",
      title: "DELIVER",
      description: "We audit performance, secure metadata tags, deploy on Vercel Edge Networks, and coordinate strategic launch blueprints."
    }
  ];

  const techStack = [
    "Figma", "React", "Next.js", "Tailwind CSS", "TypeScript",
    "Framer Motion", "Stripe API", "Node.js", "Supabase", "PostgreSQL"
  ];

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-24 space-y-24 md:space-y-36 selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#888888] block uppercase">
            01 / INTRODUCTION
          </span>
          <h1 className="font-serif italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text="Grid by grid. Pixel by pixel. Rebuilding the visual legacy." />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl"
          >
            Vygrid is a high-end digital studio merging structured programming with world-class identity design. In a web saturated with generic templates and bloated codebases, we serve as architects of visual restraint and computational performance. We eliminate rounded corners, decorative gradients, and unnecessary UI chrome.
          </motion.p>
        </div>
      </section>

      {/* 2. IMAGE REVEAL GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <div className="md:col-span-7 aspect-video md:aspect-[16/10] bg-[#111111] overflow-hidden border border-white/10 relative">
          <ImageReveal className="w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Vygrid Collaborative Studio Environment"
              fill
              className="object-cover grayscale brightness-90 transition-transform duration-700 hover:scale-105"
              sizes="(max-w-1024px) 100vw, 800px"
              priority
            />
          </ImageReveal>
        </div>
        <div className="md:col-span-5 border border-white/10 bg-[#111111] p-8 flex flex-col justify-between relative min-h-[250px]">
          <div>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute top-8 right-8" />
            <span className="font-mono text-[9px] tracking-widest text-[#888888] block uppercase mb-6">
              LIVE STUDIO STREAM
            </span>
            <p className="font-serif italic text-lg sm:text-xl text-[#F5F0EB]/80 leading-relaxed max-w-xs">
              &ldquo;Obsession over details is not a visual gimmick. It is the core of premium user experiences.&rdquo;
            </p>
          </div>
          <div className="border-t border-white/10 pt-6 mt-8">
            <span className="font-mono text-[9px] tracking-widest text-[#888888] block uppercase">
              ESTABLISHED IN Q2 2022
            </span>
            <span className="font-mono text-[10px] text-[#C8B89A] block mt-1 tracking-wider">
              LATENCY AUDIT: ACTIVE
            </span>
          </div>
        </div>
      </section>

      {/* 3. CORE CONVICTIONS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              02 / CORE PHILOSOPHY
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              What We Hold True
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[280px] leading-relaxed">
            Restraint is the ultimate form of digital elegance. We guide brands toward typographic clarity.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {convictions.map((val, idx) => (
            <div key={idx} className="p-8 md:p-10 space-y-6 bg-[#111111]/30 hover:bg-[#111111]/70 transition-colors duration-500">
              <span className="font-mono text-xs text-[#C8B89A] font-bold block">
                {val.num}
              </span>
              <h3 className="font-grotesque font-bold text-sm tracking-wider uppercase text-[#F5F0EB]">
                {val.title}
              </h3>
              <p className="font-grotesque text-sm text-[#888888] font-light leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OUR PROCESS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              03 / EXECUTION PATH
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Methodology
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888]">
            FOUR-STEP BLUEPRINT TO DEPLOYMENT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {methodology.map((step, idx) => (
            <div key={idx} className="border border-white/10 bg-[#111111] p-8 space-y-6 flex flex-col justify-between group hover:border-[#C8B89A] transition-colors duration-500">
              <div className="space-y-4">
                <span className="font-mono text-2xl font-light text-[#444444] group-hover:text-[#C8B89A] transition-colors duration-500 block leading-none">
                  {step.step}
                </span>
                <h3 className="font-mono text-xs font-bold tracking-widest text-[#F5F0EB] uppercase">
                  {step.title}
                </h3>
              </div>
              <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              04 / DIRECTORS
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Meet The Founders
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[280px] leading-relaxed">
            Creative architects and software engineers obsessed with modular layouts.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="border border-white/10 bg-[#111111] p-6 space-y-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="relative aspect-square w-full bg-[#1A1A1A] overflow-hidden border border-white/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-95"
                    sizes="(max-w-768px) 100vw, 250px"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-grotesque font-bold text-sm tracking-wide uppercase text-[#F5F0EB]">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[9px] text-[#C8B89A] uppercase tracking-widest block">
                    {member.role}
                  </span>
                </div>
                <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-white/5 font-mono text-[9px] tracking-wider text-[#888888]">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    className="hover:text-[#C8B89A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C8B89A] after:transition-all after:duration-300"
                  >
                    LINKEDIN
                  </a>
                )}
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    className="hover:text-[#C8B89A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C8B89A] after:transition-all after:duration-300"
                  >
                    TWITTER
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    className="hover:text-[#C8B89A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C8B89A] after:transition-all after:duration-300"
                  >
                    GITHUB
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TECH STACK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              05 / INFRASTRUCTURE
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Development Stack
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888]">
            PRODUCTION STANDARDS AND PROTOCOLS
          </span>
        </div>

        <div className="flex flex-wrap gap-3 max-w-4xl">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs border border-white/10 px-4 py-2 bg-[#111111] text-[#888888] hover:border-[#C8B89A] hover:text-[#C8B89A] transition-all duration-300 select-none cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
