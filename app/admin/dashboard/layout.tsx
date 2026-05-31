'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '@/app/actions/auth';
import { fetchCMSData } from '@/app/actions/cms';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Briefcase, 
  FolderKanban, 
  BookOpen, 
  Star, 
  PhoneCall, 
  Inbox, 
  Image as ImageIcon, 
  Menu, 
  PanelBottom, 
  Search, 
  Settings, 
  ClipboardList, 
  LogOut,
  Globe,
  Tag,
  X
} from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [logoUrl, setLogoUrl] = React.useState('/logodes.png');
  const [tabLabels, setTabLabels] = React.useState<Record<string, string>>({});
  const [companyName, setCompanyName] = React.useState('Vygrid');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile drawer menu on page transition/navigation
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    async function loadBranding() {
      try {
        const data = await fetchCMSData();
        if (data.generalSettings) {
          if (data.generalSettings.logoUrl) {
            setLogoUrl(data.generalSettings.logoUrl);
          }
          if (data.generalSettings.adminTabs) {
            setTabLabels(data.generalSettings.adminTabs);
          }
          if (data.generalSettings.companyName) {
            setCompanyName(data.generalSettings.companyName);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadBranding();
  }, []);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to end this admin session?')) {
      await logoutAdmin();
      router.push('/admin');
      router.refresh();
    }
  };

  const navItems = [
    { key: 'overview', name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { key: 'homepage', name: 'Homepage Content', href: '/admin/dashboard/homepage', icon: Home },
    { key: 'about', name: 'About & Team', href: '/admin/dashboard/about', icon: Users },
    { key: 'services', name: 'Services CRUD', href: '/admin/dashboard/services', icon: Briefcase },
    { key: 'pricing', name: 'Service Pricing', href: '/admin/dashboard/pricing', icon: Tag },
    { key: 'portfolio', name: 'Portfolio CRUD', href: '/admin/dashboard/portfolio', icon: FolderKanban },
    { key: 'blog', name: 'Blog CRUD', href: '/admin/dashboard/blog', icon: BookOpen },
    { key: 'testimonials', name: 'Testimonials', href: '/admin/dashboard/testimonials', icon: Star },
    { key: 'contact', name: 'Contact & FAQ', href: '/admin/dashboard/contact', icon: PhoneCall },
    { key: 'leads', name: 'Leads Inbox', href: '/admin/dashboard/leads', icon: Inbox },
    { key: 'media', name: 'Media Library', href: '/admin/dashboard/media', icon: ImageIcon },
    { key: 'navigation', name: 'Navigation Menu', href: '/admin/dashboard/navigation', icon: Menu },
    { key: 'footer', name: 'Footer links', href: '/admin/dashboard/footer', icon: PanelBottom },
    { key: 'seo', name: 'SEO Settings', href: '/admin/dashboard/seo', icon: Search },
    { key: 'settings', name: 'General Settings', href: '/admin/dashboard/settings', icon: Settings },
    { key: 'activity', name: 'Activity Audit', href: '/admin/dashboard/activity', icon: ClipboardList },
  ];

  return (
    <div className="h-screen bg-[#0A0A0A] text-[#F5F0EB] flex flex-col md:flex-row relative font-grotesque select-none -mt-[80px] overflow-hidden">
      
      {/* Backdrop overlay for mobile menu drawer */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation - Fixed slide-over drawer on mobile, sticky sidebar on desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 border-r border-white/10 bg-[#111111] flex flex-col h-screen z-50 transform transition-transform duration-300 md:relative md:transform-none md:transition-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10 flex flex-col space-y-3 justify-center relative">
          <div className="flex items-center justify-between w-full">
            <Link href="/admin/dashboard" className="flex items-center">
              <Image
                src={logoUrl || "/logodes.png"}
                alt="VYGRID Logo"
                width={160}
                height={40}
                className="h-10 w-auto object-contain brightness-100"
              />
            </Link>
            <div className="flex items-center space-x-1">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] hover:text-[#C8B89A] p-1.5 transition-colors"
                title="View Live Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              {/* Close Button for mobile drawer menu */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#888888] hover:text-[#F5F0EB] p-1.5 md:hidden transition-colors border border-white/5 bg-[#0A0A0A]"
                title="Close Navigation Menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="font-mono text-[9px] tracking-[0.15em] font-bold text-[#C8B89A] uppercase">
            {companyName} Admin Portal
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 border text-xs font-mono tracking-wider transition-all duration-200 uppercase ${
                  isActive
                    ? 'bg-[#1A1A1A] border-[#C8B89A] text-[#C8B89A] font-bold'
                    : 'bg-transparent border-transparent text-[#888888] hover:text-[#F5F0EB] hover:bg-[#1A1A1A]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8B89A]' : 'text-inherit'}`} />
                <span className="truncate">{tabLabels[item.key] || item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0E0E0E]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 border border-red-500/20 bg-red-950/15 hover:bg-red-950/30 text-red-400 font-mono text-[10px] tracking-widest uppercase py-3 transition-colors duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>END SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Workspace */}
      <main className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Workspace Top Header Bar */}
        <header className="h-16 border-b border-white/10 px-6 md:px-8 flex items-center justify-between bg-[#111111]/30 backdrop-blur-md z-30">
          <div className="flex items-center space-x-3">
            {/* Hamburger Button for Mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#888888] hover:text-[#C8B89A] p-2 border border-white/10 bg-[#111111]/50 md:hidden transition-all duration-200"
              title="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8B89A] animate-pulse" />
              <h1 className="font-mono text-[10px] tracking-[0.25em] text-[#888888] uppercase">
                SECURE SESSION &middot; ADMIN CONSOLE
              </h1>
            </div>
          </div>
          <div className="font-mono text-[9px] text-[#888888] tracking-widest uppercase hidden sm:flex items-center space-x-2">
            <span>{companyName} ADMIN PORTAL</span>
            <span className="text-[#444444]">&middot;</span>
            <span className="text-[#444444]">SYSTEM TIME: 2026 UTC</span>
          </div>
        </header>

        {/* Workspace Content */}
        <section className="flex-grow p-6 md:p-8 overflow-y-auto max-w-full">
          {children}
        </section>
      </main>
    </div>
  );
}
