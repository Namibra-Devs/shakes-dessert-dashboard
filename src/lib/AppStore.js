import { create } from "zustand";

export const useApp = create((set) => ({
  auth: {},
  setAuth: (data) => set({ auth: data }),
}));
