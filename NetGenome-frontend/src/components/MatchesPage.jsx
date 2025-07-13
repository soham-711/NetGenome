import React from "react";
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
        alert("✅ Added to cart!");
      } else {
        console.error("Cart error:", res.data.error);
        alert("❌ Error: " + res.data.error);
      }
    } catch (err) {
      console.error("Cart API call failed:", err);
      alert("❌ Failed to add to cart");
    }
  };

  const renderArtistCard = (artist, index, handleAddToCart) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-[32px] shadow-lg bg-black/80 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[32px]">
        <img
          src={artist.imageUrl || fallbackImg}
          alt={artist.displayName}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="p-5 text-white space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{artist.displayName}</h2>
          <span className="text-white/70 text-sm">
            {artist.identity?.gender || "N/A"}
          </span>
        </div>

        {artist.quotes?.[0] && (
          <p className="text-sm text-white/70 italic">"{artist.quotes[0]}"</p>
        )}

        <div className="space-y-2 text-sm text-white/80">
          {artist.artistic_background?.roles?.length > 0 && (
            <div>
              <span className="text-white font-semibold">Roles:</span>{" "}
              {artist.artistic_background.roles.join(", ")}
            </div>
          )}
          {artist.identity?.languages?.length > 0 && (
            <div>
              <span className="text-white font-semibold">Languages:</span>{" "}
              {artist.identity.languages.join(", ")}
            </div>
          )}
          {artist.identity?.location && (
            <div>
              <span className="text-white font-semibold">Location:</span>{" "}
              {artist.identity.location}
            </div>
          )}
          <div>
            <span className="text-white font-semibold">Price:</span> $
            {artist.priceUSD || "Not listed"}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 pb-5">
        <div className="flex gap-5 text-white/90 text-[15px] font-medium">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-300" /> 312
          </div>
        </div>
        <button
          onClick={() => handleAddToCart(artist)}
          className="h-[42px] px-[18px] py-[8px] bg-[#2c2c2c] text-white rounded-full flex items-center gap-2 shadow-inner shadow-white/10 hover:bg-[#3a3a3a] transition"
        >
          <span className="text-[14px] font-medium">Cart</span>
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center overflow-y-scroll"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
      <motion.nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-24 z-50 bg-transparent backdrop-blur-2xl">
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
            to="/cart"
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
                renderArtistCard(artist, idx, handleAddToCart)
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
                    renderArtistCard(artist, idx, handleAddToCart)
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
