'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Timer, TrendingUp, Info, ChevronRight } from 'lucide-react';
import { useToast } from '@/lib/hooks/useToast';
import { cn } from '@/lib/utils';

/**
 * High-Fidelity Weekly Time Log Bar Chart
 */
export default function TimelogCard() {
  const { addToast } = useToast();

  const data = [
    { day: 'Mon', hours: 8.5 },
    { day: 'Tue', hours: 9.2 },
    { day: 'Wed', hours: 7.8 },
    { day: 'Thu', hours: 9.5 },
    { day: 'Fri', hours: 6.5 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ];

  const avgHours = data.reduce((acc, d) => acc + d.hours, 0) / 5; // Weekdays only
  const today = 'Thu';

  return (
    <div className="card-base h-full flex flex-col relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-inner">
            <Timer size={20} />
          </div>
          <div>
            <h4 className="text-base font-black text-[--text-primary] tracking-tight italic">Activity Log</h4>
            <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-0.5">Weekly Usage</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border border-emerald-100 italic">
          <TrendingUp size={10} />
          <span>+5% Opt</span>
        </div>
      </div>

      <div className="mt-4 mb-6 relative z-10">
        <p className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-widest leading-none mb-1">Weekly Average</p>
        <p className="text-2xl font-black text-[--text-primary] tracking-tighter italic">
          {avgHours.toFixed(1)} <span className="text-sm font-bold text-[--text-muted] not-italic ml-1">hrs / Day</span>
        </p>
      </div>

      <div className="flex-1 min-h-[200px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F3F7" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#6B7280', fontWeight: 800 }}
              dy={10}
            />
            <YAxis hide domain={[0, 12]} />
            <Tooltip
              cursor={{ fill: '#F8F9FB', radius: 8 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[--text-primary] text-black p-2.5 rounded-xl shadow-2xl border border-white/10 backdrop-blur-md">
                      <p className="text-[10px] font-black italic">{payload[0].value} Hours Logged</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="hours"
              radius={[6, 6, 6, 6]}
              barSize={20}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.day === today ? '#4F46E5' : '#E2E8F0'}
                  className="transition-all hover:opacity-80 drop-shadow-sm"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <p className="text-[9px] font-black text-[--text-muted] uppercase tracking-[0.2em]">Total Week</p>
          <p className="text-sm font-black text-[--text-primary] italic">41.5 hrs</p>
        </div>

        <button
          onClick={() => addToast({ type: 'info', title: 'Worklog Export', message: 'Generating summary report for HRMS Phase 2...' })}
          className="px-4 py-2 rounded-xl bg-[--surface-alt] text-[10px] font-black text-[--text-primary] uppercase tracking-widest hover:bg-[--border] transition-all flex items-center space-x-2"
        >
          <span>Daily View</span>
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
