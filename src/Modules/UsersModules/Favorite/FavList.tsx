import { Box, Grid, Typography, CircularProgress } from "@mui/material"; // إضافة CircularProgress
import { useEffect, useState } from "react";
import axiosClient from "../../../Api/axsiosClient";
import FavCard from "./FavCard";

export interface FavItem {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function FavList() {
  const [favorites, setFavorites] = useState<FavItem[]>([]);
  const [looding, setLooding] = useState(false);

  const getFavorites = async () => {
    setLooding(true);
    try {
      const res = await axiosClient.get(`/api/v0/portal/favorite-rooms`);
      setFavorites(res?.data?.data?.favoriteRooms[0]?.rooms || []);
    } catch (error) {
      console.error("Error fetching favorites", error);
    } finally {
      setLooding(false);
    }
  };

  useEffect(() => {
    (() => {
      getFavorites();
    })();
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center", my: 5 }}>
        Your Favorites
      </Typography>

      {/* حالة التحميل: تظهر في منتصف الصفحة */}
      {looding ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          sx={{ px: { xs: 2, md: 4, xl: 6 }, mt: 2, justifyContent: "center" }}
          container
          spacing={2}
        >
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={item._id}>
                <FavCard item={item} refresh={getFavorites} />
              </Grid>
            ))
          ) : (
            // رسالة في حال كانت القائمة فارغة
            <Typography sx={{ textAlign: "center", width: "100%", my: 5 }}>
              No favorite rooms currently
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
}
