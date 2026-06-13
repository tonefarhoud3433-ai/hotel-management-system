import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Dialog,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

// تعريف الـ Interface الخاص بالمستخدم
export interface UserData {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  facility: any; // استقبال بيانات المستخدم
}

export default function ViewUser({ open, onClose, facility }: ModalProps) {
  const user: UserData = facility;

  if (!user) return null;

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
            boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, pt: 2, pb: 1 }}>
        <Typography variant="subtitle2" sx={{ color: "#1976d2", fontWeight: 800, letterSpacing: "0.12rem", textTransform: "uppercase", fontSize: "0.75rem" }}>
          User Profile Details
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary", "&:hover": { bgcolor: "#F3F4F6" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 1 }}>
        {/* Profile Header Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, mt: 1 }}>
          <Avatar src={user.profileImage} sx={{ width: 80, height: 80, border: "3px solid #e2e8f0" }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>{user.userName}</Typography>
            <Chip
              label={user.role}
              size="small"
              sx={{ mt: 0.5, fontWeight: 700, textTransform: "capitalize", bgcolor: user.role === 'admin' ? '#f3e8ff' : '#e0f2fe', color: user.role === 'admin' ? '#7c3aed' : '#0284c7' }}
            />
          </Box>
        </Box>

        {/* Info Grid Cards */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Email Card */}
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ p: 1.5, borderRadius: 3, border: "1px solid #f3f4f6", bgcolor: "#fbfbfb" }}>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                <EmailIcon sx={{ color: "#6b7280", fontSize: "1.1rem" }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: "#6b7280" }}>Email</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "#111827", fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</Typography>
            </Card>
          </Grid>

          {/* Phone Card */}
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ p: 1.5, borderRadius: 3, border: "1px solid #f3f4f6", bgcolor: "#fbfbfb" }}>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                <PhoneIcon sx={{ color: "#6b7280", fontSize: "1.1rem" }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: "#6b7280" }}>Phone</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "#111827", fontWeight: 700 }}>{user.phoneNumber}</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Details Box */}
        <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <PublicIcon sx={{ color: "#94a3b8", fontSize: "1.2rem" }} />
            <Typography variant="body2" sx={{ color: "#475569" }}>Country: <strong style={{ color: "#1e293b" }}>{user.country}</strong></Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <VerifiedUserIcon sx={{ color: user.verified ? "#10b981" : "#d97706", fontSize: "1.2rem" }} />
            <Typography variant="body2" sx={{ color: "#475569" }}>Status: <strong style={{ color: user.verified ? "#10b981" : "#d97706" }}>{user.verified ? "Verified" : "Unverified"}</strong></Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <KeyIcon sx={{ color: "#94a3b8", fontSize: "1.2rem" }} />
            <Box>
              <Typography variant="caption" sx={{ display: "block", color: "#64748b", fontWeight: 700 }}>User ID</Typography>
              <Typography variant="body2" sx={{ color: "#334155", fontFamily: "monospace", fontSize: "0.75rem" }}>{user._id}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" onClick={onClose} sx={{ bgcolor: "#1e293b", borderRadius: 2.5, px: 4, py: 1, textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#0f172a" } }}>
            Dismiss
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}