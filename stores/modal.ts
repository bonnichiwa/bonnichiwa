import { create } from 'zustand'

export interface ModalStore {
  isModalOpen: boolean;
  isAboutModalOpen: boolean;
  isProjectsModalOpen: boolean;
  openModal: () => void;
  openAboutModal: () => void;
  openProjectsModal: () => void;
  closeModal: () => void;
  closeAboutModal: () => void;
  closeProjectsModal: () => void;
}

const useModalStore = create((set): ModalStore => ({
  isModalOpen: false,
  isAboutModalOpen: false,
  isProjectsModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  openAboutModal: () => set({ isAboutModalOpen: true }),
  openProjectsModal: () => set({ isProjectsModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  closeAboutModal: () => set({ isAboutModalOpen: false }),
  closeProjectsModal: () => set({ isProjectsModalOpen: false }),
}));

export default useModalStore;

