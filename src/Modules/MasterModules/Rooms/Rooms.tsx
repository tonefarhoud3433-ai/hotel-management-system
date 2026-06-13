import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { toast } from "react-toastify";
import { getAllRooms } from "../../../API/modules/AdminRooms";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import DeleteConfirmations from "../../Shared/DeleteConfirmations/DeleteConfirmations";
import FacilityViewModal from "../../Shared/ViewModals/FacilityViewModal";

const paginationModel = { page: 0, pageSize: 5 };

export default function Rooms() {
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [roomNumberValue, setRoomNumberValue] = React.useState("");
  const [rowsData, setRowsData] = React.useState([]);
  const [selectedRoom, setSelectedRoom] = React.useState<any>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewRoom, setViewRoom] = React.useState<any>(null);

  // Actions Menu State Management
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = React.useState<any>(null);
  const openMenu = Boolean(anchorEl);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await getAllRooms();
      const { rooms = [] } = response?.data?.data || {};
      console.log("Successfully extracted rooms:", rooms);
      setRowsData(rooms);
    } catch (error) {
      console.error("Error fetching rooms data:", error);
    }
  };

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      // NOTE: Replace this placeholder with your actual AdminRooms delete endpoint once available
      // await deleteRoom(selectedId); 
      toast.success("Deleted successfully!");
      handleCloseDelete();
      fetchData();
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Failed to delete this room!";
      toast.error(errorMessage);
    }
  };

  const handleOpenAdd = () => {
    setSelectedRoom(null);
    setRoomNumberValue("");
    setOpenModal(true);
  };

  const handleOpenEdit = (row: any) => {
    setSelectedRoom(row);
    setRoomNumberValue(row.roomNumber);
    setOpenModal(true);
  };

  const handleOpenView = (row: any) => {
    setViewRoom(row);
    setOpenViewModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRoomNumberValue("");
    setSelectedRoom(null);
  };

  const handleSaveRoom = async () => {
    if (!roomNumberValue.trim()) return;
    const isEdit = !!selectedRoom;
    try {
      if (isEdit) {
        // NOTE: Replace these with actual Room mutations when integrated
        // await updateRoom(selectedRoom._id, { roomNumber: roomNumberValue });
      } else {
        // await addRoom({ roomNumber: roomNumberValue });
      }
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  // FIX: Search now filters correctly by 'roomNumber' instead of non-existent 'name'
  const filteredRows = rowsData.filter((row: any) =>
    row.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: "roomNumber",
      headerName: "Room Number",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
    },
    {
      field: "images",
      headerName: "Image",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      renderCell: (params) => {
        const imageUrl = Array.isArray(params.value) ? params.value[0] : params.value;
        return imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt="Room"
            sx={{ width: 45, height: 45, borderRadius: 1, objectFit: "cover", my: 0.5 }}
          />
        ) : (
          <span style={{ color: "#9ca3af" }}>No Image</span>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueFormatter: (value) => (value != null ? `$${Number(value).toLocaleString()}` : "N/A"),
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueFormatter: (value) => (value != null ? `${value}%` : "0%"),
    },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueFormatter: (value) => (value != null ? `${value} Guests` : "N/A"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      renderCell: (params) => (
        <Box>
          <IconButton onClick={(e) => handleClickMenu(e, params.row)} sx={{ color: "#6B7280" }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <CustomHeader
        title="Rooms Table Details"
        subTitle="You can check all details"
        buttonText="Add New Room"
        onButtonClick={handleOpenAdd}
      />

      <Box sx={{ width: { xs: "90%", sm: "90%", md: "85%" }, mx: "auto", mt: 3 }}>
        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            placeholder="Search by Room Number..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "320px" },
              backgroundColor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
        </Box>

        {/* 1. Desktop & Tablet View (DataGrid) */}
        <Paper
          sx={{
            display: { xs: "none", sm: "block" },
            elevation: 0,
            boxShadow: "none",
            borderRadius: "16px",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            autoHeight
            disableRowSelectionOnClick
            sx={{
              border: 0,
              textAlign: "center",
              backgroundColor: "#fff",
              "& .custom-id-header": { backgroundColor: "inherit" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "rgba(226, 229, 235, 1)!important",
                color: "#1F2937",
                fontSize: "15px",
                fontWeight: "600",
              },
              "& .MuiDataGrid-row": {
                borderBottom: "0px solid rgba(243, 244, 246, 1)",
                "&:nth-of-type(even)": { backgroundColor: "rgba(248, 249, 251, 1)" },
                "&:nth-of-type(odd)": { backgroundColor: "#fff" },
              },
              "& .MuiDataGrid-row:hover": { backgroundColor: "#F3F4F6 !important" },
            }}
          />
        </Paper>

        {/* 2. Mobile Responsive Layout (Cards) */}
        <Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column", gap: 2, mb: 3 }}>
          {filteredRows.length > 0 ? (
            filteredRows.map((row: any) => (
              <Card
                key={row._id}
                sx={{ borderRadius: "12px", boxShadow: "0px 2px 4px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB" }}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "700", color: "#1F2937" }}>
                      Room: {row.roomNumber}
                    </Typography>
                    <IconButton size="small" onClick={(e) => handleClickMenu(e, row)} sx={{ color: "#6B7280" }}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>

                  <Divider sx={{ my: 1, borderColor: "#F3F4F6" }} />

                  {/* FIX: Synchronized parameters on cards with real data values */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Price:</Typography>
                      <Typography variant="body2" sx={{ color: "#4B5563", fontWeight: "600" }}>
                        {row.price ? `$${row.price}` : "N/A"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Discount:</Typography>
                      <Typography variant="body2" sx={{ color: "#4B5563" }}>
                        {row.discount ? `${row.discount}%` : "0%"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>Capacity:</Typography>
                      <Typography variant="body2" sx={{ color: "#4B5563" }}>
                        {row.capacity ? `${row.capacity} Guests` : "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", color: "#9CA3AF", py: 4 }}>
              No rooms found
            </Typography>
          )}
        </Box>
      </Box>

      {/* Shared Actions Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        id="actions-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
              mt: 1.5,
              borderRadius: 3,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ py: 1 }}
          onClick={() => {
            if (activeRow) handleOpenView(activeRow);
            handleCloseMenu();
          }}
        >
          <RemoveRedEyeIcon sx={{ fontSize: 20, color: "darkblue", mx: 1 }} /> View
        </MenuItem>

        <MenuItem
          sx={{ py: 1 }}
          onClick={() => {
            if (activeRow) handleOpenEdit(activeRow);
            handleCloseMenu();
          }}
        >
          <EditDocumentIcon sx={{ fontSize: 20, color: "orange", mx: 1 }} /> Edit
        </MenuItem>

        <MenuItem
          sx={{ py: 1 }}
          onClick={() => {
            if (activeRow) handleOpenDelete(activeRow._id);
            handleCloseMenu();
          }}
        >
          <DeleteForeverIcon sx={{ fontSize: 20, color: "red", mx: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Edit / Add Room Dialog */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {selectedRoom ? "Edit Room" : "Add New Room"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Room Number"
            type="text"
            fullWidth
            variant="outlined"
            value={roomNumberValue}
            onChange={(e) => setRoomNumberValue(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseModal} color="inherit">Cancel</Button>
          <Button
            onClick={handleSaveRoom}
            variant="contained"
            color={selectedRoom ? "warning" : "primary"}
          >
            {selectedRoom ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Modal */}
      <FacilityViewModal open={openViewModal} onClose={() => setOpenViewModal(false)} facility={viewRoom} />

      {/* Delete Modal */}
      <DeleteConfirmations open={isDeleteOpen} onClose={handleCloseDelete} onDelete={handleConfirmDelete} title="Delete This Room ?" />
    </>
  );
}