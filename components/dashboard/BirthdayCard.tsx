'use client';

import { useState } from 'react';
import { Cake, Sparkles, Send, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EMPLOYEES } from '@/lib/data/employees';
import { useToast } from '@/lib/hooks/useToast';

/**
 * Birthday notification card for the dashboard
 */
export default function BirthdayCard() {
  const { addToast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleWish = (name: string) => {
    setShowConfetti(true);
    addToast({
      type: 'success',
      title: 'Birthday Wish Sent!',
      message: `Your warm wishes have been sent to ${name}.`,
    });

    // Reset confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Demo: pick 2 random employees with birthdays
  const upcomingBirthdays = [
    { ...EMPLOYEES[5], date: 'Today' },
    { ...EMPLOYEES[8], date: 'Tomorrow' },
    { ...EMPLOYEES[12], date: '28 Mar' }
  ];

  return (
    <div className="card-base h-full flex flex-col relative overflow-hidden">
      {/* Confetti Animation Elements */}
      {showConfetti && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                top: `-20px`,
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
                transform: `translateY(${Math.random() * 300}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      )}

      {/* Decorative background accent */}
      <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[--warning-light] rounded-full blur-3xl opacity-50" />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center space-x-2">
          <Cake size={20} className="text-[--warning]" />
          <h4 className="text-base font-semibold text-[--text-primary]">Birthdays</h4>
        </div>
        <div className="text-[10px] font-bold text-[--warning] uppercase tracking-widest bg-[--warning-light] px-2 py-0.5 rounded-full">
          3 This Week 🥳
        </div>
      </div>

      <div className="space-y-4 flex-1 relative z-10">
        {upcomingBirthdays.map((emp, idx) => (
          <div key={idx} className="flex items-center p-3 rounded-2xl bg-[--surface-alt]/50 border border-transparent hover:border-[--border] hover:bg-white transition-all group">
            {/* Avatar */}
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm shrink-0",
              idx === 0 ? "bg-[--warning] text-black" : "bg-[--brand-light] text-[--brand]"
            )}>
              {emp.avatar}
            </div>

            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-xs font-bold text-[--text-primary] truncate">{emp.name}</p>
              <p className="text-[10px] text-[--text-secondary] truncate">{emp.designation}</p>
            </div>

            <div className="text-right ml-2">
              <p className={cn(
                "text-[10px] font-extrabold uppercase",
                idx === 0 ? "text-[--warning]" : "text-[--text-secondary]"
              )}>
                {emp.date}
              </p>
              {idx === 0 && (
                <button
                  onClick={() => handleWish(emp.name)}
                  className="mt-1 flex items-center space-x-1 text-[10px] font-bold text-[--brand] hover:underline group"
                >
                  <span>Wish Now</span>
                  <Send size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-5 w-full py-2.5 rounded-xl border border-[--border] text-xs font-bold text-[--text-primary] hover:bg-[--surface-alt] transition-all flex items-center justify-center space-x-2 group">
        <span>View Calendar</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
