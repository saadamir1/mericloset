import { create } from 'zustand';

interface UserStore {
  user: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
  };
  token?: string;
  isLoggedIn: boolean;

  setUser: (user: Partial<UserStore['user']>) => void;
  setToken: (token: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {},
  token: undefined,
  isLoggedIn: false,

  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  setToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  logout: () => set(() => ({ user: {}, token: undefined, isLoggedIn: false })),
}));

export default useUserStore;