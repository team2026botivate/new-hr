'use client';

import { Calendar, ChevronRight, Moon, Sun, Flag } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { HOLIDAYS } from '@/lib/data/holidays';

/**
 * Upcoming Holiday card for the dashboard
 */
export default function HolidayCard() {
  const upcomingHolidays = HOLIDAYS.slice(0, 3);
  
  return (
    <div className="card-base h-full flex flex-col group/card relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[--info-light] rounded-full blur-3xl opacity-30" />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-[--brand]" />
          <h4 className="text-base font-semibold text-[--text-primary]">Upcoming Holidays</h4>
        </div>
        <div className="text-[10px] font-bold text-[--brand] uppercase tracking-widest bg-[--brand-light] px-2 py-0.5 rounded-full">
          Indian 2025
        </div>
      </div>

      <div className="space-y-4 flex-1 relative z-10">
        {upcomingHolidays.map((holiday, idx) => (
          <div key={idx} className="flex items-center p-3 rounded-2xl bg-[--surface-alt]/50 border border-transparent hover:border-[--border] hover:bg-white transition-all group">
            <div className={cn(
               "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm shrink-0",
               holiday.type === 'national' ? "bg-[--danger-light] text-[--danger]" :
               holiday.type === 'festival' ? "bg-[--warning-light] text-[--warning]" :
               "bg-[--info-light] text-[--info]"
            )}>
               {holiday.type === 'festival' ? <Moon size={18} /> : 
                holiday.type === 'national' ? <Flag size={18} /> : 
                <Sun size={18} />}
            </div>
            
            <div className="ml-3 flex-1 overflow-hidden">
               <p className="text-sm font-bold text-[--text-primary] truncate group-hover:text-[--brand] transition-colors">
                 {holiday.name}
               </p>
               <p className="text-[10px] text-[--text-secondary] font-medium">
                 {formatDate(holiday.date)}
               </p>
            </div>

            <div className="text-right ml-2">
               <div className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-wider mb-0.5">
                  {holiday.type}
               </div>
               <div className="text-[9px] font-bold text-[--brand] underline cursor-pointer">
                  See Leave
               </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-5 w-full py-2.5 rounded-xl border border-[--border] text-xs font-bold text-[--text-primary] hover:bg-[--surface-alt] transition-all flex items-center justify-center space-x-2 group/btn">
        <span>Public Calendar</span>
        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
