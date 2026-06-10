import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 220,
        align: 'center',       
        headerAlign: 'center', 
    },
    {
        field: 'name',
        headerName: 'Facility Name',
        width: 200,
        align: 'center',       
        headerAlign: 'center',
    },
    {
        field: 'createdBy',
        headerName: 'Created By',
        width: 150,
        align: 'center',       
        headerAlign: 'center',
        // بنسحب الـ userName من جوة كائن الـ createdBy
        valueGetter: (value, row) => row.createdBy?.userName || 'N/A',
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        align: 'center',       
        headerAlign: 'center',
        // تنسيق التاريخ لشكل مقروء وسريع
        valueGetter: (value, row) => new Date(row.createdAt).toLocaleDateString('en-US'),
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 400,
        align: 'center',       
        headerAlign: 'center',
        renderCell: (params) => (

            <Stack direction="row"  spacing={2} sx={{mt:1, display: 'flex', gap: 1,justifyContent:'center',alignItems:'center',width:'100%',  }} >
                <Box sx={{ display: 'flex', gap: 1,justifyContent:'center',alignItems:'center',width:'100%'}}>

                <Button sx={{py:0.5}} variant="contained" color="primary">
                    Add
                </Button>
                <Button sx={{py:0.5}} variant="contained" color="warning">
                    Edit
                </Button>
                <Button sx={{py:0.5}} variant="contained" color="error">
                    Delete
                </Button>
                </Box>
            </Stack>
        ),


    },
];



const paginationModel = { page: 0, pageSize: 5 };

export default function Facilities() {

    const [rowsData, setRowsData] = React.useState([]);
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('https://upskilling-egypt.com:3000/api/v0/admin/room-facilities', {
                method: 'GET',
                headers: {
                    // 2. تمرير التوكن في الـ Authorization Header
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
            if (result?.data?.facilities) {
                setRowsData(result.data.facilities);
            }

        } catch (error) {

        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);
    return (
        <Paper sx={{ height: 400, width: '80%', mx: 'auto',textAlign:'center' }}>
            <DataGrid
                rows={rowsData}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
                sx={{ border: 0, textAlign:'center', '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(248, 249, 251, 1)', }, }}
            />
        </Paper>
    );
}
