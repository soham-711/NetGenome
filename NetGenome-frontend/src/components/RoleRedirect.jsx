// src/components/RoleRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRedirect({children}) {
  const { user, loading , userData,userDataLoading} = useAuth();
  
  console.log(userData);

  
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!loading && user && userData && !userDataLoading) {
      if (userData.role === "artist") {
        navigate("/artist/dashboard",{ replace: true });
        
      } else {
        navigate("/home")
      }
    }
  }, [user, loading, navigate, userData, userDataLoading]);

  if (loading ||userDataLoading ) return <div className="text-red-500 text-center p-10 m-auto">Loading...</div>;

  return children;
}
