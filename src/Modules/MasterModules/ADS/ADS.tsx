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
  FormControl,
  IconButton,
  InputLabel,
  Select,
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

import axios from "axios";
import {
  addAds,
  deleteAds,
  getAllAds,
  updateAds,
  viewAds,
} from "../../../Apii/modules/AdminAds";
import { getAllRooms } from "../../../Apii/modules/AdminRooms";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import DeleteConfirmations from "../../Shared/DeleteConfirmations/DeleteConfirmations";
import ViewADS, { type AdData } from "../../Shared/ViewModals/viewADS";

const paginationModel = { page: 0, pageSize: 5 };
interface Room {
  _id: string;
  discount: number;
  roomNumber: string;
  price: number;
  capacity: number;
}
interface Ad {
  _id: string;
  room: Room;
  discount: number;
  isActive: boolean;
  roomNumber: string;
  price: number;
  capacity: number;
}
export default function ADS() {
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [adRoomId, setAdRoomId] = React.useState("");
  const [adDiscount, setAdDiscount] = React.useState<number>(0);

  const [rowsData, setRowsData] = React.useState<Ad[]>([]);
  const [selectedAd, setSelectedAd] = React.useState<Ad | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewAd, setViewAd] = React.useState<Ad | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = React.useState<Ad | null>(null);
  const openMenu = Boolean(anchorEl);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [adIsActive, setAdIsActive] = React.useState(true);

  const [allRooms, setAllRooms] = React.useState<Room[]>([]);

  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      setAllRooms(response?.data?.data?.rooms || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getAllAds();

      const adsList = response?.data?.data?.ads || [];
      setRowsData(adsList);
    } catch (error) {
      console.error("Error fetching ads data:", error);
    }
  };

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setSelectedId("");
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteAds(+selectedId);
      toast.success("Ad deleted successfully!");
      handleCloseDelete();
      fetchData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err?.response?.data?.message || "Failed to delete this ad!";
        toast.error(errorMessage);
      }
    }
  };

  const handleOpenAdd = () => {
    setSelectedAd(null);
    setAdRoomId("");
    setAdDiscount(0);
    setOpenModal(true);
  };

  const handleOpenEdit = (row: Ad) => {
    setSelectedAd(row);
    setAdRoomId(row.room?._id);
    setAdDiscount(row.room?.discount ?? row.discount);
    setAdIsActive(row.isActive ?? true);
    setOpenModal(true);
  };

  const handleOpenView = async (row: Ad) => {
    try {
      const response = await viewAds(+row._id);

      setViewAd(response?.data?.data || row);
      setOpenViewModal(true);
    } catch {
      setViewAd(row);
      setOpenViewModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setAdRoomId("");
    setAdDiscount(0);
    setSelectedAd(null);
  };

  const handleSaveAd = async () => {
    if (!adRoomId) {
      toast.error("Please select a room");
      return;
    }

    const bodyData = {
      room: adRoomId,
      discount: Number(adDiscount) || 0,
      isActive: adIsActive,
    };
    const bodyEditeData = {
      discount: Number(adDiscount) || 0,
      isActive: adIsActive,
    };

    try {
      if (selectedAd) {
        await updateAds(selectedAd._id, bodyEditeData);
        toast.success("Ad updated successfully!");
      } else {
        await addAds(bodyData);
        toast.success("Ad created successfully!");
      }
      handleCloseModal();
      fetchData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Failed to save!");
      }
    }
  };

  React.useEffect(() => {
    (() => {
      fetchData();
      fetchRooms();
    })();
  }, []);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: Ad,
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const filteredRows = rowsData.filter((row) => {
    const roomNum = row.room?.roomNumber || row.roomNumber || "";
    return roomNum.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const columns: GridColDef[] = [
    {
      field: "roomNumber",
      headerName: "Room Number",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueGetter: (row: Ad) => row.room?.roomNumber || row.roomNumber || "N/A",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueGetter: (row: Ad) => row.room?.price ?? row.price ?? null,
      valueFormatter: (value) =>
        value != null ? `$${Number(value).toLocaleString()}` : "N/A",
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueGetter: (row: Ad) => row.room?.discount ?? row.discount ?? 0,
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
      valueGetter: (row: Ad) => row.room?.capacity ?? row.capacity ?? null,
      valueFormatter: (value) => (value != null ? `${value} Guests` : "N/A"),
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueGetter: (row: Ad) => row.isActive,
      renderCell: (params) => (
        <span
          style={{
            color: params.value ? "#10B981" : "#EF4444",
            fontWeight: "600",
            backgroundColor: params.value ? "#E6F4EA" : "#FCE8E6",
            padding: "4px 12px",
            borderRadius: "6px",
          }}
        >
          {params.value ? "Yes" : "No"}
        </span>
      ),
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
          <IconButton
            onClick={(e) => handleClickMenu(e, params.row)}
            sx={{ color: "#6B7280" }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <CustomHeader
        title="Ads Table Details"
        subTitle="You can check all details"
        buttonText="Add New Ad"
        onButtonClick={handleOpenAdd}
      />

      <Box
        sx={{ width: { xs: "90%", sm: "90%", md: "85%" }, mx: "auto", mt: 3 }}
      >
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            placeholder="Search by Room Number..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "320px", md: "100%" },
              backgroundColor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
        </Box>

        {/* Desktop DataGrid View */}
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
                "&:nth-of-type(even)": {
                  backgroundColor: "rgba(248, 249, 251, 1)",
                },
                "&:nth-of-type(odd)": { backgroundColor: "#fff" },
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#F3F4F6 !important",
              },
            }}
          />
        </Paper>

        {/* Mobile Responsive Cards View */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            gap: 2,
            mb: 3,
          }}
        >
          {filteredRows.length > 0 ? (
            filteredRows.map((row: Ad) => {
              const roomNumber =
                row.room?.roomNumber || row.roomNumber || "N/A";
              const price = row.room?.price ?? row.price;
              const discount = row.room?.discount ?? row.discount;

              return (
                <Card
                  key={row._id}
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "700", color: "#1F2937" }}
                      >
                        Room: {roomNumber}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleClickMenu(e, row)}
                        sx={{ color: "#6B7280" }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    </Box>

                    <Divider sx={{ my: 1, borderColor: "#F3F4F6" }} />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                          Price:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#4B5563", fontWeight: "600" }}
                        >
                          {price ? `$${price}` : "N/A"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                          Discount:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#4B5563" }}>
                          {discount ? `${discount}%` : "0%"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                          Active:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: row.isActive ? "#10B981" : "#EF4444",
                            fontWeight: "700",
                          }}
                        >
                          {row.isActive ? "Yes" : "No"}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography sx={{ textAlign: "center", color: "#9CA3AF", py: 4 }}>
              No ads found
            </Typography>
          )}
        </Box>
      </Box>

      {/* Floating Action Context Menu */}
      <Menu
        anchorEl={anchorEl}
        id="actions-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            if (activeRow) handleOpenView(activeRow);
            handleCloseMenu();
          }}
        >
          <RemoveRedEyeIcon sx={{ fontSize: 20, color: "darkblue", mx: 1 }} />{" "}
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeRow) handleOpenEdit(activeRow);
            handleCloseMenu();
          }}
        >
          <EditDocumentIcon sx={{ fontSize: 20, color: "orange", mx: 1 }} />{" "}
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (activeRow) handleOpenDelete(activeRow._id);
            handleCloseMenu();
          }}
        >
          <DeleteForeverIcon sx={{ fontSize: 20, color: "red", mx: 1 }} />{" "}
          Delete
        </MenuItem>
      </Menu>

      {/* Mutation Form Dialog for creating and modifying Ads */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {selectedAd ? "Edit Ad" : "Add New Ad"}
        </DialogTitle>
        <DialogContent>
          {/* قائمة اختيار الغرفة */}
          <FormControl fullWidth margin="dense" sx={{ mt: 1 }}>
            <InputLabel id="room-select-label">Select Room</InputLabel>
            <Select
              labelId="room-select-label"
              value={adRoomId}
              label="Select Room"
              onChange={(e) => setAdRoomId(e.target.value)}
              disabled={!!selectedAd}
            >
              {allRooms.map((room) => (
                <MenuItem key={room._id} value={room._id}>
                  {room.roomNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* حقل الخصم */}
          <TextField
            margin="dense"
            label="Discount %"
            type="number"
            fullWidth
            variant="outlined"
            value={adDiscount}
            onChange={(e) => setAdDiscount(+e.target.value)}
            sx={{ mt: 2 }}
          />

          {/* قائمة اختيار الحالة */}
          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel id="active-select-label">Active</InputLabel>
            <Select
              labelId="active-select-label"
              value={adIsActive}
              label="Active"
              onChange={(e) => setAdIsActive(e.target.value === "true")}
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAd}
            variant="contained"
            color={selectedAd ? "warning" : "primary"}
          >
            {selectedAd ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Linked Modals */}
      {viewAd && (
        <ViewADS
          open={openViewModal}
          onClose={() => setOpenViewModal(false)}
          facility={viewAd as AdData}
        />
      )}
      <DeleteConfirmations
        open={isDeleteOpen}
        onClose={handleCloseDelete}
        onDelete={handleConfirmDelete}
        title="Delete This Ad ?"
      />
    </>
  );
}
