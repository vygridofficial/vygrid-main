import React from 'react';

export default function TrustedBy() {
  const clients = [
    { name: "LUXE REALTY", style: "tracking-[0.25em] font-black" },
    { name: "FITPULSE", style: "tracking-[0.1em] font-black italic text-brand-blue" },
    { name: "ZESTORA", style: "tracking-[0.2em] font-extrabold" },
    { name: "NEXLIFT", style: "tracking-[0.15em] font-light" },
    { name: "SOLARHIVE", style: "tracking-[0.05em] font-black uppercase text-yellow-500" },
    { name: "CREVO ARCH", style: "tracking-[0.3em] font-bold" }
  ];

  const scrollClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-12 bg-brand-navy border-t border-b border-white/5 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6 block text-center">
          Trusted By Forward-Thinking Teams
        </span>
        
        {/* Scrolling wrapper with clean server-safe inline styling */}
        <div
          className="w-full flex overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <div className="flex animate-marquee-slow whitespace-nowrap min-w-full items-center justify-around">
            {scrollClients.map((client, idx) => (
              <div
                key={idx}
                className="inline-flex mx-12 font-heading text-lg sm:text-xl font-bold text-white/50 hover:text-white transition-colors duration-300 pointer-events-none select-none items-center"
              >
                <span className={client.style}>{client.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 ml-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
