import { create } from 'zustand'

export interface IntroStore {
  isIntroDone: boolean;
  setIntroDone: () => void;
}

const useIntroStore = create((set): IntroStore => ({
  isIntroDone: false,
  setIntroDone: () => set({ isIntroDone: true }),
}));

export default useIntroStore;

