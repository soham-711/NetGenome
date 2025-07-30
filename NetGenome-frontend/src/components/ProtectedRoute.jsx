
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-white text-center p-10">Loading...</div>;

  return user ? children : <Navigate to="/signin" replace />;
}


// src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import React from "react";

// export default function ProtectedRoute({ children, allowedRoles = [] }) {
//   const { user, loading } = useAuth();

//   if (loading)
//     return <div className="text-white text-center p-10">Loading...</div>;

//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   // If no role restriction, allow all authenticated users
//   if (allowedRoles.length === 0) {
//     return children;
//   }

//   // Restrict by role
//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/not-authorized" replace />;
//   }

//   return children;
// }
