import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
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
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OnlyLoggedIn } from "../../Shared/ProtecedRoute/OnlyLoggedIn";
import { AuthContext } from "../../../Contexts/AuthContext";
import { RoomContext } from "../../../Contexts/RoomContext";
import DeleteConfirmations from "../../Shared/DeleteConfirmations/DeleteConfirmations";
import ViewUser from "../../Shared/ViewModals/ViewUser";
import noImageProfile from "../../../assets/Images/noPersoneEmage.avif"


export default function UsersNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, logOut } = useContext(AuthContext);
  const { favoritesCount, handleCountChange } = useContext(RoomContext);
  const [viewProfile, setViewProfile] = useState(false);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false)





  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const activeLink = location.pathname
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

        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemText
              onClick={() => navigate('/home')}

              primary={'Home'}
              sx={{
                color: (activeLink == "/home" || activeLink == '/') ? "#3252DF" : "black",
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemText

              onClick={() => navigate('/home/explore')}
              primary={'Explore'}
              sx={{
                color: activeLink == "/explore" ? "#3252DF" : "black",
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </ListItem>
        <OnlyLoggedIn>

          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 1 }}>
              <ListItemText
                onClick={() => navigate('favorites')}
                primary={'Favorites'}
                sx={{
                  color: activeLink == "/favorites" ? "#3252DF" : "black",
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        </OnlyLoggedIn>

      </List>

      <Divider sx={{ my: 2 }} />
      <OnlyLoggedIn>

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
      </OnlyLoggedIn>
      {!localStorage.getItem('token') ?
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
            onClick={() => navigate('/auth/register')}
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
            onClick={() => navigate('/auth/login')}
          >
            Login Now
          </Button>
        </Box>
        : <></>}
    </Box>
  );

  useEffect(() => {
    handleCountChange();
  }, [])

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
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
                  color: location.pathname == '/home' ? "#3252DF" : "#152C5B",
                  textTransform: "none",
                  fontWeight: 500,
                }}
                onClick={() => navigate('home')}
              >
                Home
              </Button>
              <Button

                sx={{
                  color: location.pathname == '/home/explore' ? "#3252DF" : "#152C5B",
                  textTransform: "none",
                  fontWeight: 400,
                }}
                onClick={() => navigate('home/explore')}
              >
                Explore
              </Button>

              <OnlyLoggedIn>

                <Badge badgeContent={favoritesCount} color="error">
                  <Button
                    onClick={() => navigate('home/favorites')}
                    sx={{
                      color: "#152C5B",
                      textTransform: "none",
                      fontWeight: 400,
                    }}
                  >
                    Favorites
                  </Button>
                </Badge>
              </OnlyLoggedIn>
              {localStorage.getItem('token') ? <></> :
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
                    onClick={() => navigate('/auth/register')}
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
                    onClick={() => navigate('/auth/login')}
                  >
                    Login Now
                  </Button>
                </Box>
              }
              <OnlyLoggedIn>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}
                >
                  <Avatar
                    alt="user Profile image"
                    src={profile?.profileImage?profile?.profileImage :noImageProfile}
                    sx={{ width: 35, height: 35 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "#152C5B", fontWeight: 500, ml: 1 }}
                  >
                    {profile?.userName}
                  </Typography>
                  <IconButton size="small" sx={{ color: "#152C5B" }} onClick={(e) => setAnchorElUser(e.currentTarget)}>
                    <KeyboardArrowDownIcon scale={1} />
                  </IconButton>
                </Box>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  <MenuItem onClick={() => { setAnchorElUser(null); setViewProfile(true) }}>
                    <Typography sx={{ textAlign: 'center' }}>profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { setAnchorElUser(null); setOpenConfirm(true) }}>
                    <Typography sx={{ textAlign: 'center' }}>logout</Typography>
                  </MenuItem>
                </Menu>
              </OnlyLoggedIn>
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
      <ViewUser facility={profile} onClose={() => setViewProfile(false)} open={viewProfile} />
      <DeleteConfirmations onClose={() => setOpenConfirm(false)}
        open={openConfirm}
        onDelete={logOut}
        title="Confirm Logout"
        description="Are you sure you want to log out? You will need to sign in again to access your account."
        btnText="Log out"
      />
    </>
  );
}
