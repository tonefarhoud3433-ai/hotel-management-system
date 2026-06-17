import React, { useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import noImages from "../../../assets/Images/Signature-2-Queen_body.webp"
import axios from 'axios';
import { toast } from 'react-toastify';

interface room {
    _id: string,
    roomNumber: string,
    price: number,
    capacity: number,
    discount: number,
    images: string,
}
export default function FirstADS() {
    const [roomData, setRoomData] = useState<room[]>([]);
    // const [roomActivate, setRoomActivate] = useState<boolean[]>([]);
    const data = async () => {
        try {
            let response = await axios("https://upskilling-egypt.com:3000/api/v0/portal/ads")
            const ADS = response?.data?.data?.ads || [];
            // const activeStates = ADS.map((ad: any) => ad.isActive);
            // setRoomActivate(activeStates);
            const roomData = ADS.map((ad: any) => (ad.room));
            setRoomData(roomData)
            console.log(roomData);
        } catch (error: any) {
            toast.error(error.response.message)
        }
    }
    const columns = roomData.length <= 3 ?  2 : 3;

    useEffect(() => {
        data();
    }, []);

    return (
        <>
            <Box
                sx={{
                    mx: { xs: 2, md: 10 }, // تقليل الهوامش في الشاشات الصغيرة
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
                {roomData.length <= 5 && roomData.map((item, index) => {
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
                                backgroundImage: `url(${item?.images?.length > 0 ? item.images[0] : noImages})`,
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
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ p: 1, position: 'absolute', top: 0, right: 0, borderRadius: '0 0 0 10px', width: '50%', bgcolor: 'rgba(255, 73, 139, 1)' }}>
                                <Typography sx={{ color: 'white', textAlign: 'center' }}>
                                    <Typography component="span" sx={{ fontWeight: "800" }} >
                                        ${item.price}
                                    </Typography> per night
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, position: 'absolute', bottom: 0, width: '100%' }}>
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    Room Number : {item.roomNumber}
                                </Typography>
                            </Box>
                        </Paper>
                    );
                })}
            </Box >
        </>
    )
}

