import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { Box, Typography, Rating, Avatar, Paper, Grid } from '@mui/material';
import noImage from "../../../assets/Images/noPersoneEmage.avif"


export interface Review {
    _id: string;
    rating: number;
    review: string;
    user: {
        userName: string;
        profileImage: string;
    };
}
export interface RoomID {
    idRoom: string |undefined
}

export default function SwiperReviews({idRoom}:RoomID) {
    const [reviews, setReviews] = useState<Review[]>([]);


    const getReviews = async () => {
        try {
            let response = await axios(`https://upskilling-egypt.com:3000/api/v0/portal/room-reviews/${idRoom}`,
                { headers: { Authorization: `${localStorage.getItem('token')}` } }
            );
            setReviews(response.data.data.roomReviews)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    
    useEffect(() => {
        getReviews();

    }, []);

    return (
        <Box sx={{ width: { sx: '100%', md: '80%' }, mx: 'auto', py: 5 }}>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {reviews.map((item) => (
                    <SwiperSlide key={item._id}>
                        <Paper
                            elevation={0}
                            sx={{
                                px:4,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                m: 2, 
                            }}
                        >
                            <Grid container spacing={2} sx={{ mx: 'auto', my: 6 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{
                                        position: "relative",  border: 'solid 3px rgba(229, 229, 229, 1)', borderRadius: '20px',
                                        borderBottomRightRadius: '100px',
                                        width:'fit-content'
                                    }}>
                                        <Avatar
                                            src={item.user.profileImage ? item.user.profileImage  : noImage}
                                            sx={{
                                                width:{xs:280,md:400} , height: {xs:280,md:400}, borderRadius: '20px',
                                                borderBottomRightRadius: '100px',
                                                top: 30,
                                                left: 20
                                            }}
                                            variant="rounded"
                                        />
                                    </Box>
                                </Grid>
                                <Grid  size={{ xs: 12, md: 6 }}>
                                    <Box sx={{p:{xs:3}}}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#152C5B' }}>
                                            {item.user.userName}
                                        </Typography>
                                        <Rating value={item.rating} readOnly sx={{ my: 1 }} />
                                        <Typography variant="body1" sx={{ mt: 1, color: 'rgba(176, 176, 176, 1)', fontSize: { sx: '22px', md: '28px' } }}>
                                            What a great trip with my family and
                                            I should try again next time soon ...
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1, color: '#152C5B', fontSize: '30px' }}>
                                            {item.review}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </SwiperSlide>
                ))}
            </Swiper>

        </Box>
    );
}