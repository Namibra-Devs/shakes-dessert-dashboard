import { create } from "zustand";

export const useApp = create((set) => ({
  auth: {},
  sidebar: false,
  setAuth: (data) => set({ auth: data }),
  closeSidebar: () => set({ sidebar: false }),
  openSidebar: () => set({ sidebar: true }),
}));
