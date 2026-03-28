/**
 * HR Management System — Constants
 */

export const COMPANY_NAME = 'TechInfinia Solutions Pvt. Ltd.';

export const DEPARTMENTS = [
  'Engineering',
  'HR',
  'Finance',
  'Sales',
  'Marketing',
  'Design',
  'Operations',
  'Legal',
] as const;

export const LOCATIONS = [
  'Bengaluru',
  'Mumbai',
  'Delhi NCR',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Raipur',
] as const;

export const ROLES = ['admin', 'hr', 'employee'] as const;

export const LEAVE_TYPES = [
  { id: 'CL', name: 'Casual Leave', total: 12 },
  { id: 'SL', name: 'Sick Leave', total: 8 },
  { id: 'EL', name: 'Earned Leave', total: 15 },
  { id: 'ML', name: 'Maternity Leave', total: 180 },
  { id: 'PL', name: 'Paternity Leave', total: 15 },
] as const;

export const STATUS_COLORS = {
  present: 'success',
  absent: 'danger',
  'half-day': 'warning',
  holiday: 'info',
  weekend: 'muted',
  leave: 'warning',
  active: 'success',
  inactive: 'danger',
  probation: 'info',
  notice: 'warning',
};

export const REIMBURSEMENT_CATEGORIES = [
  'Food & Dining',
  'Travel & Lodging',
  'Training & Certification',
  'Home Office Expense',
  'Medical Outpatient',
  'Others',
] as const;
