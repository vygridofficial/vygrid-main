'use client';

import React, { useEffect, useState } from 'react';
import { updateNavigationSettings, fetchCMSData } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, X } from 'lucide-react';

export default function NavigationManagementPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [links, setLinks] = useState<any[]>([]);

  // Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [name, setName] = useState('');
  const [href, setHref] = useState('');
  const [triggerModal, setTriggerModal] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchCMSData();
      if (data.navigationSettings) {
        setLinks(data.navigationSettings.navLinks || []);
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

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const list = [...links];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setLinks(list);
    setSubmitting(true);
    await updateNavigationSettings({ navLinks: list });
    setSubmitting(false);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditIndex(-1);
    setName('');
    setHref('');
    setTriggerModal(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (index: number, link: any) => {
    setIsEditing(true);
    setEditIndex(index);
    setName(link.name);
    setHref(link.href);
    setTriggerModal(!!link.triggerModal);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newLink = {
      name,
      href: triggerModal ? '#' : href,
      triggerModal: triggerModal ? true : undefined
    };

    const updated = [...links];
    if (isEditing && editIndex > -1) {
      updated[editIndex] = newLink;
    } else {
      updated.push(newLink);
    }

    setLinks(updated);
    setModalOpen(false);
    setSubmitting(true);
    await updateNavigationSettings({ navLinks: updated });
    setSubmitting(false);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to remove this navigation link?')) return;
    const updated = links.filter((_, idx) => idx !== index);
    setLinks(updated);
    setSubmitting(true);
    await updateNavigationSettings({ navLinks: updated });
    setSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Navigation Menu</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Reorder and customize links appearing in the header navigation menu.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest bg-transparent transition-all"
          disabled={submitting}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD LINK</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            RETRIEVING NAVIGATION MATRIX...
          </div>
        </div>
      ) : links.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 bg-[#111111]/20">
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            No navigation menu items defined.
          </p>
        </div>
      ) : (
        <div className="max-w-3xl space-y-3">
          <span className="block font-mono text-[9px] tracking-widest text-[#444444] uppercase mb-1">
            ACTIVE HEADER MENU SCHEMAS (LEFT-TO-RIGHT ORDER)
          </span>

          {links.map((link, index) => (
            <div 
              key={index}
              className="border border-white/10 p-4 bg-[#111111]/40 flex justify-between items-center gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-mono text-xs font-bold text-[#F5F0EB] uppercase tracking-wider">{link.name}</h4>
                  {link.triggerModal && (
                    <span className="px-2 py-0.5 border border-[#C8B89A]/30 text-[#C8B89A] bg-[#C8B89A]/5 font-mono text-[8px] uppercase tracking-widest select-none">
                      MODAL TRIGGER
                    </span>
                  )}
                </div>
                {!link.triggerModal && (
                  <p className="font-mono text-[10px] text-[#888888] truncate">{link.href}</p>
                )}
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0 || submitting}
                    className="p-1.5 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 transition-all"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === links.length - 1 || submitting}
                    className="p-1.5 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 transition-all"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleOpenEdit(index, link)}
                    className="p-2 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] transition-all"
                    disabled={submitting}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 border border-white/5 bg-[#0A0A0A] hover:border-red-500/50 text-[#888888] hover:text-red-400 transition-all"
                    disabled={submitting}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm flex justify-center items-center p-6 selection:bg-[#C8B89A]/30">
          <div className="w-full max-w-[480px] border border-white/10 bg-[#111111] p-8 space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-[#888888] hover:text-[#F5F0EB]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif italic text-2xl text-[#F5F0EB]">
              {isEditing ? 'Modify Navbar Link' : 'Register Navbar Link'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">LINK CAPTION LABEL</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  placeholder="e.g. Services"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 border border-white/5 p-3 bg-[#0A0A0A]">
                <input
                  type="checkbox"
                  id="triggerModal"
                  checked={triggerModal}
                  onChange={(e) => setTriggerModal(e.target.checked)}
                  className="w-4 h-4 accent-[#C8B89A]"
                />
                <label htmlFor="triggerModal" className="font-mono text-[9px] uppercase tracking-widest text-[#888888] cursor-pointer">
                  TRIGGER ABOUT SLIDE-IN PANEL MODAL
                </label>
              </div>

              {!triggerModal && (
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">TARGET URL PATH (HREF)</label>
                  <input
                    type="text"
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono"
                    placeholder="e.g. /services"
                    required={!triggerModal}
                  />
                </div>
              )}

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
