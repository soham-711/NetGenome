import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import Launch from "../src/launch_pages/launch";
import SignUp from "../src/auth/SignUp";
import SignIn from "../src/auth/SignIn";
import Home from "./components/home";
import Explore from "../src/components/explore";
import Explore2 from "../src/components/explore2";
import Explore3 from "../src/components/explore3";
import Explore4 from "../src/components/explore4";
import Explore5 from "../src/components/explore5";
import Ai_land from "../src/components/ai_land";
import Ai_pop_up from "../src/components/ai_pop_up";
import Ai_final from "../src/components/ai_final";
import Collab from "../src/components/collab";
import Community from "../src/components/community";
import Connect from "../src/components/connect";
import End from "../src/components/end";
import ProtectedRoute from "./components/ProtectedRoute";
import MatchesPage from "./components/MatchesPage";

export default function App() {
  const location = useLocation();

  const { user, loading } = useAuth(); // 🔐
  console.log(user);

  if (loading) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  return (
    <div className="bg-[#0C0F15] min-h-screen text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {/* <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Launch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
           <Route path="/" element={<Launch />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore2" element={<Explore2 />} />
          <Route path="/explore3" element={<Explore3 />} />
          <Route path="/explore4" element={<Explore4 />} />
          <Route path="/explore5" element={<Explore5 />} />
          <Route path="/ai_chat_land" element={<Ai_land />} />
          <Route path="/ai_pop_up" element={<Ai_pop_up />} />
          <Route path="/ai_final" element={<Ai_final />} />
          <Route path="/collaborations" element={<Collab />} />
          <Route path="/join-community" element={<Community />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/end" element={<End />} />
        </Routes> */}
        <Routes location={location} key={location.pathname}>
          {/* 🚀 Auto-redirect root based on login status */}
          <Route
            path="/"
            element={user ? <Navigate to="/home" replace /> : <Launch />}
          />

          {/* 🟢 Public routes */}
          <Route path="/" element={<Launch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* 🔐 Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore2"
            element={
              <ProtectedRoute>
                <Explore2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore3"
            element={
              <ProtectedRoute>
                <Explore3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore4"
            element={
              <ProtectedRoute>
                <Explore4 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore5"
            element={
              <ProtectedRoute>
                <Explore5 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai_chat_land"
            element={
              <ProtectedRoute>
                <Ai_land />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai_pop_up"
            element={
              <ProtectedRoute>
                <Ai_pop_up />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai_final"
            element={
              <ProtectedRoute>
                <Ai_final />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collaborations"
            element={
              <ProtectedRoute>
                <Collab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/join-community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connect"
            element={
              <ProtectedRoute>
                <Connect />
              </ProtectedRoute>
            }
          />
          <Route
            path="/end"
            element={
              <ProtectedRoute>
                <End />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matches"
            element={
              <ProtectedRoute>
                <MatchesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
