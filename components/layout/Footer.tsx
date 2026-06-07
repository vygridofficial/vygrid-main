'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchCMSData } from '@/app/actions/cms';

export default function Footer() {
  const pathname = usePathname();
  const [timeString, setTimeString] = useState('');
  
  // Dynamic settings state
  const [tagline, setTagline] = useState("From concept to launch, we build digital excellence.");
  const [email, setEmail] = useState("hello@vygrid.studio");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [logoUrl, setLogoUrl] = useState("/logodes.png");
  const [whatsapp, setWhatsapp] = useState("10000000000");
  const [instagram, setInstagram] = useState("#");
  const [otherLinks, setOtherLinks] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("VYGRID DIGITAL STUDIO");
  const [directoryLinks, setDirectoryLinks] = useState([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Start Project', href: '/start-your-project' },
    { name: 'Contact', href: '/contact' },
  ]);

  // Live ticking clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeString(
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadFooterData() {
      try {
        const cms = await fetchCMSData();
        if (cms.footerSettings?.tagline) {
          setTagline(cms.footerSettings.tagline);
        }
        if (cms.footerSettings?.directoryLinks) {
          setDirectoryLinks(cms.footerSettings.directoryLinks);
        }
        if (cms.contactSettings) {
          setEmail(cms.contactSettings.email || "hello@vygrid.studio");
          setPhone(cms.contactSettings.phone || "+1 (555) 000-0000");
          setWhatsapp(cms.contactSettings.whatsapp || "10000000000");
          setInstagram(cms.contactSettings.instagram || "#");
          setOtherLinks(cms.contactSettings.otherLinks || []);
        }
        if (cms.generalSettings) {
          if (cms.generalSettings.logoUrl) {
            setLogoUrl(cms.generalSettings.logoUrl);
          }
          if (cms.generalSettings.companyName) {
            setCompanyName(cms.generalSettings.companyName);
          }
        }
      } catch (err) {
        console.error("Failed loading CMS footer data", err);
      }
    }
    loadFooterData();
  }, []);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }


  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0A0A0A] text-[#F5F0EB] pt-20 pb-8 border-t border-white/5 font-grotesque select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">

          {/* Left Column: Studio branding & contact details */}
          <div className="md:col-span-6 space-y-8">
            <div className="space-y-4 text-left">
              <img
                src={logoUrl || "/logodes.png"}
                alt="VYGRID Logo"
                className="h-20 md:h-24 w-auto object-contain brightness-100"
              />
              <p className="text-[#888888] font-light text-sm max-w-xs leading-relaxed">
                {tagline}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs font-mono text-[#888888] text-left">
              <div className="flex items-center space-x-2">
                <span className="text-[#444444]">EMAIL:</span>
                <a href={`mailto:${email}`} className="text-[#F5F0EB] hover:text-[#C8B89A] transition-colors font-bold">{email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#444444]">TEL:</span>
                <a href={`tel:${phone}`} className="text-[#F5F0EB] hover:text-[#C8B89A] transition-colors font-bold">{phone}</a>
              </div>
            </div>
          </div>

          {/* Right Column: directory, clock, and socials */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4 text-left md:text-right">

            {/* Studio Navigation directory */}
            <div className="space-y-3 flex flex-col items-start sm:items-end">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#444444] block">
                DIRECTORY
              </span>
              <div className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider items-start sm:items-end">
                {directoryLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`${isActive
                          ? 'text-[#C8B89A]'
                          : 'text-[#F5F0EB] hover:text-[#C8B89A]'
                        } transition-colors duration-300`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Booking Status & Live Clock */}
            <div className="space-y-3 flex flex-col items-start sm:items-end">
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#444444] block">
                  LOCAL TIME
                </span>
                <span className="font-mono text-sm font-bold text-[#F5F0EB] block tracking-widest">
                  {timeString || "00:00:00"}
                </span>
              </div>
            </div>

             {/* Social channels (monochrome SVG logos + dynamic links) */}
             <div className="space-y-3 flex flex-col items-start sm:items-end">
               <span className="font-mono text-[9px] tracking-[0.2em] text-[#444444] block">
                 CONNECT ONLINE
               </span>
               <div className="flex flex-wrap items-center gap-4 pt-1 justify-start sm:justify-end">
                 {whatsapp && (
                   <a
                     href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
                     aria-label="WhatsApp"
                   >
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                       <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.906-6.99C16.246 1.875 13.765.845 11.13.845 5.698.845 1.274 5.27 1.27 10.705c-.001 1.679.444 3.322 1.286 4.78l-.997 3.636 3.732-.979zm11.385-6.974c-.313-.156-1.853-.914-2.138-1.018-.285-.104-.493-.156-.7.156-.207.312-.802 1.018-.984 1.226-.182.208-.364.23-.677.074-1.284-.643-2.148-1.127-3.003-2.593-.226-.388.226-.36.647-.798.118-.12.226-.26.338-.372.112-.112.15-.19.226-.312.076-.126.038-.235-.02-.34-.058-.105-.493-1.189-.677-1.63-.18-.432-.377-.373-.518-.38-.13-.006-.28-.008-.43-.008-.15 0-.395.056-.603.284-.208.227-.792.774-.792 1.888s.81 2.193.924 2.348c.114.156 1.595 2.434 3.864 3.413 2.27.979 2.27.653 2.685.613.415-.04.133-.186.828-.84.285-.25.438-.524.52-.7.082-.176.04-.26-.04-.32z"/>
                     </svg>
                   </a>
                 )}
                 {instagram && (
                   <a
                     href={instagram}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
                     aria-label="Instagram"
                   >
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                     </svg>
                   </a>
                 )}
                 {otherLinks && otherLinks.map((link: any, idx: number) => (
                   <a
                     key={idx}
                     href={link.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#888888] hover:text-[#C8B89A] transition-colors duration-300 font-mono text-[9px] tracking-wider uppercase border-b border-dashed border-[#888888]/20 hover:border-[#C8B89A]/50 pb-0.5"
                   >
                     {link.label}
                   </a>
                 ))}
               </div>
             </div>

          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-left">

          {/* Copyright in tiny mono */}
          <div className="font-mono text-[9px] text-[#444444] tracking-wider uppercase">
            &copy; {currentYear} {companyName} &middot; ALL RIGHTS RESERVED.
          </div>

          {/* Back to top text link */}
          <button
            onClick={handleScrollToTop}
            className="font-grotesque text-xs font-bold uppercase tracking-wider text-[#888888] hover:text-[#F5F0EB] transition-colors focus:outline-none"
          >
            Back to top &uarr;
          </button>
        </div>

        {/* Gigantic Branding Text */}
        <div className="pt-10 pb-6 select-none overflow-visible text-left">
          <span className="font-jakarta text-[18vw] md:text-[13vw] font-bold tracking-tighter text-[#F5F0EB]/95 hover:text-[#C8B89A] transition-all duration-700 leading-none block select-none cursor-default">
            Vygrid
          </span>
        </div>

      </div>
    </footer>
  );
}
