
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-white text-center p-10">Loading...</div>;

  return user ? children : <Navigate to="/signin" replace />;
}


// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import React from "react";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const { userData, loading } = useAuth(); // changed from `user` to `userData`
//   console.log(children);

//   if (loading)
//     return <div className="text-white text-center p-10">Loading...</div>;
  
  

//   // Not logged in or no user data
//   if (!userData) return <Navigate to="/signin" replace />;

//   // If allowedRoles is passed, check role
//   if (allowedRoles && !allowedRoles.includes(userData.role)) {
    
    
//     return <Navigate to="/" replace />; // Redirect unauthorized user
//   }

//   return children;
// }
