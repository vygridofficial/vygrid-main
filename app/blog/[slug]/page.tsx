'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import TextReveal from '@/components/ui/TextReveal';

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-28 min-h-screen selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-4 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
        >
          <span>← BACK TO JOURNAL</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 mb-12 md:mb-16 space-y-6">
        <div className="flex items-center space-x-4 font-mono text-[10px] tracking-wider text-[#C8B89A]">
          <span className="font-bold uppercase">{post.category}</span>
          <span className="text-[#888888]">&middot;</span>
          <span className="text-[#888888]">{post.date.toUpperCase()}</span>
        </div>

        <h1 className="font-serif italic text-3xl sm:text-4xl md:text-6xl text-[#F5F0EB] tracking-tight leading-[1.1] font-light">
          <TextReveal text={post.title} />
        </h1>

        <p className="font-grotesque text-sm sm:text-base text-[#888888] font-light leading-relaxed">
          {post.excerpt}
        </p>
      </section>

      {/* Hero Image */}
      <section className="max-w-2xl mx-auto px-6 mb-12">
        <div className="relative aspect-[16/9] w-full bg-[#111111] border border-white/5">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover grayscale brightness-90"
            sizes="(max-w-1024px) 100vw, 800px"
            priority
          />
        </div>
      </section>

      {/* Narrative Body Copy */}
      <article className="max-w-3xl mx-auto px-6 space-y-8 font-grotesque text-sm sm:text-base text-[#888888] font-light leading-relaxed">
        <p>
          At Vygrid, we believe that premium execution is a direct derivative of restraint. In modern digital systems, visually cluttered grids and decorative flourishes represent a lack of structural conviction. When we examine luxury editorial design, we find that visual gravity is achieved through careful weight distributions and generous whitespace.
        </p>
        <p className="font-serif italic text-lg sm:text-xl text-[#F5F0EB] border-l border-[#C8B89A] pl-6 my-8">
          &ldquo;Whitespace is not empty space; it is structural leverage. It dictates where the user&apos;s eye rests and establishes immediate typographic authority.&rdquo;
        </p>
        <p>
          We construct custom web interfaces that pass stringent Lighthouse audits, maintaining perfect 100 scores across Performance, Accessibility, and SEO. By removing bloated external dependencies and crafting clean Next.js React components from scratch, we build functional sites that remain fast for years.
        </p>
        <p>
          In terms of visual identity, the exact same rules of mathematical grid precision apply. Emblems must be fully recognizable down to 16px stamps, and vector marks must maintain perfect clarity without visual artifacting.
        </p>
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[9px] text-[#444444] uppercase tracking-widest">
            EST. 2026 &middot; VYGRID EDITORIAL
          </div>
        </div>
      </article>
    </div>
  );
}
