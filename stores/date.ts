import { create } from 'zustand'

export interface DateStore {
  year: number;
  month: number;
  day: number | null;
  setDate: (year?: number, month?: number, day?: number) => void;
}

const useDateStore = create((set): DateStore => ({
  year: 2024,
  month: 6,
  day: null,
  setDate: (year, month, day) => set({ year, month, day }),
}));

export default useDateStore;

