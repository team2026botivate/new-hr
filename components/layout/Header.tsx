'use client';

import {
  Search,
  Settings,
  MessageSquare,
  ChevronRight,
  User,
  ShieldCheck,
  Building2,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import RoleSwitcher from './RoleSwitcher';
import { usePathname } from 'next/navigation';
import NotificationPanel from './NotificationPanel';
import { useUIStore } from '@/lib/store/uiStore';

/**
 * High-Fidelity Header Component
 * Fulfills "colorful modern UI" from UI.md
 */
export default function Header() {
  const { user } = useAuthStore();
  const { isFormActive } = useUIStore();
  const pathname = usePathname();

  // Enhanced breadcrumb mapping for high-fidelity UI consistency
  const segmentMap: Record<string, string> = {
    'trackers': 'Operations',
    'leave': 'Leave Tracker',
    'time': 'Time Logs',
    'attendance': 'Attendance',
    'reimbursement': 'Reimbursement',
    'salary': 'Salary & Tax',
    'team': 'Team Hub',
    'finance': 'Finance Hub',
    'organization': 'Organization',
    'settings': 'Settings'
  };

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.length > 0
    ? pathSegments.map((seg) => segmentMap[seg.toLowerCase()] || (seg.charAt(0).toUpperCase() + seg.slice(1)))
    : ['Dashboard'];

  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 glass-effect border-b border-[--border] z-40 flex items-center justify-between px-6 transition-all duration-500 ease-in-out left-[var(--sidebar-width)]",
      isFormActive && "-translate-y-full opacity-0 pointer-events-none"
    )}>
      {/* Left: Breadcrumbs */}
      <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[--text-secondary]">
        <button
          className="hover:text-[--brand] transition-colors"
          onClick={() => window.location.href = '/'}
        >
          Home
        </button>
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight size={12} className="text-slate-300" />
            <span className={cn(
              "transition-colors",
              index === breadcrumbs.length - 1 ? "text-[--brand] font-black" : "text-slate-500"
            )}>
              {crumb}
            </span>
          </div>
        ))}
      </div>

      {/* Center: Search Visual Trigger */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <button
          className="w-full flex items-center px-4 py-2 bg-[--surface-alt]/50 hover:bg-[--surface-alt] border border-transparent hover:border-[--border] rounded-xl transition-all group"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        >
          <Search className="text-slate-400 group-hover:text-[--brand] transition-colors" size={16} />
          <span className="ml-3 text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
            Quick search for anything...
          </span>
          <div className="ml-auto flex items-center space-x-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold border border-[--border] px-1.5 py-0.5 rounded-md bg-white shadow-sm">⌘</span>
            <span className="text-[10px] font-bold border border-[--border] px-1.5 py-0.5 rounded-md bg-white shadow-sm">K</span>
          </div>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Role Switcher Pill - Demo Only */}
        <div className="hidden sm:block">
          <RoleSwitcher />
        </div>

        <div className="flex items-center space-x-2 border-l border-[--border] pl-4">
          <NotificationPanel />

          <button className="p-2.5 rounded-xl bg-white border border-[--border] text-[--text-secondary] shadow-sm hover:bg-slate-50 hover:text-[--brand] transition-all group">
            <MessageSquare size={20} className="group-hover:-translate-y-0.5" />
          </button>

          <button className="p-2.5 rounded-xl bg-white border border-[--border] text-[--text-secondary] shadow-sm hover:bg-slate-50 hover:text-[--brand] transition-all group">
            <Settings size={20} className="group-hover:rotate-45" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 border-l border-[--border] pl-4">
          <div className="hidden lg:block text-right">
            <p className="text-[11px] font-black text-slate-900 leading-none">{user?.name || 'Rajesh Sharma'}</p>
            <div className="flex items-center justify-end space-x-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[--success]" />
              <p className="text-[9px] font-bold text-[--text-secondary] uppercase tracking-tighter">{user?.role || 'Admin'}</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[--brand] to-[--brand-vibrant] text-black flex items-center justify-center font-black text-xs shadow-lg shadow-indigo-100 ring-2 ring-white hover:scale-105 transition-all">
            {(user?.name || 'R').charAt(0)}
          </button>
        </div>
      </div>
    </header>
  );
}
