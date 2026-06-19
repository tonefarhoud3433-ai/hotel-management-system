import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect } from 'react';
import type { FavItem } from './FavList';
import { Visibility } from '@mui/icons-material';

interface CardProps{
  item:FavItem
}
const FavCard = ({item}:CardProps) => {
  useEffect(()=>{console.log(item.images[0])},[])
  return (
    /* Container to handle overall width and layout centering */
    <Box sx={{ maxWidth: 800, margin: '20px auto' }} >
      <Card 
      
        sx={{ 
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
        onClick={()=>console.log(item)}
          component="img"
          sx={{
            height: '300px',

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
          <FavoriteIcon 
            sx={{ 
              color: '#FFFFFF', 
              fontSize: '2rem', // Scaled up to match the sample design
              filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.3))', 
              marginRight:2
            }} 
          />
          <Visibility
            sx={{ 
              color: '#FFFFFF', 
              fontSize: '2rem', // Scaled up to match the sample design
              filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.3))' 
            }} 
          />
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
    </Box>
  );
};

export default FavCard;