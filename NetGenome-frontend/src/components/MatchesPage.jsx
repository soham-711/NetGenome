import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Users,
  Star,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";

import bgImage from "../assets/i11.png";
import logo from "../assets/logo.png";
import fallbackImg from "../assets/artist1.jpg";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "AI Chat", path: "/ai_chat_land" },
  { label: "Collaborations", path: "/collab" },
  { label: "Community", path: "/community" },
  { label: "Connect", path: "/connect" },
];

const Matches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { foundMatches } = location.state || {
    foundMatches: { perfectMatches: [], suggestedMatches: [] },
  };
  const [purchasedArtists, setPurchasedArtists] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [justAddedId, setJustAddedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const checkPurchases = async () => {
      setIsLoading(true);
      const allArtists = [
        ...foundMatches.perfectMatches,
        ...foundMatches.suggestedMatches,
      ];

      const purchasedIds = [];

      for (const artist of allArtists) {
        try {
          const res = await axios.post(
            "https://netgenome-1.onrender.com/api/hasPurchased",
            {
              userId: user.uid,
              artistId: artist._id,
            }
          );
          if (res.data.hasPurchased) {
            purchasedIds.push(artist._id);
          }
        } catch (err) {
          console.error("Error checking purchase for", artist._id, err);
        }
      }

      setPurchasedArtists(purchasedIds);
      setIsLoading(false);
    };

    checkPurchases();
  }, []);

  const handleAddToCart = async (artist) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        navigate("/login");
        return;
      }

      const userId = user.uid;
      setJustAddedId(artist._id);

      const res = await axios.post("https://netgenome-1.onrender.com/api/cart/add", {
        artistId: artist._id,
        userId,
      });

      if (res.status === 200) {
        setAddedItems((prev) => [...prev, artist._id]);
        setTimeout(() => setJustAddedId(null), 2000);
      } else {
        alert("Error: " + res.data.error);
      }
    } catch (err) {
      console.error("Cart API call failed:", err);
      alert("Failed to add to cart");
    }
  };

  const filteredArtists = () => {
    const allArtists = [
      ...foundMatches.perfectMatches.map((a) => ({ ...a, type: "perfect" })),
      ...foundMatches.suggestedMatches.map((a) => ({
        ...a,
        type: "suggested",
      })),
    ];

    switch (activeFilter) {
      case "perfect":
        return allArtists.filter((a) => a.type === "perfect");
      case "suggested":
        return allArtists.filter((a) => a.type === "suggested");
      case "purchased":
        return allArtists.filter((a) => purchasedArtists.includes(a._id));
      default:
        return allArtists;
    }
  };

  const renderArtistCard = (artist, index) => {
    const isPurchased = purchasedArtists.includes(artist._id);
    const isInCart = addedItems.includes(artist._id);
    const isPerfectMatch = artist.type === "perfect";

    return (
      <motion.div
        key={`${artist._id}-${index}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-3xl shadow-xl bg-gradient-to-b from-gray-900/80 to-gray-950/90 backdrop-blur-sm border border-white/10 flex flex-col overflow-hidden relative group"
      >
        {isPerfectMatch && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-xs font-bold text-white shadow-lg">
            <Star className="w-3 h-3" />
            <span>Perfect Match</span>
          </div>
        )}

        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-3xl relative">
          <img
            src={artist.imageUrl || fallbackImg}
            alt={artist.displayName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImg;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="p-5 text-white flex-grow space-y-3">
          <h2 className="text-xl font-bold line-clamp-1">
            {artist.displayName}
          </h2>

          {artist.quotes?.[0] && (
            <p className="text-white/70 text-sm italic line-clamp-2">
              "{artist.quotes[0]}"
            </p>
          )}

          <div className="text-sm space-y-2">
            {artist.artistic_background?.roles?.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">🎭</span>
                <span className="text-white/90">
                  {artist.artistic_background.roles.join(", ")}
                </span>
              </div>
            )}

            {artist.identity?.languages?.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">🗣️</span>
                <span className="text-white/90">
                  {artist.identity.languages.join(", ")}
                </span>
              </div>
            )}

            {artist.identity?.location && (
              <div className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">📍</span>
                <span className="text-white/90">
                  {artist.identity.location}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-white/70">
              <Users className="w-4 h-4" />
              <span className="text-xs">312</span>
            </div>

            <div className="flex items-center gap-1">
              <ShoppingCart
                className={`w-4 h-4 ${
                  isInCart ? "text-green-400" : "text-white/50"
                }`}
              />
              <span className="text-xs font-medium text-white/90">
                {artist.priceUSD || "N/A"} SOL
              </span>
            </div>
          </div>

          {isPurchased ? (
            <button
           
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-green-600/90 hover:bg-green-500/90 text-white text-xs font-medium transition-colors"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(artist)}
              disabled={isInCart}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isInCart
                  ? "bg-green-600/90 text-white cursor-default"
                  : "bg-gray-800 hover:bg-gray-700 text-white/90 hover:text-white"
              }`}
            >
              {isInCart ? (
                <>
                  <CheckCircle className="w-3 h-3" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </>
              )}
            </button>
          )}
        </div>

        <AnimatePresence>
          {justAddedId === artist._id && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium z-50 shadow-lg flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3" />
              <span>Added to cart</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
        }
      `}</style>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 lg:px-16 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10"
      >
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto hover:opacity-90 transition-opacity"
          />
        </Link>

        <div className="hidden md:flex gap-6 items-center text-white">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative group text-white/80 hover:text-white transition duration-300 text-sm font-medium"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          <Link
            to="/cart"
            className="relative p-2 hover:text-white text-white/80 transition duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            {addedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {addedItems.length}
              </span>
            )}
          </Link>
        </div>
      </motion.nav>

      <div className="relative z-20 pt-28 px-6 lg:px-16 pb-16 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Artist Matches
          </h1>
          <p className="text-white/80 text-lg">
            {foundMatches.perfectMatches.length > 0
              ? "We found some amazing artists that match your preferences!"
              : "Here are some suggested artists based on your profile"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "all"
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            All Artists
          </button>

          {foundMatches.perfectMatches.length > 0 && (
            <button
              onClick={() => setActiveFilter("perfect")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                activeFilter === "perfect"
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Perfect Matches</span>
            </button>
          )}

          {foundMatches.suggestedMatches.length > 0 && (
            <button
              onClick={() => setActiveFilter("suggested")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                activeFilter === "suggested"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Suggested</span>
            </button>
          )}

          {purchasedArtists.length > 0 && (
            <button
              onClick={() => setActiveFilter("purchased")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                activeFilter === "purchased"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Purchased</span>
            </button>
          )}
        </motion.div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredArtists().length > 0 ? (
              filteredArtists().map((artist, idx) =>
                renderArtistCard(artist, idx)
              )
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white/50" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  No artists found
                </h3>
                <p className="text-white/60 max-w-md mx-auto">
                  {activeFilter === "perfect"
                    ? "No perfect matches available. Try adjusting your preferences."
                    : activeFilter === "purchased"
                    ? "You haven't purchased any artists yet."
                    : "No suggested artists available at the moment."}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {addedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link
              to="/cart"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>View Cart ({addedItems.length})</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Matches;
