/**
 * HR Management System — TypeScript Interfaces
 * Based on AGENTS.md spec
 */

export type Role = 'admin' | 'hr' | 'employee';
export type EmployeeStatus = 'active' | 'inactive' | 'probation' | 'notice';
export type LeaveType = 'CL' | 'SL' | 'EL' | 'CO' | 'ML' | 'PL';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'holiday' | 'weekend' | 'leave';
export type Department = 'Engineering' | 'HR' | 'Finance' | 'Sales' | 'Marketing' | 'Design' | 'Operations' | 'Legal';
export type ReimbursementStatus = 'pending' | 'approved' | 'rejected' | 'paid';
export type ReimbursementCategory = 'Food & Dining' | 'Travel & Lodging' | 'Training & Certification' | 'Home Office Expense' | 'Medical Outpatient' | 'Others';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: Department;
  location: string;
  joiningDate: string;
  salary: number;
  status: EmployeeStatus;
  reportingTo: string | null;
  avatar: string;             // initials fallback
  role: Role;
  bloodGroup: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  pan: string;
  aadhaar: string;            // always masked
  bankAccount: string;
  bankName: string;
  ifsc: string;
  emergencyContact: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approvedBy?: string;
  isHalfDay: boolean;
}

export interface AttendanceRecord {
  date: string;
  employeeId: string;
  status: AttendanceStatus;
  punchIn?: string;           // "09:32 AM"
  punchOut?: string;          // "06:48 PM"
  duration?: string;          // "9h 16m"
  location?: string;
  isRegularized: boolean;
}

export interface TimeLog {
  id: string;
  employeeId: string;
  date: string;
  projectId: string;
  taskName: string;
  hours: number;
  description: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

export interface SalarySlip {
  id: string;
  month: string;              // "March 2025"
  employeeId: string;
  basic: number;
  hra: number;
  specialAllowance: number;
  otherAllowances: number;
  grossEarnings: number;
  pf: number;
  professionalTax: number;
  tds: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  paidOn?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'policy' | 'event' | 'holiday' | 'general';
  postedBy: string;
  postedOn: string;
  isImportant: boolean;
}

export interface Holiday {
  date: string;
  name: string;
  type: 'national' | 'festival' | 'restricted';
}

export interface Project {
  id: string;
  name: string;
  client: string;
  budget: number;
  hoursLogged: number;
  status: 'active' | 'completed' | 'on-hold';
  members: string[];          // employee IDs
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'leave' | 'salary' | 'policy' | 'birthday' | 'reminder';
}

export interface ReimbursementClaim {
  id: string;
  employeeId: string;
  date: string;
  category: ReimbursementCategory;
  amount: number;
  description: string;
  status: ReimbursementStatus;
  receiptUrl?: string; // UI only for this demo
  appliedOn: string;
}

export interface JoiningRecord {
  id: string; // Alias for joining_id for SmartTable compatibility
  joining_id: string;
  name_as_per_aadhar: string;
  father_name: string;
  date_of_birth: string;
  gender: 'Male' | 'Female' | 'Other';
  department: string;
  mobile_no: string;
  personal_email: string;
  family_mobile_no: string;
  relationship_with_family: string;
  current_address: string;
  date_of_joining: string;
  designation: string;
  highest_qualification: string;
  aadhar_card_number: string;
  bank_account_no: string;
  ifsc_code: string;
  branch_name: string;
  passport_photo_url?: string;
  aadhar_card_url?: string;
  bank_passbook_url?: string;
  created_at?: string;
  updated_at?: string;
}
