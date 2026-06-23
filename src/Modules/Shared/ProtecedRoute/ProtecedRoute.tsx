import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtecedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  } else {
    return <Navigate to={"/auth/login"}></Navigate>;
  }
}
