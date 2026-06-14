import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import { viewRoom, addRoom, updateRoom } from "../../../API/modules/AdminRooms";
import { getAllFacilities } from "../../../API/modules/AdminData";

export default function RoomData() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEdit = Boolean(id && id !== "NaN");

  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [discount, setDiscount] = useState("");

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [availableFacilities, setAvailableFacilities] = useState<any[]>([]);

  // imageFiles ستحتوي دائماً على ملفات حقيقية (القديمة المرفوعة مسبقاً + الجديدة)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  // دالة مساعدة لتحويل الروابط الخارجية لملفات حقيقية ليرضى عنها الـ Backend
  const convertUrlToFile = async (url: string): Promise<File | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      // استخراج اسم الملف من الرابط أو وضع اسم افتراضي
      const filename = url.split("/").pop() || "existing-image.jpg";
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error("Error converting URL to File:", error);
      return null;
    }
  };

  // 1. جلب المرافق
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await getAllFacilities();
        setAvailableFacilities(
          response?.data?.data?.facilities || response?.data || [],
        );
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    fetchFacilities();
  }, []);

  // 2. جلب بيانات الغرفة وتحويل الصور القديمة إلى Files
  useEffect(() => {
    if (isEdit && id) {
      const getRoomDetails = async () => {
        setFetchingData(true);
        try {
          const response = await viewRoom(id);
          const roomData =
            response?.data?.data?.room ||
            response?.data?.room ||
            response?.data;

          if (roomData) {
            setRoomNumber(roomData.roomNumber || "");
            setPrice(roomData.price?.toString() || "");
            setCapacity(roomData.capacity?.toString() || "");
            setDiscount(roomData.discount?.toString() || "0");

            if (roomData.facilities) {
              const facilityIds = roomData.facilities.map((f: any) =>
                typeof f === "object" ? f._id : f,
              );
              setSelectedFacilities(facilityIds);
            }

            // معالجة الصور وتحويلها
            let incomingImages: string[] = [];
            if (roomData.images && Array.isArray(roomData.images)) {
              incomingImages = roomData.images;
            } else if (roomData.images) {
              incomingImages = [roomData.images];
            }

            setImagePreviews(incomingImages);

            // تحويل الروابط إلى كائنات File حقيقية ووضعها في الـ State
            const filePromises = incomingImages.map((url) =>
              convertUrlToFile(url),
            );
            const files = await Promise.all(filePromises);
            const validFiles = files.filter(
              (file): file is File => file !== null,
            );

            setImageFiles(validFiles);
          }
        } catch (error) {
          console.error("Error fetching room details:", error);
          toast.error("Failed to load room data");
        } finally {
          setFetchingData(false);
        }
      };
      getRoomDetails();
    }
  }, [id, isEdit]);

  // معالجة الملفات المضافة يدوياً أو بالسحب والإفلات
  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (validFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    setImageFiles((prev) => [...prev, ...validFiles]);

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFacilityChange = (event: any) => {
    const { value } = event.target;
    setSelectedFacilities(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber.toString().trim()) {
      toast.error("Please enter a valid Room Number");
      return;
    }
    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomNumber", roomNumber);
      formData.append("price", price);
      formData.append("capacity", capacity);
      formData.append("discount", discount);

      selectedFacilities.forEach((facilityId) => {
        formData.append("facilities", facilityId);
      });

      // هنا نرسل كل الصور الموجودة في الـ Array كـ ملفات حقيقية دائمًا
      imageFiles.forEach((file) => {
        formData.append("imgs", file);
      });

      if (isEdit && id) {
        await updateRoom(id, formData);
        toast.success("Room updated successfully!");
      } else {
        await addRoom(formData);
        toast.success("Room created successfully!");
      }
      navigate("/dashboard/rooms");
    } catch (error: any) {
      console.error("Error saving room:", error);
      const errorMessage =
        error?.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const textFieldStyle = {
    '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '10px 14px'
    },
    '& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '10px 14px'
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(245, 246, 248, 1)',
      borderRadius: '6px',
      '& fieldset': {
        borderColor: '#e2e8f0',
        borderWidth: '0px',
      },
      '&:hover fieldset': {
        borderColor: '#cbd5e1',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(21, 44, 91, 1)',
        borderWidth: '2px'
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt:2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/dashboard/rooms")}
        sx={{ mb: 2, color: "#4B5563", textTransform: "none" }}
      >
        Back to Rooms
      </Button>

      <Paper
        elevation={0}
        sx={{ px:4,py:2 , borderRadius: "16px", border: "1px solid #F3F4F6" }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 4, color: "#1F2937" }}
        >
          {isEdit ? "Edit Room Details" : "Create New Room"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Input Fields */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Room Number"
                fullWidth
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                sx={textFieldStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} >
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={textFieldStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Capacity"
                type="number"
                fullWidth
                variant="outlined"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                sx={textFieldStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Discount"
                type="number"
                fullWidth
                variant="outlined"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                sx={textFieldStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth sx={{ backgroundColor: "#F9FAFB" }}>
                <InputLabel id="facilities-select-label">Facilities</InputLabel>
                <Select
                  labelId="facilities-select-label"
                  id="facilities-select"
                  multiple
                  value={selectedFacilities}
                  onChange={handleFacilityChange}
                  input={
                    <OutlinedInput
                      label="Facilities"
                      sx={{ borderRadius: "8px" }}
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const facilityObj = availableFacilities.find(
                          (f) => f._id === value,
                        );
                        return (
                          <Chip
                            key={value}
                            label={facilityObj?.name || value}
                            size="small"
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {availableFacilities.map((facility) => (
                    <MenuItem key={facility._id} value={facility._id}>
                      {facility.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Drag & Drop Area */}
            <Grid size={{ xs: 12 }}>
              <Box
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                sx={{
                  height: "150px",
                  border: isDragActive
                    ? "2px dashed #2196F3"
                    : "2px dashed #4caf50",
                  borderRadius: "12px",
                  backgroundColor: isDragActive ? "#e3f2fd" : "#e8f5e9",
                  color: isDragActive ? "#0d47a1" : "#2e7d32",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: isDragActive ? "#e3f2fd" : "#c8e6c9",
                  },
                }}
                component="label"
              >
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <CloudUploadIcon sx={{ fontSize: "2.5rem" }} />
                <Typography sx={{ fontWeight: "600", textAlign: "center", width: { md: '100%', sm: '80%' }, fontSize: { md: '18px' } }}>
                  Drag & Drop or{" "}
                  <span style={{ textDecoration: "underline" }}>
                    Choose Room Images
                  </span>{" "}
                  to Upload
                </Typography>
              </Box>

              {/* Previews Gallery */}
              {imagePreviews.length > 0 && (
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {imagePreviews.map((preview, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #E5E7EB",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeImage(index)}
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          color: "#EF4444",
                          backgroundColor: "#FFF",
                          "&:hover": { backgroundColor: "#FEE2E2" },
                        }}
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>

          <Grid container
            direction="row"
            spacing={1}
            sx={{
              my:2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Grid  >

              <Button
                onClick={() => navigate("/dashboard/rooms")}
                variant="outlined"
                color="inherit"
                sx={{ px: 4, borderRadius: "8px", textTransform: "none" }}
              >
                Cancel
              </Button>
            </Grid>

            <Grid >
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  px: 4,
                  borderRadius: "8px",
                  textTransform: "none",
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                }}
              >
                {loading ? "Saving..." : isEdit ? "Update Room" : "Save Room"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
