import { create } from "zustand";

interface User {
  id?: string;  
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  role?: string;
}

interface UserStore {
  user: User;
  token?: string;
  isLoggedIn: boolean;

  setUser: (user: Partial<User>) => void;
  setToken: (token: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserRole: (role: string) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  token: localStorage.getItem("token") || undefined,
  isLoggedIn: !!localStorage.getItem("token"),

  setUser: (user) => {
    const updatedUser = { ...JSON.parse(localStorage.getItem("user") || "{}"), ...user };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token, isLoggedIn: true });
  },

  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  setUserRole: (role) => {
    set((state) => {
      const updatedUser = { ...state.user, role };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: {}, token: undefined, isLoggedIn: false });
  },
}));

export default useUserStore;
