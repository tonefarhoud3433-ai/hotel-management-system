import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export interface Facility {
  _id: string;
  name: string;
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
  facility: Facility | null;
}

// دالة مساعدة لتنسيق التاريخ ليظهر بصيغة M/D/YYYY كما في الصورة
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export default function FacilityViewModal({
  open,
  onClose,
  facility,
}: ModalProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper:{
          sx: {
            borderRadius: 4, // حواف دائرية للـ Modal بالكامل
            p: 2,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          }
        }
      }}
    >
      {/* الهيدر: كلمة PROJECT DETAILS (تم استبدالها بـ FACILITY DETAILS) وزر الإغلاق X */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: '#1976d2', // اللون الأزرق
            fontWeight: 800,
            letterSpacing: '0.1rem',
            textTransform: 'uppercase'
          }}
        >
          Facility Details
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ mt: 1 }}>
        {/* قسم اسم المنشأة وتاريخ الإنشاء الخام */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A2530', mb: 2 }}>
              {facility?.name || "No Name"}
            </Typography>
            
            <Typography variant="caption" display="block" sx={{ fontWeight: 700, color: 'text.secondary', mb: 0.5 }}>
              Created At
            </Typography>
            <Typography variant="body2" sx={{ color: '#1A2530', fontWeight: 500 }}>
              {facility?.createdAt || "N/A"}
            </Typography>
          </Grid>
        </Grid>

        {/* قسم الجدول الزمني TIMELINE */}
        <Typography 
          variant="caption" 
          display="block" 
          sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05rem' }}
        >
          Timeline
        </Typography>
        
        <Box 
          sx={{ 
            bgcolor: '#F8F9FA', // خلفية رمادية فاتحة جداً
            p: 2, 
            borderRadius: 2, 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: 4, 
            mb: 4 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarMonthIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              <span style={{ color: '#6C757D' }}>Created: </span>
              {formatDate(facility?.createdAt)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              <span style={{ color: '#6C757D' }}>Modified: </span>
              {formatDate(facility?.updatedAt)}
            </Typography>
          </Box>
        </Box>

        {/* قسم الوصف (تم وضع اسم الشخص الذي أنشأ المنشأة هنا ليعطي شكل خانة الوصف في الصورة) */}
        <Typography 
          variant="caption" 
          display="block" 
          sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05rem' }}
        >
          Created By
        </Typography>
        
        <Box 
          sx={{ 
            width: '100%', 
            p: 2, 
            border: '1px dashed #E0E0E0', // إطار متقطع خفيف مثل الصورة
            borderRadius: 2, 
            bgcolor: '#FAFAFA',
            color: 'text.primary',
            fontWeight: 500
          }}
        >
          <Typography variant="body2">
            This facility was successfully created by <strong style={{ color: '#1976d2' }}>{facility?.createdBy?.userName || "Unknown"}</strong>.
          </Typography>
        </Box>

        {/* فوتر الموديل: زر Close Details الداكن في اليمين */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, mb: 1 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: '#0B132B', // لون كحلي داكن جداً مطابقة للصورة
              textTransform: 'none', // إلغاء الحروف الكبيرة الافتراضية
              borderRadius: 2.5,
              px: 4,
              py: 1,
              fontWeight: 600,
              fontSize: '0.875rem',
              '&:hover': {
                bgcolor: '#1C2541',
              }
            }}
          >
            Close Details
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}