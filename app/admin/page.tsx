'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/app/actions/auth';
import { fetchCMSData } from '@/app/actions/cms';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/logodes.png');
  const [companyReg, setCompanyReg] = useState('EST. 2026');

  useEffect(() => {
    async function loadBranding() {
      try {
        const data = await fetchCMSData();
        if (data.generalSettings) {
          if (data.generalSettings.logoUrl) {
            setLogoUrl(data.generalSettings.logoUrl);
          }
          if (data.generalSettings.companyReg) {
            setCompanyReg(data.generalSettings.companyReg);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadBranding();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the access code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await loginAdmin({ password });
      if (res.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(res.error || 'Invalid access code.');
      }
    } catch (err) {
      setError('An unexpected system error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#0A0A0A] flex flex-col justify-center items-center px-6 relative selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB] -mt-[80px] overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#C8B89A]/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#C8B89A]/2 blur-[120px] pointer-events-none" />
      
      {/* Scanline pattern */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-noise bg-repeat" />
 
      <div className="w-full max-w-[420px] border border-white/10 bg-[#111111]/80 backdrop-blur-md p-8 md:p-10 space-y-8 relative">
        {/* Branding header */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center space-x-2">
            <Image
              src={logoUrl || "/logodes.png"}
              alt="VYGRID Logo"
              width={120}
              height={28}
              className="h-8 w-auto object-contain brightness-100"
              priority
            />
            <span className="font-mono text-xs tracking-[0.25em] font-bold text-[#F5F0EB]">PORTAL</span>
          </div>
          <p className="font-grotesque text-[11px] text-[#888888] uppercase tracking-[0.15em] font-light">
            Central Command & CMS Engine
          </p>
        </div>
 
        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
              {error}
            </div>
          )}
 
          <div className="space-y-2">
            <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#888888]">
              ACCESS CODE
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] placeholder:text-[#444444] focus:outline-none focus:border-[#C8B89A] font-mono transition-colors"
              placeholder="••••••••••••"
              required
              disabled={loading}
            />
          </div>
 
          <button
            type="submit"
            className="w-full bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[10px] font-bold tracking-[0.2em] uppercase py-4 transition-colors duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'AUTHORIZING...' : 'ESTABLISH SESSION →'}
          </button>
        </form>

        <div className="text-center font-mono text-[8px] text-[#444444] uppercase tracking-widest pt-2">
          SECURE CONNECTION &middot; {companyReg}
        </div>
      </div>
    </div>
  );
}
