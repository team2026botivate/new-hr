'use client';

import { useState } from 'react';
import {
  User,
  Building2,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Settings as SettingsIcon,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import { useToast } from '@/lib/hooks/useToast';
import ProfileTab from '@/components/settings/ProfileTab';
import OrganizationTab from '@/components/settings/OrganizationTab';
import NotificationTab from '@/components/settings/NotificationTab';
import SecurityTab from '@/components/settings/SecurityTab';

type TabType = 'profile' | 'organization' | 'notifications' | 'security';

export default function SettingsPage() {
  const { role, user } = useAuthStore();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const isAdminOrHR = role === 'admin' || role === 'hr';

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    ...(isAdminOrHR ? [{ id: 'organization', name: 'Organization', icon: Building2 }] : []),
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security & Access', icon: Shield },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        type: 'success',
        title: 'Settings Updated',
        message: 'Your preferences have been saved successfully.',
      });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header with Background Pattern */}
      <div className="relative p-8 rounded-3xl bg-white border border-[--border] overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-20 -mt-20 z-0" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[--brand] text-black flex items-center justify-center shadow-lg shadow-indigo-100">
              <SettingsIcon size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[--text-primary] tracking-tight italic">Account Settings</h1>
              <p className="text-sm text-[--text-secondary] font-medium">Manage your personal preferences and organization data.</p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "px-8 py-3 rounded-2xl bg-[--brand] text-black text-sm font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center space-x-3",
              isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-[--brand]/90"
            )}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                activeTab === tab.id
                  ? "bg-white border border-[--border] shadow-sm text-[--brand]"
                  : "text-[--text-secondary] hover:bg-white hover:border-[--border]/50"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  activeTab === tab.id ? "bg-[--brand-light]" : "bg-[--surface-alt] group-hover:bg-white"
                )}>
                  <tab.icon size={20} />
                </div>
                <span className="text-sm font-bold tracking-tight">{tab.name}</span>
              </div>
              {activeTab === tab.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-3 min-h-[500px] animate-in slide-in-from-right-4 duration-500">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'organization' && isAdminOrHR && <OrganizationTab />}
          {activeTab === 'notifications' && <NotificationTab />}
          {activeTab === 'security' && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}
