import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  Chip,
  Stack,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import KeyIcon from '@mui/icons-material/Key';

export interface AdData {
  _id: string;
  isActive: boolean;
  roomNumber?: string;
  price?: number;
  discount?: number;
  capacity?: number;
  room?: {
    _id: string;
    roomNumber: string;
    price: number;
    discount: number;
    capacity: number;
    images?: string[];
  } | null;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  facility: any; // خليناها any هنا عشان تستقبل الـ ستركشر المرن اللي جاي من الـ Ads مباشرة
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function ViewADS({
  open,
  onClose,
  facility,
}: ModalProps) {
  
  // هنا بنضمن إنه لو جاي كـ Object مباشر أو متغلف جوه ستركشر الـ API الجديد (ads) يشتغل في الحالتين
  const adData = facility?.ads ? facility.ads : facility;

  const roomNumber = adData?.room?.roomNumber || adData?.roomNumber || "N/A";
  const price = adData?.room?.price ?? adData?.price;
  const discount = adData?.room?.discount ?? adData?.discount;
  const capacity = adData?.room?.capacity ?? adData?.capacity;
  
  // استخراج الصورة المرفقة بالركيرد لو موجودة
  const roomImage = adData?.room?.images?.[0] || adData?.images?.[0] || null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4, 
            p: 1,
            boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.1)',
            background: '#ffffff'
          }
        }
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 2, pb: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: '#1976d2', 
            fontWeight: 800,
            letterSpacing: '0.12rem',
            textTransform: 'uppercase',
            fontSize: '0.75rem'
          }}
        >
          Campaign Advertisement Details
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { bgcolor: '#F3F4F6' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 1 }}>
        
        {/* Room Image Header Preview if exists */}
        {roomImage && (
          <Box 
            component="img"
            src={roomImage}
            alt={`Room ${roomNumber}`}
            sx={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: 3,
              mb: 1,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
            }}
          />
        )}

        {/* Main Room Highlight Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ bgcolor: '#eff6ff9e', p: 1.2, borderRadius: 3, display: 'flex', alignItems: 'center' }}>
              <MeetingRoomIcon sx={{ color: '#1d4ed8', fontSize: '2rem' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827' }}>
                Room {roomNumber}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                Main Portal Advertisement Info
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={adData?.isActive ? "Active Ad" : "Inactive"} 
            color={adData?.isActive ? "success" : "error"}
            variant="soft"
            sx={{ 
              fontWeight: 700, 
              borderRadius: '8px',
              px: 1,
              bgcolor: adData?.isActive ? '#e6f4ea' : '#fce8e6',
              color: adData?.isActive ? '#10b981' : '#ef4444'
            }} 
          />
        </Box>

        {/* Info Grid Cards */}
        <Grid container spacing={2} sx={{ mb: 1 }}>
          {/* Base Price Card */}
          <Grid item xs={6} sm={4}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 3, border: '1px solid #f3f4f6', bgcolor: '#fbfbfb', textAlign: 'center' }}>
                                <Stack sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>

              <AttachMoneyIcon sx={{ color: '#059669', mb: 0.5 }} />
              <Typography variant="caption" display="block" sx={{ fontWeight: 600, color: '#6b7280' }}>
                Base Price
              </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: '#111827', fontWeight: 700, mt: 0.5 }}>
                {price !== undefined ? `$${price}` : "N/A"}
              </Typography>
            </Card>
          </Grid>

          {/* Discount Card */}
          <Grid item xs={6} sm={4}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 3, border: '1px solid #f3f4f6', bgcolor: '#fbfbfb', textAlign: 'center' }}>
                <Stack sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <PercentIcon sx={{ color: '#d97706', mx: 0.5, fontSize: '1.2rem' }} />
              <Typography variant="caption"  sx={{display:'block', fontWeight: 600, color: '#6b7280' }}>
                Discount Ratio
              </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: '#111827', fontWeight: 700, mt: 0.5 }}>
                {discount !== undefined ? `${discount}%` : "0%"}
              </Typography>
            </Card>
          </Grid>

          {/* Capacity Card */}
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 3, border: '1px solid #f3f4f6', bgcolor: '#fbfbfb', textAlign: 'center' }}>
                <Stack sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>

              <PeopleIcon sx={{ color: '#2563eb',mx:0.5 }} />
              <Typography variant="caption" display="block" sx={{ fontWeight: 600, color: '#6b7280' }}>
                Max Capacity
              </Typography>
                </Stack>
              <Typography variant="body1" sx={{ color: '#111827', fontWeight: 700, mt: 0.5 }}>
                {capacity !== undefined ? `${capacity} Guests` : "N/A"}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Database Reference ID */}
        <Box sx={{ mb: 1, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2.5, border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1 }}>
          <KeyIcon sx={{ color: '#94a3b8', fontSize: '1.1rem' }} />
          <Box>
            <Typography variant="caption" display="block" sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              Ad Reference Key ID
            </Typography>
            <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {adData?._id || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Timeline Details Block */}
        <Typography 
          variant="caption" 
          display="block" 
          sx={{ fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', mb: 1.5, letterSpacing: '0.05rem', fontSize: '0.75rem' }}
        >
          Timeline Sync
        </Typography>
        
        <Box 
          sx={{ 
            bgcolor: '#f8fafc', 
            p: 2, 
            borderRadius: 3, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            border: '1px solid #f1f5f9'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <CalendarMonthIcon sx={{ color: '#3b82f6', fontSize: '1.25rem' }} />
            <Box>
              <Typography variant="caption" display="block" sx={{ color: '#64748b', fontWeight: 500 }}>Published At</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                {formatDate(adData?.createdAt)}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <AccessTimeIcon sx={{ color: '#10b981', fontSize: '1.25rem' }} />
            <Box>
              <Typography variant="caption" display="block" sx={{ color: '#64748b', fontWeight: 500 }}>Last Modified</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                {formatDate(adData?.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Creator Info Alert Banner */}
        <Box 
          sx={{ 
            width: '100%', 
            p: 2, 
            border: '1px dashed #cbd5e1', 
            borderRadius: 3, 
            bgcolor: '#fdfdfd',
            color: '#475569',
            boxSizing: 'border-box'
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
            This campaign deployment status is managed directly. Active configuration logs state that this advertisement entry was created by Administrator: <strong style={{ color: '#1976d2', fontWeight: 700 }}>{adData?.createdBy?.userName || "System"}</strong>.
          </Typography>
        </Box>

        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, mb: 1 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: '#1e293b', 
              textTransform: 'none', 
              borderRadius: 2.5,
              px: 4,
              py: 1,
              fontWeight: 600,
              fontSize: '0.875rem',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#0f172a',
                boxShadow: 'none',
              }
            }}
          >
            Dismiss
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}