import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Breadcrumbs, Button, Chip, Grid, Paper, Popover, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { format } from "date-fns";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DateRange, type Range } from "react-date-range";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import noImage from "../../../assets/Images/no image.jpg";
import PostReviews from "./PostReviews";
import SwiperReviews from "./SwiperReviews";
import { OnlyLoggedIn } from "../../Shared/ProtecedRoute/OnlyLoggedIn";
interface Facility {
    _id: string;
    name: string;
}

interface Room {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    images: string[];
    createdAt: string;
    facilities: Facility[];
}

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        aria-label="Loading…"
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
    </React.Fragment>
  );
}

export default function RoomDetails() {
    const { id } = useParams();
    const location = useLocation();
    const { adsData } = location.state || {};
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [loading, setLoading] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [roomData, setRoomData] = useState<Room | null>(null);

    const handleOpenCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseCalendar = () => {
        setAnchorEl(null);
    };

    const openCalendar = Boolean(anchorEl);

    // دالة حساب السعر المعدلة لتجنب الخطأ
    const calculateBookingDetails = () => {
        const start = dateRange[0].startDate;
        const end = dateRange[0].endDate;

        if (!start || !end || !roomData) return { days: 0, totalPrice: 0 };

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        const priceAfterDiscount = roomData.price - (roomData.price * (roomData.discount / 100));
        const total = priceAfterDiscount * diffDays;

        return { days: diffDays, totalPrice: total };
    };

    const { days, totalPrice } = calculateBookingDetails();
    const token = localStorage.getItem('token');

    const handleBooking = async () => {
        if (!dateRange[0].startDate || !dateRange[0].endDate) return;
        const roomId = roomData?._id;
        if (!roomId) {
            console.error("Error: Room ID is missing!");
            toast.error("Sorry, the room data is incomplete!");
            return;
        }
        setLoading(true);
        try {
            
            let response = await axios.post('https://upskilling-egypt.com:3000/api/v0/portal/booking', {
                startDate: format(dateRange[0].startDate, "yyyy-MM-dd"),
                endDate: format(dateRange[0].endDate, "yyyy-MM-dd"),
                room: roomId,
                totalPrice: totalPrice
            },
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            );
            toast.success(response?.data?.message);

            const id = response?.data?.data?.booking?._id;
            navigate('/booking-confirmation', { state: { bookingId: id } });

        } catch (error) {
            toast.error("Booking failed");
        } finally {
            setLoading(false);
        }
    };

    const getRoomDetail = async () => {
        try {
            const response = await axios(`https://upskilling-egypt.com:3000/api/v0/portal/rooms/${id}`);
            setRoomData(response?.data?.data?.room || null);
        } catch (error: any) {
            toast.error("Failed to load room data");
        }
    };

    useEffect(() => {
        getRoomDetail();
    }, []);

    if (!roomData) {
        return <Typography sx={{ p: 20,mx:'auto' }}>Loading Room Data...  <GradientCircularProgress  />
        </Typography>;
    }

    return (

        <>
            <Box sx={{ py: 3, px: { xs: 4, md: 10 } }}>
                <Box>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ color: 'rgba(21, 44, 91, 1)', fontWeight: '600', fontSize: '36px' }}>Village Angga</Typography>
                        <Typography sx={{ color: 'rgba(176, 176, 176, 1)', fontWeight: '300', fontSize: '18px' }}>Bogor, Indonesia</Typography>
                    </Box>

                    <Breadcrumbs sx={{ my: 2 }}>
                        <Link to="/home" style={{ color: 'inherit' }}>Home</Link>
                        <Typography sx={{ color: 'rgba(21, 44, 91, 1)', fontWeight: '700' }}>Room Details</Typography>
                    </Breadcrumbs>

                    {/* Images */}

                    <Paper sx={{
                        display: 'flex',gap: 2,
                        flexWrap:'wrap',
                        p: 3, borderRadius: 3, my: 5, mx: 'auto', width: 'fit-content'
                    }}>
                        {roomData.images?.map((imgSrc, index) => (

                            <Box sx={{
                                mx: 'auto',
                                minWidth:'320px'

                            }}>
                                <Box key={index} component="img" src={imgSrc?imgSrc:noImage}
                                    sx={{
                                        width: '100%', height: roomData.images.length == 1 ? '400px' : '200px',
                                        objectFit: 'cover', borderRadius: 2,
                                        mx: 'auto',
                                        transition: 'all 0.3s ease-in-out',
                                        cursor: 'pointer',
                                        "&:hover": {
                                            transform: "scale(1.05)"
                                        }
                                    }} />
                            </Box>
                        ))}
                    </Paper>

                    <Grid container spacing={4}>
                        <Grid sx={{ mx: { md: 'auto', xs: 'auto' } }} size={{ xs: 12, md: 6 }}>
                            <Box sx={{
                                px: { xs: 0, md: 3 },
                                py: 2,
                                color: 'rgba(176, 176, 176, 1)',
                                fontWeight: '300',
                                fontSize: '16px',
                                lineHeight: '170%',
                                letterSpacing: 0,

                            }}>
                                <Typography >
                                    Minimal techno is a minimalist subgenre of techno music.
                                    It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development.
                                    Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
                                </Typography>
                                <Typography sx={{ my: 1 }} >
                                    Such trends saw the demise of the soul-infused techno that typified the original Detroit sound.
                                    Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.
                                </Typography>
                                <Typography >
                                    Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process,
                                    or the result of that plan or specification in the form of a prototype, product or process.
                                    The national agency for design: enabling Singapore to use design for economic growth and to make lives better.
                                </Typography>
                            </Box>
                            <Box sx={{ px: { xs: 0, md: 3 }, display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: '600', fontSize: '22px', mr: 2 }}>Facilities:</Typography>
                                {roomData.facilities?.map((facility: Facility) => (
                                    <Chip
                                        sx={{
                                            cursor: 'pointer',
                                            color: '#152C5B',
                                            borderColor: '#152C5B',
                                            borderWidth: 2,

                                            fontSize: '16px',
                                            '&:hover ': {
                                                backgroundColor: "#152C5B",
                                                color: 'white'
                                            },
                                        }}
                                        key={facility._id}
                                        label={facility.name}
                                        variant="outlined"

                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Booking Section */}
                        <Grid sx={{ mx: { md: 'auto', xs: 'auto' } }} size={{ xs: 12, md: 6 }}>
                            <Box sx={{ p: { xs: 3, md: 5 }, boxShadow: 3, borderRadius: 5, maxWidth: '80%', mx: 'auto' }}>
                                <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Grid size={{ xs: 12, md: 6 }}>

                                        <Typography sx={{
                                            color: 'rgba(21, 44, 91, 1)',
                                            fontWeight: '700',
                                            fontSize: '20px'

                                        }}>Start Booking</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>

                                        <Typography sx={{
                                            color: 'rgba(21, 44, 91, 1)',
                                            fontWeight: '700',
                                            fontSize: '20px'
                                        }} >
                                            Room : {roomData.roomNumber}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography sx={{ color: 'rgba(26, 188, 156, 1)', fontSize: '36px', fontWeight: '600' }}>
                                    ${roomData.price} <Typography component={'span'} sx={{ color: 'gray', fontSize: '20px' }}>per night</Typography>
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'rgba(255, 22, 18, 1)',
                                        fontSize: '16px',
                                        fontWeight: '400',
                                        my: 1,
                                        pt: 0
                                    }}>
                                    Discount {roomData?.discount}% Off
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'rgba(21, 44, 91, 1)',
                                        fontWeight: '700',
                                        fontSize: '20px',
                                        mt: 0,
                                        pt: 0
                                    }}>
                                    Capacity : {roomData?.capacity} Person
                                </Typography>

                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
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
                                    <Popover open={openCalendar} anchorEl={anchorEl} onClose={handleCloseCalendar} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                                        <DateRange editableDateInputs={true} onChange={(item) => setDateRange([item.selection])} ranges={dateRange} />
                                    </Popover>

                                    <Typography sx={{ fontWeight: 'bold', fontSize: '19px', color: '#152C5B', textAlign: 'center', my: 1 }}>
                                        Total Price for {days} night(s): ${totalPrice.toFixed(2)}
                                    </Typography>

                                    <Button onClick={token? handleBooking: ()=>navigate('/auth/login',{state:{curunteLocation:`/roomdetails/${id}`}})} disabled={loading} fullWidth variant="contained" sx={{ bgcolor: "#1ABC9C", py: 1.5,cursor:'pointer' }}>
                                            {token? loading ? "Processing..." : "Continue to Book":" Login To Booking"}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        
                    </Grid>
                </Box>

                <OnlyLoggedIn>
                <PostReviews roomId={id} />
                <SwiperReviews idRoom={id} />
                </OnlyLoggedIn>
                
            </Box>
        </>
    );
}