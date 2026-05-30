import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'accent';
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  className,
}: BadgeProps) {
  const baseStyles = "inline-flex items-center px-3 py-1 font-mono text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.15em] select-none rounded-none transition-colors duration-300";
  
  const variants = {
    primary: "bg-[#1A1A1A] text-[#F5F0EB] border border-white/5",
    outline: "bg-transparent text-[#888888] border border-white/10",
    accent: "bg-transparent text-[#C8B89A] border border-[#C8B89A]/25",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
