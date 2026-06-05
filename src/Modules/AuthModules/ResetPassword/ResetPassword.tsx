import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ResetSchema, resetSchema } from "../YupValidation/YupValidation";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetSchema>({
    resolver: yupResolver(resetSchema),
  });

  const onSubmit: SubmitHandler<ResetSchema> = (data, e) => {
    e?.preventDefault();
    console.log("Valid Form Data:", data);
    reset();
  };

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

  return (
    <>
      {" "}
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
          Reset Password
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          If you already have an account register
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You can{" "}
          <Link
            href="/login"
            underline="none"
            sx={{ color: "rgba(235, 81, 72, 1)", fontWeight: "bold" }}
          >
            Login here !
          </Link>
        </Typography>

        {/* parent Grid */}
        <Grid container spacing={2}>
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

          {/* OTP Code */}
          <Grid size={12}>
            <Typography
              variant="subtitle2"
              sx={{ color: "rgba(21, 44, 91, 1)", mb: 1, fontWeight: 500 }}
            >
              OTP Code
            </Typography>
            <TextField
              fullWidth
              placeholder="Please type your OTP here ..."
              sx={textFieldStyle}
              {...register("code")}
              error={!!errors.code}
              helperText={errors.code?.message}
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
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
