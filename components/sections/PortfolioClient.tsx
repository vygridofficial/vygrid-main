'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { projects as fallbackProjects } from '@/lib/data';
import Badge from '@/components/ui/Badge';
import ImageReveal from '@/components/ui/ImageReveal';

interface PortfolioClientProps {
  projects?: any[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filter = searchParams.get('filter') || 'All';

  const setFilter = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === 'All') {
      params.delete('filter');
    } else {
      params.set('filter', val);
    }
    const query = params.toString();
    router.push(pathname + (query ? '?' + query : ''), { scroll: false });
  };

  const displayProjects = projects || fallbackProjects;

  const filteredProjects = displayProjects.filter((project) => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  const uniqueCategories = Array.from(new Set(displayProjects.map((p) => p.category).filter(Boolean)));

  const filterTabs = [
    { label: 'All Projects', value: 'All' },
    ...uniqueCategories.map((cat: any) => ({ label: cat, value: cat }))
  ];

  return (
    <div className="relative overflow-hidden w-full bg-[#0A0A0A] select-none text-[#F5F0EB]">
      
      {/* 1. HEADER SECTION */}
      <section className="py-24 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300 mb-4"
          >
            <span>← BACK</span>
          </Link>
          <Badge variant="accent">03 / CASE ARCHIVES</Badge>
          
          <h1 className="font-serif font-light text-3xl sm:text-7xl tracking-tight text-[#F5F0EB]">
            Selected Work
          </h1>
          
          <p className="font-grotesque font-light text-base sm:text-lg text-[#888888] max-w-xl leading-relaxed">
            A comprehensive record of custom web application developments, structural brand guidelines, and high-energy e-commerce layouts.
          </p>
        </div>
      </section>

      {/* 2. FILTER & GRID SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-12 relative min-h-screen">
        
        {/* Navigation Filters */}
        <div className="flex flex-wrap items-center justify-start gap-3 mb-16 border-b border-white/5 pb-6">
          {filterTabs.map((tab) => {
            const isSelected = filter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  isSelected
                    ? 'text-[#C8B89A] border-b border-[#C8B89A]'
                    : 'text-[#888888] hover:text-[#F5F0EB]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Master Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                  className="group relative flex flex-col justify-between space-y-4 h-[440px] text-left"
                >
                  <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full justify-between">
                    
                    {/* Image Wipe Reveal */}
                    <ImageReveal className="relative w-full h-[65%] bg-[#111111]">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        sizes="(max-w-768px) 100vw, 400px"
                      />
                    </ImageReveal>

                    {/* Meta descriptions */}
                    <div className="flex-grow flex flex-col justify-between pt-4">
                      <div>
                        <div className="flex items-center justify-between font-mono text-[9px] text-[#444444] mb-2 uppercase tracking-widest">
                          <span>{project.category}</span>
                          <span>{project.timeline.split(' ')[0]}</span>
                        </div>
                        <h3 className="font-serif italic text-xl text-[#F5F0EB] group-hover:text-[#C8B89A] transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                        <span className="text-[#888888]">
                          Client: <span className="text-[#F5F0EB]">{project.client}</span>
                        </span>
                        
                        <span className="text-[#C8B89A] uppercase tracking-wider flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300">
                          <span>VIEW</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </section>

    </div>
  );
}
