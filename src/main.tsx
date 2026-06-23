import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { RoomContextProvider } from "./Contexts/roomContextProvider.tsx";
import "./index.css";
import AuthContextProvider from "./Contexts/AuthContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <AuthContextProvider>
      <RoomContextProvider>
        <App />
      </RoomContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
