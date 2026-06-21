import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Popover,
  InputBase,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRange,type Range } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";

import mainImage from "../../../assets/Images/picture.png";
import { useNavigate } from "react-router-dom";

export default function ExploreSec() {
  
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  const [capacity, setCapacity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  const openCalendar = Boolean(anchorEl);

  const handleIncrement = () => setCapacity((prev) => prev + 1);
  const handleDecrement = () => setCapacity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleExplore = async () => {
    const { startDate, endDate } = dateRange[0];
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const params = {
        page: 1,
        size: 10,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        capacity: capacity,
      };

      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/portal/rooms/available",
        { params },
      );
      console.log("Available Rooms Data: ", response.data);
    } catch (error) {
      console.error("Failed to fetch available rooms", error);
    } finally {
      setLoading(false);
      navigate("/home/explore",{state:{start:startDate,end:endDate,capacity:capacity}});
    }
  };

  return (
    <Box >
      <Container  maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 6, md: 6 }}
          sx={{ alignItems: "center",pl:{md:10} }}
        >
          <Grid size={{ xs: 12, md: 6 }} >
            <Box sx={{  mx: { xs: "auto", md: 0 } }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                  color: "#152C5B",
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Forget Busy Work, <br /> Start Next Vacation
              </Typography>

              <Typography sx={{ color: "#B0B0B0", fontSize: "1rem", mb: 5 }}>
                We provide what you need to enjoy your holiday with family. Time
                to make another memorable moments.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mb: 5,
                  maxWidth: 400,
                }}
              >
                <Box>
                  <Typography sx={{ color: "#152C5B", fontWeight: 600, mb: 1 }}>
                    Start Booking
                  </Typography>

                  <Button
                    onClick={handleOpenCalendar}
                    fullWidth
                    variant="text"
                    startIcon={<CalendarMonthIcon sx={{ color: "#152C5B" }} />}
                    sx={{
                      justifyContent: "flex-start",
                      bgcolor: "#F5F6F8",
                      color: "#152C5B",
                      fontWeight: 500,
                      py: 1.5,
                      px: 2,
                      textTransform: "none",
                      borderRadius: "4px",
                      "&:hover": { bgcolor: "#EAEAEA" },
                    }}
                  >
                    {dateRange[0].startDate && dateRange[0].endDate
                      ? `${format(dateRange[0].startDate, "MMM dd")} - ${format(
                          dateRange[0].endDate,
                          "MMM dd",
                        )}`
                      : "Pick a Date"}
                  </Button>

                  <Popover
                    open={openCalendar}
                    anchorEl={anchorEl}
                    onClose={handleCloseCalendar}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDateRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      rangeColors={["#3252DF"]}
                    />
                  </Popover>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#152C5B",
                      fontSize: "0.9rem",
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    Capacity
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{
                      bgcolor: "#F5F6F8",
                      borderRadius: "4px",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={handleDecrement}
                      disabled={loading}
                      sx={{
                        bgcolor: "#E74C3C",
                        color: "#fff",
                        borderRadius: "4px 0 0 4px",
                        "&:hover": { bgcolor: "#C0392B" },
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      align="center"
                      sx={{ flexGrow: 1, color: "#152C5B", fontWeight: 500 }}
                    >
                      {capacity} person{capacity > 1 ? "s" : ""}
                    </Typography>

                    <IconButton
                      onClick={handleIncrement}
                      disabled={loading}
                      sx={{
                        bgcolor: "#1ABC9C",
                        color: "#fff",
                        borderRadius: "0 4px 4px 0",
                        "&:hover": { bgcolor: "#16A085" },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>

              <Button
                variant="contained"
                onClick={handleExplore}
                disabled={loading}
                sx={{
                  bgcolor: "#3252DF",
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  px: 6,
                  py: 1.5,
                  boxShadow: "0px 8px 15px rgba(50, 82, 223, 0.3)",
                  "&:hover": { bgcolor: "#2440C4" },
                }}
              >
                {loading ? "Searching..." : "Explore"}
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                
                position: "relative",
                width: "100%",
                maxWidth: { xs: 400, sm: 500 },
                height: { xs: 320, sm: 400 },
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "90%",
                  height: "90%",
                  borderRadius: "30px",
                  border: "2px solid #EAEAEA",
                  zIndex: 1,
                }}
              />

              <Box
                component="img"
                src={mainImage}
                alt="Vacation"
                sx={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  width: "90%",
                  height: "90%",
                  zIndex: 2,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
