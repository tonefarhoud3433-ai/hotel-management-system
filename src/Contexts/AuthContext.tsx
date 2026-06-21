import { createContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { apiProfile } from "../API/modules/Auth";
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
  logOut:()=>void
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProvProp {
  children: ReactNode;
}
export default function AuthContextProvider({ children }: AuthContextProvProp) {
  const [userData, setUserData] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserData | null>(null);

  const getProfile = async (id: string | undefined) => {
    try {
      const response = await apiProfile(id);
      
      setProfile(response?.data?.data?.user);
      // console.log(response?.data?.data?.user);
      
  }
      catch (error) {
        console.error("Profile error:", error);
      }
    };

  const logOut = () => {
    console.log("logging out...");
    localStorage.removeItem("token");
    setUserData(null);
    setProfile(null);
    
  };
  const saveUserData = () => {
    const encoded = localStorage.getItem("token");
    if (encoded) {
      try{

        const decoded = jwtDecode<User>(encoded);
        if (+decoded.exp > Math.trunc(Date.now() / 1000)) {
        setUserData(decoded);
        getProfile(decoded._id);
      } else {
        toast.info("token expired! please login again");
      }
    }
    catch{return}
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userData, saveUserData, profile, getProfile, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
