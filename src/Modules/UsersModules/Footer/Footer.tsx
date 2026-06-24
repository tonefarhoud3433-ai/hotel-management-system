import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
// 🛠️ التعديل الجوهري هنا: استيراد الـ Grid2 الحديث لتجنب أي إيرور رندر
import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fff",
        borderTop: "1px solid #E5E5E5",
        pt: 6,
        pb: 3,
        mt: "auto", // بيضمن إن الفوتر يفضل تحت خالص لو محتوى الصفحة صغير
      }}
    >
      <Container maxWidth="xl">
        {/* شبكة الأعمدة الأساسية - باستخدام نظام Grid2 الحديث */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          {/* العمود الأول: اللوجو والـ Slogan */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#3252DF",
                fontFamily: "Poppins, sans-serif",
                mb: 1.5,
              }}
            >
              Staycation<span style={{ color: "#152C5B" }}>.</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#B0B0B0",
                fontWeight: 300,
                maxWidth: 260,
                lineHeight: 1.6,
              }}
            >
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>

          {/* العمود الثاني: For Beginners */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography
              variant="body1"
              sx={{ color: "#152C5B", fontWeight: 600, mb: 2 }}
            >
              For Beginners
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {["New Account", "Start Booking a Room", "Use Payments"].map(
                (text) => (
                  <MuiLink
                    key={text}
                    href="#"
                    underline="none"
                    sx={{
                      color: "#B0B0B0",
                      "&:hover": { color: "#3252DF" },
                      transition: "0.2s",
                      fontSize: "15px",
                    }}
                  >
                    {text}
                  </MuiLink>
                ),
              )}
            </Box>
          </Grid>

          {/* العمود الثالث: Explore Us */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography
              variant="body1"
              sx={{ color: "#152C5B", fontWeight: 600, mb: 2 }}
            >
              Explore Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {["Our Careers", "Privacy", "Terms & Conditions"].map((text) => (
                <MuiLink
                  key={text}
                  href="#"
                  underline="none"
                  sx={{
                    color: "#B0B0B0",
                    "&:hover": { color: "#3252DF" },
                    transition: "0.2s",
                    fontSize: "15px",
                  }}
                >
                  {text}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* العمود الرابع: Connect Us */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body1"
              sx={{ color: "#152C5B", fontWeight: 600, mb: 2 }}
            >
              Connect Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              <MuiLink
                href="mailto:support@staycation.id"
                underline="none"
                sx={{
                  color: "#B0B0B0",
                  "&:hover": { color: "#3252DF" },
                  fontSize: "15px",
                }}
              >
                support@staycation.id
              </MuiLink>
              <Typography
                variant="body2"
                sx={{ color: "#B0B0B0", fontSize: "15px" }}
              >
                021 - 2208 - 1996
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#B0B0B0", fontSize: "15px", maxWidth: 220 }}
              >
                Staycation, Kemang, Jakarta
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* سطر حقوق الملكية السفلي */}
        <Box
          sx={{ textAlign: "center", borderTop: "1px solid #FAFAFA", pt: 3 }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#B0B0B0", fontWeight: 300, letterSpacing: "0.5px" }}
          >
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
