'use client';

import React, { useEffect, useState } from 'react';
import { fetchActivityLogs } from '@/app/actions/cms';
import { Clock, ClipboardList, RefreshCw } from 'lucide-react';

export default function ActivityAuditPage() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await fetchActivityLogs();
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn pb-16 selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">Activity Logs</h2>
          <p className="font-grotesque text-xs text-[#888888] font-light max-w-lg mt-1">
            Browse chronological records of CMS updates and structural database modifications.
          </p>
        </div>
        <button
          onClick={loadLogs}
          className="flex items-center space-x-1.5 border border-white/10 hover:border-[#C8B89A] px-3.5 py-2 font-mono text-[8px] uppercase tracking-widest bg-transparent transition-all"
          disabled={loading}
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>RELOAD LOGS</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <div className="font-mono text-xs tracking-widest text-[#888888] animate-pulse">
            RETRIEVING AUDIT ARCHIVES...
          </div>
        </div>
      ) : logs.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-white/10 bg-[#111111]/10 max-w-4xl">
          <ClipboardList className="w-8 h-8 text-[#333333] mx-auto mb-3" />
          <p className="font-mono text-[10px] text-[#444444] uppercase tracking-widest">
            No system log records logged.
          </p>
        </div>
      ) : (
        <div className="border border-white/10 bg-[#111111]/20 max-w-4xl p-6 md:p-8 space-y-4">
          <span className="block font-mono text-[9px] tracking-widest text-[#444444] uppercase border-b border-white/5 pb-2 mb-2">
            CHRONOLOGICAL SYSTEM AUDITS ({logs.length})
          </span>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {logs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-start space-x-3 text-xs border-b border-white/5 pb-4 last:border-b-0 last:pb-0"
              >
                <Clock className="w-4 h-4 text-[#444444] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-grotesque font-light text-[#F5F0EB] text-sm leading-snug">
                    {log.action}
                  </p>
                  <div className="flex items-center space-x-2 font-mono text-[9px] text-[#888888] uppercase tracking-wider">
                    <span className="text-[#C8B89A] font-bold">OPERATOR: {log.user}</span>
                    <span>&middot;</span>
                    <span>
                      {new Date(log.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
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
        </div>
      )}

    </div>
  );
}
