import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import bgImg1 from "../../assets/Images/Auth/authbg1.png";

export default function AuthLayout() {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      {/* Form Section */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            p:6,
            pl: 4,
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
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={bgImg1}
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
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Login
            </Typography>

            <Typography variant="body1">Homes as unique as you.</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
