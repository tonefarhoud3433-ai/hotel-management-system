import { createContext, } from "react";
import type { room } from "../Modules/UsersModules/Home/FirstADS";


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
    favoritesCount:number,
    handleCountChange:()=>void

}




export const RoomContext = createContext<ADSData | null>(null   )

