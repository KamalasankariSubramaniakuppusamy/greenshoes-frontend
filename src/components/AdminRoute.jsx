// src/components/AdminRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but not admin → kick to home
  if (!user.isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
