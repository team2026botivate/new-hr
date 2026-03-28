'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

/**
 * Standardized High-Fidelity Modal for the HR platform.
 * Features: Overlay fade-in, Content scale-up, and accessibility.
 */
export default function Modal({ isOpen, onClose, title, children, width = 'max-w-xl' }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Content Container */}
      <div className={cn(
        "bg-white w-full rounded-2xl shadow-2xl border border-[--border] relative z-10 transition-all duration-300 transform",
        width,
        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[--border]">
          <h3 className="text-lg font-bold text-[--text-primary] tracking-tight">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[--text-muted] hover:bg-[--surface-alt] hover:text-[--text-primary] transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
