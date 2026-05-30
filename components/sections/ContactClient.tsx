'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import TextReveal from '@/components/ui/TextReveal';

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\+?[0-9\s\-()]{7,15}$/, "Please enter a valid phone number.").optional().or(z.literal('')),
  service: z.string().min(1, "Please select a strategic service."),
  brief: z.string().min(10, "Your project brief must be at least 10 characters."),
  budget: z.number().min(1000, "Budget must be at least $1,000."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      service: '',
      brief: '',
      budget: 5000,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Contact form payload successfully validated:", data);
    setSubmitted(true);
    reset();
  };

  const servicesList = [
    { label: "Custom Web Development", value: "Web Development" },
    { label: "Logo & Brand Identity", value: "Logo & Branding" },
    { label: "E-Commerce System", value: "E-Commerce" },
    { label: "Complete Brand Kit", value: "Brand Kits" }
  ];

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-24 selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct info & links */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#888888] block uppercase">
                01 / INQUIRIES
              </span>
              <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F0EB] leading-none font-light">
                <TextReveal text="Let's Build Your Legacy." />
              </h1>
              <p className="font-grotesque text-sm text-[#888888] font-light leading-relaxed max-w-md">
                Have a bold concept or complex systems engineering requirements? Get in touch. Our founding directors review all client brief parameters within 24 hours.
              </p>
            </div>

            <div className="inline-flex items-center space-x-2 border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 font-mono text-[9px] tracking-wider text-emerald-400 select-none">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>ACTIVE BOOKINGS OPEN FOR Q2 2026</span>
            </div>

            <div className="space-y-4 font-mono text-xs pt-4">
              <a
                href="mailto:hello@vygrid.studio"
                className="block border border-white/10 p-5 bg-[#111111] hover:border-[#C8B89A] transition-all duration-300 group"
              >
                <span className="text-[#888888] text-[9px] tracking-widest block uppercase mb-1">EMAIL THE STUDIO</span>
                <span className="text-[#F5F0EB] group-hover:text-[#C8B89A] font-bold tracking-wider transition-colors">hello@vygrid.studio</span>
              </a>

              <a
                href="https://wa.me/10000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-white/10 p-5 bg-[#111111] hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <span className="text-[#888888] text-[9px] tracking-widest block uppercase mb-1">DIRECT TELEPHONY</span>
                <span className="text-[#F5F0EB] group-hover:text-emerald-400 font-bold tracking-wider transition-colors">CHAT VIA WHATSAPP →</span>
              </a>
            </div>

            <div className="border border-white/10 bg-[#111111] p-6 space-y-3 font-mono text-xs select-none">
              <span className="text-[#888888] text-[9px] tracking-widest block uppercase">STUDIO COORDINATES</span>
              <span className="text-[#F5F0EB] font-bold block">5TH AVE, MANHATTAN, NY</span>
              <span className="text-[#888888] text-[10px] block leading-relaxed font-light">
                Engineering digital pipelines and bespoke logo monograms for international markets.
              </span>
            </div>
          </div>

          {/* Right Column: Briefing Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-[#111111] p-8 sm:p-12 relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase border-b border-white/5 pb-4">
                      PROJECT BRIEFING ARCHIVE
                    </h3>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        {...register("fullName")}
                        placeholder="ALEX STERLING"
                        className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                          errors.fullName ? 'border-[#C8B89A] focus:ring-1 focus:ring-[#C8B89A]/30' : 'border-white/10 focus:border-[#C8B89A]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="flex items-center space-x-1.5 text-[10px] text-[#C8B89A] font-mono mt-1 select-none">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName.message?.toUpperCase()}</span>
                        </p>
                      )}
                    </div>

                    {/* Contact details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          placeholder="ALEX@VYGRID.STUDIO"
                          className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                            errors.email ? 'border-[#C8B89A] focus:ring-1 focus:ring-[#C8B89A]/30' : 'border-white/10 focus:border-[#C8B89A]'
                          }`}
                        />
                        {errors.email && (
                          <p className="flex items-center space-x-1.5 text-[10px] text-[#C8B89A] font-mono mt-1 select-none">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.email.message?.toUpperCase()}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                          PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          {...register("phone")}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                            errors.phone ? 'border-[#C8B89A] focus:ring-1 focus:ring-[#C8B89A]/30' : 'border-white/10 focus:border-[#C8B89A]'
                          }`}
                        />
                        {errors.phone && (
                          <p className="flex items-center space-x-1.5 text-[10px] text-[#C8B89A] font-mono mt-1 select-none">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.phone.message?.toUpperCase()}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                        STRATEGIC SERVICE *
                      </label>
                      <select
                        {...register("service")}
                        className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] ${
                          errors.service ? 'border-[#C8B89A]' : 'border-white/10 focus:border-[#C8B89A]'
                        }`}
                      >
                        <option value="" className="bg-[#111111]">SELECT CAPABILITY...</option>
                        {servicesList.map((s) => (
                          <option key={s.value} value={s.value} className="bg-[#111111]">{s.label.toUpperCase()}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="flex items-center space-x-1.5 text-[10px] text-[#C8B89A] font-mono mt-1 select-none">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.service.message?.toUpperCase()}</span>
                        </p>
                      )}
                    </div>

                    {/* Budget slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center font-mono">
                        <label className="text-[9px] tracking-widest uppercase text-[#888888] block">
                          PROJECT BUDGET *
                        </label>
                        <Controller
                          name="budget"
                          control={control}
                          render={({ field }) => (
                            <span className="text-sm font-bold text-[#C8B89A] select-none">
                              {field.value === 50000 ? "$50,000+" : `$${field.value.toLocaleString()}`}
                            </span>
                          )}
                        />
                      </div>
                      <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="1000"
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-full h-[2px] bg-white/10 appearance-none cursor-pointer accent-[#C8B89A] focus:outline-none"
                          />
                        )}
                      />
                      <div className="flex justify-between text-[8px] font-mono text-[#888888] uppercase tracking-wider select-none">
                        <span>$1,000</span>
                        <span>$25,000</span>
                        <span>$50,000+</span>
                      </div>
                    </div>

                    {/* Brief */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                        PROJECT BRIEF *
                      </label>
                      <textarea
                        {...register("brief")}
                        rows={4}
                        placeholder="DESCRIBE SYSTEMS OBJECTIVES, PIPELINE TIMELINES, AND DESIGN INSPIRATION..."
                        className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                          errors.brief ? 'border-[#C8B89A] focus:ring-1 focus:ring-[#C8B89A]/30' : 'border-white/10 focus:border-[#C8B89A]'
                        }`}
                      />
                      {errors.brief && (
                        <p className="flex items-center space-x-1.5 text-[10px] text-[#C8B89A] font-mono mt-1 select-none">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.brief.message?.toUpperCase()}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="w-full py-4 bg-[#C8B89A] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#F5F0EB] transition-colors duration-300 disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "TRANSMITTING PARAMETERS..." : "SEND BRIEFING →"}
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="success-box"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 flex flex-col items-center space-y-6 font-mono"
                  >
                    <div className="w-16 h-16 border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    
                    <h3 className="font-serif italic text-2xl text-[#F5F0EB] tracking-tight">
                      Briefing Transmitted Successfully.
                    </h3>
                    
                    <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed max-w-sm mx-auto">
                      Thank you for contacting Vygrid Digital Studio. Our directors have logged your parameters and will verify all details within 24 hours. We look forward to executing your project.
                    </p>

                    <div className="pt-6 border-t border-white/5 w-full">
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2 border border-white/10 text-[#888888] hover:text-[#C8B89A] hover:border-[#C8B89A] text-xs font-bold tracking-widest uppercase transition-colors"
                      >
                        SUBMIT ANOTHER BRIEF
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
