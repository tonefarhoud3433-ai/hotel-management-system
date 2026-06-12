import { createContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { apiProfile } from "../API/modules/Auth";

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
  profile: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProvProp {
  children: ReactNode;
}
export default function AuthContextProvider({ children }: AuthContextProvProp) {
  const [userData, setUserData] = useState<User | null>(null);
  const [profile, setProfile] = useState<User | null>(null);


  const getProfile = async (id: string | undefined) => {
    try {
      const response = await apiProfile(id);
      
      setProfile(response?.data?.data?.user);
      console.log(profile);
      
  }
      catch (error) {
        console.error("Profile error:", error);
      }
    };

  const logOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setProfile(null);
  };
  const saveUserData = () => {
    const encoded = localStorage.getItem("token");
    if (encoded) {
      console.log(
        encoded
      );
      
      const decoded = jwtDecode<User>(encoded);
      console.log(decoded);
      
      if (+decoded.exp > Math.trunc(Date.now() / 1000)) {
        setUserData(decoded);
        getProfile(decoded._id);
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
    <AuthContext.Provider value={{ userData, saveUserData, profile, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
