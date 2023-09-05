import { createContext } from "react";

type SupabaseContextProps = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const SupabaseContext = createContext<SupabaseContextProps>({
  isLoggedIn: false,
  login: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  logout: async () => {},
});
