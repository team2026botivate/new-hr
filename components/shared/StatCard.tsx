'use client';

import { 
  LucideIcon, 
  TrendingUp, 
  TrendingDown, 
  Minus 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
  className?: string;
}

/**
 * High-Fidelity StatCard component for dashboard metrics
 */
export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor,
  className,
}: StatCardProps) {
  return (
    <div className={cn(
      "card-base group flex items-center justify-between transition-all duration-300 relative overflow-hidden active:scale-95",
      className
    )}>
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[--surface-alt] opacity-0 group-hover:opacity-100 transition-opacity rounded-full -mr-12 -mt-12 blur-3xl" />

      <div className="flex-1 relative z-10">
        <p className="text-[10px] font-black text-[--text-muted] uppercase tracking-[0.2em] mb-1 leading-none">
          {title}
        </p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
            {value}
          </h3>
          {change && (
            <div className={cn(
              "flex items-center space-x-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
              changeType === 'up' ? "bg-[--success-light]/50 text-[--success] border border-[--success]/10" : 
              changeType === 'down' ? "bg-red-50 text-red-500 border border-red-100" : 
              "bg-slate-100 text-slate-500 border border-slate-200"
            )}>
              {changeType === 'up' ? <TrendingUp size={10} /> : 
               changeType === 'down' ? <TrendingDown size={10} /> : 
               <Minus size={10} />}
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg relative overflow-hidden shimmer",
        iconColor
      )}>
        <Icon size={24} className="relative z-10" />
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
