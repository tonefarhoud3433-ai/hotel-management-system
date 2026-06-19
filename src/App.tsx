import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import "swiper/css/autoplay";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import MasterLayout from "./Layouts/MasterLayout/MasterLayout";
import UserLayout from "./Layouts/UserLayout/UserLayout";
import ChangePassword from "./Modules/AuthModules/ChangePassword/ChangePassword";
import ForgetPassword from "./Modules/AuthModules/ForgetPassword/ForgetPassword";
import Login from "./Modules/AuthModules/Login/Login";
import Register from "./Modules/AuthModules/Register/Register";
import ResetPassword from "./Modules/AuthModules/ResetPassword/ResetPassword";
import Verify from "./Modules/AuthModules/Verify/Verify";
import ADS from "./Modules/MasterModules/ADS/ADS";
import Booking from "./Modules/MasterModules/Booking/Booking";
import Facilities from "./Modules/MasterModules/Facilities/Facilities";
import Home from "./Modules/MasterModules/Home/Home";
import RoomData from "./Modules/MasterModules/Rooms/RoomData";
import Rooms from "./Modules/MasterModules/Rooms/Rooms";
import Users from "./Modules/MasterModules/Users/Users";
import NotFound from "./Modules/Shared/NotFound/NotFound";
import ProtecedRoute from "./Modules/Shared/ProtecedRoute/ProtecedRoute";
import UsersHome from "./Modules/UsersModules/Home/UsersHome";
import FirstADS from "./Modules/UsersModules/Home/FirstADS";
import ExploreRooms from "./Modules/UsersModules/ExploreRooms/ExploreRooms";
import FavList from "./Modules/UsersModules/Favorite/FavList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <UsersHome /> },
        { path: "home", element: <UsersHome /> },
        { path: "home/ads", element: <FirstADS /> },
        { path: "home/explore", element: <ExploreRooms /> },
        { path: "home/favorites", element: <FavList /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify", element: <Verify /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtecedRoute>
          <MasterLayout />
        </ProtecedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "rooms", element: <Rooms /> },
        { path: "room-add", element: <RoomData /> },
        { path: "room-edit/:id", element: <RoomData /> },
        { path: "facilities", element: <Facilities /> },
        { path: "ads", element: <ADS /> },
        { path: "booking", element: <Booking /> },
        { path: "users", element: <Users /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
