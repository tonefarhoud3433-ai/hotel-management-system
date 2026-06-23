import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { changePasswordSchema } from "../YupValidation/YupValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import {
  apichangePassword,
  type ChangePasswordData,
} from "../../../API/modules/Auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { User } from "../../../Contexts/AuthContext";
import axios from "axios";

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navegate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(changePasswordSchema),
  });
  const [loading, setLoading] = useState(false);
  const textFieldStyle = {
    "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "8px 14px",
    },
    "& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "8px 14px",
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

  const onSubmit = async (data: ChangePasswordData) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await apichangePassword(data);
      toast.success(response?.data?.message || " Change Password is Updated ");
      if (token) {
        const decoded:User = jwtDecode(token);
        if (decoded.role == "admin") {
          navegate("/dashboard");
        } else {
          navegate("/home");
        }
      }
    } catch (error) {
      if(axios.isAxiosError(error)){

        toast.error(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const password = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          {/* Header Section */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "rgba(21, 44, 91, 1)", fontWeight: "bold" }}
          >
            Change your password
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            If you wont back to home
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You can{" "}
            <Link className="customLink_register" to="/dashboard/home">
              {" "}
              Back To Home !
            </Link>
          </Typography>
        </Box>

        <Typography
          variant="subtitle2"
          sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
        >
          Password
        </Typography>
        <TextField
          fullWidth
          type={showOldPassword ? "text" : "password"}
          placeholder="Please type here ..."
          sx={textFieldStyle}
          {...register("oldPassword")}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: 2 }}>
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? (
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
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
        >
          New Password
        </Typography>
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Please type here ..."
          sx={textFieldStyle}
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
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
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
        >
          Confirm New Password
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
      </Box>
      <Button
        disableElevation
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
        size="large"
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
        Change Password
      </Button>
    </form>
  );
}
