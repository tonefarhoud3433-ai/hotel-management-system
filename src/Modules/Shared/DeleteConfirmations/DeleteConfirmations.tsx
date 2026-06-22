import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteFormIcon from "../../../assets/Images/trash.png";
import logout from "../../../assets/Images/logout.png";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description?: string;
  btnText?:string
}

export default function DeleteConfirmations({
  open,
  onClose,
  onDelete,
  title = "Delete This Item ?",
  description = "are you sure you want to delete this item ? if you are sure just click on delete it",
  btnText = 'delete it'
}: DeleteModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth={true}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            p: 2,
            position: "relative",
            textAlign: "center",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "#EF4444",
          border: "1px solid #FEE2E2",
          bgcolor: "#FEE2E2",
          p: 0.5,
          "&:hover": {
            bgcolor: "#FCA5A5",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <DialogContent
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mb: 3,
            width: 100,
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <img src={title=='Confirm Logout'? logout:  DeleteFormIcon} alt="delete" style={{ width: "100%" }} />
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#4B5563",
            mb: 1.5,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#9CA3AF",
            px: 2,
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          {description}
        </Typography>

        <Button
          variant="contained"
          onClick={onDelete}
          sx={{
            bgcolor: "#EF4444",
            color: "#fff",
            textTransform: "none",
            px: 4,
            py: 1,
            borderRadius: "8px",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#DC2626",
            },
          }}
        >
          {btnText} 
        </Button>
      </DialogContent>
    </Dialog>
  );
}
