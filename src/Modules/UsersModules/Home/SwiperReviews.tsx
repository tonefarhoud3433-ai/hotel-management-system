import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { Box, Typography, Rating, Avatar, Paper } from '@mui/material';


export interface Review {
    _id: string;
    rating: number;
    review: string;
    user: {
        userName: string;
        profileImage: string;
    };
}
export interface Comment {
    comment: string
}
export default function SwiperReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comments, setComments] = useState<Review[]>([]);


    const getReviews = async () => {
        try {
            let response = await axios(`https://upskilling-egypt.com:3000/api/v0/portal/room-reviews/6a33ae2ce7cc1f5aed4d3595`,
                { headers: { Authorization: `${localStorage.getItem('token')}` } }
            );
            setReviews(response.data.data.roomReviews)
            console.log(response)
        } catch (error) {

        }
    }
    const getComments = async () => {
        try {
            let response = await axios(`https://upskilling-egypt.com:3000/api/v0/portal/room-comments/6a33ae2ce7cc1f5aed4d3595`,
                { headers: { Authorization: `${localStorage.getItem('token')}` } }
            );
            setComments(response.data.data.roomComments)
            console.log(response)
        } catch (error) {

        }
    }
    useEffect(() => {
        getComments();
        getReviews();

    },);

    return (
        <Box sx={{ width: '80%', mx: 'auto', py: 5 }}>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {reviews.map((item, index) => (
                    <SwiperSlide key={item._id}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                m: 2,



                            }}
                        >
                            
                                <Box sx={{
                                    position: "relative", mx: 4, border: 'solid 2px rgba(229, 229, 229, 1)', borderRadius: '20px',
                                    borderBottomRightRadius: '100px'
                                }}>

                                    <Avatar
                                        src={item.user.profileImage}
                                        sx={{
                                            width: 300, height: 300, borderRadius: '20px',
                                            borderBottomRightRadius: '100px',
                                            // position:'absolute',
                                            top: 25,
                                            left: 25
                                        }} // حجم الصورة وتدوير الزوايا
                                        variant="rounded"
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#152C5B' }}>
                                        {item.user.userName}
                                    </Typography>

                                    <Rating value={item.rating} readOnly sx={{ my: 1 }} />

                                    <Typography variant="body1" sx={{ mt: 1, color: '#152C5B', fontSize: '1.2rem' }}>
                                        "{item.review}"
                                    </Typography>


                                </Box>
                            
                        </Paper>
                    </SwiperSlide>
                ))}
            </Swiper>

        </Box>
    );
}