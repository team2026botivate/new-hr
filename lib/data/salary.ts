import type { SalarySlip } from '@/types';

/**
 * Breakdown for a sample monthly salary
 * Calculation: Basic (50%), HRA (40% of Basic), Special Allowance (Remainder)
 */
export function calculateSalaryBreakdown(ctoPerYear: number): Omit<SalarySlip, 'id' | 'month' | 'employeeId'> {
  const annualGross = ctoPerYear;
  const monthlyGross = Math.round(annualGross / 12);
  
  const basic = Math.round(monthlyGross * 0.5);
  const hra = Math.round(basic * 0.4);
  const specialAllowance = Math.round(monthlyGross - basic - hra - 5000); // 5000 for other bits
  const otherAllowances = 5000;
  
  const pf = Math.round(basic * 0.12);
  const professionalTax = 200;
  const tds = Math.round(monthlyGross * 0.1); // Simplified 10% tax
  const otherDeductions = 500;
  
  const totalDeductions = pf + professionalTax + tds + otherDeductions;
  const netPay = monthlyGross - totalDeductions;
  
  return {
    basic,
    hra,
    specialAllowance,
    otherAllowances,
    grossEarnings: monthlyGross,
    pf,
    professionalTax,
    tds,
    otherDeductions,
    totalDeductions,
    netPay,
  };
}

export const SALARY_HISTORY: SalarySlip[] = [
  {
    id: 'SLIP001',
    month: 'March 2025',
    employeeId: 'EMP001',
    ...calculateSalaryBreakdown(285000 * 12),
    paidOn: '2025-03-31',
  },
  {
    id: 'SLIP002',
    month: 'March 2025',
    employeeId: 'EMP042',
    ...calculateSalaryBreakdown(195000 * 12),
    paidOn: '2025-03-31',
  },
  {
    id: 'SLIP003',
    month: 'March 2025',
    employeeId: 'EMP087',
    ...calculateSalaryBreakdown(110000 * 12),
    paidOn: '2025-03-31',
  },
  {
    id: 'SLIP004',
    month: 'February 2025',
    employeeId: 'EMP001',
    ...calculateSalaryBreakdown(285000 * 12),
    paidOn: '2025-02-28',
  },
];
