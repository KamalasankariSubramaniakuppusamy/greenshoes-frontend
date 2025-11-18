import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. Prevent redirect flicker during context initialization
  if (loading) return null;

  // 2. Redirect only AFTER we know the user is not logged in
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
