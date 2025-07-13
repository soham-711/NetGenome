import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import bgImage from "../assets/i11.png";
import logo from "../assets/logo.png";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to add to cart.");
    return;
  }

  const userId = user.uid;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/cart/get", {
          userId,
        });
        console.log(res.data.cart);
        
        setCartItems(res.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemove = async (artistId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        artistId,
        userId,
      });
      setCartItems(cartItems.filter((item) => item._id !== artistId));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.priceUSD || 0), 0);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="relative z-10 pt-20 px-6 md:px-16 pb-16">
        <div className="flex items-center justify-between mb-10">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-3xl font-bold text-white">🛒 Your Cart</h1>
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-white/70">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between bg-white/10 border border-white/10 rounded-xl p-4 text-white shadow-lg"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.displayName}</h3>
                  <p className="text-sm text-white/70">${item.priceUSD}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
            <div className="mt-8 text-white text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
