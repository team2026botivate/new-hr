'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
   ShieldCheck,
   ArrowRight,
   CheckCircle2,
   Users,
   UserPlus,
   Building2,
   Zap,
   Globe,
   Lock,
   Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import type { Role } from '@/types';

const DEMO_ROLES = [
   {
      id: 'admin',
      name: 'Administrator',
      desc: 'Full systems, finance, and settings control.',
      icon: ShieldCheck,
      color: 'from-amber-400 to-orange-600',
      email: 'rajesh.sharma@techinfinia.in'
   },
   {
      id: 'hr',
      name: 'HR Manager',
      desc: 'Employee data, leave, and payroll access.',
      icon: Building2,
      color: 'from-indigo-400 to-blue-600',
      email: 'priya.mehta@techinfinia.in'
   },
   {
      id: 'employee',
      name: 'Employee',
      desc: 'Self-service trackers, profile, and payslips.',
      icon: Users,
      color: 'from-green-400 to-emerald-600',
      email: 'arjun.nair@techinfinia.in'
   }
];

/**
 * High-Fidelity Split-Screen Login
 * Fulfills "colorful modern UI" request from UI.md
 */
export default function LoginPage() {
   const router = useRouter();
   const { setRole } = useAuthStore();
   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedRole) return;

      setIsLoading(true);
      // Simulate auth lag for that premium feel
      setTimeout(() => {
         setRole(selectedRole);
         router.push('/');
      }, 1200);
   };

   return (
      <div className="min-h-screen flex bg-white overflow-hidden animate-in fade-in duration-700">

         {/* Left: Brand Illustration (Responsive - hidden on small) */}
         <div className="hidden lg:flex lg:w-3/5 bg-linear-to-br from-slate-900 via-indigo-950 to-black p-12 flex-col justify-between relative overflow-hidden">
            {/* Colorful Abstract Background */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
               <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, var(--brand) 0%, transparent 70%)' }} />
               <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, var(--brand-vibrant) 0%, transparent 70%)' }} />
            </div>

            {/* Content Area */}
            <div className="relative z-10 max-w-xl space-y-12 animate-in slide-in-from-left-8 duration-700">
               <div className="flex items-center space-x-3 group cursor-default">
                  <div className="w-14 h-14 rounded-3xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105" style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-vibrant) 100%)' }}>
                     <Building2 className="text-black w-8 h-8" />
                  </div>
                  <div>
                     <h1 className="text-3xl font-black text-black tracking-tighter">TechInfinia</h1>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Solutions Pvt. Ltd.</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <h2 className="text-6xl font-black text-black tracking-tight leading-[1.1]">
                     The Future of <br />
                     <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, var(--brand), var(--brand-vibrant))' }}>Work Management.</span>
                  </h2>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-md">
                     Empower your workforce with India&apos;s most advanced HRMS dashboard. Real-time trackers, automated payroll, and seamless collaboration.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-8 pt-8">
                  {[
                     { label: 'Trusted By', val: '250+ Brands', icon: Zap },
                     { label: 'Uptime', val: '99.99%', icon: Globe }
                  ].map((item, idx) => (
                     <div key={idx} className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl flex items-center justify-center text-black">
                           <item.icon size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                           <p className="text-sm font-black text-black">{item.val}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Bottom Tagline */}
            <div className="relative z-10 text-[10px] font-black uppercase text-slate-600 tracking-[0.3em]">
               &copy; 2025 TechInfinia Cloud Platform
            </div>
         </div>

         {/* Right: Login Form Column */}
         <div className="w-full lg:w-2/5 flex flex-col justify-center p-8 sm:p-12 lg:p-20 bg-white relative">

            {/* Mobile Header (Fixed) */}
            <div className="md:hidden sticky top-0 z-60 w-full h-16 bg-white border-b border-[--border] flex items-center justify-between px-4">
               <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-[--brand] flex items-center justify-center">
                     <Building2 className="text-black w-5 h-5" />
                  </div>
                  <span className="font-black text-slate-900">TechInfinia</span>
               </div>
            </div>

            <div className="max-w-sm mx-auto w-full space-y-10 animate-in slide-in-from-right-8 duration-700">

               {/* Form Header */}
               <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h3>
                  <p className="text-sm text-slate-500 font-medium">Select your role to access the demo dashboard.</p>
               </div>

               {/* Role Selection Grid */}
               <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Login As</p>
                     <div className="grid grid-cols-1 gap-3">
                        {DEMO_ROLES.map((r) => (
                           <button
                              key={r.id}
                              type="button"
                              onClick={() => setSelectedRole(r.id as Role)}
                              className={cn(
                                 "group flex items-center space-x-4 p-4 rounded-3xl border-2 text-left transition-all",
                                 selectedRole === r.id
                                    ? "border-[--brand] bg-[--brand-light]/30 shadow-xl shadow-indigo-100/50 scale-[1.02]"
                                    : "border-slate-100 hover:border-slate-300 bg-white"
                              )}
                           >
                              <div className={cn(
                                 "w-12 h-12 rounded-2xl flex items-center justify-center text-black shadow-lg shrink-0",
                                 `bg-linear-to-br ${r.color}`
                              )}>
                                 <r.icon size={24} />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className="text-sm font-black text-slate-900 flex items-center">
                                    {r.name}
                                    {selectedRole === r.id && <CheckCircle2 size={12} className="ml-2 text-[--brand]" />}
                                 </h4>
                                 <p className={cn(
                                    "text-[10px] font-medium transition-colors",
                                    selectedRole === r.id ? "text-[--text-secondary]" : "text-slate-400"
                                 )}>{r.desc}</p>
                              </div>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Password Field (Mock) */}
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Demo Access PIN</label>
                     <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" size={18} />
                        <input
                           type="password"
                           placeholder="Enter any 4-digit PIN"
                           className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[--brand]/20 transition-all outline-none"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>
                     <div className="flex justify-between px-1">
                        <p className="text-[9px] font-bold text-slate-500 italic">Hint: Any value works in demo mode</p>
                        <button type="button" className="text-[10px] font-black text-[--brand] hover:underline uppercase tracking-widest">Forgot PIN?</button>
                     </div>
                  </div>

                  {/* Submit Button */}
                  <button
                     type="submit"
                     disabled={!selectedRole || isLoading}
                     className={cn(
                        "w-full py-4 rounded-2xl bg-slate-900 text-black text-sm font-black flex items-center justify-center space-x-3 transition-all shadow-2xl relative overflow-hidden group",
                        (!selectedRole || isLoading) ? "opacity-30 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
                     )}
                  >
                     {isLoading ? (
                        <div className="flex items-center space-x-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                           <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '200ms' }} />
                           <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '400ms' }} />
                        </div>
                     ) : (
                        <>
                           <span>Secure Demo Login</span>
                           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                     )}
                  </button>
               </form>

               {/* Support info */}
               <div className="pt-8 border-t border-slate-100 flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 italic">
                     <Mail size={12} className="text-slate-300" />
                     <span>helpdesk@techinfinia.in</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 italic">
                     <ShieldCheck size={12} className="text-slate-300" />
                     <span>256-bit SSL Secure</span>
                  </div>
               </div>
            </div>

            {/* Footer Decorative Graphic */}
            <div className="absolute top-1/2 left-0 w-24 h-24 bg-[--brand-vibrant]/5 rounded-full blur-3xl -z-10" />
         </div>
      </div>
   );
}
