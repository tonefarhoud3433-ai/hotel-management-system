import { createContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export interface User {
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
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProvProp {
  children: ReactNode;
}
export default function AuthContextProvider({ children }: AuthContextProvProp) {
  const [userData, setUserData] = useState<User | null>(null);

  const saveUserData = () => {
    const encoded = localStorage.getItem("token");
    if (encoded) {
      const decoded = jwtDecode<User>(encoded);
      if (+decoded.exp > Math.trunc(Date.now() / 1000)) {
        setUserData(decoded);
      } else {
        // logOut();
        toast.info("token expired! please login again");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
