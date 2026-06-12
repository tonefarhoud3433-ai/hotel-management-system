import { Dialog } from '@mui/material'
interface ModalProps {
    open: boolean;
    onClose: () => void;
}
export default function FacilityViewModal({open,onClose}:ModalProps) {
  return (
    <>
    <Dialog open={open} onClose={onClose}>
        <h1>hmada dialog</h1>
      </Dialog>
    </>
  )
}
