'use client';

import React, { useEffect, useState } from 'react';
import { fetchCMSData, updateSEOSettings } from '@/app/actions/cms';

export default function SEOSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // SEO state records
  const [seo, setSeo] = useState<Record<string, { title: string; description: string }>>({
    home: { title: '', description: '' },
    about: { title: '', description: '' },
    services: { title: '', description: '' },
    portfolio: { title: '', description: '' },
    blog: { title: '', description: '' },
    contact: { title: '', description: '' },
    pricing: { title: '', description: '' }
  });

  const loadData = async () => {
    try {
      const data = await fetchCMSData();
      if (data.seoSettings) {
        setSeo(data.seoSettings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (page: string, field: 'title' | 'description', value: string) => {
    setSeo({
      ...seo,
      [page]: {
        ...seo[page],
        [field]: value
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    setSubmitting(true);

    try {
      const res = await updateSEOSettings(seo);
      if (res.success) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Failed to write changes to DB.');
      }
    } catch (err) {
      setError('An unexpected system error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
          LOAD SEO SETTINGS...
        </div>
      </div>
    );
  }

  const pageMetaConfig = [
    { key: 'home', name: 'Homepage (/) ' },
    { key: 'about', name: 'About Page (/about) ' },
    { key: 'services', name: 'Services Page (/services) ' },
    { key: 'portfolio', name: 'Portfolio page (/portfolio) ' },
    { key: 'blog', name: 'Blog/Journal page (/blog) ' },
    { key: 'pricing', name: 'Pricing Tiers page (/pricing) ' },
    { key: 'contact', name: 'Contact Page (/contact) ' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-4xl selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">SEO & Index Curation</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Customize index descriptors, page title suffixes, and search engine snippets without editing code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {success && (
          <div className="p-3 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-[10px] uppercase tracking-wider text-center">
            ✔ SEO DESCRIPTORS SYNCHRONIZED AND LIVE IN HEADER METADATA.
          </div>
        )}

        {error && (
          <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
            ⚠ {error}
          </div>
        )}

        <div className="space-y-4">
          {pageMetaConfig.map((page) => (
            <div 
              key={page.key}
              className="border border-white/10 p-6 bg-[#111111]/30 space-y-4"
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-2">
                {page.name}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[8px] uppercase tracking-widest text-[#888888]">
                    META TITLE TAG
                  </label>
                  <input
                    type="text"
                    value={seo[page.key]?.title || ''}
                    onChange={(e) => handleChange(page.key, 'title', e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none"
                    placeholder="Page Title..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[8px] uppercase tracking-widest text-[#888888]">
                    META DESCRIPTION
                  </label>
                  <textarea
                    value={seo[page.key]?.description || ''}
                    onChange={(e) => handleChange(page.key, 'description', e.target.value)}
                    rows={2}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none resize-none"
                    placeholder="Page meta snippet description..."
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
            disabled={submitting}
          >
            {submitting ? 'COMMITTING...' : 'SAVE SEARCH METADATA'}
          </button>
        </div>

      </form>
    </div>
  );
}
