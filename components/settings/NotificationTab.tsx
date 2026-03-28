'use client';

import { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotificationTab() {
  const [prefs, setPrefs] = useState({
    leaveUpdates: true,
    payslipReady: true,
    announcements: true,
    birthdayReminders: false,
    whatsappAlerts: false,
    emailDigest: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: 'Platform Notifications',
      desc: 'Control which alerts you receive inside the HR dashboard.',
      items: [
        { id: 'leaveUpdates', label: 'Leave & Attendance Updates', icon: Zap },
        { id: 'payslipReady', label: 'Salary & Payslip Release', icon: Smartphone },
        { id: 'announcements', label: 'Company Announcements', icon: Bell },
      ]
    },
    {
      title: 'Email & External',
      desc: 'Configure how we reach out to you outside the application.',
      items: [
        { id: 'emailDigest', label: 'Weekly Performance Digest', icon: Mail },
        { id: 'birthdayReminders', label: 'Colleague Birthday Alerts', icon: MessageSquare },
        { id: 'whatsappAlerts', label: 'WhatsApp Notification (Beta)', icon: Smartphone },
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {sections.map((section, idx) => (
        <div key={idx} className="card-base p-0 overflow-hidden">
           <div className="p-6 border-b border-[--border] bg-[--surface-alt]/30">
              <h4 className="text-sm font-black text-[--text-primary] uppercase tracking-tighter">{section.title}</h4>
              <p className="text-[10px] font-bold text-[--text-secondary] mt-1 italic tracking-tight">{section.desc}</p>
           </div>
           
           <div className="p-2 space-y-1">
              {section.items.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggle(item.id as keyof typeof prefs)}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-[--surface-alt]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      prefs[item.id as keyof typeof prefs] 
                        ? "bg-[--brand-light] text-[--brand]" 
                        : "bg-[--surface-alt] text-[--text-muted]"
                    )}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight text-[--text-primary]">{item.label}</p>
                      <p className="text-[10px] text-[--text-secondary]">Instant push notification</p>
                    </div>
                  </div>
                  
                  {/* Custom Toggle Switch */}
                  <div className={cn(
                    "w-12 h-6 rounded-full p-1 transition-all duration-300 relative",
                    prefs[item.id as keyof typeof prefs] ? "bg-[--brand]" : "bg-[--border]"
                  )}>
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm",
                      prefs[item.id as keyof typeof prefs] ? "translate-x-6" : "translate-x-0"
                    )} />
                  </div>
                </div>
              ))}
           </div>
        </div>
      ))}
    </div>
  );
}
