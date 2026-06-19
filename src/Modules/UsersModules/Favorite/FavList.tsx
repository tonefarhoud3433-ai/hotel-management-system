import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../../../API/axsiosClient";
import FavCard from "./FavCard";

export interface FavItem{
  _id: string
  roomNumber: string
  price: number
  capacity: number
  discount: number
  facilities: string[]
  createdBy: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export default function FavList() {
    const [favorites,setFavorites] = useState<FavItem[]>([]);
    useEffect(()=>{
      (async()=>{

        const res = await axiosClient.get(`/api/v0/portal/favorite-rooms`)
        setFavorites(res?.data?.data?.favoriteRooms[0].rooms);
      })()
        
    },[])
  return (
    <>
    <Typography variant="h3" sx={{textAlign:'center'}}>Your Favorites</Typography>
    <Grid sx={{px:{xs:2,md:4,xl:6}}} container spacing={6}>
      
      {favorites.map((item)=><Grid size={{xs:12,sm:6,lg:4,xl:3,}}><FavCard item={item}/></Grid>)}


    </Grid>
    </>
  )
}
