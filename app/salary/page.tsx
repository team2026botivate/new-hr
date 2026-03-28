'use client';

import { useState, useEffect } from 'react';
import {
   Wallet,
   TrendingUp,
   ArrowUpRight,
   ChevronRight,
   Download,
   Calendar,
   ShieldCheck,
   FileText,
   PieChart as PieChartIcon,
   BarChart as BarChartIcon,
   Search,
   Users,
   Building2,
   Info
} from 'lucide-react';
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Cell,
   PieChart,
   Pie
} from 'recharts';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import LoadingSkeleton, { SkeletonItem } from '@/components/shared/LoadingSkeleton';
import SmartTable from '@/components/shared/SmartTable';
import PayslipModal from '@/components/salary/PayslipModal';
import BankInfoModal from '@/components/salary/BankInfoModal';
import { useAuthStore } from '@/lib/store/authStore';
import { useToast } from '@/lib/hooks/useToast';
import { Employee } from '@/types';

/**
 * Salary Dashboard Page
 * CTC breakdown, pay history, and payslip management
 */
export default function SalaryPage() {
   const { role, updateUser, user } = useAuthStore();
   const { addToast } = useToast();
   const [isLoading, setIsLoading] = useState(true);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isBankModalOpen, setIsBankModalOpen] = useState(false);
   const [selectedMonth, setSelectedMonth] = useState('March 2025');

   useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
   }, []);

   const handleUpdateBankInfo = (data: Partial<Employee>) => {
      updateUser(data);
      addToast({
         title: "Bank Info Updated",
         message: "Your bank details have been updated successfully.",
         type: "success"
      });
      setIsBankModalOpen(false);
   };

   // Mock data
   const salaryHistory = [
      { month: 'Oct 24', amount: 72000 },
      { month: 'Nov 24', amount: 72000 },
      { month: 'Dec 24', amount: 72000 },
      { month: 'Jan 25', amount: 74850 },
      { month: 'Feb 25', amount: 74850 },
      { month: 'Mar 25', amount: 74850 },
   ];

   const breakdownData = [
      { name: 'Basic', value: 45000, color: '#4F46E5' },
      { name: 'HRA', value: 22500, color: '#818CF8' },
      { name: 'Special', value: 15400, color: '#C7D2FE' },
      { name: 'Allowances', value: 2850, color: '#E0E7FF' },
   ];

   const payHistory = [
      { id: 1, month: 'March 2025', gross: 85750, deductions: 10900, net: 74850, status: 'paid' },
      { id: 2, month: 'February 2025', gross: 85750, deductions: 10900, net: 74850, status: 'paid' },
      { id: 3, month: 'January 2025', gross: 85750, deductions: 10900, net: 74850, status: 'paid' },
      { id: 4, month: 'December 2024', gross: 82000, deductions: 10000, net: 72000, status: 'paid' },
   ];

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Page Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-bold text-[--text-primary]">Compensation & Payroll</h1>
               <p className="text-sm text-[--text-secondary]">View your CTC structure, pay history, and download payslips.</p>
            </div>

            <div className="flex items-center space-x-3">
               <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-[--border] text-[--text-secondary] rounded-xl text-sm font-bold shadow-sm hover:bg-[--surface-alt] transition-all">
                  <Download size={18} />
                  <span>Tax Documents</span>
               </button>
               <button 
                  onClick={() => setIsBankModalOpen(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-[--brand] text-black rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-[--brand]/90 transition-all"
               >
                  <Wallet size={18} />
                  <span>Update Bank Info</span>
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: CTC & Breakdown */}
            <div className="lg:col-span-4 space-y-6">
               {/* CTC Card */}
               <div className="card-base bg-slate-900 text-black border-none shadow-xl shadow-slate-200">
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                        <TrendingUp size={24} className="text-indigo-400" />
                     </div>
                     <div className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/5">
                        FY 2024-25
                     </div>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Annual CTC</p>
                  <h2 className="text-4xl font-black tracking-tighter tabular-nums mb-6">
                     ₹12,45,000 <span className="text-sm font-bold text-slate-500 tracking-normal ml-1">/ Year</span>
                  </h2>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between group cursor-pointer">
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase italic">Monthly Net (Est.)</p>
                        <p className="text-lg font-black">₹74,850</p>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <ArrowUpRight size={16} />
                     </div>
                  </div>
               </div>

               {/* Component Breakdown */}
               <div className="card-base">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-sm font-bold text-[--text-primary] flex items-center">
                        <PieChartIcon size={16} className="mr-2 text-[--brand]" />
                        Salary Structure
                     </h4>
                     <Info size={14} className="text-[--text-muted]" />
                  </div>

                  <div className="h-44 w-full mb-6">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={breakdownData}
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={8}
                              dataKey="value"
                           >
                              {breakdownData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                              ))}
                           </Pie>
                           <Tooltip
                              contentStyle={{
                                 borderRadius: '12px',
                                 border: 'none',
                                 boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                 fontSize: '10px',
                                 fontWeight: 'bold'
                              }}
                           />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                     {breakdownData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-[--surface-alt]/50 transition-colors">
                           <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs font-bold text-[--text-secondary]">{item.name}</span>
                           </div>
                           <span className="text-xs font-black text-[--text-primary] tabular-nums">{formatCurrency(item.value)}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Column: History & Trends */}
            <div className="lg:col-span-8 space-y-6">
               {/* Pay Trend Chart */}
               <div className="card-base overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <h4 className="text-sm font-bold text-[--text-primary] flex items-center">
                           <BarChartIcon size={16} className="mr-2 text-[--brand]" />
                           Pay Disbursement History
                        </h4>
                        <p className="text-[10px] text-[--text-muted] font-medium uppercase tracking-widest mt-1">Last 6 Months Trend</p>
                     </div>
                     <div className="flex items-center space-x-2 bg-[--surface-alt] p-1 rounded-lg">
                        <button className="px-3 py-1 bg-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-sm">Monthly</button>
                        <button className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[--text-muted]">Annual</button>
                     </div>
                  </div>

                  <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salaryHistory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EC" />
                           <XAxis
                              dataKey="month"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                           />
                           <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                              tickFormatter={(val) => `₹${val / 1000}k`}
                           />
                           <Tooltip
                              contentStyle={{
                                 borderRadius: '16px',
                                 border: 'none',
                                 boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                 fontSize: '11px',
                                 fontWeight: 'bold',
                              }}
                              cursor={{ fill: '#EEF2FF', radius: 12 }}
                           />
                           <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={40}>
                              {salaryHistory.map((_, index) => (
                                 <Cell
                                    key={`cell-${index}`}
                                    fill={index === salaryHistory.length - 1 ? '#4F46E5' : '#C7D2FE'}
                                    className="transition-all hover:opacity-80"
                                 />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               {/* Past Payslips Table */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h4 className="text-base font-bold text-[--text-primary]">Recent Payslips</h4>
                     <button className="text-[10px] font-bold text-[--brand] uppercase tracking-widest hover:underline">View All</button>
                  </div>

                  <LoadingSkeleton
                     isLoading={isLoading}
                     fallback={
                        <div className="space-y-4">
                           <SkeletonItem className="h-16 w-full" />
                           <SkeletonItem className="h-16 w-full" />
                        </div>
                     }
                  >
                     <SmartTable
                        data={payHistory}
                        columns={[
                           {
                              header: 'Month',
                              key: 'month',
                              render: (item) => (
                                 <div className="flex items-center space-x-3">
                                    <Calendar size={18} className="text-[--brand]" />
                                    <span className="text-xs font-bold text-[--text-primary]">{item.month}</span>
                                 </div>
                              )
                           },
                           {
                              header: 'Gross / Deduct',
                              key: 'gross',
                              render: (item) => (
                                 <div className="flex flex-col">
                                    <span className="text-xs font-bold text-[--text-primary] tabular-nums">{formatCurrency(item.gross)}</span>
                                    <span className="text-[10px] text-red-600 font-bold tabular-nums">-{formatCurrency(item.deductions)}</span>
                                 </div>
                              )
                           },
                           {
                              header: 'Net Take Home',
                              key: 'net',
                              render: (item) => (
                                 <span className="text-sm font-black text-[--text-primary] tabular-nums">{formatCurrency(item.net)}</span>
                              )
                           },
                           {
                              header: 'Status',
                              key: 'status',
                              render: (item) => (
                                 <div className="flex items-center space-x-1.5 px-3 py-1 bg-[--success-light]/30 text-[--success] rounded-lg border border-[--success]/10 w-fit">
                                    <ShieldCheck size={12} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{item.status}</span>
                                 </div>
                              )
                           },
                           {
                              header: '',
                              key: 'actions',
                              className: 'text-right',
                              render: (item) => (
                                 <button
                                    onClick={() => { setSelectedMonth(item.month); setIsModalOpen(true); }}
                                    className="p-2 hover:bg-[--brand-light] text-[--text-secondary] hover:text-[--brand] rounded-xl transition-all"
                                 >
                                    <FileText size={18} />
                                 </button>
                              )
                           },
                        ]}
                        mobileCardRender={(item) => (
                           <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                 <span className="text-xs font-bold text-[--text-primary]">{item.month}</span>
                                 <div className="px-2.5 py-1 bg-[--success-light]/30 text-[--success] rounded-lg text-[8px] font-black uppercase border border-[--success]/10">Paid</div>
                              </div>
                              <div className="flex items-center justify-between">
                                 <div>
                                    <p className="text-[10px] font-bold text-[--text-muted] uppercase mb-0.5">Net Disbursed</p>
                                    <p className="text-lg font-black text-[--text-primary] tracking-tight">{formatCurrency(item.net)}</p>
                                 </div>
                                 <button
                                    onClick={() => { setSelectedMonth(item.month); setIsModalOpen(true); }}
                                    className="px-4 py-2 bg-slate-900 text-black rounded-xl text-[10px] font-bold shadow-lg shadow-slate-200"
                                 >
                                    View Payslip
                                 </button>
                              </div>
                           </div>
                        )}
                     />
                  </LoadingSkeleton>
               </div>
            </div>
         </div>

         {/* Bonus/Revision Info (Only for Employee to see own history) */}
         <div className="card-base p-8 bg-[--surface-alt]/30 border-dashed border-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="space-y-1">
                  <h4 className="text-base font-bold text-[--text-primary]">Salary Revision History</h4>
                  <p className="text-xs text-[--text-secondary]">Last revision applied on 01 Jan 2025 (Annual Increment)</p>
               </div>
               <div className="flex items-center -space-x-3">
                  {[...Array(4)].map((_, i) => (
                     <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-[--surface-alt] flex items-center justify-center text-[10px] font-bold text-[--text-muted]">
                        {2021 + i}
                     </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-[--brand] text-black flex items-center justify-center text-[10px] font-bold">
                     Active
                  </div>
               </div>
            </div>
         </div>

         {/* Bank Info Modal */}
         <BankInfoModal
            isOpen={isBankModalOpen}
            onClose={() => setIsBankModalOpen(false)}
            onSave={handleUpdateBankInfo}
         />

         {/* Payslip Modal Integration */}
         <PayslipModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            month={selectedMonth}
            data={{}}
         />
      </div>
   );
}
