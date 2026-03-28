'use client';

import { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Sword,
  FileText,
  Timer,
  CalendarDays,
  Banknote,
  BarChart3,
  MapPin,
  Mail,
  Phone,
  Droplet,
  Smartphone,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Employee } from '@/types';

interface ProfileTabsProps {
  employee: Employee;
  isOwnProfile?: boolean;
}

/**
 * Profile navigation tabs and content switcher
 */
export default function ProfileTabs({ employee, isOwnProfile }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('Profile Home');

  const tabs = [
    { name: 'Profile Home', icon: User },
    { name: 'Work Experience', icon: Briefcase },
    { name: 'Education', icon: GraduationCap },
    { name: 'Skill Set', icon: Sword },
    { name: 'Documents', icon: FileText },
    { name: 'Time Tracker', icon: Timer },
    { name: 'Leave / Attendance', icon: CalendarDays },
    { name: 'Compensation', icon: Banknote },
    { name: 'Performance (KRA)', icon: BarChart3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar Tabs */}
      <div className="lg:col-span-3">
        <div className="card-base p-2 space-y-1 sticky top-24">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.name
                  ? "bg-[--brand-light] text-[--brand] shadow-sm"
                  : "text-[--text-secondary] hover:bg-[--surface-alt] hover:text-[--text-primary]"
              )}
            >
              <tab.icon size={18} className={cn(
                activeTab === tab.name ? "text-[--brand]" : "text-[--text-muted]"
              )} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 space-y-6">
        {activeTab === 'Profile Home' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Personal Info Grid */}
            <div className="card-base">
              <h3 className="text-base font-bold text-[--text-primary] mb-6 flex items-center space-x-2">
                <User size={20} className="text-[--brand]" />
                <span>Personal Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                <InfoItem label="Employee ID" value={employee.id} />
                <InfoItem label="Date of Birth" value={employee.dob} />
                <InfoItem label="Blood Group" value={employee.bloodGroup} />
                <InfoItem label="Gender" value={employee.gender} />
                <InfoItem label="Phone" value={employee.phone} icon={<Smartphone size={14} />} />
                <InfoItem label="Personal Email" value={employee.email} icon={<Mail size={14} />} />
                <InfoItem label="Emergency Contact" value={employee.emergencyContact} className="md:col-span-2 lg:col-span-3" />
                <InfoItem label="Address" value={employee.address} className="md:col-span-2 lg:col-span-3" />
              </div>
            </div>

            {/* Work Info Grid */}
            <div className="card-base">
              <h3 className="text-base font-bold text-[--text-primary] mb-6 flex items-center space-x-2">
                <Briefcase size={20} className="text-[--brand]" />
                <span>Work Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                <InfoItem label="Department" value={employee.department} />
                <InfoItem label="Designation" value={employee.designation} />
                <InfoItem label="Reporting Manager" value="Rajesh Sharma" />
                <InfoItem label="Manager Role" value="CTO" />
                <InfoItem label="Location" value={employee.location} icon={<MapPin size={14} />} />
                <InfoItem label="Employment Type" value="Full-Time / On-site" />
                <InfoItem label="Joining Date" value={employee.joiningDate} />
                <InfoItem label="Probation Status" value={employee.status === 'probation' ? 'Ongoing' : 'Completed'} />
              </div>
            </div>

            {/* KYC / Bank (Conditional Visibility) */}
            {(isOwnProfile || employee.role === 'admin' || employee.role === 'hr') && (
              <div className="card-base border-dashed border-2">
                <h3 className="text-base font-bold text-[--text-primary] mb-6 flex items-center space-x-2">
                  <ShieldCheck size={20} className="text-[--brand]" />
                  <span>KYC & Banking Details</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                  <InfoItem label="PAN Number" value={employee.pan} />
                  <InfoItem label="Aadhaar Number" value={employee.aadhaar} />
                  <InfoItem label="Bank Name" value={employee.bankName} />
                  <InfoItem label="Account Number" value={employee.bankAccount} icon={<CreditCard size={14} />} />
                  <InfoItem label="IFSC Code" value={employee.ifsc} />
                </div>
                <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3 text-[10px] text-amber-800 font-medium">
                  <InfoItem label="" value="Restricted information. This section is only visible to Admin, HR, and the respective Employee." />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab !== 'Profile Home' && (
          <div className="card-base h-64 flex flex-col items-center justify-center text-center p-12 animate-in fade-in fill-mode-backwards">
            <div className="w-16 h-16 rounded-full bg-[--surface-alt] flex items-center justify-center mb-4 text-[--text-muted]">
              <Briefcase size={32} />
            </div>
            <h3 className="text-lg font-bold text-[--text-primary]">Section Under Development</h3>
            <p className="text-sm text-[--text-secondary] mt-1 max-w-sm">
              We are currently building this module for the {activeTab} section. Check back soon for the full experience!
            </p>
            <button className="mt-6 px-6 py-2 rounded-xl bg-[--brand] text-black text-sm font-bold shadow-md shadow-indigo-100 hover:bg-[--brand]/90 transition-all">
              Notify Me
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Sub-component for individual info items
 */
function InfoItem({ label, value, icon, className }: { label: string; value: string; icon?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest">{label}</p>
      <div className="flex items-center space-x-2 text-sm font-bold text-[--text-primary]">
        {icon && <span className="text-[--text-muted]">{icon}</span>}
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}
