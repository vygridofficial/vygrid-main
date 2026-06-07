'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCMSData } from '@/app/actions/cms';

interface PlanContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  planFeatures?: string[];
}

export default function PlanContactModal({
  isOpen,
  onClose,
  planName,
  planPrice,
  planFeatures = [],
}: PlanContactModalProps) {
  const router = useRouter();
  const [whatsapp, setWhatsapp] = useState('10000000000');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const cms = await fetchCMSData();
        if (cms.contactSettings?.whatsapp) setWhatsapp(cms.contactSettings.whatsapp);
      } catch { /* fallback */ }
    }
    load();
  }, []);

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => { document.body.style.overflow = ''; }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen && !visible) return null;

  const waMessage = encodeURIComponent(
    `Hi Vygrid! 👋\n\nI'm interested in your *${planName}* plan (${planPrice}).\n\nFeatures I'm looking at:\n${planFeatures.slice(0, 4).map(f => `• ${f}`).join('\n')}\n\nCould you please share more details and help me get started?`
  );
  const waUrl = `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${waMessage}`;

  const handleWhatsApp = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleWebsite = () => {
    onClose();
    router.push(`/start-your-project?service=${encodeURIComponent(planName)}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6,6,6,0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Modal card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          background: '#0f0f0f',
          border: '1px solid rgba(200,184,154,0.18)',
          boxShadow: '0 0 80px rgba(200,184,154,0.06), 0 24px 80px rgba(0,0,0,0.8)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
          transition: 'opacity 0.32s ease, transform 0.35s cubic-bezier(0.34,1.26,0.64,1)',
        }}
      >
        {/* Top accent line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg,#C8B89A,transparent)' }} />

        <div style={{ padding: '32px 32px 28px' }}>
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '18px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              fontSize: '22px',
              lineHeight: 1,
              padding: '4px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0EB')}
            onMouseLeave={e => (e.currentTarget.style.color = '#666')}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-ibm-plex), monospace',
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C8B89A',
              marginBottom: '8px',
            }}>
              HOW WOULD YOU LIKE TO CONNECT?
            </span>
            <h2 style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '22px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#F5F0EB',
              margin: 0,
              lineHeight: 1.3,
            }}>
              Interested in {planName}
            </h2>
            <p style={{
              fontFamily: 'sans-serif',
              fontSize: '12px',
              color: '#888',
              marginTop: '6px',
              lineHeight: 1.5,
            }}>
              Starting {planPrice} · Choose how you'd like to proceed:
            </p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* WhatsApp option */}
            <button
              onClick={handleWhatsApp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                padding: '18px 20px',
                background: 'rgba(37,211,102,0.06)',
                border: '1px solid rgba(37,211,102,0.25)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.12)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.5)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.25)';
              }}
            >
              {/* WA icon */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.906-6.99C16.246 1.875 13.765.845 11.13.845 5.698.845 1.274 5.27 1.27 10.705c-.001 1.679.444 3.322 1.286 4.78l-.997 3.636 3.732-.979zm11.385-6.974c-.313-.156-1.853-.914-2.138-1.018-.285-.104-.493-.156-.7.156-.207.312-.802 1.018-.984 1.226-.182.208-.364.23-.677.074-1.284-.643-2.148-1.127-3.003-2.593-.226-.388.226-.36.647-.798.118-.12.226-.26.338-.372.112-.112.15-.19.226-.312.076-.126.038-.235-.02-.34-.058-.105-.493-1.189-.677-1.63-.18-.432-.377-.373-.518-.38-.13-.006-.28-.008-.43-.008-.15 0-.395.056-.603.284-.208.227-.792.774-.792 1.888s.81 2.193.924 2.348c.114.156 1.595 2.434 3.864 3.413 2.27.979 2.27.653 2.685.613.415-.04.133-.186.828-.84.285-.25.438-.524.52-.7.082-.176.04-.26-.04-.32z"/>
                </svg>
              </div>
              <div>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-ibm-plex), monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#25D366',
                  marginBottom: '3px',
                }}>
                  Chat on WhatsApp
                </span>
                <span style={{
                  fontFamily: 'sans-serif',
                  fontSize: '11px',
                  color: '#777',
                  lineHeight: 1.4,
                }}>
                  Instant reply · Pre-filled message with your plan details
                </span>
              </div>
            </button>

            {/* Website option */}
            <button
              onClick={handleWebsite}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                padding: '18px 20px',
                background: 'rgba(200,184,154,0.04)',
                border: '1px solid rgba(200,184,154,0.15)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(200,184,154,0.09)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,184,154,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(200,184,154,0.04)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,184,154,0.15)';
              }}
            >
              {/* Website icon */}
              <div style={{
                width: '44px',
                height: '44px',
                border: '1px solid rgba(200,184,154,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="1" stroke="#C8B89A" strokeWidth="1.5"/>
                  <path d="M3 9h18" stroke="#C8B89A" strokeWidth="1.5"/>
                  <circle cx="6.5" cy="7" r="0.8" fill="#C8B89A"/>
                  <circle cx="9.5" cy="7" r="0.8" fill="#C8B89A"/>
                  <path d="M8 14h8M8 17h5" stroke="#C8B89A" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-ibm-plex), monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C8B89A',
                  marginBottom: '3px',
                }}>
                  Continue on Website
                </span>
                <span style={{
                  fontFamily: 'sans-serif',
                  fontSize: '11px',
                  color: '#777',
                  lineHeight: 1.4,
                }}>
                  Fill our project brief form · Detailed requirements
                </span>
              </div>
            </button>
          </div>

          {/* Footer note */}
          <p style={{
            fontFamily: 'var(--font-ibm-plex), monospace',
            fontSize: '9px',
            color: '#444',
            textAlign: 'center',
            marginTop: '20px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            No commitment required · Free consultation
          </p>
        </div>
      </div>
    </div>
  );
}
