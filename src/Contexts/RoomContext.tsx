import { createContext, useState, type ReactNode } from "react";
import type { room } from "../Modules/UsersModules/Home/FirstADS";
import axios from "axios";
import { toast } from "react-toastify";

interface Ads{
    _id:string;
    isActive:boolean,
    room:room
}

export interface ADSData {
    adsData: Ads[] | null,
    getRoom:(id:string)=>void;
}


export const RoomContext = createContext<ADSData | null>(null)

export interface RoomContextProviderProps {
    children: ReactNode
}
export function RoomContextProvider({ children }: RoomContextProviderProps) {

    const [adsData, setAdsData] = useState<Ads[] | null>(null);

    const getRoom = async (id:string) => {
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
        <RoomContext.Provider value={{ adsData, getRoom }}> {children}</RoomContext.Provider>
    )
}