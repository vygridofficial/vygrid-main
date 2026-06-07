'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { saveBlogPost, deleteBlogPost, uploadMedia, fetchCMSData } from '@/app/actions/cms';
import { Plus, Edit2, Trash2, X, Eye, FileText, Image as ImageIcon, Link as LinkIcon, Bold, Italic, Heading3, Quote, List } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { compressImage } from '@/lib/image';

function BlogManagerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'Web Development' | 'UI/UX Design' | 'Technology Trends' | 'Digital Strategy'>('Web Development');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  
  // Editor State
  const [content, setContent] = useState('');
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCMSData();
      setPosts(data.blogPosts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (searchParams.get('action') === 'create') {
      router.replace('/admin/dashboard/blog');
      handleOpenAdd();
    }
  }, [searchParams]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setPostId(`blog-${Date.now()}`);
    setTitle('');
    setSlug('');
    setCategory('Web Development');
    setExcerpt('');
    
    // Default to today's date formatted nicely: "May 30, 2026"
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    setDate(new Date().toLocaleDateString('en-US', options));
    
    setThumbnail('');
    setContent('');
    setEditorMode('write');
    setModalOpen(true);
  };

  const handleOpenEdit = (post: any) => {
    setIsEditing(true);
    setPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category || 'Web Development');
    setExcerpt(post.excerpt || '');
    setDate(post.date || '');
    setThumbnail(post.thumbnail || '');
    setContent(post.content || '');
    setEditorMode('write');
    setModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  // Helper to insert markdown formatting at cursor position
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = prefix + selected + suffix;

    setContent(text.substring(0, start) + replacement + text.substring(end));
    
    // Focus and select the inserted formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // Handle direct file upload in text editor
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const base64String = await compressImage(file);
      const res = await uploadMedia(file.name, base64String);
      
      if (res.success && res.url) {
        // Insert image markdown at current cursor position
        insertFormatting(`![${file.name}](${res.url})`, '');
      } else {
        alert('Upload failed: ' + res.error);
      }
    } catch (err: any) {
      console.error(err);
      alert('An error occurred during file upload: ' + (err.message || err));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return;

    const payload = {
      id: postId,
      title,
      slug,
      category,
      excerpt,
      date,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&h=400&q=80',
      content
    };

    try {
      const res = await saveBlogPost(payload);
      if (res.success) {
        setModalOpen(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete journal article "${name}"?`)) return;
    try {
      const res = await deleteBlogPost(id);
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
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Journal Curation</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Publish articles, share development notes, and edit markdown content.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] px-4 py-2 font-mono text-[9px] uppercase tracking-widest bg-transparent transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>NEW ARTICLE</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            RETRIEVING JOURNAL ENTRIES...
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 bg-[#111111]/20">
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            No journal articles found in the database.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="border border-white/10 bg-[#111111]/40 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="relative aspect-video w-full bg-[#1A1A1A] border border-white/5 overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 font-mono text-[8px] text-[#C8B89A] uppercase tracking-wider">
                    <span>{post.category}</span>
                    <span>&middot;</span>
                    <span className="text-[#888888]">{post.date}</span>
                  </div>
                  <h3 className="font-serif italic text-lg text-[#F5F0EB] leading-tight line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 flex justify-end space-x-2">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="flex items-center space-x-1 border border-white/10 hover:border-[#C8B89A] px-3.5 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                  <span>EDIT</span>
                </button>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="flex items-center space-x-1 border border-white/10 hover:border-red-500/50 hover:text-red-400 px-3.5 py-1.5 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                  <span>DELETE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm flex justify-center items-center p-6 selection:bg-[#C8B89A]/30">
          <div className="w-full max-w-[960px] border border-white/10 bg-[#111111] p-8 space-y-6 relative max-h-[95vh] overflow-y-auto scrollbar-thin flex flex-col">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-[#888888] hover:text-[#F5F0EB]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif italic text-2xl text-[#F5F0EB] flex-shrink-0">
              {isEditing ? 'Edit Journal Article' : 'Write Journal Article'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col min-h-0">
              
              {/* Row 1: Title, Category, Slug */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-shrink-0">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">ARTICLE TITLE</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A]"
                    placeholder="e.g. The Mathematics of Typography"
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
                    placeholder="mathematics-of-typography"
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
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Technology Trends">Technology Trends</option>
                    <option value="Digital Strategy">Digital Strategy</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Date, Excerpt, Thumbnail */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-shrink-0">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">DATE DISPLAYED</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                    placeholder="May 28, 2026"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">SPOTLIGHT THUMBNAIL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={thumbnail}
                      onChange={(e) => setThumbnail(e.target.value)}
                      className="flex-1 bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] font-mono min-w-0"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label
                      className={`flex items-center gap-1 border px-3 py-2 font-mono text-[9px] uppercase tracking-wider cursor-pointer transition-all whitespace-nowrap ${
                        uploadingThumbnail
                          ? 'border-[#C8B89A]/30 text-[#C8B89A]/50 cursor-not-allowed'
                          : 'border-white/10 hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]'
                      }`}
                      title="Upload thumbnail image"
                    >
                      <ImageIcon className="w-3 h-3 flex-shrink-0" />
                      {uploadingThumbnail ? (
                        <span className="animate-pulse">UPLOADING...</span>
                      ) : (
                        <span>UPLOAD</span>
                      )}
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingThumbnail}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingThumbnail(true);
                          try {
                            const base64String = await compressImage(file);
                            const res = await uploadMedia(file.name, base64String);
                            if (res.success && res.url) {
                              setThumbnail(res.url);
                            } else {
                              alert('Upload failed: ' + res.error);
                            }
                          } catch (err: any) {
                            console.error(err);
                            alert('An error occurred during upload: ' + (err.message || err));
                          } finally {
                            setUploadingThumbnail(false);
                            if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
                          }
                        }}
                      />
                    </label>
                  </div>
                  {thumbnail && (
                    <div className="relative mt-2 aspect-video w-full max-w-[180px] bg-[#0A0A0A] border border-white/10 overflow-hidden">
                      <img
                        src={thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">EXCERPT SNIPPET</label>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB]"
                    placeholder="Brief description of the article..."
                    required
                  />
                </div>
              </div>

              {/* MARKDOWN RICH TEXT EDITOR BLOCK */}
              <div className="border border-white/10 flex-grow flex flex-col min-h-[300px]">
                
                {/* Editor Tabs & Toolbar Shortcuts */}
                <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#0E0E0E] p-2">
                  <div className="flex border border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditorMode('write')}
                      className={`flex items-center space-x-1.5 px-4 py-2 font-mono text-[8px] uppercase tracking-widest ${
                        editorMode === 'write' ? 'bg-[#1A1A1A] text-[#C8B89A]' : 'text-[#888888] hover:text-[#F5F0EB]'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>WRITE</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode('preview')}
                      className={`flex items-center space-x-1.5 px-4 py-2 font-mono text-[8px] uppercase tracking-widest ${
                        editorMode === 'preview' ? 'bg-[#1A1A1A] text-[#C8B89A]' : 'text-[#888888] hover:text-[#F5F0EB]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>PREVIEW</span>
                    </button>
                  </div>

                  {editorMode === 'write' && (
                    <div className="flex flex-wrap items-center gap-1 mt-2 sm:mt-0">
                      <button type="button" onClick={() => insertFormatting('**', '**')} className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => insertFormatting('*', '*')} className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]" title="Italic"><Italic className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => insertFormatting('### ', '')} className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]" title="Heading"><Heading3 className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => insertFormatting('> ', '')} className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]" title="Quote"><Quote className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => insertFormatting('- ', '')} className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]" title="Bullet List"><List className="w-3.5 h-3.5" /></button>
                      <button type="button" onClick={() => insertFormatting('[Link Label](', ')')} className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A]" title="Link"><LinkIcon className="w-3.5 h-3.5" /></button>
                      
                      {/* Upload Media direct button integration */}
                      <label className="p-1.5 border border-white/5 bg-[#111111] hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] cursor-pointer flex items-center justify-center" title="Insert Image File">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      {uploadingImage && <span className="font-mono text-[7px] text-[#C8B89A] animate-pulse uppercase ml-2">UPLOADING...</span>}
                    </div>
                  )}
                </div>

                {/* Workspace area */}
                <div className="flex-grow flex flex-col relative bg-[#0A0A0A]">
                  {editorMode === 'write' ? (
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full flex-grow bg-transparent border-0 p-4 font-mono text-xs text-[#F5F0EB] placeholder:text-[#444444] focus:outline-none resize-none min-h-[250px]"
                      placeholder="Narrate your article details in Markdown formatting here..."
                      required
                    />
                  ) : (
                    <div className="w-full flex-grow p-6 overflow-y-auto max-h-[350px] font-grotesque text-sm text-[#888888] font-light leading-relaxed space-y-4">
                      {content ? (
                        content.split('\n\n').map((para, i) => {
                          if (para.startsWith('### ')) {
                            return <h4 key={i} className="font-serif italic text-xl text-[#F5F0EB] mt-4">{para.replace('### ', '')}</h4>;
                          }
                          if (para.startsWith('> ')) {
                            return <blockquote key={i} className="font-serif italic text-base text-[#F5F0EB] border-l border-[#C8B89A] pl-4 my-4">{para.replace('> ', '')}</blockquote>;
                          }
                          if (para.startsWith('![') && para.includes('](')) {
                            // Extract url
                            const match = para.match(/!\[.*?\]\((.*?)\)/);
                            const url = match ? match[1] : '';
                            return url ? <img key={i} src={url} alt="Uploaded Image" className="max-w-full h-auto border border-white/10 max-h-56 object-cover my-4" /> : null;
                          }
                          return <p key={i}>{para}</p>;
                        })
                      ) : (
                        <p className="font-mono text-[10px] text-[#444444] uppercase tracking-wider text-center py-12">No content written yet.</p>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Submit panel */}
              <div className="pt-4 border-t border-white/5 flex justify-end space-x-2 flex-shrink-0">
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
                  {isEditing ? 'SAVE CHANGES' : 'SAVE ARTICLE'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function BlogManagementPage() {
  return (
    <Suspense fallback={<div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">SYNCHRONIZING JOURNAL DATABASE...</div>}>
      <BlogManagerContent />
    </Suspense>
  );
}
