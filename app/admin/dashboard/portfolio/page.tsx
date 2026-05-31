'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { saveProject, deleteProject, updateProjectsOrder, fetchCMSData, uploadMedia } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Tag } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

function PortfolioManagerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);

  // Form Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<'Web Development' | 'Logo & Branding' | 'E-Commerce' | 'Brand Kits'>('Web Development');
  const [client, setClient] = useState('');
  const [timeline, setTimeline] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [uploadingShowcase, setUploadingShowcase] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Arrays
  const [tech, setTech] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState('');
  const [metrics, setMetrics] = useState<Array<{ label: string; value: string }>>([]);
  const [metricLabel, setMetricLabel] = useState('');
  const [metricValue, setMetricValue] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCMSData();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Check if the URL query wants us to immediately open the creation modal
    if (searchParams.get('action') === 'create') {
      // Clear query params to not re-open on refresh
      router.replace('/admin/dashboard/portfolio');
      handleOpenAdd();
    }
  }, [searchParams]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setProjectId(`project-${Date.now()}`);
    setTitle('');
    setSlug('');
    setSubtitle('');
    setCategory('Web Development');
    setClient('');
    setTimeline('');
    setDescription('');
    setProblem('');
    setSolution('');
    setThumbnail('');
    setProjectImage('');
    setTech([]);
    setTechInput('');
    setGallery([]);
    setGalleryInput('');
    setMetrics([]);
    setMetricLabel('');
    setMetricValue('');
    setModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setIsEditing(true);
    setProjectId(project.id);
    setTitle(project.title);
    setSlug(project.slug);
    setSubtitle(project.subtitle);
    setCategory(project.category || 'Web Development');
    setClient(project.client || '');
    setTimeline(project.timeline || '');
    setDescription(project.description || '');
    setProblem(project.problem || '');
    setSolution(project.solution || '');
    setThumbnail(project.thumbnail || '');
    setProjectImage(project.projectImage || '');
    setTech(project.tech || []);
    setTechInput('');
    setGallery(project.gallery || []);
    setGalleryInput('');
    setMetrics(project.metrics || []);
    setMetricLabel('');
    setMetricValue('');
    setModalOpen(true);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const list = [...projects];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setProjects(list);
    await updateProjectsOrder(list);
  };

  // Lists helpers
  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setTech([...tech, techInput.trim()]);
    setTechInput('');
  };
  const handleRemoveTech = (idx: number) => {
    setTech(tech.filter((_, i) => i !== idx));
  };

  const handleAddGallery = () => {
    if (!galleryInput.trim()) return;
    setGallery([...gallery, galleryInput.trim()]);
    setGalleryInput('');
  };
  const handleRemoveGallery = (idx: number) => {
    setGallery(gallery.filter((_, i) => i !== idx));
  };

  const handleAddMetric = () => {
    if (!metricLabel.trim() || !metricValue.trim()) return;
    setMetrics([...metrics, { label: metricLabel.trim(), value: metricValue.trim() }]);
    setMetricLabel('');
    setMetricValue('');
  };
  const handleRemoveMetric = (idx: number) => {
    setMetrics(metrics.filter((_, i) => i !== idx));
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumbnail(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const res = await uploadMedia(file.name, base64String);
        if (res.success && res.url) {
          setThumbnail(res.url);
        } else {
          alert('Upload failed: ' + res.error);
        }
        setUploadingThumbnail(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploadingThumbnail(false);
    }
  };

  const handleShowcaseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingShowcase(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const res = await uploadMedia(file.name, base64String);
        if (res.success && res.url) {
          setProjectImage(res.url);
        } else {
          alert('Upload failed: ' + res.error);
        }
        setUploadingShowcase(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploadingShowcase(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingGallery(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const res = await uploadMedia(file.name, base64String);
        if (res.success && res.url) {
          setGallery([...gallery, res.url]);
        } else {
          alert('Upload failed: ' + res.error);
        }
        setUploadingGallery(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploadingGallery(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) return;

    const payload = {
      id: projectId,
      title,
      slug,
      subtitle,
      category,
      client,
      timeline,
      description,
      problem,
      solution,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      projectImage: projectImage || undefined,
      tech,
      gallery,
      metrics
    };

    try {
      const res = await saveProject(payload);
      if (res.success) {
        setModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete case study "${name}"?`)) return;
    try {
      const res = await deleteProject(id);
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Portfolio Curation</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Build, edit, and sequence case study records displayed across the studio archives.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest bg-transparent transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW CASE STUDY</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            LOADING CASE ARCHIVES...
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 bg-[#111111]/20">
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            No projects registered in the portfolio database.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="border border-white/10 bg-[#111111]/40 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex items-center space-x-5 min-w-0">
                <div className="w-20 h-12 bg-[#1A1A1A] relative flex-shrink-0 border border-white/10">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale" 
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif italic text-lg text-[#F5F0EB] truncate">{project.title}</h3>
                    <span className="px-2 py-0.5 border border-white/10 bg-[#0A0A0A] font-mono text-[8px] text-[#888888] uppercase tracking-widest select-none">
                      {project.category}
                    </span>
                  </div>
                  <p className="font-grotesque text-xs text-[#888888] font-light truncate max-w-xl">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-end flex-shrink-0">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-2 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 disabled:hover:text-[#888888] disabled:hover:border-white/5 transition-all"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === projects.length - 1}
                    className="p-2 border border-white/5 bg-[#0A0A0A] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] disabled:opacity-30 disabled:hover:text-[#888888] disabled:hover:border-white/5 transition-all"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="flex items-center space-x-1 border border-white/10 hover:border-[#C8B89A] px-3.5 py-2 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                    <span>EDIT</span>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="flex items-center space-x-1 border border-white/10 hover:border-red-500/50 hover:text-red-400 px-3.5 py-2 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>DELETE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm flex justify-center items-center p-6 selection:bg-[#C8B89A]/30">
          <div className="w-full max-w-[840px] border border-white/10 bg-[#111111] p-8 space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-[#888888] hover:text-[#F5F0EB]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif italic text-2xl text-[#F5F0EB]">
              {isEditing ? 'Modify Case Study' : 'Create Case Study'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Title, Category, Slug */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">PROJECT TITLE</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. Luxe Realty Website"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">SLUG (PERMALINK)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono"
                    placeholder="luxe-realty-website"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Logo & Branding">Logo & Branding</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Brand Kits">Brand Kits</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Subtitle, Client, Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1 md:col-span-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">CLIENT NAME</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="Luxe Realty Group"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">TIMELINE / YEAR</label>
                  <input
                    type="text"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="3 Months (2025)"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">SUBTITLE SLOGAN</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="A video-rich high-end portal..."
                    required
                  />
                </div>
              </div>

              {/* Project description, challenge, solution */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">OVERVIEW DESCRIPTION</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none"
                    placeholder="Summarize the core case parameters..."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">THE CHALLENGE (PROBLEM STATEMENT)</label>
                    <textarea
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      rows={3}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                      placeholder="Identify original design and operational bottlenecks..."
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">THE SOLUTION (ENGINEERING CODES)</label>
                    <textarea
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      rows={3}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                      placeholder="Detail layout corrections, edge servers, or styling kits..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Media: Thumbnail, showcase image */}
              <div className="border-t border-white/5 pt-4 space-y-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#444444]">CASE MEDIA</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Thumbnail Image */}
                  <div className="space-y-2 border border-white/5 p-4 bg-[#0A0A0A]/40 rounded-sm">
                    <label className="block font-mono text-[8px] uppercase text-[#888888] tracking-wider">SPOTLIGHT THUMBNAIL</label>
                    <div className="flex items-center space-x-3">
                      {thumbnail ? (
                        <div className="w-12 h-12 border border-white/10 bg-[#0A0A0A] relative flex-shrink-0 overflow-hidden">
                          <img src={thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover grayscale" />
                          <button
                            type="button"
                            onClick={() => setThumbnail('')}
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
                          value={thumbnail}
                          onChange={(e) => setThumbnail(e.target.value)}
                          placeholder="Thumbnail URL link..."
                          className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-1.5 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono mb-2"
                        />
                        <label className="inline-block px-3 py-1 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[8px] uppercase tracking-widest bg-transparent cursor-pointer transition-colors">
                          {uploadingThumbnail ? 'UPLOADING...' : 'UPLOAD FILE'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            className="hidden"
                            disabled={uploadingThumbnail}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Project Showcase Image */}
                  <div className="space-y-2 border border-white/5 p-4 bg-[#0A0A0A]/40 rounded-sm">
                    <label className="block font-mono text-[8px] uppercase text-[#888888] tracking-wider">PROJECT SHOWCASE IMAGE</label>
                    <div className="flex items-center space-x-3">
                      {projectImage ? (
                        <div className="w-12 h-12 border border-white/10 bg-[#0A0A0A] relative flex-shrink-0 overflow-hidden">
                          <img src={projectImage} alt="Showcase Preview" className="w-full h-full object-cover grayscale" />
                          <button
                            type="button"
                            onClick={() => setProjectImage('')}
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
                          value={projectImage}
                          onChange={(e) => setProjectImage(e.target.value)}
                          placeholder="Showcase image URL..."
                          className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-1.5 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] font-mono mb-2"
                        />
                        <label className="inline-block px-3 py-1 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[8px] uppercase tracking-widest bg-transparent cursor-pointer transition-colors">
                          {uploadingShowcase ? 'UPLOADING...' : 'UPLOAD FILE'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleShowcaseUpload}
                            className="hidden"
                            disabled={uploadingShowcase}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lists and Parameters details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/5 pt-4">
                
                {/* Tech Stack */}
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">TECH INFRASTRUCTURE</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="flex-grow bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none"
                      placeholder="Next.js 14"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-3 border border-white/10 text-xs text-[#888888] hover:text-[#F5F0EB]"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {tech.map((t, idx) => (
                      <span key={idx} className="flex items-center space-x-1 px-2 py-0.5 border border-white/5 bg-[#0A0A0A] text-[9px] text-[#888888]">
                        <span>{t}</span>
                        <button type="button" onClick={() => handleRemoveTech(idx)} className="text-[#444444] hover:text-red-400">✕</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">ASSET GALLERY SHOTS</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={galleryInput}
                      onChange={(e) => setGalleryInput(e.target.value)}
                      className="flex-grow bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none"
                      placeholder="Image URL"
                    />
                    <button
                      type="button"
                      onClick={handleAddGallery}
                      className="px-3 border border-white/10 text-xs text-[#888888] hover:text-[#F5F0EB] font-bold"
                      title="Add URL link"
                    >
                      +
                    </button>
                  </div>
                  <label className="block w-full text-center py-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[9px] uppercase tracking-wider bg-transparent cursor-pointer transition-colors">
                    {uploadingGallery ? 'UPLOADING...' : 'UPLOAD NEW GALLERY IMAGE'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      className="hidden"
                      disabled={uploadingGallery}
                    />
                  </label>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {gallery.map((g, idx) => (
                      <span key={idx} className="flex items-center space-x-1 px-2 py-0.5 border border-white/5 bg-[#0A0A0A] text-[9px] text-[#888888] truncate max-w-[120px]">
                        <span>Image {idx+1}</span>
                        <button type="button" onClick={() => handleRemoveGallery(idx)} className="text-[#444444] hover:text-red-400">✕</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">DELIVERY METRICS</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={metricValue}
                      onChange={(e) => setMetricValue(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                      placeholder="value (+142%)"
                    />
                    <input
                      type="text"
                      value={metricLabel}
                      onChange={(e) => setMetricLabel(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                      placeholder="label (Leads)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMetric}
                    className="w-full py-1.5 border border-white/10 font-mono text-[9px] uppercase tracking-wider text-[#888888] hover:text-[#F5F0EB]"
                  >
                    ADD METRIC ROW
                  </button>
                  <div className="space-y-1 pt-1">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center px-2 py-1 border border-white/5 bg-[#0A0A0A] text-[9px] text-[#888888]">
                        <span className="font-bold">{m.value} - {m.label}</span>
                        <button type="button" onClick={() => handleRemoveMetric(idx)} className="text-[#444444] hover:text-red-400">✕</button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-white/5 flex justify-end space-x-2">
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

export default function PortfolioManagementPage() {
  return (
    <Suspense fallback={<div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">SYNCHRONIZING CASE STUDY REGISTRY...</div>}>
      <PortfolioManagerContent />
    </Suspense>
  );
}
