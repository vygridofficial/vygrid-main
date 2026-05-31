'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchCMSData } from '@/app/actions/cms';
import { useRouter } from 'next/navigation';

interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  image?: string;
}

export default function CTA({ title, subtitle, buttonText = "Tell us your story", buttonHref = "/contact", image }: CTAProps) {
  const [companyName, setCompanyName] = useState('Vygrid');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'Hello. How can I help you today? Switch models below to adjust response fidelity.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeModel, setActiveModel] = useState<'Orion V1' | 'Aether V1'>('Orion V1');
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Self-contained scrolling that does not scroll the browser page
  useEffect(() => {
    async function loadBranding() {
      try {
        const data = await fetchCMSData();
        if (data.generalSettings?.companyName) {
          const name = data.generalSettings.companyName.replace(/ Digital Studio/i, '').trim();
          setCompanyName(name);
          setMessages(prev => {
            if (prev.length === 1 && prev[0].text.includes('Vygrid')) {
              return [{ sender: 'bot', text: `Hello. I am the ${name} AI Architect. How can I guide you today?` }];
            }
            return prev;
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadBranding();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  // Preset prompts available in the initial state
  const presetQuestions = [
    "What core tech stack do you use?",
    "What are your pricing packages?",
    "How long does a build take?"
  ];

  // Natural Language Intent Keyword Parser
  const getBotResponse = (query: string, model: 'Orion V1' | 'Aether V1'): string => {
    const q = query.toLowerCase();
    
    const intents = [
      {
        keywords: ["hello", "hi", "hey", "yo", "greetings", "whats up", "yo"],
        orion: "Hello! How can I help you today?",
        aether: "Greetings. How can I assist you with your web systems, visual branding, or custom engineering concepts today?"
      },
      {
        keywords: ["thank you", "thanks", "appreciate", "awesome", "cool", "perfect", "nice"],
        orion: "You're very welcome! Let me know if you have any other questions.",
        aether: "It is entirely my pleasure. We pride ourselves on clear, detailed parameters and exceptional communication. Should you wish to lock in these guidelines, let us transition to hello@vygrid.studio."
      },
      {
        keywords: ["alex", "founder", "director", "team", "who runs", "crew", "people"],
        orion: "Vygrid is led by Alex, our Lead Director, along with a curated team of elite engineers and designers.",
        aether: "Vygrid Digital Studio is founded and led by Alex, our Lead Creative Director and Tech Architect, operating with a highly specialized, remote-first roster of world-class developers and visual designers. We maintain a tight-knit core to ensure every single project receives absolute elite curation and zero dilution of quality."
      },
      {
        keywords: ["why custom", "templates", "why vygrid", "about", "agency", "what makes you"],
        orion: "We do not use templates. Everything we build is coded from scratch for maximum speed, security, and unique design.",
        aether: "We believe templates and page builders dilute brand authority and throttle performance. Vygrid codes exclusively bespoke Next.js systems. This guarantees 100/100 Google Lighthouse scores, infinite design flexibility tailored specifically to your visual narrative, and a robust platform that scales commercially without technical debt."
      },
      {
        keywords: ["speed", "fast", "performance", "seo", "google", "optimization", "ranking"],
        orion: "We build for near-zero loading times and elite SEO structures, achieving 100/100 Lighthouse performance.",
        aether: "Performance is a core pillar of brand luxury. Every digital asset we craft undergoes strict speed-pipeline optimization, yielding 100/100 mobile/desktop performance metrics. Combined with index-optimized semantic HTML, clean structured JSON-LD schemas, and fast server-side rendering, we ensure your brand enjoys peak search engine authority."
      },
      {
        keywords: ["hire", "start", "project", "briefing", "collaborate", "work with you", "sign up", "book"],
        orion: "You can start by clicking 'Start Project' or emailing us at hello@vygrid.studio. We'll set up a briefing call!",
        aether: "We are currently accepting select commissions for upcoming quarters. To initiate your project timeline, click on our 'Start Project' navigation tab to submit your scope parameters, or reach out directly at hello@vygrid.studio to schedule an architectural brief."
      },
      {
        keywords: ["tech", "stack", "react", "next", "typescript", "supabase", "tailwind", "framework", "code", "language", "database", "backend"],
        orion: "We engineer custom builds using Next.js, TypeScript, Tailwind CSS, and Supabase. Clean, performant, and 100% custom.",
        aether: "Our architecture represents elite digital craftsmanship: a fully custom Next.js App Router core, TypeScript for absolute type safety, Supabase for robust relational databases, and custom Tailwind CSS with Framer Motion for premium editorial-grade motion design. We do not use templates; every codebase is engineered from absolute scratch for maximum page-speed, search visibility, and commercial scalability."
      },
      {
        keywords: ["price", "cost", "budget", "pricing", "rate", "fee", "expensive", "how much", "charge", "payment"],
        orion: "Custom landing experiences start at $5,000. Full-scale products and systems range from $10,000 to $25,000 depending on complexity.",
        aether: "Every brand strategy is custom curated. Specialized, highly detailed high-fidelity landing pages start at $5,000. Comprehensive editorial websites, e-commerce integrations, or dense data dispatch applications typically scale between $10,000 and $25,000. We work under strict, transparent project milestones focused entirely on generating long-term premium enterprise value."
      },
      {
        keywords: ["time", "timeline", "duration", "how long", "weeks", "months", "schedule", "deadline", "fast", "speed"],
        orion: "A high-fidelity custom site takes 4 to 8 weeks. Larger systems or custom dashboard applications take 8 to 12 weeks.",
        aether: "Precision engineering requires dedicated curation. A standard high-fidelity custom brand showcase or web project takes between 4 to 8 weeks. Complex software architectures, relational database structures, or custom admin control panels require 8 to 12 weeks. This includes rigorous testing, speed optimization, and SEO setup."
      },
      {
        keywords: ["contact", "email", "phone", "call", "office", "location", "where", "reach", "talk"],
        orion: "Email us at hello@vygrid.studio or visit our Contact page. We are fully remote and service founder-led brands globally.",
        aether: "You can directly establish contact with our engineering team at hello@vygrid.studio. While we operate as a remote studio serving founder-led, high-growth businesses worldwide, our core communications are run with detailed virtual briefings. We recommend initiating a project request in our 'Start Project' or 'Contact' tab to log your parameters."
      },
      {
        keywords: ["services", "what do you do", "offer", "build", "design", "branding", "seo", "ui", "ux", "logo"],
        orion: "We provide custom Web Engineering, UI/UX Curation, Brand Identity design, and advanced speed/SEO optimization.",
        aether: "We specialize in editorial-grade web engineering and bespoke brand curation. Our suite includes custom Next.js web application development, interactive design kits, visual asset creation, and technical SEO structure. We combine high-end design aesthetics with rigorous engineering, giving founder-led companies an elite competitive edge."
      },
      {
        keywords: ["portfolio", "work", "projects", "clients", "case study", "examples", "done", "show"],
        orion: "Check out our 'Work' page to see our curated list of custom sites, engineered with high performance.",
        aether: "Our curated portfolio is accessible on the 'Work' tab. It showcases our editorial approach, featuring high-fidelity custom interfaces, lightning-fast animations, and robust structures. Each project represents a partnership with ambitious founders to turn digital assets into high-converting brand platforms."
      }
    ];

    // Find first matching intent
    const matched = intents.find(intent => 
      intent.keywords.some(keyword => q.includes(keyword))
    );

    if (matched) {
      return model === 'Orion V1' ? matched.orion : matched.aether;
    }

    // Default Fallbacks
    if (model === 'Orion V1') {
      return "For custom projects, we engineer premium digital interfaces. Tell me about your scope or tech questions!";
    } else {
      return "We synthesize editorial-grade design with elite performance using custom Next.js pipelines. For tailored guidance, let's map your brand requirements at hello@vygrid.studio.";
    }
  };

  // Check if a navigation command is present
  const checkNavigationIntent = (query: string): { path: string; name: string } | null => {
    const q = query.toLowerCase();
    
    // Page synonyms mapping
    const pages = [
      { name: "About Studio", path: "/about", keys: ["about", "studio", "team", "who you are"] },
      { name: "Services", path: "/services", keys: ["services", "what you do", "offerings", "expertise"] },
      { name: "Portfolio", path: "/portfolio", keys: ["portfolio", "work", "projects", "case studies", "examples"] },
      { name: "Blog", path: "/blog", keys: ["blog", "articles", "news", "updates"] },
      { name: "Start Project", path: "/start-your-project", keys: ["start", "briefing", "scope", "hire"] },
      { name: "Contact", path: "/contact", keys: ["contact", "email", "office", "reach", "talk to us"] },
      { name: "Home", path: "/", keys: ["home", "main", "welcome", "front page"] }
    ];

    // Navigation trigger words
    const triggers = ["go to", "navigate", "open", "visit", "take me", "show", "redirect", "route", "jump to", "page"];

    const hasTrigger = triggers.some(t => q.includes(t));
    
    for (const page of pages) {
      if (q.includes(`${page.name.toLowerCase()} page`)) {
        return { path: page.path, name: page.name };
      }
      if (hasTrigger && page.keys.some(key => q.includes(key))) {
        return { path: page.path, name: page.name };
      }
      if (page.keys.some(key => q === key || q === `/${key}`)) {
        return { path: page.path, name: page.name };
      }
    }

    return null;
  };

  const handleSelectPreset = (question: string) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { sender: 'user', text: question }]);
    setIsTyping(true);
    
    const nav = checkNavigationIntent(question);
    const delay = activeModel === 'Orion V1' ? 400 : 1200;
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (nav) {
        const text = activeModel === 'Orion V1'
          ? `Navigating you to the ${nav.name} workspace...`
          : `Understood. Directing your session to our bespoke ${nav.name} console at "${nav.path}". Initializing server-side transition...`;
        
        setMessages(prev => [...prev, { sender: 'bot', text }]);
        
        setTimeout(() => {
          router.push(nav.path);
        }, 1000);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: getBotResponse(question, activeModel) }]);
      }
    }, delay);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;
    const userText = inputVal.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');
    setIsTyping(true);
    
    const nav = checkNavigationIntent(userText);
    const delay = activeModel === 'Orion V1' ? 500 : 1400;
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (nav) {
        const text = activeModel === 'Orion V1'
          ? `Navigating you to the ${nav.name} workspace...`
          : `Understood. Directing your session to our bespoke ${nav.name} console at "${nav.path}". Initializing server-side transition...`;
        
        setMessages(prev => [...prev, { sender: 'bot', text }]);
        
        setTimeout(() => {
          router.push(nav.path);
        }, 1000);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: getBotResponse(userText, activeModel) }]);
      }
    }, delay);
  };

  // Split title by comma to layout editorial typography lines
  const defaultLines = [
    "Ready to build",
    "an experience",
    "that moves",
    "People"
  ];
  
  let line1 = defaultLines[0];
  let line2 = defaultLines[1];
  let line3 = defaultLines[2];
  let line4 = defaultLines[3];

  if (title) {
    const parts = title.split(',');
    line1 = parts[0] || '';
    line2 = parts[1] || '';
    line3 = parts[2] || '';
    line4 = parts[3] || '';
  }

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
          {line1 && <div>{line1}</div>}
          {line2 && <div className="italic text-[#888888]">{line2}</div>}
          {line3 && <div>{line3}</div>}
          {line4 && (
            <Link href={buttonHref} className="block text-[#C8B89A] flex items-center group cursor-pointer select-none">
              <motion.div
                whileHover={{
                  x: [0, -5, 5, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
                className="flex items-center"
              >
                &rarr; {line4}
              </motion.div>
            </Link>
          )}
        </div>

        {/* Full-width Interactive AI Chatbot Widget */}
        <div className="mt-20 pt-12 border-t border-white/5">
          <div className="w-full space-y-4 text-left">
            <span className="font-mono text-[9px] text-[#C8B89A] uppercase tracking-[0.2em] block flex items-center space-x-1.5 select-none font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#C8B89A] animate-pulse" />
              <span>{companyName.toUpperCase()} DIGITAL CO-ARCHITECT</span>
            </span>
            
            <div className="border border-white/10 bg-[#111111]/60 backdrop-blur-md p-6 flex flex-col h-[340px] justify-between relative group select-none">
              
              {/* Message History Pane */}
              <div 
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto no-scrollbar space-y-3 pr-2 scroll-smooth"
              >
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="font-mono text-[7px] text-[#444444] uppercase tracking-wider mb-0.5">
                      {m.sender === 'user' ? 'YOU' : `STUDIO BOT (${m.text.length < 150 ? 'ORION V1' : 'AETHER V1'})`}
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
                      STUDIO BOT ({activeModel.toUpperCase()})
                    </span>
                    <div className="p-3 border border-white/5 bg-white/5 text-[#444444] font-mono text-xs flex space-x-1 items-center">
                      <span className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>
 
              {/* Chat Starters or Form */}
              <div className="pt-4 border-t border-white/5 space-y-3 mt-2 relative">
                {/* Preset Chips in horizontal wrapping layout */}
                {messages.length === 1 && !isTyping && (
                  <div className="flex flex-wrap gap-2">
                    {presetQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSelectPreset(q)}
                        className="text-left font-mono text-[9px] uppercase tracking-wider text-[#888888] hover:text-[#C8B89A] transition-colors border border-white/5 px-3 py-2 bg-[#0A0A0A]/50 hover:bg-[#1A1A1A]/50"
                      >
                        &gt; {q}
                      </button>
                    ))}
                  </div>
                )}
 
                {/* Custom Input form mimicking mockup console */}
                <form onSubmit={handleSendCustom} className="border border-white/10 bg-[#0A0A0A]/85 p-3.5 flex flex-col space-y-3 hover:border-white/20 transition-all duration-300">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={
                      activeModel === 'Orion V1' 
                        ? "Ask Orion V1 Co-Architect (Fast, concise answers)..." 
                        : "Ask Aether V1 Co-Architect (Detailed, descriptive brand analysis)..."
                    }
                    disabled={isTyping}
                    className="w-full bg-transparent font-grotesque text-xs tracking-wider text-[#F5F0EB] placeholder-[#444444] focus:outline-none"
                  />
                  
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
                    
                    {/* Model Selector Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                        className="flex items-center space-x-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] bg-[#111111] border border-white/5 px-3 py-1.5 transition-all duration-300 focus:outline-none"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          activeModel === 'Orion V1' ? 'bg-[#56A5EC]' : 'bg-[#C8B89A]'
                        } animate-pulse`} />
                        <span>{activeModel} {activeModel === 'Orion V1' ? 'Low' : 'High'}</span>
                        <span className="text-[7px] text-[#444444]">▼</span>
                      </button>

                      {isModelMenuOpen && (
                        <div className="absolute left-0 bottom-full mb-2 w-44 bg-[#111111] border border-white/10 shadow-2xl z-20 p-1 flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModel('Orion V1');
                              setIsModelMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 font-mono text-[9px] uppercase tracking-wider transition-colors flex items-center space-x-2 ${
                              activeModel === 'Orion V1' ? 'text-[#C8B89A] bg-white/5' : 'text-[#888888] hover:text-[#F5F0EB]'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#56A5EC]" />
                            <div className="flex flex-col">
                              <span className="font-bold">Orion V1 Model</span>
                              <span className="text-[7px] text-[#555555] lowercase leading-none mt-0.5">concise & instant answers</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModel('Aether V1');
                              setIsModelMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 font-mono text-[9px] uppercase tracking-wider transition-colors flex items-center space-x-2 ${
                              activeModel === 'Aether V1' ? 'text-[#C8B89A] bg-white/5' : 'text-[#888888] hover:text-[#F5F0EB]'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8B89A]" />
                            <div className="flex flex-col">
                              <span className="font-bold">Aether V1 Model</span>
                              <span className="text-[7px] text-[#555555] lowercase leading-none mt-0.5">detailed brand analysis</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Send submit button */}
                    <button
                      type="submit"
                      disabled={isTyping || !inputVal.trim()}
                      className="p-2 border border-white/5 bg-[#C8B89A] hover:bg-[#F5F0EB] text-[#0A0A0A] disabled:opacity-30 disabled:hover:bg-[#C8B89A] transition-all duration-300"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

