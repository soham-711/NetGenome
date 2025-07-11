// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-white text-center p-10">Loading...</div>;

  return user ? children : <Navigate to="/signin" replace />;
}
