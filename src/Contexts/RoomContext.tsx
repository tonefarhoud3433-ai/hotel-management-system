import { createContext, useState, type ReactNode } from "react";
import type { room } from "../Modules/UsersModules/Home/FirstADS";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

 export interface Ads {
    _id: string;
    facilities:string,
    isActive: boolean,
    room: room
}
export interface ADSData {
    adsData: Ads[] ,
    adsDataFav: Ads[] | null,
    getRoomFav: (id: string) => void;
    getRoomDetail: (id: string) => void;
}




export const RoomContext = createContext<ADSData | null>(null)

export interface RoomContextProviderProps {
    children: ReactNode
}
export function RoomContextProvider({ children }: RoomContextProviderProps) {
    
    const [adsDataFav, setAdsDataFav] = useState<Ads[] >([]);
    const token = localStorage.getItem("token");
    console.log("Token Value:", token);
    const getRoomFav = async (id: string) => {
        try {
            const response = await axios.post('https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms',
                { roomId: id },
                {               
                    headers: {
                        Authorization: ` ${token}`,
                    },
                }
            );

            toast.success(response?.data?.message)

            console.log(response);

        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }

    const [adsData, setAdsData] = useState<Ads[] >([]);
    const getRoomDetail = async (id: string) => {
        
        try {
            const response = await axios(`https://upskilling-egypt.com:3000/api/v0/portal/ads/${id}`);
            const activeAds = response?.data?.data?.ads || [];
            setAdsData(activeAds);
            console.log(activeAds);

        } catch (error: any) {
            toast.error("brooking data ");
        }
    }

    return (
        <RoomContext.Provider value={{ adsDataFav, adsData, getRoomFav, getRoomDetail }}> {children}</RoomContext.Provider>
    )
}