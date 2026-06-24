import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: "250px", md: "450px" },
          height: { xs: "250px", md: "450px" },
          top: "-10%",
          left: "-5%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0) 70%)",
          filter: "blur(50px)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: "300px", md: "500px" },
          height: { xs: "300px", md: "500px" },
          bottom: "-10%",
          right: "-5%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          px: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            padding: { xs: 4, md: 6 },
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "6rem", md: "8rem" },
              lineHeight: 1,
              background: "linear-gradient(45deg, #0284c7, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-2px",
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Lost in Space?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              mb: 4,
              maxWidth: "400px",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            The page you are looking for doesn't exist or has been moved to
            another URL.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.8,
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              background: "linear-gradient(45deg, #0f172a, #1e293b)",
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #1e293b, #334155)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.4)",
              },
            }}
          >
            go Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
