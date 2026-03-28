'use client';

import { useToast, ToastType } from '@/lib/hooks/useToast';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info, 
  X 
} from 'lucide-react';
import { useEffect, useState } from 'react';

const icons: Record<ToastType, any> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors: Record<ToastType, string> = {
  success: 'bg-[--success-light]/80 text-[--success] border-[--success]/20',
  error: 'bg-red-50/80 text-red-500 border-red-200',
  warning: 'bg-amber-50/80 text-amber-500 border-amber-200',
  info: 'bg-[--info-light]/80 text-[--info] border-[--info]/20',
};

export default function ToastProvider() {
  const { toasts, removeToast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed top-6 right-6 left-6 md:left-auto md:w-[380px] z-100 flex flex-col space-y-3 pointer-events-none">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        
        return (
          <div
            key={toast.id}
            className={cn(
              "p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-start space-x-3 pointer-events-auto transform transition-all duration-500 animate-in slide-in-from-right-8 fade-in",
              colors[toast.type]
            )}
          >
            <div className="shrink-0 mt-0.5">
              <Icon size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold tracking-tight">{toast.title}</h4>
              {toast.message && <p className="text-xs font-medium opacity-80 mt-1">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/5 rounded-lg transition-all shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
