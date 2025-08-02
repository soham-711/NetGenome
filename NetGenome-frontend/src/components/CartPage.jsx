import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { sendSol } from "../utils/sendTransaction";
import solanaLogo from "../assets/solana.png";
import PurchasedList from "./PurchasedList";

import {
  FiShoppingCart,
  FiTrash2,
  FiCheckCircle,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";
import { IoMdMusicalNote } from "react-icons/io";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [purchasedProfiles, setPurchasedProfiles] = useState([]);
  const [showPurchasedPopup, setShowPurchasedPopup] = useState(false);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);

  const { connection } = useConnection();
  const wallet = useWallet();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleDisconnect = async () => {
    await wallet.disconnect();
    navigate("/wallet-connect");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [cartRes, purchasedRes] = await Promise.all([
          axios.post("https://netgenome-1.onrender.com/api/cart/get", {
            userId: user.uid,
          }),
          axios.post("https://netgenome-1.onrender.com/api/purchased", {
            userId: user.uid,
          }),
        ]);
        console.log(cartRes.data.cart);

        setCartItems(cartRes.data.cart);
        setPurchasedProfiles(purchasedRes.data.data);

        if (wallet.publicKey) {
          const balance = await connection.getBalance(wallet.publicKey);
          setWalletBalance(balance / 10 ** 9); // Convert lamports to SOL
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, wallet.publicKey]);

  const total = cartItems.reduce((sum, item) => sum + item.priceUSD, 0);

  const handleRemove = async (artistId) => {
    try {
      await axios.post("https://netgenome-1.onrender.com/api/cart/remove", {
        artistId,
        userId: user.uid,
      });
      setCartItems(cartItems.filter((item) => item._id !== artistId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  // const handlePayment = async () => {
  //   if (total === 0 || paying) return;

  //   try {
  //     setPaying(true);

  //     const recipient = "J7cPxxB6tgktmtZC3GCBFCeMLL3fgcUbvh2rabAvnSgJ";
  //     const txSig = await sendSol(connection, wallet, recipient, total);

  //     console.log("✅ Transaction successful:", txSig);

  //     const purchases = cartItems.map((item) => ({
  //       artistId: item._id,
  //     }));

  //     const res = await axios.post("http://localhost:5000/api/unlock", {
  //       transactionSignature: txSig,
  //       userId: user.uid,
  //       purchases,
  //       recipient,
  //     });

  //     if (res.data.success) {
  //       setPurchasedProfiles([...purchasedProfiles, ...cartItems]);
  //       setCartItems([]);
  //       setSuccess(true);
  //       setShowSuccessPopup(true);
  //       console.log("✅ Purchase processed and saved in Convex");
  //     } else {
  //       console.warn("⚠️ Backend responded without success:", res.data);
  //       alert("Something went wrong with unlocking. Please contact support.");
  //     }
  //   } catch (err) {
  //     console.error("❌ Payment or Unlock Failed:", err);
  //     alert("Payment failed or could not verify transaction. Try again.");
  //   } finally {
  //     setPaying(false);
  //   }
  // };

  const handlePayment = async () => {
    if (paying || !wallet.publicKey || total === 0) return;

    try {
      setPaying(true);

      const recipient = "8gysvf5dCqK95rXpEQjLMYZyisNfEc16pFD8PRWRwhAM";

      // ✅ Step 1: Send SOL
      const txSig = await sendSol(connection, wallet, recipient, total);
      console.log("✅ Transaction successful:", txSig);

      // ✅ Step 2: Prepare purchased artist IDs
      const purchases = cartItems.map((item) => ({
        artistId: item._id,
      }));

      // ✅ Step 3: Notify backend to unlock access
      const res = await axios.post("https://netgenome-1.onrender.com/api/unlock", {
        transactionSignature: txSig,
        userId: user.uid,
        purchases,
        recipient,
      });

      // ✅ Step 4: Handle backend response
      if (res.data.success) {
        setPurchasedProfiles((prev) => [...prev, ...cartItems]);
        setCartItems([]);
        setSuccess(true);
        setShowSuccessPopup(true);
        console.log("✅ Purchase saved in Convex & cart cleared");
      } else {
        console.warn("⚠️ Unlock failed:", res.data);
        alert("Unlock failed. Please contact support.");
      }
    } catch (err) {
      console.error("❌ Payment or Unlock Failed:", err);

      // Optional: More helpful alerts
      if (err.message?.includes("already been processed")) {
        alert("Transaction reused. Please retry with a new payment.");
      } else if (err.message?.includes("insufficient")) {
        alert("Insufficient SOL balance.");
      } else {
        alert("Payment failed. Try again.");
      }
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-gray-400 border-r-gray-700 border-b-red-200 border-l-blue-300 rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!wallet.publicKey) {
    return <Navigate to="/wallet-connect" replace />;
  }

  return (
    <div className="min-h-screen overflow-hidden relative font-sans text-white bg-black px-4 py-8 sm:px-6 sm:py-12">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-brown to-gray-900 opacity-30 pointer-events-none z-0"></div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <FiShoppingCart className="text-3xl text-green-400" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400">
              Your Cart
            </h1>
            {cartItems.length > 0 && (
              <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-500 text-black">
                {cartItems.length}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {purchasedProfiles.length > 0 && (
              <button
                onClick={() => setShowPurchasedPopup(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400 hover:from-gray-600 hover:to-gray-600 text-white font-medium rounded-md transition-all"
              >
                <IoMdMusicalNote />
                My Purchases
              </button>
            )}

            <button
              onClick={handleDisconnect}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-md transition-all"
            >
              <RiWallet3Line />
              Disconnect
            </button>
          </div>
        </motion.div>

        {/* Wallet Balance */}
        {wallet.publicKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={solanaLogo} alt="SOL" className="w-5 h-5" />
                <span className="font-medium">Wallet Balance:</span>
                <span className="font-bold">
                  {walletBalance.toFixed(2)} SOL
                </span>
              </div>
              <span
                className={`text-sm font-medium ${
                  walletBalance < total ? "text-red-400" : "text-green-400"
                }`}
              >
                {walletBalance < total
                  ? "Insufficient balance"
                  : "Sufficient balance"}
              </span>
            </div>
            {walletBalance < total && (
              <p className="mt-2 text-sm text-gray-400">
                You need at least {total.toFixed(2)} SOL to complete this
                purchase.
              </p>
            )}
          </motion.div>
        )}

        {/* Empty State */}
        {cartItems.length === 0 && !success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-16"
          >
            <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <FiShoppingCart className="text-4xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Discover amazing artists and add them to your cart to get started.
            </p>
            <button
              onClick={() => navigate("/ai_pop_up")}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400 hover:from-gray-600 hover:to-gray-600 text-white font-medium rounded-lg transition-all"
            >
              Browse Artists
            </button>
          </motion.div>
        )}

        {/* Cart Items */}
        {!success && cartItems.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cartItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative p-5 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg overflow-hidden"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 opacity-10 transform rotate-45 translate-x-8 -translate-y-8"></div>

                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.identity.realName}
                        loading="lazy"
                        className="w-16 h-16 rounded-full object-cover border-2 border-green-400 flex-shrink-0"
                      />
                      <div>
                        <h2 className="text-xl font-semibold">
                          {item.identity.realName}
                        </h2>
                        <p className="text-sm text-gray-300 flex items-center gap-1 flex-wrap">
                          <IoMdMusicalNote className="text-green-400" />
                          {item.artistic_background?.genres?.join(", ") ||
                            "Genres not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="text-sm space-y-1 mb-3">
                        <p>
                          <span className="text-gray-400">Roles:</span>{" "}
                          {item.artistic_background?.roles?.join(", ") ||
                            "Role not specified"}
                        </p>
                        <p>
                          <span className="text-gray-400">Vibe:</span>{" "}
                          {Array.isArray(item.vibeTags)
                            ? item.vibeTags.join(", ")
                            : item.vibe || "N/A"}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-3 mb-4 italic">
                        {Array.isArray(item.quotes) && item.quotes.length > 0
                          ? `"${item.quotes[0]}"`
                          : item.desc || "No description available"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <img src={solanaLogo} alt="SOL" className="w-5 h-5" />
                        <span className="text-green-300 font-semibold">
                          {item.priceUSD} SOL
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Checkout Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-12 p-6 bg-gray-900 bg-opacity-50 rounded-xl border border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Order Summary</h3>
                  <p className="text-sm text-gray-400">
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}{" "}
                    in your cart
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Amount</p>
                    <div className="flex items-center gap-2">
                      <img src={solanaLogo} alt="SOL" className="w-6 h-6" />
                      <span className="text-2xl font-bold text-green-300">
                        {total.toFixed(2)} SOL
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ≈ ${(total * 100).toFixed(2)} USD
                    </p>
                  </div>

                  <motion.button
                    onClick={handlePayment}
                    disabled={paying || walletBalance < total}
                    whileHover={{
                      scale: paying || walletBalance < total ? 1 : 1.04,
                    }}
                    whileTap={{ scale: 0.96 }}
                    className={`px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${
                      paying || walletBalance < total
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-gray-500 via-gray-400 to-gray-400 hover:from-gray-600 hover:to-gray-600"
                    }`}
                  >
                    {paying ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay with Solana`
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">What happens next?</p>
                    <p className="text-sm text-gray-400">
                      After payment, you'll instantly receive contact
                      information and links to the artists' profiles. All
                      purchased artists will be available in your "My Purchases"
                      section.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={() => setShowSuccessPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-900 rounded-xl border border-gray-700 max-w-md w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  aria-label="Close"
                >
                  <FiX className="text-xl" />
                </button>

                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="text-4xl text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Your purchase has been completed. You can now access all the
                    artists' contact information.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setShowSuccessPopup(false);
                        setShowPurchasedPopup(true);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all"
                    >
                      View Purchases
                    </button>
                    <button
                      onClick={() => navigate("/matches")}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all"
                    >
                      Find More Artists
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <PurchasedList
          visible={showPurchasedPopup}
          setVisible={setShowPurchasedPopup}
          purchasedProfiles={purchasedProfiles}
          setPurchasedProfiles={setPurchasedProfiles}
        />
      </div>
    </div>
  );
}
