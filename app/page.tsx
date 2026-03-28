'use client';

import MainStats from '@/components/dashboard/MainStats';
import CheckInCard from '@/components/dashboard/CheckInCard';
import BirthdayCard from '@/components/dashboard/BirthdayCard';
import NewHiresCard from '@/components/dashboard/NewHiresCard';
import AttendanceWidget from '@/components/dashboard/AttendanceWidget';
import LeaveReportCard from '@/components/dashboard/LeaveReportCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import HolidayCard from '@/components/dashboard/HolidayCard';
import TimelogCard from '@/components/dashboard/TimelogCard';
import ApprovalRequests from '@/components/dashboard/ApprovalRequests';
import QuickLinks from '@/components/dashboard/QuickLinks';
import StatusInputCard from '@/components/dashboard/StatusInputCard';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sparkles, Zap, Calendar, MapPin } from 'lucide-react';

/**
 * High-Fidelity Home Dashboard
 * Following colourful modern UI from UI.md
 */
export default function Home() {
   const { role, user } = useAuthStore();
   const router = useRouter();

   // Simple demo auth check
   useEffect(() => {
      if (!role) {
         router.push('/login');
      }
   }, [role, router]);

   if (!role || !user) return null;

   return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

         {/* Premium Welcome Hero */}
         <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 sm:p-12 text-white shadow-2xl">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[--brand] rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-[--brand-vibrant] rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[--brand-vibrant] text-[10px] font-black uppercase tracking-widest">
                     <Sparkles size={12} />
                     <span>Live Insights Platform</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
                     Good Morning, <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{user.name.split(' ')[0]}</span>
                     <span className="ml-3 animate-bounce inline-block">👋</span>
                  </h1>
                  <p className="text-slate-400 font-medium max-w-md text-sm sm:text-base leading-relaxed">
                     You have <span className="text-white font-bold">2 pending approvals</span> and a team meeting at <span className="text-[--brand-vibrant] font-black">11:30 AM</span>.
                  </p>
               </div>

               <div className="flex flex-wrap gap-4">
                  {[
                     { label: 'Location', val: user.location, icon: MapPin },
                     { label: 'Date', val: '14 Mar 2025', icon: Calendar },
                     { label: 'Efficiency', val: '94%', icon: Zap }
                  ].map((item, idx) => (
                     <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 min-w-[120px]">
                        <div className="flex items-center space-x-2 text-slate-400 mb-1">
                           <item.icon size={12} />
                           <span className="text-[9px] font-black uppercase tracking-widest leading-none">{item.label}</span>
                        </div>
                        <p className="text-xs font-black tracking-tight">{item.val}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Employee Quick Status Update */}
         <StatusInputCard />

         {/* Main Stats (Top Row) */}
         <MainStats />

         {/* 12-Column Grid of Modules */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

            {/* Row 1: Focus Cards */}
            <div className="md:col-span-4 h-full">
               <CheckInCard />
            </div>
            <div className="md:col-span-4 h-full">
               <BirthdayCard />
            </div>
            <div className="md:col-span-4 h-full">
               <NewHiresCard />
            </div>

            {/* Row 2: Analytics & Reports */}
            <div className="md:col-span-7">
               <AttendanceWidget />
            </div>
            <div className="md:col-span-5">
               <LeaveReportCard />
            </div>

            {/* Row 3: Updates & Feeds */}
            <div className="md:col-span-4">
               <AnnouncementCard />
            </div>
            <div className="md:col-span-4 border-l border-r border-[--border] px-0 md:px-8">
               <HolidayCard />
            </div>
            <div className="md:col-span-4">
               <TimelogCard />
            </div>

            {/* Row 4: HR Processes */}
            <div className="md:col-span-8">
               <ApprovalRequests />
            </div>
            <div className="md:col-span-4">
               <QuickLinks />
            </div>

         </div>

         {/* Modern Draggable Favourites Bar Replacement */}
         <div className="pt-8 border-t border-[--border]">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Team Quick-Dial</h4>
               <button className="text-[10px] font-black text-[--brand] uppercase tracking-widest hover:underline">Customize Workspace</button>
            </div>
            <div className="flex items-center space-x-4">
               {[...Array(5)].map((_, i) => (
                  <div
                     key={i}
                     className="w-16 h-16 rounded-3xl bg-white border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-[--brand] hover:text-[--brand] transition-all cursor-pointer group"
                  >
                     <span className="text-2xl font-black group-hover:scale-110 transition-transform">+</span>
                  </div>
               ))}
               <div className="bg-slate-100/50 rounded-2xl p-4 border border-slate-200/50 max-w-[200px]">
                  <p className="text-[10px] text-slate-500 font-bold leading-normal italic tracking-tight">
                     &quot;Drag any employee card here to pin them for faster access.&quot;
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
