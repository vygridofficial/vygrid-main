'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Services() {
  const row1 = [
    { name: "Web Development", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Website Renovation", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "App Development", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Logo Design", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Poster Design", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&h=150&q=80" }
  ];

  const row2 = [
    { name: "Graphic Design", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "AI Chatbot", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "SEO Optimisation", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Video Editing", img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=150&h=150&q=80" }
  ];

  const scrollRow1 = [...row1, ...row1, ...row1];
  const scrollRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/5 select-none overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-left">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block mb-4">
          02 / SERVICES
        </span>
        <h2 className="font-serif italic font-light text-4xl sm:text-6xl text-[#F5F0EB]">
          What we help with
        </h2>
      </div>

      {/* Row 1: Forward Marquee */}
      <div className="w-full relative overflow-hidden py-4 border-t border-b border-white/5 bg-[#111111] marquee-mask">
        <div className="flex animate-marquee-slow whitespace-nowrap min-w-full items-center justify-around">
          {scrollRow1.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center space-x-4 mx-8 group cursor-pointer"
            >
              <div className="relative w-8 h-8 bg-[#1A1A1B] overflow-hidden flex-shrink-0">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover grayscale filter transition-all duration-300 group-hover:grayscale-0"
                  sizes="32px"
                />
              </div>
              <span className="font-grotesque text-xs font-bold uppercase tracking-wider text-[#888888] group-hover:text-[#F5F0EB] transition-colors duration-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="w-full relative overflow-hidden py-4 border-b border-white/5 mt-6 bg-[#111111] marquee-mask">
        <div className="flex animate-marquee-reverse whitespace-nowrap min-w-full items-center justify-around">
          {scrollRow2.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center space-x-4 mx-8 group cursor-pointer"
            >
              <div className="relative w-8 h-8 bg-[#1A1A1B] overflow-hidden flex-shrink-0">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover grayscale filter transition-all duration-300 group-hover:grayscale-0"
                  sizes="32px"
                />
              </div>
              <span className="font-grotesque text-xs font-bold uppercase tracking-wider text-[#888888] group-hover:text-[#F5F0EB] transition-colors duration-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button Block at bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 text-left">
        <Button href="/contact" variant="text-arrow">
          Request bespoke briefing &rarr;
        </Button>
      </div>

    </section>
  );
}
