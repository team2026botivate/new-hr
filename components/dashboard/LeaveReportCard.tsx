'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CalendarRange, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/hooks/useToast';

/**
 * High-Fidelity Leave Balance Donut Chart
 */
export default function LeaveReportCard() {
  const { addToast } = useToast();
  
  const data = [
    { name: 'Casual Leave', value: 8, total: 12, color: '#4F46E5', tint: 'bg-indigo-500' }, 
    { name: 'Sick Leave', value: 3, total: 8, color: '#10B981', tint: 'bg-emerald-500' }, 
    { name: 'Earned Leave', value: 5, total: 15, color: '#F59E0B', tint: 'bg-amber-500' }, 
    { name: 'Comp Off', value: 2, total: 5, color: '#3B82F6', tint: 'bg-blue-500' }, 
  ];

  const totalUsed = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="card-base h-full flex flex-col relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-inner">
             <CalendarRange size={20} />
          </div>
          <div>
            <h4 className="text-base font-black text-[--text-primary] tracking-tight italic">Leave Balance</h4>
            <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-0.5">Year 2025</p>
          </div>
        </div>
        <button 
          onClick={() => addToast({ type: 'info', title: 'Leave Summary', message: 'You have used 18 days out of 40 total annual leaves.' })}
          className="p-2 hover:bg-[--surface-alt] rounded-xl text-[--text-muted] transition-colors"
        >
          <Info size={16} />
        </button>
      </div>

      <div className="flex-1 relative min-h-[200px] flex items-center justify-center">
        {/* Centered Stats - Refined */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 translate-y-1">
          <p className="text-4xl font-black text-[--text-primary] tracking-tighter italic">{totalUsed}</p>
          <p className="text-[9px] font-black text-[--text-secondary] uppercase tracking-[0.2em] -mt-1">Days Used</p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={95}
              paddingAngle={6}
              dataKey="value"
              stroke="none"
              animationBegin={100}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                   key={`cell-${index}`} 
                   fill={entry.color} 
                   className="hover:opacity-80 transition-opacity cursor-pointer drop-shadow-sm" 
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0].payload;
                  return (
                    <div className="bg-[--text-primary] text-black p-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md">
                      <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-black/60">{entry.name}</p>
                      <p className="text-sm font-black italic">{entry.value} Days Used</p>
                      <p className="text-[8px] font-bold mt-1 text-black/40">Balance: {entry.total - entry.value} Days</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Block - High Fidelity */}
      <div className="grid grid-cols-2 gap-2.5 mt-4 relative z-10">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col p-2.5 rounded-2xl bg-[--surface-alt]/40 border border-transparent hover:border-[--border] hover:bg-white hover:shadow-sm transition-all group/item">
            <div className="flex items-center justify-between mb-1.5">
               <div className="flex items-center space-x-2">
                  <div className={cn("w-2 h-2 rounded-full", item.tint)} />
                  <span className="text-[9px] font-black text-[--text-primary] uppercase tracking-tight">{item.name.split(' ')[0]}</span>
               </div>
               <span className="text-[9px] font-black text-[--text-muted] tabular-nums">{item.value}/{item.total}</span>
            </div>
            
            <div className="w-full h-1 bg-[--border] rounded-full overflow-hidden">
               <div 
                 className={cn("h-full rounded-full transition-all duration-1000", item.tint)}
                 style={{ width: `${(item.value / item.total) * 100}%` }}
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
