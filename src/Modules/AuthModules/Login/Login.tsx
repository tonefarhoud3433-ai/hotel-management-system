import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../YupValidation/YupValidation";
import { apiLogin } from "../../../Api/modules/Auth";
import { AuthContext } from "../../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { saveUserData } = useContext(AuthContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const textFieldStyle = {
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

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      const response = await apiLogin(data);
      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        saveUserData();
        toast.success(response?.data?.message || "Login successful!");
        const decoded: { role: string } = jwtDecode(token);

        if (decoded.role == "user") {
          if (state?.curunteLocation) {
            navigate(`/home/${state?.curunteLocation}`);
          } else {
            navigate("/home");
          }
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid token received from server.");
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        toast.error(error?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "rgba(21, 44, 91, 1)", fontWeight: "bold" }}
        >
          Sign in
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          If you don’t have an account register
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You can{" "}
          <Link className="customLink_register" to="/auth/register">
            Register here !
          </Link>
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
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
      </Box>

      <Box sx={{ mb: 1 }}>
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
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Link
          to="/auth/forget-password"
          style={{
            color: "#3b5bdb",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Forgot password?
        </Link>
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
        Login
      </Button>
    </form>
  );
}
