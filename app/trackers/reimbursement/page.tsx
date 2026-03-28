'use client';

import { useState, useEffect } from 'react';
import {
   Receipt,
   Plus,
   Search,
   Filter,
   Download,
   FileText,
   AlertCircle,
   CheckCircle2,
   XCircle,
   Clock,
   IndianRupee,
   Camera,
   Trash2,
   ChevronRight
} from 'lucide-react';
import { cn, formatDate, formatCurrency } from '@/lib/utils';
import LoadingSkeleton, { SkeletonItem } from '@/components/shared/LoadingSkeleton';
import SmartTable from '@/components/shared/SmartTable';
import { useReimbursementStore } from '@/lib/store/reimbursementStore';
import { useToast } from '@/lib/hooks/useToast';
import { useUIStore } from '@/lib/store/uiStore';
import { ReimbursementCategory } from '@/types';
import { REIMBURSEMENT_CATEGORIES } from '@/lib/constants';

/**
 * Reimbursement Tracker Page
 * Claims submission and tracking system
 */
export default function ReimbursementPage() {
   const { addToast } = useToast();
   const { setFormActive } = useUIStore();
   const { claims, addClaim, deleteClaim, getStats } = useReimbursementStore();
   const [isLoading, setIsLoading] = useState(true);
   const [activeFilter, setActiveFilter] = useState('All');
   const [isFocusMode, setIsFocusMode] = useState(false);

   // Form State
   const [amount, setAmount] = useState('');
   const [category, setCategory] = useState<ReimbursementCategory | ''>('');
   const [description, setDescription] = useState('');
   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

   useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
   }, []);

   // Handle Navbar focus mode
   useEffect(() => {
     setFormActive(isFocusMode);
     return () => setFormActive(false);
   }, [isFocusMode, setFormActive]);

   const stats = getStats();

   const filteredClaims = claims.filter(c => 
      activeFilter === 'All' || c.status === activeFilter.toLowerCase()
   );

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!amount || !category || !description) {
         addToast({
            type: 'error',
            title: 'Missing Fields',
            message: 'Please fill in all the required details.',
         });
         return;
      }

      addClaim({
         amount: Number(amount),
         category: category as ReimbursementCategory,
         description,
         date,
      });

      addToast({
         type: 'success',
         title: 'Claim Submitted',
         message: 'Your reimbursement request has been posted successfully.',
      });

      // Clear Form
      setAmount('');
      setCategory('');
      setDescription('');
      setIsFocusMode(false);
   };

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Page Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-bold text-[--text-primary]">Reimbursements</h1>
               <p className="text-sm text-[--text-secondary]">Submit expenses and track your claim approvals.</p>
            </div>

            <div className="flex items-center space-x-3">
               <div className="bg-white border border-[--border] rounded-xl p-1 shadow-sm flex items-center">
                  {['All', 'Pending', 'Approved', 'Paid'].map((f) => (
                     <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={cn(
                           "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                           activeFilter === f
                              ? "bg-[--brand-light] text-[--brand] shadow-sm"
                              : "text-[--text-secondary] hover:bg-[--surface-alt]"
                        )}
                     >
                        {f}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Quick Form Section */}
            <div className="lg:col-span-4 space-y-6">
               <div className="card-base p-6 bg-white border-dashed border-2">
                  <div className="flex items-center space-x-3 mb-6">
                     <div className="w-10 h-10 rounded-2xl bg-[--brand-light] text-[--brand] flex items-center justify-center">
                        <Receipt size={24} />
                     </div>
                     <div>
                        <h3 className="text-base font-bold text-[--text-primary]">New Claim</h3>
                        <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest">Self Service</p>
                     </div>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest px-1">Amount (₹)</label>
                        <div className="relative">
                           <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={16} />
                           <input
                              type="number"
                              placeholder="Enter amount"
                              className="w-full bg-[--surface-alt] border border-[--border] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[--brand]/20"
                              value={amount}
                              onFocus={() => setIsFocusMode(true)}
                              onBlur={() => !amount && !category && !description && setIsFocusMode(false)}
                              onChange={(e) => setAmount(e.target.value)}
                           />
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest px-1">Date</label>
                        <input
                           type="date"
                           className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[--brand]/20"
                           value={date}
                           onFocus={() => setIsFocusMode(true)}
                           onBlur={() => !amount && !category && !description && setIsFocusMode(false)}
                           onChange={(e) => setDate(e.target.value)}
                        />
                     </div>

                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest px-1">Category</label>
                        <select 
                           className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[--brand]/20 cursor-pointer"
                           value={category}
                           onFocus={() => setIsFocusMode(true)}
                           onBlur={() => !amount && !category && !description && setIsFocusMode(false)}
                           onChange={(e) => setCategory(e.target.value as ReimbursementCategory)}
                        >
                           <option value="">Select Category</option>
                           {REIMBURSEMENT_CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                           ))}
                        </select>
                     </div>

                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest px-1">Description</label>
                        <textarea
                           rows={3}
                           className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[--brand]/20 resize-none"
                           placeholder="What was this expense for?"
                           value={description}
                           onFocus={() => setIsFocusMode(true)}
                           onBlur={() => !amount && !category && !description && setIsFocusMode(false)}
                           onChange={(e) => setDescription(e.target.value)}
                        />
                     </div>

                     <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest px-1">Receipt Upload</label>
                        <div className="border-2 border-dashed border-[--border] rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 hover:border-[--brand] transition-all group cursor-pointer bg-white">
                           <Camera className="text-[--text-muted] group-hover:text-[--brand] transition-colors" size={24} />
                           <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest group-hover:text-[--brand]">No real upload in demo</p>
                        </div>
                     </div>

                     <button 
                        type="submit"
                        className="w-full py-3.5 bg-[--brand] text-black rounded-2xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-[--brand]/90 transition-all flex items-center justify-center space-x-2"
                     >
                        <Plus size={18} />
                        <span>Post Claim Request</span>
                     </button>
                  </form>
               </div>

               {/* Guidelines Info */}
               <div className="card-base bg-amber-50 border-amber-100">
                  <h5 className="flex items-center text-xs font-bold text-amber-800 mb-2">
                     <AlertCircle size={16} className="mr-2" />
                     Important Guideline
                  </h5>
                  <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                     Ensure all original receipts are attached for claims above ₹500. Approved claims are processed along with the salary of the following month.
                  </p>
               </div>
            </div>

            {/* Right: History View */}
            <div className="lg:col-span-8 space-y-6">
               {/* Total Stats Banner */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="card-base bg-white shadow-sm border-[--border]">
                     <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-1">Total Claimed</p>
                     <p className="text-xl font-black text-[--text-primary] tracking-tight whitespace-nowrap">{formatCurrency(stats.total)}</p>
                  </div>
                  <div className="card-base bg-[--success-light]/20 border-[--success]/10">
                     <p className="text-[10px] font-bold text-[--success] uppercase tracking-widest mb-1">Approved/Paid</p>
                     <p className="text-xl font-black text-[--success] tracking-tight whitespace-nowrap">{formatCurrency(stats.approved)}</p>
                  </div>
                  <div className="card-base bg-[--info-light]/20 border-[--info]/10">
                     <p className="text-[10px] font-bold text-[--info] uppercase tracking-widest mb-1">Processing</p>
                     <p className="text-xl font-black text-[--info] tracking-tight whitespace-nowrap">{formatCurrency(stats.processing)}</p>
                  </div>
               </div>

               {/* Claims Table */}
               <LoadingSkeleton
                  isLoading={isLoading}
                  fallback={
                     <div className="space-y-4">
                        <SkeletonItem className="h-12 w-full" />
                        <SkeletonItem className="h-20 w-full" />
                        <SkeletonItem className="h-20 w-full" />
                     </div>
                  }
               >
                  <SmartTable
                     data={filteredClaims}
                     columns={[
                        {
                           header: 'Claim ID / Date',
                           key: 'id',
                           render: (item) => (
                              <div className="flex flex-col">
                                 <span className="text-xs font-bold text-[--text-primary]">{item.id}</span>
                                 <span className="text-[10px] font-medium text-[--text-muted]">{formatDate(item.date)}</span>
                              </div>
                           )
                        },
                        {
                           header: 'Category',
                           key: 'category',
                           render: (item) => (
                              <div className="px-2.5 py-0.5 bg-[--surface-alt] text-[--text-secondary] rounded-md text-[10px] font-bold inline-block border border-[--border]">
                                 {item.category}
                              </div>
                           )
                        },
                        {
                           header: 'Amount',
                           key: 'amount',
                           render: (item) => (
                              <span className={cn(
                                 "text-sm font-black text-[--text-primary] tabular-nums",
                                 item.status === 'rejected' && "line-through text-[--text-muted]"
                              )}>
                                 {formatCurrency(item.amount)}
                              </span>
                           )
                        },
                        {
                           header: 'Status',
                           key: 'status',
                           render: (item) => (
                              <div className="flex items-center space-x-1.5">
                                 {item.status === 'approved' && <div className="w-1.5 h-1.5 rounded-full bg-[--success]" />}
                                 {item.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-[--info]" />}
                                 {item.status === 'paid' && <div className="w-1.5 h-1.5 rounded-full bg-[--brand]" />}
                                 {item.status === 'rejected' && <div className="w-1.5 h-1.5 rounded-full bg-[--danger]" />}
                                 <span className={cn(
                                    "text-[9px] font-black uppercase tracking-widest",
                                    item.status === 'approved' ? "text-[--success]" :
                                       item.status === 'paid' ? "text-[--brand]" :
                                          item.status === 'rejected' ? "text-[--danger]" : "text-[--info]"
                                 )}>{item.status}</span>
                              </div>
                           ),
                           className: 'text-right'
                        },
                     ]}
                     mobileCardRender={(item) => (
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <div className={cn(
                                 "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                                 item.status === 'paid' ? "bg-[--brand-light] text-[--brand]" :
                                    item.status === 'approved' ? "bg-[--success-light] text-[--success]" :
                                       item.status === 'rejected' ? "bg-[--danger-light] text-[--danger]" :
                                          "bg-[--info-light] text-[--info]"
                              )}>{item.status}</div>
                              <span className="text-[10px] font-bold text-[--text-muted]">{formatDate(item.date)}</span>
                           </div>
                           <div className="flex items-start justify-between">
                              <div className="flex-1 pr-6 flex items-start space-x-3">
                                 <div className="w-8 h-8 bg-white border border-[--border] rounded-xl flex items-center justify-center shrink-0">
                                    <Receipt size={16} className="text-[--brand]" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold text-[--text-primary] line-clamp-2">{item.description}</p>
                                    <p className="text-[10px] font-medium text-[--text-muted] mt-1">{item.category} • {item.id}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-base font-black text-[--text-primary] tabular-nums whitespace-nowrap">{formatCurrency(item.amount)}</p>
                              </div>
                           </div>
                           <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[--border]">
                              <button className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-wider flex items-center space-x-1">
                                 <FileText size={12} />
                                 <span>Bill</span>
                              </button>
                               <button className="text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center space-x-1" onClick={() => {
                                  deleteClaim(item.id);
                                  addToast({ type: 'info', title: 'Claim Removed', message: 'The request has been deleted.' });
                               }}>
                                  <Trash2 size={12} />
                                  <span>Delete</span>
                               </button>
                           </div>
                        </div>
                     )}
                  />
               </LoadingSkeleton>

               {/* Summary Footer Widget */}
               <div className="card-base text-center p-8 bg-[--surface-alt]/20 border-dashed">
                  <Download size={24} className="mx-auto text-[--text-muted] opacity-20 mb-2" />
                  <h5 className="text-xs font-bold text-[--text-primary]">Fiscal Year Summary</h5>
                  <p className="text-[10px] text-[--text-secondary] mb-1">Download consolidated reports for tax filing and company audit.</p>
                  <button className="text-[10px] font-bold text-[--brand] hover:underline uppercase tracking-widest mt-2">Export FY 2024-25 Reports</button>
               </div>
            </div>
         </div>
      </div>
   );
}
