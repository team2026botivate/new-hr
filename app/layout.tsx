'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { useUIStore } from '@/lib/store/uiStore';
import { useAuthStore } from '@/lib/store/authStore';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import HRChatbot from '@/components/shared/HRChatbot';
import CommandPalette from '@/components/layout/CommandPalette';
import ToastProvider from '@/components/shared/ToastProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, setMobile, isFormActive } = useUIStore();
  const { role } = useAuthStore();
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setMobile(isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setMobile]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "antialiased font-inter")}>
        {!isLoginPage ? (
          <div className="flex min-h-screen bg-[--background] overflow-x-hidden">
            {/* Command Palette (Global Cmd+K) */}
            <CommandPalette />
            
            {/* Toast System */}
            <ToastProvider />
            
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div 
              className={cn(
                "flex-1 flex flex-col transition-all duration-500 min-h-screen",
                !isFormActive ? (sidebarOpen ? "pl-[240px]" : "pl-[64px]") : "pl-0"
              )}
              style={{ '--sidebar-width': !isFormActive ? (sidebarOpen ? '240px' : '64px') : '0px' } as React.CSSProperties}
            >
              {/* Page Content */}
              <main className="flex-1 px-6 py-5 relative z-10">
                {children}
              </main>

              {/* Global HR Chatbot */}
              <HRChatbot />
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-white">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
