import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email, password) => {
    // Demo credentials
    if (email === 'admin@forgecrm.in' && password === 'admin123') {
      set({ isAuthenticated: true, user: { email, name: 'Admin' } });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
