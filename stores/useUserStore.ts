// stores/useUserStore.ts
import { create } from 'zustand';

const initialState = {
fullName: '',
email: '',
profileImageUrl: '',
isLoggedIn: false,
};

interface UserState {
fullName: string;
email: string;
profileImageUrl: string;
isLoggedIn: boolean;
isNotificationsOpen: boolean;
selectedRegion: string;
isRegionModalOpen: boolean;
}

interface UserActions {
setUser: (user: Partial<Omit<UserState, 'isLoggedIn'>>) => void;
  toggleNotifications: (isOpen?: boolean) => void;
  logout: () => void;
  setSelectedRegion: (region: string) => void;
  toggleRegionModal: (isOpen?: boolean) => void;
}

const useUserStore = create<UserState & UserActions>((set) => ({
  ...initialState,
  isNotificationsOpen: false,
  // --- CHANGE: Default region is now empty ---
  selectedRegion: '',
  isRegionModalOpen: false,

  setUser: (user) => set((state) => ({ ...state, ...user, isLoggedIn: true })),

  toggleNotifications: (isOpen) => set((state) => ({
    isNotificationsOpen: isOpen !== undefined ? isOpen : !state.isNotificationsOpen
  })),

  logout: () => set(initialState),

  setSelectedRegion: (region) => set({ selectedRegion: region, isRegionModalOpen: false }),

  toggleRegionModal: (isOpen) => set((state) => ({
    isRegionModalOpen: isOpen !== undefined ? isOpen : !state.isRegionModalOpen
  })),
}));

export default useUserStore;