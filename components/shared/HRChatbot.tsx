'use client';

import { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  Clock,
  HelpCircle,
  Calendar,
  Wallet,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  time: string;
}

const PRESET_QUESTIONS = [
  { text: "How many leaves do I have?", icon: Calendar },
  { text: "When is the next holiday?", icon: Clock },
  { text: "Show my last payslip", icon: Wallet },
  { text: "Who is on leave today?", icon: FileText }
];

/**
 * High-Fidelity HR Chatbot Widget
 * Following colorful modern UI from UI.md
 */
export default function HRChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Namaste! I'm your TechInfinia HR Assistant. How can I help you today?",
      time: '' // Initialize with empty string to avoid hydration mismatch
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set initial message time on mount to avoid hydration mismatch
    setMessages(prev => [
      {
        ...prev[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botText = "I'll check that for you. Anything else?";
      if (text.toLowerCase().includes('leave')) {
        botText = "You have 12 Casual Leaves and 8 Sick Leaves remaining for this year.";
      } else if (text.toLowerCase().includes('holiday')) {
        botText = "The next holiday is Holi on 14th March 2025.";
      } else if (text.toLowerCase().includes('payslip')) {
        botText = "Your March 2025 payslip is ready. You can download it from the Salary section.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-50 overflow-hidden",
          isOpen ? "translate-y-20 opacity-0" : "translate-y-0 opacity-100"
        )}
        style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-vibrant) 100%)' }}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="text-black w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />
      </button>

      {/* Slide-over Panel */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-full sm:w-[400px] z-[60] transition-all duration-500 ease-in-out transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Shadow Overlay for mobile */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" onClick={() => setIsOpen(false)} />
        )}

        <div className="h-full bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden">
          {/* Header Gradient */}
          <div
            className="p-6 text-black relative h-48 flex flex-col justify-end"
            style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-vibrant) 100%)' }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl overflow-hidden shimmer">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">HR Assistant</h3>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-[--brand-vibrant] animate-pulse" />
                  <span className="text-xs font-medium text-black/80">Always active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
                  msg.type === 'user' ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm shadow-sm",
                  msg.type === 'user'
                    ? "bg-[--brand] text-black rounded-tr-none"
                    : "bg-white text-[--text-primary] border border-[--border] rounded-tl-none font-medium"
                )}>
                  {msg.text}
                </div>
                <span suppressHydrationWarning className="text-[10px] text-[--text-muted] mt-1 font-bold tracking-tighter uppercase px-1">{mounted ? msg.time : ''}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="px-4 py-3 rounded-2xl bg-white border border-[--border] rounded-tl-none flex space-x-1 items-center">
                  <div className="w-1 h-1 bg-[--text-muted] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-[--text-muted] rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-1 h-1 bg-[--text-muted] rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Preset Questions Slider */}
          <div className="px-6 py-4 bg-white border-t border-[--border] overflow-x-auto whitespace-nowrap no-scrollbar">
            <div className="flex space-x-2">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[--surface-alt] hover:bg-[--brand-light] hover:text-[--brand] text-[10px] font-bold text-[--text-secondary] transition-all border border-transparent hover:border-[--brand]/20 flex-shrink-0"
                >
                  <q.icon className="w-3.5 h-3.5" />
                  <span>{q.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-[--border]">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask me something..."
                className="w-full pl-5 pr-12 py-4 bg-[--surface-alt]/50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[--brand]/20 transition-all outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                data-gramm="false"
                spellCheck={false}
                autoComplete="off"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
                className="absolute right-2 p-2.5 rounded-xl bg-[--brand] text-black disabled:opacity-50 disabled:bg-[--text-muted] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[9px] text-center text-[--text-muted] mt-4 font-bold uppercase tracking-widest flex items-center justify-center space-x-1">
              <Sparkles size={10} className="text-[--brand-vibrant]" />
              <span>Powered by TechInfinia AI</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
