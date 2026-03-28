'use client';

import { useState } from 'react';
import { Send, Smile, Image as ImageIcon, MessageSquare, Trophy, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/authStore';
import { useToast } from '@/lib/hooks/useToast';

/**
 * StatusInputCard — Interactive dashboard input for employees to share updates.
 * Features: Category selection, auto-expanding textarea, and submission toast.
 */
export default function StatusInputCard() {
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState<'update' | 'win' | 'query'>('update');
  const [isFocused, setIsFocused] = useState(false);

  const categories = [
    { id: 'update', label: 'Daily Update', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'win', label: 'Big Win', icon: Trophy, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'query', label: 'Query', icon: HelpCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
  ] as const;

  const handleSubmit = () => {
    if (!status.trim()) return;

    // Demo: Trigger success feedback
    addToast({
      type: 'success',
      title: 'Update Posted!',
      message: 'Your status has been shared with the team.',
    });

    // Reset state
    setStatus('');
    setIsFocused(false);
  };

  if (!user) return null;

  return (
    <div
      className={cn(
        "card-base p-6 transition-all duration-500 relative overflow-hidden",
        isFocused ? "shadow-xl border-indigo-200 ring-4 ring-indigo-50/50" : "shadow-sm"
      )}
    >
      {/* Dynamic Background Accent */}
      {isFocused && (
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl animate-pulse pointer-events-none" />
      )}

      <div className="flex items-start space-x-4 relative z-10">
        {/* User Avatar */}
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-black flex items-center justify-center font-black shadow-lg shadow-indigo-200 shrink-0">
          {user.avatar}
        </div>

        {/* Input Area */}
        <div className="flex-1 space-y-4">
          <div className="relative group">
            <textarea
              placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
              className={cn(
                "w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-0 focus:bg-white focus:border-indigo-100 transition-all resize-none min-h-[60px]",
                isFocused ? "min-h-[100px]" : "min-h-[60px]"
              )}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => !status && setIsFocused(false)}
            />
            {!isFocused && !status && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-slate-400 group-hover:text-indigo-400 transition-colors">
                <Sparkles size={16} />
              </div>
            )}
          </div>

          {/* Action Toolbar (Visible on focus or when text exists) */}
          {(isFocused || status) && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Categories */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">Post as:</span>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shrink-0",
                      category === cat.id
                        ? cn(cat.bg, cat.color, "ring-2 ring-white shadow-sm")
                        : "bg-white text-text-secondary hover:bg-slate-50 border border-slate-100"
                    )}
                  >
                    <cat.icon size={14} />
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="flex items-center space-x-1">
                  <button className="p-2 text-text-muted hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <ImageIcon size={18} />
                  </button>
                  <button className="p-2 text-text-muted hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <Smile size={18} />
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!status.trim()}
                  className={cn(
                    "flex items-center space-x-2 px-6 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                    "bg-brand text-black hover:bg-brand/90 shadow-indigo-200"
                  )}
                >
                  <span>Share Update</span>
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
