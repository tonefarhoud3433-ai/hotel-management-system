import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { RoomContext } from "../../../Contexts/RoomContext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
interface RoomAPI {
  _id: string;
  roomNumber: string;
  price: number;
  images: string[];
  capacity: number;
}

const DEFAULT_ROOM_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop";

const ExploreRooms = () => {
  const [rooms, setRooms] = useState<RoomAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { getRoomFav, getRoomDetail } = useContext(RoomContext)!;

  const pageSize = 15;

  const fetchRooms = async (currentPage: number) => {
    setLoading(true);
    try {
      const baseUrl = "https://upskilling-egypt.com:3000";
      const url = `${baseUrl}/api/v0/portal/rooms/available`;

      const response = await axios.get(url, {
        params: {
          page: currentPage,
          size: pageSize,
          startDate: "2023-01-20",
          endDate: "2023-01-30",
        },
      });

      const apiRooms = response.data.data?.rooms || [];
      setRooms(apiRooms);

      const totalElements = response.data.data?.totalElements || 30;
      setTotalPages(Math.ceil(totalElements / pageSize));
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  useEffect(() => {
    fetchRooms(page);
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1A365D", textAlign: "center", mb: 1 }}
        >
          Explore ALL Rooms
        </Typography>

        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontWeight: 600, mt: 4, mb: 2, fontSize: "1.2rem" }}
          >
            <MuiLink
              underline="hover"
              color="inherit"
              component={RouterLink}
              to="/home"
            >
              Home
            </MuiLink>

            <Typography
              sx={{ color: "#2D3748", fontWeight: 700, fontSize: "1.2rem" }}
            >
              All Rooms
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} sx={{ color: "#FF385C" }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room._id}>
                  <Card
                    sx={{
                      position: "relative",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      "&:hover .hover-actions": {
                        opacity: 1,
                      },
                      "&:hover img": {
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "16px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="240"
                        image={
                          room.images && room.images.length > 0
                            ? room.images[0]
                            : DEFAULT_ROOM_IMAGE
                        }
                        alt={`Room ${room.roomNumber}`}
                        sx={{
                          transition: "transform 0.4s ease",
                          objectFit: "cover",
                        }}
                      />

                      <Box
                        className="hover-actions"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 2,
                          bgcolor: "rgba(0,0,0,0.4)",
                          opacity: 0,
                          transition: "opacity 0.3s ease-in-out",
                          zIndex: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => getRoomFav(room._id)}
                          sx={{
                            color: "white",
                            bgcolor: "rgba(255,255,255,0.2)",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
                          }}
                        >
                          <FavoriteIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => getRoomDetail(room._id)}
                          sx={{
                            color: "white",
                            bgcolor: "rgba(255,255,255,0.2)",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Box>

                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "#FF385C",
                          color: "#FFFFFF",
                          padding: "8px 16px",
                          borderBottomLeftRadius: "16px",
                          display: "flex",
                          alignItems: "baseline",
                          gap: "4px",
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 700, fontSize: "0.95rem" }}
                        >
                          ${room.price}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 300,
                            fontSize: "0.75rem",
                            opacity: 0.9,
                          }}
                        >
                          per night
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "60%",
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          padding: "16px",
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "#FFFFFF",
                            lineHeight: 1.2,
                          }}
                        >
                          Room {room.roomNumber}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            mt: 0.5,
                          }}
                        >
                          Capacity: {room.capacity} Persons
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ textAlign: "center", color: "GrayText" }}>
                  there are no rooms available for the selected dates. Please
                  try different dates or check back later.
                </Typography>
              </Grid>
            )}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#718096",
                  borderColor: "#E2E8F0",
                  "&.Mui-selected": {
                    backgroundColor: "#FF385C",
                    color: "#FFF",
                    borderColor: "#FF385C",
                    "&:hover": {
                      backgroundColor: "#E03050",
                    },
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ExploreRooms;
