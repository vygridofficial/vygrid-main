'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import TextReveal from '@/components/ui/TextReveal';
import Link from 'next/link';
import { contactSchema, ContactFormData } from '@/lib/schemas';
import { submitContactBrief } from '@/app/actions/contact';

interface ContactClientProps {
  settings?: {
    email: string;
    phone: string;
    whatsapp: string;
    instagram: string;
    otherLinks?: Array<{ label: string; url: string }>;
  };
  companyName?: string;
}

export default function ContactClient({ settings, companyName }: ContactClientProps) {
  const displayCompanyName = companyName || "Vygrid Digital Studio";
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const response = await submitContactBrief(data);
      if (response.success) {
        setSubmitted(true);
        reset();
      } else {
        setSubmitError(response.error || "An unexpected error occurred.");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(errorMessage);
    }
  };

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-24 selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Button */}
        <div className="mb-8 pt-4 md:mb-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
          >
            <span>← BACK</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct info & links */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#888888] block uppercase">
                01 / INQUIRIES
              </span>
              <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F0EB] leading-none font-light">
                <TextReveal text="Let's Connect." />
              </h1>
              <p className="font-grotesque text-sm text-[#888888] font-light leading-relaxed max-w-md">
                Have a bold concept or complex systems engineering requirements? Get in touch. Our team reviews all client briefs within 24 hours.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs pt-4">
              <a
                href={`mailto:${settings?.email || 'hello@vygrid.studio'}`}
                className="block border border-white/10 p-5 bg-[#111111] hover:border-[#C8B89A] transition-all duration-300 group"
              >
                <span className="text-[#888888] text-[9px] tracking-widest block uppercase mb-1">EMAIL THE STUDIO</span>
                <span className="text-[#F5F0EB] group-hover:text-[#C8B89A] font-bold tracking-wider transition-colors break-all">{settings?.email || 'hello@vygrid.studio'}</span>
              </a>

              <a
                href={`tel:${settings?.phone || '+15550000000'}`}
                className="block border border-white/10 p-5 bg-[#111111] hover:border-[#C8B89A] transition-all duration-300 group"
              >
                <span className="text-[#888888] text-[9px] tracking-widest block uppercase mb-1">TELEPHONE CALL</span>
                <span className="text-[#F5F0EB] group-hover:text-[#C8B89A] font-bold tracking-wider transition-colors break-all">{settings?.phone || '+1 (555) 000-0000'}</span>
              </a>

              <a
                href={`https://wa.me/${settings?.whatsapp || '10000000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-white/10 p-5 bg-[#111111] hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <span className="text-[#888888] text-[9px] tracking-widest block uppercase mb-1">DIRECT WHATSAPP</span>
                <span className="text-[#F5F0EB] group-hover:text-emerald-400 font-bold tracking-wider transition-colors">CHAT VIA WHATSAPP →</span>
              </a>

              <a
                href={settings?.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-white/10 p-5 bg-[#111111] hover:border-[#C8B89A] transition-all duration-300 group"
              >
                <span className="text-[#888888] text-[9px] tracking-widest block uppercase mb-1">INSTAGRAM CHANNEL</span>
                <span className="text-[#F5F0EB] group-hover:text-[#C8B89A] font-bold tracking-wider transition-colors">VIEW INSTAGRAM PROFILE →</span>
              </a>

              {settings?.otherLinks && settings.otherLinks.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-white/10 p-5 bg-[#111111] hover:border-[#C8B89A] transition-all duration-300 group"
                >
                  <span className="text-[#888888] text-[9px] tracking-widest block uppercase mb-1">{link.label}</span>
                  <span className="text-[#F5F0EB] group-hover:text-[#C8B89A] font-bold tracking-wider transition-colors break-all">CONNECT ON {link.label.toUpperCase()} →</span>
                </a>
              ))}

              <Link
                href="/start-your-project"
                className="block border border-[#C8B89A]/30 p-5 bg-[#111111] hover:border-[#C8B89A] transition-all duration-300 group"
              >
                <span className="text-[#C8B89A] text-[9px] tracking-widest block uppercase mb-1">INTAKE FORM</span>
                <span className="text-[#F5F0EB] group-hover:text-[#C8B89A] font-bold tracking-wider transition-colors">START DEDICATED BRIEF →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
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
                      CONTACT TRANSMISSION PORTAL
                    </h3>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        {...register("fullName")}
                        placeholder=""
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
                          placeholder=""
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
                          placeholder=""
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

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] tracking-widest uppercase text-[#888888] block">
                        MESSAGE *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={6}
                        placeholder=""
                        className={`w-full px-4 py-3 border font-mono text-xs bg-[#0A0A0A] focus:outline-none transition-all duration-300 text-[#F5F0EB] placeholder-[#444444] ${
                          errors.message ? 'border-[#C8B89A] focus:ring-1 focus:ring-[#C8B89A]/30' : 'border-white/10 focus:border-[#C8B89A]'
                        }`}
                      />
                      {errors.message && (
                        <p className="flex items-center space-x-1.5 text-[10px] text-[#C8B89A] font-mono mt-1 select-none">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message.message?.toUpperCase()}</span>
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="border border-[#C8B89A]/30 bg-[#C8B89A]/5 p-4 flex items-start space-x-3 text-xs font-mono text-[#C8B89A] select-none">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed uppercase">{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="w-full py-4 bg-[#C8B89A] text-[#0A0A0A] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#F5F0EB] transition-colors duration-300 disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE →"}
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
                      Message Transmitted.
                    </h3>
                    
                    <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed max-w-sm mx-auto">
                      Thank you for contacting {displayCompanyName}. Our team has successfully logged your details and will coordinate a response within 24 hours.
                    </p>

                    <div className="pt-6 border-t border-white/5 w-full">
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2 border border-white/10 text-[#888888] hover:text-[#C8B89A] hover:border-[#C8B89A] text-xs font-bold tracking-widest uppercase transition-colors"
                      >
                        SUBMIT ANOTHER INQUIRY
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
