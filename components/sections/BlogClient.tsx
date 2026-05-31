'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts as fallbackPosts } from '@/lib/data';
import TextReveal from '@/components/ui/TextReveal';
import ImageReveal from '@/components/ui/ImageReveal';

interface BlogClientProps {
  blogPosts?: any[];
}

export default function BlogClient({ blogPosts }: BlogClientProps) {
  const displayPosts = blogPosts || fallbackPosts;

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
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#C8B89A] block uppercase">
            04 / INSIGHTS & JOURNAL
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text="The Editorial Grid." />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl"
          >
            Bespoke writing on front-end speed, typographic clarity, geometric branding models, and computational digital strategy. We share our studio convictions and operational insights.
          </motion.p>
        </div>
      </section>

      {/* Grid List of Blog Posts */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-t border-white/10 pt-16">
          {displayPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col space-y-5 group cursor-pointer transition-all duration-300"
            >
              {/* Featured Image Container */}
              <div className="relative aspect-[16/9] w-full bg-[#111111] overflow-hidden border border-white/5">
                <ImageReveal className="w-full h-full">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 brightness-90 group-hover:brightness-100"
                    sizes="(max-w-768px) 100vw, 400px"
                  />
                </ImageReveal>
              </div>

              {/* Text Meta Container */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-[#888888]">
                  <span className="text-[#C8B89A] font-bold uppercase">{post.category}</span>
                  <span>{post.date?.toUpperCase()}</span>
                </div>

                <h3 className="font-serif italic text-lg sm:text-xl text-[#F5F0EB] group-hover:text-[#C8B89A] transition-colors duration-300 leading-tight">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 font-mono text-[10px] font-bold tracking-widest text-[#F5F0EB] hover:text-[#C8B89A] transition-colors duration-300 uppercase"
                  >
                    <span>READ INSIGHT</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
