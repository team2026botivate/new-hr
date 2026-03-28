'use client';

import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  ClipboardCheck,
  Briefcase,
  Mail,
  User,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import SmartTable from '@/components/shared/SmartTable';
import Modal from '@/components/shared/Modal';
import { useToast } from '@/lib/hooks/useToast';
import StatCard from '@/components/shared/StatCard';

interface NOCRequest {
  id: string | number;
  articleCode: string;
  articleName: string;
  department: string;
  teamHead: string;
  date: string;
  status: 'Requested' | 'Issued';
}

export default function NOCPage() {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [requests, setRequests] = useState<NOCRequest[]>([
    {
      id: 1,
      articleCode: "A1024",
      articleName: "Amit Kumar",
      department: "Audit & Assurance",
      teamHead: "Vikram Mehta",
      date: "2024-03-10",
      status: "Issued",
    },
    {
      id: 2,
      articleCode: "A1089",
      articleName: "Sneha Reddy",
      department: "Taxation",
      teamHead: "Priya Iyer",
      date: "2024-03-24",
      status: "Requested",
    },
  ]);

  const [formData, setFormData] = useState({
    articleCode: "",
    articleName: "",
    department: "",
    regUnder: "",
    dateOfJoining: "",
    completionDate: "",
    experience: "",
    totalLeaveTaken: "",
    teamHead: "",
    teamHeadEmail: "",
    articleEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: NOCRequest = {
      id: Date.now(),
      articleCode: formData.articleCode,
      articleName: formData.articleName,
      department: formData.department,
      teamHead: formData.teamHead,
      date: new Date().toISOString().split("T")[0],
      status: "Requested",
    };
    
    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    
    addToast({
      title: "Request Submitted",
      message: "Form 108 NOC request has been submitted successfully.",
      type: "success"
    });

    // Reset form
    setFormData({
      articleCode: "",
      articleName: "",
      department: "",
      regUnder: "",
      dateOfJoining: "",
      completionDate: "",
      experience: "",
      totalLeaveTaken: "",
      teamHead: "",
      teamHeadEmail: "",
      articleEmail: "",
    });
  };

  const issueNoc = (id: string | number) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "Issued" } : r))
    );
    addToast({
      title: "NOC Issued",
      message: "The No Objection Certificate has been officially issued.",
      type: "success"
    });
  };

  const filteredRequests = requests.filter(r => 
    r.articleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.articleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[--text-primary]">108 NOC Tracker</h1>
          <p className="text-sm text-[--text-secondary]">Article Submission and No Objection Certificate pipeline.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[--brand] text-black hover:bg-[--brand]/90 transition-all font-bold text-sm shadow-lg shadow-indigo-100/50 active:scale-95"
        >
          <Plus size={18} />
          <span>New Submission</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Submissions" 
          value={requests.length} 
          icon={FileText} 
          iconColor="text-indigo-500" 
        />
        <StatCard 
          title="Pending NOCs" 
          value={requests.filter(r => r.status === 'Requested').length} 
          icon={Clock} 
          iconColor="text-orange-500" 
        />
        <StatCard 
          title="Issued Certificates" 
          value={requests.filter(r => r.status === 'Issued').length} 
          icon={CheckCircle2} 
          iconColor="text-emerald-500" 
        />
      </div>

      {/* Search & Actions Area */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[--text-muted]" size={18} />
          <input
            type="text"
            placeholder="Search by article name, code, or department..."
            className="w-full bg-white border border-[--border] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[--brand]/20 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <SmartTable
        data={filteredRequests}
        columns={[
          {
            header: 'Article Code',
            key: 'articleCode',
            render: (item) => (
              <span className="font-mono text-[11px] font-bold text-[--brand] bg-[--brand-light] px-2 py-1 rounded-md">
                {item.articleCode}
              </span>
            )
          },
          {
            header: 'Employee / Article',
            key: 'articleName',
            render: (item) => (
              <div>
                <p className="text-sm font-bold text-[--text-primary]">{item.articleName}</p>
                <p className="text-[10px] font-medium text-[--text-secondary] uppercase">{item.department}</p>
              </div>
            )
          },
          {
            header: 'Team Head',
            key: 'teamHead',
            render: (item) => (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                  {item.teamHead.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium text-[--text-secondary]">{item.teamHead}</span>
              </div>
            )
          },
          {
            header: 'Submitted On',
            key: 'date',
            render: (item) => (
              <span className="text-xs font-medium text-[--text-secondary]">{formatDate(item.date)}</span>
            )
          },
          {
            header: 'Status',
            key: 'status',
            render: (item) => (
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                item.status === 'Issued' 
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                  : "bg-orange-50 text-orange-600 border border-orange-100"
              )}>
                {item.status === 'Issued' ? <CheckCircle2 size={10} className="mr-1" /> : <Clock size={10} className="mr-1" />}
                {item.status}
              </span>
            )
          },
          {
            header: 'Action',
            key: 'id',
            className: 'text-right',
            render: (item) => (
              <div className="flex justify-end space-x-2">
                {item.status === "Requested" ? (
                  <button
                    onClick={() => issueNoc(item.id)}
                    className="px-3 py-1.5 bg-[--brand-light] text-[--brand] hover:bg-[--brand] hover:text-black transition-all rounded-lg text-[11px] font-bold border border-[--brand]/20"
                  >
                    Issue NOC
                  </button>
                ) : (
                  <button className="p-2 text-[--text-muted] hover:text-[--brand] transition-colors">
                    <ExternalLink size={16} />
                  </button>
                )}
              </div>
            )
          }
        ]}
        mobileCardRender={(item) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[--brand]">{item.articleCode}</span>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                item.status === 'Issued' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
              )}>{item.status}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[--text-primary]">{item.articleName}</p>
              <p className="text-[10px] font-medium text-[--text-secondary]">{item.department}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[--border]">
              <span className="text-[10px] font-bold text-[--text-muted] tracking-tighter uppercase">{formatDate(item.date)}</span>
              {item.status === 'Requested' && (
                <button 
                  onClick={() => issueNoc(item.id)}
                  className="text-[10px] font-black text-[--brand] uppercase underline underline-offset-4"
                >
                  Issue Now
                </button>
              )}
            </div>
          </div>
        )}
      />

      {/* Submission Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Form 108: Article Submission Entry"
        width="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 text-black">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Article Code <span className="text-red-500">*</span></label>
              <div className="relative group">
                <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                <select 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all appearance-none outline-none"
                  value={formData.articleCode}
                  onChange={(e) => setFormData({ ...formData, articleCode: e.target.value })}
                  required
                >
                  <option value="">Select code</option>
                  <option value="A1024">A1024</option>
                  <option value="A1089">A1089</option>
                  <option value="A1150">A1150</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-black">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Article Name <span className="text-red-500">*</span></label>
              <div className="relative group">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                <select 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all appearance-none outline-none"
                  value={formData.articleName}
                  onChange={(e) => setFormData({ ...formData, articleName: e.target.value })}
                  required
                >
                  <option value="">Select name</option>
                  <option value="Amit Kumar">Amit Kumar</option>
                  <option value="Sneha Reddy">Sneha Reddy</option>
                  <option value="Rohan Singh">Rohan Singh</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-black">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Department</label>
              <div className="relative group">
                <ClipboardCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                <input 
                  type="text"
                  placeholder="Audit, Taxation..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-black">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Joining Date</label>
              <div className="relative group">
                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                <input 
                  type="date"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                  value={formData.dateOfJoining}
                  onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-black">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Team Head Email</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                <input 
                  type="email"
                  placeholder="head@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                  value={formData.teamHeadEmail}
                  onChange={(e) => setFormData({ ...formData, teamHeadEmail: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 text-black">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Employee Email</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[--brand] transition-colors" />
                <input 
                  type="email"
                  placeholder="article.email@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                  value={formData.articleEmail}
                  onChange={(e) => setFormData({ ...formData, articleEmail: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-4 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-2 py-4 bg-black text-[--brand] rounded-xl text-xs font-black shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em]"
            >
              Submit Form 108
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
