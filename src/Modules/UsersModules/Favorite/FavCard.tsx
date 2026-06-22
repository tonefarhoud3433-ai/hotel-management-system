import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axiosClient, { API_BASE_URL } from '../../../API/axsiosClient';
import type { FavItem } from './FavList';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmations from '../../Shared/DeleteConfirmations/DeleteConfirmations';
import { useContext, useState } from 'react';
import { RoomContext } from '../../../Contexts/RoomContext';

interface CardProps {
  item: FavItem
  refresh: () => void
}
const FavCard = ({ item, refresh }: CardProps) => {
    const {handleCountChange} = useContext(RoomContext)

  const navigate = useNavigate();
  const [openConfirm,setOpenConfirm] = useState<boolean>(false)

  const removeFromFavorite = async () => {
    try {
      const res = await axiosClient.delete(`${API_BASE_URL}/api/v0/portal/favorite-rooms/${item._id}`, { data: { roomId: item._id } })
      toast.success(res?.data?.message)
      refresh()
      handleCountChange()
      
      
    }
    catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <Box>
      <Card

        sx={{
          my: 3,
          height: '300px',
          borderRadius: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          // When the Card component is hovered, reveal the elements inside the overlay class
          opacity: 1,
          '&:hover .hover-overlay': {
            opacity: 1,
          },
        }}
      >
        {/* Main background image layer */}
        <CardMedia
          component="img"
          sx={{
            height: '100%',

            // paddingTop: '56.25%',
            //  // Maintains a perfect 16:9 aspect ratio
            objectFit: 'cover',
          }}
          alt="Stark House exterior view"
          crossOrigin='anonymous'
          src={item.images[0]}
        />
        {/* NEW: Hover Dark Overlay Layer with Centered Heart Icon */}
        <Box
          className="hover-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.35)', // Darkens the entire image on hover
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0, // Hidden by default
            transition: 'opacity 0.3s ease-in-out', // Smooth transition fade
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={()=>setOpenConfirm(true)}
            sx={{
              color: "#C0392B",
              bgcolor: "rgba(255,255,255,0.2)",
              transition:'all 0.3s ease-in-out',
              "&:hover": { bgcolor: "rgba(255,255,255,0.5)",color: "#8d1f13", },
              mx: 2
            }}
          >

            <FavoriteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate(`/home/roomdetails/${item?._id}`);
            }}
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
            }}>
            <VisibilityIcon />
          </IconButton>
        </Box>

        {/* Absolute-positioned overlay container for the typography */}
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: { xs: '20px 24px', sm: '30px 40px' },
            boxSizing: 'border-box',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 2, // Layered cleanly above the image and background overlays
          }}
        >
          {/* Main Title Text */}
          <Typography
            variant="h3"
            component="div"
            sx={{
              color: '#FFFFFF',
              fontFamily: '"Inter", "Heebo", "Helvetica Neue", sans-serif',
              fontWeight: 500,
              fontSize: { xs: '2rem', sm: '3rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {item?.roomNumber}
          </Typography>

          {/* Subtitle / Location Text */}
          <Typography
            variant="subtitle1"
            sx={{
              color: '#FFFFFF',
              fontFamily: '"Inter", "Heebo", "Helvetica Neue", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              opacity: 0.9,
              letterSpacing: '0.01em',
            }}
          >
            Malang, Indonesia
          </Typography>
        </CardContent>
      </Card>
      <DeleteConfirmations onClose={()=>setOpenConfirm(false)} open={openConfirm} onDelete={removeFromFavorite}/>
    </Box>
  );
};

export default FavCard;