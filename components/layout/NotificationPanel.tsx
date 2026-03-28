'use client';

import { Bell, Check, Clock, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const NOTIFICATIONS = [
  { 
    id: 1, 
    title: 'Leave Approved', 
    desc: 'Rajesh Sharma approved your Casual Leave for 14th March.', 
    time: '2m ago', 
    icon: Check, 
    bg: 'bg-green-100', 
    color: 'text-green-600',
    read: false
  },
  { 
    id: 2, 
    title: 'Salary Processed', 
    desc: 'Your pay stub for March 2025 is now available for download.', 
    time: '45m ago', 
    icon: TrendingUp, 
    bg: 'bg-indigo-100', 
    color: 'text-indigo-600',
    read: false
  },
  { 
    id: 3, 
    title: 'Policy Update', 
    desc: 'The New WFH Guidelines have been published in the Policy section.', 
    time: '2h ago', 
    icon: Info, 
    bg: 'bg-blue-100', 
    color: 'text-blue-600',
    read: true
  },
  { 
    id: 4, 
    title: 'Birthday Alert', 
    desc: "Suresh Reddy's birthday is tomorrow. Don't forget to wish him!", 
    time: 'Yesterday', 
    icon: AlertCircle, 
    bg: 'bg-amber-100', 
    color: 'text-amber-600',
    read: true
  }
];

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-white border border-[--border] text-[--text-secondary] shadow-sm hover:bg-slate-50 hover:text-[--brand] transition-all group"
      >
        <Bell size={20} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-14 right-0 w-80 sm:w-96 bg-white rounded-3xl border border-[--border] shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 overflow-hidden">
             <div className="p-6 border-b border-[--border] flex items-center justify-between">
                <div>
                   <h4 className="text-base font-black text-[--text-primary] tracking-tight">Inbox</h4>
                   <p className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-widest mt-1">2 New Alerts</p>
                </div>
                <button className="text-[10px] font-black text-[--brand] uppercase tracking-widest hover:underline transition-all">Clear All</button>
             </div>

             <div className="max-h-[380px] overflow-y-auto no-scrollbar py-2">
                {NOTIFICATIONS.map((n) => (
                   <div 
                     key={n.id} 
                     className={cn(
                       "px-6 py-4 flex items-start space-x-4 transition-all cursor-pointer hover:bg-slate-50",
                       !n.read && "bg-indigo-50/30 border-l-4 border-[--brand]"
                     )}
                   >
                      <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", n.bg, n.color)}>
                         <n.icon size={18} />
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center justify-between gap-4">
                            <h5 className="text-[13px] font-black text-slate-900 leading-none">{n.title}</h5>
                            <span className="text-[9px] font-bold text-slate-500 whitespace-nowrap uppercase italic tracking-tighter">{n.time}</span>
                         </div>
                         <p className="text-xs text-slate-600 font-medium leading-normal tracking-tight">{n.desc}</p>
                      </div>
                   </div>
                ))}
             </div>

             <button className="w-full p-4 text-[10px] font-black uppercase text-[--text-secondary] tracking-widest border-t border-[--border] hover:bg-slate-50 transition-all">
                Full Notification Center
             </button>
          </div>
        </>
      )}
    </div>
  );
}
