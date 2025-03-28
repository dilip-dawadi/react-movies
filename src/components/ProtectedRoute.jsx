import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useEntertainmentContext } from "../contextApi/Context";
import Spinner from "./Spinner";
import { hasRole } from "../utils/authUtils";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useEntertainmentContext();
  if (loading) return <Spinner />;

  if (!user?.id) return <Navigate to="/" replace />;
  const hasRequiredRole = hasRole(user, allowedRoles);

  if (!hasRequiredRole) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
// Compare this snippet from src/Context/authContext.jsx:
