'use client';

import React, { useEffect, useState } from 'react';
import { updateAboutPageSettings, saveTeamMember, deleteTeamMember, fetchCMSData, uploadMedia } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { compressImage } from '@/lib/image';

export default function AboutPageManagement() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Page settings state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [introHeading, setIntroHeading] = useState('');
  const [introParagraph1, setIntroParagraph1] = useState('');
  const [introParagraph2, setIntroParagraph2] = useState('');

  // Team list state
  const [teamList, setTeamList] = useState<any[]>([]);

  // Team Form Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNameId, setEditingNameId] = useState(''); // Stores name (which serves as key)
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberBio, setMemberBio] = useState('');
  const [memberImage, setMemberImage] = useState('');
  const [memberLinkedin, setMemberLinkedin] = useState('');
  const [memberTwitter, setMemberTwitter] = useState('');
  const [memberGithub, setMemberGithub] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const base64 = await compressImage(file);
      const res = await uploadMedia(file.name, base64);
      if (res.success && res.url) {
        setMemberImage(res.url);
      } else {
        alert(res.error || 'Failed to upload photo.');
      }
    } catch (err: any) {
      console.error(err);
      alert('An error occurred during file upload: ' + (err.message || err));
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCMSData();
        if (data.aboutPageSettings) {
          const a = data.aboutPageSettings;
          setTitle(a.title || '');
          setSubtitle(a.subtitle || '');
          setIntroHeading(a.introHeading || '');
          setIntroParagraph1(a.introParagraph1 || '');
          setIntroParagraph2(a.introParagraph2 || '');
        }
        if (data.team) {
          setTeamList(data.team);
        }
      } catch (err) {
        console.error("Error loading about page settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      const payload = { title, subtitle, introHeading, introParagraph1, introParagraph2 };
      const res = await updateAboutPageSettings(payload);
      if (res.success) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Database update failed.');
      }
    } catch (err) {
      setError('An unexpected system error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditingNameId('');
    setMemberName('');
    setMemberRole('');
    setMemberBio('');
    setMemberImage('');
    setMemberLinkedin('');
    setMemberTwitter('');
    setMemberGithub('');
    setModalOpen(true);
  };

  const openEditModal = (member: any) => {
    setIsEditing(true);
    setEditingNameId(member.name);
    setMemberName(member.name);
    setMemberRole(member.role);
    setMemberBio(member.bio || '');
    setMemberImage(member.image || '');
    setMemberLinkedin(member.socials?.linkedin || '');
    setMemberTwitter(member.socials?.twitter || '');
    setMemberGithub(member.socials?.github || '');
    setModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName || !memberRole) return;

    try {
      const payload = {
        name: memberName,
        role: memberRole,
        bio: memberBio,
        image: memberImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
        socials: {
          linkedin: memberLinkedin || undefined,
          twitter: memberTwitter || undefined,
          github: memberGithub || undefined
        }
      };

      if (isEditing && editingNameId && editingNameId !== memberName) {
        // Name changed, delete old key to prevent duplicate
        await deleteTeamMember(editingNameId);
      }

      const res = await saveTeamMember(payload);
      if (res.success) {
        // Update local list state
        const updatedList = [...teamList];
        const idx = updatedList.findIndex(m => m.name.toLowerCase() === editingNameId.toLowerCase());
        if (idx > -1 && isEditing) {
          updatedList[idx] = payload;
        } else {
          updatedList.push(payload);
        }
        setTeamList(updatedList);
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMember = async (name: string) => {
    if (!confirm(`Are you sure you want to remove team member ${name}?`)) return;
    try {
      const res = await deleteTeamMember(name);
      if (res.success) {
        setTeamList(teamList.filter(m => m.name !== name));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
          ACQUIRING BIOGRAPHY RECORDS...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn relative pb-16">
      
      {/* Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">About Page & Team</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Edit studio profiles, introductory briefs, structural convictions, and founders registry.
        </p>
      </div>

      {success && (
        <div className="p-4 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-xs uppercase tracking-wider text-center max-w-4xl">
          ✔ ABOUT PAGE BIOGRAPHY DEPLOYED TO CLOUD. CACHE UPDATE COMPLETED.
        </div>
      )}

      {error && (
        <div className="p-4 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-xs uppercase tracking-wider text-center max-w-4xl">
          ⚠ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl">
        
        {/* Left Side: General biography text fields */}
        <div className="lg:col-span-7 border border-white/10 p-6 md:p-8 bg-[#111111]/30">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4">
              ABOUT PAGE TEXT BLOCKS
            </h3>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                Page Heading Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                placeholder="e.g. About Our Studio"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                Page Subtitle text
              </label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                rows={3}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none"
                placeholder="Page header description..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                Section Intro Heading Title
              </label>
              <input
                type="text"
                value={introHeading}
                onChange={(e) => setIntroHeading(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                placeholder="e.g. We are a design and engineering studio."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                conviction Paragraph 1
              </label>
              <textarea
                value={introParagraph1}
                onChange={(e) => setIntroParagraph1(e.target.value)}
                rows={5}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#888888]">
                conviction Paragraph 2
              </label>
              <textarea
                value={introParagraph2}
                onChange={(e) => setIntroParagraph2(e.target.value)}
                rows={5}
                className="w-full bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold tracking-[0.2em] uppercase transition-colors"
                disabled={submitting}
              >
                {submitting ? 'COMMITTING...' : 'SAVE TEXT BLOCKS'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Team Registry List */}
        <div className="lg:col-span-5 border border-white/10 p-6 bg-[#111111]/30 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase">
              STUDIO TEAM REGISTRY ({teamList.length})
            </h3>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
            >
              <Plus className="w-3 h-3" />
              <span>ADD REGISTER</span>
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {teamList.map((member) => (
              <div 
                key={member.name} 
                className="border border-white/5 p-4 bg-[#0A0A0A] flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-12 h-12 bg-[#1A1A1A] relative flex-shrink-0 border border-white/10">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-mono text-xs font-bold text-[#F5F0EB] truncate">{member.name}</h4>
                    <p className="font-mono text-[10px] text-[#C8B89A] tracking-wider truncate">{member.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] transition-all"
                    title="Edit Member"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.name)}
                    className="p-2 border border-white/5 bg-[#111111] hover:border-red-500/50 text-[#888888] hover:text-red-400 transition-all"
                    title="Delete Member"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Team Form Modal Overlay */}
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
              {isEditing ? 'Modify Member Profile' : 'Register Team Member'}
            </h3>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">FULL NAME</label>
                  <input
                    type="text"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Alex Sterling"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">ROLE / CAPACITY</label>
                  <input
                    type="text"
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Lead Brand Architect"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">BIOGRAPHY</label>
                <textarea
                  value={memberBio}
                  onChange={(e) => setMemberBio(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none"
                  placeholder="Summarize the member's strategic conviction..."
                  required
                />
              </div>

              <div className="space-y-2 border border-white/5 p-4 bg-[#0A0A0A]/40 rounded-sm">
                <label className="block font-mono text-[8px] uppercase text-[#888888] tracking-wider">AVATAR PORTRAIT IMAGE (OPTIONAL)</label>
                <div className="flex items-center space-x-3">
                  {memberImage ? (
                    <div className="w-12 h-12 border border-white/10 bg-[#0A0A0A] relative flex-shrink-0 overflow-hidden">
                      <img src={memberImage} alt="Avatar Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setMemberImage('')}
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
                      value={memberImage}
                      onChange={(e) => setMemberImage(e.target.value)}
                      placeholder="Avatar URL link..."
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-1.5 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono mb-2"
                    />
                    <label className="inline-block px-3 py-1 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[8px] uppercase tracking-widest bg-transparent cursor-pointer transition-colors">
                      {uploadingImage ? 'UPLOADING...' : 'UPLOAD FILE'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3">
                <span className="block font-mono text-[8px] uppercase tracking-widest text-[#444444]">SOCIAL LINKS (OPTIONAL)</span>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase text-[#888888]">LINKEDIN</label>
                    <input
                      type="text"
                      value={memberLinkedin}
                      onChange={(e) => setMemberLinkedin(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 text-[10px] text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                      placeholder="#"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase text-[#888888]">TWITTER</label>
                    <input
                      type="text"
                      value={memberTwitter}
                      onChange={(e) => setMemberTwitter(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 text-[10px] text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                      placeholder="#"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase text-[#888888]">GITHUB</label>
                    <input
                      type="text"
                      value={memberGithub}
                      onChange={(e) => setMemberGithub(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-2 py-1.5 text-[10px] text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                      placeholder="#"
                    />
                  </div>
                </div>
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
