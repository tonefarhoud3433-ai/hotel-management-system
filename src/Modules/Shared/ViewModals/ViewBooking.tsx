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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import KeyIcon from '@mui/icons-material/Key';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// تحديث الـ Interface ليتطابق تماماً مع ستركشر الـ Booking الجديد
export interface BookingData {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
    userName: string;
  };
  room: {
    _id: string;
    roomNumber: string;
  } | null;
  status: "completed" | "pending";
  createdAt: string;
  updatedAt: string;
  stripeChargeId?: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  facility: any; // يستقبل الحجز الممرر من السطر النشط في الجدول
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

export default function ViewBooking({
  open,
  onClose,
  facility,
}: ModalProps) {
  
  // لضمان استقرار البيانات الممررة من الجدول مباشرة
  const bookingData: BookingData = facility;

  const roomNumber = bookingData?.room?.roomNumber || "Deleted Room";
  const clientName = bookingData?.user?.userName || "N/A";
  const isCompleted = bookingData?.status === "completed";

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
          Global Booking Reservation Details
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary', '&:hover': { bgcolor: '#F3F4F6' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 1 }}>

        {/* Main Header Information */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ bgcolor: '#eff6ff9e', p: 1.2, borderRadius: 3, display: 'flex', alignItems: 'center' }}>
              <MeetingRoomIcon sx={{ color: '#1d4ed8', fontSize: '2rem' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827' }}>
                Room {roomNumber}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                Reserved by: <span style={{ fontWeight: 700, color: '#374151' }}>{clientName}</span>
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={bookingData?.status} 
            color={isCompleted ? "success" : "warning"}
            sx={{ 
              fontWeight: 700, 
              borderRadius: '8px',
              px: 1,
              textTransform: 'capitalize',
              bgcolor: isCompleted ? '#e6f4ea' : '#fef3c7',
              color: isCompleted ? '#10b981' : '#d97706'
            }} 
          />
        </Box>

        {/* Info Grid Cards */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Total Price Paid Card */}
          <Grid item xs={6} sm={4}>
            <Card variant="outlined" sx={{ p: 1.5, borderRadius: 3, border: '1px solid #f3f4f6', bgcolor: '#fbfbfb' }}>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                <AttachMoneyIcon sx={{ color: '#059669', fontSize: '1.2rem' }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#6b7280' }}>
                  Total Price
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: '#111827', fontWeight: 700, pl: 0.5 }}>
                {bookingData?.totalPrice !== undefined ? `$${bookingData.totalPrice.toLocaleString()}` : "N/A"}
              </Typography>
            </Card>
          </Grid>

          {/* Status Tracker Card */}
          <Grid item xs={6} sm={4}>
            <Card variant="outlined" sx={{ p: 1.5, borderRadius: 3, border: '1px solid #f3f4f6', bgcolor: '#fbfbfb' }}>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                {isCompleted ? (
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: '1.1rem' }} />
                ) : (
                  <InfoIcon sx={{ color: '#d97706', fontSize: '1.1rem' }} />
                )}
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#6b7280' }}>
                  Payment Status
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: isCompleted ? '#10b981' : '#d97706', fontWeight: 700, pl: 0.5, textTransform: 'capitalize' }}>
                {bookingData?.status || "N/A"}
              </Typography>
            </Card>
          </Grid>

          {/* Client Username Reference */}
          <Grid item xs={12} sm={4}>
            <Card variant="outlined" sx={{ p: 1.5, borderRadius: 3, border: '1px solid #f3f4f6', bgcolor: '#fbfbfb' }}>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                <PeopleIcon sx={{ color: '#2563eb', fontSize: '1.1rem' }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#6b7280' }}>
                  Client Account
                </Typography>
              </Stack>
              <Typography variant="body1" noWrap sx={{ color: '#111827', fontWeight: 700, pl: 0.5, fontSize: '0.9rem' }}>
                {clientName}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Booking Reference ID */}
        <Box sx={{ mb: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2.5, border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1 }}>
          <KeyIcon sx={{ color: '#94a3b8', fontSize: '1.1rem' }} />
          <Box>
            <Typography variant="caption" display="block" sx={{ fontWeight: 700, color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              Booking Reference ID
            </Typography>
            <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {bookingData?._id || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Stay Duration Timeline Block */}
        <Typography 
          variant="caption" 
          display="block" 
          sx={{ fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05rem', fontSize: '0.75rem' }}
        >
          Stay Duration Timeline
        </Typography>
        
        <Box 
          sx={{ 
            bgcolor: '#f8fafc', 
            p: 2, 
            borderRadius: 3, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            border: '1px solid #f1f5f9'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <CalendarMonthIcon sx={{ color: '#3b82f6', fontSize: '1.25rem' }} />
            <Box>
              <Typography variant="caption" display="block" sx={{ color: '#64748b', fontWeight: 500 }}>Arrival Date</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                {formatDate(bookingData?.startDate)}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <CalendarMonthIcon sx={{ color: '#ef4444', fontSize: '1.25rem' }} />
            <Box>
              <Typography variant="caption" display="block" sx={{ color: '#64748b', fontWeight: 500 }}>Departure Date</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                {formatDate(bookingData?.endDate)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stripe Gateway Info if available */}
        {bookingData?.stripeChargeId && (
          <Box 
            sx={{ 
              width: '100%', 
              p: 1.5, 
              border: '1px dashed #cbd5e1', 
              borderRadius: 3, 
              bgcolor: '#fdfdfd',
              color: '#475569',
              boxSizing: 'border-box'
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
              🔒 Gateway Transaction Sync Verified. Stripe Charge reference ID: 
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a', marginLeft: '4px' }}>
                {bookingData.stripeChargeId}
              </span>.
            </Typography>
          </Box>
        )}

        {/* Dismiss Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mb: 1 }}>
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