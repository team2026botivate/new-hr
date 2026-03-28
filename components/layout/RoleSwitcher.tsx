'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { cn } from '@/lib/utils';
import { ShieldCheck, User, Users } from 'lucide-react';
import { useState } from 'react';
import type { Role } from '@/types';

/**
 * Demo Role Switcher pill component
 */
export default function RoleSwitcher() {
  const { role, setRole } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { id: Role, label: string, icon: any, color: string }[] = [
    { id: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-[--danger] bg-[--danger-light]' },
    { id: 'hr', label: 'HR Admin', icon: Users, color: 'text-[--brand] bg-[--brand-light]' },
    { id: 'employee', label: 'Employee', icon: User, color: 'text-[--success] bg-[--success-light]' },
  ];

  const currentRole = roles.find(r => r.id === role) || roles[2];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-transparent hover:border-[--border] transition-all",
          currentRole.color
        )}
      >
        <currentRole.icon size={14} />
        <span>{currentRole.label}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[--border] rounded-2xl shadow-xl p-2 z-100 animate-in fade-in slide-in-from-bottom-2">
          <p className="px-3 py-1 text-[10px] uppercase font-bold text-[--text-muted] tracking-widest mb-1">
            DEMO MODE — SWITCH ROLE
          </p>
          <div className="space-y-1">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRole(r.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm transition-all",
                  role === r.id 
                    ? "bg-[--brand-light] text-[--brand] font-semibold" 
                    : "text-[--text-secondary] hover:bg-[--surface-alt] hover:text-[--text-primary]"
                )}
              >
                <r.icon size={16} />
                <span className="flex-1 text-left">{r.label}</span>
                {role === r.id && <div className="w-1.5 h-1.5 rounded-full bg-[--brand]"></div>}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Click outside backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-99" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
