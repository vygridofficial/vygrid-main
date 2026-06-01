'use client';

import React, { useEffect, useState } from 'react';
import { fetchCMSData, saveServicePricing, deleteServicePricing, updateServicePricingOrder, uploadMedia, migrateServicePricingCurrency, savePricingPageSettings } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, DollarSign, Image as ImageIcon } from 'lucide-react';
import { compressImage } from '@/lib/image';

export default function PricingManagementPage() {
  const [loading, setLoading] = useState(true);
  const [pricingItems, setPricingItems] = useState<any[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  
  const [serviceName, setServiceName] = useState('');
  const [customServiceName, setCustomServiceName] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');

  // Pricing Page Text Settings
  const [pageSettingsSaving, setPageSettingsSaving] = useState(false);
  const [pageSettingsSaved, setPageSettingsSaved] = useState(false);
  const [pricingSectionLabel, setPricingSectionLabel] = useState('INVESTMENT MATRIX');
  const [pricingHeading, setPricingHeading] = useState('Transparent Rates.');
  const [pricingDescription, setPricingDescription] = useState('No hidden retainers, no hourly inflation. Full codebase and asset ownership with strict flat rates matching your deliverables.');
  const [pricingCtaTitle, setPricingCtaTitle] = useState('Need a bespoke package?');
  const [pricingCtaDesc, setPricingCtaDesc] = useState('Every project is different. Tell us about yours and we\'ll craft a solution around your exact requirements and budget.');
  const [pricingCtaBtn, setPricingCtaBtn] = useState('START YOUR PROJECT');

  const loadData = async () => {
    setLoading(true);
    try {
      // Auto-migrate any $ values to ₹ in Firestore on every page load
      await migrateServicePricingCurrency();
      const data = await fetchCMSData();
      
      // Load all available services to populate dropdown
      const webTitles = (data.webServices || []).map((s: any) => s.title);
      const brandTitles = (data.brandServices || []).map((s: any) => s.title);
      setAvailableServices([...new Set([...webTitles, ...brandTitles])]);
      
      // Load current service pricing items
      setPricingItems(data.servicePricing || []);

      // Load pricing page text settings
      const ps = data.pricingPageSettings;
      if (ps) {
        if (ps.sectionLabel) setPricingSectionLabel(ps.sectionLabel);
        if (ps.heading) setPricingHeading(ps.heading);
        if (ps.description) setPricingDescription(ps.description);
        if (ps.ctaTitle) setPricingCtaTitle(ps.ctaTitle);
        if (ps.ctaDescription) setPricingCtaDesc(ps.ctaDescription);
        if (ps.ctaButtonText) setPricingCtaBtn(ps.ctaButtonText);
      }
    } catch (err) {
      console.error("Error loading pricing data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const list = [...pricingItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    // Swap elements
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setPricingItems(list);
    await updateServicePricingOrder(list);
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId('');
    setServiceName(availableServices[0] || 'Custom');
    setCustomServiceName('');
    setPriceRange('From ₹10,000');
    setImageUrl('');
    setFeatures([]);
    setFeatureInput('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setIsEditing(true);
    setEditingId(item.id);
    
    // Check if the service name is in available services list
    if (availableServices.includes(item.serviceName)) {
      setServiceName(item.serviceName);
      setCustomServiceName('');
    } else {
      setServiceName('Custom');
      setCustomServiceName(item.serviceName);
    }
    
    setPriceRange(item.priceRange);
    setImageUrl(item.imageUrl || '');
    setFeatures(item.features || []);
    setFeatureInput('');
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const base64String = await compressImage(file);
      const res = await uploadMedia(file.name, base64String);
      if (res.success && res.url) {
        setImageUrl(res.url);
      } else {
        alert('Upload failed: ' + res.error);
      }
    } catch (err: any) {
      console.error(err);
      alert('An error occurred during file upload: ' + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures([...features, featureInput.trim()]);
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalServiceName = serviceName === 'Custom' ? customServiceName : serviceName;
    if (!finalServiceName || !priceRange) return;

    const payload = {
      id: isEditing ? editingId : `pricing-${Date.now()}`,
      serviceName: finalServiceName,
      priceRange,
      features,
      imageUrl
    };

    try {
      const res = await saveServicePricing(payload);
      if (res.success) {
        setModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete service pricing for "${name}"?`)) return;
    try {
      const res = await deleteServicePricing(id);
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 selection:bg-[#C8B89A]/30">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Service Pricing Curation</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Build and manage dynamic rates and deliverables display matrices for the main site.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest bg-transparent transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW SERVICE RATE</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            LOADING PRICING CARDS...
          </div>
        </div>
      ) : pricingItems.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 bg-[#111111]/20">
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            No pricing records registered. Click &quot;New Service Rate&quot; to establish entries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricingItems.map((item, index) => (
            <div 
              key={item.id || index} 
              className="border border-white/10 bg-[#111111]/40 p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-12 bg-[#0A0A0A] border border-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.serviceName} className="w-full h-full object-cover" />
                      ) : (
                        <DollarSign className="w-5 h-5 text-[#C8B89A]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif italic text-lg text-[#F5F0EB]">{item.serviceName}</h3>
                      <span className="font-mono text-[10px] font-bold text-[#C8B89A] block mt-0.5">
                        {item.priceRange}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 disabled:hover:text-[#888888] disabled:hover:border-white/5 transition-all"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === pricingItems.length - 1}
                      className="p-1.5 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 disabled:hover:text-[#888888] disabled:hover:border-white/5 transition-all"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="block font-mono text-[8px] uppercase tracking-wider text-[#444444]">
                    INCLUDED DELIVERABLES & FEATURES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(item.features || []).map((feat: string) => (
                      <span key={feat} className="px-2.5 py-1 border border-white/5 bg-[#0A0A0A] text-[9px] text-[#888888] select-none">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center space-x-1 border border-white/10 hover:border-[#C8B89A] px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                  <span>EDIT</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.serviceName)}
                  className="flex items-center space-x-1 border border-white/10 hover:border-red-500/50 hover:text-red-400 px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                  <span>DELETE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
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
              {isEditing ? 'Modify Service Pricing' : 'Add Service Pricing'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">SELECT SERVICE</label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  >
                    {availableServices.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                    <option value="Custom">-- Custom Service --</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">PRICE STAMP / RANGE</label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. From ₹10,000"
                    required
                  />
                </div>

              </div>

              {serviceName === 'Custom' && (
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CUSTOM SERVICE NAME</label>
                  <input
                    type="text"
                    value={customServiceName}
                    onChange={(e) => setCustomServiceName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Custom AI Consulting"
                    required
                  />
                </div>
              )}

              {/* IMAGE UPLOAD OPTION */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">
                  SERVICE PREVIEW IMAGE (OPTIONAL)
                </label>
                <div className="flex items-center space-x-4">
                  {imageUrl ? (
                    <div className="w-16 h-12 border border-white/10 bg-[#0A0A0A] relative flex-shrink-0 overflow-hidden">
                      <img src={imageUrl} alt="Uploaded Pricing Image" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors z-10"
                        title="Remove Image"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-12 border border-dashed border-white/10 bg-[#0A0A0A]/50 flex items-center justify-center text-[9px] text-[#444444] font-mono flex-shrink-0">
                      NO IMG
                    </div>
                  )}
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or enter custom image URL link..."
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono mb-2"
                    />
                    <label className="inline-block px-3 py-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[8px] uppercase tracking-widest bg-transparent cursor-pointer transition-colors">
                      {uploading ? 'UPLOADING...' : 'UPLOAD IMAGE FILE'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Capabilities Manager */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">INCLUDED DELIVERABLES / ITEMS</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-grow bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Responsive templates"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 border border-white/10 hover:border-[#C8B89A] font-mono text-[9px] uppercase tracking-wider text-[#888888] hover:text-[#F5F0EB] transition-colors"
                  >
                    ADD
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {features.map((feat, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-1.5 px-2.5 py-1 border border-white/10 bg-[#0A0A0A] text-[9px] text-[#888888] select-none"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-[#444444] hover:text-red-400 font-bold font-mono"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
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
                  {isEditing ? 'APPLY CHANGES' : 'CREATE ENTRY'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pricing Page Text Settings */}
      <div className="border-t border-white/10 pt-10 space-y-6">
        <div>
          <h3 className="font-serif italic text-2xl text-[#F5F0EB]">Pricing Page Text</h3>
          <p className="font-grotesque text-xs text-[#888888] font-light mt-1">
            Edit the header and CTA text displayed on the public <span className="text-[#C8B89A] font-mono">/pricing</span> page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">SECTION LABEL</label>
            <input
              type="text"
              value={pricingSectionLabel}
              onChange={(e) => setPricingSectionLabel(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
              placeholder="e.g. INVESTMENT MATRIX"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">PAGE HEADING</label>
            <input
              type="text"
              value={pricingHeading}
              onChange={(e) => setPricingHeading(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
              placeholder="e.g. Transparent Rates."
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">PAGE DESCRIPTION</label>
          <textarea
            value={pricingDescription}
            onChange={(e) => setPricingDescription(e.target.value)}
            rows={3}
            className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none"
            placeholder="Introductory description text below the heading"
          />
        </div>

        <div className="border-t border-white/5 pt-4 space-y-3">
          <span className="block font-mono text-[9px] uppercase tracking-wider text-[#444444]">BOTTOM CTA BANNER</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CTA TITLE</label>
              <input
                type="text"
                value={pricingCtaTitle}
                onChange={(e) => setPricingCtaTitle(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                placeholder="e.g. Need a bespoke package?"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CTA BUTTON TEXT</label>
              <input
                type="text"
                value={pricingCtaBtn}
                onChange={(e) => setPricingCtaBtn(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                placeholder="e.g. START YOUR PROJECT"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CTA DESCRIPTION</label>
            <textarea
              value={pricingCtaDesc}
              onChange={(e) => setPricingCtaDesc(e.target.value)}
              rows={2}
              className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none"
              placeholder="CTA banner subtitle text"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={async () => {
              setPageSettingsSaving(true);
              setPageSettingsSaved(false);
              await savePricingPageSettings({
                sectionLabel: pricingSectionLabel,
                heading: pricingHeading,
                description: pricingDescription,
                ctaTitle: pricingCtaTitle,
                ctaDescription: pricingCtaDesc,
                ctaButtonText: pricingCtaBtn,
              });
              setPageSettingsSaving(false);
              setPageSettingsSaved(true);
              setTimeout(() => setPageSettingsSaved(false), 3000);
            }}
            disabled={pageSettingsSaving}
            className="px-6 py-2.5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {pageSettingsSaving ? 'SAVING...' : 'SAVE PAGE TEXT'}
          </button>
          {pageSettingsSaved && (
            <span className="font-mono text-[9px] text-green-400 uppercase tracking-widest">✓ SAVED</span>
          )}
        </div>
      </div>

    </div>
  );
}
