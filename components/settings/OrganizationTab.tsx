'use client';

import { useState } from 'react';
import { Building2, MapPin, Globe, CreditCard, Users, Briefcase } from 'lucide-react';
import { COMPANY } from '@/lib/data/employees';
import { cn } from '@/lib/utils';

export default function OrganizationTab() {
  const [company, setCompany] = useState({
    name: COMPANY.name,
    cin: COMPANY.cin,
    gstin: COMPANY.gstin,
    industry: COMPANY.industry,
    hq: COMPANY.hq,
    strength: COMPANY.strength,
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Company Legal Info */}
      <div className="card-base p-6 space-y-6">
         <div className="flex items-center space-x-2 border-b border-[--border] pb-4">
            <Building2 size={18} className="text-[--brand]" />
            <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter">Company Credentials</h4>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">Entity Name</label>
               <input 
                 type="text" 
                 className="settings-input" 
                 value={company.name}
                 onChange={(e) => setCompany({...company, name: e.target.value})}
               />
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">CIN (Corporate Identity No.)</label>
               <input 
                 type="text" 
                 className="settings-input" 
                 value={company.cin}
                 onChange={(e) => setCompany({...company, cin: e.target.value})}
               />
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">GSTIN Number</label>
               <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={14} />
                  <input 
                    type="text" 
                    className="settings-input pl-9 uppercase" 
                    value={company.gstin}
                    onChange={(e) => setCompany({...company, gstin: e.target.value})}
                  />
               </div>
            </div>
            <div className="space-y-1.5">
               <label className="text-[10px] font-bold text-[--text-muted] uppercase tracking-widest pl-1">Industry</label>
               <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={14} />
                  <input 
                    type="text" 
                    className="settings-input pl-9" 
                    value={company.industry}
                    onChange={(e) => setCompany({...company, industry: e.target.value})}
                  />
               </div>
            </div>
         </div>
      </div>

      {/* Offices & Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="card-base p-6 space-y-6">
            <div className="flex items-center space-x-2 border-b border-[--border] pb-4">
               <Globe size={18} className="text-[--brand]" />
               <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter">Headquarters</h4>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
               <p className="text-xs font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-3">Principal Place of Business</p>
               <p className="text-sm font-black text-[--brand] tracking-tight">{company.hq}</p>
               <p className="text-[10px] font-medium text-indigo-700/70 mt-1 uppercase tracking-tighter">Karnataka, India</p>
            </div>
         </div>

         <div className="card-base p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[--border] pb-4">
               <div className="flex items-center space-x-2">
                  <Users size={18} className="text-[--brand]" />
                  <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter">Office Network</h4>
               </div>
               <span className="px-2 py-0.5 rounded-lg bg-[--brand-light] text-[--brand] text-[10px] font-black">5 Offices</span>
            </div>
            <div className="flex flex-wrap gap-2">
               {['Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'].map((city) => (
                 <div key={city} className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[--surface-alt] border border-[--border] text-[10px] font-black uppercase text-[--text-secondary] hover:border-[--brand] transition-all cursor-default">
                    <MapPin size={10} className="text-[--text-muted]" />
                    <span>{city}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
