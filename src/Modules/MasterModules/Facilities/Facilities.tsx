import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  addFacilities,
  getAllFacilities,
  updateFacilities,
} from "../../../API/modules/AdminData";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import FacilityViewModal, {
  type Facility,
} from "../../Shared/ViewModals/FacilityViewModal";
import { AdminData } from "../../../API";
import DeleteConfirmations from "../../Shared/DeleteConfirmations/DeleteConfirmations";
import { toast } from "react-toastify";
import { number } from "yup";

const paginationModel = { page: 0, pageSize: 5 };

export default function Facilities() {
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [facilityName, setFacilityName] = React.useState("");
  const [rowsData, setRowsData] = React.useState([]);
  const [selectedFacility, setSelectedFacility] = React.useState<any>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewFacility, setViewFacility] = React.useState<Facility | null>(null);

  // إدارة حالة الـ Menu (الأكشنز)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = React.useState<any>(null);
  const openMenu = Boolean(anchorEl);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null); // تم توحيدها لـ string

  const fetchData = async () => {
    try {
      const response = await getAllFacilities();
      setRowsData(response?.data?.data?.facilities || []);
    } catch (error) {
      console.log(error);
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
      await AdminData.deleteFacilities(selectedId);
      toast.success("Deleted successfully!");
      handleCloseDelete();
      fetchData();
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Failed to delete this facility!";
      toast.error(errorMessage);
    }
  };

  const handleOpenAdd = () => {
    setSelectedFacility(null);
    setFacilityName("");
    setOpenModal(true);
  };

  const handleOpenEdit = (row: any) => {
    setSelectedFacility(row);
    setFacilityName(row.name);
    setOpenModal(true);
  };

  const handleOpenView = (row: any) => {
    setViewFacility(row);
    setOpenViewModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFacilityName("");
    setSelectedFacility(null);
  };

  const handleSaveFacility = async () => {
    if (!facilityName.trim()) return;
    const isEdit = !!selectedFacility;
    try {
      if (isEdit) {
        await updateFacilities(selectedFacility._id, { name: facilityName });
      } else {
        await addFacilities({ name: facilityName });
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

  const handleClickMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any,
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const filteredRows = rowsData.filter((row: any) =>
    row.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
    },
    {
      field: "name",
      headerName: "Facility Name",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueGetter: (value, row) => row.createdBy?.userName || "N/A",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 130,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-id-header",
      valueGetter: (value, row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString("en-US")
          : "N/A",
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
        title="Facilities Table Details"
        subTitle="You can check all details"
        buttonText="Add New Facility"
        onButtonClick={handleOpenAdd}
      />

      <Box
        sx={{ width: { xs: "90%", sm: "90%", md: "85%" }, mx: "auto", mt: 3 }}
      >
        {/* شريط البحث */}
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            placeholder="Search by Facility Name..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "320px",md:'100%' },
              backgroundColor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
        </Box>

        {/* 1. عرض الجدول الافتراضي للشاشات المتوسطة والكبيرة */}
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

        {/* 2. عرض البيانات كـ Cards للموبايل */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            gap: 2,
            mb: { xs: 3 },
          }}
        >
          {filteredRows.length > 0 ? (
            filteredRows.map((row: any) => (
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
                      {row.name}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                        ID:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4B5563",
                          maxWidth: "180px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row._id}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                        Created By:
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#4B5563" }}>
                        {row.createdBy?.userName || "N/A"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                        Created At:
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#4B5563" }}>
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleDateString("en-US")
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", color: "#9CA3AF", py: 4 }}>
              No facilities found
            </Typography>
          )}
        </Box>
      </Box>

      {/* قائمة الأكشنز المشتركة */}
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
          <RemoveRedEyeIcon sx={{ fontSize: 20, color: "darkblue", mx: 1 }} />{" "}
          View
        </MenuItem>

        <MenuItem
          sx={{ py: 1 }}
          onClick={() => {
            if (activeRow) handleOpenEdit(activeRow);
            handleCloseMenu();
          }}
        >
          <EditDocumentIcon sx={{ fontSize: 20, color: "orange", mx: 1 }} />{" "}
          Edit
        </MenuItem>

        <MenuItem
          sx={{ py: 1 }}
          onClick={() => {
            if (activeRow) handleOpenDelete(activeRow._id);
            handleCloseMenu();
          }}
        >
          <DeleteForeverIcon sx={{ fontSize: 20, color: "red", mx: 1 }} />{" "}
          Delete
        </MenuItem>
      </Menu>

      {/* نافذة الإضافة والتعديل */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {selectedFacility ? "Edit Facility" : "Add New Facility"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Facility Name"
            type="text"
            fullWidth
            variant="outlined"
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveFacility}
            variant="contained"
            color={selectedFacility ? "warning" : "primary"}
          >
            {selectedFacility ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <FacilityViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        facility={viewFacility}
      />

      <DeleteConfirmations
        open={isDeleteOpen}
        onClose={handleCloseDelete}
        onDelete={handleConfirmDelete}
        title="Delete This Facility ?"
      />
    </>
  );
}
