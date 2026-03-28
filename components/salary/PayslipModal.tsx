'use client';

import { X, Download, Printer, ShieldCheck, Mail, Share2, CheckCircle2 } from 'lucide-react';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

const MOCK_COMPANY = {
   name: 'TechInfinia Solutions Pvt. Ltd.',
   address: '12th Floor, Cyber Towers, HITEC City, Hyderabad - 500081',
   cin: 'U72900TG2018PTC123456',
   pan: 'ABCDE1234F',
};

interface PayslipModalProps {
   isOpen: boolean;
   onClose: () => void;
   month: string;
   data: any;
}

/**
 * Professional Payslip Modal with Print capability
 * Following industrial standards from UI.md
 */
export default function PayslipModal({ isOpen, onClose, month, data }: PayslipModalProps) {
   if (!isOpen) return null;

   const handlePrint = () => {
      window.print();
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300 no-print">
         {/* Backdrop */}
         <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

         {/* Modal Container */}
         <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            {/* Header (Action Bar) */}
            <div className="p-4 border-b border-[--border] flex items-center justify-between bg-[--surface-alt]/30">
               <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 bg-[--brand-light] text-[--brand] text-[10px] font-black uppercase tracking-widest rounded-full border border-[--brand]/10">
                     Final Draft
                  </div>
                  <span className="text-xs font-bold text-[--text-secondary]">Payslip for {month}</span>
               </div>
               <div className="flex items-center space-x-2">
                  <button
                     onClick={handlePrint}
                     className="p-2.5 bg-white border border-[--border] text-[--text-secondary] hover:text-[--brand] hover:border-[--brand] rounded-xl transition-all flex items-center space-x-2 text-xs font-bold shadow-sm"
                  >
                     <Printer size={16} />
                     <span className="hidden sm:inline">Print / PDF</span>
                  </button>
                  <button className="p-2.5 bg-white border border-[--border] text-[--text-secondary] rounded-xl hover:bg-[--surface-alt] transition-all">
                     <Share2 size={16} />
                  </button>
                  <div className="w-px h-6 bg-[--border] mx-2" />
                  <button
                     onClick={onClose}
                     className="p-2.5 hover:bg-[--surface-alt] rounded-xl text-[--text-muted] transition-colors"
                  >
                     <X size={20} />
                  </button>
               </div>
            </div>

            {/* Payslip Content (Scrollable but printable) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-12 bg-[#F1F3F7]">
               {/* The actual Printable Paper Section */}
               <div className="bg-white shadow-xl mx-auto max-w-[800px] border border-[--border] p-8 sm:p-16 text-[--text-primary] relative print:shadow-none print:border-none print:m-0 print:p-0">

                  {/* Draft Watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-45deg] pointer-events-none select-none">
                     <h1 className="text-9xl font-black">PAYSLIP</h1>
                  </div>

                  {/* Company Header */}
                  <div className="flex flex-col md:flex-row justify-between border-b-2 border-slate-900 pb-8 mb-10 gap-8">
                     <div className="space-y-2">
                        <h2 className="text-2xl font-black tracking-tight uppercase">{MOCK_COMPANY.name}</h2>
                        <p className="text-[10px] text-[--text-primary] max-w-sm font-black leading-relaxed">
                           {MOCK_COMPANY.address}
                        </p>
                        <div className="flex items-center space-x-4 text-[9px] font-black uppercase text-[--text-secondary] pt-2">
                           <span>CIN: {MOCK_COMPANY.cin}</span>
                           <span>PAN: {MOCK_COMPANY.pan}</span>
                        </div>
                     </div>
                     <div className="text-right flex flex-col justify-end">
                        <p className="text-[10px] font-black uppercase text-[--text-secondary] tracking-[0.2em] mb-1">Pay Period</p>
                        <h3 className="text-xl font-black">{month}</h3>
                     </div>
                  </div>

                  {/* Employee Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 mb-12">
                     {[
                        { label: 'Employee Name', value: 'Arjun Nair' },
                        { label: 'Employee ID', value: 'EMP087' },
                        { label: 'Designation', value: 'Sr. Product Designer' },
                        { label: 'Department', value: 'Design' },
                        { label: 'Bank Name', value: 'HDFC Bank Ltd.' },
                        { label: 'A/C Number', value: '**** 4512' },
                        { label: 'PAN Number', value: 'ABCDE****G' },
                        { label: 'Days Worked', value: '21 / 22' },
                     ].map((item, idx) => (
                        <div key={idx}>
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{item.label}</p>
                           <p className="text-xs font-black text-slate-900">{item.value}</p>
                        </div>
                     ))}
                  </div>

                  {/* Earnings vs Deductions Table */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden mb-12">
                     {/* Earnings */}
                     <div className="bg-white">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex justify-between">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Earnings</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Amount (₹)</span>
                        </div>
                        <div className="p-6 space-y-4">
                           {[
                              { name: 'Basic Salary', amount: 45000 },
                              { name: 'House Rent Allowance', amount: 22500 },
                              { name: 'Special Allowance', amount: 15400 },
                              { name: 'Conveyance', amount: 1600 },
                              { name: 'Medical Allowance', amount: 1250 },
                           ].map((e, idx) => (
                              <div key={idx} className="flex justify-between text-xs items-center">
                                 <span className="text-slate-600 font-medium">{e.name}</span>
                                 <span className="text-slate-900 font-black tabular-nums">{e.amount.toLocaleString('en-IN')}</span>
                              </div>
                           ))}
                           <div className="pt-4 border-t border-slate-100 flex justify-between">
                              <span className="text-xs font-bold text-slate-900">Gross Earnings</span>
                              <span className="text-sm font-black text-slate-900 tracking-tight">85,750.00</span>
                           </div>
                        </div>
                     </div>

                     {/* Deductions */}
                     <div className="bg-white">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex justify-between">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Deductions</span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Amount (₹)</span>
                        </div>
                        <div className="p-6 space-y-4">
                           {[
                              { name: 'Provident Fund (PF)', amount: 5400 },
                              { name: 'Professional Tax (PT)', amount: 200 },
                              { name: 'Income Tax (TDS)', amount: 4800 },
                              { name: 'Health Insurance', amount: 500 },
                           ].map((d, idx) => (
                              <div key={idx} className="flex justify-between text-xs items-center">
                                 <span className="text-slate-600 font-medium">{d.name}</span>
                                 <span className="text-slate-900 font-black tabular-nums">{d.amount.toLocaleString('en-IN')}</span>
                              </div>
                           ))}
                           <div className="h-[21px]" /> {/* Spacer to align totals */}
                           <div className="pt-4 border-t border-slate-100 flex justify-between">
                              <span className="text-xs font-bold text-slate-900">Total Deductions</span>
                              <span className="text-sm font-black text-slate-900 tracking-tight">10,900.00</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Net Pay Highlight */}
                  <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-black flex flex-col md:flex-row items-center justify-between gap-8 mb-12 shadow-2xl shadow-slate-200">
                     <div className="space-y-1 text-center md:text-left">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Pay Distribution</p>
                        <p className="text-xs text-slate-300 font-black">Transferred to HDFC Bank **** 4512 on 28 Mar 2025</p>
                     </div>
                     <div className="text-center md:text-right">
                        <p className="text-4xl sm:text-5xl font-black tracking-tighter tabular-nums mb-1">
                           ₹74,850.00
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase italic">
                           Seventy-Four Thousand Eight Hundred Fifty Only
                        </p>
                     </div>
                  </div>

                  {/* Verification & Signatures */}
                  <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                     <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-300">
                           <ShieldCheck size={32} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-900 uppercase mb-1 flex items-center">
                              Digitally Verified
                              <CheckCircle2 size={10} className="ml-1 text-sky-500" />
                           </p>
                           <p className="text-[9px] text-slate-400 font-medium max-w-[200px]">
                              This is a computer-generated document and does not require a physical signature.
                           </p>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="w-40 h-px bg-slate-900 mb-2 ml-auto" />
                        <p className="text-[10px] font-black text-slate-900 uppercase">Authorized Signatory</p>
                        <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">TechInfinia Finance</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 bg-white border-t border-[--border] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
               <div className="flex items-center space-x-3 text-xs text-[--text-secondary]">
                  <div className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                     <Mail size={16} />
                  </div>
                  <p>Sent to <span className="font-bold text-[--text-primary]">arjun.nair@techinfinia.in</span></p>
               </div>

               <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                     onClick={onClose}
                     className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-[--text-secondary] hover:bg-[--surface-alt] transition-all"
                  >
                     Done
                  </button>
                  <button className="flex-1 sm:flex-none px-8 py-2.5 bg-[--brand] text-black rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-[--brand]/90 transition-all flex items-center justify-center space-x-2">
                     <Download size={16} />
                     <span>Download PDF</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Persistent global styles for print */}
         <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-only, .print-only * {
            visibility: visible;
          }
          .no-print {
            display: none !important;
          }
          /* Ensure the target section is fully visible and occupies the page */
          div.overflow-y-auto {
            overflow: visible !important;
            height: auto !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
           /* Specific target of the paper layout */
          .bg-white.shadow-xl {
            visibility: visible !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .bg-white.shadow-xl * {
            visibility: visible !important;
          }
        }
      `}</style>
      </div>
   );
}
