import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { sendSol } from "../utils/sendTransaction";
import solanaLogo from "../assets/solana.png";
import PurchasedList from "./PurchasedList";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [purchasedProfiles, setPurchasedProfiles] = useState([]);
  const [showPurchasedPopup, setShowPurchasedPopup] = useState(false);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(true); // NEW

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

    const fetchCartItems = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/cart/get", {
          userId: user.uid,
        });
        setCartItems(res.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchPurchased = () => {
      const saved = localStorage.getItem("purchased");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setPurchasedProfiles(parsed);
        } catch (e) {
          console.error("Error parsing purchased data:", e);
        }
      }
    };

    fetchCartItems();
    fetchPurchased();
    setLoading(false);
  }, [user]);

  const total = cartItems.reduce((sum, item) => sum + item.priceUSD, 0);

  const handleRemove = async (artistId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        artistId,
        userId: user.uid,
      });
      setCartItems(cartItems.filter((item) => item._id !== artistId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const handlePayment = async () => {
    if (total === 0 || paying) return;

    try {
      setPaying(true);
      const recipient = "8gysvf5dCqK95rXpEQjLMYZyisNfEc16pFD8PRWRwhAM";
      const txSig = await sendSol(connection, wallet, recipient, total);
      console.log("✅ Transaction successful:", txSig);

      // Post-payment logic
      localStorage.setItem(
        "purchased",
        JSON.stringify([...purchasedProfiles, ...cartItems])
      );
      setPurchasedProfiles([...purchasedProfiles, ...cartItems]);
      setCartItems([]);
      setSuccess(true);
      setShowSuccessPopup(true);
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again.");
    } finally {
      setPaying(false);
    }
  };

  // Prevent rendering until hooks are settled
  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (!wallet.publicKey) {
    return <Navigate to="/wallet-connect" replace />;
  }

  return (
    <div className="min-h-screen overflow-hidden relative font-sans text-white bg-black px-6 py-12">
      {/* Background Glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0.4, scale: 0.9 }}
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] bg-white rounded-full blur-[150px] opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-between items-center mb-10"
        >
          <h1 className="text-4xl font-bold">🎧 Your Cart</h1>
          <button
            onClick={handleDisconnect}
            className="text-sm px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 font-medium"
          >
            Disconnect
          </button>
        </motion.div>

        {cartItems.length === 0 && !success ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center text-gray-400 text-lg mt-20"
          >
            Your cart is empty. Add artists from Matches.
          </motion.p>
        ) : (
          !success && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid md:grid-cols-3 gap-6 mt-8"
              >
                {cartItems.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 shadow-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-green-400"
                    />
                    <h2 className="text-2xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-300">🎼 {item.genres}</p>
                    <p className="text-sm">
                      <span className="text-white">Role:</span> {item.role}
                    </p>
                    <p className="text-sm">
                      <span className="text-white">Vibe:</span> {item.vibe}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <img src={solanaLogo} alt="SOL" className="w-6 h-6" />
                        <span className="text-green-300 font-semibold text-md">
                          {item.price} SOL
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="px-3 py-1 text-sm font-semibold rounded-md bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-14 text-center"
              >
                <p className="text-xl font-semibold text-gray-300 mb-2">
                  Total:
                  <span className="ml-2 inline-flex items-center gap-2 text-green-300">
                    <img src={solanaLogo} alt="SOL" className="w-6 h-6" />
                    {total.toFixed(2)} SOL
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-5">
                  After payment, you'll get contact info & links instantly.
                </p>

                <motion.button
                  onClick={handlePayment}
                  disabled={paying}
                  whileHover={{ scale: total === 0 || paying ? 1 : 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-8 py-3 rounded-lg font-bold transition-all shadow-md text-black ${
                    total === 0 || paying
                      ? "bg-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  style={{
                    backgroundImage:
                      total === 0 || paying
                        ? "none"
                        : "linear-gradient(to right, aquamarine, skyblue)",
                  }}
                >
                  {paying ? "Processing..." : "Confirm & Pay to Unlock"}
                </motion.button>
              </motion.div>
            </>
          )
        )}

        {purchasedProfiles.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowPurchasedPopup(true)}
              className="px-6 py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200"
            >
              🎉 My Purchase
            </button>
          </div>
        )}

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
