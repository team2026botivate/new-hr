'use client';

import { UserPlus, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { EMPLOYEES } from '@/lib/data/employees';

/**
 * New Hires notification card for the dashboard
 */
export default function NewHiresCard() {
  // Demo: pick the latest 3 joiners
  const newHires = [...EMPLOYEES]
    .sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime())
    .slice(0, 3);

  return (
    <div className="card-base h-full flex flex-col relative overflow-hidden group">
      {/* Decorative background accent */}
      <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-[--brand-light] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500" />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center space-x-2">
          <UserPlus size={20} className="text-[--brand]" />
          <h4 className="text-base font-semibold text-[--text-primary]">New Hires</h4>
        </div>
        <div className="text-[10px] font-bold text-[--brand] uppercase tracking-widest bg-[--brand-light] px-2 py-0.5 rounded-full">
          Last 30 Days
        </div>
      </div>

      <div className="space-y-4 flex-1 relative z-10">
        {newHires.map((emp, idx) => (
          <div key={idx} className="flex items-center p-3 rounded-2xl bg-[--surface-alt]/50 border border-transparent hover:border-[--border] hover:bg-white transition-all group/item shadow-sm hover:shadow-md">
            {/* Avatar */}
            <div className={cn(
              "w-10 h-10 rounded-full bg-[--brand] text-black flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm shrink-0"
            )}>
              {emp.avatar}
            </div>

            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-xs font-bold text-[--text-primary] truncate">{emp.name}</p>
              <p className="text-[10px] text-[--text-secondary] truncate">{emp.designation}</p>
            </div>

            <div className="text-right ml-2 group/btn">
              <p className="text-[9px] font-extrabold uppercase text-[--text-secondary] mb-1">
                Joined {formatDate(emp.joiningDate).split(' ')[0]} {formatDate(emp.joiningDate).split(' ')[1]}
              </p>
              <button className="flex items-center space-x-1 text-[10px] font-bold text-[--brand] hover:underline group-hover/btn:translate-y-0 transition-all">
                <MessageSquare size={10} />
                <span>Say Hi</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-5 w-full py-2.5 rounded-xl border border-[--border] text-xs font-bold text-[--text-primary] hover:bg-[--surface-alt] transition-all flex items-center justify-center space-x-2 group/all">
        <span>Meet Team</span>
        <ChevronRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
