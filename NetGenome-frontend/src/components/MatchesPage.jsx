import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Users, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

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

const handleAddToCart = ()=>{
  console.log("Added to cart");
  
}

export default function Matches() {
  const location = useLocation();
  const { foundMatches } = location.state || {
    foundMatches: { perfectMatches: [], suggestedMatches: [] },
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
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[32px]">
        <img
          src={artist.imageUrl || fallbackImg}
          alt={artist.displayName}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Info */}
      <div className="p-5 text-white space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{artist.displayName}</h2>
          <span className="text-white/70 text-sm">
            {artist.identity?.gender || "N/A"}
          </span>
        </div>

        {/* Bio */}
        {artist.quotes?.[0] && (
          <p className="text-sm text-white/70 italic">"{artist.quotes[0]}"</p>
        )}

        {/* Tags */}
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
      {/* Footer Actions */}
      <div className="flex items-center justify-between px-6 pb-5">
        <div className="flex gap-5 text-white/90 text-[15px] font-medium">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-300" />
            312
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-gray-300" />
            48
          </div>
        </div>

        {/* Add to Cart Button */}
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
      <style>{`
        div::-webkit-scrollbar {
          width: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>

      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full h-[80px] bg-white/5 backdrop-blur-md flex justify-between items-center px-8 md:px-24 z-50 border-b border-white/10"
      >
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <div className="hidden md:flex items-center gap-8 text-white text-base font-medium">
          {navItems.map(({ label }, idx) => (
            <span
              key={idx}
              className="text-white/80 hover:text-white transition cursor-default"
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>

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
}



