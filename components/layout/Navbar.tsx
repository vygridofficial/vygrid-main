'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import AboutModal from '@/components/layout/AboutModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#', triggerModal: true },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-400 w-full select-none border-b border-white/5",
          scrolled
            ? "bg-[#0A0A0A]/92 backdrop-blur-md py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          {/* Left: Logo image */}
          <div className="flex-shrink-0 z-10 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logodes.png"
                alt="VYGRID Logo"
                width={180}
                height={44}
                className="h-11 w-auto object-contain brightness-100"
                priority
              />
            </Link>
          </div>

          {/* Center: nav links in small caps IBM Plex Mono with hover underlines drawing left to right */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8 z-10">
            {navLinks.map((link) => {
              if (link.triggerModal) {
                return (
                  <button
                    key={link.name}
                    onClick={() => setAboutModalOpen(true)}
                    className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#888888] hover:text-[#F5F0EB] transition-colors duration-300 link-draw py-1"
                  >
                    {link.name}
                  </button>
                );
              }

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 link-draw py-1",
                    isActive
                      ? "text-[#F5F0EB]"
                      : "text-[#888888] hover:text-[#F5F0EB]"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Empty space placeholder for symmetric layout balance */}
          <div className="hidden md:flex items-center space-x-6 z-10 w-[180px] justify-end" />

          {/* Mobile Hamburg Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F5F0EB] hover:text-[#C8B89A] transition-colors focus:outline-none"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* About Modal panel slide-in */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 bg-[#0A0A0A] flex flex-col p-8 pt-28 text-[#F5F0EB]"
          >
            <nav className="flex flex-col space-y-6 flex-grow items-center justify-center text-center">
              {navLinks.map((link) => {
                if (link.triggerModal) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setAboutModalOpen(true);
                      }}
                      className="text-center font-mono text-xl font-bold uppercase tracking-widest text-[#888888] hover:text-[#F5F0EB] transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center font-mono text-xl font-bold uppercase tracking-widest text-[#888888] hover:text-[#F5F0EB] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-6 border-t border-white/5 pt-6 text-center">
              <div className="font-mono text-[9px] text-[#444444] uppercase tracking-widest">
                EST. 2026 &middot; VYGRID STUDIO
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
