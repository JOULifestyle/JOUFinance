import { create } from "zustand";
import { updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";

type AuthState = {
  user: User | null;
  role: "user" | "admin" | null;
  setUser: (user: User | null, role?: "user" | "admin") => void;
  clearUser: () => void;
  logout: () => void;
  clearMockUser: () => void;
  updateProfile: (updates: { displayName?: string; email?: string }) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: null,
  setUser: (user, role = "user") => set({ user, role }),
  clearUser: () => set({ user: null, role: null }),
  logout: () => set({ user: null, role: null }),
  clearMockUser: () => {
    localStorage.setItem('hasLoggedOut', 'true');
    localStorage.removeItem('mockUser');
    localStorage.removeItem('updatedUserData');
    localStorage.removeItem('token');
    set({ user: null, role: null });
  },
  updateProfile: async (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      try {
        // Try to update Firebase profile (will fail for mock users)
        await updateProfile(currentUser, {
          displayName: updates.displayName,
        });
      } catch (error) {
        // For mock users or if Firebase update fails, continue with local update
        console.warn('Firebase profile update failed, updating locally:', error);
      }

      const updatedUser = {
        ...currentUser,
        displayName: updates.displayName ?? currentUser.displayName,
        email: updates.email ?? currentUser.email,
      };
      set({ user: updatedUser });

      // Persist updated user data
      const userData = {
        user: updatedUser,
        role: get().role,
        timestamp: Date.now()
      };
      localStorage.setItem('updatedUserData', JSON.stringify(userData));
    }
  },
}));
