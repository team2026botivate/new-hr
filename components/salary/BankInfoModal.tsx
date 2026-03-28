'use client';

import { useState, useEffect } from 'react';
import { X, Landmark, CreditCard, ShieldCheck, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import { useUIStore } from '@/lib/store/uiStore';
import type { Employee } from '@/types';

interface BankInfoModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSave: (data: Partial<Employee>) => void;
}

/**
 * Professional Modal for updating Bank Information
 * Implements Indian banking validation (IFSC, PAN, etc.)
 */
export default function BankInfoModal({ isOpen, onClose, onSave }: BankInfoModalProps) {
   const { user } = useAuthStore();
   const { setFormActive } = useUIStore();
   const [formData, setFormData] = useState({
      bankName: '',
      bankAccount: '',
      ifsc: '',
      pan: '',
      aadhaar: '',
   });
   const [errors, setErrors] = useState<Record<string, string>>({});
   const [isSubmitting, setIsSubmitting] = useState(false);

   // Sync with store data when opened
   useEffect(() => {
      if (isOpen && user) {
         setFormData({
            bankName: user.bankName || '',
            bankAccount: user.bankAccount || '',
            ifsc: user.ifsc || '',
            pan: user.pan || '',
            aadhaar: user.aadhaar || '',
         });
         setErrors({});
      }
   }, [isOpen, user]);

   // Handle Navbar focus mode
   useEffect(() => {
     if (isOpen) {
       setFormActive(true);
     } else {
       setFormActive(false);
     }
     return () => setFormActive(false);
   }, [isOpen, setFormActive]);

   if (!isOpen) return null;

   const validate = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.bankName) newErrors.bankName = 'Bank name is required';
      
      if (!formData.bankAccount) {
         newErrors.bankAccount = 'Account number is required';
      } else if (!/^\d{9,18}$/.test(formData.bankAccount)) {
         newErrors.bankAccount = 'Invalid account number (9-18 digits)';
      }

      if (!formData.ifsc) {
         newErrors.ifsc = 'IFSC code is required';
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
         newErrors.ifsc = 'Invalid IFSC format (e.g. SBIN0001234)';
      }

      if (!formData.pan) {
         newErrors.pan = 'PAN number is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
         newErrors.pan = 'Invalid PAN format';
      }

      if (!formData.aadhaar) {
         newErrors.aadhaar = 'Aadhaar is required';
      } else if (!/^\d{12}$/.test(formData.aadhaar)) {
         newErrors.aadhaar = 'Invalid Aadhaar (12 digits)';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
         onSave(formData);
         setIsSubmitting(false);
         onClose();
      }, 1000);
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
         {/* Backdrop */}
         <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

         {/* Modal Container */}
         <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            {/* Header */}
            <div className="p-6 border-b border-[--border] flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[--brand] flex items-center justify-center">
                     <Landmark size={20} />
                  </div>
                  <div>
                     <h3 className="text-base font-bold text-[--text-primary]">Bank Information</h3>
                     <p className="text-[10px] text-[--text-muted] font-medium uppercase tracking-widest">Update your disbursement details</p>
                  </div>
               </div>
               <button 
                  onClick={onClose}
                  className="p-2 hover:bg-[--surface-alt] rounded-xl text-[--text-muted] transition-colors"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
               <div className="grid grid-cols-1 gap-5">
                  {/* Bank Name */}
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-widest">Bank Name</label>
                     <div className="relative">
                        <Landmark size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" />
                        <input 
                           type="text"
                           value={formData.bankName}
                           onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                           placeholder="e.g. HDFC Bank Ltd."
                           className={cn(
                              "w-full pl-10 pr-4 py-3 bg-[--surface-alt]/50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-[--brand]/20 transition-all outline-none",
                              errors.bankName ? "border-red-300 text-red-900" : "border-[--border]"
                           )}
                        />
                     </div>
                     {errors.bankName && <p className="text-[9px] font-bold text-red-500 flex items-center"><AlertCircle size={10} className="mr-1" /> {errors.bankName}</p>}
                  </div>

                  {/* Account Number */}
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-widest">Account Number</label>
                     <div className="relative">
                        <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" />
                        <input 
                           type="text"
                           value={formData.bankAccount}
                           onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value.replace(/\D/g, '') })}
                           placeholder="Enter your 9-18 digit account number"
                           className={cn(
                              "w-full pl-10 pr-4 py-3 bg-[--surface-alt]/50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-[--brand]/20 transition-all outline-none",
                              errors.bankAccount ? "border-red-300 text-red-900" : "border-[--border]"
                           )}
                        />
                     </div>
                     {errors.bankAccount && <p className="text-[9px] font-bold text-red-500 flex items-center"><AlertCircle size={10} className="mr-1" /> {errors.bankAccount}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     {/* IFSC */}
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-widest">IFSC Code</label>
                        <input 
                           type="text"
                           value={formData.ifsc}
                           onChange={(e) => setFormData({ ...formData, ifsc: e.target.value.toUpperCase() })}
                           placeholder="HDFC0000123"
                           className={cn(
                              "w-full px-4 py-3 bg-[--surface-alt]/50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-[--brand]/20 transition-all outline-none uppercase",
                              errors.ifsc ? "border-red-300 text-red-900" : "border-[--border]"
                           )}
                        />
                        {errors.ifsc && <p className="text-[9px] font-bold text-red-500">{errors.ifsc}</p>}
                     </div>

                     {/* PAN */}
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-widest">PAN Number</label>
                        <input 
                           type="text"
                           value={formData.pan}
                           onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                           placeholder="ABCDE1234F"
                           className={cn(
                              "w-full px-4 py-3 bg-[--surface-alt]/50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-[--brand]/20 transition-all outline-none uppercase",
                              errors.pan ? "border-red-300 text-red-900" : "border-[--border]"
                           )}
                        />
                        {errors.pan && <p className="text-[9px] font-bold text-red-500">{errors.pan}</p>}
                     </div>
                  </div>

                  {/* Aadhaar */}
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-widest">Aadhaar (12 Digits)</label>
                     <input 
                        type="text"
                        value={formData.aadhaar}
                        onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '') })}
                        placeholder="XXXX XXXX XXXX"
                        maxLength={12}
                        className={cn(
                           "w-full px-4 py-3 bg-[--surface-alt]/50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-[--brand]/20 transition-all outline-none",
                           errors.aadhaar ? "border-red-300 text-red-900" : "border-[--border]"
                        )}
                     />
                     {errors.aadhaar && <p className="text-[9px] font-bold text-red-500">{errors.aadhaar}</p>}
                  </div>
               </div>

               <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start space-x-3">
                  <ShieldCheck size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
                     Your sensitive information is encrypted and visible only to the Finance and HR teams. Ensure your details match your bank records exactly.
                  </p>
               </div>

               {/* Footer */}
               <div className="pt-2 flex items-center space-x-3">
                  <button 
                     type="button"
                     onClick={onClose}
                     className="flex-1 py-3 text-sm font-bold text-[--text-secondary] hover:bg-[--surface-alt] rounded-2xl transition-all"
                  >
                     Cancel
                  </button>
                  <button 
                     type="submit"
                     disabled={isSubmitting}
                     className="flex-3 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                     {isSubmitting ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           <span>Updating...</span>
                        </>
                     ) : (
                        <>
                           <Save size={18} />
                           <span>Save Changes</span>
                        </>
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
