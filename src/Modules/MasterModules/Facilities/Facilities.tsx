import { DataGrid } from "@mui/x-data-grid"; 
import type { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { addFacilities, getAllFacilities, updateFacilities } from "../../../API/modules/AdminData";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FacilityViewModal from "../../Shared/ViewModals/FacilityViewModal";

const paginationModel = { page: 0, pageSize: 5 };

export default function Facilities() {
    const [openViewModal, setOpenViewModal] = React.useState(true);
    const [openModal, setOpenModal] = React.useState(false);
    const [facilityName, setFacilityName] = React.useState("");
    const [rowsData, setRowsData] = React.useState([]);
    const [selectedFacility, setSelectedFacility] = React.useState<any>(null);

    // 1. تعريف الـ State الخاصة بنص البحث
    const [searchTerm, setSearchTerm] = React.useState("");

    const fetchData = async () => {
        try {
            const response = await getAllFacilities();
            setRowsData(response?.data?.data?.facilities || []);
        } catch (error) {
            console.log(error);
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

    const id = React.useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // 2. تصفية (Filtering) البيانات بناءً على اسم المنشأة المكتوب
    const filteredRows = rowsData.filter((row: any) =>
        row.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: GridColDef[] = [
        { field: "_id", headerName: "ID", width: 220, align: "center", headerAlign: "center", headerClassName: "custom-id-header" },
        { field: "name", headerName: "Facility Name", width: 210, align: "center", headerAlign: "center", headerClassName: "custom-id-header" },
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
            valueGetter: (value, row) => new Date(row.createdAt).toLocaleDateString("en-US"),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 350,
            align: "center",
            headerAlign: "center",
            headerClassName: "custom-id-header",
            renderCell: (params) => (
                <>
                    <div>
                        <Button
                            id={buttonId}
                            aria-controls={open ? menuId : undefined}
                            aria-haspopup="true"
                            aria-expanded={open}
                            onClick={handleClick}
                            sx={{
                                minWidth: "auto", 
                                padding: "6px",  
                                color: "#6B7280", 
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.04)",
                                    borderRadius: 50, 
                                }
                            }}
                        >
                            <MoreHorizIcon sx={{ fontSize: 20 }} />
                        </Button>
                        <React.Fragment >
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            borderRadius: 4,
                                            py: 0,
                                            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, py: 0 },
                                            '&::before': {
                                                content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10,
                                                bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem sx={{ py: 1 }} onClick={() => setOpenViewModal(true)}>
                                    <RemoveRedEyeIcon sx={{ fontSize: 21, color: "darkblue", mx: 1 }} /> View
                                </MenuItem>
                                <MenuItem sx={{ py: 1 }} onClick={() => handleOpenEdit(params.row)}>
                                    <EditDocumentIcon sx={{ fontSize: 22, color: "orange", mx: 1 }} /> Edit
                                </MenuItem>
                                <MenuItem sx={{ py: 1 }} onClick={handleClose}>
                                    <DeleteForeverIcon sx={{ fontSize: 22, color: "red", mx: 1 }} /> Delete
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            
            <Box sx={{ width: "75%", mx: "auto", mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <TextField
                    size="small"
                    placeholder="Search by Facility Name..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ 
                        width: "80%", 
                        backgroundColor: "#fff", 
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": { borderRadius: "8px" } 
                    }}
                />
                <Button variant="contained" color="success" onClick={handleOpenAdd} sx={{ borderRadius: "8px" }}>
                    + Add New Facility
                </Button>
            </Box>

            <Paper sx={{ width: "75%", mx: "auto", elevation: 0, boxShadow: "none", borderRadius: "16px", overflow: "hidden" }}>
                <DataGrid
                    rows={filteredRows} // 4. تمرير المصفوفة المفلترة هنا بدلاً من rowsData الأصلية
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{
                        border: 0,
                        textAlign: "center",
                        backgroundColor: "#fff",
                        "& .custom-id-header": { backgroundColor: 'inherit' },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "rgba(226, 229, 235, 1)!important",
                            color: "#1F2937", fontSize: "15px", fontWeight: "600",
                        },
                        "& .MuiDataGrid-row": {
                            borderBottom: "0px solid rgba(243, 244, 246, 1)",
                            borderTop: "0px solid rgba(243, 244, 246, 1)",
                            "&:nth-of-type(even)": {
                                borderBottom: "0px solid rgba(243, 244, 246, 1)",
                                backgroundColor: "rgba(248, 249, 251, 1)",
                            },
                            "&:nth-of-type(odd)": { backgroundColor: "#fff" },
                        },
                        "& .MuiDataGrid-row:hover": { backgroundColor: "#F3F4F6 !important" },
                    }}
                />
            </Paper>

            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="xs">
                <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {selectedFacility ? "Edit Facility" : "Add New Facility"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus margin="dense" label="Facility Name" type="text" fullWidth variant="outlined"
                        value={facilityName} onChange={(e) => setFacilityName(e.target.value)} sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleCloseModal} color="inherit">Cancel</Button>
                    <Button onClick={handleSaveFacility} variant="contained" color={selectedFacility ? "warning" : "primary"}>
                        {selectedFacility ? "Update" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
            <FacilityViewModal open={openViewModal} onClose={() => setOpenViewModal(false)} />
        </>
    );
}