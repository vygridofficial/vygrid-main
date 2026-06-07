'use client';

import React, { useState, useEffect } from 'react';
import { fetchCMSData } from '@/app/actions/cms';

export default function FloatingSocial() {
  const [whatsapp, setWhatsapp] = useState('10000000000');
  const [instagram, setInstagram] = useState('#');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const cms = await fetchCMSData();
        if (cms.contactSettings?.whatsapp) setWhatsapp(cms.contactSettings.whatsapp);
        if (cms.contactSettings?.instagram) setInstagram(cms.contactSettings.instagram);
      } catch { /* fallback */ }
    }
    load();
  }, []);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-floating-social]')) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <>
      {/* Backdrop blur overlay when open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
          }}
        />
      )}

      <div
        data-floating-social
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* ── Instagram bubble ── */}
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          title="Instagram"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            boxShadow: '0 4px 20px rgba(188,24,136,0.45)',
            cursor: 'pointer',
            textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.15)',
            // Animation
            opacity: open ? 1 : 0,
            transform: open
              ? 'translateY(0) scale(1)'
              : 'translateY(20px) scale(0.6)',
            transition: open
              ? 'opacity 0.3s ease 0.08s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.08s, box-shadow 0.2s ease'
              : 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: open ? 'auto' : 'none',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(188,24,136,0.65)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(188,24,136,0.45)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>

        {/* ── WhatsApp bubble ── */}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#25D366',
            boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
            cursor: 'pointer',
            textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.15)',
            // Animation — slightly faster delay than instagram
            opacity: open ? 1 : 0,
            transform: open
              ? 'translateY(0) scale(1)'
              : 'translateY(20px) scale(0.6)',
            transition: open
              ? 'opacity 0.3s ease 0.02s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.02s, box-shadow 0.2s ease'
              : 'opacity 0.15s ease, transform 0.15s ease',
            pointerEvents: open ? 'auto' : 'none',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.65)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.906-6.99C16.246 1.875 13.765.845 11.13.845 5.698.845 1.274 5.27 1.27 10.705c-.001 1.679.444 3.322 1.286 4.78l-.997 3.636 3.732-.979zm11.385-6.974c-.313-.156-1.853-.914-2.138-1.018-.285-.104-.493-.156-.7.156-.207.312-.802 1.018-.984 1.226-.182.208-.364.23-.677.074-1.284-.643-2.148-1.127-3.003-2.593-.226-.388.226-.36.647-.798.118-.12.226-.26.338-.372.112-.112.15-.19.226-.312.076-.126.038-.235-.02-.34-.058-.105-.493-1.189-.677-1.63-.18-.432-.377-.373-.518-.38-.13-.006-.28-.008-.43-.008-.15 0-.395.056-.603.284-.208.227-.792.774-.792 1.888s.81 2.193.924 2.348c.114.156 1.595 2.434 3.864 3.413 2.27.979 2.27.653 2.685.613.415-.04.133-.186.828-.84.285-.25.438-.524.52-.7.082-.176.04-.26-.04-.32z"/>
          </svg>
        </a>

        {/* ── Main FAB trigger button ── */}
        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close social links' : 'Open social links'}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: open
              ? 'rgba(30,30,30,0.95)'
              : 'linear-gradient(135deg,rgba(200,184,154,0.15) 0%,rgba(245,240,235,0.08) 100%)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: open
              ? '0 0 0 2px rgba(200,184,154,0.35), 0 8px 32px rgba(0,0,0,0.6)'
              : '0 0 0 1.5px rgba(255,255,255,0.1), 0 6px 24px rgba(0,0,0,0.5)',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          {/* Animated icon: chat bubbles → X */}
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '22px',
              position: 'relative',
            }}
          >
            {/* Chat icon (visible when closed) */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: open ? 0 : 1,
                transform: open ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
                transition: 'opacity 0.25s ease, transform 0.3s ease',
              }}
            >
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                fill="#C8B89A"
              />
              <circle cx="8" cy="11" r="1.2" fill="#0A0A0A" />
              <circle cx="12" cy="11" r="1.2" fill="#0A0A0A" />
              <circle cx="16" cy="11" r="1.2" fill="#0A0A0A" />
            </svg>

            {/* Close X (visible when open) */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: open ? 1 : 0,
                transform: open ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
                transition: 'opacity 0.25s ease, transform 0.3s ease',
              }}
            >
              <line x1="6" y1="6" x2="18" y2="18" stroke="#C8B89A" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="18" y1="6" x2="6" y2="18" stroke="#C8B89A" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}
