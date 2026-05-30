'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative w-full min-h-[75vh] flex flex-col justify-center items-center overflow-hidden py-16 md:py-24 bg-[#0A0A0A] text-[#F5F0EB] selection:bg-[#C8B89A] selection:text-[#0A0A0A] border-t border-white/10">
      
      {/* Background conceptual grid details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Content */}
      <div className="max-w-xl mx-auto px-6 text-center z-10 flex flex-col justify-center items-center space-y-8">
        
        {/* Animated mono warning code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border border-[#C8B89A]/30 px-3 py-1 bg-[#111111]"
        >
          ERR_CODE_404: GRID_MISALIGNMENT
        </motion.div>

        {/* Huge Error numbers */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif italic text-7xl sm:text-9xl md:text-[10rem] tracking-tighter text-[#F5F0EB] select-none leading-none font-light"
        >
          404.
        </motion.h1>

        {/* Message */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.25em] text-[#888888] uppercase"
          >
            COORDINATE MATRIX OUT OF BOUNDS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="font-grotesque text-xs sm:text-sm text-[#888888] font-light leading-relaxed max-w-sm"
          >
            The asset coordinates you requested are out of alignment. The resource has been relocated, archived, or never existed in the current workspace.
          </motion.p>
        </div>

        {/* Action Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
          className="pt-4"
        >
          <Link
            href="/"
            className="px-8 py-3.5 bg-[#C8B89A] text-[#0A0A0A] font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-[#F5F0EB] transition-all duration-300"
          >
            RE-ALIGN COORDINATES →
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
