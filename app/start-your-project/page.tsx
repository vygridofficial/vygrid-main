'use client';

import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TextReveal from '@/components/ui/TextReveal';

// Intake validation schema
const intakeSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company Name is required"),
  projectType: z.enum(["Web Design", "Web Development", "Branding", "Systems Engineering", "Other"]),
  budget: z.string().min(1, "Budget Range is required"),
  timeline: z.enum(["ASAP", "1–3 months", "3–6 months", "6+ months"]),
  description: z.string().min(10, "Project description must be at least 10 characters"),
  source: z.string().optional(),
});

type IntakeFormData = z.infer<typeof intakeSchema>;

export default function StartProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <StartProjectPageContent />
    </Suspense>
  );
}

function StartProjectPageContent() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Read preset values from URL query string if navigated from pricing card
  const presetPackage = searchParams.get('package') || '';
  const presetType = searchParams.get('type') || 'Web Development';
  
  // Default values
  const defaultProjectType = presetType === 'Branding' ? 'Branding' : 'Web Development';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      projectType: defaultProjectType as "Web Development" | "Branding",
      budget: presetPackage ? `Selected Plan: ${presetPackage}` : '',
      timeline: '1–3 months',
      description: '',
      source: '',
    },
  });

  const onSubmit = async (_data: IntakeFormData) => {
    setSubmitError(null);
    try {
      // Simulate API submit (Server Actions or direct endpoint submission)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-24 min-h-screen selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <div className="mb-8 pt-4 md:mb-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
          >
            <span>← BACK TO HOME</span>
          </Link>
        </div>

        {/* Hero Header */}
        <header className="space-y-6 mb-12 md:mb-16">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#C8B89A] block uppercase">
            06 / PROJECT INTAKE FORM
          </span>
          <h1 className="font-serif italic text-4xl sm:text-6xl tracking-tight text-[#F5F0EB] leading-none font-light">
            <TextReveal text="Let's Build Something Remarkable." />
          </h1>
          <p className="font-grotesque text-sm sm:text-base text-[#888888] font-light leading-relaxed max-w-xl">
            Tell us about your project, system parameters, or brand objectives. Our senior team reviews all intake briefs within 24 hours.
          </p>
        </header>

        {/* intake form box */}
        <div className="border border-white/10 bg-[#111111]/30 p-8 sm:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="intake-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
                    TECHNICAL BRIEFING DATA
                  </h3>
                </div>

                {submitError && (
                  <div className="border border-red-500/20 bg-red-500/5 p-4 flex items-center space-x-3 text-red-400 font-mono text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="ALEX STERLING"
                      className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                        errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-[#C8B89A]'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="font-mono text-[9px] text-red-400 block">{errors.fullName.message}</span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="HELLO@STUDIO.COM"
                      className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#C8B89A]'
                      }`}
                    />
                    {errors.email && (
                      <span className="font-mono text-[9px] text-red-400 block">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company / Organisation */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                      COMPANY / ORGANISATION *
                    </label>
                    <input
                      type="text"
                      {...register("company")}
                      placeholder="VYGRID SYSTEMS"
                      className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                        errors.company ? 'border-red-500' : 'border-white/10 focus:border-[#C8B89A]'
                      }`}
                    />
                    {errors.company && (
                      <span className="font-mono text-[9px] text-red-400 block">{errors.company.message}</span>
                    )}
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                      PROJECT TYPE *
                    </label>
                    <select
                      {...register("projectType")}
                      className="w-full px-4 py-3 border border-white/10 font-mono text-xs bg-[#0a0a0a] focus:outline-none text-[#F5F0EB] transition-colors focus:border-[#C8B89A]"
                    >
                      <option value="Web Design">Web Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Branding">Branding</option>
                      <option value="Systems Engineering">Systems Engineering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                      BUDGET RANGE *
                    </label>
                    <select
                      {...register("budget")}
                      className={`w-full px-4 py-3 border font-mono text-xs bg-[#0a0a0a] focus:outline-none text-[#F5F0EB] transition-colors focus:border-[#C8B89A] ${
                        errors.budget ? 'border-red-500' : 'border-white/10'
                      }`}
                    >
                      <option value="">SELECT RANGE</option>
                      <option value="<$5,000">Below $5,000</option>
                      <option value="$5,000–$10,000">$5,000 – $10,000</option>
                      <option value="$10,000–$25,000">$10,000 – $25,000</option>
                      <option value="$25,000+">$25,000 +</option>
                      {presetPackage && (
                        <option value={`Selected Plan: ${presetPackage}`}>Selected: {presetPackage}</option>
                      )}
                    </select>
                    {errors.budget && (
                      <span className="font-mono text-[9px] text-red-400 block">{errors.budget.message}</span>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                      PROJECT TIMELINE *
                    </label>
                    <select
                      {...register("timeline")}
                      className="w-full px-4 py-3 border border-white/10 font-mono text-xs bg-[#0a0a0a] focus:outline-none text-[#F5F0EB] transition-colors focus:border-[#C8B89A]"
                    >
                      <option value="ASAP">ASAP</option>
                      <option value="1–3 months">1 – 3 Months</option>
                      <option value="3–6 months">3 – 6 Months</option>
                      <option value="6+ months">6+ Months</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                    PROJECT DESCRIPTION *
                  </label>
                  <textarea
                    {...register("description")}
                    rows={6}
                    placeholder="DESCRIBE YOUR ARCHITECTURAL GOALS, CRITICAL LAUNCH BENCHMARKS, OR SYSTEM CAPABILITIES..."
                    className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] resize-none ${
                      errors.description ? 'border-red-500' : 'border-white/10 focus:border-[#C8B89A]'
                    }`}
                  />
                  {errors.description && (
                    <span className="font-mono text-[9px] text-red-400 block">{errors.description.message}</span>
                  )}
                </div>

                {/* Referral Source */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                    HOW DID YOU HEAR ABOUT US? (OPTIONAL)
                  </label>
                  <select
                    {...register("source")}
                    className="w-full px-4 py-3 border border-white/10 font-mono text-xs bg-[#0a0a0a] focus:outline-none text-[#F5F0EB] transition-colors focus:border-[#C8B89A]"
                  >
                    <option value="">SELECT SOURCE</option>
                    <option value="Search Engine">Google / Search Engine</option>
                    <option value="Social Media">LinkedIn / Instagram</option>
                    <option value="Word of Mouth">Word of Mouth / Referral</option>
                    <option value="Press">Press Article / Editorial</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Submit Block */}
                <div className="pt-6 border-t border-white/5 space-y-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#C8B89A] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#F5F0EB] hover:text-[#0A0A0A] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "PROCESSING BRIEF..." : "SUBMIT INTAKE BRIEF →"}
                  </button>

                  {/* Trust Signals */}
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-4 text-center py-2 text-[#888888] font-mono text-[9px] tracking-widest uppercase">
                    <span className="flex items-center space-x-1.5">
                      <span className="text-[#C8B89A]">&bull;</span>
                      <span>RESPONSE WITHIN 24 HOURS</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="text-[#C8B89A]">&bull;</span>
                      <span>NO COMMITMENT REQUIRED</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="text-[#C8B89A]">&bull;</span>
                      <span>REVIEWED BY OUR SENIOR TEAM</span>
                    </span>
                  </div>

                </div>

              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                className="py-16 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
              >
                <CheckCircle className="w-16 h-16 text-[#C8B89A]" />
                <div className="space-y-2">
                  <h3 className="font-serif italic text-3xl text-[#F5F0EB]">Briefing Staged.</h3>
                  <p className="font-grotesque text-sm text-[#888888] font-light max-w-sm mx-auto leading-relaxed">
                    Thank you. Your custom digital briefing has been successfully compiled. Our directors will review your parameters and coordinate a strategy within 24 hours.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href="/"
                    className="px-6 py-3 border border-white/10 hover:border-[#C8B89A] text-[#F5F0EB] hover:text-[#C8B89A] font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                  >
                    RETURN TO HOME
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
