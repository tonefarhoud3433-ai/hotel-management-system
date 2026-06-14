import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { PieChart } from "@mui/x-charts/PieChart";
import { getAllFacilities } from "../../../API/modules/AdminData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllRooms } from "../../../API/modules/AdminRooms";
import { getAllAds } from "../../../API/modules/AdminAds";
import { AdminBooking, Auth } from "../../../API";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";

interface User {
  users: object[];
  totalCount: number;
}
interface BookingItem {
  status: "completed" | "pending";
}
export default function Home() {
  const [facilitiesCount, setFacilitiesCount] = useState<number | null>(null);
  const [loadingFaclities, setLoadingFaclities] = useState<boolean>(true);
  const [roomsCount, setRoomsCount] = useState<number | null>(null);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(true);
  const [adsCount, setAdsCount] = useState<number | null>(null);
  const [loadingAds, setLoadingAds] = useState<boolean>(true);
  const [usersData, setUsersData] = useState<User | null>(null);
  const [loadingUsersData, setLoadingUsersData] = useState<boolean>(true);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    completed: 0,
  });
  const [loadingBookings, setLoadingBookings] = useState<boolean>(true);

  const getBookingsStatusCount = async () => {
    setLoadingBookings(true);
    try {
      const response = await AdminBooking.getAllBookings();
      const bookings: BookingItem[] = response.data?.data?.booking || [];

      const counts = bookings.reduce(
        (acc, item) => {
          if (item.status in acc) {
            acc[item.status] += 1;
          }
          return acc;
        },
        { pending: 0, completed: 0 },
      );

      setStatusCounts(counts);
    } catch (error) {
      toast.error("Failed To Fetch Bookings Status");
    } finally {
      setLoadingBookings(false);
    }
  };
  const getFacilitiesCount = async () => {
    setLoadingFaclities(true);

    try {
      const response = await getAllFacilities();

      setFacilitiesCount(response.data?.data?.totalCount);
    } catch (error) {
      toast.error((error as string) || "Failed To Fetch Facilities Count");
    } finally {
      setLoadingFaclities(false);
    }
  };

  const getAdsCount = async () => {
    setLoadingAds(true);
    try {
      const response = await getAllAds();

      setAdsCount(response.data?.data?.totalCount);
    } catch (error) {
      toast.error((error as string) || "Failed To Fetch Ads Count");
    } finally {
      setLoadingAds(false);
    }
  };

  const getRoomsCount = async () => {
    setLoadingRooms(true);
    try {
      const response = await getAllRooms();
      setRoomsCount(response.data?.data?.totalCount);
    } catch (error) {
      toast.error((error as string) || "Failed To Fetch Rooms Count");
    } finally {
      setLoadingRooms(false);
    }
  };
  const getAllUsers = async () => {
    setLoadingUsersData(true);
    try {
      const response = await Auth.getAllUsers();
      console.log("Users:", response);
      setUsersData(response.data?.data);
    } catch (error) {
      toast.error((error as string) || "Failed To Fetch Users Count");
    } finally {
      setLoadingUsersData(false);
    }
  };
  const cards = [
    {
      title: "Rooms",
      value: loadingRooms ? (
        <CircularProgress size={20} sx={{ color: "#fff" }} />
      ) : (
        roomsCount
      ),
    },
    {
      title: "Facilities",
      value: loadingFaclities ? (
        <CircularProgress size={20} sx={{ color: "#fff" }} />
      ) : (
        facilitiesCount
      ),
    },
    {
      title: "Ads",
      value: loadingAds ? (
        <CircularProgress size={20} sx={{ color: "#fff" }} />
      ) : (
        adsCount
      ),
    },
  ];

  const statusData = [
    { id: 0, value: statusCounts.pending, color: "#5568E8", label: "pending" },
    {
      id: 2,
      value: statusCounts.completed,
      color: "#9A58D1",
      label: "completed",
    },
  ];

  const usersChart = [
    { id: 0, value: usersData?.users.length, color: "#53C64D" },
    { id: 1, value: usersData?.totalCount, color: "#41B7F1" },
  ];

  useEffect(() => {
    getFacilitiesCount();
    getRoomsCount();
    getAdsCount();
    getAllUsers();
    getBookingsStatusCount();
  }, []);
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 6 }}>
        {/* ================= CARDS ================= */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid
              key={card.title}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: 150,
                  borderRadius: "20px",
                  px: 4,
                  background: "linear-gradient(90deg,#13161D 0%, #161A23 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: { xs: "1.8rem", md: "2.5rem" },
                      lineHeight: 1,
                    }}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#D7D7D7",
                      fontSize: { xs: "1.2rem", md: "1.7rem" },
                      mt: 1,
                    }}
                  >
                    {card.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    borderRadius: "50%",
                    bgcolor: "#13235E",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <WorkOutlineOutlinedIcon
                    sx={{
                      color: "#2952FF",
                      fontSize: { xs: 28, md: 38 },
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ================= CHARTS ================= */}
        <Grid container sx={{ mt: { xs: 4, md: 10 } }} spacing={6}>
          {/* LEFT DONUT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  height: 300,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loadingBookings ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <PieChart
                      series={[
                        {
                          innerRadius: 60,
                          outerRadius: 100,
                          data: statusData,
                        },
                      ]}
                      margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                      slotProps={{
                        legend: {
                          sx: { display: "none" },
                        },
                      }}
                    />

                    <Typography
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "1.3rem",
                        fontWeight: 500,
                        pointerEvents: "none",
                        color: "#333",
                      }}
                    >
                      Bookings
                    </Typography>
                  </>
                )}
              </Box>

              <Box
                sx={{ width: { xs: "100%", sm: "auto" }, px: { xs: 2, sm: 0 } }}
              >
                {statusData.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "6px",
                        bgcolor: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ color: "#7C8698", fontSize: "1rem" }}>
                      {item.label} ({item.value})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* RIGHT CARD */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                width: "100%",
                maxWidth: 500,
                mx: "auto",
                p: { xs: 3, md: 4 },
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ position: "relative", width: 200, height: 200 }}>
                  {loadingUsersData ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <PieChart
                      series={[
                        {
                          innerRadius: 65,
                          outerRadius: 85,
                          data: usersChart,
                        },
                      ]}
                      margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                      slotProps={{
                        legend: {
                          sx: { display: "none" },
                        },
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      pointerEvents: "none",
                    }}
                  >
                    Users
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#53C64D",
                      }}
                    />
                    <Typography>User</Typography>
                  </Box>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    {loadingUsersData ? (
                      <CircularProgress size={20} sx={{ color: "#55db0d" }} />
                    ) : (
                      usersData?.users.length
                    )}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#41B7F1",
                      }}
                    />
                    <Typography sx={{ fontSize: "1.1rem" }}>Admin</Typography>
                  </Box>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    {loadingUsersData ? (
                      <CircularProgress size={20} sx={{ color: "#55db0d" }} />
                    ) : (
                      usersData?.totalCount
                    )}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
