import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback, type ReactNode } from "react";
import { toast } from "react-toastify";
import { apiProfile } from "../API/modules/Auth";
import type { UserData } from "../Modules/Shared/ViewModals/ViewUser";
import { AuthContext, type User } from "./AuthContext";

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userData, setUserData] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserData | null>(null);

  const getProfile = useCallback(async (id: string | undefined) => {
    try {
      const response = await apiProfile(id);
      setProfile(response?.data?.data?.user);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while fetching the profile.");
      }
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setProfile(null);
    window.location.href = "/home";
  };

  const saveUserData = useCallback(() => {
    const encoded = localStorage.getItem("token");
    if (encoded) {
      try {
        const decoded = jwtDecode<User>(encoded);
        if (+decoded.exp > Math.trunc(Date.now() / 1000)) {
          setUserData(decoded);
          getProfile(decoded._id);
        } else {
          toast.info("token expired! please login again");
        }
      } catch {
        toast.error("Invalid token! please login again");
        logOut();
      }
    }
  }, [getProfile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localStorage.getItem("token")) {
        saveUserData();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [saveUserData]);

  return (
    <AuthContext.Provider
      value={{ userData, saveUserData, profile, getProfile, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
