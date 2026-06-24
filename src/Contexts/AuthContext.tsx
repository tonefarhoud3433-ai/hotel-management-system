import { createContext } from "react";
import type { UserData } from "../Modules/Shared/ViewModals/ViewUser";

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role: string;
  profileImage?: string;
  exp: string;
}
interface AuthContextType {
  userData: User | null;
  saveUserData: () => void;
  getProfile: (id: string | undefined) => void;
  profile: UserData | null;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
