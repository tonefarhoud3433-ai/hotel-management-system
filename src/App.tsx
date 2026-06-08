import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import ChangePassword from "./Modules/AuthModules/ChangePassword/ChangePassword";
import ForgetPassword from "./Modules/AuthModules/ForgetPassword/ForgetPassword";
import Login from "./Modules/AuthModules/Login/Login";
import Register from "./Modules/AuthModules/Register/Register";
import ResetPassword from "./Modules/AuthModules/ResetPassword/ResetPassword";
import Verify from "./Modules/AuthModules/Verify/Verify";
import NotFound from "./Modules/Shared/NotFound/NotFound";
import { ToastContainer } from 'react-toastify';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
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
  ]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
