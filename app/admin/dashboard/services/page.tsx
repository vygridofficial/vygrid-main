'use client';

import React, { useEffect, useState } from 'react';
import { fetchCMSData, saveService, deleteService, updateServicesOrder, uploadMedia } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Globe, ShoppingBag, LayoutDashboard, Zap, FolderEdit, ShieldCheck, Compass, Layers, Mail, Share2, RefreshCw, Presentation } from 'lucide-react';
import { compressImage } from '@/lib/image';

const ICON_COMPONENTS: Record<string, any> = {
  Globe, ShoppingBag, LayoutDashboard, Zap, FolderEdit, ShieldCheck,
  Compass, Layers, Mail, Share2, RefreshCw, Presentation
};

export default function ServicesManagementPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'web' | 'brand'>('web');
  const [services, setServices] = useState<any[]>([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitleId, setEditingTitleId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Globe');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCMSData();
      if (activeTab === 'web') {
        setServices(data.webServices || []);
      } else {
        setServices(data.brandServices || []);
      }
    } catch (err) {
      console.error("Error loading services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const list = [...services];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    // Swap elements
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setServices(list);
    await updateServicesOrder(list, activeTab === 'web');
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingTitleId('');
    setTitle('');
    setDescription('');
    setIconName(activeTab === 'web' ? 'Globe' : 'Compass');
    setImageUrl('');
    setFeatures([]);
    setFeatureInput('');
    setModalOpen(true);
  };

  const handleOpenEdit = (service: any) => {
    setIsEditing(true);
    setEditingTitleId(service.title);
    setTitle(service.title);
    setDescription(service.description);
    setIconName(service.iconName || 'Globe');
    setImageUrl(service.imageUrl || '');
    setFeatures(service.features || []);
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
    if (!title || !description) return;

    const payload = {
      title,
      description,
      iconName,
      imageUrl,
      features
    };

    try {
      if (isEditing && editingTitleId && editingTitleId !== title) {
        // Remove old title from DB if edited
        await deleteService(editingTitleId, activeTab === 'web');
      }
      
      const res = await saveService(payload, activeTab === 'web');
      if (res.success) {
        setModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (titleStr: string) => {
    if (!confirm(`Are you sure you want to delete service "${titleStr}"?`)) return;
    try {
      const res = await deleteService(titleStr, activeTab === 'web');
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderIcon = (name: string) => {
    const IconComponent = ICON_COMPONENTS[name];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-[#C8B89A]" />;
    }
    return <Globe className="w-5 h-5 text-[#C8B89A]" />;
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Services Curation</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Build and order service listings showing capability matrices.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest bg-transparent transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW SERVICE</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 font-mono text-[10px] tracking-widest uppercase">
        <button
          onClick={() => setActiveTab('web')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'web'
              ? 'border-[#C8B89A] text-[#C8B89A] font-bold bg-[#111111]/30'
              : 'border-transparent text-[#888888] hover:text-[#F5F0EB]'
          }`}
        >
          WEB ENGINEERING
        </button>
        <button
          onClick={() => setActiveTab('brand')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'brand'
              ? 'border-[#C8B89A] text-[#C8B89A] font-bold bg-[#111111]/30'
              : 'border-transparent text-[#888888] hover:text-[#F5F0EB]'
          }`}
        >
          BRAND CURATION
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            LOADING SERVICE CARDS...
          </div>
        </div>
      ) : services.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 bg-[#111111]/20">
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            No services registered in this segment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="border border-white/10 bg-[#111111]/40 p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 w-11 h-11 bg-[#0A0A0A] border border-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {service.imageUrl ? (
                        <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                      ) : (
                        renderIcon(service.iconName)
                      )}
                    </div>
                    <h3 className="font-serif italic text-lg text-[#F5F0EB]">{service.title}</h3>
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
                      disabled={index === services.length - 1}
                      className="p-1.5 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 disabled:hover:text-[#888888] disabled:hover:border-white/5 transition-all"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <span className="block font-mono text-[8px] uppercase tracking-wider text-[#444444]">
                    CAPABILITY SPEC
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(service.features || []).map((feat: string) => (
                      <span key={feat} className="px-2.5 py-1 border border-white/5 bg-[#0A0A0A] text-[9px] text-[#888888] select-none">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="flex items-center space-x-1 border border-white/10 hover:border-[#C8B89A] px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                  <span>EDIT</span>
                </button>
                <button
                  onClick={() => handleDelete(service.title)}
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
              {isEditing ? 'Modify Service Card' : 'Add Service Card'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">SERVICE TITLE</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Custom Websites"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">VECTOR ICON</label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  >
                    {activeTab === 'web' ? (
                      <>
                        <option value="Globe">Globe</option>
                        <option value="ShoppingBag">ShoppingBag</option>
                        <option value="LayoutDashboard">LayoutDashboard</option>
                        <option value="Zap">Zap</option>
                        <option value="FolderEdit">FolderEdit</option>
                        <option value="ShieldCheck">ShieldCheck</option>
                      </>
                    ) : (
                      <>
                        <option value="Compass">Compass</option>
                        <option value="Layers">Layers</option>
                        <option value="Mail">Mail</option>
                        <option value="Share2">Share2</option>
                        <option value="RefreshCw">RefreshCw</option>
                        <option value="Presentation">Presentation</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* IMAGE UPLOAD OPTION */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">
                  SERVICE CARD IMAGE (OPTIONAL OVERRIDE FOR ICON)
                </label>
                <div className="flex items-center space-x-4">
                  {imageUrl ? (
                    <div className="w-12 h-12 border border-white/10 bg-[#0A0A0A] relative flex-shrink-0 overflow-hidden">
                      <img src={imageUrl} alt="Uploaded Service Image" className="w-full h-full object-cover" />
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
                    <div className="w-12 h-12 border border-dashed border-white/10 bg-[#0A0A0A]/50 flex items-center justify-center text-[9px] text-[#444444] font-mono flex-shrink-0">
                      NO IMG
                    </div>
                  )}
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or enter image URL link directly..."
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono mb-2"
                    />
                    <label className="inline-block px-3 py-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[8px] uppercase tracking-widest bg-transparent cursor-pointer transition-colors">
                      {uploading ? 'UPLOADING...' : 'UPLOAD FILE'}
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

              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">EXECUTIVE DESCRIPTION</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none"
                  placeholder="Summarize the value and execution process..."
                  required
                />
              </div>

              {/* Capabilities Manager */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CAPABILITIES / FEATURES</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-grow bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Page speed optimization"
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
