import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {Link} from "react-router-dom";
import {
  forgetSchema,
  type ForgetSchema,
} from "../YupValidation/YupValidation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgetSchema>({
    resolver: yupResolver(forgetSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgetSchema> = async (data, e) => {
    e?.preventDefault();
    setLoading(true);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/users/forgot-password",
        data,
      );
      console.log(response?.data?.message);
      toast.success(
        response?.data?.message || "Password reset link sent successfully",
      );
      reset();

      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error.response?.data?.message || " Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

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
    <>
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
          Forgot password{" "}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          If you already have an account register
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You can{" "}
          <Link
          to='/login'
          >
            Login here !
          </Link>
        </Typography>

        {/* parent Grid  */}
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

          {/* Action Button */}
          <Grid size={12} sx={{ mt: 1 }}>
            <Button
              disableElevation
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
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
                "Send mail"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
