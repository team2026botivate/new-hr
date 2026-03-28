'use client';

import { CheckCircle2, XCircle, Clock, ChevronRight, User } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import { LEAVE_REQUESTS } from '@/lib/data/leaves';
import { EMPLOYEES } from '@/lib/data/employees';

/**
 * Pending approval requests table for HR/Admin
 */
export default function ApprovalRequests() {
  const { role } = useAuthStore();

  if (role === 'employee') return null;

  // Filter pending requests for demo
  const pendingRequests = LEAVE_REQUESTS.filter(r => r.status === 'pending');

  return (
    <div className="card-base h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Clock size={20} className="text-[--brand]" />
          <h4 className="text-base font-semibold text-[--text-primary]">Pending Approvals</h4>
        </div>
        <div className="flex items-center space-x-1.5 bg-[--brand-light] text-[--brand] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          <span>{pendingRequests.length} Requests</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-[--border]">
              <th className="py-3 px-4 text-[10px] font-black text-[--text-primary] uppercase tracking-widest">Employee</th>
              <th className="py-3 px-4 text-[10px] font-black text-[--text-primary] uppercase tracking-widest">Type</th>
              <th className="py-3 px-4 text-[10px] font-black text-[--text-primary] uppercase tracking-widest">Duration</th>
              <th className="py-3 px-4 text-[10px] font-black text-[--text-primary] uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--border]">
            {pendingRequests.map((req, idx) => {
              const emp = EMPLOYEES.find(e => e.id === req.employeeId);
              return (
                <tr key={idx} className="group hover:bg-[--surface-alt]/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[--brand-light] text-[--brand] flex items-center justify-center font-bold text-[10px] ring-2 ring-white shadow-sm shrink-0">
                        {emp?.avatar || '??'}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-[--text-primary] truncate">{emp?.name || 'Unknown'}</p>
                        <p className="text-[10px] text-[--text-primary] truncate tracking-tight">{emp?.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[--surface-alt] text-[--text-secondary] uppercase">
                      {req.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-xs font-medium text-[--text-primary] mb-0.5">{req.days} Day{req.days > 1 ? 's' : ''}</p>
                    <p className="text-[10px] text-[--text-secondary]">{formatDate(req.fromDate)}</p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-[--success-light] text-[--success] hover:bg-[--success] hover:text-black rounded-xl transition-all shadow-sm">
                        <CheckCircle2 size={16} />
                      </button>
                      <button className="p-2 bg-[--danger-light] text-[--danger] hover:bg-[--danger] hover:text-black rounded-xl transition-all shadow-sm">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {pendingRequests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 size={40} className="text-[--success] opacity-20 mb-4" />
            <p className="text-sm font-bold text-[--text-secondary]">All caught up!</p>
            <p className="text-xs text-[--text-muted]">No pending approval requests found.</p>
          </div>
        )}
      </div>

      <button className="mt-5 w-full py-2.5 rounded-xl border border-[--border] text-xs font-bold text-[--text-secondary] hover:bg-[--surface-alt] hover:text-[--text-primary] transition-all flex items-center justify-center space-x-2 group">
        <span>View Full Table</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
