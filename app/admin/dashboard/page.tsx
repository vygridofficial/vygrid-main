'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Inbox, 
  FolderKanban, 
  BookOpen, 
  Briefcase, 
  ArrowUpRight, 
  Clock, 
  Activity,
  PlusSquare,
  Globe,
  Settings,
  Star
} from 'lucide-react';
import { fetchCMSData, fetchLeads, fetchActivityLogs } from '@/app/actions/cms';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    leads: 0,
    projects: 0,
    services: 0,
    blogs: 0,
    reviewRequests: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCMSData();
        const allLeads = await fetchLeads();
        const allLogs = await fetchActivityLogs();

        const webServicesCount = data.webServices?.length || 0;
        const brandServicesCount = data.brandServices?.length || 0;
        const pendingReviews = (data.testimonials || []).filter((t: any) => t.approved === false).length;

        setStats({
          leads: allLeads.length,
          projects: data.projects?.length || 0,
          services: webServicesCount + brandServicesCount,
          blogs: data.blogPosts?.length || 0,
          reviewRequests: pendingReviews,
        });

        setRecentLeads(allLeads.slice(0, 4));
        setLogs(allLogs.slice(0, 6));
      } catch (err) {
        console.error("Error loading dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
          ACQUIRING TELEMETRY DATA...
        </div>
      </div>
    );
  }

  const statCards = [
    { name: 'Active Inquiries', value: stats.leads, href: '/admin/dashboard/leads', icon: Inbox },
    { name: 'Portfolio Projects', value: stats.projects, href: '/admin/dashboard/portfolio', icon: FolderKanban },
    { name: 'Dynamic Services', value: stats.services, href: '/admin/dashboard/services', icon: Briefcase },
    { name: 'Journal Articles', value: stats.blogs, href: '/admin/dashboard/blog', icon: BookOpen },
    { name: 'Review Requests', value: stats.reviewRequests, href: '/admin/dashboard/testimonials', icon: Star },
  ];

  return (
    <div className="space-y-8 animate-fadeIn select-none">
      
      {/* Page Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Overview</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Monitor your studio operations, content counts, lead flows, and activity logs.
        </p>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link 
              key={card.name}
              href={card.href}
              className="border border-white/10 p-6 bg-[#111111]/40 hover:bg-[#111111] hover:border-[#C8B89A]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] tracking-widest text-[#888888] uppercase block">
                  {card.name}
                </span>
                <Icon className="w-4 h-4 text-[#888888] group-hover:text-[#C8B89A] transition-colors" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <span className="font-serif text-3xl md:text-4xl text-[#F5F0EB] font-light">
                  {card.value}
                </span>
                <span className="font-mono text-[8px] text-[#C8B89A] opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  MANAGE <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Split: Inquiries & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Recent Inquiries */}
        <div className="lg:col-span-7 border border-white/10 bg-[#111111]/20 p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center space-x-2">
              <Inbox className="w-4 h-4 text-[#C8B89A]" />
              <h3 className="font-serif italic text-lg text-[#F5F0EB]">Recent Inquiries</h3>
            </div>
            <Link 
              href="/admin/dashboard/leads" 
              className="font-mono text-[9px] tracking-widest text-[#888888] hover:text-[#C8B89A] uppercase transition-colors"
            >
              All Inquiries &rarr;
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-white/5 bg-[#111111]/30">
              <p className="font-mono text-[10px] text-[#444444] uppercase tracking-wider">
                No inquiries received yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="border border-white/5 p-4 bg-[#0D0D0D] hover:bg-[#111111] transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-[#F5F0EB]">{lead.fullName}</span>
                      <span className={`px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider border ${
                        lead.status === 'New' 
                          ? 'border-[#C8B89A]/30 text-[#C8B89A] bg-[#C8B89A]/5' 
                          : 'border-white/10 text-[#888888]'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[#888888]">{lead.email}</p>
                  </div>
                  <div className="font-mono text-[9px] text-[#444444] self-end sm:self-auto">
                    {new Date(lead.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Activity Audit Logs */}
        <div className="lg:col-span-5 border border-white/10 bg-[#111111]/20 p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#C8B89A]" />
              <h3 className="font-serif italic text-lg text-[#F5F0EB]">System Activity Logs</h3>
            </div>
            <Link 
              href="/admin/dashboard/activity" 
              className="font-mono text-[9px] tracking-widest text-[#888888] hover:text-[#C8B89A] uppercase transition-colors"
            >
              Full Log &rarr;
            </Link>
          </div>

          {logs.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-white/5 bg-[#111111]/30">
              <p className="font-mono text-[10px] text-[#444444] uppercase tracking-wider">
                No system log records logged.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex space-x-3 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#444444] mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-grotesque font-light text-[#888888] leading-tight">
                      {log.action}
                    </p>
                    <div className="flex items-center space-x-2 font-mono text-[8px] text-[#444444] uppercase tracking-wider">
                      <span>BY: {log.user}</span>
                      <span>&middot;</span>
                      <span>
                        {new Date(log.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Quick Access Actions Bar */}
      <div className="border border-white/10 bg-[#111111]/20 p-6">
        <h4 className="font-mono text-[9px] tracking-widest text-[#888888] uppercase border-b border-white/5 pb-3 mb-4">
          QUICK ACTIONS
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link 
            href="/admin/dashboard/portfolio?action=create" 
            className="flex items-center justify-center space-x-2 border border-white/10 hover:border-[#C8B89A] py-3 bg-[#0A0A0A] font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200"
          >
            <PlusSquare className="w-3.5 h-3.5 text-[#888888]" />
            <span>NEW PROJECT</span>
          </Link>
          <Link 
            href="/admin/dashboard/blog?action=create" 
            className="flex items-center justify-center space-x-2 border border-white/10 hover:border-[#C8B89A] py-3 bg-[#0A0A0A] font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200"
          >
            <PlusSquare className="w-3.5 h-3.5 text-[#888888]" />
            <span>WRITE ARTICLE</span>
          </Link>
          <Link 
            href="/admin/dashboard/homepage" 
            className="flex items-center justify-center space-x-2 border border-white/10 hover:border-[#C8B89A] py-3 bg-[#0A0A0A] font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5 text-[#888888]" />
            <span>EDIT HERO COPY</span>
          </Link>
          <Link 
            href="/admin/dashboard/settings" 
            className="flex items-center justify-center space-x-2 border border-white/10 hover:border-[#C8B89A] py-3 bg-[#0A0A0A] font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200"
          >
            <Settings className="w-3.5 h-3.5 text-[#888888]" />
            <span>PORTAL SETTINGS</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
