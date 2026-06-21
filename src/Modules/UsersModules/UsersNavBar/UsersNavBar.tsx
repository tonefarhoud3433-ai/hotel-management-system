import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UsersNavBar() {
  const navigate = useNavigate()
  
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 260, p: 2 }} onClick={handleDrawerToggle}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#3252DF",
          mb: 2,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Staycation<span style={{ color: "#152C5B" }}>.</span>
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List>
        {["Home", "Explore", "Reviews", "Favorites"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ borderRadius: 1 }}>
              <ListItemText
                primary={text}
                sx={{
                  color: index === 0 ? "#3252DF" : "#152C5B",
                  fontWeight: index === 0 ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, mb: 2 }}>
        <Avatar
          alt="Upskilling"
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 35, height: 35 }}
        />
        <Typography variant="body2" sx={{ color: "#152C5B", fontWeight: 500 }}>
          Upskilling
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: "#152C5B" }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "#E4EBF4",
            color: "#3252DF",
            textTransform: "none",
          }}
          onClick={()=>navigate('/auth/register')}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "#3252DF",
            color: "#fff",
            textTransform: "none",
          }}
          onClick={()=>navigate('/auth/login')}
        >
          Login Now
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #E5E5E5",
          py: 1,
        }}
      >
        {/* 💡 تم تعديل المقاس هنا إلى xl عشان يفرش أكتر في الشاشات الكبيرة */}
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* الـ Logo */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#3252DF",
                textDecoration: "none",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Staycation<span style={{ color: "#152C5B" }}>.</span>
            </Typography>

            {/* 1. قائمة الشاشات الكبيرة (Desktop) -> بتختفي في الموبايل باستخدام `display: { xs: "none", md: "flex" }` */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Button
                sx={{
                  color: "#3252DF",
                  textTransform: "none",
                  fontWeight: 500,
                }}
                onClick={()=>navigate('home')}
              >
                Home
              </Button>
              <Button
              
                sx={{
                  color: "#152C5B",
                  textTransform: "none",
                  fontWeight: 400,
                }}
                onClick={()=>navigate('home/explore')}
              >
                Explore
              </Button>
              <Button
                sx={{
                  color: "#152C5B",
                  textTransform: "none",
                  fontWeight: 400,
                }}
              >
                Reviews
              </Button>
              <Button
              onClick={()=>navigate('home/favorites')}
                sx={{
                  color: "#152C5B",
                  textTransform: "none",
                  fontWeight: 400,
                }}
              >
                Favorites
              </Button>

              <Box sx={{ display: "flex", gap: 1.5, ml: 2 }}>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    backgroundColor: "#E4EBF4",
                    color: "#3252DF",
                    textTransform: "none",
                    px: 3,
                    "&:hover": { backgroundColor: "#d0def0" },
                  }}
                  onClick={()=>navigate('/auth/register')}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    backgroundColor: "#3252DF",
                    color: "#fff",
                    textTransform: "none",
                    px: 3,
                    "&:hover": { backgroundColor: "#2945c5" },
                  }}
                  onClick={()=>navigate('/auth/login')}
                >
                  Login Now
                </Button>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}
              >
                <Avatar
                  alt="Upskilling"
                  src="https://mui.com/static/images/avatar/1.jpg"
                  sx={{ width: 35, height: 35 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "#152C5B", fontWeight: 500, ml: 1 }}
                >
                  Upskilling
                </Typography>
                <IconButton size="small" sx={{ color: "#152C5B" }}>
                  <KeyboardArrowDownIcon size="small" />
                </IconButton>
              </Box>
            </Box>

            {/* 2. زرار الهامبرجر منيو للموبايل -> بيظهر فقط في الشاشات الصغيرة باستخدام `display: { xs: "block", md: "none" }` */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, color: "#152C5B" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* القائمة الجانبية (Drawer) اللي بتسحب من الجنب في الموبايل */}
      <Drawer
        anchor="right" // بتفتح من اليمين عشان تتماشى مع اتجاه حركة العين والانسيابية
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // بيحسن أداء الرندر على الموبايل
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
