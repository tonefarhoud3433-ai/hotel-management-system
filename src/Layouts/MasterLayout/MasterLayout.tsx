import {
  AdsClick,
  ArrowBack,
  ArrowForward,
  Assignment,
  Bed,
  Dashboard,
  NetworkCell,
  Person,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../../Modules/Shared/NavBar/NavBar";

export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Stack direction="row">
        <Box sx={{ flexShrink: 1 }}>
          <Sidebar
            collapsed={collapsed}
            style={{
              height: "100vh",
              position: "sticky",
              top: 0,
            }}
          >
            <Menu>
              <MenuItem style={{ textAlign: "end", cursor: "auto" }}>
                {collapsed ? (
                  <ArrowBack
                    sx={{ cursor: "pointer" }}
                    onClick={() => setCollapsed(false)}
                  />
                ) : (
                  <ArrowForward
                    sx={{ cursor: "pointer" }}
                    onClick={() => setCollapsed(true)}
                  />
                )}
              </MenuItem>
              <MenuItem
                component={<Link to={"/dashboard"} />}
                icon={<Dashboard />}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={<Link to={"booking"} />}
                icon={<Assignment />}
              >
                bookings
              </MenuItem>
              <MenuItem component={<Link to={"rooms"} />} icon={<Bed />}>
                Rooms
              </MenuItem>
              <MenuItem
                component={<Link to={"users"} />}
                icon={<Person />}
              >
                users
              </MenuItem>
              <MenuItem
                component={<Link to={"facilities"} />}
                icon={<NetworkCell />}
              >
                Facilities
              </MenuItem>
              <MenuItem component={<Link to={"ads"} />} icon={<AdsClick />}>
                ADs
              </MenuItem>
            </Menu>
          </Sidebar>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0,px:3 }}>
          <NavBar />
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}
