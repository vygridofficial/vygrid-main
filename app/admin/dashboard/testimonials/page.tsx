'use client';

import React, { useEffect, useState } from 'react';
import { fetchCMSData, saveTestimonial, deleteTestimonial, uploadMedia } from '@/app/actions/cms';
import { Plus, Trash2, X, Star, Check, Eye, EyeOff } from 'lucide-react';

export default function TestimonialsManagementPage() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved');

  // Form State for adding a new testimonial
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [stars, setStars] = useState(5);
  const [avatar, setAvatar] = useState('');
  const [comment, setComment] = useState('');
  
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCMSData();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setName('');
    setRole('');
    setCompany('');
    setStars(5);
    setAvatar('');
    setComment('');
    setModalOpen(true);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const res = await uploadMedia(file.name, base64);
        if (res.success && res.url) {
          setAvatar(res.url);
        } else {
          alert(res.error || 'Failed to upload photo.');
        }
        setUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      alert('An error occurred during file upload.');
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !company || !comment) return;

    const payload = {
      name,
      role,
      company,
      stars,
      avatar: avatar.trim(), // Keep completely blank if not uploaded
      comment,
      approved: true, // Manual additions from admin are auto-approved
      visible: true,  // and visible
    };

    try {
      const res = await saveTestimonial(payload);
      if (res.success) {
        setModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (t: any) => {
    const updated = {
      ...t,
      approved: true,
      visible: true,
    };
    try {
      const res = await saveTestimonial(updated);
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleVisibility = async (t: any) => {
    const isCurrentlyVisible = t.visible !== false;
    const updated = {
      ...t,
      visible: !isCurrentlyVisible,
    };
    try {
      const res = await saveTestimonial(updated);
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (nameStr: string) => {
    if (!confirm(`Are you sure you want to remove testimonial from "${nameStr}"?`)) return;
    try {
      const res = await deleteTestimonial(nameStr);
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return nameStr.substring(0, 2).toUpperCase();
  };

  const pendingReviews = testimonials.filter((t) => t.approved === false);
  const approvedReviews = testimonials.filter((t) => t.approved !== false);
  const activeList = activeTab === 'approved' ? approvedReviews : pendingReviews;

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Testimonials</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Moderate client feedback requests and manage visible quotes displayed across the website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest bg-transparent transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW TESTIMONIAL</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 space-x-6">
        <button
          onClick={() => setActiveTab('approved')}
          className={`pb-3 font-mono text-[10px] tracking-wider uppercase transition-colors relative ${
            activeTab === 'approved' 
              ? 'text-[#C8B89A]' 
              : 'text-[#888888] hover:text-[#F5F0EB]'
          }`}
        >
          Approved Testimonials ({approvedReviews.length})
          {activeTab === 'approved' && (
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C8B89A]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 font-mono text-[10px] tracking-wider uppercase transition-colors relative flex items-center space-x-1.5 ${
            activeTab === 'pending' 
              ? 'text-[#C8B89A]' 
              : 'text-[#888888] hover:text-[#F5F0EB]'
          }`}
        >
          <span>Pending Requests</span>
          {pendingReviews.length > 0 ? (
            <span className="bg-[#C8B89A] text-[#0A0A0A] font-bold px-1.5 py-0.5 text-[8px]">
              {pendingReviews.length}
            </span>
          ) : (
            <span className="text-[#444444]">(0)</span>
          )}
          {activeTab === 'pending' && (
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C8B89A]" />
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            LOADING CLIENT FEEDBACK...
          </div>
        </div>
      ) : activeList.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 bg-[#111111]/20">
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            {activeTab === 'approved' 
              ? 'No approved testimonials in the registry.' 
              : 'No pending review requests to moderate.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeList.map((t) => {
            const isVisible = t.visible !== false;
            return (
              <div 
                key={t.name} 
                className="border border-white/10 bg-[#111111]/40 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      {t.avatar ? (
                        <div className="w-10 h-10 bg-[#1A1A1A] relative flex-shrink-0 border border-white/10 overflow-hidden">
                          <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center border border-white/10 text-[10px] font-mono text-[#C8B89A] flex-shrink-0">
                          {getInitials(t.name)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-mono text-xs font-bold text-[#F5F0EB]">{t.name}</h4>
                          {activeTab === 'approved' && (
                            <span className={`px-1.5 py-0.5 font-mono text-[7px] tracking-wider ${
                              isVisible 
                                ? 'text-green-400 border border-green-500/20 bg-green-950/10' 
                                : 'text-[#888888] border border-white/5 bg-[#161616]'
                            }`}>
                              {isVisible ? 'VISIBLE' : 'HIDDEN'}
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[9px] text-[#888888]">{t.role} &middot; {t.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      {Array.from({ length: t.stars || 5 }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-[#C8B89A] text-[#C8B89A]" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 flex justify-end space-x-2">
                  {activeTab === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(t)}
                        className="flex items-center space-x-1 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-3.5 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                      >
                        <Check className="w-2.5 h-2.5" />
                        <span>APPROVE</span>
                      </button>
                      <button
                        onClick={() => handleDelete(t.name)}
                        className="flex items-center space-x-1 border border-white/10 hover:border-red-500/50 hover:text-red-400 px-3.5 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>REJECT</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleToggleVisibility(t)}
                        className={`flex items-center space-x-1 border px-3.5 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all ${
                          isVisible 
                            ? 'border-white/10 hover:border-[#C8B89A] text-[#888888] hover:text-[#F5F0EB]'
                            : 'border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB]'
                        }`}
                        title={isVisible ? "Hide review from public website" : "Show review on public website"}
                      >
                        {isVisible ? (
                          <>
                            <EyeOff className="w-2.5 h-2.5" />
                            <span>HIDE REVIEW</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-2.5 h-2.5" />
                            <span>SHOW REVIEW</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(t.name)}
                        className="flex items-center space-x-1 border border-white/10 hover:border-red-500/50 hover:text-red-400 px-3.5 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>DELETE</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Form for adding new testimonial */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm flex justify-center items-center p-6 selection:bg-[#C8B89A]/30">
          <div className="w-full max-w-[540px] border border-white/10 bg-[#111111] p-8 space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-[#888888] hover:text-[#F5F0EB]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif italic text-2xl text-[#F5F0EB]">
              Record Testimonial
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CLIENT NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Genevieve Thorne"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">STAR COUNT (1 TO 5)</label>
                  <select
                    value={stars}
                    onChange={(e) => setStars(Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">DESIGNATION / ROLE</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                    placeholder="e.g. Managing Director"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">COMPANY NAME</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                    placeholder="e.g. Luxe Realty Group"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 border border-white/5 p-4 bg-[#0A0A0A]/40 rounded-sm">
                <label className="block font-mono text-[8px] uppercase text-[#888888] tracking-wider">AVATAR PROFILE IMAGE (OPTIONAL)</label>
                <div className="flex items-center space-x-3">
                  {avatar ? (
                    <div className="w-12 h-12 border border-white/10 bg-[#0A0A0A] relative flex-shrink-0 overflow-hidden">
                      <img src={avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setAvatar('')}
                        className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors z-10"
                        title="Remove Image"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-12 h-12 border border-dashed border-white/10 bg-[#0A0A0A]/50 flex items-center justify-center text-[9px] text-[#444444] font-mono flex-shrink-0">
                      NO IMG
                    </div>
                  )}
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="Avatar URL link..."
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-1.5 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono mb-2"
                    />
                    <label className="inline-block px-3 py-1 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[8px] uppercase tracking-widest bg-transparent cursor-pointer transition-colors">
                      {uploadingAvatar ? 'UPLOADING...' : 'UPLOAD FILE'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        disabled={uploadingAvatar}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">REVIEW COMMENTS</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none"
                  placeholder="Write the client's comments here..."
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
                  COMMIT ADD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
