import React, { useState } from "react";
import { motion } from "framer-motion";
import gifImage from "../assets/gif1.gif";
import google from "../assets/google-color.png";
import facebook from "../assets/Facebook_icon.png";
import { Link, useNavigate } from "react-router-dom"; // Make sure react-router-dom is installed

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
providerFacebook.addScope("email");

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, providerGoogle);
      navigate("/home", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, providerFacebook);
      navigate("/home", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#000000] text-white font-sans overflow-hidden px-1 py-6 lg:px-4 lg:py-0 gap-y-10 lg:gap-x-32"
    >
      {/* Left Sign-In Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 max-w-md p-10 space-y-8 z-10"
      >
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-center font-serif"
          >
            Welcome Back 👋
          </motion.h1>

          <p className="text-gray-300 text-center text-sm">
            Every new day is a chance to reset and conquer.
            <br />
            Sign in to begin your journey.
          </p>

          <form className="space-y-5" onSubmit={handleEmailSignIn}>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-12 rounded-md bg-white text-black placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.847.105-1.668.3-2.45M3.67 6.58A9.956 9.956 0 0012 3c5.523 0 10 4.477 10 10 0 1.306-.25 2.552-.7 3.7M4 4l16 16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="text-right text-sm text-blue-400 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            {/* Link-style Sign In button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block w-full text-center bg-transparent border border-blue-600 text-blue-400 py-2 rounded-md text-base transition duration-300 hover:bg-blue-600/10 shadow-[0_0_20px_0_rgba(0,191,255,0.3)]"
            >
              Sign In
            </motion.button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-transparent border border-white/20 text-white cursor-pointer hover:bg-white/5 transition shadow-[0_0_30px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_10px_rgba(255,255,255,0.2)]"
          >
            <img src={google} alt="Google" className="w-6 h-6" />
            <span>Sign in with Google</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleFacebookSignIn}
            className="flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-transparent border border-white/20 text-white cursor-pointer hover:bg-white/5 transition shadow-[0_0_30px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_10px_rgba(255,255,255,0.2)]"
          >
            <img src={facebook} alt="Facebook" className="w-6 h-6" />
            <span>Sign in with Facebook</span>
          </motion.div>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>

          <p className="text-center text-xs text-gray-600">
            © 2025 All rights reserved
          </p>
        </div>
      </motion.div>

      {/* Right GIF Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex w-full lg:w-1/2 h-full items-center justify-center p-6"
      >
        <img
          src={gifImage}
          alt="Animated Graphic"
          className="rounded-2xl w-full h-[90vh] object-cover shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}
