import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  isMobile: boolean;
  notificationsOpen: boolean;
  isFormActive: boolean;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  setMobile: (isMobile: boolean) => void;
  toggleNotifications: () => void;
  setFormActive: (active: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  isMobile: false,
  notificationsOpen: false,
  isFormActive: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebar: (open) => set({ sidebarOpen: open }),
  setMobile: (isMobile) => set({ isMobile }),
  toggleNotifications: () => set((state) => ({ notificationsOpen: !state.notificationsOpen })),
  setFormActive: (active) => set({ isFormActive: active }),
}));
