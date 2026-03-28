'use client';

import { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Mail, 
  Calendar, 
  User, 
  ShieldCheck,
  Trash2,
  Edit2,
  Briefcase
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import SmartTable from '@/components/shared/SmartTable';
import { useToast } from '@/lib/hooks/useToast';
import StatCard from '@/components/shared/StatCard';

interface Article {
  id: string | number;
  name: string;
  email: string;
  joinDate: string;
  mentor: string;
  status: 'active' | 'completed';
}

export default function ArticleRegistrationPage() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@techinfinia.in",
      joinDate: "2024-01-10",
      mentor: "Rajesh Sharma",
      status: 'active'
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@techinfinia.in",
      joinDate: "2024-02-15",
      mentor: "Priya Mehta",
      status: 'active'
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    joinDate: "",
    mentor: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: Article = {
      id: Date.now(),
      ...formData,
      status: 'active'
    };
    
    setArticles([newArticle, ...articles]);
    addToast({
      title: "Article Registered",
      message: `${formData.name} has been successfully registered.`,
      type: "success"
    });

    setFormData({ name: "", email: "", joinDate: "", mentor: "" });
  };

  const filteredArticles = articles.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[--text-primary]">Article Registration</h1>
          <p className="text-sm text-[--text-secondary]">Onboard and manage new articles/trainees.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Registration Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-base p-6 bg-white border border-[--border]">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 rounded-lg bg-[--brand-light] text-[--brand]">
                <UserPlus size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Register New</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                    placeholder="e.g. Rahul Mishra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                  <input 
                    type="email"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                    placeholder="article@techinfinia.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Joining Date</label>
                <div className="relative group">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                  <input 
                    type="date"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Assigned Mentor</label>
                <div className="relative group">
                  <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.mentor}
                    onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-blue-500 text-[--brand] rounded-2xl text-xs font-black shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] mt-2"
              >
                Register Article
              </button>
            </form>
          </div>
        </div>

        {/* Right: Articles List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4">
             <StatCard 
              title="Current Articles" 
              value={articles.length} 
              icon={Briefcase} 
              iconColor="text-brand" 
            />
            <StatCard 
              title="Recent Joinees" 
              value={1} 
              icon={UserPlus} 
              iconColor="text-emerald-500" 
            />
          </div>

          {/* Search Table */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={18} />
              <input
                type="text"
                placeholder="Search articles by name or email..."
                className="w-full bg-white border border-[--border] rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <SmartTable
              data={filteredArticles}
              columns={[
                {
                  header: 'Article / Trainee',
                  key: 'name',
                  render: (item) => (
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[--text-primary] leading-none mb-1">{item.name}</p>
                        <p className="text-[10px] font-medium text-[--text-secondary] tracking-tight">{item.email}</p>
                      </div>
                    </div>
                  )
                },
                {
                  header: 'Mentor',
                  key: 'mentor',
                  render: (item) => (
                    <span className="text-xs font-bold text-slate-600">{item.mentor}</span>
                  )
                },
                {
                  header: 'Joined On',
                  key: 'joinDate',
                  render: (item) => (
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={12} className="text-slate-400" />
                      <span className="text-xs font-medium text-[--text-secondary]">{formatDate(item.joinDate)}</span>
                    </div>
                  )
                },
                {
                  header: 'Actions',
                  key: 'id',
                  className: 'text-right',
                  render: (item) => (
                    <div className="flex justify-end space-x-2">
                       <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )
                }
              ]}
              mobileCardRender={(item) => (
                <div className="space-y-4">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-400">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[--text-primary]">{item.name}</p>
                        <p className="text-[10px] font-medium text-[--text-secondary]">{item.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[--border]">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.mentor}</span>
                      <span className="text-[10px] font-bold text-[--text-muted]">{formatDate(item.joinDate)}</span>
                    </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
