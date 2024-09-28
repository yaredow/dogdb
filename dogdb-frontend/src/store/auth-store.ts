import { User } from "@/types";
import { create } from "zustand";

type UserStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clearAuth: () => void;
};

export const useAuthState = create<UserStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user, isLoading: false });
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", String(!!user));
    }
  },

  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  clearAuth: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  },
}));

export const initializeAuthState = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    const storedAuthState = localStorage.getItem("isAuthenticated");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      useAuthState.setState({
        user,
        isAuthenticated: storedAuthState === "true",
        isLoading: false,
      });
    } else {
      useAuthState.setState({ isLoading: true });
    }
  }
};

export default useAuthState;
