import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "@hooks";

export const ProtectedLayout = () => {
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  // if (!isAuthenticated) return null;

  return <Outlet />;
};
