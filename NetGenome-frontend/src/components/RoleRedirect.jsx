// src/components/RoleRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRedirect() {
  const { userData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && userData) {
      if (userData.role === "artist") {
        navigate("/artist/dashboard");
      } else {
        navigate("/home");
        
        
      }
    }
  }, [userData, loading, navigate]);

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  return null;
}
