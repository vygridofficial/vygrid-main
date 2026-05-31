'use client';

import React, { useEffect, useState } from 'react';
import { fetchCMSData, updateGeneralSettings } from '@/app/actions/cms';
import { updateAdminCredentials } from '@/app/actions/auth';
import { Settings, ShieldCheck, Key } from 'lucide-react';

export default function GeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submittingSettings, setSubmittingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState('');

  // General Settings state
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyReg, setCompanyReg] = useState('');
  const [adminTabs, setAdminTabs] = useState<Record<string, string>>({
    overview: 'Overview',
    homepage: 'Homepage Content',
    about: 'About & Team',
    services: 'Services CRUD',
    pricing: 'Service Pricing',
    portfolio: 'Portfolio CRUD',
    blog: 'Blog CRUD',
    testimonials: 'Testimonials',
    contact: 'Contact & FAQ',
    leads: 'Leads Inbox',
    media: 'Media Library',
    navigation: 'Navigation Menu',
    footer: 'Footer links',
    seo: 'SEO Settings',
    settings: 'General Settings',
    activity: 'Activity Audit'
  });

  // Password / Credentials state
  const [adminUsername, setAdminUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submittingPass, setSubmittingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCMSData();
        if (data.generalSettings) {
          const g = data.generalSettings as any;
          setLogoUrl(g.logoUrl || '');
          setFaviconUrl(g.faviconUrl || '');
          setCompanyName(g.companyName || '');
          setCompanyReg(g.companyReg || '');
          setAdminUsername(g.adminUsername || 'admin');
          if (g.adminTabs) {
            setAdminTabs((prev) => ({ ...prev, ...g.adminTabs }));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess(false);
    setSettingsError('');
    setSubmittingSettings(true);

    try {
      const payload = { logoUrl, faviconUrl, companyName, companyReg, adminTabs };
      const res = await updateGeneralSettings(payload);
      if (res.success) {
        setSettingsSuccess(true);
      } else {
        setSettingsError('Failed to save settings.');
      }
    } catch (err) {
      setSettingsError('An unexpected server error occurred.');
    } finally {
      setSubmittingSettings(false);
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassSuccess(false);
    setPassError('');

    if (newPassword !== confirmPassword) {
      setPassError('New password fields do not match.');
      return;
    }

    setSubmittingPass(true);

    try {
      const res = await updateAdminCredentials(adminUsername, currentPassword, newPassword);
      if (res.success) {
        setPassSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPassError(res.error || 'Failed to update credentials.');
      }
    } catch (err) {
      setPassError('An unexpected database error occurred.');
    } finally {
      setSubmittingPass(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
          ACQUIRING CONTROL PARAMS...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-4xl selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">General settings</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Edit global branding assets, logos, site favicons, and manage system credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left: Branding settings */}
        <div className="border border-white/10 p-6 md:p-8 bg-[#111111]/30">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4 flex items-center">
              <Settings className="w-3.5 h-3.5 mr-1.5" />
              <span>BRANDING CONFIGURATIONS</span>
            </h3>

            {settingsSuccess && (
              <div className="p-3 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-[10px] uppercase tracking-wider text-center">
                ✔ BRAND DETAILS SAVED IN CORE RECORD.
              </div>
            )}

            {settingsError && (
              <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
                ⚠ {settingsError}
              </div>
            )}

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">STUDIO COMPANY NAME</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none"
                placeholder="Vygrid Digital Studio"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">COMPANY REGISTRY LABEL</label>
              <input
                type="text"
                value={companyReg}
                onChange={(e) => setCompanyReg(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                placeholder="EST. 2026 • VYGRID STUDIO"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">LOGO IMAGE PATH (URL)</label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono"
                placeholder="/logodes.png"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">FAVICON PATH (URL)</label>
              <input
                type="text"
                value={faviconUrl}
                onChange={(e) => setFaviconUrl(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono"
                placeholder="/favicon.ico"
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors"
                disabled={submittingSettings}
              >
                {submittingSettings ? 'SAVING...' : 'SAVE BRANDING'}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Security Credentials */}
        <div className="border border-white/10 p-6 md:p-8 bg-[#111111]/30">
          <form onSubmit={handleSavePassword} className="space-y-6">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              <span>SECURITY CREDENTIALS</span>
            </h3>

            {passSuccess && (
              <div className="p-3 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-[10px] uppercase tracking-wider text-center">
                ✔ SYSTEM PASSCODES UPDATED SECURELY.
              </div>
            )}

            {passError && (
              <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
                ⚠ {passError}
              </div>
            )}

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">ADMIN USERNAME</label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CURRENT PASSCODE</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono"
                placeholder="••••••••••••"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">NEW PASSCODE</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono"
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CONFIRM PASSCODE</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono"
                  placeholder="Confirm new passcode"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                disabled={submittingPass}
              >
                <Key className="w-3 h-3" />
                <span>{submittingPass ? 'UPDATING...' : 'CHANGE PASSWORD'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Full-width: Admin Portal Tab labels */}
        <div className="border border-white/10 p-6 md:p-8 bg-[#111111]/30 col-span-1 md:col-span-2">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4 flex items-center">
              <Settings className="w-3.5 h-3.5 mr-1.5" />
              <span>ADMIN PORTAL TAB LABELS</span>
            </h3>

            {settingsSuccess && (
              <div className="p-3 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-[10px] uppercase tracking-wider text-center">
                ✔ TAB LABELS REGISTERED SUCCESSFULLY.
              </div>
            )}

            {settingsError && (
              <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
                ⚠ {settingsError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'homepage', label: 'Homepage Content' },
                { key: 'about', label: 'About & Team' },
                { key: 'services', label: 'Services CRUD' },
                { key: 'pricing', label: 'Service Pricing' },
                { key: 'portfolio', label: 'Portfolio CRUD' },
                { key: 'blog', label: 'Blog CRUD' },
                { key: 'testimonials', label: 'Testimonials' },
                { key: 'contact', label: 'Contact & FAQ' },
                { key: 'leads', label: 'Leads Inbox' },
                { key: 'media', label: 'Media Library' },
                { key: 'navigation', label: 'Navigation Menu' },
                { key: 'footer', label: 'Footer Links' },
                { key: 'seo', label: 'SEO Settings' },
                { key: 'settings', label: 'General Settings' },
                { key: 'activity', label: 'Activity Audit' }
              ].map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <label className="block font-mono text-[8px] uppercase tracking-widest text-[#888888]">
                    {label} TAB LABEL
                  </label>
                  <input
                    type="text"
                    value={adminTabs[key] || ''}
                    onChange={(e) => setAdminTabs({ ...adminTabs, [key]: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none"
                    placeholder={label}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors"
                disabled={submittingSettings}
              >
                {submittingSettings ? 'SAVING...' : 'SAVE TAB LABELS'}
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}
