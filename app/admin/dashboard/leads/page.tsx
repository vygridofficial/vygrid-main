'use client';

import React, { useEffect, useState } from 'react';
import { fetchLeads, modifyLeadStatus } from '@/app/actions/cms';
import { Search, Filter, Mail, Phone, Calendar, MessageSquare, ClipboardList, CheckCircle, X, ExternalLink } from 'lucide-react';

export default function LeadsInboxPage() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    let result = [...leads];
    
    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.fullName.toLowerCase().includes(query) ||
        l.email.toLowerCase().includes(query) ||
        (l.phone && l.phone.includes(query)) ||
        l.message.toLowerCase().includes(query)
      );
    }

    // 2. Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(l => l.status === statusFilter);
    }

    setFilteredLeads(result);
    
    // Reset selected lead if it's no longer in the filtered set
    if (selectedLead && !result.find(l => l.id === selectedLead.id)) {
      setSelectedLead(null);
    }
  }, [leads, searchQuery, statusFilter]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await modifyLeadStatus(leadId, newStatus);
      if (res.success) {
        // Update local state to avoid refetching
        const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
        setLeads(updated);
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'New':
        return 'border-[#C8B89A]/30 text-[#C8B89A] bg-[#C8B89A]/5';
      case 'Contacted':
        return 'border-blue-500/20 text-blue-400 bg-blue-950/10';
      case 'In Progress':
        return 'border-yellow-500/20 text-yellow-400 bg-yellow-950/10';
      case 'Closed':
        return 'border-green-500/20 text-green-400 bg-green-950/10';
      default:
        return 'border-white/10 text-[#888888]';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Header */}
      <div>
        <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Leads Inbox</h2>
        <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
          Review, status-track, and search project briefs captured from contact panels.
        </p>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border border-white/10 p-4 bg-[#111111]/30">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444444]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-[#F5F0EB] placeholder:text-[#444444] focus:outline-none focus:border-[#C8B89A] font-mono"
            placeholder="SEARCH LEADS BY NAME, EMAIL, OR BRIEF DETAILS..."
          />
        </div>
        <div className="md:col-span-4 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#444444] flex-shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/10 px-3 py-2.5 text-xs text-[#888888] focus:outline-none focus:border-[#C8B89A] font-mono"
          >
            <option value="All">ALL STATUSES</option>
            <option value="New">NEW</option>
            <option value="Contacted">CONTACTED</option>
            <option value="In Progress">IN PROGRESS</option>
            <option value="Closed">CLOSED</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            LOADING LEADS DATABASES...
          </div>
        </div>
      ) : leads.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-white/10 bg-[#111111]/10">
          <ClipboardList className="w-8 h-8 text-[#333333] mx-auto mb-3" />
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            Inbox is currently empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Leads Listing (Left) */}
          <div className={`space-y-3 ${selectedLead ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
            <span className="block font-mono text-[9px] tracking-widest text-[#444444] uppercase mb-1">
              INQUIRIES LIST ({filteredLeads.length})
            </span>
            
            {filteredLeads.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/5 bg-[#111111]/10">
                <p className="font-mono text-[9px] text-[#444444] uppercase tracking-wider">
                  No records match selected query/filter.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`border p-4 transition-all duration-200 cursor-pointer flex justify-between items-center gap-4 ${
                      selectedLead && selectedLead.id === lead.id
                        ? 'border-[#C8B89A] bg-[#1A1A1A]/40'
                        : 'border-white/5 bg-[#111111]/30 hover:bg-[#111111]'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-[#F5F0EB] truncate">{lead.fullName}</span>
                        <span className={`px-2 py-0.5 border font-mono text-[8px] uppercase tracking-wider ${getStatusStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                      <p className="font-mono text-[10px] text-[#888888] truncate">{lead.email}</p>
                    </div>
                    <div className="font-mono text-[9px] text-[#444444] flex-shrink-0">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lead Detail Panel (Right) */}
          {selectedLead && (
            <div className="lg:col-span-6 border border-[#C8B89A]/30 p-6 md:p-8 bg-[#111111]/50 space-y-6 animate-slideIn">
              
              {/* Panel Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <span className="font-mono text-[8px] text-[#C8B89A] uppercase tracking-widest block mb-1">
                    INQUIRY RECORD DETAILED VIEW
                  </span>
                  <h3 className="font-serif italic text-2xl text-[#F5F0EB] leading-tight">
                    {selectedLead.fullName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1 border border-white/5 hover:border-[#C8B89A] text-[#888888] hover:text-[#C8B89A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Action Dropdown */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border border-white/5 p-4 bg-[#0A0A0A]">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#C8B89A]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#888888]">TRANSITION STATUS:</span>
                </div>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className={`border px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest focus:outline-none ${getStatusStyle(selectedLead.status)}`}
                >
                  <option value="New">NEW</option>
                  <option value="Contacted">CONTACTED</option>
                  <option value="In Progress">IN PROGRESS</option>
                  <option value="Closed">CLOSED</option>
                </select>
              </div>

              {/* Metadata details */}
              <div className="space-y-3 font-mono text-xs text-[#888888]">
                {/* Email Row Card with Gmail & Mailto Actions */}
                <div className="flex items-center justify-between gap-4 p-3.5 border border-white/5 bg-[#0A0A0A]/40 rounded-sm hover:border-[#C8B89A]/30 transition-all duration-200 group">
                  <div className="flex items-center space-x-3 min-w-0">
                    <Mail className="w-4 h-4 text-[#444444] group-hover:text-[#C8B89A] transition-colors" />
                    <div className="min-w-0">
                      <span className="text-[8px] text-[#444444] block tracking-wider font-mono">EMAIL ADDRESS</span>
                      <span className="text-[#F5F0EB] font-mono font-bold block break-all text-xs mt-0.5">
                        {selectedLead.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedLead.email)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 border border-white/10 hover:border-red-500/40 hover:bg-red-500/5 text-[#888888] hover:text-red-400 font-mono text-[9px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1"
                      title="Open in Gmail"
                    >
                      <span>Gmail</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="px-2.5 py-1 border border-white/10 hover:border-[#C8B89A] hover:bg-[#C8B89A]/5 text-[#888888] hover:text-[#C8B89A] font-mono text-[9px] uppercase tracking-wider transition-all duration-200"
                      title="Open Default Mail App"
                    >
                      Mailto
                    </a>
                  </div>
                </div>

                {/* Phone Row Card with WhatsApp & Call Actions */}
                {selectedLead.phone && (
                  <div className="flex items-center justify-between gap-4 p-3.5 border border-white/5 bg-[#0A0A0A]/40 rounded-sm hover:border-[#C8B89A]/30 transition-all duration-200 group">
                    <div className="flex items-center space-x-3 min-w-0">
                      <Phone className="w-4 h-4 text-[#444444] group-hover:text-[#C8B89A] transition-colors" />
                      <div className="min-w-0">
                        <span className="text-[8px] text-[#444444] block tracking-wider font-mono">PHONE NUMBER</span>
                        <span className="text-[#F5F0EB] font-mono font-bold block text-xs mt-0.5">
                          {selectedLead.phone}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 border border-white/10 hover:border-green-500/40 hover:bg-green-500/5 text-[#888888] hover:text-green-400 font-mono text-[9px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1"
                        title="Chat on WhatsApp"
                      >
                        <span>WhatsApp</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="px-2.5 py-1 border border-white/10 hover:border-[#C8B89A] hover:bg-[#C8B89A]/5 text-[#888888] hover:text-[#C8B89A] font-mono text-[9px] uppercase tracking-wider transition-all duration-200"
                        title="Call Number"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                )}

                {/* Timestamp Row Card */}
                <div className="flex items-center justify-between gap-4 p-3.5 border border-white/5 bg-[#0A0A0A]/40 rounded-sm hover:border-[#C8B89A]/30 transition-all duration-200 group">
                  <div className="flex items-center space-x-3 min-w-0">
                    <Calendar className="w-4 h-4 text-[#444444] group-hover:text-[#C8B89A] transition-colors" />
                    <div>
                      <span className="text-[8px] text-[#444444] block tracking-wider font-mono">RECEIVED DATE TIMESTAMP</span>
                      <span className="text-[#F5F0EB] font-mono block text-xs mt-0.5">
                        {new Date(selectedLead.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Details */}
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-[#444444] font-mono text-[9px] uppercase tracking-widest">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>PROJECT BRIEF MESSAGE:</span>
                </div>
                <div className="border border-white/5 bg-[#0D0D0D] p-5 font-grotesque text-sm text-[#888888] font-light leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
