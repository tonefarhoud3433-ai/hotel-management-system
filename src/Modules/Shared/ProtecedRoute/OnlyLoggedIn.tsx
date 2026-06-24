import type { ReactNode } from "react";

export const OnlyLoggedIn = ({children}:{children:ReactNode})=>{
    const token = localStorage.getItem('token');
    if(!token){return <></>}
    return children
}