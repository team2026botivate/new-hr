'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  Timer,
  Wallet,
  History,
  CalendarDays,
  Receipt,
  Settings,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Zap,
  ClipboardCheck,
  UserPlus,
  MessageSquareText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/store/uiStore';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';

/**
 * High-Fidelity Sidebar Component
 * Fulfills "colorful modern UI" and RBAC from AGENTS.md
 */
export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, isFormActive } = useUIStore();
  const { role, logout } = useAuthStore();

  // Initialize trackersOpen to true if the current path is within /trackers
  const isTrackerPath = pathname?.startsWith('/trackers');
  const [trackersOpen, setTrackersOpen] = useState(isTrackerPath);

  // Role-Based Navigation Filter
  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['admin', 'hr', 'employee'] },
    { name: 'Team Hub', href: '/team', icon: Users, roles: ['admin', 'hr', 'employee'] },
    { name: 'NOC Tracker', href: '/noc', icon: ClipboardCheck, roles: ['admin', 'hr'] },
    { name: 'Article Reg', href: '/article', icon: UserPlus, roles: ['admin', 'hr'] },
    {
      name: 'Operations',
      href: '/trackers',
      icon: Briefcase,
      roles: ['admin', 'hr', 'employee'],
      children: [
        { name: 'Leave Tracker', href: '/trackers/leave', icon: CalendarDays },
        { name: 'Time Logs', href: '/trackers/time', icon: Timer },
        { name: 'Attendance', href: '/trackers/attendance', icon: History },
        { name: 'Reimbursement', href: '/trackers/reimbursement', icon: Receipt },
      ]
    },
    { name: 'Salary & Tax', href: '/salary', icon: Wallet, roles: ['admin', 'hr', 'employee'] },
    { name: 'Feedback', href: '/feedback', icon: MessageSquareText, roles: ['admin', 'hr', 'employee'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin', 'hr', 'employee'] },
  ].filter(item => item.roles.includes(role || 'employee'));

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-60 bg-white border-r border-[--border] transition-all duration-500 ease-in-out flex flex-col shadow-xl md:shadow-none',
        sidebarOpen ? 'w-60' : 'w-16',
        isFormActive && '-translate-x-full opacity-0 pointer-events-none'
      )}
    >
      {/* Sidebar Logo Header */}
      <div className="h-16 flex items-center px-5 border-b border-[--border] shrink-0">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100 transition-transform hover:rotate-6 active:scale-95 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-vibrant) 100%)' }}
        >
          <Building2 className="text-black w-6 h-6" />
        </div>
        {sidebarOpen && (
          <div className="ml-3 overflow-hidden animate-in fade-in slide-in-from-left-2 transition-all">
            <span className="block font-black text-base text-slate-900 tracking-tighter leading-none">techinfinia</span>
            <span className="text-[9px] font-bold text-[--text-secondary] uppercase tracking-widest">Enterprise HR</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-2 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-none">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.children?.some(c => pathname === c.href));
          const hasChildren = !!item.children;

          if (hasChildren) {
            return (
              <div key={item.name} className="space-y-1">
                <button
                  onClick={() => {
                    if (!sidebarOpen) {
                      toggleSidebar();
                      setTrackersOpen(true);
                    } else {
                      setTrackersOpen(!trackersOpen);
                    }
                  }}
                  className={cn(
                    'w-full flex items-center px-3 py-3 rounded-2xl transition-all group relative',
                    isActive
                      ? 'bg-[--brand-light] text-[--brand] shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <item.icon size={20} className={cn("shrink-0 transition-transform group-hover:scale-110", isActive && "text-[--brand]")} />
                  {sidebarOpen && (
                    <div className="flex-1 flex items-center justify-between ml-3 truncate text-left">
                      <span className="font-bold text-[13px] tracking-tight">{item.name}</span>
                      <ChevronDown
                        size={14}
                        className={cn('transition-transform duration-300', trackersOpen ? 'rotate-180' : 'opacity-40')}
                      />
                    </div>
                  )}
                  {!sidebarOpen && (
                    <div className="absolute left-16 invisible group-hover:visible bg-slate-900 text-black text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl whitespace-nowrap z-60 shadow-xl animate-in fade-in slide-in-from-left-2">
                      {item.name}
                    </div>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[--brand-vibrant] rounded-r-full" />
                  )}
                </button>

                {sidebarOpen && trackersOpen && item.children && (
                  <div className="ml-5 pl-4 border-l-2 border-slate-100 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-300">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            'flex items-center space-x-2 px-3 py-2 rounded-xl text-[12px] transition-all group',
                            isChildActive
                              ? 'text-[--brand] font-black bg-[--brand-light]/50'
                              : 'text-slate-500 font-semibold hover:text-slate-900 hover:translate-x-1'
                          )}
                        >
                          <child.icon size={14} className={cn(isChildActive ? "text-[--brand]" : "text-slate-400")} />
                          <span>{child.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-3 rounded-2xl transition-all group relative border border-transparent',
                isActive
                  ? 'bg-gradient-to-r from-[--brand-light] to-white text-[--brand] border-[--border]/50 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <item.icon size={20} className={cn("shrink-0 transition-transform group-hover:scale-110", isActive && "text-[--brand]")} />
              {sidebarOpen && (
                <span className="ml-3 font-bold text-[13px] tracking-tight truncate">{item.name}</span>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[--brand-vibrant] rounded-r-full shadow-[2px_0_8px_var(--brand-vibrant)]" />
              )}
              {!sidebarOpen && (
                <div className="absolute left-16 invisible group-hover:visible bg-slate-900 text-black text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl whitespace-nowrap z-60 shadow-xl animate-in fade-in slide-in-from-left-2">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[--border] bg-slate-50/50">
        {role && sidebarOpen && (
          <div className="p-3 rounded-2xl bg-white border border-[--border] shadow-sm mb-4 animate-in fade-in duration-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-r from-[--brand] to-[--brand-vibrant] flex items-center justify-center text-black shadow-lg">
                {role.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-black text-slate-900 truncate leading-none mb-1">Rajesh Sharma</p>
                <div className="flex items-center space-x-1">
                  <ShieldCheck size={10} className="text-[--brand-vibrant]" />
                  <p className="text-[9px] font-bold text-[--text-secondary] uppercase tracking-tighter truncate">{role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSidebar}
            className="flex-1 flex items-center justify-center h-10 text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-[--border] rounded-xl transition-all"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>

          <button
            onClick={handleLogout}
            className={cn(
              "h-10 rounded-xl flex items-center justify-center transition-all",
              sidebarOpen ? "px-4 flex-[2] bg-red-50 text-red-500 hover:bg-red-100 font-bold text-xs" : "w-10 text-red-400 hover:bg-red-50"
            )}
            title="Logout"
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
