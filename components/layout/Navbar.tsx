'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import AboutModal from '@/components/layout/AboutModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
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
    { name: 'Work', href: '/portfolio' },
    { name: 'Services', href: '/services/web-development' }, // Standard redirection to first service or list
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Left: "VYGRID" logotype in monospace caps */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-mono text-sm font-normal tracking-[0.2em] text-[#F5F0EB]">
              VYGRID
            </span>
          </Link>

          {/* Center: nav links in small caps grotesque with hover underlines drawing left to right */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.triggerModal) {
                return (
                  <button
                    key={link.name}
                    onClick={() => setAboutModalOpen(true)}
                    className="font-grotesque text-xs font-bold uppercase tracking-[0.1em] text-[#888888] hover:text-[#F5F0EB] transition-colors duration-300 link-draw py-1"
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
                    "font-grotesque text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300 link-draw py-1",
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

          {/* Right: "Start a Project →" — no button border, just text + arrow */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Audio Toggle Speaker */}
            <button
              onClick={() => setSoundActive(!soundActive)}
              className="text-[#888888] hover:text-[#F5F0EB] transition-colors focus:outline-none flex items-center justify-center p-1"
              aria-label="Toggle site sound"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-[#C8B89A]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <Link
              href="/contact"
              className="font-grotesque text-xs font-bold uppercase tracking-[0.1em] text-[#F5F0EB] hover:text-[#C8B89A] transition-colors duration-300 flex items-center space-x-1"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
            </Link>
          </div>

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
            <nav className="flex flex-col space-y-6 flex-grow">
              {navLinks.map((link) => {
                if (link.triggerModal) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setAboutModalOpen(true);
                      }}
                      className="text-left font-serif italic text-3xl text-[#888888] hover:text-[#F5F0EB] transition-colors duration-300"
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
                    className="font-serif italic text-3xl text-[#888888] hover:text-[#F5F0EB] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-6 border-t border-white/5 pt-6">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-grotesque text-sm font-bold uppercase tracking-wider text-[#F5F0EB] flex items-center justify-between"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#C8B89A]" />
              </Link>
              <div className="font-mono text-[9px] text-[#444444] uppercase tracking-widest">
                EST. 2022 &middot; VYGRID STUDIO
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
