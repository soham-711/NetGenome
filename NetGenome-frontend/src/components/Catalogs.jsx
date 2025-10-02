
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFlagUsa, FaThLarge } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Icons
import { Star, User } from "lucide-react";
import { FaMusic } from "react-icons/fa";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaSpotify,
  FaSoundcloud,
  FaApple,
} from "react-icons/fa6";

// Default images (fallbacks when artist data is missing)
import defaultProfileImg from "../assets/artist5.jpg";
import defaultBgImg from "../assets/catalog1.png";
import defaultV2Gif from "../assets/gif9.gif";
import defaultLogo from "../assets/logo.png";
import defaultAlbum1 from "../assets/artist.jpg";
import defaultAlbum2 from "../assets/dawnfm.jpg";
import defaultAlbum3 from "../assets/kiss.jpg";
import defaultAlbum4 from "../assets/starboy.png";
import defaultAlbum5 from "../assets/beauty.jpg";
import defaultAlbum6 from "../assets/trilogy.jpg";
import defaultI15 from "../assets/gif5.gif";
import defaultLaunch1 from "../assets/launch1.png";
import defaultGif6 from "../assets/gif6.gif";
import defaultFooterImg from "../assets/footer-removebg-preview.png";
import defaultBgImage from "../assets/i17.png";
import defaultArtist6 from "../assets/artist6.jpg";
import defaultArtist7 from "../assets/artist7.jpg";
import defaultI18 from "../assets/i18.png";
import defaultI19 from "../assets/i19.png";
import defaultI20 from "../assets/i20.png";
import i21 from "../assets/i21.png";
import i22 from "../assets/i22.png";
import i23 from "../assets/i23.png";
import i24 from "../assets/i24.png";
// Helper components
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.516 8.271-7.444-3.908-7.444 3.908 1.516-8.271-6.064-5.828 8.332-1.151z" />
  </svg>
);

const StarIcon2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-black"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.516 8.271-7.444-3.908-7.444 3.908 1.516-8.271-6.064-5.828 8.332-1.151z" />
  </svg>
);

const MagnifyingGlassIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-black"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const GlassCard = ({ title, children }) => (
  <div
    className="p-6 rounded-2xl border border-white/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
    style={{
      background: "rgba(255, 255, 255, 0.4)",
      backdropFilter: "blur(18px) saturate(200%)",
      WebkitBackdropFilter: "blur(18px) saturate(200%)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    }}
  >
    <h3 className="text-black text-xl font-bold mb-2">{title}</h3>
    <div className="text-black text-sm leading-relaxed">{children}</div>
  </div>
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};
const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

const ReviewCard = ({ name, rating, text, width, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    style={{
      width,
      height: 305,
      position: "relative",
      background: "rgba(255, 255, 255, 0.05)",
      overflow: "hidden",
      borderRadius: 16,
      flexShrink: 0,
      marginBottom: 20,
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.1)",
    }}
  >
    <div
      style={{
        left: 26,
        top: 30,
        position: "absolute",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: width > 800 ? 574 : width > 480 ? 136 : 209,
        display: "inline-flex",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <User size={24} color="white" />
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Monda",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {name}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={20}
            color={i < rating ? "#FFBE0B" : "white"}
            fill={i < rating ? "#FFBE0B" : "none"}
          />
        ))}
      </div>
    </div>

    <div
      style={{
        width: width - 57,
        left: 26,
        top: 82,
        position: "absolute",
        color: "white",
        fontSize: 16,
        fontFamily: "Monda",
        fontWeight: "400",
        wordWrap: "break-word",
      }}
    >
      {text}
    </div>
  </motion.div>
);

const tabs = ["Bio", "Artistic Background", "Career Highlights"];

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [activeTab, setActiveTab] = useState("Bio");
  const [hovered, setHovered] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [activePanel, setActivePanel] = useState("association");
  const [hover, setHover] = useState(false);
  
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.post(
          "https://netgenome-1.onrender.com/api/artist",
          {
            artistId: id,
          }
        );
        setArtist(res.data.artist);
        console.log(res.data.artist);
      } catch (err) {
        console.error("Failed to fetch artist", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center relative">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border border-[#1f2937] rounded-full animate-pulse"></div>
            <div
              className="absolute inset-0 border border-[#1f2937] rounded-full animate-pulse"
              style={{ animationDelay: "0.33s" }}
            ></div>
            <div
              className="absolute inset-0 border border-[#1f2937] rounded-full animate-pulse"
              style={{ animationDelay: "0.66s" }}
            ></div>
            <div className="absolute inset-4 bg-[#374151] rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-[#60A5FA] animate-spin"
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
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="text-xl font-medium text-[#D1D5DB] animate-pulse">
            Loading artist profile...
          </div>
          <div className="text-sm text-[#6B7280] mt-2">
            Preparing something amazing ✨
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <div className="text-2xl font-bold mb-2">Artist not found</div>
          <div className="text-gray-400">
            The artist you're looking for doesn't exist or has been removed.
          </div>
          <Link
            to="/home"
            className="mt-4 inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Helper functions to handle missing data
  const getImage = (img, defaultImg) => img || defaultImg;
  const getArray = (arr) => arr || [];
  const getString = (str, fallback = "Not specified") => str || fallback;

  // Prepare album data with fallbacks
  const albums = getArray(artist.discography).map((item, index) => ({
    src: getImage(artist.imageUrl, [defaultAlbum1, defaultAlbum2, defaultAlbum3, defaultAlbum4, defaultAlbum5, defaultAlbum6][index % 6]),
    name: getString(item?.title, "Untitled Album"),
    releaseDate: item?.year?.toString() || "Unknown",
    label: getString(item?.label, "Independent"),
    details: getString(item?.details, "No details available"),
  }));

  // Prepare reviews from fan/press quotes
  const reviews = getArray(artist.fan_press_quotes).map((quote, index) => ({
    name: ["Rolling Stone", "Pitchfork", "Billboard", "NME"][index % 4],
    rating: 4 + (index % 2),
    text: quote,
    width: index % 2 === 0 ? 482 : 898,
  }));

  // Prepare gallery for availability section
  const gallery = getArray(artist.availability?.current_projects).map(
    (project, i) => ({
      id: i,
      title: project,
      img: getImage(artist.imageUrl, defaultArtist6),
    })
  );

  const filteredGallery = gallery.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
  };

  // Render tab content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Bio":
        return (
          <>
            <p className="text-sm text-gray-300 leading-relaxed">
              {getString(artist.long_narrative, "No biography available.")}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Real Name: {getString(artist.identity?.realName)}
              <br />
              Aliases: {getArray(artist.identity?.aliases).join(", ") || "None"}
              <br />
              Born: {artist.identity?.birthYear || "Unknown"}
              <br />
              Gender: {getString(artist.identity?.gender)}
            </p>
          
          </>
        );
      case "Artistic Background":
        return (
          <div className="space-y-6 overflow-hidden ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Roles Card */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-6 bg-white rounded-full"></div>
                  <h3 className="text-white font-bold text-lg">ROLES</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getArray(artist.artistic_background?.roles).map(
                    (role, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/60 px-3 py-1.5 rounded-lg text-sm text-gray-200 border border-white/10"
                      >
                        {role}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Genres Card */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-6 bg-white rounded-full"></div>
                  <h3 className="text-white font-bold text-lg">GENRES</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getArray(artist.artistic_background?.genres).map(
                    (genre, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/60 px-3 py-1.5 rounded-lg text-sm text-gray-200 border border-white/10"
                      >
                        {genre}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Influences Card */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-6 bg-white rounded-full"></div>
                  <h3 className="text-white font-bold text-lg">INFLUENCES</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getArray(artist.artistic_background?.influences).map(
                    (influence, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/60 px-3 py-1.5 rounded-lg text-sm text-gray-200 border border-white/10"
                      >
                        {influence}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-6 bg-white rounded-full"></div>
                  <h3 className="text-white font-bold text-lg">SKILLS</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getArray(artist.artistic_background?.skills).map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/60 px-3 py-1.5 rounded-lg text-sm text-gray-200 border border-white/10"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Signature Style Card */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-white/10 p-5 rounded-xl backdrop-blur-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-6 bg-white rounded-full"></div>
                <h3 className="text-white font-bold text-lg">
                  SIGNATURE STYLE
                </h3>
              </div>
              <p className="text-gray-300 pl-2">
                {getString(
                  artist.artistic_background?.signature_style,
                  "No signature style specified"
                )}
              </p>
            </div>

            {/* View More Button */}
            <div className="flex justify-center mt-6">
              <button className="text-sm bg-gradient-to-r from-gray-700 to-black border border-white/20 px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center gap-2 group">
                <span>VIEW MORE</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      case "Career Highlights":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Education Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  EDUCATION
                </h3>
                <p className="text-gray-300">
                  {getString(artist.career?.education)}
                </p>
              </div>

              {/* Collaborations Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  COLLABORATIONS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getArray(artist.career?.collaborations).map(
                    (collab, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {collab}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Performances Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  PERFORMANCES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getArray(artist.career?.performances).map(
                    (performance, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {performance}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Awards Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  AWARDS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getArray(artist.career?.awards).map((award, index) => (
                    <span
                      key={index}
                      className="bg-gray-700/50 px-3 py-1 rounded-full text-sm text-gray-300"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Evolution Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  CAREER EVOLUTION
                </h3>
                <p className="text-gray-300">
                  {getString(artist.career?.career_evolution)}
                </p>
              </div>

              {/* Years Active Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  YEARS ACTIVE
                </h3>
                <p className="text-gray-300">
                  {getString(artist.career?.years_active)}
                </p>
              </div>
            </div>

            {/* View More Button */}
            <div className="flex justify-center mt-4">
              <button className="text-sm bg-gradient-to-r from-gray-700 to-black border border-white/20 px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                VIEW MORE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Top Background with Overlay */}
      <motion.div
        className="relative w-full h-[220px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImage(artist.imageUrl, defaultBgImg)})`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 50 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
      </motion.div>

      {/* Additional background section */}
      <motion.div
        className="relative w-full h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(${defaultI18})` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 -mt-100 flex flex-col lg:flex-row max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {/* Left section */}
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
          <img
            src={getImage(artist.imageUrl, defaultProfileImg)}
            alt={artist.displayName}
            className="rounded-full w-40 h-40 object-cover border-4 border-gray-700"
          />
          <div className="mt-6">
            <p className="uppercase text-gray-400 text-sm">Location</p>
            <div className="flex items-center space-x-2 mt-1">
              <FaFlagUsa className="text-red-500" />
              <span>{getString(artist.identity?.location)}</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="uppercase text-gray-400 text-sm">Languages</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {getArray(artist.identity?.languages).map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 text-sm rounded-full bg-gray-800"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="uppercase text-gray-400 text-sm">Vibe Tags</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {getArray(artist.vibeTags).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex-1">
          <p className="text-gray-400 uppercase text-sm">
            {getArray(artist.artistic_background?.roles)[0] || "Artist"}
          </p>

          {/* Artist Name with Stats */}
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <h1 className="text-5xl font-bold">{artist.displayName}</h1>

            {/* Star Rating */}
            <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
              <div className="flex items-center">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      color={i < 4 ? "#FFBE0B" : "#555"}
                      fill={i < 4 ? "#FFBE0B" : "none"}
                    />
                  ))}
              </div>
              <span className="text-sm font-bold ml-1">4.8</span>
            </div>

            {/* Followers Count */}
            <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
              <User size={16} />
              <span className="text-sm font-bold">
                {artist.online_presence?.social_media?.[0]?.followers || "0M"}
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">
              ID : {artist.artistID}
            </span>
            <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">
              Price : {artist.priceUSD?.toLocaleString() || "0"} SOL
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-8 border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition-all ${
                  activeTab === tab
                    ? "text-white border-b-2 border-green-500"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-hide">
            {renderTabContent()}
          </div>
        </div>
      </motion.div>

      {/* Discography Section */}
      {/* Discography Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full min-h-screen bg-black text-white font-monda px-8 py-16"
      >
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Info Section */}
          <div className="lg:w-[25%] flex flex-col space-y-5">
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-purple-500/40 rounded-full blur-xl z-[-1] animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-full blur-md z-[-1]"></div>
                <img
                  src={defaultI20}
                  alt="Artist Logo"
                  className="w-10 h-10 object-contain transition-all duration-500 hover:scale-110"
                />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">DISCOGRAPHY</h1>
            </div>

            {/* Release Date Filter - Updated */}
            <div className="space-y-3">
              <div className="text-white text-xl font-bold">RELEASE DATE</div>

              <div className="flex flex-wrap gap-2">
                {/* "All" filter option */}
                <div
                  onClick={() => setSelectedYear(null)}
                  className={`px-4 py-2 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer ${
                    !selectedYear ? "ring-2 ring-green-500" : ""
                  }`}
                  style={{
                    background:
                      "radial-gradient(ellipse 92.09% 170.98% at 50.00% 50.00%, #242934 0%, #111111 69%)",
                    borderRadius: "11.05px",
                    backdropFilter: "blur(12.78px)",
                  }}
                >
                  <div className="text-white text-sm font-normal">All</div>
                </div>

                {/* Year filter options */}
                {/* Year filter options (0 removed) */}
                {[
                  ...new Set(
                    artist.discography
                      .map((album) => album.year)
                      .filter((year) => typeof year === "number" && year > 0)
                  ),
                ]
                  .sort((a, b) => b - a)
                  .map((year) => (
                    <div
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer ${
                        selectedYear === year ? "ring-2 ring-green-500" : ""
                      }`}
                      style={{
                        background:
                          "radial-gradient(ellipse 92.09% 170.98% at 50.00% 50.00%, #242934 0%, #111111 69%)",
                        borderRadius: "11.05px",
                        backdropFilter: "blur(12.78px)",
                      }}
                    >
                      <div className="text-white text-sm font-normal">
                        {year}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="text-white/40 text-sm font-normal">
                {selectedYear
                  ? `Showing albums from ${selectedYear}`
                  : "Showing all albums"}
              </div>
            </div>

            <h2 className="text-xl md:text-3xl font-bold">RECENTS</h2>
            <p className="text-sm md:text-base leading-relaxed text-justify">
              Explore {artist.displayName}'s musical evolution through each of
              these iconic {artist.discography.length} releases. From ethereal
              sounds to bold lyrical storytelling, this collection showcases
              versatility and emotional depth. Get lost in melodies, lyrics, and
              moods.
            </p>
          </div>

          {/* Album Carousel - Updated */}
          <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-green-500 rounded-md scrollbar-hide">
            <div className="flex gap-6 h-[500px] md:h-[600px]">
             
              {albums
                .filter(
                  (album) =>
                    !selectedYear ||
                    album.releaseDate === selectedYear.toString()
                )
                .map((album, index) => {
                  const isHovered = hovered === index;
                  const isAnyHovered = hovered !== null;

                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-500 flex-shrink-0
                 ${
                   isHovered
                     ? "w-[60vw] md:w-[35vw]"
                     : isAnyHovered
                     ? "w-[7vw] md:w-[6vw]"
                     : index === 0
                     ? "w-[60vw] md:w-[35vw]"
                     : "w-[10vw] md:w-[8vw]"
                 } h-full group cursor-pointer`}
                    >
                      <img
                        src={album.src}
                        alt={`Album ${album.name}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-start p-4 text-white">
                        <p className="text-lg md:text-xl font-bold mb-2">
                          {album.name}
                        </p>
                        <p className="text-sm">Release: {album.releaseDate}</p>
                        <p className="text-sm">Label: {album.label}</p>
                        <p className="text-sm mt-2">{album.details}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Creative Process Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={defaultI15}
            alt="Background"
            className="w-full h-full object-cover z-0 opacity-60 pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/40 z-0" />
        </motion.div>

        <div className="relative z-10 max-w-6xl w-full mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-10 flex items-center gap-2"
          >
            <div className="bg-white p-2 rounded">
              <StarIcon2 />
            </div>
            <span>CREATIVE PROCESSES</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(150, 150, 150, 0.15)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                  <h3 className="text-2xl font-bold text-white">
                    Songwriting Process
                  </h3>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white/40"></div>
                  <p className="text-white/90 pl-6 text-lg leading-relaxed">
                    {getString(
                      artist.creative_process?.songwriting_process,
                      "No songwriting process details available"
                    )}
                  </p>
                </div>

                <p className="mt-6 text-white/80 font-bold text-right">
                  — {artist.displayName}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(150, 150, 150, 0.15)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                  <h3 className="text-2xl font-bold text-white">
                    Production Process
                  </h3>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white/40"></div>
                  <p className="text-white/90 pl-6 text-lg leading-relaxed">
                    {getString(
                      artist.creative_process?.production_process,
                      "No production process details available"
                    )}
                  </p>
                </div>

                <p className="mt-6 text-white/80 font-bold text-right">
                  — {artist.displayName}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-lg md:col-span-2 w-full"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(150, 150, 150, 0.15)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-white rounded-full flex-shrink-0"></div>
                  <h3 className="text-2xl font-bold text-white">
                    Creative Rituals
                  </h3>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white/40"></div>
                  <p className="text-white/90 pl-6 text-lg leading-relaxed">
                    {getString(
                      artist.creative_process?.creative_rituals,
                      "No creative rituals details available"
                    )}
                  </p>
                </div>

                <p className="mt-6 text-white/80 font-bold text-right">
                  — {artist.displayName}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Availability & Opportunities Section */}
      <section
        className="relative w-full min-h-screen flex flex-col items-center p-4 lg:p-10 font-sans"
        style={{
          backgroundImage: `url(${defaultBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-7xl flex flex-col gap-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="bg-black p-2 rounded">
              <StarIcon />
            </div>
            <h1
              className="text-black text-2xl md:text-3xl font-bold tracking-wider"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              AVAILABILITY & OPPORTUNITIES
            </h1>
          </motion.div>

          {/* Search Container */}
          <motion.div
            className="flex gap-2 mt-2 items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0, x: -50 }}
              animate={{
                opacity: searchActive ? 1 : 0,
                scale: searchActive ? 1 : 0,
                x: searchActive ? 0 : -50,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-black p-3 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setSearchActive(false)}
              style={{ display: searchActive ? "flex" : "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </motion.div>

            <motion.div
              className={`px-6 py-3 border border-black bg-white/80 rounded-lg text-black font-bold flex items-center justify-center overflow-hidden relative`}
              animate={{
                width: searchActive ? "280px" : "220px",
                backgroundColor: searchActive
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(255, 255, 255, 0.8)",
                borderColor: searchActive ? "#8b5cf6" : "#000000",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="relative w-full h-6 flex items-center justify-center">
                <motion.span
                  animate={{
                    opacity: searchActive ? 0 : 1,
                    y: searchActive ? -20 : 0,
                    scale: searchActive ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-sm font-bold"
                >
                  CURRENT PROJECTS
                </motion.span>
                <motion.span
                  animate={{
                    opacity: searchActive ? 1 : 0,
                    y: searchActive ? 0 : 20,
                    scale: searchActive ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3, delay: searchActive ? 0.2 : 0 }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-sm font-bold"
                >
                  LOOKING FOR
                </motion.span>
              </div>
            </motion.div>

            <motion.button
              onClick={() => setSearchActive(true)}
              animate={{
                opacity: searchActive ? 0 : 1,
                scale: searchActive ? 0 : 1,
                x: searchActive ? 50 : 0,
                rotate: searchActive ? 180 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-3 border border-black bg-white/80 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-all"
              style={{ display: searchActive ? "none" : "flex" }}
            >
              <MagnifyingGlassIcon />
            </motion.button>
          </motion.div>

          {/* Current Projects Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`relative flex gap-4 mt-4 group ${
              searchActive ? "hidden" : "block"
            }`}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none z-20 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)",
                backdropFilter: "blur(15px) saturate(150%)",
                WebkitBackdropFilter: "blur(15px) saturate(150%)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="text-center">
                <h3 className="text-black text-2xl font-bold mb-2 drop-shadow-lg">
                  ACTIVE COLLABORATIONS
                </h3>
                <p className="text-black/80 text-lg font-medium drop-shadow-md">
                  Currently working on these exciting projects
                </p>
              </div>
            </div>

            {getArray(artist.availability?.current_projects)
              .slice(0, 4)
              .map((project, index) => (
                <motion.div
                  key={`current-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-1 h-56 rounded-lg overflow-hidden shadow-md border border-purple-300 transition-transform relative z-10"
                >
                  <img
                    src={getImage(artist.imageUrl, defaultArtist6)}
                    alt={`Current Project ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold">{project}</h3>
                    <p className="text-white/80 text-sm">
                      Current Collaboration
                    </p>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Looking For Gallery */}
          <div className={`${searchActive ? "block" : "hidden"}`}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex gap-6 mt-4 group"
            >
              {getArray(artist.availability?.looking_for)
                .slice(0, 4)
                .map((item, index) => (
                  <motion.div
                    key={`looking-${index}`}
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex-1 h-56 rounded-2xl overflow-hidden shadow-xl transition-transform relative z-20"
                  >
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    />

                    <div className="relative z-10 w-full h-full">
                      <img
                        src={getImage(artist.imageUrl, defaultArtist7)}
                        alt={`Looking For ${index + 1}`}
                        className="w-full h-full object-cover opacity-80"
                      />

                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 z-20"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                        }}
                      >
                        <h3 className="text-white font-bold text-lg drop-shadow-lg">
                          {item}
                        </h3>
                        <p className="text-white/90 text-sm drop-shadow-md">
                          Looking for collaborators
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {/* Middle Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            <GlassCard title="COMMERCE">
              <p className="text-black text-lg">
                {getString(
                  artist.commerce,
                  "No commerce information available"
                )}
              </p>
              {artist.commerce && (
                <div className="flex justify-center mt-4">
                  <a
                    href={artist.commerce.split(" at ")[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold shadow-lg bg-black hover:scale-105 transition-all duration-300"
                  >
                    Visit Store
                  </a>
                </div>
              )}
            </GlassCard>

            <GlassCard title="SOCIAL IMPACT">
              <p className="text-black text-lg">
                {getString(
                  artist.social_impact,
                  "No social impact information available"
                )}
              </p>
              {artist.social_impact && (
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {getArray(artist.social_impact.split(';')).map(
                    (work, idx) => (
                      <button
                        key={idx}
                        className="px-4 py-2 rounded-full text-white font-bold text-sm shadow-md bg-black hover:scale-105 transition-all duration-300"
                      >
                        {work.trim()}
                      </button>
                    )
                  )}
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Bottom Section */}
         
        </div>
      </section>

{/* CLASSIFICATION AND ASSOCIATION */}
      <section 
  className="relative w-full min-h-screen overflow-hidden"
  style={{ 
    backgroundImage: `url(${i21})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Headline at top left */}
  <motion.div
    className="absolute top-10 left-10 z-10 flex items-center gap-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <FaThLarge className="text-white text-3xl md:text-4xl" />
    <h1 className="text-white text-4xl md:text-6xl font-bold font-monda">
      CLASSIFICATION AND ASSOCIATION
    </h1>
  </motion.div>

  {/* Panels positioned 150px from top on right side */}
  <div className="absolute top-[150px] right-10 z-10 flex gap-8">
    {/* Association Panel */}
    <motion.div
      className={`bg-white/10 backdrop-blur-[25px] rounded-[30px] overflow-hidden cursor-pointer flex flex-col transition-all duration-500 ${
        activePanel === "association" ? "w-[560px]" : "w-[120px]"
      } h-[520px]`}
      onClick={() => setActivePanel("association")}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {activePanel === "association" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="px-6 py-4 flex justify-center items-center"
          >
            <h2 className="text-white text-2xl md:text-3xl font-bold font-monda text-center">
              LAZYINDIE ASSOCIATION
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 flex flex-col flex-grow overflow-y-auto"
          >
            <p className="text-white text-lg md:text-xl font-normal leading-relaxed text-justify">
              {getString(artist.lazie_indie_association, "No association details available.")}
            </p>
            <a
              href="#"
              className="text-[#1e4ae9] text-lg font-normal mt-4 inline-block hover:underline"
            >
              view more
            </a>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {"ASSOCIATION LAZYINDIE".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="text-white/50 text-center text-xl md:text-2xl rotate-180 font-bold font-monda"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                style={{ 
                  writingMode: "vertical-rl", 
                  textOrientation: "mixed",
                  margin: "8px 0"
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>

    {/* Summary Panel */}
    <motion.div
      className={`bg-white/10 backdrop-blur-[25px] rounded-[30px] overflow-hidden cursor-pointer flex flex-col transition-all duration-500 ${
        activePanel === "summary" ? "w-[560px]" : "w-[120px]"
      } h-[520px]`}
      onClick={() => setActivePanel("summary")}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {activePanel === "summary" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="px-6 py-4 flex justify-center items-center"
          >
            <h2 className="text-white text-2xl md:text-3xl font-bold font-monda text-center">
              SUMMARY NARRATIVE
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 flex flex-col flex-grow overflow-y-auto"
          >
            <p className="text-white text-lg md:text-xl font-normal leading-relaxed text-justify">
              {getString(artist.long_narrative, "No summary narrative available.")}
            </p>
            <a
              href="#"
              className="text-[#1e4ae9] text-lg font-normal mt-4 inline-block hover:underline"
            >
              view more
            </a>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {"SUMMARY NARRATIVE".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="text-white/50 text-center text-xl md:text-2xl font-bold font-monda"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                style={{ 
                  writingMode: "vertical-rl", 
                  textOrientation: "mixed",
                  margin: "8px 0"
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  </div>
</section>


      {/* Review Section (Online Presence) */}
      <section className="w-full px-4 md:px-20 py-16 bg-black text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <img
              src={defaultI19}
              alt="Online Presence"
              className="w-8 h-8 object-contain"
            />
            <span>ONLINE PRESENCE</span>
          </h2>
          <p className="mt-2 font-semibold uppercase">Fan & Press Quotes</p>
          <p className="text-sm text-white/50 mt-1">Scroll to explore →</p>
        </motion.div>

        {reviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative scrollbar-hide"
          >
            <div
              className="flex gap-5 overflow-x-auto max-w-[100%] pb-4 scroll-smooth scrollbar-hide"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}
            >
              {reviews.map((review, idx) => (
                <ReviewCard key={idx} index={idx} {...review} />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No reviews or press quotes available yet.
          </div>
        )}
      </section>

      {/* Social Media Section */}
   
{/* social media */}
      <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
        {/* Background Hands */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img
            src={defaultLaunch1}
            alt="Top Right Hands"
            className="absolute right-0 bottom-35 w-[50vw] max-w-[900px] rotate-[260deg] z-0 opacity-80"
          />
          <img
            src={defaultLaunch1}
            alt="Bottom Left Hands"
            className="absolute top-35 left-0 w-[50vw] max-w-[900px] rotate-[90deg] z-0 opacity-80"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-between h-full py-16 px-6 text-white w-full max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold w-full mb-12"
          >
            SOCIAL MEDIA
          </motion.h2>

          {getArray(artist.online_presence?.social_media).length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-around gap-8 w-full"
            >
              {/* Left Socials */}
              <div className="flex flex-col items-center md:items-start gap-10 text-sm">
                {getArray(artist.online_presence?.social_media)
                  .slice(0, 2)
                  .map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center md:items-start text-center md:text-left hover:scale-105 transition-transform"
                    >
                      {social.platform === "Instagram" && (
                        <FaInstagram size={28} className="text-pink-500 mb-2" />
                      )}
                      {social.platform === "Facebook" && (
                        <FaFacebookF size={28} className="text-blue-400 mb-2" />
                      )}
                      <span className="uppercase font-semibold">
                        {social.platform}
                      </span>
                      <span className="text-white/70">
                        {social.url.split("/").pop()}
                      </span>
                      <span className="text-white/70">
                        {social.followers || "Followers not specified"}
                      </span>
                    </a>
                  ))}
              </div>

              {/* Center Globe */}
              <div className="flex-shrink-0 w-52 md:w-72 lg:w-96 opacity-70">
                <img
                  src={defaultGif6}
                  alt="Globe Animation"
                  className="w-full h-auto"
                />
              </div>

              {/* Right Socials */}
              <div className="flex flex-col items-center md:items-end gap-10 text-sm">
                {getArray(artist.online_presence?.social_media)
                  .slice(2)
                  .map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center md:items-end text-center md:text-right hover:scale-105 transition-transform"
                    >
                      {social.platform === "YouTube" && (
                        <FaYoutube size={28} className="text-red-600 mb-2" />
                      )}
                      {social.platform === "Twitter/X" && (
                        <FaXTwitter size={28} className="text-white mb-2" />
                      )}
                      <span className="uppercase font-semibold">
                        {social.platform}
                      </span>
                      <span className="text-white/70">
                        {social.url.split("/").pop()}
                      </span>
                      <span className="text-white/70">
                        {social.followers || "Followers not specified"}
                      </span>
                    </a>
                  ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-400">
              No social media links available
            </div>
          )}
        </div>
      </section>

      {/* Professional Press Coverage Section */}
      <section className="w-full px-4 md:px-20 py-16 bg-black text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <span></span>PROFESSIONAL PRESS COVERAGE
          </h2>
        </motion.div>

        {reviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}
            >
              {reviews.map((review, idx) => (
                <ReviewCard key={idx} index={idx} {...review} />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No professional press coverage available yet.
          </div>
        )}
      </section>

      {/* Streaming Platforms and Quotes Section with Background GIF */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={defaultV2Gif}
            alt="Background Animation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content container with proper z-index and max-width */}
        <div className="relative z-10 w-full max-w-6xl px-4">
          {/* Flex container for cards with responsive layout */}
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Streaming Platforms Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 font-monda"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <FaMusic className="text-green-400" size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white font-recoleta">
                  STREAMING PLATFORMS
                </h2>
              </div>

              <p className="text-sm text-white/60 mb-4 font-gilroy-regular">
                Now streaming on various platforms with{" "}
                {artist.online_presence?.streaming_platforms?.[0]?.stats ||
                  "thousands of monthly listeners"}
              </p>

              {artist.online_presence?.streaming_platforms?.length > 0 ? (
                <div className="space-y-3 overflow-y-auto max-h-[300px] scrollbar-hide">
                  {artist.online_presence.streaming_platforms.map(
                    (platform, idx) => (
                      <a
                        key={idx}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 font-gilroy-regular"
                      >
                        <div className="bg-black/30 p-2 rounded-lg">
                          {platform.platform === "Apple Music" && (
                            <FaApple size={20} className="text-rose-500" />
                          )}
                          {platform.platform === "Spotify" && (
                            <FaSpotify size={20} className="text-green-500" />
                          )}
                          {platform.platform === "SoundCloud" && (
                            <FaSoundcloud
                              size={20}
                              className="text-orange-500"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate">
                            {platform.platform}
                          </h3>
                          {platform.stats && (
                            <p className="text-xs text-white/60 truncate">
                              {platform.stats}
                            </p>
                          )}
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white/50"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-6 font-gilroy-regular">
                  <p className="text-white/60">No streaming platforms listed</p>
                  {artist.online_presence?.website && (
                    <a
                      href={artist.online_presence.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 text-white text-sm"
                    >
                      Visit Official Website
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* Quotes Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-1/2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 font-monda"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white font-recoleta">
                  QUOTES & TESTIMONIALS
                </h2>
              </div>

              {artist.quotes?.length > 0 ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                  {artist.quotes.map((quote, idx) => (
                    <div
                      key={idx}
                      className="relative pl-5 mb-4 font-gilroy-regular"
                    >
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                      <p className="text-white/80 text-sm md:text-base">
                        "{quote}"
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-purple-300 font-medium font-gilroy-ultralight-italic">
                        — {artist.displayName}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 font-gilroy-regular">
                  <p className="text-white/60">No quotes available yet</p>
                  {artist.fan_press_quotes?.length > 0 && (
                    <button
                      onClick={() => setShowPressQuotes(true)}
                      className="inline-block mt-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 text-white text-sm"
                    >
                      View Press Quotes
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

{/* new features */}
            <section
  className="relative h-[50vh] bg-fixed bg-center bg-cover"
  style={{
    backgroundImage: `url(${i22})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
>
  {/* Optional overlay content */}
</section>


<section
  className="relative h-[801px] w-full bg-center bg-cover flex items-center justify-center"
  style={{ backgroundImage: `url(${i23})` }}
  onMouseEnter={() => setHover(true)} // Only set once
>
  <div className="max-w-[1545px] px-6 flex flex-col items-center gap-8 text-center">
    {artist?.long_narrative ? (
      artist.long_narrative.split('. ').map((sentence, index, arr) => (
        <motion.p
          key={index}
          className="text-white text-2xl font-normal font-['Monda'] max-w-[1524px]"
          variants={fadeUpVariant}
          initial="hidden"
          animate={hover ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {`“ ${sentence.trim()}${index < arr.length - 1 ? '.' : ''} “`}
        </motion.p>
      ))
    ) : (
      <p className="text-white text-xl font-light italic">
        No description available.
      </p>
    )}
  </div>
</section>


<section
  className="relative w-full min-h-[80vh] bg-center bg-cover px-4 py-16 md:px-12 lg:px-20 overflow-hidden"
  style={{ 
    backgroundImage: `url(${i24})`,
   
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }}
>
  {/* Decorative elements */}
  <div className="absolute inset-0 bg-black/40 z-0" />
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-300/30 to-transparent z-10" />
  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-300/30 to-transparent z-10" />

  {/* Content container */}
  <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
    {/* Heading with animated reveal */}
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="text-white font-['Monda'] font-bold text-4xl md:text-6xl lg:text-7xl mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400">
          OFFICIAL CLASSIFICATION
        </span>
      </h2>
      <div className="w-32 h-1 bg-gradient-to-r from-cyan-300 to-teal-400 mx-auto my-4" />
      <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
        {artist.displayName} has been officially recognized under the prestigious Lazie Indie classification system
      </p>
    </motion.div>

    {/* Classification card with shine effect */}
    <motion.div
      className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-teal-300/20 rounded-3xl p-8 md:p-12 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ boxShadow: '0 0 30px rgba(94, 234, 212, 0.2)' }}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(94,234,212,0.1)_0%,rgba(94,234,212,0)_70%)] animate-[shine_3s_infinite]"></div>
        </div>
      </div>

      {/* Classification content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-teal-400/20 p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Lazie Indie Certified Artist
          </h3>
        </div>

        <div className="prose prose-invert max-w-none text-center">
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            After careful evaluation by our expert panel, {artist.displayName} meets all criteria for inclusion in the Lazie Indie network of exceptional independent artists.
          </p>

          <div className="bg-black/30 p-6 rounded-xl border border-teal-300/20 mb-6">
            <p className="text-teal-300 font-medium italic text-lg">
              "{getString(artist.classification, "This artist demonstrates exceptional creativity and independence in their musical journey.")}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-black/20 p-4 rounded-lg border border-teal-300/10">
              <h4 className="text-cyan-300 font-bold mb-2">Artistic Merit</h4>
              <p className="text-sm">Recognized for unique creative vision</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-teal-300/10">
              <h4 className="text-cyan-300 font-bold mb-2">Independence</h4>
              <p className="text-sm">Maintains creative control</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-teal-300/10">
              <h4 className="text-cyan-300 font-bold mb-2">Potential</h4>
              <p className="text-sm">Identified for future growth</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Badge at bottom */}
    <motion.div
      className="mt-12 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="bg-gradient-to-r from-cyan-400 to-teal-500 text-black px-6 py-2 rounded-full font-bold text-sm mb-2">
        OFFICIAL DOCUMENT
      </div>
      <p className="text-teal-300/60 text-sm">Classification ID: {artist.artistID}</p>
    </motion.div>
  </div>

  {/* Floating decorative elements */}
  <div className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-cyan-300/20 blur-md animate-float1" />
  <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-teal-400/20 blur-md animate-float2" />
  <div className="absolute bottom-1/4 left-1/4 w-10 h-10 rounded-full bg-cyan-300/30 blur-md animate-float3" />
</section>


      {/* Footer Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-[#181818] text-white px-6 md:px-24 pt-12 pb-0"
      >
        <footer className="text-white text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="max-w-md">
              <p className="text-lg font-serif">
                NetGenome is the platform
                <br />
                every music artist dreams of.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white/60 mb-2">LEGAL</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#">Terms and Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white/60 mb-2">SOCIALS</h4>
                <ul className="space-y-1">
                  {getArray(artist.online_presence?.social_media)
                    .slice(0, 3)
                    .map((social, idx) => (
                      <li key={idx}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.platform}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white/60 mb-2">IMPORTANT</h4>
                <ul className="space-y-1">
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <a href="#">Find Artist</a>
                  </li>
                  <li>
                    <a href="#">Sponsors</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full mt-12">
            <img
              src={defaultFooterImg}
              alt="Footer Decoration"
              className="w-full object-contain object-bottom select-none pointer-events-none"
            />
          </div>
        </footer>
      </motion.section>
    </div>
  );
};

export default ArtistProfile;

