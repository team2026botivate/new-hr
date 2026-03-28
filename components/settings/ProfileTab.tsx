'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Briefcase, Calendar } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { cn } from '@/lib/utils';

export default function ProfileTab() {
   const { user } = useAuthStore();
   const [profile, setProfile] = useState({
      name: user?.name || 'Arjun Nair',
      email: user?.email || 'arjun.nair@techinfinia.in',
      phone: user?.phone || '+91 98765 43210',
      designation: user?.designation || 'Senior Software Engineer',
      department: user?.department || 'Engineering',
      location: user?.location || 'Bengaluru, Karnataka',
      joiningDate: user?.joiningDate || '2021-06-01',
   });

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Avatar Section */}
         <div className="card-base p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative group">
               <div className="w-24 h-24 rounded-3xl bg-[--brand-light] text-[--brand] flex items-center justify-center text-3xl font-black border-4 border-white shadow-xl italic cursor-pointer group-hover:bg-[--brand] group-hover:text-black transition-all duration-300">
                  {profile.name.split(' ').map(n => n[0]).join('')}
               </div>
               <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-[--border] rounded-xl shadow-lg text-[--text-secondary] hover:text-[--brand] transition-all">
                  <Camera size={16} />
               </button>
            </div>
            <div>
               <h3 className="text-xl font-black text-[--text-primary] tracking-tight italic">{profile.name}</h3>
               <p className="text-xs font-bold text-[--text-secondary] uppercase tracking-widest">{profile.designation}</p>
            </div>
         </div>

         {/* Details Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="card-base p-6 space-y-6 flex flex-col h-full">
               <div className="flex items-center space-x-2 border-b border-[--border] pb-4">
                  <User size={18} className="text-[--brand]" />
                  <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter">Personal Information</h4>
               </div>

               <div className="space-y-4 flex-1">
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">Full Name</label>
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={14} />
                        <input
                           type="text"
                           className="settings-input pl-9"
                           value={profile.name}
                           onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">E-mail Address</label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={14} />
                        <input
                           type="email"
                           className="settings-input pl-9"
                           value={profile.email}
                           onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">Phone Number</label>
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={14} />
                        <input
                           type="tel"
                           className="settings-input pl-9"
                           value={profile.phone}
                           onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Work Info */}
            <div className="card-base p-6 space-y-6 flex flex-col h-full">
               <div className="flex items-center space-x-2 border-b border-[--border] pb-4">
                  <Briefcase size={18} className="text-[--brand]" />
                  <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter">Employment Details</h4>
               </div>

               <div className="space-y-4 flex-1">
                  <div className="flex items-start justify-between p-3 rounded-2xl bg-[--surface-alt]/50 border border-[--border]/50">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-[--text-secondary] uppercase tracking-widest">Department</p>
                        <p className="text-sm font-black text-[--text-primary] tracking-tight">{profile.department}</p>
                     </div>
                     <div className="w-8 h-8 rounded-xl bg-white border border-[--border] flex items-center justify-center text-[--brand]">
                        <MapPin size={14} />
                     </div>
                  </div>

                  <div className="flex items-start justify-between p-3 rounded-2xl bg-[--surface-alt]/50 border border-[--border]/50">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest">Office Location</p>
                        <p className="text-sm font-black text-[--text-primary] tracking-tight">{profile.location}</p>
                     </div>
                     <div className="w-8 h-8 rounded-xl bg-white border border-[--border] flex items-center justify-center text-[--success]">
                        <Calendar size={14} />
                     </div>
                  </div>

                  <div className="flex items-start justify-between p-3 rounded-2xl bg-[--surface-alt]/50 border border-[--border]/50">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest">Joining Date</p>
                        <p className="text-sm font-black text-[--text-primary] tracking-tight">{profile.joiningDate}</p>
                     </div>
                     <div className="w-8 h-8 rounded-xl bg-white border border-[--border] flex items-center justify-center text-amber-500">
                        <User size={14} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
