// stores/useNotificationStore.ts
import { create } from 'zustand';

interface NotificationState {
    isOpen: boolean;
    toggle: () => void; // A simple function to flip the state
    close: () => void; // A function to explicitly close the panel
}

const useNotificationStore = create<NotificationState>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    close: () => set({ isOpen: false }),
}));

export default useNotificationStore;