import type { AttendanceRecord } from '@/types';

/**
 * Partial attendance for the last 5 days for main demo users
 * In a real app, this would be computed or fetched
 */
export const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  // Rajesh (CTO)
  { date: '2025-03-24', employeeId: 'EMP001', status: 'present', punchIn: '09:12 AM', punchOut: '07:45 PM', duration: '10h 33m', location: 'Office - Bengaluru', isRegularized: false },
  { date: '2025-03-25', employeeId: 'EMP001', status: 'present', punchIn: '09:30 AM', punchOut: '08:15 PM', duration: '10h 45m', location: 'Office - Bengaluru', isRegularized: false },
  { date: '2025-03-26', employeeId: 'EMP001', status: 'present', punchIn: '09:05 AM', punchOut: '06:30 PM', duration: '9h 25m', location: 'WFH', isRegularized: false },
  
  // Priya (HR)
  { date: '2025-03-24', employeeId: 'EMP042', status: 'present', punchIn: '10:05 AM', punchOut: '06:15 PM', duration: '8h 10m', location: 'Office - Mumbai', isRegularized: false },
  { date: '2025-03-25', employeeId: 'EMP042', status: 'present', punchIn: '09:45 AM', punchOut: '06:30 PM', duration: '8h 45m', location: 'Office - Mumbai', isRegularized: false },
  { date: '2025-03-26', employeeId: 'EMP042', status: 'half-day', punchIn: '09:30 AM', punchOut: '01:30 PM', duration: '4h 00m', location: 'Office - Mumbai', isRegularized: false },
  
  // Arjun (Employee)
  { date: '2025-03-24', employeeId: 'EMP087', status: 'present', punchIn: '10:15 AM', punchOut: '07:20 PM', duration: '9h 05m', location: 'Office - Bengaluru', isRegularized: false },
  { date: '2025-03-25', employeeId: 'EMP087', status: 'present', punchIn: '09:55 AM', punchOut: '08:00 PM', duration: '10h 05m', location: 'Office - Bengaluru', isRegularized: true },
  { date: '2025-03-26', employeeId: 'EMP087', status: 'absent', isRegularized: false },
];

/**
 * Summary for the dashboard heatmap/widget
 */
export const ATTENDANCE_SUMMARY = {
  present: 198,
  absent: 12,
  onLeave: 12,
  halfDay: 8,
  late: 24,
  onTime: 174,
};
