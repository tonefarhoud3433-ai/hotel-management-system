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
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import KeyIcon from "@mui/icons-material/Key";
import StarIcon from "@mui/icons-material/Star";

export interface RoomDetailData {
  _id: string;
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
  images: string[];
  facilities: any[];
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    userName: string;
  };
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function ViewRooms({ open, onClose, facility }: ModalProps) {
  const roomData: RoomDetailData | null = facility?.room
    ? facility.room
    : facility;

  const roomNumber = roomData?.roomNumber || "N/A";
  const price = roomData?.price;
  const discount = roomData?.discount;
  const capacity = roomData?.capacity;
  const roomImage = roomData?.images?.[0] || null;
  const creatorName = roomData?.createdBy?.userName || "Admin";
  const facilities = roomData?.facilities || [];

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
            p: 0.5,
            boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
            overflowY: "hidden", // منع السكرول العامودي تماماً
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2.5,
          pt: 1.5,
          pb: 0.5,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: "#1976d2",
            fontWeight: 800,
            letterSpacing: "0.12rem",
            textTransform: "uppercase",
            fontSize: "0.75rem",
          }}
        >
          Room Profile Details
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary", "&:hover": { bgcolor: "#F3F4F6" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 2.5, py: 0.5, overflowY: "hidden" }}>
        {/* Room Cover Image Preview */}
        {roomImage && (
          <Box
            component="img"
            src={roomImage}
            alt={`Room ${roomNumber}`}
            sx={{
              width: "100%",
              height: "135px", // مضغوطة لمنع الـ Scroll
              objectFit: "cover",
              borderRadius: 3,
              mb: 1.5,
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
            }}
          />
        )}

        {/* Main Room Highlight Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: "#eff6ff9e",
                p: 1,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MeetingRoomIcon sx={{ color: "#1d4ed8", fontSize: "1.8rem" }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#111827", lineHeight: 1.2 }}
              >
                Room {roomNumber}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", fontSize: "0.8rem" }}
              >
                Active Asset Specifications
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Info Grid Cards - مدمج بها الـ Stack الأفقي للأيقونات مثل الـ Ads تماماً */}
        <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
          {/* Base Price Card */}
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                p: 1,
                borderRadius: 3,
                border: "1px solid #f3f4f6",
                bgcolor: "#fbfbfb",
                textAlign: "center",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.3,
                }}
              >
                <AttachMoneyIcon
                  sx={{ color: "#059669", fontSize: "1.1rem" }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    fontWeight: 600,
                    color: "#6b7280",
                    fontSize: "0.65rem",
                  }}
                >
                  Base Price
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: "#111827", fontWeight: 700, mt: 0.3 }}
              >
                {price !== undefined ? `$${price}` : "N/A"}
              </Typography>
            </Card>
          </Grid>

          {/* Discount Card */}
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                p: 1,
                borderRadius: 3,
                border: "1px solid #f3f4f6",
                bgcolor: "#fbfbfb",
                textAlign: "center",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.3,
                }}
              >
                <PercentIcon sx={{ color: "#d97706", fontSize: "1rem" }} />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    fontWeight: 600,
                    color: "#6b7280",
                    fontSize: "0.65rem",
                  }}
                >
                  Discount
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: "#111827", fontWeight: 700, mt: 0.3 }}
              >
                {discount !== undefined ? `${discount}%` : "0%"}
              </Typography>
            </Card>
          </Grid>

          {/* Capacity Card */}
          <Grid item xs={4}>
            <Card
              variant="outlined"
              sx={{
                p: 1,
                borderRadius: 3,
                border: "1px solid #f3f4f6",
                bgcolor: "#fbfbfb",
                textAlign: "center",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.3,
                }}
              >
                <PeopleIcon sx={{ color: "#2563eb", fontSize: "1.1rem" }} />
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    fontWeight: 600,
                    color: "#6b7280",
                    fontSize: "0.65rem",
                  }}
                >
                  Max Capacity
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: "#111827", fontWeight: 700, mt: 0.3 }}
              >
                {capacity !== undefined ? `${capacity} Gst` : "N/A"}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Facilities Chips Section */}
        {facilities.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {facilities.map((fac: any, index: number) => (
                <Chip
                  key={fac._id || index}
                  label={fac.name || fac}
                  icon={
                    <StarIcon
                      style={{ color: "#d97706", fontSize: "0.8rem" }}
                    />
                  }
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "6px",
                    fontWeight: 600,
                    bgcolor: "#fef3c7",
                    color: "#d97706",
                    borderColor: "#fde68a",
                    fontSize: "0.7rem",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Room Reference Key ID */}
        <Box
          sx={{
            mb: 1.5,
            p: 1,
            bgcolor: "#f8fafc",
            borderRadius: 2.5,
            border: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <KeyIcon sx={{ color: "#94a3b8", fontSize: "1.1rem" }} />
          <Box>
            <Typography
              variant="caption"
              display="block"
              sx={{
                fontWeight: 700,
                color: "#64748b",
                fontSize: "0.65rem",
                textTransform: "uppercase",
              }}
            >
              Room Reference Key ID
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#334155",
                fontWeight: 600,
                fontFamily: "monospace",
                fontSize: "0.75rem",
              }}
            >
              {roomData?._id || "N/A"}
            </Typography>
          </Box>
        </Box>

        {/* Timeline Details Block */}
        <Box
          sx={{
            bgcolor: "#f8fafc",
            p: 1.2,
            borderRadius: 3,
            display: "flex",
            gap: 2,
            alignItems: "center",
            mb: 1.5,
            border: "1px solid #f1f5f9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonthIcon sx={{ color: "#3b82f6", fontSize: "1.1rem" }} />
            <Box>
              <Typography
                variant="caption"
                display="block"
                sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.65rem" }}
              >
                Created At
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.75rem" }}
              >
                {formatDate(roomData?.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon sx={{ color: "#10b981", fontSize: "1.1rem" }} />
            <Box>
              <Typography
                variant="caption"
                display="block"
                sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.65rem" }}
              >
                Last Modified
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.75rem" }}
              >
                {formatDate(roomData?.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Creator Info Alert Banner */}
        <Box
          sx={{
            width: "100%",
            p: 1.2,
            border: "1px dashed #cbd5e1",
            borderRadius: 3,
            bgcolor: "#fdfdfd",
            color: "#475569",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", lineHeight: 1.4 }}
          >
            Active configuration logs state that this asset entry was created by
            Administrator:{" "}
            <strong style={{ color: "#1976d2", fontWeight: 700 }}>
              {creatorName}
            </strong>
            .
          </Typography>
        </Box>

        {/* Action Button */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5, mb: 0.5 }}
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: "#1e293b",
              textTransform: "none",
              borderRadius: 2.5,
              px: 3,
              py: 0.6,
              fontWeight: 600,
              fontSize: "0.8rem",
              boxSizing: "border-box",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#0f172a",
                boxShadow: "none",
              },
            }}
          >
            Dismiss
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
