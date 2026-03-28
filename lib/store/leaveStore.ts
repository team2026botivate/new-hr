import { create } from 'zustand';
import type { LeaveRequest, LeaveType } from '@/types';
import { LEAVE_REQUESTS, LEAVE_BALANCES as INITIAL_BALANCES } from '@/lib/data/leaves';

interface LeaveBalance {
  type: LeaveType;
  name: string;
  total: number;
  used: number;
  remaining: number;
}

interface LeaveState {
  requests: LeaveRequest[];
  balances: LeaveBalance[];
  applyLeave: (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => void;
  updateRequestStatus: (id: string, status: LeaveRequest['status']) => void;
}

export const useLeaveStore = create<LeaveState>((set) => ({
  requests: LEAVE_REQUESTS,
  balances: INITIAL_BALANCES as any[],
  
  applyLeave: (newReq) => {
    const id = `LV${Math.floor(Math.random() * 900) + 100}`;
    const request: LeaveRequest = {
      ...newReq,
      id,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    set((state) => {
      // Update balances
      const newBalances = state.balances.map((b) => {
        if (b.type === request.type) {
          return {
            ...b,
            used: b.used + request.days,
            remaining: b.remaining - request.days,
          };
        }
        return b;
      });

      return {
        requests: [request, ...state.requests],
        balances: newBalances,
      };
    });
  },

  updateRequestStatus: (id, status) => {
    set((state) => ({
      requests: state.requests.map((r) => 
        r.id === id ? { ...r, status } : r
      ),
    }));
  },
}));
