'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'outline' | 'text-arrow' | 'stark';
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  href,
  variant = 'outline',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-grotesque font-bold uppercase tracking-wider text-xs select-none transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-0 rounded-none";
  
  const variants = {
    // Stark border, transparent body, flips on hover
    outline: "px-6 py-3.5 border border-white/20 text-[#F5F0EB] hover:border-[#F5F0EB] hover:bg-[#F5F0EB] hover:text-[#0A0A0A]",
    
    // Text link with arrow and underline drawing
    'text-arrow': "bg-transparent text-[#F5F0EB] hover:text-[#C8B89A] px-0 py-2 link-draw relative",
    
    // Full high-contrast block
    stark: "px-8 py-4.5 bg-[#F5F0EB] text-[#0A0A0A] hover:bg-[#C8B89A] hover:text-[#0A0A0A]",
  };

  const buttonClasses = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Link href={href} className={buttonClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <button
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}
