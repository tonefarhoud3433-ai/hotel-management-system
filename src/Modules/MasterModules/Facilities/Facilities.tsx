import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const paginationModel = { page: 0, pageSize: 5 };

export default function Facilities() {
  const [openModal, setOpenModal] = React.useState(false);
  const [facilityName, setFacilityName] = React.useState("");
  const [rowsData, setRowsData] = React.useState([]);

  // الحالة دي هتشيل الـ row الحالي لو بنعمل Edit، وهتكون null لو بنعمل Add
  const [selectedFacility, setSelectedFacility] = React.useState<any>(null);

  // دالة جلب البيانات من الـ API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities",
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const result = await response.json();
      if (result?.data?.facilities) {
        setRowsData(result.data.facilities);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // دالة لفتح المودال في وضع الـ Add
  const handleOpenAdd = () => {
    setSelectedFacility(null);
    setFacilityName("");
    setOpenModal(true);
  };

  // دالة لفتح المودال في وضع الـ Edit وجلب البيانات القديمة فيه
  const handleOpenEdit = (row: any) => {
    setSelectedFacility(row);
    setFacilityName(row.name); // كتابة الاسم القديم في الـ Input تلقائياً
    setOpenModal(true);
  };

  // دالة الإغلاق وتصفير الداتا
  const handleCloseModal = () => {
    setOpenModal(false);
    setFacilityName("");
    setSelectedFacility(null);
  };

  // دالة الحفظ الموحدة (تشمل Add و Edit)
  const handleSaveFacility = async () => {
    if (!facilityName.trim()) return;

    const token = localStorage.getItem("token");

    // تحديد هل العملية Add أم Edit بناءً على وجود selectedFacility
    const isEdit = !!selectedFacility;
    const url = isEdit
      ? `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${selectedFacility._id}` // رابط التعديل بالـ ID
      : "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities"; // رابط الإضافة

    const method = isEdit ? "PUT" : "POST"; // لو الـ API بيقبل PATCH غيرها لـ PATCH

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: facilityName }),
      });

      if (response.ok) {
        handleCloseModal();
        fetchData(); // تحديث الجدول تلقائياً
      } else {
        console.error(`Failed to ${isEdit ? "update" : "save"} facility`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "saving"} facility:`, error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Facility Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 150,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => row.createdBy?.userName || "N/A",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) =>
        new Date(row.createdAt).toLocaleDateString("en-US"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 1,
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* زرار الـ Add هنا لسه موجود بس الأفضل تخليه برة الجدول (مثلاً فوق الجدول) */}
            <Button
              sx={{ py: 0.5 }}
              variant="contained"
              color="primary"
              onClick={handleOpenAdd}
            >
              Add
            </Button>

            {/* زرار الـ Edit بيبصت الـ row الحالي للدالة */}
            <Button
              sx={{ py: 0.5 }}
              variant="contained"
              color="warning"
              onClick={() => handleOpenEdit(params.row)}
            >
              Edit
            </Button>
            <Button sx={{ py: 0.5 }} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </Stack>
      ),
    },
  ];

  return (
    <>
      {/* نصيحة: يفضل تضع زرار "Add New Facility" هنا فوق الجدول بدلاً من تكراره داخل كل صف */}
      <Box sx={{ width: "80%", mx: "auto", mb: 2, textAlign: "right" }}>
        <Button variant="contained" color="success" onClick={handleOpenAdd}>
          + Add New Facility
        </Button>
      </Box>

      <Paper
        sx={{ height: 400, width: "80%", mx: "auto", textAlign: "center" }}
      >
        <DataGrid
          rows={rowsData}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            textAlign: "center",
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(248, 249, 251, 1)",
            },
          }}
        />
      </Paper>

      {/* نافذة الـ Dialog الموحدة */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {/* تغيير العنوان ديناميكياً */}
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
            color={selectedFacility ? "warning" : "primary"} // تغيير اللون حسب الوضعية
          >
            {/* تغيير اسم الزرار ديناميكياً */}
            {selectedFacility ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
