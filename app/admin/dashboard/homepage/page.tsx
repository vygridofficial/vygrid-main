'use client';

import React, { useEffect, useState } from 'react';
import { updateHomepageSettings, updateStatsSettings, fetchCMSData, uploadMedia } from '@/app/actions/cms';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';

export default function HomepageManagementPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Homepage Settings State
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroPrimaryBtn, setHeroPrimaryBtn] = useState('');
  const [heroPrimaryBtnHref, setHeroPrimaryBtnHref] = useState('');
  const [heroSecondaryBtn, setHeroSecondaryBtn] = useState('');
  const [heroSecondaryBtnHref, setHeroSecondaryBtnHref] = useState('');
  const [ctaTitle, setCtaTitle] = useState('');
  const [ctaSubtitle, setCtaSubtitle] = useState('');
  const [ctaButtonText, setCtaButtonText] = useState('');
  const [ctaButtonHref, setCtaButtonHref] = useState('');
  const [ctaImage, setCtaImage] = useState('');
  const [uploadingCta, setUploadingCta] = useState(false);

  // Stats State (4 entries)
  const [stats, setStats] = useState<Array<{ label: string; value: string }>>([
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' }
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCMSData();
        if (data.homepageSettings) {
          const h = data.homepageSettings;
          setHeroTitle(h.heroTitle || '');
          setHeroSubtitle(h.heroSubtitle || '');
          setHeroPrimaryBtn(h.heroPrimaryBtn || '');
          setHeroPrimaryBtnHref(h.heroPrimaryBtnHref || '');
          setHeroSecondaryBtn(h.heroSecondaryBtn || '');
          setHeroSecondaryBtnHref(h.heroSecondaryBtnHref || '');
          setCtaTitle(h.ctaTitle || '');
          setCtaSubtitle(h.ctaSubtitle || '');
          setCtaButtonText(h.ctaButtonText || '');
          setCtaButtonHref(h.ctaButtonHref || '');
          setCtaImage(h.ctaImage || '');
        }
        if (data.stats && data.stats.length > 0) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Error loading homepage configs", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStatChange = (index: number, field: 'label' | 'value', val: string) => {
    const newStats = stats.map((s, i) => i === index ? { ...s, [field]: val } : s);
    setStats(newStats);
  };

  const handleAddStat = () => {
    setStats([...stats, { label: '', value: '' }]);
  };

  const handleRemoveStat = (index: number) => {
    if (stats.length <= 1) return;
    const newStats = stats.filter((_, i) => i !== index);
    setStats(newStats);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      const homepagePayload = {
        heroTitle,
        heroSubtitle,
        heroPrimaryBtn,
        heroPrimaryBtnHref,
        heroSecondaryBtn,
        heroSecondaryBtnHref,
        ctaTitle,
        ctaSubtitle,
        ctaButtonText,
        ctaButtonHref,
        ctaImage
      };

      const res1 = await updateHomepageSettings(homepagePayload);
      const res2 = await updateStatsSettings(stats);

      if (res1.success && res2.success) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Failed to update some database settings. Verify inputs.');
      }
    } catch (err) {
      setError('An unexpected server error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
          LOADING HOMEPAGE CONFIGS...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Homepage Management</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Edit Hero spotlight layouts, Call-To-Action segments, buttons, and numeric statistics overlays.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
        
        {success && (
          <div className="p-4 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-xs uppercase tracking-wider text-center">
            ✔ HOMEPAGE CONTENTS DEPLOYED SUCCESSFULLY. CACHE REVALIDATED.
          </div>
        )}

        {error && (
          <div className="p-4 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-wider text-center">
            ⚠ {error}
          </div>
        )}

        {/* 1. HERO SECTION GROUP */}
        <div className="border border-white/10 p-6 md:p-8 bg-[#111111]/30 space-y-6">
          <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4">
            01 / HERO SPOTLIGHT SECTION
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                Hero Heading Title (Playfair Serif Font style)
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                placeholder="e.g. Custom Web Engineering & Brand Curation"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                Hero Subtitle Copy Description
              </label>
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={3}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors resize-none"
                placeholder="Write the subhead description..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={heroPrimaryBtn}
                  onChange={(e) => setHeroPrimaryBtn(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                  placeholder="Start Your Project"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                  Primary Button Target URL Link
                </label>
                <input
                  type="text"
                  value={heroPrimaryBtnHref}
                  onChange={(e) => setHeroPrimaryBtnHref(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors font-mono"
                  placeholder="/start-your-project"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={heroSecondaryBtn}
                  onChange={(e) => setHeroSecondaryBtn(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                  placeholder="View Our Work"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                  Secondary Button Target URL Link
                </label>
                <input
                  type="text"
                  value={heroSecondaryBtnHref}
                  onChange={(e) => setHeroSecondaryBtnHref(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors font-mono"
                  placeholder="/portfolio"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. STATS SECTION GROUP */}
        <div className="border border-white/10 p-6 md:p-8 bg-[#111111]/30 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase">
              02 / CORE STATISTICAL METRICS OVERLAYS
            </h3>
            <button
              type="button"
              onClick={handleAddStat}
              className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all duration-200"
            >
              <Plus className="w-3 h-3" />
              <span>ADD CELL</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="border border-white/5 p-4 bg-[#0A0A0A] space-y-3 relative group">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] text-[#444444] block">METRIC GRID CELL #{index+1}</span>
                  {stats.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStat(index)}
                      className="text-[#888888] hover:text-red-400 font-mono text-[8px] uppercase tracking-wider transition-colors flex items-center gap-1"
                      title="Remove Cell"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>REMOVE</span>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase text-[#888888] tracking-wider">VALUE</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full bg-[#111111] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                      placeholder="e.g. 50+"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase text-[#888888] tracking-wider">LABEL</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full bg-[#111111] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                      placeholder="e.g. Projects Delivered"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CTA BOTTOM BANNER GROUP */}
        <div className="border border-white/10 p-6 md:p-8 bg-[#111111]/30 space-y-6">
          <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4">
            03 / BOTTOM CTA BANNER SEGMENT
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                CTA Core Title Message (Playfair Display font)
              </label>
              <input
                type="text"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                placeholder="e.g. Let's build something exceptional"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                CTA Core Subtitle text
              </label>
              <textarea
                value={ctaSubtitle}
                onChange={(e) => setCtaSubtitle(e.target.value)}
                rows={2}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors resize-none"
                placeholder="e.g. Partner with Vygrid to refine your digital presence."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={ctaButtonText}
                  onChange={(e) => setCtaButtonText(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                  placeholder="Get in Touch"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                  CTA Button Redirect URL Path
                </label>
                <input
                  type="text"
                  value={ctaButtonHref}
                  onChange={(e) => setCtaButtonHref(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors font-mono"
                  placeholder="/contact"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                CTA Author/Founder Image
              </label>
              {ctaImage ? (
                <div className="relative w-32 h-32 border border-white/10 group">
                  <img src={ctaImage} alt="CTA Profile" className="w-full h-full object-cover grayscale" />
                  <button
                    type="button"
                    onClick={() => setCtaImage('')}
                    className="absolute top-2 right-2 p-1.5 bg-[#0A0A0A] border border-white/10 text-[#F5F0EB] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-32 h-32 border border-dashed border-white/20 bg-[#0A0A0A] hover:bg-[#111111] transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadingCta(true);
                      
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        try {
                          const base64String = reader.result as string;
                          const res = await uploadMedia(file.name, base64String);
                          if (res.success && res.url) {
                            setCtaImage(res.url);
                          } else {
                            alert('Upload failed: ' + res.error);
                          }
                        } catch (err: any) {
                          console.error('Error during uploadMedia:', err);
                          alert('Upload failed (Internal Error): ' + (err.message || 'Check console'));
                        } finally {
                          setUploadingCta(false);
                        }
                      };
                      reader.onerror = () => {
                        alert('Error reading file locally.');
                        setUploadingCta(false);
                      };
                      
                      try {
                        reader.readAsDataURL(file);
                      } catch (err: any) {
                        console.error('Error starting FileReader:', err);
                        alert('Upload failed starting: ' + err.message);
                        setUploadingCta(false);
                      }
                    }}
                    disabled={uploadingCta}
                  />
                  <div className="flex flex-col items-center space-y-2 text-[#888888]">
                    {uploadingCta ? (
                      <span className="font-mono text-[9px] uppercase animate-pulse">UPLOADING...</span>
                    ) : (
                      <>
                        <ImageIcon className="w-5 h-5" />
                        <span className="font-mono text-[9px] uppercase">UPLOAD</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'COMMITTING UPDATES...' : 'SAVE HOMEPAGE CONFIGS →'}
          </button>
        </div>

      </form>
    </div>
  );
}
