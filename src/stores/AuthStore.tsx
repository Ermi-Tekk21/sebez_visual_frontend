import { create } from "zustand";
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import { toast } from "../components/ui/use-toast";

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

// Check token expiration and update state accordingly
if (typeof window !== 'undefined') {
  const token = Cookies.get("token");
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        console.log("Expired token, logging out");
        toast({
          variant: "default",
          description: "Token expired, please sign in again",
        });
        Cookies.remove("token");
        useAuthStore.setState({ isAuthenticated: false });
      }
    } catch (error) {
      console.log("Invalid token, logging out");
      Cookies.remove("token");
      useAuthStore.setState({ isAuthenticated: false });
    }
  }
}

export default useAuthStore;
