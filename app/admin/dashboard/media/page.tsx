'use client';

import React, { useState, useEffect } from 'react';
import { uploadMedia } from '@/app/actions/cms';
import { Upload, Copy, Check, Image as ImageIcon } from 'lucide-react';

export default function MediaLibraryPage() {
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Curated premium preset design assets (already styled in the project)
  const presets = [
    { name: 'Luxe Realty Estate', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' },
    { name: 'Interior Luxe', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { name: 'FitPulse PWA', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' },
    { name: 'Calmly Emblem', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    { name: 'SaaS NovaTech AI', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' },
    { name: 'Organic Zestora Brand', url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80' },
    { name: 'GreenCart Organic Shop', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' },
    { name: 'Crevo Studio Concrete', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80' },
    { name: 'SolarHive Array', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80' },
    { name: 'Typography Grid', url: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&h=400&q=80' }
  ];

  // List of uploaded assets
  const [uploadedAssets, setUploadedAssets] = useState<string[]>([]);

  useEffect(() => {
    // Load previously uploaded assets if saved in local storage to keep history in UI
    const saved = localStorage.getItem('vygrid_uploaded_media');
    if (saved) {
      try {
        setUploadedAssets(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result as string;
          const res = await uploadMedia(file.name, base64String);

          if (res.success && res.url) {
            setSuccessMsg(`File uploaded successfully: ${res.url}`);
            const newList = [res.url, ...uploadedAssets];
            setUploadedAssets(newList);
            localStorage.setItem('vygrid_uploaded_media', JSON.stringify(newList));
          } else {
            setErrorMsg(res.error || 'Failed to upload image.');
          }
        } catch (err: any) {
          console.error(err);
          setErrorMsg('An error occurred during file upload: ' + (err.message || err));
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setErrorMsg('An unexpected file-reading error occurred.');
      setUploading(false);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  const handleClearHistory = () => {
    if (confirm('Clear uploaded files list history from this browser layout? (Files remain on disk)')) {
      setUploadedAssets([]);
      localStorage.removeItem('vygrid_uploaded_media');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Media Library</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Upload local photographs or use design presets to link in project portfolios and blog bodies.
          </p>
        </div>
        <label className="flex items-center space-x-1.5 border border-[#C8B89A] text-[#0A0A0A] bg-[#C8B89A] hover:bg-[#F5F0EB] hover:border-[#F5F0EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest cursor-pointer transition-all">
          <Upload className="w-3.5 h-3.5" />
          <span>{uploading ? 'UPLOADING...' : 'UPLOAD IMAGE FILE'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {successMsg && (
        <div className="p-3 border border-green-500/20 bg-green-950/20 text-[#C8B89A] font-mono text-[10px] uppercase tracking-wider text-center">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
          {errorMsg}
        </div>
      )}

      {/* Uploaded Assets Module */}
      {uploadedAssets.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="font-mono text-[9px] tracking-widest text-[#444444] uppercase">
              LOCAL UPLOADED ASSETS
            </h3>
            <button 
              onClick={handleClearHistory}
              className="font-mono text-[8px] text-red-400 hover:text-red-300 uppercase bg-transparent border-0"
            >
              Clear List History
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {uploadedAssets.map((url, idx) => (
              <div 
                key={idx}
                className="border border-white/10 p-3 bg-[#111111]/40 flex flex-col justify-between space-y-3 relative group"
              >
                <div className="relative aspect-video w-full bg-[#0A0A0A] border border-white/5 overflow-hidden">
                  <img src={url} alt="Uploaded file" className="w-full h-full object-cover transition-all duration-300" />
                </div>
                <div className="flex justify-between items-center min-w-0">
                  <span className="font-mono text-[8px] text-[#888888] truncate max-w-[70%]">{url}</span>
                  <button
                    onClick={() => handleCopyLink(url)}
                    className="p-1 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]"
                    title="Copy URL link"
                  >
                    {copiedUrl === url ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preset Curation Assets Module */}
      <div className="space-y-4">
        <h3 className="font-mono text-[9px] tracking-widest text-[#444444] uppercase border-b border-white/5 pb-2">
          PRE-CURATED DESIGN PRESETS
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {presets.map((preset) => (
            <div 
              key={preset.name}
              className="border border-white/10 p-3 bg-[#111111]/40 flex flex-col justify-between space-y-3 relative group"
            >
              <div className="relative aspect-video w-full bg-[#0A0A0A] border border-white/5 overflow-hidden">
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover transition-all duration-300" />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-mono text-[9px] font-bold text-[#F5F0EB] truncate uppercase">{preset.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[7px] text-[#444444] truncate max-w-[70%]">{preset.url}</span>
                  <button
                    onClick={() => handleCopyLink(preset.url)}
                    className="p-1 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]"
                    title="Copy Preset URL link"
                  >
                    {copiedUrl === preset.url ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
