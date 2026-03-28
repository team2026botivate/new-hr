'use client';

import { useState } from 'react';
import {
  Users,
  MapPin,
  Search,
  Filter,
  ChevronRight,
  Building2,
  Network,
  MoreVertical,
  Mail,
  ShieldHalf,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import { useUIStore } from '@/lib/store/uiStore';
import { EMPLOYEES } from '@/lib/data/employees';
import { DEPARTMENTS } from '@/lib/constants';
import SmartTable from '@/components/shared/SmartTable';
import Modal from '@/components/shared/Modal';
import type { Employee, JoiningRecord } from '@/types';
import { useEffect } from 'react';

/**
 * Team Space Page
 * Includes Availability Strip, Department Wall, and Org Tree visualization
 */
export default function TeamPage() {
  // Map initial mock data to JoiningRecord structure
  const initialRecords = EMPLOYEES.map(emp => ({
    id: emp.id,
    joining_id: emp.id,
    name_as_per_aadhar: emp.name,
    father_name: 'Not Provided',
    date_of_birth: emp.dob,
    gender: emp.gender,
    department: emp.department,
    mobile_no: emp.phone,
    personal_email: emp.email,
    family_mobile_no: emp.emergencyContact,
    relationship_with_family: 'Emergency Contact',
    current_address: emp.address,
    date_of_joining: emp.joiningDate,
    designation: emp.designation,
    highest_qualification: 'Graduate',
    aadhar_card_number: emp.aadhaar,
    bank_account_no: emp.bankAccount,
    ifsc_code: emp.ifsc,
    branch_name: emp.bankName,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  const [records, setRecords] = useState<JoiningRecord[]>(initialRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { setFormActive } = useUIStore();

  // Focus Mode Integration
  useEffect(() => {
    setFormActive(isAddModalOpen);
    return () => setFormActive(false);
  }, [isAddModalOpen, setFormActive]);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name_as_per_aadhar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDept === 'All' || record.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[--text-primary]">Team Space</h1>
          <p className="text-sm text-[--text-secondary]">Connect and collaborate with your colleagues.</p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          <Plus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={18} />
            <input
              type="text"
              placeholder="Search by name, designation, or skills..."
              className="w-full bg-white border border-[--border] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <select
              className="bg-white border border-[--border] rounded-xl px-4 py-2.5 text-sm font-bold text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[--brand]/20 shadow-sm"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <button className="p-2.5 bg-white border border-[--border] rounded-xl text-[--text-secondary] hover:bg-[--surface-alt] transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table Layout */}
        <div className="bg-white rounded-2xl border border-[--border] shadow-sm overflow-hidden">
          <SmartTable
            data={filteredRecords}
            columns={[
              {
                header: 'Joining Details',
                key: 'name_as_per_aadhar',
                render: (record: JoiningRecord) => (
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-2xl bg-[--brand-light] text-[--brand] flex items-center justify-center font-bold text-xs ring-1 ring-white shadow-sm shrink-0">
                      {record.name_as_per_aadhar.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[--text-primary] truncate">{record.name_as_per_aadhar}</span>
                      <span className="text-[9px] font-black text-[--text-secondary] uppercase tracking-wider tabular-nums">{record.joining_id}</span>
                    </div>
                  </div>
                )
              },
              {
                header: 'Department / Role',
                key: 'department',
                render: (record: JoiningRecord) => (
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[--text-primary]">{record.designation}</span>
                    <span className="text-[9px] font-medium text-[--text-secondary]">{record.department}</span>
                  </div>
                )
              },
              {
                header: 'Contact Info',
                key: 'mobile_no',
                render: (record: JoiningRecord) => (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[--text-primary] tabular-nums">{record.mobile_no}</span>
                    <span className="text-[9px] text-[--text-secondary]">{record.personal_email}</span>
                  </div>
                )
              },
              {
                header: 'KYC & Qualification',
                key: 'aadhar_card_number',
                render: (record: JoiningRecord) => (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-medium text-[--text-primary] tabular-nums">Aadhar: {record.aadhar_card_number}</span>
                    <span className="text-[9px] text-[--text-secondary]">{record.highest_qualification}</span>
                  </div>
                )
              },
              {
                header: 'Joining Date',
                key: 'date_of_joining',
                render: (record: JoiningRecord) => (
                  <div className="flex items-center space-x-1.5">
                    <Building2 size={12} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-[--text-secondary] tabular-nums">
                      {new Date(record.date_of_joining).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                )
              },
              {
                header: 'Actions',
                key: 'joining_id',
                className: 'text-right',
                render: (record: JoiningRecord) => (
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 hover:bg-[--brand-light] hover:text-[--brand] rounded-xl transition-all text-[--text-secondary]">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 hover:bg-[--brand-light] hover:text-[--brand] rounded-xl transition-all text-[--text-secondary]">
                      <Users size={16} />
                    </button>
                  </div>
                )
              }
            ]}
            mobileCardRender={(record: JoiningRecord) => (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-[--brand-light] text-[--brand] flex items-center justify-center font-black text-sm">
                      {record.name_as_per_aadhar.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[--text-primary] leading-none">{record.name_as_per_aadhar}</p>
                      <p className="text-[10px] font-bold text-[--text-muted] mt-1 tabular-nums uppercase">{record.joining_id}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-[--border]">
                  <div>
                    <p className="text-[9px] font-black text-[--text-muted] uppercase tracking-widest mb-1">Department</p>
                    <p className="text-[11px] font-bold text-[--text-secondary]">{record.department}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[--text-muted] uppercase tracking-widest mb-1">Joining Date</p>
                    <p className="text-[11px] font-bold text-[--text-secondary]">{record.date_of_joining}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 text-[--text-secondary]">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="text-[11px] font-medium">{record.current_address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex-1 py-2.5 rounded-xl bg-[--surface-alt] text-[10px] font-bold uppercase tracking-wider text-[--text-secondary]">Details</button>
                  <button className="flex-1 py-2.5 rounded-xl bg-black text-white text-[10px] font-bold uppercase tracking-wider">Contact</button>
                </div>
              </div>
            )}
          />
        </div>

        <Modal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          title="New Joining Form"
          width="max-w-3xl"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const joiningId = (formData.get('joining_id') as string) || `JW${records.length + 101}`;
              const newRecord: JoiningRecord = {
                id: joiningId, // Required by SmartTable
                joining_id: joiningId,
                name_as_per_aadhar: formData.get('name_as_per_aadhar') as string,
                father_name: formData.get('father_name') as string,
                date_of_birth: formData.get('date_of_birth') as string,
                gender: formData.get('gender') as any,
                department: formData.get('department') as string,
                mobile_no: formData.get('mobile_no') as string,
                personal_email: formData.get('personal_email') as string,
                family_mobile_no: formData.get('family_mobile_no') as string,
                relationship_with_family: formData.get('relationship_with_family') as string,
                current_address: formData.get('current_address') as string,
                date_of_joining: formData.get('date_of_joining') as string,
                designation: formData.get('designation') as string,
                highest_qualification: formData.get('highest_qualification') as string,
                aadhar_card_number: formData.get('aadhar_card_number') as string,
                bank_account_no: formData.get('bank_account_no') as string,
                ifsc_code: formData.get('ifsc_code') as string,
                branch_name: formData.get('branch_name') as string,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              setRecords([newRecord, ...records]);
              setIsAddModalOpen(false);
            }}
            className="space-y-8"
          >
            {/* Section 1: Personal Details */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-[--brand] uppercase tracking-[0.2em] pb-2 border-b border-[--brand]/10">1. Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Name (As per Aadhar)</label>
                  <input name="name_as_per_aadhar" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="Rahul Sharma" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Father's Name</label>
                  <input name="father_name" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="Suresh Sharma" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Date of Birth</label>
                  <input name="date_of_birth" type="date" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Gender</label>
                  <select name="gender" className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Contact & Address */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-[--brand] uppercase tracking-[0.2em] pb-2 border-b border-[--brand]/10">2. Contact & Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Mobile Number</label>
                  <input name="mobile_no" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Personal Email</label>
                  <input name="personal_email" type="email" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="rahul@gmail.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Family Mobile No</label>
                  <input name="family_mobile_no" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="+91 90000 11111" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Relationship</label>
                  <input name="relationship_with_family" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="Father / Mother / Spouse" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Current Address</label>
                <textarea name="current_address" rows={2} required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all resize-none" placeholder="Enter full residential address..." />
              </div>
            </div>

            {/* Section 3: Professional Details */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-[--brand] uppercase tracking-[0.2em] pb-2 border-b border-[--brand]/10">3. Professional Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Joining ID (Optional)</label>
                  <input name="joining_id" className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all font-mono" placeholder="Auto-generated if blank" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Date of Joining</label>
                  <input name="date_of_joining" type="date" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Department</label>
                  <select name="department" className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all">
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Designation</label>
                  <input name="designation" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="Software Engineer" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Highest Qualification</label>
                  <input name="highest_qualification" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="e.g., M.Tech in Computer Science" />
                </div>
              </div>
            </div>

            {/* Section 4: Bank & KYC */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-[--brand] uppercase tracking-[0.2em] pb-2 border-b border-[--brand]/10">4. Bank & KYC Info</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Aadhar Card Number</label>
                  <input name="aadhar_card_number" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="XXXX XXXX XXXX" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Bank Account No</label>
                  <input name="bank_account_no" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="000000000000" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">IFSC Code</label>
                  <input name="ifsc_code" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="SBIN0000123" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-wider">Branch Name</label>
                  <input name="branch_name" required className="w-full bg-[--surface-alt] border border-[--border] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 transition-all" placeholder="HSR Layout, Bengaluru" />
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center space-x-3 sticky bottom-0 bg-white py-4 border-t border-[--border]">
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-[--border] text-xs font-bold text-[--text-secondary] hover:bg-[--surface-alt] transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-3 rounded-xl bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                Submit Joining Form
              </button>
            </div>
          </form>
        </Modal>

        {filteredRecords.length === 0 && (
          <div className="py-20 text-center">
            <Users size={48} className="mx-auto text-[--text-muted] opacity-20 mb-4" />
            <p className="text-lg font-bold text-[--text-secondary]">No records found</p>
            <p className="text-sm text-[--text-muted]">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
