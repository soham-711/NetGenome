// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import React from "react";
// export default function ProtectedRoute({ children}) {
//   const { user, loading } = useAuth();

//   if (loading)
//     return <div className="text-red-500 text-center p-10">Loading...</div>;

//   return user ? children : <Navigate to="/signin" replace />;
// }
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-red-500 text-center p-10">Loading...</div>;
  }

  // If user is not present, we’ll already be navigating away
  // So only render children if user exists
  return user ? children : null;
}

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import React from "react";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const { user, loading } = useAuth();

//   if (loading)
//     return <div className="text-white text-center p-10">Loading...</div>;

//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }
//   console.log(allowedRoles.includes(user.role));

//   // Role protection logic
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // If role not allowed, you can redirect to a 403 page or home
//     return <Navigate to="/artist/dashboard" replace />;
//   }

//   return children;
// }
