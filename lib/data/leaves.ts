import type { LeaveRequest } from '@/types';

export const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LV001',
    employeeId: 'EMP087', // Arjun Nair
    type: 'CL',
    fromDate: '2025-03-20',
    toDate: '2025-03-21',
    days: 2,
    reason: 'Personal work at home',
    status: 'approved',
    appliedOn: '2025-03-15',
    approvedBy: 'EMP042',
    isHalfDay: false,
  },
  {
    id: 'LV002',
    employeeId: 'EMP014', // Divya Rao
    type: 'SL',
    fromDate: '2025-03-24',
    toDate: '2025-03-24',
    days: 1,
    reason: 'Down with viral fever',
    status: 'pending',
    appliedOn: '2025-03-23',
    isHalfDay: false,
  },
  {
    id: 'LV003',
    employeeId: 'EMP016', // Ananya Pillai
    type: 'EL',
    fromDate: '2025-04-10',
    toDate: '2025-04-17',
    days: 6,
    reason: 'Family vacation to Ooty',
    status: 'pending',
    appliedOn: '2025-03-22',
    isHalfDay: false,
  },
  {
    id: 'LV004',
    employeeId: 'EMP021', // Sanjay Dubey
    type: 'CL',
    fromDate: '2025-03-28',
    toDate: '2025-03-28',
    days: 0.5,
    reason: 'Bank visit in afternoon',
    status: 'approved',
    appliedOn: '2025-03-25',
    approvedBy: 'EMP042',
    isHalfDay: true,
  },
  {
    id: 'LV005',
    employeeId: 'EMP009', // Amit Joshi
    type: 'SL',
    fromDate: '2025-03-10',
    toDate: '2025-03-10',
    days: 1,
    reason: 'Dengue recovery',
    status: 'rejected',
    appliedOn: '2025-03-09',
    approvedBy: 'EMP042',
    isHalfDay: false,
  },
  {
    id: 'LV006',
    employeeId: 'EMP001', // Rajesh Sharma
    type: 'PL',
    fromDate: '2025-05-15',
    toDate: '2025-05-30',
    days: 15,
    reason: 'Paternity leave',
    status: 'approved',
    appliedOn: '2025-03-01',
    approvedBy: 'EMP001', // Self approved for CTO
    isHalfDay: false,
  },
];

export const LEAVE_BALANCES = [
  { type: 'CL', name: 'Casual Leave', total: 12, used: 4, remaining: 8 },
  { type: 'SL', name: 'Sick Leave', total: 8, used: 3, remaining: 5 },
  { type: 'EL', name: 'Earned Leave', total: 15, used: 3, remaining: 12 },
  { type: 'CO', name: 'Comp Off', total: 5, used: 3, remaining: 2 },
];
