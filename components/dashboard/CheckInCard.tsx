'use client';

import { useState, useEffect } from 'react';
import { Clock, Play, Square, MapPin, History, Coffee, Sunset } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import { useAttendanceStore } from '@/lib/store/attendanceStore';
import { useToast } from '@/lib/hooks/useToast';

/**
 * Check-in/out card with timer and punch history
 */
export default function CheckInCard() {
  const { user } = useAuthStore();
  const { 
    currentStatus, 
    timerSeconds, 
    lastPunchIn, 
    punchIn, 
    punchOut, 
    incrementTimer 
  } = useAttendanceStore();
  const { addToast } = useToast();
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  const isCheckIn = currentStatus === 'checked-in';

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
      if (isCheckIn) {
        incrementTimer();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isCheckIn, incrementTimer]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckInOut = () => {
    if (!isCheckIn) {
      punchIn('Office - Bengaluru');
      addToast({
        type: 'success',
        title: 'Check-In Successful',
        message: 'Your timer has started. Have a productive day!',
      });
    } else {
      punchOut();
      addToast({
        type: 'info',
        title: 'Checked Out',
        message: 'Great work today! Your session has been recorded.',
      });
    }
  };

  return (
    <div className="card-base h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-base font-semibold text-[--text-primary]">Attendance</h4>
        <div className="flex items-center space-x-1.5 bg-[--brand-light] text-[--brand] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <MapPin size={12} />
          <span>{user?.location?.split(',')[0] || 'Remote'}</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 py-4">
        <div className="text-4xl font-extrabold tracking-tight text-[--text-primary] mb-1">
          {mounted && time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
        </div>
        <div className="text-xs font-medium text-[--text-secondary] mb-8">
          {mounted && time ? time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }) : '---'}
        </div>

        {/* Timer Display */}
        <div className="w-full bg-[--surface-alt] rounded-2xl p-4 flex items-center justify-around mb-8">
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-[--text-secondary] mb-1">Duration</p>
            <p className="text-xl font-bold text-[--text-primary] tabular-nums font-mono">
              {formatTimer(timerSeconds)}
            </p>
          </div>
          <div className="w-px h-8 bg-[--border]" />
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-[--text-secondary] mb-1">Break Time</p>
            <p className="text-xl font-bold text-[--text-secondary] tabular-nums">00:15:00</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCheckInOut}
          className={cn(
            "w-full py-4 rounded-2xl flex items-center justify-center space-x-3 text-sm font-black transition-all shadow-lg active:scale-[0.98]",
            isCheckIn 
              ? "bg-danger text-black hover:bg-danger/90 shadow-red-200" 
              : "bg-brand text-black hover:bg-brand/90 shadow-indigo-200"
          )}
        >
          {isCheckIn ? (
            <>
              <Square size={20} className="fill-black" />
              <span>Punch Out</span>
            </>
          ) : (
            <>
              <Play size={20} className="fill-black" />
              <span>Punch In Now</span>
            </>
          )}
        </button>
      </div>

      {/* History Snapshot */}
      <div className="mt-6 pt-6 border-t border-[--border]">
        <div className="flex items-center justify-between text-xs font-semibold mb-3">
          <span className="text-[--text-secondary]">Today&apos;s Logs</span>
          <button className="text-[--brand] hover:underline flex items-center space-x-1">
            <History size={12} />
            <span>View All</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {(isCheckIn || lastPunchIn) ? (
            <div className="flex items-center justify-between text-xs bg-[--surface-alt] p-2.5 rounded-xl border border-[--border]">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center",
                  isCheckIn ? "bg-[--success-light] text-[--success]" : "bg-red-50 text-red-500"
                )}>
                   {isCheckIn ? <Play size={10} className="fill-current" /> : <Square size={10} className="fill-current" />}
                </div>
                <span className="font-semibold text-[--text-primary]">{isCheckIn ? 'Active Session' : 'Last Punch Out'}</span>
              </div>
              <span className="text-[--text-secondary]">{isCheckIn ? lastPunchIn : 'Recorded'}</span>
            </div>
          ) : (
             <div className="text-center py-2 text-[--text-muted] text-[10px] font-medium italic">
               No activity recorded yet today
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
