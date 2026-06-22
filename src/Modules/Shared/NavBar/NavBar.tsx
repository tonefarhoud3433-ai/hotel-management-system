import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../../Contexts/AuthContext';
import { useContext } from 'react';
import DeleteConfirmations from '../DeleteConfirmations/DeleteConfirmations';
import ViewUser from '../ViewModals/ViewUser';



function NavBar() {
    const {profile,logOut} = useContext(AuthContext)!;
    const [confirmLogOut,setConfirmLogOut] = React.useState(false);
    const [viewProfile,setViewProfile] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

 

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (<>
    <Box sx={{p:2, pb:{xs:1},pt:0,mt:2,boxShadow:'',position:'sticky',top:0,zIndex:999, bgcolor:'white'}}>
    <AppBar position="static" sx={{ backgroundColor: 'rgb(234, 235, 236)', color: 'black',borderRadius: 4,boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex',justifyContent:'space-between'}}>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: 'flex' ,
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
                        <span style={{ color: 'blue' }}>Stay</span>cation

          </Typography>

          
          
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Box sx={{width: 32, height: 32, borderRadius: '50%'}} crossOrigin='anonymous' component={'img'} alt="Remy Sharp" src={profile?.profileImage} />
              </IconButton>
            </Tooltip>
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
              onClose={handleCloseUserMenu}
            >
                <MenuItem  onClick={()=>{handleCloseUserMenu();setViewProfile(true)}}>
                  <Typography sx={{ textAlign: 'center' }}>profile</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>{handleCloseUserMenu();setConfirmLogOut(true)}}>
                  <Typography sx={{ textAlign: 'center' }}>logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
    <DeleteConfirmations title='Logout' description='are you sure you want to log out?' btnText='logOut'  onDelete={logOut} open={confirmLogOut} onClose={()=>setConfirmLogOut(false)} />
    <ViewUser facility={profile} onClose={()=>setViewProfile(false)} open={viewProfile}/>
    </>
  );
}
export default NavBar;

