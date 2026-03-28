import { create } from 'zustand';
import type { Employee, Department } from '@/types';
import { EMPLOYEES } from '@/lib/data/employees';

interface EmployeeState {
  employees: Employee[];
  filteredEmployees: Employee[];
  searchQuery: string;
  selectedDepartment: Department | 'All';
  setSearchQuery: (query: string) => void;
  setDepartment: (dept: Department | 'All') => void;
  getEmployeeById: (id: string) => Employee | undefined;
  applyFilters: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: EMPLOYEES,
  filteredEmployees: EMPLOYEES,
  searchQuery: '',
  selectedDepartment: 'All',
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },
  
  setDepartment: (dept) => {
    set({ selectedDepartment: dept });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { employees, searchQuery, selectedDepartment } = get();
    let filtered = [...employees];
    
    if (selectedDepartment !== 'All') {
      filtered = filtered.filter((e) => e.department === selectedDepartment);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.designation.toLowerCase().includes(q)
      );
    }
    
    set({ filteredEmployees: filtered });
  },
  
  getEmployeeById: (id) => {
    return get().employees.find((e) => e.id === id);
  },
}));
