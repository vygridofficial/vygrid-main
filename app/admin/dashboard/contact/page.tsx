'use client';

import React, { useEffect, useState } from 'react';
import { updateContactSettings, saveFAQ, deleteFAQ, fetchCMSData } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, X, HelpCircle } from 'lucide-react';

export default function ContactSettingsAndFAQPage() {
  const [loading, setLoading] = useState(true);
  const [submittingSettings, setSubmittingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState('');

  // Contact details state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [otherLinks, setOtherLinks] = useState<any[]>([]);

  // Custom links temporary state
  const [linkKey, setLinkKey] = useState('');
  const [linkVal, setLinkVal] = useState('');

  // FAQs State
  const [faqTab, setFaqTab] = useState<'web' | 'brand'>('web');
  const [faqs, setFaqs] = useState<any[]>([]);

  // FAQ Modal state
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [isEditingFaq, setIsEditingFaq] = useState(false);
  const [editingQId, setEditingQId] = useState('');
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  const loadData = async () => {
    try {
      const data = await fetchCMSData();
      if (data.contactSettings) {
        const c = data.contactSettings;
        setEmail(c.email || '');
        setPhone(c.phone || '');
        setWhatsapp(c.whatsapp || '');
        setInstagram(c.instagram || '');
        setOtherLinks(c.otherLinks || []);
      }
      if (faqTab === 'web') {
        setFaqs(data.webFAQs || []);
      } else {
        setFaqs(data.brandFAQs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [faqTab]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingSettings(true);
    setSettingsSuccess(false);
    setSettingsError('');

    try {
      const payload = {
        email,
        phone,
        whatsapp,
        instagram,
        otherLinks
      };

      const res = await updateContactSettings(payload);
      if (res.success) {
        setSettingsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSettingsError('Database write failed.');
      }
    } catch (err) {
      setSettingsError('An unexpected server error occurred.');
    } finally {
      setSubmittingSettings(false);
    }
  };

  const handleOpenAddFaq = () => {
    setIsEditingFaq(false);
    setEditingQId('');
    setFaqQ('');
    setFaqA('');
    setFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: any) => {
    setIsEditingFaq(true);
    setEditingQId(faq.q);
    setFaqQ(faq.q);
    setFaqA(faq.a);
    setFaqModalOpen(true);
  };

  const handleSubmitFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQ || !faqA) return;

    try {
      if (isEditingFaq && editingQId && editingQId !== faqQ) {
        await deleteFAQ(editingQId, faqTab === 'web');
      }
      const res = await saveFAQ({ q: faqQ, a: faqA }, faqTab === 'web');
      if (res.success) {
        setFaqModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFaq = async (qStr: string) => {
    if (!confirm(`Are you sure you want to remove FAQ "${qStr}"?`)) return;
    try {
      const res = await deleteFAQ(qStr, faqTab === 'web');
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
          RETRIEVING CONTACT MATRICES...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn pb-16 max-w-7xl">
      
      {/* Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Contact & FAQs</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Edit studio email, telephone, WhatsApp, social channels, and frequently asked queries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Info Editor */}
        <div className="lg:col-span-7 border border-white/10 p-6 md:p-8 bg-[#111111]/30">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase border-b border-white/5 pb-4">
              STUDIO CONTACT & DIRECT CHANNELS
            </h3>

            {settingsSuccess && (
              <div className="p-3 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-[10px] uppercase tracking-wider text-center">
                ✔ CONTACT DETAILS SYNCHRONIZED SUCCESSFULLY.
              </div>
            )}

            {settingsError && (
              <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
                ⚠ {settingsError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none"
                  placeholder="hello@vygrid.studio"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">TELEPHONE NUMBER</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-[#888888]">WHATSAPP DIGIT PATH</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                  placeholder="10000000000 (No symbols)"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block font-mono text-[8px] uppercase tracking-wider text-[#888888]">INSTAGRAM URL</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono"
                  placeholder="https://instagram.com/..."
                  required
                />
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-4">
              <span className="block font-mono text-[8px] uppercase tracking-widest text-[#444444]">CUSTOM STUDIO LINKS</span>
              
              {/* Add custom link row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                <div className="sm:col-span-1 space-y-1">
                  <label className="block font-mono text-[8px] uppercase text-[#888888]">LINK LABEL</label>
                  <input
                    type="text"
                    value={linkKey}
                    onChange={(e) => setLinkKey(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                    placeholder="e.g. GitHub"
                  />
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <div className="flex-grow space-y-1">
                    <label className="block font-mono text-[8px] uppercase text-[#888888]">DESTINATION URL</label>
                    <input
                      type="text"
                      value={linkVal}
                      onChange={(e) => setLinkVal(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!linkKey || !linkVal) return;
                      setOtherLinks([...otherLinks, { label: linkKey.trim(), url: linkVal.trim() }]);
                      setLinkKey('');
                      setLinkVal('');
                    }}
                    className="px-4 py-2 border border-white/10 text-xs text-[#888888] hover:text-[#F5F0EB]"
                    title="Add Custom Link"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* List of custom links */}
              <div className="space-y-1 pt-1">
                {otherLinks.map((link, idx) => (
                  <div key={idx} className="flex justify-between items-center px-2 py-1 border border-white/5 bg-[#0A0A0A] text-[9px] text-[#888888]">
                    <span className="font-mono uppercase tracking-wider">
                      {link.label}: <span className="text-[#888888] lowercase font-light ml-1">{link.url}</span>
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setOtherLinks(otherLinks.filter((_, i) => i !== idx))} 
                      className="text-[#444444] hover:text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition-colors"
                disabled={submittingSettings}
              >
                {submittingSettings ? 'SAVING...' : 'SAVE CONTACT MATRIX'}
              </button>
            </div>
          </form>
        </div>

        {/* Right: FAQ Manager */}
        <div className="lg:col-span-5 border border-white/10 p-6 bg-[#111111]/30 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase flex items-center">
              <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
              <span>FREQUENT QUESTIONS ({faqs.length})</span>
            </h3>
            <button
              onClick={handleOpenAddFaq}
              className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD FAQ</span>
            </button>
          </div>

          {/* Sub-tabs inside FAQ module */}
          <div className="flex border-b border-white/5 font-mono text-[9px] tracking-widest uppercase">
            <button
              onClick={() => setFaqTab('web')}
              className={`flex-1 py-2 text-center border-b transition-all ${
                faqTab === 'web'
                  ? 'border-[#C8B89A] text-[#C8B89A] font-bold bg-[#111111]/50'
                  : 'border-transparent text-[#888888] hover:text-[#F5F0EB]'
              }`}
            >
              WEB STACK FAQs
            </button>
            <button
              onClick={() => setFaqTab('brand')}
              className={`flex-1 py-2 text-center border-b transition-all ${
                faqTab === 'brand'
                  ? 'border-[#C8B89A] text-[#C8B89A] font-bold bg-[#111111]/50'
                  : 'border-transparent text-[#888888] hover:text-[#F5F0EB]'
              }`}
            >
              BRANDING FAQs
            </button>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {faqs.map((faq) => (
              <div 
                key={faq.q} 
                className="border border-white/5 p-4 bg-[#0A0A0A] space-y-2"
              >
                <div className="flex justify-between items-start gap-4">
                  <h4 className="font-serif italic text-[#F5F0EB] text-sm leading-snug">{faq.q}</h4>
                  <div className="flex space-x-1 flex-shrink-0">
                    <button
                      onClick={() => handleOpenEditFaq(faq)}
                      className="p-1 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] transition-all"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.q)}
                      className="p-1 border border-white/5 bg-[#111111] hover:border-red-500/50 text-[#888888] hover:text-red-400 transition-all"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="font-grotesque text-[11px] text-[#888888] font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FAQ Form Modal */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm flex justify-center items-center p-6 selection:bg-[#C8B89A]/30">
          <div className="w-full max-w-[540px] border border-white/10 bg-[#111111] p-8 space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setFaqModalOpen(false)}
              className="absolute top-6 right-6 text-[#888888] hover:text-[#F5F0EB]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif italic text-2xl text-[#F5F0EB]">
              {isEditingFaq ? 'Modify FAQ Entry' : 'Create FAQ Entry'}
            </h3>

            <form onSubmit={handleSubmitFaq} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">QUESTION QUERY</label>
                <input
                  type="text"
                  value={faqQ}
                  onChange={(e) => setFaqQ(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  placeholder="e.g. How long does a build take?"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">ANSWER EXPLANATION</label>
                <textarea
                  value={faqA}
                  onChange={(e) => setFaqA(e.target.value)}
                  rows={5}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  placeholder="Draft the complete informational response..."
                  required
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-4 py-2 border border-white/10 hover:bg-[#1A1A1A] font-mono text-[9px] uppercase tracking-wider text-[#888888] hover:text-[#F5F0EB] transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors"
                >
                  {isEditingFaq ? 'APPLY MODS' : 'COMMIT ADD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
