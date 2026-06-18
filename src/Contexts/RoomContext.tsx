import { createContext, useState, type ReactNode } from "react";
import type { room } from "../Modules/UsersModules/Home/FirstADS";
import axios from "axios";
import { toast } from "react-toastify";

interface Ads {
    _id: string;
    isActive: boolean,
    room: room
}
export interface ADSData {
    adsData: Ads[] | null,
    adsDataFav: Ads[] | null,
    getRoomFav: (id: string) => void;
    getRoomDetail: (id: string) => void;
}




export const RoomContext = createContext<ADSData | null>(null)

export interface RoomContextProviderProps {
    children: ReactNode
}
export function RoomContextProvider({ children }: RoomContextProviderProps) {

    const [adsDataFav, setAdsDataFav] = useState<Ads[] | null>(null);
    const token = localStorage.getItem("token");
    console.log("Token Value:", token);
    const getRoomFav = async (id: string) => {
        try {
            const response = await axios.post('https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms',
                { roomId: id },
                {               // الوسيط الثالث: هو الـ Config (الخيارات مثل الـ Headers)
                    headers: {
                        Authorization: ` ${token}`,
                    },
                }
            );
            const activeAds = response?.data?.data?.ads || [];
            setAdsDataFav(activeAds);
            console.log(activeAds);

        } catch (error: any) {
            toast.error("brooking data ");
        }
    }

    const [adsData, setAdsData] = useState<Ads[] | null>(null);
    const getRoomDetail = async (id: string) => {
        try {
            const response = await axios(`https://upskilling-egypt.com:3000/api/v0/portal/ads/${id}`);
            const activeAds = response?.data?.data?.ads || [];
            setAdsData(activeAds);
            console.log("777777777777777",activeAds);

        } catch (error: any) {
            toast.error("brooking data ");
        }
    }

    return (
        <RoomContext.Provider value={{ adsDataFav, adsData, getRoomFav, getRoomDetail }}> {children}</RoomContext.Provider>
    )
}