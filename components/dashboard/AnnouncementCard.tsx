'use client';

import { Megaphone, MessageSquare, ChevronRight, Pin } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { ANNOUNCEMENTS } from '@/lib/data/announcements';

/**
 * Announcement feed for the dashboard
 */
export default function AnnouncementCard() {
  return (
    <div className="card-base h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Megaphone size={20} className="text-[--brand]" />
          <h4 className="text-base font-semibold text-[--text-primary]">Announcements</h4>
        </div>
        <button className="text-[--brand] hover:underline text-xs font-bold">View All</button>
      </div>

      <div className="space-y-4 flex-1">
        {ANNOUNCEMENTS.slice(0, 4).map((ann, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="flex items-start space-x-3">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                ann.isImportant ? "bg-[--danger] shadow-sm shadow-red-200" : "bg-[--border]"
              )} />
              
              <div className="flex-1 overflow-hidden">
                 <div className="flex items-center justify-between mb-1">
                   <h5 className="text-sm font-bold text-[--text-primary] truncate group-hover:text-[--brand] transition-colors uppercase">
                     {ann.title}
                   </h5>
                   {ann.isImportant && (
                     <Pin size={12} className="text-[--danger] rotate-45 shrink-0 ml-2" />
                   )}
                 </div>
                 
                 <p className="text-xs text-[--text-secondary] line-clamp-2 mb-2 italic">
                   &quot;{ann.content}&quot;
                 </p>
                 
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <span className={cn(
                       "text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider",
                       ann.category === 'policy' ? "bg-[--brand-light] text-[--brand]" :
                       ann.category === 'event' ? "bg-[--warning-light] text-[--warning]" :
                       ann.category === 'holiday' ? "bg-[--info-light] text-[--info]" :
                       "bg-[--surface-alt] text-[--text-primary]"
                     )}>
                       {ann.category}
                     </span>
                     <span className="text-[9px] font-bold text-[--text-secondary]">{formatDate(ann.postedOn)}</span>
                   </div>
                   
                   <div className="flex items-center -space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-5 h-5 rounded-full bg-[--brand-light] text-[--brand] border border-white flex items-center justify-center text-[8px] font-bold">PM</div>
                     <div className="w-5 h-5 rounded-full bg-[--surface-alt] text-[--text-secondary] border border-white flex items-center justify-center text-[8px] font-bold">+2</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-2.5 rounded-xl border border-[--border] text-xs font-bold text-[--text-primary] hover:bg-[--surface-alt] transition-all flex items-center justify-center space-x-2 group">
        <span>Post Announcement</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
