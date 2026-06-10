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
import { addFacilities, getAllFacilities, updateFacilities } from "../../../API/modules/AdminData";

const paginationModel = { page: 0, pageSize: 5 };

export default function Facilities() {
    const [openModal, setOpenModal] = React.useState(false);
    const [facilityName, setFacilityName] = React.useState("");
    const [rowsData, setRowsData] = React.useState([]);

    const [selectedFacility, setSelectedFacility] = React.useState<any>(null);


    const fetchData = async () => {
        try {
            const response = await getAllFacilities();

            setRowsData(response?.data?.data?.facilities)
        } catch (error) {
            console.log(error)
        }
    }

    // modal Add 
    const handleOpenAdd = () => {
        setSelectedFacility(null);
        setFacilityName("");
        setOpenModal(true);
    };

    // modal Edit 
    const handleOpenEdit = (row: any) => {
        setSelectedFacility(row);
        setFacilityName(row.name);
        setOpenModal(true);
    };

    // close modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setFacilityName("");
        setSelectedFacility(null);
    };


    const handleSaveFacility = async () => {
        if (!facilityName.trim()) return;
        const isEdit = !!selectedFacility;
        try {
            let response;
            if (isEdit) {
                response = await updateFacilities(selectedFacility._id, { name: facilityName });
            } else {
                response = await addFacilities({ name: facilityName });
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

    const columns: GridColDef[] = [
        {
            field: "_id",
            headerName: "ID",
            width: 220,
            align: "center",
            headerAlign: "center",
            headerClassName: "custom-id-header"

        },
        {
            field: "name",
            headerName: "Facility Name",
            width: 210,
            align: "center",
            headerAlign: "center",
            headerClassName: "custom-id-header"
        },
        {
            field: "createdBy",
            headerName: "Created By",
            width: 150,
            align: "center",
            headerAlign: "center",
            headerClassName: "custom-id-header",
            valueGetter: (value, row) => row.createdBy?.userName || "N/A",
        },
        {
            field: "createdAt",
            headerName: "Created At",
            width: 220,
            align: "center",
            headerAlign: "center",
            headerClassName: "custom-id-header",
            valueGetter: (value, row) =>
                new Date(row.createdAt).toLocaleDateString("en-US"),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 350,
            align: "center",
            headerAlign: "center",
            headerClassName: "custom-id-header",
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
                        headerClassName: "custom-id-header"
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
                        <Button
                            sx={{ py: 0.5 }}
                            variant="contained"
                            color="primary"
                        //   onClick={handleOpenAdd}
                        >
                            View
                        </Button>

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
                sx={{
                    // height: 400,
                    width: "75%",
                    mx: "auto",
                    elevation: 0, // إلغاء الظل الافتراضي لو حابة الجدول فلات
                    boxShadow: "none",
                    // border: "1px solid rgba(224, 224, 224, 1)", // إطار خفيف خارجي حول الجدول
                    borderRadius: "16px", // زوايا دائرية ناعمة للجدول بالكامل كالصورة
                    overflow: "hidden"
                }}
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
                        backgroundColor: "#fff",
                        " & .custom-id-header":{
                            backgroundColor:'inherit'

                        },


                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "rgba(226, 229, 235, 1)!important",
                            color: "#1F2937",
                            fontSize: "15px",
                            fontWeight: "600",
                        },


                        "& .MuiDataGrid-row": {
                            borderBottom: "0px solid rgba(243, 244, 246, 1)", // خط فاصل خفيف جداً بين الصفوف
                            borderTop: "0px solid rgba(243, 244, 246, 1)", // خط فاصل خفيف جداً بين الصفوف

                            "&:nth-of-type(even)": {
                            borderBottom: "0px solid rgba(243, 244, 246, 1)", // خط فاصل خفيف جداً بين الصفوف
                                backgroundColor: "rgba(248, 249, 251, 1)",
                            },

                            "&:nth-of-type(odd)": {
                                backgroundColor: "#fff",
                            },
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#F3F4F6 !important",
                        },

                        // "& .MuiDataGrid-cell": {
                        //     borderBottom: "1px solid rgba(243, 244, 246, 1)",
                        //     color: "#4B5563", // لون نص الصفوف
                        // },

                        // "& .MuiDataGrid-cell:focus": {
                        //     outline: "none",
                        // },
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
