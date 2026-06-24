import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import type { CardData } from './StaticSwiper';

const PropertyCard = ({ card }: { card: CardData }) => {
  // Reference image from image_291e44.jpg pathing placeholder
  const sampleImage = card.imagePath;

  return (
    <Card
      sx={{
        maxWidth: '100%',
        borderRadius: '12px',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        // Selecting the sticker class when the entire card is hovered
        '&:hover .hover-sticker': {
          top: 0,
        }
      }}
    >
      {/* Position Relative Wrapper for the image and absolute badge */}
      <Box sx={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>

        <CardMedia
          component="img"
          height="260"
          image={sampleImage}
          alt="Tabby Town"
          sx={{
            borderRadius: '12px',
            objectFit: 'cover'
          }}
        />

        {/* Popular Choice Sticker - Only visible on hover */}
        <Box
          className="hover-sticker"
          sx={{
            position: 'absolute',
            top: -100,
            right: 0,
            backgroundColor: 'rgba(255, 73, 139, 1)', // Vibrant hot pink matching the sticker in image_291e44.jpg
            color: '#FFFFFF',
            padding: '12px 24px',
            borderBottomLeftRadius: '12px', // Curved inner corner styling
            // opacity: 0, // Hidden by default
            transition: 'all 0.3s ease',
            pointerEvents: 'none', // Prevents mouse flickering issues
            display: 'flex',
            gap: '4px',
          }}
        >
          <Typography component="span" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            popular
          </Typography>
          <Typography component="span" sx={{ fontWeight: 300, fontSize: '1rem' }}>
            Choice
          </Typography>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ px: 2, pt: 1, pb: 0, '&:last-child': { pb: 0 } }}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 500,
            color: '#1A365D',
            fontSize: '22px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {card.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#A0AEC0',
            fontSize: '1.2rem',

            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >

          {card.subTitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;