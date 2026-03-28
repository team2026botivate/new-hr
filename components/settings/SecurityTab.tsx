'use client';

import { useState } from 'react';
import { Shield, Key, Smartphone, Monitor, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/lib/hooks/useToast';

export default function SecurityTab() {
   const { addToast } = useToast();
   const [mfaEnabled, setMfaEnabled] = useState(false);

   const handlePasswordChange = (e: React.FormEvent) => {
      e.preventDefault();
      addToast({
         type: 'success',
         title: 'Password Changed',
         message: 'Your new password has been set and we logged out other sessions.',
      });
   };

   const sessions = [
      { id: 1, device: 'MacBook Pro - Chrome', location: 'Bengaluru, IN', current: true },
      { id: 2, device: 'iPhone 15 - Safari', location: 'Mumbai, IN', current: false },
   ];

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         {/* Change Password */}
         <div className="card-base p-6 space-y-6">
            <div className="flex items-center space-x-2 border-b border-[--border] pb-4">
               <Key size={18} className="text-[--brand]" />
               <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter">Authentication</h4>
            </div>

            <form className="space-y-4" onSubmit={handlePasswordChange}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-[0.2em] pl-1">Current Password</label>
                     <input type="password" placeholder="••••••••" className="settings-input" required />
                  </div>
                  <div className="space-y-1.5 md:col-start-1">
                     <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-[0.2em] pl-1">New Password</label>
                     <input type="password" placeholder="••••••••" className="settings-input" required />
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-[--text-secondary] uppercase tracking-[0.2em] pl-1">Confirm New Password</label>
                     <input type="password" placeholder="••••••••" className="settings-input" required />
                  </div>
               </div>
               <button type="submit" className="px-6 py-2.5 bg-white border border-[--border] rounded-xl text-xs font-bold text-[--text-primary] hover:bg-[--surface-alt] transition-all">
                  Update Password
               </button>
            </form>
         </div>

         {/* MFA Card */}
         <div className="card-base p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-indigo-50/30 border-indigo-100">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-100 flex items-center justify-center text-[--brand] shadow-sm">
                  <Smartphone size={24} />
               </div>
               <div>
                  <h4 className="text-sm font-black text-[--text-primary] tracking-tight">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[10px] font-medium text-[--text-secondary]">Add an extra layer of security to your account.</p>
               </div>
            </div>
            <button
               onClick={() => setMfaEnabled(!mfaEnabled)}
               className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm",
                  mfaEnabled ? "bg-red-50 text-red-600 border border-red-100" : "bg-[--brand] text-black"
               )}
            >
               {mfaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
         </div>

         {/* Active Sessions */}
         <div className="card-base p-0 overflow-hidden">
            <div className="p-6 border-b border-[--border] bg-[--surface-alt]/30">
               <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter italic">Active Sessions</h4>
               <p className="text-[10px] font-bold text-[--text-secondary] mt-1 tracking-tight uppercase">You are currently logged in on these devices.</p>
            </div>

            <div className="p-2 space-y-1">
               {sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-[--surface-alt]/50 transition-all group">
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-[--surface-alt] flex items-center justify-center text-[--text-secondary]">
                           <Monitor size={20} />
                        </div>
                        <div>
                           <div className="flex items-center space-x-2">
                              <p className="text-sm font-bold tracking-tight text-[--text-primary]">{session.device}</p>
                              {session.current && <span className="px-1.5 py-0.5 rounded-md bg-[--success-light] text-[--success] text-[8px] font-black uppercase">Current</span>}
                           </div>
                           <p className="text-[10px] text-[--text-secondary]">{session.location}</p>
                        </div>
                     </div>

                     {!session.current && (
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                           <LogOut size={16} />
                        </button>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
