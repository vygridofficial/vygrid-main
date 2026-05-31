import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCMSData } from '@/lib/cms';
import TextReveal from '@/components/ui/TextReveal';

interface BlogPostDetailProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const data = await getCMSData();
  return data.blogPosts?.map((post) => ({
    slug: post.slug,
  })) || [];
}

export async function generateMetadata({ params }: BlogPostDetailProps): Promise<Metadata> {
  const data = await getCMSData();
  const post = data.blogPosts?.find((p) => p.slug === params.slug);
  if (!post) return {};
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";

  return {
    title: `${post.title} | ${companyName} Journal`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${companyName} Journal`,
      description: post.excerpt,
      images: [{ url: post.thumbnail }],
    },
  };
}

function renderContent(content: string) {
  if (!content) return null;
  const blocks = content.split('\n\n');
  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/, '').trim();
      return (
        <blockquote key={idx} className="font-serif italic text-lg sm:text-xl text-[#F5F0EB] border-l border-[#C8B89A] pl-6 my-8">
          &ldquo;{quoteText}&rdquo;
        </blockquote>
      );
    }
    return (
      <p key={idx}>
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailProps) {
  const data = await getCMSData();
  const post = data.blogPosts?.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const companyReg = data.generalSettings?.companyReg || "EST. 2026 • VYGRID EDITORIAL";

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-28 min-h-screen selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-4 mb-8 text-left">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
        >
          <span>← BACK TO JOURNAL</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 mb-12 md:mb-16 space-y-6 text-left">
        <div className="flex items-center space-x-4 font-mono text-[10px] tracking-wider text-[#C8B89A]">
          <span className="font-bold uppercase">{post.category}</span>
          <span className="text-[#888888]">&middot;</span>
          <span className="text-[#888888]">{post.date?.toUpperCase()}</span>
        </div>

        <h1 className="font-serif italic text-3xl sm:text-4xl md:text-6xl text-[#F5F0EB] tracking-tight leading-[1.1] font-light">
          <TextReveal text={post.title} />
        </h1>

        <p className="font-grotesque text-sm sm:text-base text-[#888888] font-light leading-relaxed">
          {post.excerpt}
        </p>
      </section>

      {/* Hero Image */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
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
      <article className="max-w-3xl mx-auto px-6 space-y-8 font-grotesque text-sm sm:text-base text-[#888888] font-light leading-relaxed text-left">
        {renderContent(post.content)}
        
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[9px] text-[#444444] uppercase tracking-widest">
            {companyReg}
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 border border-white/10 hover:border-[#C8B89A] text-[#F5F0EB] hover:text-[#C8B89A] font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
          >
            START A PROJECT &rarr;
          </Link>
        </div>
      </article>
    </div>
  );
}
