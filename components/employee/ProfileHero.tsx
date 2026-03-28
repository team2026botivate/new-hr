'use client';

import {
  Edit,
  MoreVertical,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { Employee } from '@/types';

interface ProfileHeroProps {
  employee: Employee;
  isOwnProfile?: boolean;
}

/**
 * Profile Hero section with cover, avatar, and quick info
 */
export default function ProfileHero({ employee, isOwnProfile }: ProfileHeroProps) {
  return (
    <div className="card-base p-0 overflow-hidden mb-6 relative group">
      {/* Cover Photo - Subtle Gradient */}
      <div className="h-48 bg-gradient-to-r from-[--brand] via-indigo-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/20" />
        <div className="absolute top-4 right-6 flex items-center space-x-2">
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-black px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2">
            <Edit size={14} />
            <span>Edit Cover</span>
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-8 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 sm:-mt-20 lg:-mt-24">
          {/* Avatar with Status Ring */}
          <div className="relative inline-block mx-auto md:mx-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-4xl font-extrabold text-[--brand] relative">
              {employee.avatar}
              {isOwnProfile && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Edit size={24} className="text-black" />
                </div>
              )}
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[--success] border-4 border-white shadow-sm ring-1 ring-[--border]" title="Online" />
          </div>

          {/* Profile Name & Roles */}
          <div className="flex-1 mt-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mb-2">
              <h2 className="text-3xl font-extrabold text-[--text-primary] tracking-tight">{employee.name}</h2>
              <div className="flex items-center justify-center md:justify-start space-x-2 mt-2 md:mt-0">
                <span className="px-2.5 py-1 rounded-full bg-[--brand-light] text-[--brand] text-[10px] font-bold uppercase tracking-widest border border-[--brand]/10">
                  {employee.designation}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[--surface-alt] text-[--text-secondary] text-[10px] font-bold uppercase tracking-widest border border-[--border]">
                  {employee.department}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-6 text-sm text-[--text-secondary]">
              <div className="flex items-center space-x-1.5">
                <MapPin size={16} className="text-[--text-muted]" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Mail size={16} className="text-[--text-muted]" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Shield size={16} className="text-[--text-muted]" />
                <span className="font-bold uppercase text-[10px] tracking-wider">Emp ID: {employee.id}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center md:justify-end space-x-2 mt-8 md:mt-0 pb-2">
            {isOwnProfile && (
              <button className="bg-[--brand] hover:bg-[--brand]/90 text-black px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all flex items-center space-x-2">
                <Edit size={16} />
                <span>Edit Profile</span>
              </button>
            )}
            {!isOwnProfile && (
              <button className="bg-[--brand-light] hover:bg-[--brand]/10 text-[--brand] px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center space-x-2">
                <Mail size={16} />
                <span>Message</span>
              </button>
            )}
            <button className="p-2.5 bg-[--surface-alt] hover:bg-[--border] rounded-xl text-[--text-secondary] transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hero Stats Strip */}
      <div className="bg-[--surface-alt]/50 border-t border-[--border] grid grid-cols-2 md:grid-cols-4 px-8 py-4">
        <div className="text-center md:text-left py-2 px-4 border-r border-[--border]">
          <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-1">Joined On</p>
          <p className="text-sm font-bold text-[--text-primary] flex items-center justify-center md:justify-start space-x-2">
            <Calendar size={14} className="text-[--brand]" />
            <span>{formatDate(employee.joiningDate)}</span>
          </p>
        </div>
        <div className="text-center md:text-left py-2 px-4 border-r border-[--border] hidden md:block">
          <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-1">Reporting To</p>
          <p className="text-sm font-bold text-[--text-primary] flex items-center justify-center md:justify-start space-x-2">
            <CheckCircle2 size={14} className="text-[--success]" />
            <span>Rajesh Sharma</span>
          </p>
        </div>
        <div className="text-center md:text-left py-2 px-4 border-r border-[--border] hidden md:block">
          <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-1">Status</p>
          <p className="text-sm font-bold text-[--text-primary] flex items-center justify-center md:justify-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-[--success]" />
            <span className="capitalize">{employee.status}</span>
          </p>
        </div>
        <div className="text-center md:text-left py-2 px-4">
          <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest mb-1">Working From</p>
          <p className="text-sm font-bold text-[--text-primary] flex items-center justify-center md:justify-start space-x-2 uppercase">
            <Clock size={14} className="text-[--brand]" />
            <span>IST (UTC +5:30)</span>
          </p>
        </div>
      </div>
    </div>
  );
}
