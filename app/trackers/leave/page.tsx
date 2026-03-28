'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  Download,
  Coffee,
  Heart,
  Sun,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Info
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import LoadingSkeleton, { SkeletonItem } from '@/components/shared/LoadingSkeleton';
import SmartTable from '@/components/shared/SmartTable';
import LeaveApplyModal from '@/components/trackers/LeaveApplyModal';
import { useLeaveStore } from '@/lib/store/leaveStore';
import { useUIStore } from '@/lib/store/uiStore';
import { useToast } from '@/lib/hooks/useToast';
import { EMPLOYEES } from '@/lib/data/employees';
import type { LeaveRequest } from '@/types';

/**
 * Leave Tracker Page
 * Full system for applying and tracking leave history
 */
export default function LeaveTrackerPage() {
  const { requests, balances, applyLeave } = useLeaveStore();
  const { setFormActive } = useUIStore();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle Navbar focus mode
  useEffect(() => {
    setFormActive(isModalOpen);
    return () => setFormActive(false);
  }, [isModalOpen, setFormActive]);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || req.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSubmitLeave = (data: any) => {
    // Calculate days between dates
    const start = new Date(data.fromDate);
    const end = new Date(data.toDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    applyLeave({
      employeeId: 'EMP087', // Demo user
      type: data.type,
      fromDate: data.fromDate,
      toDate: data.toDate,
      days: data.isHalfDay ? 0.5 : diffDays,
      reason: data.reason,
      isHalfDay: data.isHalfDay,
    });

    setIsModalOpen(false);

    addToast({
      type: 'success',
      title: 'Application Submitted',
      message: `Your ${data.type} request for ${diffDays} day(s) has been sent for approval.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[--text-primary]">Leave Tracker</h1>
          <p className="text-sm text-[--text-secondary]">Manage your time off and view team attendance.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-[--brand] text-black rounded-xl text-sm font-bold hover:bg-[--brand]/90 transition-all shadow-lg shadow-indigo-100 self-start"
        >
          <Plus size={20} />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {balances.map((item, idx) => (
          <div key={idx} className="card-base group hover:border-[--brand] transition-all cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                item.type === 'CL' ? "bg-amber-50 text-amber-500" :
                  item.type === 'SL' ? "bg-rose-50 text-rose-500" :
                    item.type === 'EL' ? "bg-[--brand-light] text-[--brand]" :
                      "bg-[--info-light] text-[--info]"
              )}>
                {item.type === 'CL' ? <Coffee size={24} /> :
                  item.type === 'SL' ? <Heart size={24} /> :
                    item.type === 'EL' ? <Sun size={24} /> :
                      <ShieldCheck size={24} />}
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-[--text-primary] leading-none">{item.remaining}</p>
                <p className="text-[9px] font-black text-[--text-secondary] uppercase tracking-[0.2em] mt-1.5">Days Remaining</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-[--text-primary] tracking-tight">{item.name}</h5>
                <p className="text-[10px] text-[--text-secondary] mt-0.5">Used: {item.used} / {item.total} days</p>
              </div>
              <div className="w-16 h-1 bg-[--surface-alt] rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    item.type === 'CL' ? "bg-amber-500" :
                      item.type === 'SL' ? "bg-rose-500" :
                        item.type === 'EL' ? "bg-[--brand]" :
                          "bg-[--info]"
                  )}
                  style={{ width: `${(item.used / item.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-secondary]" size={18} />
          <input
            type="text"
            placeholder="Search by reason or keyword..."
            className="w-full bg-white border border-[--border] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            className="bg-white border border-[--border] rounded-xl px-4 py-2.5 text-sm font-bold text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--brand]/20 shadow-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="CL">Casual Leave</option>
            <option value="SL">Sick Leave</option>
            <option value="EL">Earned Leave</option>
            <option value="CO">Comp Off</option>
          </select>

          <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-[--border] text-[--text-secondary] rounded-xl text-sm font-bold hover:bg-[--surface-alt] transition-all shadow-sm">
            <Download size={18} />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* Leave History Table with Loading State */}
      <LoadingSkeleton
        isLoading={isLoading}
        fallback={
          <div className="space-y-4">
            <SkeletonItem className="h-12 w-full" />
            <SkeletonItem className="h-20 w-full" />
            <SkeletonItem className="h-20 w-full" />
            <SkeletonItem className="h-20 w-full" />
          </div>
        }
      >
        <SmartTable
          data={filteredRequests}
          columns={[
            {
              header: 'Leave Type',
              key: 'type',
              render: (item: LeaveRequest) => (
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center font-bold text-[10px]",
                    item.type === 'CL' ? "bg-amber-50 text-amber-500" :
                      item.type === 'SL' ? "bg-rose-50 text-rose-500" :
                        item.type === 'EL' ? "bg-[--brand-light] text-[--brand]" :
                          "bg-[--info-light] text-[--info]"
                  )}>
                    {item.type}
                  </div>
                  <span className="text-xs font-bold text-[--text-primary]">{item.isHalfDay ? 'Half Day' : 'Full Day'}</span>
                </div>
              )
            },
            {
              header: 'Dates',
              key: 'fromDate',
              render: (item: LeaveRequest) => (
                <div>
                  <p className="text-xs font-bold text-[--text-primary]">{formatDate(item.fromDate)}</p>
                  <p className="text-[10px] text-[--text-secondary]">{item.days} Day{item.days > 1 ? 's' : ''}</p>
                </div>
              )
            },
            {
              header: 'Reason',
              key: 'reason',
              className: 'max-w-xs',
              render: (item: LeaveRequest) => (
                <p className="text-xs text-[--text-secondary] line-clamp-1 italic">&quot;{item.reason}&quot;</p>
              )
            },
            {
              header: 'Applied On',
              key: 'appliedOn',
              render: (item: LeaveRequest) => (
                <p className="text-[10px] font-black text-[--text-secondary] tracking-widest uppercase">{formatDate(item.appliedOn)}</p>
              )
            },
            {
              header: 'Status',
              key: 'status',
              render: (item: LeaveRequest) => (
                <div className="flex items-center space-x-2">
                  {item.status === 'approved' && <div className="w-1.5 h-1.5 rounded-full bg-[--success]" />}
                  {item.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-[--warning]" />}
                  {item.status === 'rejected' && <div className="w-1.5 h-1.5 rounded-full bg-[--danger]" />}
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest",
                    item.status === 'approved' ? "text-[--success]" :
                      item.status === 'pending' ? "text-[--warning]" :
                        "text-[--danger]"
                  )}>
                    {item.status}
                  </span>
                </div>
              )
            },
          ]}
          mobileCardRender={(item: LeaveRequest) => (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                  item.status === 'approved' ? "bg-[--success-light] text-[--success]" :
                    item.status === 'pending' ? "bg-[--warning-light] text-[--warning]" :
                      "bg-[--danger-light] text-[--danger]"
                )}>
                  {item.status}
                </div>
                <span className="text-[10px] font-bold text-[--text-muted]">{formatDate(item.appliedOn)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs",
                  item.type === 'CL' ? "bg-amber-50 text-amber-500" :
                    item.type === 'SL' ? "bg-rose-50 text-rose-500" :
                      item.type === 'EL' ? "bg-[--brand-light] text-[--brand]" :
                        "bg-[--info-light] text-[--info]"
                )}>
                  {item.type}
                </div>
                <div>
                  <p className="text-sm font-bold text-[--text-primary]">{item.days} Day {item.type} Application</p>
                  <p className="text-xs text-[--text-secondary]">{formatDate(item.fromDate)}</p>
                </div>
              </div>
              <div className="p-3 bg-[--surface-alt] rounded-xl">
                <p className="text-xs text-[--text-secondary] line-clamp-3 italic tracking-tight">&quot;{item.reason}&quot;</p>
              </div>
            </div>
          )}
        />
      </LoadingSkeleton>

      {/* Info Banner */}
      <div className="p-4 rounded-2xl bg-[--brand-light] border border-[--brand]/10 flex items-start space-x-3 text-xs text-[--brand] font-medium animate-in slide-in-from-bottom-2 delay-300">
        <Info size={18} className="shrink-0" />
        <p>
          All leave applications are subject to approval by your manager.
          Please ensure you have sufficient balance before applying.
          <span className="font-bold border-b border-[--brand] ml-1 cursor-pointer">View Policy</span>
        </p>
      </div>

      <LeaveApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitLeave}
      />
    </div>
  );
}
