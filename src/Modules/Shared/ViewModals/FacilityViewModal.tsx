import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

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
export default function FacilityViewModal({
  open,
  onClose,
  facility,
}: ModalProps) {
  return (
    <>
      <Dialog open={open} onClose={onClose} >
        <DialogTitle>Facility Details</DialogTitle>
        <Divider/>
        <DialogContent sx={{ minWidth: 400 }}>
          <Typography variant="h6">Facility Name: {facility?.name}</Typography>
          <Typography variant="body1">
            Created by: {facility?.createdBy.userName}
          </Typography>
          <Typography variant="body1">Created at: {facility?.createdAt && new Date(facility.createdAt).toLocaleDateString()}</Typography>
          <Typography variant="body1">Updated at: {facility?.updatedAt && new Date(facility.updatedAt).toLocaleDateString()}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
