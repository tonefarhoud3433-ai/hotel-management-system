import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

import { getAllUsers } from "../../../Api/modules/AdminUsers";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import ViewUser from "../../Shared/ViewModals/ViewUser";

const paginationModel = { page: 0, pageSize: 5 };

interface Row {
  userName: string;
  room: { roomNumber: string };
  status: string;
  _id: string;
  user: { userName: string };
  totalPrice: number;
  startDate: string;
  endDate: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function Users() {
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [rowsData, setRowsData] = React.useState<Row[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewBooking, setViewBooking] = React.useState<Row | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = React.useState<Row | null>(null);
  const openMenu = Boolean(anchorEl);

  const fetchData = async () => {
    try {
      const response = await getAllUsers();

      const bookingList = response?.data?.data?.users || [];
      setRowsData(bookingList);
    } catch (error) {
      console.error("Error fetching bookings data:", error);
    }
  };

  const handleOpenView = (row: Row) => {
    setViewBooking(row);
    setOpenViewModal(true);
  };

  React.useEffect(() => {
    (() => {
      fetchData();
    })();
  }, []);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: Row,
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const filteredRows = rowsData.filter((row: Row) => {
    const user = row?.userName || "";
    return user.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1.5,
      minWidth: 200,
      headerClassName: "custom-id-header",
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      minWidth: 140,
      headerClassName: "custom-id-header",
      // نصل للـ userName مباشرة من الـ row
      valueGetter: (row: { userName: string }) => row.userName || "N/A",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      minWidth: 180,
      headerClassName: "custom-id-header",
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 1,
      minWidth: 130,
      headerClassName: "custom-id-header",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.8,
      minWidth: 100,
      headerClassName: "custom-id-header",
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "admin" ? "#7C3AED" : "#0284C7",
            fontWeight: "600",
            backgroundColor: params.value === "admin" ? "#F3E8FF" : "#E0F2FE",
            padding: "4px 12px",
            borderRadius: "6px",
            textTransform: "capitalize",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      minWidth: 80,
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
        title="Users Table Details"
        subTitle="You can check and monitor all global user bookings"
      />

      <Box
        sx={{ width: { xs: "90%", sm: "90%", md: "85%" }, mx: "auto", mt: 3 }}
      >
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            placeholder="Search by  User Name..."
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
            filteredRows.map((row: Row) => {
              const roomNumber = row.room?.roomNumber || "Deleted Room";
              const clientName = row.user?.userName || "N/A";
              const isCompleted = row.status === "completed";

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
                          Client:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#4B5563", fontWeight: "600" }}
                        >
                          {clientName}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                          Total Price:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#4B5563", fontWeight: "600" }}
                        >
                          {row.totalPrice ? `$${row.totalPrice}` : "N/A"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                          Duration:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#4B5563", fontSize: "0.8rem" }}
                        >
                          {formatDate(row.startDate)} -{" "}
                          {formatDate(row.endDate)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                          Status:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isCompleted ? "#10B981" : "#D97706",
                            fontWeight: "700",
                            backgroundColor: isCompleted
                              ? "#E6F4EA"
                              : "#FEF3C7",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            textTransform: "capitalize",
                          }}
                        >
                          {row.status}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography sx={{ textAlign: "center", color: "#9CA3AF", py: 4 }}>
              No bookings found
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
      </Menu>

      {/* Linked Modals */}
      <ViewUser
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        facility={viewBooking} // تأكد أن هذه هي الحالة التي تحتوي على بيانات المستخدم المختار
      />
    </>
  );
}
