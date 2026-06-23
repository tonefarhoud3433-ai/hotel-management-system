import { yupResolver } from "@hookform/resolvers/yup";
// MUI Components (Direct Imports)
import CancelIcon from "@mui/icons-material/Cancel";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// MUI Icons (Direct Imports)
import { CheckCircle } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../../../API/modules/Auth";
import {
  type RegisterFormData,
  registerSchema,
} from "../YupValidation/YupValidation";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data, e) => {
    e?.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");

    const profileFile = fileInputRef.current?.files?.[0];
    if (profileFile) {
      formData.append("profileImage", profileFile);
    }

    try {
      const response = await apiRegister(formData);
      toast.success(response?.data?.message || "registration is successfully");
      setPreviewImage(undefined);
      if (fileInputRef.current) fileInputRef.current.value = "";
      reset();

      navigate("/auth/login");
    } catch (error: any) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || " Registration Error:");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPreviewImage(undefined);
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const textFieldStyle = {
    "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "10px 14px",
    },
    "& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "10px 14px",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(245, 246, 248, 1)",
      borderRadius: "6px",
      "& fieldset": {
        borderColor: "#e2e8f0",
        borderWidth: "0px",
      },
      "&:hover fieldset": {
        borderColor: "#cbd5e1",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(21, 44, 91, 1)",
        borderWidth: "2px",
      },
    },
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", mx: "auto", fontFamily: "sans-serif" }}
    >
      {/* Header Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "rgba(21, 44, 91, 1)", fontWeight: "bold" }}
      >
        Sign up
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        If you already have an account register
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        You can{" "}
        <Link className="customLink" to="/auth/login">
          Login here !
        </Link>
      </Typography>

      {/* parent Grid */}
      <Grid container spacing={2}>
        {/* --- تم إضافة جزء رفع ومعاينة الصورة هنا --- */}
        <Grid
          size={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{}}
        >
          <Box
            position="relative"
            onClick={handleImageClick}
            sx={{
              cursor: "pointer",
              width: "fit-content",
              borderRadius: "50%",
              mx: "auto",
            }}
          >
            <Avatar
              src={previewImage}
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                border: "2px dashed rgba(21, 44, 91, 0.4)",
                backgroundColor: "rgba(245, 246, 248, 1)",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <AddAPhotoIcon
                sx={{ color: "rgba(21, 44, 91, 0.6)", fontSize: 32 }}
              />
            </Avatar>
          </Box>
          {previewImage && (
            <IconButton
              onClick={handleCancel}
              aria-label="cancel"
              sx={{
                position: "relative",
                bottom: 110,
                left: { md: "64%", xs: "68%" },
                color: "rgba(235, 81, 72, 1)",
                "&:hover": { color: "rgba(200, 50, 45, 1)" },
              }}
            >
              <CancelIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "rgba(21, 44, 91, 1)", fontWeight: 500 }}
            >
              Upload Profile Image
            </Typography>
            {/* Input مخفي يتم تفعيله عبر الـ Ref عند الضغط على الـ Avatar */}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              {...register("profileImage", {
                onChange: handleImageChange, // نضع دالة الـ change هنا لتعمل بالتوازي مع react-hook-form
              })}
              ref={(e) => {
                register("profileImage").ref(e); // نربط الـ ref بـ react-hook-form
                fileInputRef.current = e; // ونربطه أيضاً بالـ useRef الخاص بك لتشغيل الـ click
              }}
            />

            {/* عرض رسالة الخطأ الخاصة بـ Yup إن وجدت */}
            {errors.profileImage && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, display: "block" }}
              >
                {errors.profileImage.message}
              </Typography>
            )}
          </Box>
        </Grid>
        {/* ------------------------------------------- */}

        {/* User Name */}
        <Grid size={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
          >
            User Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Please type here ..."
            variant="outlined"
            sx={textFieldStyle}
            {...register("userName")}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
        </Grid>

        {/* Phone Number */}
        <Grid size={6}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
          >
            Phone Number
          </Typography>
          <TextField
            fullWidth
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>

        {/* Country */}
        <Grid size={6}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
          >
            Country
          </Typography>
          <TextField
            fullWidth
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register("country")}
            error={!!errors.country}
            helperText={errors.country?.message}
          />
        </Grid>

        {/* Email Address */}
        <Grid size={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
          >
            Email Address
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        {/* Password */}
        <Grid size={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 2 }}>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#a0aec0" }} />
                      ) : (
                        <Visibility sx={{ color: "#a0aec0" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        {/* Confirm Password */}
        <Grid size={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Please type here ..."
            sx={textFieldStyle}
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 2 }}>
                    {!!confirmPassword && password === confirmPassword && (
                      <CheckCircle sx={{ color: "green" }} />
                    )}
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff sx={{ color: "#a0aec0" }} />
                      ) : (
                        <Visibility sx={{ color: "#a0aec0" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        {/* Submit Action Container */}
        <Grid size={12} sx={{ mt: 1 }}>
          <Button
            disableElevation
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading} // تم تعطيل الزر أثناء التحميل لمنع تكرار الـ Submit
            sx={{
              backgroundColor: "#3b5bdb",
              py: 1,
              textTransform: "none",
              fontSize: "17px",
              fontWeight: "500",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(59, 91, 219, 0.2)",
              "&:hover": {
                backgroundColor: "#2d46b3",
                boxShadow: "0 6px 16px rgba(59, 91, 219, 0.3)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign up"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
