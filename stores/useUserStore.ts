// stores/useUserStore.ts
import { create } from 'zustand';

interface UserState {
  fullName: string;
  email: string;
  profileImageUrl: string;
  // --- NEW: A state to track if the notifications panel is open ---
  isNotificationsOpen: boolean;
}

interface UserActions {
  setUser: (user: Partial<UserState>) => void;
  // --- NEW: An action to open, close, or toggle the panel ---
  toggleNotifications: (isOpen?: boolean) => void;
}

const useUserStore = create<UserState & UserActions>((set) => ({
  // Initial default values
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  profileImageUrl: '/images/hero-bg.jpg',
  isNotificationsOpen: false, // The panel is closed by default

  // Action to update user data
  setUser: (user) => set((state) => ({ ...state, ...user })),

  // Action to manage the notifications panel visibility
  toggleNotifications: (isOpen) => set((state) => ({
    // If a boolean is provided (true/false), use it.
    // Otherwise, just flip the current state (toggle).
    isNotificationsOpen: isOpen !== undefined ? isOpen : !state.isNotificationsOpen
  })),
}));

export default useUserStore;