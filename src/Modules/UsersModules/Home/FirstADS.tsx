import React, { useContext, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import noImages from "../../../assets/Images/Signature-2-Queen_body.webp"
import axios from 'axios';
import { toast } from 'react-toastify';
import { RoomContext } from '../../../Contexts/RoomContext';
import { useNavigate } from 'react-router-dom';
import { OnlyLoggedIn } from '../../Shared/ProtecedRoute/OnlyLoggedIn';

interface room {
    _id: string,
    roomNumber: string,
    price: number,
    capacity: number,
    discount: number,
    images: string,
    createdAt: string
}
interface Ads {
    _id: string,
    facilities:string,
    room: room
}

export default function FirstADS() {
    const [roomData, setRoomData] = useState<Ads[]>([]);
    const { getRoomFav } = useContext(RoomContext)!;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const data = async () => {
        setIsLoading(true);
        try {
            let response = await axios("https://upskilling-egypt.com:3000/api/v0/portal/ads")
            const ADS = response?.data?.data?.ads || [];

            const sortedRooms = ADS.slice(0, 5);
            setRoomData(sortedRooms)
            console.log(roomData);
        } catch (error: any) {
            toast.error(error.response.message)
        } finally {
            setIsLoading(false); // انتهاء التحميل
        }
    }
    const columns = roomData.length <= 3 ? 2 : 3;

    useEffect(() => {
        data();
    }, []);

    return (
        <>


            <Box
                sx={{
                    mx: { xs: 2, md: 10 },
                    my: 5,
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: `repeat(${columns}, 1fr)`,
                    },
                    gap: 2,
                    gridAutoRows: { xs: '250px', md: '200px' }
                }}
            >
                {isLoading ? (

                    [...Array(3)].map((_, index) => (
                        <Paper key={index} sx={{ borderRadius: 3, overflow: 'hidden', height: '200px' }}>
                            <Skeleton variant="rectangular" width="100%" height="100%" />
                        </Paper>
                    ))
                ) : (

                    roomData.map((item, index) => {
                        const isFirst = index === 0;

                        return (
                            <Paper
                                className='mousePointer'
                                key={item._id}
                                sx={{
                                    position: 'relative',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    gridColumn: { xs: 'span 1', md: isFirst ? 'span 1' : 'span 1' },
                                    gridRow: { xs: 'span 1', sm: isFirst ? 'span 2' : 'span 1' },
                                    backgroundImage: `url(${item?.room?.images?.length > 0 ? item.room.images[0] : noImages})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    '&:hover .hover-actions': {
                                        opacity: 1,
                                    },
                                    '&:hover .hover-price': {
                                        top: 0,
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
                                        bgcolor: 'rgba(0,0,0,0.5)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease-in-out',
                                    }}
                                >
                                    <OnlyLoggedIn>
                                        <IconButton onClick={() => {
                                            getRoomFav(item.room._id);
                                        }} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                        </OnlyLoggedIn>
                                    <IconButton onClick={() => {
                                        navigate('/home/roomdetails', {
                                            state: { adsData: item.room._id } 
                                        });
                                    }} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </Box>
                                <Box className="hover-price" sx={{ transition: 'all 0.3s ease-in-out', p: 1, position: 'absolute', top: -100, right: 0, borderRadius: '0 0 0 10px', width: '50%', bgcolor: 'rgba(255, 73, 139, 1)' }}>
                                    <Typography sx={{ color: 'white', textAlign: 'center' }}>
                                        <Typography component="span" sx={{ fontWeight: "800" }} >
                                            ${item.room.price}
                                        </Typography> per night
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2, position: 'absolute', bottom: 0, width: '100%' }}>
                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                        Room Number : {item.room.roomNumber}
                                    </Typography>
                                </Box>
                            </Paper>
                        );
                    })
                )}

            </Box >
        </>
    )
}

