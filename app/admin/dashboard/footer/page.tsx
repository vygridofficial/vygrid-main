'use client';

import React, { useEffect, useState } from 'react';
import { updateFooterSettings, fetchCMSData } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, X } from 'lucide-react';

export default function FooterManagementPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Tagline state
  const [tagline, setTagline] = useState('');

  // Directory links state
  const [links, setLinks] = useState<any[]>([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [name, setName] = useState('');
  const [href, setHref] = useState('');

  const loadData = async () => {
    try {
      const data = await fetchCMSData();
      if (data.footerSettings) {
        setTagline(data.footerSettings.tagline || '');
        setLinks(data.footerSettings.directoryLinks || []);
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

  const handleSaveTagline = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setSubmitting(true);
    await updateFooterSettings({ tagline, directoryLinks: links });
    setSubmitting(false);
    setSuccess(true);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const list = [...links];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setLinks(list);
    setSubmitting(true);
    await updateFooterSettings({ tagline, directoryLinks: list });
    setSubmitting(false);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditIndex(-1);
    setName('');
    setHref('');
    setModalOpen(true);
  };

  const handleOpenEdit = (index: number, link: any) => {
    setIsEditing(true);
    setEditIndex(index);
    setName(link.name);
    setHref(link.href);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !href) return;

    const updated = [...links];
    if (isEditing && editIndex > -1) {
      updated[editIndex] = { name, href };
    } else {
      updated.push({ name, href });
    }

    setLinks(updated);
    setModalOpen(false);
    setSubmitting(true);
    await updateFooterSettings({ tagline, directoryLinks: updated });
    setSubmitting(false);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to remove this footer link?')) return;
    const updated = links.filter((_, idx) => idx !== index);
    setLinks(updated);
    setSubmitting(true);
    await updateFooterSettings({ tagline, directoryLinks: updated });
    setSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-4xl selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Footer Layout</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Edit general studio tagline branding descriptions and directory lists.
        </p>
      </div>

      {success && (
        <div className="p-3 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-[10px] uppercase tracking-wider text-center">
          ✔ FOOTER TEXT DEPLOYED TO CLOUD. CACHE UPDATE COMPLETED.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            LOADING FOOTER LAYOUT CONTROLS...
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* 1. Tagline Form */}
          <form onSubmit={handleSaveTagline} className="border border-white/10 p-6 md:p-8 bg-[#111111]/30 space-y-4">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4">
              STUDIO TAGLINE
            </h3>
            
            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                Studio Tagline Slogan
              </label>
              <textarea
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                rows={2}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none"
                placeholder="From concept to launch, we build digital excellence."
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors"
                disabled={submitting}
              >
                {submitting ? 'UPDATING...' : 'SAVE TAGLINE'}
              </button>
            </div>
          </form>

          {/* 2. Directory Links */}
          <div className="border border-white/10 p-6 bg-[#111111]/30 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase">
                DIRECTORY MAP LINKS ({links.length})
              </h3>
              <button
                onClick={handleOpenAdd}
                className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                disabled={submitting}
              >
                <Plus className="w-3 h-3" />
                <span>ADD LINK</span>
              </button>
            </div>

            <div className="space-y-3">
              {links.map((link, index) => (
                <div 
                  key={index}
                  className="border border-white/5 p-4 bg-[#0A0A0A] flex justify-between items-center gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-mono text-xs font-bold text-[#F5F0EB] uppercase tracking-wider">{link.name}</h4>
                    <p className="font-mono text-[9px] text-[#888888] truncate">{link.href}</p>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0 || submitting}
                        className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 transition-all"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === links.length - 1 || submitting}
                        className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 transition-all"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleOpenEdit(index, link)}
                        className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] transition-all"
                        disabled={submitting}
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1.5 border border-white/5 bg-[#111111] hover:border-red-500/50 text-[#888888] hover:text-red-400 transition-all"
                        disabled={submitting}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm flex justify-center items-center p-6 selection:bg-[#C8B89A]/30">
          <div className="w-full max-w-[420px] border border-white/10 bg-[#111111] p-8 space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-[#888888] hover:text-[#F5F0EB]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif italic text-2xl text-[#F5F0EB]">
              {isEditing ? 'Modify Footer Link' : 'Register Footer Link'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">LINK CAPTION LABEL</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  placeholder="e.g. Terms of Service"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">TARGET URL PATH (HREF)</label>
                <input
                  type="text"
                  value={href}
                  onChange={(e) => setHref(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono"
                  placeholder="e.g. /terms"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-white/10 hover:bg-[#1A1A1A] font-mono text-[9px] uppercase tracking-wider text-[#888888] hover:text-[#F5F0EB] transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors"
                >
                  {isEditing ? 'APPLY MODS' : 'COMMIT ADD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
