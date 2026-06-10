import { Box, Card, Container, Grid, Paper, Typography } from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { PieChart } from "@mui/x-charts/PieChart";

const cards = [
  { title: "Rooms", value: 100 },
  { title: "Facilities", value: 160 },
  { title: "Ads", value: 20 },
];

const statusData = [
  { id: 0, value: 50, color: "#5568E8", label: "pending" },
  { id: 1, value: 25, color: "#FF2436", label: "progress" },
  { id: 2, value: 15, color: "#9A58D1", label: "completed" },
  { id: 3, value: 10, color: "#F8A83A", label: "rejected" },
];

const usersChart = [
  { id: 0, value: 8, color: "#53C64D" },
  { id: 1, value: 8, color: "#41B7F1" },
  { id: 2, value: 8, color: "#53C64D" },
  { id: 3, value: 8, color: "#41B7F1" },
  { id: 4, value: 8, color: "#53C64D" },
  { id: 5, value: 8, color: "#41B7F1" },
];

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 6 }}>
        {/* ================= CARDS ================= */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid
              key={card.title}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: 150,
                  borderRadius: "20px",
                  px: 4,
                  background: "linear-gradient(90deg,#13161D 0%, #161A23 100%)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: { xs: "1.8rem", md: "2.5rem" },
                      lineHeight: 1,
                    }}
                  >
                    {card.value}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#D7D7D7",
                      fontSize: { xs: "1.2rem", md: "1.7rem" },
                      mt: 1,
                    }}
                  >
                    {card.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    borderRadius: "50%",
                    bgcolor: "#13235E",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <WorkOutlineOutlinedIcon
                    sx={{
                      color: "#2952FF",
                      fontSize: { xs: 28, md: 38 },
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ================= CHARTS ================= */}
        <Grid container sx={{ mt: { xs: 4, md: 10 } }} spacing={6}>
          {/* LEFT DONUT */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  height: 300,
                  position: "relative",
                }}
              >
                <PieChart
                  series={[
                    {
                      innerRadius: 60,
                      outerRadius: 100,
                      data: statusData,
                    },
                  ]}
                  hideLegend
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                />
              </Box>

              <Box
                sx={{ width: { xs: "100%", sm: "auto" }, px: { xs: 2, sm: 0 } }}
              >
                {statusData.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "6px",
                        bgcolor: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ color: "#7C8698", fontSize: "1rem" }}>
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* RIGHT CARD */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                width: "100%",
                maxWidth: 500,
                mx: "auto",
                p: { xs: 3, md: 4 },
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 200,
                    height: 200,
                  }}
                >
                  <PieChart
                    series={[
                      {
                        innerRadius: 65,
                        outerRadius: 85,
                        data: usersChart,
                      },
                    ]}
                    margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    hideLegend
                  />

                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      pointerEvents: "none",
                    }}
                  >
                    Users
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#53C64D",
                      }}
                    />
                    <Typography>User</Typography>
                  </Box>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    25
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: "#41B7F1",
                      }}
                    />
                    <Typography sx={{ fontSize: "1.1rem" }}>Admin</Typography>
                  </Box>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    10
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
