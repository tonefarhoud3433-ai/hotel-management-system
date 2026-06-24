import { toast } from "react-toastify";
import { RoomContext, type Ads } from "./RoomContext";
import axios from "axios";
import { useState, type ReactNode } from "react";
import axiosClient from "../Apii/axsiosClient";

export interface RoomContextProviderProps {
  children: ReactNode;
}
export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const handleCountChange = async () => {
    const response = await axiosClient.get("/api/v0/portal/favorite-rooms");
    setFavoritesCount(response.data?.data?.favoriteRooms[0]?.rooms?.length);
  };

  const adsDataFav: Ads[] = [];
  const token = localStorage.getItem("token");

  const getRoomFav = async (id: string) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms",
        { roomId: id },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        },
      );

      toast.success(response?.data?.message);
      handleCountChange();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const [adsData, setAdsData] = useState<Ads[]>([]);
  const getRoomDetail = async (id: string) => {
    try {
      const response = await axios(
        `https://upskilling-egypt.com:3000/api/v0/portal/ads/${id}`,
      );
      const activeAds = response?.data?.data?.ads || [];
      setAdsData(activeAds);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <RoomContext.Provider
      value={{
        adsDataFav,
        adsData,
        getRoomFav,
        getRoomDetail,
        favoritesCount,
        handleCountChange,
      }}
    >
      {" "}
      {children}
    </RoomContext.Provider>
  );
}
