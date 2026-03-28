'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/hooks/useToast';

/**
 * High-Fidelity Monthly Attendance Heatmap
 * UI Specs from UI.md / AGENTS.md
 */
export default function AttendanceWidget() {
  const { addToast } = useToast();
  const daysInMonth = 31;
  const monthName = "March 2025";
  
  // Professional Stat Mapping
  const statusConfig = {
    present: { bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-100', label: 'Present' },
    half: { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-100', label: 'Half-Day' },
    absent: { bg: 'bg-rose-500', text: 'text-rose-500', border: 'border-rose-100', label: 'Absent' },
    holiday: { bg: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-100', label: 'Holiday' },
    weekend: { bg: 'bg-slate-100', text: 'text-slate-400', border: 'border-slate-50', label: 'Weekend' },
  };

  const dayData = (day: number) => {
    if ([1, 2, 8, 9, 15, 16, 22, 23, 29, 30].includes(day)) return statusConfig.weekend;
    if ([14].includes(day)) return statusConfig.holiday;
    if ([5, 12, 19, 26].includes(day)) return statusConfig.half;
    if ([7, 21].includes(day)) return statusConfig.absent;
    return statusConfig.present;
  };

  return (
    <div className="card-base h-full flex flex-col relative overflow-hidden group">
      {/* Subtle Background Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-brand flex items-center justify-center shadow-inner">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="text-base font-black text-text-primary tracking-tight italic">Attendance Log</h4>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-0.5">March Tracking</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
           <div className="flex items-center bg-[--surface-alt] rounded-lg p-1">
              <button className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-[--text-primary]">
                 <ChevronLeft size={16} />
              </button>
              <span className="text-[10px] font-black w-24 text-center uppercase tracking-tighter italic text-[--text-primary]">March 2025</span>
              <button className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-[--text-primary]">
                 <ChevronRight size={16} />
              </button>
           </div>
           <HelpCircle 
             size={16} 
             className="text-[--text-muted] cursor-help hover:text-[--brand] transition-colors"
             onClick={() => addToast({ type: 'info', title: 'Heatmap Guide', message: 'Visual summary of your daily check-ins and hours.' })}
           />
        </div>
      </div>

      <div className="flex-1 relative z-10 px-1">
        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
            <div key={i} className="text-[9px] font-black text-text-secondary text-center uppercase tracking-widest">
              {d}
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Start padding (assuming Fri start for demo) */}
          {[...Array(4)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const status = dayData(day);
            const isFuture = day > 28;

            return (
              <div 
                key={day} 
                className={cn(
                  "aspect-square rounded-xl flex items-center justify-center text-[11px] font-black transition-all cursor-pointer border shadow-sm relative group/day",
                  status.bg,
                  status.border,
                  isFuture ? "opacity-20 pointer-events-none" : "hover:scale-110 hover:shadow-lg hover:z-20",
                  status.label === 'Weekend' ? "text-slate-400" : "text-slate-800"
                )}
              >
                {day}
                
                {/* Micro-tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-primary text-black text-[8px] font-black uppercase px-2 py-1 rounded-md opacity-0 group-hover/day:opacity-100 pointer-events-none transition-all duration-300 shadow-xl z-30 whitespace-nowrap tracking-widest">
                   {status.label} • 9h
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend Block */}
      <div className="mt-8 pt-6 border-t border-[--border] flex items-center justify-between relative z-10 italic">
        <div className="flex items-center gap-3">
          {[
            { config: statusConfig.present, label: 'PR' },
            { config: statusConfig.half, label: 'HD' },
            { config: statusConfig.absent, label: 'AB' },
            { config: statusConfig.holiday, label: 'HO' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-1.5 group/legend">
              <div className={cn("w-2.5 h-2.5 rounded-sm shadow-sm transition-transform group-hover/legend:scale-125", item.config.bg)} />
              <span className="text-[9px] font-black text-text-secondary uppercase tracking-tighter italic">{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Efficiency: 94%</p>
        </div>
      </div>
    </div>
  );
}
