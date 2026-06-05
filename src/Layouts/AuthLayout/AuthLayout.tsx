import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation } from "react-router-dom";
import bgImg1 from "../../assets/Images/Auth/authbg1.png";
import bgImg2 from "../../assets/Images/Auth/authbg2.png";
import bgImg3 from "../../assets/Images/Auth/authbg3.png";

export default function AuthLayout() {
  const { pathname } = useLocation();

  const getBgClass = () => {
    if (pathname === "/register" || pathname === "/verify") return bgImg2;
    if (pathname === "/forget-password" || pathname === "/reset-password")
      return bgImg1;
    if (
      pathname === "/login" ||
      pathname === "/" ||
      pathname === "/change-password"
    )
      return bgImg3;
  };

  const getTitle = () => {
    if (pathname === "/register") return "Sign up to Roamhome";
    if (pathname === "/login") return "Sign in to Roamhome";
    if (pathname === "/") return "Sign in to Roamhome";
    if (pathname === "/forget-password") return "Forgot password";
    if (pathname === "/reset-password") return "Reset Password";
    if (pathname === "/verify") return "Verify your email";
    if (pathname === "/change-password") return "Change your password";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2, md: 3 },
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
      }}
    >
      {/* logo */}
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#3b5bdb",
            fontFamily: "sans-serif",
          }}
        >
          Stay
          <Box component="span" sx={{ color: "rgba(21, 44, 91, 1)" }}>
            cation.
          </Box>
        </Typography>
      </Box>

      {/* Parent Grid  */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          flexGrow: 1,
          height: "calc(100% - 25px)",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Form Section */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            maxHeight: "100%",
            p: { xs: 1, md: "12px" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 500,
              mx: "auto",
              px: { xs: 1, md: 3 },
              maxHeight: "100%",
              overflowY: "auto",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: "4px",
                maxHeight: "20px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "4px",
              },
            }}
          >
            <Outlet />
          </Box>
        </Grid>

        {/* Image Section */}
        <Grid
          size={{ xs: 0, md: 6 }}
          sx={{
            display: { xs: "none", md: "block" },
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
            }}
          >
            <Box
              component="img"
              src={getBgClass()}
              alt="Background"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                left: 40,
                color: "#fff",
                zIndex: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {getTitle()}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Homes as unique as you.
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                zIndex: 1,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
