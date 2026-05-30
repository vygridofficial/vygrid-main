'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA() {
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'Hello. I am the Vygrid AI Architect. How can I guide you today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const presetReplies: Record<string, string> = {
    "What core tech stack do you use?": "We strictly engineer custom solutions using Next.js App Router, TypeScript, Supabase, Tailwind CSS, and Framer Motion. Purely bespoke.",
    "What are your pricing packages?": "Bespoke projects start at $5,000 for specialized landing assets, and scale upwards depending on complexity. We focus strictly on premium, long-term commercial returns.",
    "How long does a build take?": "A typical high-fidelity custom website takes between 4 to 8 weeks. Larger e-commerce integrations or dense data dispatch panels take 8 to 12 weeks."
  };

  const handleSelectPreset = (question: string) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { sender: 'user', text: question }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: presetReplies[question] }]);
    }, 1000);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;
    const userText = inputVal.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: "Thank you. Your parameters have been noted. Let's transition to a detailed project briefing at our Contact tab to log your specific guidelines." }]);
    }, 1200);
  };

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] text-[#F5F0EB] relative select-none overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between min-h-[500px]">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
            05 / CONTACT
          </span>
        </div>

        {/* Massive displays across multiple lines */}
        <div className="font-serif font-light text-4xl sm:text-7xl lg:text-9xl leading-none text-left tracking-tighter max-w-5xl space-y-2">
          <div>Ready to build</div>
          <div className="italic text-[#888888]">an experience</div>
          <div>that moves</div>
          <Link href="/about" className="block text-[#C8B89A] flex items-center group cursor-pointer select-none">
            <motion.div
              whileHover={{
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
              className="flex items-center"
            >
              &rarr; People
            </motion.div>
          </Link>
        </div>

        {/* Footer split details (blockquote left, CTA button right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 pt-12 border-t border-white/5 items-end">
          
          {/* Bottom-left: Interactive AI Chatbot Widget */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="font-mono text-[9px] text-[#C8B89A] uppercase tracking-[0.2em] block flex items-center space-x-1.5 select-none font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#C8B89A] animate-pulse" />
              <span>VYGRID DIGITAL CO-ARCHITECT</span>
            </span>
            
            <div className="border border-white/10 bg-[#111111]/60 backdrop-blur-md p-5 flex flex-col h-[280px] justify-between relative group select-none">
              
              {/* Message History Pane */}
              <div className="flex-grow overflow-y-auto no-scrollbar space-y-3 pr-2 scroll-smooth">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="font-mono text-[7px] text-[#444444] uppercase tracking-wider mb-0.5">
                      {m.sender === 'user' ? 'YOU' : 'STUDIO BOT'}
                    </span>
                    <div className={`p-3 font-grotesque text-xs leading-relaxed max-w-[85%] ${
                      m.sender === 'user' 
                        ? 'bg-[#C8B89A] text-[#0A0A0A] font-bold' 
                        : 'border border-white/5 bg-white/5 text-[#888888] font-light'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-[7px] text-[#444444] uppercase tracking-wider mb-0.5">
                      STUDIO BOT
                    </span>
                    <div className="p-3 border border-white/5 bg-white/5 text-[#444444] font-mono text-xs flex space-x-1 items-center">
                      <span className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Starters or Form */}
              <div className="pt-3 border-t border-white/5 space-y-2 mt-2">
                {/* Preset Chips */}
                {messages.length === 1 && !isTyping && (
                  <div className="flex flex-col space-y-1.5">
                    {Object.keys(presetReplies).map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSelectPreset(q)}
                        className="w-full text-left font-mono text-[9px] uppercase tracking-wider text-[#888888] hover:text-[#C8B89A] transition-colors border border-white/5 px-2 py-1.5 bg-[#0A0A0A]/50"
                      >
                        &gt; {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom Input form */}
                <form onSubmit={handleSendCustom} className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="ASK A CUSTOM QUESTION..."
                    disabled={isTyping}
                    className="flex-grow bg-[#0A0A0A] border border-white/10 px-3 py-2 font-mono text-[9px] tracking-wider text-[#F5F0EB] placeholder-[#444444] focus:outline-none focus:border-[#C8B89A] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !inputVal.trim()}
                    className="p-2 border border-white/10 bg-[#C8B89A] hover:bg-[#F5F0EB] disabled:opacity-50 text-[#0A0A0A] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom-right: Tell us your story text link & tight founder photo */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-end justify-start lg:justify-end gap-8 text-left">
            
            {/* Founder cropped photo */}
            <div className="relative w-28 h-28 bg-[#1A1A1B] flex-shrink-0 grayscale">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Lead Director Alex"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>

            {/* Direct text link */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-[#444444] uppercase tracking-wider block">
                PARTNER UP
              </span>
              <Link
                href="/contact"
                className="font-grotesque font-bold text-sm uppercase tracking-widest text-[#F5F0EB] hover:text-[#C8B89A] transition-colors duration-300 link-draw py-2 flex items-center space-x-2"
              >
                <span>Tell us your story</span>
                <ArrowRight className="w-4 h-4 text-[#C8B89A]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
