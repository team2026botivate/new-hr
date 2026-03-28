import { create } from 'zustand';
import { ReimbursementClaim, ReimbursementStatus, ReimbursementCategory } from '@/types';

interface ReimbursementState {
  claims: ReimbursementClaim[];
  addClaim: (claim: Omit<ReimbursementClaim, 'id' | 'status' | 'appliedOn' | 'employeeId'>) => void;
  deleteClaim: (id: string) => void;
  getStats: () => { total: number; approved: number; processing: number };
}

const INITIAL_CLAIMS: ReimbursementClaim[] = [
  { 
    id: 'EXP-101', 
    employeeId: 'EMP087',
    date: '2025-03-24', 
    category: 'Travel & Lodging', 
    amount: 4500, 
    description: 'Client meeting travel to Mumbai office', 
    status: 'approved',
    appliedOn: '2025-03-24'
  },
  { 
    id: 'EXP-102', 
    employeeId: 'EMP087',
    date: '2025-03-22', 
    category: 'Food & Dining', 
    amount: 850, 
    description: 'Lunch with sales team', 
    status: 'approved',
    appliedOn: '2025-03-22'
  },
  { 
    id: 'EXP-103', 
    employeeId: 'EMP087',
    date: '2025-03-28', 
    category: 'Others', 
    amount: 2400, 
    description: 'Internet broadband recharge', 
    status: 'pending',
    appliedOn: '2025-03-28'
  },
  { 
    id: 'EXP-104', 
    employeeId: 'EMP087',
    date: '2025-03-15', 
    category: 'Training & Certification', 
    amount: 15600, 
    description: 'AWS Certification fee', 
    status: 'paid',
    appliedOn: '2025-03-15'
  },
  { 
    id: 'EXP-105', 
    employeeId: 'EMP087',
    date: '2025-03-10', 
    category: 'Food & Dining', 
    amount: 420, 
    description: 'Working late snacks', 
    status: 'rejected',
    appliedOn: '2025-03-10'
  },
];

export const useReimbursementStore = create<ReimbursementState>((set, get) => ({
  claims: INITIAL_CLAIMS,

  addClaim: (claimData) => {
    const newClaim: ReimbursementClaim = {
      ...claimData,
      id: `EXP-${Math.floor(Math.random() * 1000 + 200)}`,
      employeeId: 'EMP087',
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    set((state) => ({
      claims: [newClaim, ...state.claims],
    }));
  },

  deleteClaim: (id) => {
    set((state) => ({
      claims: state.claims.filter((c) => c.id !== id),
    }));
  },

  getStats: () => {
    const { claims } = get();
    return {
      total: claims.reduce((sum, c) => sum + c.amount, 0),
      approved: claims
        .filter((c) => c.status === 'approved' || c.status === 'paid')
        .reduce((sum, c) => sum + c.amount, 0),
      processing: claims
        .filter((c) => c.status === 'pending')
        .reduce((sum, c) => sum + c.amount, 0),
    };
  },
}));
