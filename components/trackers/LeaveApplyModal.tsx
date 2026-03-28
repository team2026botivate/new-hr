'use client';

import { useState } from 'react';
import {
  X,
  Calendar,
  Info,
  MessageSquare,
  ShieldCheck,
  Coffee,
  Sun,
  Heart,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LeaveType } from '@/types';

interface LeaveApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

/**
 * Centered modal for leave applications as per UI.md
 */
export default function LeaveApplyModal({ isOpen, onClose, onSubmit }: LeaveApplyModalProps) {
  const [formData, setFormData] = useState({
    type: 'CL' as LeaveType,
    fromDate: '',
    toDate: '',
    isHalfDay: false,
    reason: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="p-6 border-b border-[--border] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[--brand-light] text-[--brand] flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[--text-primary]">Apply for Leave</h3>
              <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest">Employee Self Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[--surface-alt] rounded-xl text-[--text-muted] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          {/* Leave Type Grid */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[--text-secondary] uppercase tracking-wider">Select Leave Type</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'CL', label: 'Casual Leave', icon: Coffee, color: 'text-amber-500 bg-amber-50' },
                { id: 'SL', label: 'Sick Leave', icon: Heart, color: 'text-rose-500 bg-rose-50' },
                { id: 'EL', label: 'Earned Leave', icon: Sun, color: 'text-[--brand] bg-[--brand-light]' },
                { id: 'CO', label: 'Comp Off', icon: ShieldCheck, color: 'text-[--info] bg-[--info-light]' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: item.id as LeaveType })}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-2xl border-2 text-left transition-all",
                    formData.type === item.id
                      ? "border-[--brand] bg-[--brand-light]/50"
                      : "border-[--border] hover:border-[--brand]/40 bg-white"
                  )}
                >
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", item.color)}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[--text-primary] line-clamp-1">{item.label}</p>
                    <p className="text-[9px] font-bold text-[--text-muted] uppercase tracking-tight">{item.id}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker Range (Mock) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">From Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={16} />
                <input
                  type="date"
                  className="w-full bg-[--surface-alt] border border-[--border] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[--brand]/20"
                  value={formData.fromDate}
                  onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">To Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={16} />
                <input
                  type="date"
                  className="w-full bg-[--surface-alt] border border-[--border] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[--brand]/20"
                  value={formData.toDate}
                  onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Half Day & Reason */}
          <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-2xl border border-amber-100">
            <input
              type="checkbox"
              id="halfday"
              className="w-4 h-4 rounded text-[--brand] focus:ring-[--brand]"
              checked={formData.isHalfDay}
              onChange={(e) => setFormData({ ...formData, isHalfDay: e.target.checked })}
            />
            <label htmlFor="halfday" className="text-xs font-bold text-amber-800">
              Applying for a half-day?
              <span className="ml-1 font-medium opacity-80">(Deducts 0.5 days)</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">Reason for Leave</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-[--text-muted]" size={16} />
              <textarea
                rows={3}
                className="w-full bg-[--surface-alt] border border-[--border] rounded-xl pl-10 pr-4 py-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[--brand]/20 resize-none"
                placeholder="Tell us briefly why you need the time off..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>
          </div>

          {/* Guidelines info */}
          <div className="flex items-start space-x-3 p-3 rounded-2xl bg-[--surface-alt]/50 text-[10px] text-[--text-secondary]">
            <Info size={16} className="text-[--brand] shrink-0" />
            <p>Your request will be sent to <span className="font-bold text-[--text-primary]">Rajesh Sharma</span> for approval. Please allow 24-48 hours for review.</p>
          </div>

          {/* Submit */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl border border-[--border] text-xs font-bold text-[--text-secondary] hover:bg-[--surface-alt] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-3.5 rounded-2xl bg-[--brand] text-black text-xs font-bold hover:bg-[--brand]/90 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2"
            >
              <Plus size={18} />
              <span>Submit Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
