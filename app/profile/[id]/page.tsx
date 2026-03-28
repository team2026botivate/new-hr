'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { EMPLOYEES } from '@/lib/data/employees';
import ProfileHero from '@/components/employee/ProfileHero';
import ProfileTabs from '@/components/employee/ProfileTabs';
import { useEffect, useState } from 'react';
import type { Employee } from '@/types';
import { ChevronLeft, Info, Bell, Calendar } from 'lucide-react';

/**
 * Employee Profile Page
 * Renders hero and tabbed content for a specific employee
 */
export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user: currentUser, isAuthenticated } = useAuthStore();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Demo: handle 'me' or specific ID
    const targetId = id === 'me' ? currentUser?.id : id;
    const found = EMPLOYEES.find(e => e.id === targetId);

    if (found) {
      setEmployee(found);
    }
  }, [id, currentUser, isAuthenticated, router]);

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full bg-[--surface-alt] animate-pulse mb-4" />
        <h2 className="text-xl font-bold text-[--text-primary]">Finding Employee...</h2>
        <p className="text-sm text-[--text-secondary]">Please wait while we retrieve the profile details.</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === employee.id;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Navigation & Context */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-sm font-bold text-[--text-secondary] hover:text-[--text-primary] transition-all group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-[10px] font-bold text-[--text-muted] uppercase tracking-widest bg-[--surface-alt] px-3 py-1.5 rounded-lg border border-[--border]">
            <Info size={14} className="text-[--brand]" />
            <span>Last active: 2 mins ago</span>
          </div>
        </div>
      </div>

      <ProfileHero employee={employee} isOwnProfile={isOwnProfile} />

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Tabs Content */}
        <div className="flex-1">
          <ProfileTabs employee={employee} isOwnProfile={isOwnProfile} />
        </div>

        {/* Right Sidebar Widgets */}
        <div className="xl:w-[320px] space-y-6 shrink-0">
          <ProfileSidebarWidgets />
        </div>
      </div>
    </div>
  );
}

/**
 * Sidebar widgets specific to the profile page
 */
function ProfileSidebarWidgets() {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Quick Stats / Achievements Placeholder */}
      <div className="card-base bg-gradient-to-br from-[--brand] to-indigo-700 text-black border-none shadow-indigo-200">
        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-80">System Activity</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-90">Leaves Taken</span>
            <span className="text-lg font-bold text-black">12 Days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-90">Attendance Score</span>
            <span className="text-lg font-bold text-black">98%</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-[--success] rounded-full" style={{ width: '98%' }} />
          </div>
        </div>
      </div>

      {/* Announcements Widget */}
      <div className="card-base">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[--text-secondary]">Updates</h4>
          <Bell size={16} className="text-[--text-muted]" />
        </div>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-3 items-start group cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-[--brand] mt-1.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-[--text-primary] group-hover:text-[--brand] transition-colors">New policy update on remote work</p>
                <p className="text-[10px] text-[--text-muted] mt-0.5">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colleagues on Leave */}
      <div className="card-base text-center">
        <Calendar size={24} className="mx-auto text-[--brand] mb-2 opacity-20" />
        <h4 className="text-xs font-bold text-[--text-primary] mb-1">Colleagues on Leave</h4>
        <p className="text-[10px] text-[--text-muted] mb-4">4 members from your team are away today</p>
        <div className="flex items-center justify-center -space-x-2">
          {['RS', 'PM', 'AN', 'SV'].map((initials, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-[--brand-light] text-[--brand] border-2 border-white flex items-center justify-center text-[10px] font-bold ring-1 ring-[--border]">
              {initials}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-[--surface-alt] text-[--text-secondary] border-2 border-white flex items-center justify-center text-[10px] font-bold">
            +2
          </div>
        </div>
        <button className="mt-5 w-full py-2 rounded-xl border border-[--border] text-[10px] font-bold text-[--text-secondary] hover:bg-[--surface-alt] transition-all">
          View Team Calendar
        </button>
      </div>
    </div>
  );
}
