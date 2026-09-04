import { create } from "zustand";
import { normalizeUser } from "./config";

interface User {
  id?: string;
  _id?: string;
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

const readUser = (): User => {
  try {
    return normalizeUser(JSON.parse(localStorage.getItem("user") || "{}"));
  } catch {
    return {};
  }
};

const useUserStore = create<UserStore>((set) => ({
  user: readUser(),
  token: localStorage.getItem("token") || undefined,
  isLoggedIn: !!localStorage.getItem("token"),

  setUser: (user) => {
    const updatedUser = normalizeUser({
      ...JSON.parse(localStorage.getItem("user") || "{}"),
      ...user,
    });
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
      const updatedUser = normalizeUser({ ...state.user, role });
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
