import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';


import 'swiper/css';
import 'swiper/css/autoplay';
import { Keyboard } from 'swiper/modules';
import 'swiper/css/keyboard';

import noImages from "../../../assets/Images/Signature-2-Queen_body.webp"
import { RoomContext } from '../../../Contexts/RoomContext';

export default function SwiperADS() {
    const [adsData, setAdsData] = useState<any[]>([]);




    const { getRoomFav,getRoomDetail } = useContext(RoomContext)!

    const fetchData = async () => {
        try {
            const response = await axios("https://upskilling-egypt.com:3000/api/v0/portal/ads");
            const activeAds = response?.data?.data?.ads || [];

            setAdsData(activeAds);
        } catch (error: any) {
            toast.error("brooking data ");
        }
    };



    useEffect(() => {
        fetchData();
        const token = localStorage.getItem("token");
    console.log("Token Value:", token);
    }, []);

    return (
        <Box sx={{ py: 5, px: 2, width: '90%',mx:'auto', overflow: 'hidden' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Ads</Typography>
            <Swiper
                modules={[Autoplay, Keyboard]}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    waitForTransition: true,
                }}

                grabCursor={true}
                allowTouchMove={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: adsData.length > 4 ? 2 : 4,
                    },
                }}
                speed={5000}

            >

                {adsData.map((ad) => (
                    <SwiperSlide key={ad._id} >
                        <Box sx={{ borderRadius: '10px', bgcolor: 'whitesmoke' }}>

                            <Paper
                                className='mousePointer'
                                sx={{

                                    height: '200px',
                                    position: 'relative',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    backgroundImage: `url(${ad?.room?.images?.length > 0 ? ad.room.images[0] : noImages})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    '&:hover .hover-actions': {
                                        opacity: 1,
                                    }
                                }}
                            >
                                <Box
                                    className="hover-actions"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 2,
                                        bgcolor: 'rgba(0,0,0,0.3)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease-in-out',
                                    }}
                                >
                                    <IconButton onClick={() => getRoomFav(ad.room._id)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => getRoomDetail(ad.room._id)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ p: 1, position: 'absolute', top: 0, right: 0, borderRadius: '0 0 0 10px', width: '50%', bgcolor: 'rgba(255, 73, 139, 1)' }}>
                                    <Typography sx={{ color: 'white', textAlign: 'center' }}>
                                        <Typography component="span" sx={{ fontWeight: "800" }} >
                                            {ad.room.discount}% Off
                                        </Typography>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        p: '4px 12px',
                                        position: 'absolute',
                                        top: 10,
                                        left: 10,
                                        borderRadius: 2,
                                        // الألوان:
                                        bgcolor: ad.isActive ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        backdropFilter: 'blur(4px)',
                                        zIndex: 1
                                    }}
                                >
                                    <Typography sx={{ color: 'white', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                                        {ad.isActive ? "Active" : "Not Active"}
                                    </Typography>
                                </Box>
                            </Paper>
                            <Box sx={{ p: 2 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Room Number : {ad.room.roomNumber}
                                </Typography>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}