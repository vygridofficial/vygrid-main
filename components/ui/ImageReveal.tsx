'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ImageReveal({
  children,
  className,
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-2%" });

  // Wipe reveal variants: clipPath from inset(100% 0 0 0) to inset(0% 0 0 0)
  // or simply height scaling/scaleY. Let's use clipPath, it looks incredibly premium!
  const containerVariants = {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      transition: {
        duration: 1.2, // Wipe duration from spec
        ease: [0.76, 0, 0.24, 1] as const, // Primary ease
        delay,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.25 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] as const,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div variants={imageVariants} className="w-full h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
