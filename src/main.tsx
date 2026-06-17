import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import AuthContextProvider from "./Contexts/AuthContext.tsx";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
);
