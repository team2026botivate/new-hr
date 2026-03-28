'use client';

import { useState, useEffect } from 'react';
import {
   Calendar,
   ChevronLeft,
   ChevronRight,
   Info,
   MapPin,
   Clock,
   CheckCircle2,
   AlertCircle,
   HelpCircle,
   Download,
   Filter,
   MoreVertical,
   LogOut,
   LogIn
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import LoadingSkeleton, { SkeletonItem } from '@/components/shared/LoadingSkeleton';
import SmartTable from '@/components/shared/SmartTable';
import { useAttendanceStore } from '@/lib/store/attendanceStore';
import { useToast } from '@/lib/hooks/useToast';

/**
 * Attendance Tracker Page
 * Full-page heatmap and detailed punch-in/out records
 */
export default function AttendanceTrackerPage() {
   const { addToast } = useToast();
   const { records, currentStatus, punchIn, punchOut } = useAttendanceStore();
   const [isLoading, setIsLoading] = useState(true);
   const [activeDate, setActiveDate] = useState(new Date());
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
   }, []);

   // Dynamic Stats Calculation (Mock for Current Month: March 2025)
   const totalDays = 31;
   const presentDays = records.filter(r => r.status === 'present').length;
   const absentDays = records.filter(r => r.status === 'absent').length;
   const halfDays = records.filter(r => r.status === 'half-day').length;

   const getStatusFromRecords = (day: number) => {
      const dateStr = `2025-03-${day.toString().padStart(2, '0')}`;
      const record = records.find(r => r.date === dateStr);
      if (record) return record.status;
      
      // Default fallback logic for the heatmap
      if ([1, 2, 8, 9, 15, 16, 22, 23, 29, 30].includes(day)) return 'weekend';
      if ([14, 31].includes(day)) return 'holiday';
      if (day > 28) return 'none'; // Future dates
      return 'absent';
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'present': return 'bg-[--success]';
         case 'absent': return 'bg-[--danger]';
         case 'half-day': return 'bg-[--warning]';
         case 'holiday': return 'bg-[--info]';
         case 'weekend': return 'bg-[--surface-alt]';
         default: return 'bg-[--border]';
      }
   };

   const handleManualPunch = () => {
      if (!mounted) return;
      if (currentStatus === 'checked-out') {
         punchIn('Bengaluru Office');
         addToast({ type: 'success', title: 'Checked In', message: 'Signed in from Bengaluru Office.' });
      } else {
         punchOut();
         addToast({ type: 'success', title: 'Checked Out', message: 'Signed out successfully.' });
      }
   };

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Page Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-bold text-[--text-primary]">Attendance Tracker</h1>
               <p className="text-sm text-[--text-secondary]">Monitor your daily presence and regularization requests.</p>
            </div>

             <div className="flex items-center space-x-3">
                <button 
                  onClick={handleManualPunch}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-black shadow-lg transition-all",
                    currentStatus === 'checked-out' ? "bg-[--brand] text-black shadow-indigo-100" : "bg-[--danger] text-black shadow-rose-100"
                  )}
                >
                   {currentStatus === 'checked-out' ? <CheckCircle2 size={18} /> : <LogOut size={18} />}
                   <span>{currentStatus === 'checked-out' ? 'Punch In' : 'Punch Out'}</span>
                </button>
             </div>
         </div>

         {/* Monthly Heatmap Card */}
         <div className="card-base p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-8 border-b border-[--border] gap-6">
               <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 text-text-secondary">
                     <button className="p-2 hover:bg-surface-alt rounded-xl text-text-primary"><ChevronLeft size={20} /></button>
                     <h2 className="text-xl font-extrabold text-text-primary w-32 text-center">March 2025</h2>
                     <button className="p-2 hover:bg-surface-alt rounded-xl text-text-primary"><ChevronRight size={20} /></button>
                  </div>
                  <div className="h-8 w-px bg-[--border] hidden md:block" />
                   <div className="flex items-center space-x-4">
                      <div>
                         <p className="text-[10px] font-black text-[--text-secondary] uppercase tracking-[0.2em] leading-none mb-1">Total Days</p>
                         <p className="text-lg font-black text-[--text-primary] text-center">{totalDays}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none mb-1">Present</p>
                         <p className="text-lg font-black text-[--success] text-center">{presentDays}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] leading-none mb-1">Absent</p>
                         <p className="text-lg font-black text-[--danger] text-center">{absentDays}</p>
                      </div>
                   </div>
               </div>

               <div className="flex flex-wrap gap-4 px-4 py-2 bg-[--surface-alt]/50 rounded-2xl border border-[--border]">
                  {['Present', 'Half-Day', 'Absent', 'Holiday', 'Weekend'].map((s) => (
                     <div key={s} className="flex items-center space-x-1.5">
                        <div className={cn("w-2 h-2 rounded-full", getStatusColor(s.toLowerCase()))} />
                        <span className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-wider">{s}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Heatmap Grid (Full Page Version) */}
            <div className="grid grid-cols-7 gap-3 mb-8">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-[10px] font-black text-[--text-secondary] uppercase tracking-[0.2em] pb-3 border-b-2 border-slate-900">
                     {day}
                  </div>
               ))}
               {/* Space for Feb end (assuming start Saturday) */}
               {[...Array(5)].map((_, i) => <div key={`empty-${i}`} className="min-h-[60px]" />)}

               {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isToday = mounted && day === 28;
                  const status = getStatusFromRecords(day);

                  return (
                     <div
                        key={day}
                        className={cn(
                           "min-h-[60px] p-2 rounded-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col items-center justify-between border-2",
                           isToday ? "border-[--brand] shadow-lg shadow-indigo-100/50" : "border-transparent",
                           day > 28 ? "opacity-30" : "hover:scale-[1.02] bg-white"
                        )}
                        onClick={() => {
                          if (day <= 28) {
                            const dateStr = `2025-03-${day.toString().padStart(2, '0')}`;
                            const record = records.find(r => r.date === dateStr);
                            addToast({
                              type: 'info',
                              title: `${formatDate(dateStr)} Journal`,
                              message: record ? `Status: ${record.status}. Logged: ${record.punchIn} - ${record.punchOut}` : 'No attendance log found for this date.',
                            });
                          }
                        }}
                     >
                        <div className={cn("absolute inset-x-0 top-0 h-1.5", getStatusColor(status))} />
                        <span className={cn(
                           "text-sm font-black",
                           isToday ? "text-[--brand]" : status === 'weekend' ? "text-slate-400" : "text-[--text-primary]"
                        )}>
                           {day}
                        </span>

                        {day <= 28 && status !== 'weekend' && (
                           <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Clock size={10} className="text-[--text-muted]" />
                              <span className="text-[8px] font-black text-[--text-muted] whitespace-nowrap">
                                {status === 'absent' ? '0h' : '8h 45m'}
                              </span>
                           </div>
                        )}

                        {isToday && (
                           <span className="bg-[--brand] text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-full ring-2 ring-white z-10">Today</span>
                        )}
                     </div>
                  );
               })}
            </div>
         </div>

         {/* Detailed Logs Control */}
         <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-[--text-primary]">Daily Punch-In History</h4>
            <div className="flex items-center space-x-2">
               <button className="p-2 rounded-xl bg-white border border-[--border] text-text-primary hover:text-brand transition-colors"><Filter size={18} /></button>
            </div>
         </div>

         {/* Attendance Detail Table */}
         <LoadingSkeleton
            isLoading={isLoading}
            fallback={
               <div className="space-y-4">
                  <SkeletonItem className="h-20 w-full" />
                  <SkeletonItem className="h-20 w-full" />
                  <SkeletonItem className="h-20 w-full" />
               </div>
            }
         >
            <SmartTable
               data={records.map(r => ({ ...r, id: r.date }))}
               columns={[
                  {
                     header: 'Date',
                     key: 'date',
                     render: (item: any) => (
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-[--text-primary]">{formatDate(item.date)}</span>
                           <span className="text-[10px] text-[--text-secondary] font-black uppercase tracking-widest">{item.date === '2025-03-27' ? 'Yesterday' : 'Log'}</span>
                        </div>
                     )
                  },
                  {
                     header: 'Punch-In / Out',
                     key: 'punchIn',
                     render: (item: any) => (
                        <div className="flex items-center space-x-4">
                           <div className="flex items-center space-x-2">
                              <LogIn size={14} className="text-[--success]" />
                              <span className="text-xs font-bold text-[--text-primary] tabular-nums">{item.punchIn || '--:--'}</span>
                           </div>
                           <div className="flex items-center space-x-2">
                              <LogOut size={14} className="text-[--danger]" />
                              <span className="text-xs font-bold text-[--text-primary] tabular-nums">{item.punchOut || '--:--'}</span>
                           </div>
                        </div>
                     )
                  },
                  {
                     header: 'Duration',
                     key: 'duration',
                     render: (item: any) => (
                        <div className="flex items-center space-x-1.5">
                           <Clock size={14} className="text-[--text-muted]" />
                           <span className="text-xs font-black text-[--text-primary] tabular-nums">{item.duration || '0h 0m'}</span>
                        </div>
                     )
                  },
                  {
                     header: 'Location',
                     key: 'location',
                     render: (item: any) => (
                        <div className="flex items-center space-x-1.5">
                           {item.location && item.location !== '-' && <MapPin size={14} className="text-[--text-muted]" />}
                           <span className="text-xs text-[--text-secondary]">{item.location || '-'}</span>
                        </div>
                     )
                  },
                  {
                     header: 'Status',
                     key: 'status',
                     render: (item: any) => (
                        <div className={cn(
                           "px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex",
                           item.status === 'present' ? "bg-[--success-light] text-[--success]" :
                              item.status === 'absent' ? "bg-[--danger-light] text-[--danger]" :
                                 item.status === 'half-day' ? "bg-[--warning-light] text-[--warning]" :
                                    "bg-[--surface-alt] text-[--text-muted]"
                        )}>
                           {item.status}
                        </div>
                     )
                  },
               ]}
               mobileCardRender={(item: any) => (
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[--text-primary]">{formatDate(item.date)}</span>
                        <div className={cn(
                           "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                           item.status === 'present' ? "bg-[--success-light] text-[--success]" :
                              item.status === 'absent' ? "bg-[--danger-light] text-[--danger]" :
                                 "bg-[--surface-alt] text-[--text-muted]"
                        )}>{item.status}</div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                           <div className="w-8 h-8 rounded-xl bg-[--success-light] text-[--success] flex items-center justify-center">
                              <LogIn size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-bold text-[--text-muted] uppercase">In</p>
                              <p className="text-xs font-bold text-[--text-primary]">{item.punchIn || '--:--'}</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <div className="w-8 h-8 rounded-xl bg-[--danger-light] text-[--danger] flex items-center justify-center">
                              <LogOut size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-bold text-[--text-muted] uppercase">Out</p>
                              <p className="text-xs font-bold text-[--text-primary]">{item.punchOut || '--:--'}</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between pt-4 border-t border-[--border]">
                        <div className="flex items-center space-x-1.5">
                           <Clock size={14} className="text-[--text-muted]" />
                           <span className="text-xs font-black text-[--text-primary]">{item.duration || '0h 0m'}</span>
                        </div>
                        <button className="text-[10px] font-black text-brand uppercase tracking-wider px-3 py-1 bg-brand-light rounded-lg">Regularize</button>
                     </div>
                  </div>
               )}
            />
         </LoadingSkeleton>

         {/* Context Area */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            <div className="card-base bg-[--info-light]/20 border-[--info]/10">
               <h5 className="text-sm font-bold text-[--info] flex items-center mb-2">
                  <HelpCircle size={18} className="mr-2" />
                  What is Regularization?
               </h5>
               <p className="text-xs text-[--text-secondary] leading-relaxed">
                  Forget to punch in? Or was there a biometric error? You can use the **Regularize** button to request an update to your attendance logs for a specific day.
               </p>
            </div>
            <div className="card-base bg-[--warning-light]/20 border-[--warning]/10">
               <h5 className="text-sm font-bold text-[--warning] flex items-center mb-2">
                  <AlertCircle size={18} className="mr-2" />
                  Self-Service Rules
               </h5>
               <p className="text-xs text-[--text-secondary] leading-relaxed">
                  Attendance regularization is limited to 3 requests per month. Requests older than 30 days require direct HR approval.
               </p>
            </div>
         </div>
      </div>
   );
}
