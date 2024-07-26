import { create } from "zustand";
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: typeof window !== 'undefined' && !!Cookies.get("token"), // Check if token exists in cookies
  login: (token: string) => {
    if (typeof window !== 'undefined') {
      Cookies.set("token", token, { expires: 7 }); // Store the token in cookies
      set({ isAuthenticated: true });
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      Cookies.remove("token"); // Remove the token from cookies
      set({ isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
