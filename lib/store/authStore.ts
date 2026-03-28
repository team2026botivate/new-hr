import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Employee, Role } from '@/types';
import { EMPLOYEES } from '@/lib/data/employees';

interface AuthState {
  role: Role;
  user: Employee | null;
  isAuthenticated: boolean;
  setRole: (role: Role) => void;
  login: (role: Role) => void;
  logout: () => void;
  updateUser: (data: Partial<Employee>) => void;
}

/**
 * Demo Credentials mapping
 */
const DEMO_USERS = {
  admin: 'EMP001',   // Rajesh Sharma
  hr: 'EMP042',      // Priya Mehta
  employee: 'EMP087', // Arjun Nair
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'employee',
      user: null,
      isAuthenticated: false,
      setRole: (role) => {
        const userId = DEMO_USERS[role];
        const user = EMPLOYEES.find((e) => e.id === userId) || null;
        set({ role, user });
      },
      login: (role) => {
        const userId = DEMO_USERS[role];
        const user = EMPLOYEES.find((e) => e.id === userId) || null;
        set({ role, user, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false, role: 'employee' }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
    }),
    {
      name: 'hr-auth-storage', // persist to localStorage for demo
    }
  )
);
