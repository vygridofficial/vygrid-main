'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitClientReview, uploadMedia } from '@/app/actions/cms';
import { Star, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { compressImage } from '@/lib/image';

export default function SubmitReviewPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [stars, setStars] = useState(5);
  const [avatar, setAvatar] = useState('');
  const [comment, setComment] = useState('');

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const base64 = await compressImage(file);
      const res = await uploadMedia(file.name, base64);
      if (res.success && res.url) {
        setAvatar(res.url);
      } else {
        setError(res.error || 'Failed to upload photo.');
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred during file upload: ' + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !company || !comment) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        name,
        role,
        company,
        stars,
        avatar, // Left completely empty if they didn't upload any
        comment,
      };

      const res = await submitClientReview(payload);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError('Failed to record your feedback. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-16 px-6 relative selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Background ambient blurs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#C8B89A]/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#C8B89A]/2 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[580px] border border-white/10 bg-[#111111]/80 backdrop-blur-md p-8 md:p-12 space-y-8 relative rounded-sm">
        
        {/* Back navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 font-mono text-[9px] uppercase tracking-wider text-[#888888] hover:text-[#C8B89A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO STUDIO</span>
        </Link>

        {submitted ? (
          <div className="text-center space-y-6 py-8 animate-fadeIn">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-[#C8B89A] stroke-[1]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif italic text-3xl text-[#F5F0EB]">Feedback Transmitted</h3>
              <p className="font-grotesque text-xs text-[#888888] font-light max-w-sm mx-auto leading-relaxed uppercase tracking-wider">
                Thank you. Your review request has been recorded. It is currently queued for admin moderation and will appear on the portal once approved.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-block bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 transition-colors duration-300"
              >
                RETURN HOME
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Client Feedback</h2>
              <p className="font-grotesque text-xs text-[#888888] font-light max-w-md">
                We value your collaboration and results. Submit your review details below to be showcased on our testimonials registry.
              </p>
            </div>

            {error && (
              <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] uppercase tracking-wider text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">YOUR FULL NAME *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                    placeholder="e.g. Genevieve Thorne"
                    required
                    disabled={loading || uploading}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">RATING (1 TO 5 STARS) *</label>
                  <select
                    value={stars}
                    onChange={(e) => setStars(Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                    disabled={loading || uploading}
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
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">DESIGNATION / ROLE *</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                    placeholder="e.g. Managing Director"
                    required
                    disabled={loading || uploading}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">COMPANY NAME *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] transition-colors"
                    placeholder="e.g. Luxe Realty Group"
                    required
                    disabled={loading || uploading}
                  />
                </div>
              </div>

              <div className="space-y-2 border border-white/5 p-4 bg-[#0A0A0A]/40 rounded-sm">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">AVATAR PROFILE IMAGE (OPTIONAL)</label>
                <div className="flex items-center space-x-4">
                  {avatar ? (
                    <div className="w-12 h-12 border border-white/10 relative overflow-hidden flex-shrink-0">
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
                    <label className="inline-block px-4 py-2 border border-[#C8B89A]/30 hover:border-[#C8B89A] text-[#C8B89A] hover:text-[#F5F0EB] font-mono text-[9px] uppercase tracking-widest bg-transparent cursor-pointer transition-colors">
                      {uploading ? 'UPLOADING...' : 'UPLOAD PHOTO'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={loading || uploading}
                      />
                    </label>
                    <p className="text-[8px] text-[#444444] font-mono uppercase mt-1 tracking-wider">
                      JPG, PNG, OR WEBP. MAX 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[9px] uppercase tracking-wider text-[#888888]">COMMENTS & FEEDBACK *</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-[#F5F0EB] focus:outline-none focus:border-[#C8B89A] resize-none transition-colors"
                  placeholder="Tell us about your experience collaborating with Vygrid Digital Studio..."
                  required
                  disabled={loading || uploading}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] font-mono text-[9px] font-bold tracking-[0.2em] uppercase py-4 transition-colors duration-300 disabled:opacity-50"
                  disabled={loading || uploading}
                >
                  {loading ? 'SUBMITTING FEEDBACK...' : 'SUBMIT TESTIMONIAL →'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
