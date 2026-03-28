'use client';

import { useState } from 'react';
import { 
  Upload, 
  MessageSquareText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Info,
  X,
  FileText,
  Paperclip,
  Trash2
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { useToast } from '@/lib/hooks/useToast';
import StatCard from '@/components/shared/StatCard';

interface Feedback {
  id: string | number;
  name: string;
  problem: string;
  description: string;
  date: string;
  status: 'Pending' | 'Resolved';
}

export default function FeedbackPage() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    problems: [] as string[],
    otherProblem: "",
    description: "",
    suggestions: "",
    file: null as File | null,
  });

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: "Amit Kumar",
      problem: "Punch not registering",
      description: "My morning punch from mobile app didn't register.",
      date: "2024-03-20",
      status: 'Pending'
    },
  ]);

  const problemOptions = [
    "Punch not registering",
    "Wrong punch timing",
    "Log in Issue",
    "Attendance not synced",
    "Salary Discrepancy",
    "Leave Application Problem"
  ];

  const handleProblemChange = (problem: string) => {
    setFormData((prev) => {
      if (prev.problems.includes(problem)) {
        return { ...prev, problems: prev.problems.filter((p) => p !== problem) };
      } else {
        return { ...prev, problems: [...prev.problems, problem] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.problems.length === 0 && !formData.otherProblem) {
      addToast({
        title: "Selection Required",
        message: "Please select at least one problem to submit.",
        type: "error"
      });
      return;
    }
    
    let activeProblems = [...formData.problems];
    if (formData.otherProblem) activeProblems.push(`Other: ${formData.otherProblem}`);

    const newFeedback: Feedback = {
      id: Date.now(),
      name: formData.name,
      problem: activeProblems.join(", "),
      description: formData.description,
      date: new Date().toISOString().split("T")[0],
      status: 'Pending'
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    addToast({
      title: "Feedback Submitted",
      message: "Your issue has been logged. Our HR team will review it shortly.",
      type: "success"
    });

    setFormData({
      name: "",
      problems: [],
      otherProblem: "",
      description: "",
      suggestions: "",
      file: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Feedback & Issues</h1>
          <p className="text-sm font-bold text-slate-500 mt-1">Report technical bugs or provide suggestions for the platform.</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100/50">
          <Clock size={16} className="text-indigo-500" />
          <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Avg Response: 2h</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Personal Info Card */}
              <div className="card-base p-6 bg-white space-y-4 shadow-sm border border-[--border]">
                <div className="flex items-center space-x-2 mb-2">
                   <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-brand">
                    <Info size={18} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">General Info</h3>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Your Full Name <span className="text-red-500">*</span></label>
                   <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none"
                    placeholder="e.g. Amit Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Suggestion (Optional)</label>
                  <textarea
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none min-h-[120px] resize-none"
                    placeholder="How can we make this better?"
                    value={formData.suggestions}
                    onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                  />
                </div>
              </div>

               {/* Problem Selection Card */}
               <div className="card-base p-6 bg-white space-y-4 shadow-sm border border-[--border]">
                <div className="flex items-center space-x-2 mb-2">
                   <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <AlertCircle size={18} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Problem Details</h3>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Select Issues <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {problemOptions.map((option) => (
                      <label 
                        key={option} 
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-2xl border transition-all cursor-pointer select-none",
                          formData.problems.includes(option) 
                            ? "bg-[--brand-light] border-[--brand] text-[--brand] shadow-sm" 
                            : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:border-slate-200"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-all",
                          formData.problems.includes(option) ? "bg-[--brand] border-[--brand]" : "bg-white border-slate-300"
                        )}>
                          {formData.problems.includes(option) && <CheckCircle2 size={12} className="text-white bg-black rounded-full" />}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={formData.problems.includes(option)}
                          onChange={() => handleProblemChange(option)}
                        />
                        <span className="text-xs font-bold leading-none">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Issue Description <span className="text-red-500">*</span></label>
                  <textarea
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-[--brand]/10 focus:border-[--brand]/50 transition-all outline-none min-h-[100px] resize-none"
                    placeholder="Describe what happened..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Card */}
            <div className="card-base p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[--border]">
               <div className="flex-1 w-full">
                <input
                  type="file"
                  id="final-file-upload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFormData({ ...formData, file: e.target.files[0] });
                    }
                  }}
                />
                <label
                  htmlFor="final-file-upload"
                  className={cn(
                    "flex items-center justify-center md:justify-start w-full md:w-fit px-6 py-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer group",
                    formData.file ? "border-[--brand] bg-[--brand-light]" : "border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-xl mr-4 transition-colors",
                    formData.file ? "bg-[--brand] text-white" : "bg-white text-slate-400 group-hover:text-slate-600"
                  )}>
                    {formData.file ? <FileText size={18} /> : <Paperclip size={18} />}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {formData.file ? "Screenshot Attached" : "Attach Screenshot"}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                      {formData.file ? formData.file.name : "PNG, JPG or PDF up to 10MB"}
                    </p>
                  </div>
                  {formData.file && (
                    <button 
                      onClick={(e) => { e.preventDefault(); setFormData({ ...formData, file: null }); }}
                      className="ml-4 p-1.5 rounded-lg bg-white/50 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto">
                <button 
                  type="button"
                  onClick={() => setFormData({ name: "", problems: [], otherProblem: "", description: "", suggestions: "", file: null })}
                  className="px-8 py-4 rounded-2xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest"
                >
                  Clear Form
                </button>
                <button 
                  type="submit"
                  className="flex-1 md:flex-none px-12 py-4 bg-blue-500 text-[--brand] rounded-2xl text-xs font-black shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em]"
                >
                  Log Submission
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Submissions History Section */}
        <div className="lg:col-span-12 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                <Clock size={18} />
              </div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Recent Submissions</h2>
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{feedbacks.length} Total</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbacks.map((f) => (
              <div key={f.id} className="card-base p-6 bg-white border border-slate-100 hover:border-[--brand]/30 group transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-black text-slate-400">
                      {f.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-none mb-1">{f.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{formatDate(f.date)}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border",
                    f.status === 'Resolved' 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                      : "bg-orange-50 text-orange-600 border-orange-100"
                  )}>
                    {f.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {f.problem.split(', ').map((p, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 border border-slate-200/50">
                        {p}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed line-clamp-2">
                    {f.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-[10px] font-black text-[--brand] uppercase tracking-widest hover:underline whitespace-nowrap">View Detailed Log</button>
                   <button className="p-1 px-2 text-[10px] font-black text-red-400 hover:text-red-600 uppercase transition-colors">Archive</button>
                </div>
              </div>
            ))}
          </div>

          {feedbacks.length === 0 && (
            <div className="py-20 text-center card-base bg-white border-dashed border-2">
              <MessageSquareText size={40} className="mx-auto text-slate-200 mb-4" />
              <p className="text-sm font-bold text-slate-400">No submission history found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
