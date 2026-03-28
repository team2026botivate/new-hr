'use client';

import {
   Search,
   Command,
   X,
   User,
   Calendar,
   Building2,
   Settings,
   FileText,
   Clock,
   Briefcase,
   ExternalLink,
   Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const QUICK_ACTIONS = [
   { label: 'Apply Leave', href: '/trackers/leave', icon: Calendar, color: 'text-rose-500' },
   { label: 'Clock In / Out', href: '/trackers/attendance', icon: Clock, color: 'text-[--brand-vibrant]' },
   { label: 'Download Payslip', href: '/salary', icon: FileText, color: 'text-indigo-500' },
   { label: 'Team Directory', href: '/team', icon: Users, color: 'text-sky-500' }
];

const RECENT_EMPLOYEES = [
   { id: 'EMP001', name: 'Rajesh Sharma', role: 'CTO', dep: 'Engineering', initials: 'RS' },
   { id: 'EMP042', name: 'Priya Mehta', role: 'HR Manager', dep: 'HR', initials: 'PM' },
   { id: 'EMP087', name: 'Arjun Nair', role: 'Software Engineer', dep: 'Engineering', initials: 'AN' }
];

/**
 * Global Command Palette (Cmd+K)
 * Vibrant Industrial UI with search highlights
 */
export default function CommandPalette() {
   const [isOpen, setIsOpen] = useState(false);
   const [query, setQuery] = useState('');
   const router = useRouter();

   const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
         e.preventDefault();
         setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
   }, []);

   useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, [handleKeyDown]);

   const navigateTo = (href: string) => {
      router.push(href);
      setIsOpen(false);
      setQuery('');
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-20">
         {/* Backdrop */}
         <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in transition-opacity"
            onClick={() => setIsOpen(false)}
         />

         {/* Palette Body */}
         <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[--border] animate-in slide-in-from-bottom-8 zoom-in-95 duration-300">
            {/* Search Bar */}
            <div className="relative flex items-center p-6 border-b border-[--border]">
               <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[--brand] w-6 h-6" />
               <input
                  autoFocus
                  type="text"
                  placeholder="Search for employees, documents, pages..."
                  className="w-full pl-12 pr-4 py-2 text-lg font-black bg-transparent border-none outline-none focus:ring-0 placeholder-slate-400 text-slate-800"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  data-gramm="false"
                  spellCheck={false}
                  autoComplete="off"
               />
               <div className="hidden sm:flex items-center space-x-1.5 ml-4 text-[10px] font-black text-[--text-muted] uppercase tracking-widest border border-[--border] px-2 py-1 rounded-lg">
                  <span>ESC</span>
               </div>
            </div>

            {/* Content Area */}
            <div className="p-4 max-h-[60vh] overflow-y-auto no-scrollbar space-y-8">
               {/* Quick Actions */}
               <div className="space-y-3">
                  <p className="text-[10px] font-black text-[--text-muted] uppercase tracking-[0.2em] px-3">Global Actions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                     {QUICK_ACTIONS.map((action, idx) => (
                        <button
                           key={idx}
                           onClick={() => navigateTo(action.href)}
                           className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-[--border]/40 group"
                        >
                           <div className={cn("w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-[--border]", action.color)}>
                              <action.icon size={20} className="group-hover:scale-110 transition-transform" />
                           </div>
                           <div className="text-left">
                              <h5 className="text-[13px] font-black text-slate-900 leading-none">{action.label}</h5>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Jump to Feature</p>
                           </div>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Recent Employees */}
               <div className="space-y-3">
                  <p className="text-[10px] font-black text-[--text-muted] uppercase tracking-[0.2em] px-3">Recent Employee Views</p>
                  <div className="space-y-1">
                     {RECENT_EMPLOYEES.map((emp) => (
                        <button
                           key={emp.id}
                           onClick={() => navigateTo(`/profile/${emp.id}`)}
                           className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[--brand-light]/30 group transition-all"
                        >
                           <div className="flex items-center space-x-4 text-left">
                              <div className="w-10 h-10 rounded-xl bg-[--brand] text-black flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-100 uppercase">
                                 {emp.initials}
                              </div>
                              <div>
                                 <h4 className="text-sm font-black text-slate-900 group-hover:text-[--brand] transition-colors">{emp.name}</h4>
                                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{emp.role} &bull; {emp.dep}</p>
                              </div>
                           </div>
                           <div className="opacity-0 group-hover:opacity-100 text-[--brand] transition-opacity">
                              <ExternalLink size={14} />
                           </div>
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Footer Palette Info */}
            <div className="p-4 bg-[--surface-alt]/50 border-t border-[--border] flex justify-between items-center px-8">
               <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                     <span className="w-5 h-5 rounded-md bg-white border border-[--border] flex items-center justify-center text-[10px] shadow-sm">
                        <Command size={10} />
                     </span>
                     <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">or CTRL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <span className="w-5 h-5 rounded-md bg-white border border-[--border] flex items-center justify-center text-[10px] shadow-sm font-bold">K</span>
                     <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Search Command</span>
                  </div>
               </div>
               <p className="text-[9px] font-black uppercase text-slate-400 italic">Phase 4 Polish Live</p>
            </div>
         </div>
      </div>
   );
}
