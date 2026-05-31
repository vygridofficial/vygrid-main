import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCMSData } from '@/lib/cms';
import ImageReveal from '@/components/ui/ImageReveal';
import TextReveal from '@/components/ui/TextReveal';

interface ProjectDetailProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const data = await getCMSData();
  return data.projects?.map((project) => ({
    slug: project.slug,
  })) || [];
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const data = await getCMSData();
  const project = data.projects?.find((p) => p.slug === params.slug);
  if (!project) return {};
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";

  return {
    title: `${project.title} Case Study | ${companyName}`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} Case Study | ${companyName}`,
      description: project.subtitle,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const data = await getCMSData();
  const projects = data.projects || [];
  const currentIdx = projects.findIndex((p) => p.slug === params.slug);
  
  if (currentIdx === -1) {
    notFound();
  }

  const project = projects[currentIdx];

  const prevProject = projects[currentIdx === 0 ? projects.length - 1 : currentIdx - 1];
  const nextProject = projects[currentIdx === projects.length - 1 ? 0 : currentIdx + 1];

  return (
    <article className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] min-h-screen selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      
      {/* 1. HERO HEADER */}
      <section className="relative w-full h-[60vh] min-h-[400px] bg-[#111111] overflow-hidden border-b border-white/10">
        <Image
          src={project.thumbnail}
          alt={`${project.title} Hero Spotlight`}
          fill
          priority
          className="object-cover opacity-40 grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/40" />
        
        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-4">
            <span className="font-mono text-[9px] text-[#C8B89A] uppercase tracking-[0.2em] block">
              {project.category.toUpperCase()}
            </span>
            <h1 className="font-serif italic text-4xl sm:text-5xl md:text-7xl tracking-tight text-[#F5F0EB] max-w-4xl font-light">
              <TextReveal text={project.title} />
            </h1>
            <p className="font-grotesque text-xs sm:text-sm md:text-base text-[#888888] font-light max-w-2xl leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT LAYOUT */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Metadata Sidebar (Left) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 h-fit">
            <div className="border border-white/10 p-8 bg-[#111111] space-y-6">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase border-b border-white/5 pb-4">
                CASE MATRIX
              </h3>
              
              <div className="space-y-6 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[#888888] block text-[9px] uppercase tracking-widest">CLIENT</span>
                  <span className="text-[#F5F0EB] block font-bold tracking-wider">{project.client?.toUpperCase()}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#888888] block text-[9px] uppercase tracking-widest">TIMELINE</span>
                  <span className="text-[#F5F0EB] block font-bold tracking-wider">{project.timeline?.toUpperCase()}</span>
                </div>

                {project.tech && project.tech.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[#888888] block text-[9px] uppercase tracking-widest">INFRASTRUCTURE</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tech.map((t: string) => (
                        <span key={t} className="px-3 py-1 border border-white/10 bg-[#0A0A0A] text-[9px] text-[#888888] hover:text-[#C8B89A] hover:border-[#C8B89A] transition-all duration-300 select-none">
                          {t.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

             {/* Launch CTA Widget */}
            <div className="border border-white/10 bg-[#111111] p-8 space-y-6">
              <h4 className="font-serif italic text-lg text-[#F5F0EB]">Inspired by this Case?</h4>
              <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                Let&apos;s evaluate your current architecture and forge customized digital assets for your business.
              </p>
              <Link
                href="/contact"
                className="w-full py-3 block text-center bg-[#C8B89A] text-[#0A0A0A] font-mono text-[9px] font-bold tracking-widest uppercase hover:bg-[#F5F0EB] transition-colors duration-300"
              >
                START A PROJECT →
              </Link>
            </div>
          </aside>

          {/* Primary Text Content Case Write-up (Right) */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            
            {/* Brief Description */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#888888] block uppercase">
                01 / OVERVIEW
              </span>
              <h2 className="font-serif italic text-2xl md:text-3xl text-[#F5F0EB]">
                Project Scope
              </h2>
              <p className="font-grotesque text-sm sm:text-base text-[#888888] font-light leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Problem & Solution block */}
            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#111111]/30">
                <div className="p-8 space-y-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#C8B89A] block uppercase">
                    THE CHALLENGE
                  </span>
                  <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-8 space-y-4">
                  <span className="font-mono text-[9px] tracking-widest text-[#C8B89A] block uppercase">
                    THE SOLUTION
                  </span>
                  <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Visual Showcase (instead of redesign comparison slider) */}
            {(project.projectImage || project.afterImage) && (
              <div className="space-y-6 pt-8 border-t border-white/10">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-widest text-[#888888] block uppercase">
                    02 / VISUAL SHOWCASE
                  </span>
                  <h3 className="font-serif italic text-xl md:text-2xl text-[#F5F0EB]">
                    Project Spotlight
                  </h3>
                </div>
                <div className="border border-white/10 p-1 bg-[#111111] relative aspect-video w-full overflow-hidden">
                  <img
                    src={project.projectImage || project.afterImage}
                    alt={`${project.title} Visual Showcase`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-750"
                  />
                </div>
              </div>
            )}

            {/* Performance Results section */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="space-y-6 pt-8 border-t border-white/10">
                <span className="font-mono text-[9px] tracking-widest text-[#888888] block uppercase">
                  03 / METRICS DEPLOYED
                </span>
                <h3 className="font-serif italic text-xl md:text-2xl text-[#F5F0EB]">
                  Commercial Performance
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m: any, idx: number) => (
                    <div key={idx} className="border border-white/10 p-6 bg-[#111111] space-y-2">
                      <div className="font-serif italic text-2xl sm:text-3xl text-[#C8B89A]">
                        {m.value}
                      </div>
                      <div className="font-mono text-[9px] tracking-widest uppercase text-[#888888]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Image Gallery block */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6 pt-8 border-t border-white/10">
                <span className="font-mono text-[9px] tracking-widest text-[#888888] block uppercase">
                  03 / PORTFOLIO SHOTS
                </span>
                <h3 className="font-serif italic text-xl md:text-2xl text-[#F5F0EB]">
                  Asset Showcase
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img: string, index: number) => (
                    <div key={index} className="relative aspect-video border border-white/10 overflow-hidden bg-[#111111]">
                      <ImageReveal className="w-full h-full">
                        <Image
                          src={img}
                          alt={`${project.title} Asset Showcase ${index + 1}`}
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-750"
                          sizes="(max-w-768px) 100vw, 400px"
                        />
                      </ImageReveal>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. PREV / NEXT NAVIGATION ANCHORS */}
      <section className="border-t border-white/10 py-12 bg-[#111111]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center font-mono text-[9px] tracking-widest">
          <Link
            href={`/portfolio/${prevProject.slug}`}
            className="flex items-center space-x-3 group max-w-[40%] text-[#888888] hover:text-[#C8B89A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left hidden sm:block">
              <span className="text-[7px] text-[#444444] uppercase tracking-widest block">PREVIOUS CASE</span>
              <span className="font-bold text-[#F5F0EB] uppercase group-hover:text-[#C8B89A] transition-colors block line-clamp-1">{prevProject.title}</span>
            </div>
          </Link>

          <Link
            href="/portfolio"
            className="text-[#888888] hover:text-[#C8B89A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C8B89A] after:transition-all after:duration-300 pb-1"
          >
            ALL ARCHIVES
          </Link>

          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="flex items-center space-x-3 group max-w-[40%] text-[#888888] hover:text-[#C8B89A] transition-colors"
          >
            <div className="text-right hidden sm:block">
              <span className="text-[7px] text-[#444444] uppercase tracking-widest block">NEXT CASE</span>
              <span className="font-bold text-[#F5F0EB] uppercase group-hover:text-[#C8B89A] transition-colors block line-clamp-1">{nextProject.title}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
