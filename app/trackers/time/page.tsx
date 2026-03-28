'use client';

import { useState, useEffect } from 'react';
import {
   Plus,
   Search,
   Filter,
   ChevronRight,
   Clock,
   CalendarDays,
   Target,
   Trash2,
   Briefcase,
   AlertCircle,
   Download,
   Pencil
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import LoadingSkeleton, { SkeletonItem } from '@/components/shared/LoadingSkeleton';
import SmartTable from '@/components/shared/SmartTable';
import { useToast } from '@/lib/hooks/useToast';
import { useUIStore } from '@/lib/store/uiStore';

/**
 * Time Tracker Page
 * Features a live task timer and weekly timesheet management
 */
export default function TimeTrackerPage() {
   const { addToast } = useToast();
   const { setFormActive } = useUIStore();
   const [isLoading, setIsLoading] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingLogId, setEditingLogId] = useState<number | null>(null);
   const [formData, setFormData] = useState({
      project: 'HRMS Phase 2',
      task: '',
      hours: '',
      date: new Date().toISOString().split('T')[0],
   });

   // Mock data for time logs
   const [timeLogs, setTimeLogs] = useState([
      { id: 1, date: '2025-03-27', project: 'HRMS Phase 2', task: 'Layout Components', hours: 4.5, status: 'approved' },
      { id: 2, date: '2025-03-27', project: 'Internal Admin', task: 'Review Meeting', hours: 1.5, status: 'approved' },
      { id: 3, date: '2025-03-26', project: 'HRMS Phase 2', task: 'State Management', hours: 6.0, status: 'approved' },
      { id: 4, date: '2025-03-25', project: 'Client - TechInc', task: 'Bug Fixing', hours: 3.2, status: 'approved' },
      { id: 5, date: '2025-03-28', project: 'HRMS Phase 2', task: 'Dashboard Widgets', hours: 2.1, status: 'pending' },
   ]);

   const handleManualSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingLogId) {
         // Update existing
         setTimeLogs(timeLogs.map(log => 
            log.id === editingLogId 
               ? { ...log, project: formData.project, task: formData.task, hours: parseFloat(formData.hours), date: formData.date }
               : log
         ));
         addToast({
            type: 'success',
            title: 'Log Updated!',
            message: `Updated task: ${formData.task}`,
         });
      } else {
         // Create new
         const newLog = {
            id: Date.now(),
            date: formData.date,
            project: formData.project,
            task: formData.task,
            hours: parseFloat(formData.hours),
            status: 'pending' as const,
         };
         setTimeLogs([newLog, ...timeLogs]);
         addToast({
            type: 'success',
            title: 'Time Logged!',
            message: `Successfully logged ${formData.hours}h for ${formData.project}`,
         });
      }

      setIsModalOpen(false);
      setEditingLogId(null);
      setFormData({
         project: 'HRMS Phase 2',
         task: '',
         hours: '',
         date: new Date().toISOString().split('T')[0],
      });
   };

   const handleDeleteLog = (id: number) => {
      const logToDelete = timeLogs.find(l => l.id === id);
      setTimeLogs(timeLogs.filter(log => log.id !== id));
      addToast({
         type: 'info',
         title: 'Log Deleted',
         message: `Removed log for ${logToDelete?.task}`,
      });
   };

   const handleEditClick = (log: any) => {
      setFormData({
         project: log.project,
         task: log.task,
         hours: log.hours.toString(),
         date: log.date,
      });
      setEditingLogId(log.id);
      setIsModalOpen(true);
   };

   useEffect(() => {
     setFormActive(isModalOpen);
     return () => setFormActive(false);
   }, [isModalOpen, setFormActive]);

   useEffect(() => {
      // Simulate initial data fetch
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
   }, []);

   const totalHoursToday = timeLogs
      .filter(log => log.date === '2025-03-28')
      .reduce((acc, log) => acc + log.hours, 0);

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Page Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-bold text-[--text-primary]">Time Tracker</h1>
               <p className="text-sm text-[--text-secondary]">Track your daily tasks and project hours.</p>
            </div>

            <div className="flex items-center space-x-3">
               <div className="flex items-center space-x-1.5 bg-[--brand-light] text-[--brand] px-4 py-2 rounded-xl text-xs font-bold border border-[--brand]/10">
                  <Clock size={16} />
                  <span>40.0h / 45.0h</span>
               </div>
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[--brand] text-black hover:bg-[--brand]/90 transition-all font-bold text-sm shadow-lg shadow-indigo-100/50 active:scale-95"
               >
                  <Plus size={18} />
                  <span>Log Manually</span>
               </button>
            </div>
         </div>

         {/* History Controls */}
         <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={18} />
               <input
                  type="text"
                  placeholder="Search logs, projects, or tasks..."
                  className="w-full bg-white border border-[--border] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 shadow-sm"
               />
            </div>

            <div className="flex items-center space-x-3">
               <select className="bg-white border border-[--border] rounded-xl px-4 py-2.5 text-sm font-bold text-[--text-primary] shadow-sm">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
               </select>

               <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-[--border] text-[--text-secondary] rounded-xl text-sm font-bold shadow-sm">
                  <Download className="mr-2" size={18} />
                  <span>Export</span>
               </button>
            </div>
         </div>

         {/* Timesheet List with Skeleton */}
         <LoadingSkeleton
            isLoading={isLoading}
            fallback={
               <div className="space-y-4">
                  <SkeletonItem className="h-12 w-full" />
                  <SkeletonItem className="h-24 w-full" />
                  <SkeletonItem className="h-24 w-full" />
               </div>
            }
         >
            <SmartTable
               data={timeLogs}
               columns={[
                  {
                     header: 'Date',
                     key: 'date',
                     render: (item) => (
                        <div>
                           <p className="text-xs font-bold text-[--text-primary]">{formatDate(item.date)}</p>
                           <p className="text-[9px] font-black text-[--text-secondary] uppercase tracking-widest">{item.date === '2025-03-28' ? 'Today' : 'Completed'}</p>
                        </div>
                     )
                  },
                  {
                     header: 'Project / Task',
                     key: 'task',
                     render: (item) => (
                        <div>
                           <div className="flex items-center space-x-2 mb-0.5">
                              <Briefcase size={12} className="text-[--brand]" />
                              <span className="text-[10px] font-bold text-[--brand] uppercase tracking-wide">{item.project}</span>
                           </div>
                           <p className="text-sm font-bold text-[--text-primary]">{item.task}</p>
                        </div>
                     )
                  },
                  {
                     header: 'Hours logged',
                     key: 'hours',
                     render: (item) => (
                        <p className="text-sm font-black text-[--text-primary] tabular-nums">{item.hours.toFixed(1)}h</p>
                     )
                  },
                  {
                     header: 'Status',
                     key: 'status',
                     render: (item) => (
                        <div className="flex items-center space-x-2">
                           <span className={cn(
                              "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                              item.status === 'approved' ? "bg-[--success-light] text-[--success]" : "bg-[--warning-light] text-[--warning]"
                           )}>
                              {item.status}
                           </span>
                        </div>
                     )
                  },
                  {
                     header: 'Actions',
                     key: 'actions',
                     className: 'text-right',
                     render: (item) => (
                        <div className="flex items-center justify-end space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 hover:bg-[--surface-alt] rounded-xl text-[--text-muted] transition-all">
                              <Plus size={16} />
                           </button>
                           <button className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl text-[--text-muted] transition-all">
                              <Trash2 size={16} />
                           </button>
                        </div>
                     )
                  },
               ]}
               mobileCardRender={(item) => (
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[--brand] uppercase">{item.project}</span>
                        <span className="text-[10px] font-bold text-[--text-muted]">{formatDate(item.date)}</span>
                     </div>
                     <div className="flex items-start justify-between">
                        <div className="pr-4">
                           <p className="text-sm font-bold text-[--text-primary] line-clamp-2 leading-tight">{item.task}</p>
                        </div>
                        <div className="text-right shrink-0">
                           <p className="text-lg font-black text-[--text-primary]">{item.hours.toFixed(1)}h</p>
                           <p className={cn(
                              "text-[8px] font-black uppercase tracking-widest ml-auto w-fit",
                              item.status === 'approved' ? "text-[--success]" : "text-[--warning]"
                           )}>{item.status}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-end space-x-4 pt-2 border-t border-[--border]">
                        <button className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-wider flex items-center space-x-1">
                           <Plus size={12} />
                           <span>Edit</span>
                        </button>
                        <button className="text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center space-x-1">
                           <Trash2 size={12} />
                           <span>Delete</span>
                        </button>
                     </div>
                  </div>
               )}
            />
         </LoadingSkeleton>

         {/* Manual Log Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start space-x-3 text-xs text-amber-800 font-medium animate-in zoom-in-95 delay-500">
             <AlertCircle size={18} className="shrink-0 text-amber-600" />
             <p>
                Forgot to start your timer? You can still
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="font-bold border-b border-amber-800 ml-1 mx-1"
                >
                  manually log hours
                </button>
                for any project before the end of the day.
             </p>
          </div>

         {/* Manual Time Log Modal */}
         {isModalOpen && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-in fade-in duration-300">
               <div 
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
                  onClick={() => setIsModalOpen(false)}
               />
               <div className="card-base w-full max-w-xl bg-white relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border-none text-black">
                  {/* Decorative Gradient Header */}
                  <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />
                  
                  <div className="p-8">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                              {editingLogId ? 'Edit Time Log' : 'Manual Time Log'}
                           </h2>
                           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                              {editingLogId ? 'Update your recorded hours' : 'Record your missed hours'}
                           </p>
                        </div>
                        <button 
                           onClick={() => {
                              setIsModalOpen(false);
                              setEditingLogId(null);
                           }}
                           className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all hover:rotate-90"
                        >
                           <Plus className="rotate-45" size={24} />
                        </button>
                     </div>

                     <form onSubmit={handleManualSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2 text-black">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Project</label>
                              <div className="relative group">
                                 <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
                                 <select 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand/50 transition-all appearance-none"
                                    value={formData.project}
                                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                 >
                                    <option>HRMS Phase 2</option>
                                    <option>Internal Admin</option>
                                    <option>Client - TechInc</option>
                                 </select>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Date</label>
                              <div className="relative group">
                                 <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
                                 <input 
                                    type="date"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand/50 transition-all font-mono"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Task Description</label>
                           <div className="relative group">
                              <Target size={16} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-brand transition-colors" />
                              <textarea 
                                 placeholder="Exactly what were you working on?"
                                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand/50 transition-all min-h-[100px] resize-none"
                                 value={formData.task}
                                 onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                                 required
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Hours Logged</label>
                           <div className="relative group">
                              <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
                              <input 
                                 type="number"
                                 step="0.5"
                                 placeholder="e.g. 4.5"
                                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand/50 transition-all"
                                 value={formData.hours}
                                 onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                                 required
                              />
                           </div>
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                           <button 
                              type="button"
                              onClick={() => {
                                 setIsModalOpen(false);
                                 setEditingLogId(null);
                              }}
                              className="flex-1 py-4 rounded-2xl text-sm font-black text-slate-500 hover:bg-slate-50 transition-all"
                           >
                              Cancel
                           </button>
                           <button 
                              type="submit"
                              className="flex-2 py-4 bg-brand text-black rounded-2xl text-sm font-black shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
                           >
                              {editingLogId ? 'Update Time Log' : 'Submit Time Log'}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
