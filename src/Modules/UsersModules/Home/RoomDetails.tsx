import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Paper, Box, Typography, Button, Grid, Popover, Chip } from '@mui/material';
import { toast } from 'react-toastify';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRange, type Range } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";

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

export default function RoomDetails() {
    const location = useLocation();
    const { adsData } = location.state || {};

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

    const handleBooking = async () => {
        if (!dateRange[0].startDate || !dateRange[0].endDate) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
          let response=  await axios.post('https://upskilling-egypt.com:3000/api/v0/portal/booking', {
                startDate: format(dateRange[0].startDate, "yyyy-MM-dd"),
                endDate: format(dateRange[0].endDate, "yyyy-MM-dd"),
                room: adsData._id,
                totalPrice: totalPrice
            },
            {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
        
        );
        console.log(response);
        
            toast.success("Booking successful!");
        } catch (error) {
            console.error("Failed to book room", error);
            toast.error("Booking failed");
        } finally {
            setLoading(false);
        }
    };

    const getRoomDetail = async () => {
        try {
            const response = await axios(`https://upskilling-egypt.com:3000/api/v0/portal/rooms/${adsData.room._id}`);
            setRoomData(response?.data?.data?.room || null);
        } catch (error: any) {
            toast.error("Failed to load room data");
        }
    };

    useEffect(() => {
        getRoomDetail();
    }, []);

    if (!roomData) {
        return <Typography sx={{ p: 10 }}>Loading Room Data...</Typography>;
    }

    return (
        <Box sx={{ py: 3, px: 10 }}>
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
            <Paper sx={{ p: 3, borderRadius: 3, my: 5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                    {roomData.images?.map((imgSrc, index) => (
                        <Box key={index} component="img" src={imgSrc} sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 2 }} />
                    ))}
                </Box>
            </Paper>

            <Grid container spacing={4}>
                <Grid size={{ xs: 9, md: 6 }}>
                    <Box sx={{
                        px: 3,
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
                    <Box sx={{ px: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: '600', fontSize: '20px', mr: 2 }}>Facilities:</Typography>
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
                <Grid size={{ xs: 9, md: 6 }}>
                    <Box sx={{ p: 5, boxShadow: 3, borderRadius: 5, maxWidth: '80%', mx: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Typography sx={{
                                color: 'rgba(21, 44, 91, 1)',
                                fontWeight: '700',
                                fontSize: '20px'
                            }}>Start Booking</Typography>
                            <Typography sx={{
                                color: 'rgba(21, 44, 91, 1)',
                                fontWeight: '700',
                                fontSize: '20px'
                            }} >
                                Room : {roomData.roomNumber}
                            </Typography>
                        </Box>
                        <Typography sx={{ color: 'rgba(26, 188, 156, 1)', fontSize: '36px', fontWeight: '600' }}>
                            ${roomData.price} <Typography component={'span'} sx={{ color: 'gray', fontSize: '20px' }}>per night</Typography>
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgba(255, 22, 18, 1)',
                                fontSize: '16px',
                                fontWeight: '400',
                                mt: 0,
                                pt: 0
                            }}>
                            Discount {roomData.discount}% Off
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

                            <Typography sx={{ fontWeight: 'bold', color: '#152C5B', textAlign: 'center', my: 1 }}>
                                Total Price for {days} night(s): ${totalPrice.toFixed(2)}
                            </Typography>

                            <Button onClick={handleBooking} disabled={loading} fullWidth variant="contained" sx={{ bgcolor: "#1ABC9C", py: 1.5 }}>
                                {loading ? "Processing..." : "Continue to Book"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}