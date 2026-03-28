import { create } from 'zustand';
import type { AttendanceRecord } from '@/types';
import { ATTENDANCE_RECORDS } from '@/lib/data/attendance';

interface AttendanceState {
  records: AttendanceRecord[];
  currentStatus: 'checked-in' | 'checked-out';
  lastPunchIn?: string;
  lastPunchOut?: string;
  timerSeconds: number;
  
  punchIn: (location: string) => void;
  punchOut: () => void;
  incrementTimer: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  records: ATTENDANCE_RECORDS,
  currentStatus: 'checked-out',
  timerSeconds: 0,

  punchIn: (location) => {
    const now = new Date();
    const punchInTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    set({
      currentStatus: 'checked-in',
      lastPunchIn: punchInTime,
      timerSeconds: 0,
    });
  },

  punchOut: () => {
    const { lastPunchIn, timerSeconds } = get();
    const now = new Date();
    const punchOutTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Calculate final duration: hours and minutes
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const durationStr = `${hours}h ${minutes}m`;

    const newRecord: AttendanceRecord = {
      date: now.toISOString().split('T')[0],
      employeeId: 'EMP087', // Demo user
      status: 'present',
      punchIn: lastPunchIn,
      punchOut: punchOutTime,
      duration: durationStr,
      location: 'Office - Bengaluru',
      isRegularized: false,
    };

    set((state) => ({
      records: [newRecord, ...state.records],
      currentStatus: 'checked-out',
      lastPunchOut: punchOutTime,
      timerSeconds: 0,
    }));
  },

  incrementTimer: () => {
    if (get().currentStatus === 'checked-in') {
      set((state) => ({ timerSeconds: state.timerSeconds + 1 }));
    }
  },
}));
