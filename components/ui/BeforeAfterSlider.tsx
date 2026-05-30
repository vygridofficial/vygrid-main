'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  className?: string;
}

export default function BeforeAfterSlider({ before, after, className }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className={`relative aspect-video w-full overflow-hidden border border-white/10 rounded-none select-none ${className}`}>
      {/* Before Image */}
      <div className="absolute inset-0 w-full h-full rounded-none">
        <Image
          src={before}
          alt="Before Re-Design"
          fill
          className="object-cover rounded-none"
          sizes="(max-w-1024px) 100vw, 800px"
        />
        <div className="absolute left-6 top-6 bg-[#0A0A0A]/90 border border-white/10 px-3 py-1.5 text-[9px] font-mono font-normal text-[#F5F0EB] uppercase tracking-wider rounded-none">
          BEFORE
        </div>
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 w-full h-full rounded-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={after}
          alt="After Re-Design"
          fill
          className="object-cover rounded-none"
          sizes="(max-w-1024px) 100vw, 800px"
        />
        <div className="absolute right-6 top-6 bg-[#C8B89A] border border-black/10 px-3 py-1.5 text-[9px] font-mono font-normal text-[#0A0A0A] uppercase tracking-wider rounded-none">
          AFTER
        </div>
      </div>

      {/* Slider divider line */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/40 cursor-ew-resize z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-[#0A0A0A] flex items-center justify-center shadow-lg text-[#F5F0EB] font-bold text-xs select-none">
          &harr;
        </div>
      </div>

      {/* Slider Input overlay */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 rounded-none"
        aria-label="Before and after slider position"
      />
    </div>
  );
}
