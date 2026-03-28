'use client';

import { 
  CalendarDays, 
  Wallet, 
  Timer, 
  Receipt, 
  FileText, 
  UserCircle2,
  HelpCircle,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * Quick Links icon grid for the dashboard
 */
export default function QuickLinks() {
  const links = [
    { name: 'Apply Leave', icon: CalendarDays, href: '/trackers/leave', color: 'text-[--brand] bg-[--brand-light]' },
    { name: 'Payslip', icon: Wallet, href: '/salary/page.tsx', color: 'text-[--success] bg-[--success-light]' },
    { name: 'Add Time', icon: Timer, href: '/trackers/time', color: 'text-[--warning] bg-[--warning-light]' },
    { name: 'Reimbursement', icon: Receipt, href: '/trackers/reimbursement', color: 'text-[--info] bg-[--info-light]' },
    { name: 'Policy Doc', icon: FileText, href: '/organization', color: 'text-[--text-secondary] bg-[--surface-alt]' },
    { name: 'My Profile', icon: UserCircle2, href: '/profile/me', color: 'text-[--text-primary] bg-[--surface-alt]' },
  ];

  return (
    <div className="card-base h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Plus size={20} className="text-[--brand]" />
          <h4 className="text-base font-semibold text-[--text-primary]">Quick Actions</h4>
        </div>
        <HelpCircle size={16} className="text-[--text-muted] cursor-help" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[--border] hover:border-[--brand] hover:shadow-md transition-all group bg-white"
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110",
              link.color
            )}>
              <link.icon size={20} />
            </div>
            <span className="text-[10px] font-bold text-[--text-secondary] text-center uppercase tracking-wider group-hover:text-[--brand]">
              {link.name}
            </span>
          </Link>
        ))}
      </div>

      <button className="mt-5 w-full py-2.5 rounded-xl bg-[--surface-alt] text-xs font-bold text-[--text-primary] hover:bg-[--border] transition-all">
        Customize Links
      </button>
    </div>
  );
}
