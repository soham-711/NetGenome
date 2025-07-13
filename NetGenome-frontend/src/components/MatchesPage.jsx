import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Users } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";

import bgImage from "../assets/i11.png";
import logo from "../assets/logo.png";
import fallbackImg from "../assets/artist1.jpg";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Ai Chat", path: "/ai_chat_land" },
  { label: "Collaborations", path: "/collab" },
  { label: "Join Community", path: "/community" },
  { label: "Connect", path: "/connect" },
];

const Matches = () => {
  const location = useLocation();
  const { foundMatches } = location.state || {
    foundMatches: { perfectMatches: [], suggestedMatches: [] },
  };

  const [addedItems, setAddedItems] = useState([]);
  const [justAddedId, setJustAddedId] = useState(null);

  const handleAddToCart = async (artist) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to add to cart.");
        return;
      }

      const userId = user.uid;

      const res = await axios.post("http://localhost:5000/api/cart/add", {
        artistId: artist._id,
        userId,
      });

      if (res.status === 200) {
        setAddedItems((prev) => [...prev, artist._id]);
        setJustAddedId(artist._id);
        setTimeout(() => setJustAddedId(null), 2000);
      } else {
        alert("❌ Error: " + res.data.error);
      }
    } catch (err) {
      console.error("Cart API call failed:", err);
      alert("❌ Failed to add to cart");
    }
  };

  const renderArtistCard = (artist, index) => {
    const isInCart = addedItems.includes(artist._id);

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="rounded-[32px] shadow-lg bg-black/90 backdrop-blur-2xl border border-white/10 flex flex-col overflow-hidden relative"
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[32px]">
          <img
            src={artist.imageUrl || fallbackImg}
            alt={artist.displayName}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-6 text-white flex-grow space-y-3">
          <h2 className="text-xl font-semibold">{artist.displayName}</h2>
          {artist.quotes?.[0] && (
            <p className="text-white/70 text-sm italic">"{artist.quotes[0]}"</p>
          )}
          <div className="text-sm text-white/80 space-y-1">
            {artist.artistic_background?.roles?.length > 0 && (
              <p>
                <span className="font-semibold text-white">Roles:</span>{" "}
                {artist.artistic_background.roles.join(", ")}
              </p>
            )}
            {artist.identity?.languages?.length > 0 && (
              <p>
                <span className="font-semibold text-white">Languages:</span>{" "}
                {artist.identity.languages.join(", ")}
              </p>
            )}
            {artist.identity?.location && (
              <p>
                <span className="font-semibold text-white">Location:</span>{" "}
                {artist.identity.location}
              </p>
            )}
            <p>
              <span className="font-semibold text-white">Price:</span> $
              {artist.priceUSD || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 pb-6">
          <div className="flex items-center gap-5 text-white/80 text-[15px] font-medium">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>312</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart
                className={`w-5 h-5 ${
                  isInCart ? "text-green-400" : "text-white/50"
                }`}
              />
            </div>
          </div>
          <button
            onClick={() => handleAddToCart(artist)}
            className={`h-[42px] px-[20px] py-[10px] rounded-full flex items-center gap-2 shadow-inner transition text-white ${
              isInCart
                ? "bg-green-600"
                : "bg-[#2c2c2c] hover:bg-[#3a3a3a]"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isInCart ? "Added" : "Cart"}
            </span>
          </button>
        </div>

        {justAddedId === artist._id && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm z-50"
          >
            Added to cart!
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center overflow-y-scroll"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <style>{`
        div::-webkit-scrollbar { width: 10px; }
        div::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 9999px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
        }
      `}</style>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <motion.nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-24 z-50 bg-transparent backdrop-blur-2xl border-b border-white/10">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <div className="hidden md:flex gap-8 items-center text-white text-sm">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative group text-white/80 hover:text-white transition duration-300"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <Link
            to="/wallet-connect"
            className="hover:text-white text-white/80 transition duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </motion.nav>

      <div className="relative z-20 pt-[120px] px-6 md:px-16 pb-12 space-y-20">
        {foundMatches.perfectMatches.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              🎯 Perfect Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {foundMatches.perfectMatches.map((artist, idx) =>
                renderArtistCard(artist, idx)
              )}
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                🎯 Perfect Matches
              </h2>
              <p className="text-white/70">No perfect matches found.</p>
            </div>
            {foundMatches.suggestedMatches.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  ✨ Suggested Matches
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  {foundMatches.suggestedMatches.map((artist, idx) =>
                    renderArtistCard(artist, idx)
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Matches;
