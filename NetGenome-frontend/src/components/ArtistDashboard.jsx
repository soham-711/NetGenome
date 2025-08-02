// import React, { useState } from 'react';
// import { Edit3, Eye, Settings, ChevronDown, Home, Users, Calendar, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from "axios"
// export default function NetGenomeDashboard() {
//   const [activeModal, setActiveModal] = useState(null);
//   const [artistId, setArtistId] = useState('');
//   // Change this to fetch dynamically if needed
//   const [artistPic] = useState('https://ui-avatars.com/api/?name=Artist+Name&background=6D28D9&color=fff');

//   const openModal = (modalType) => {
//     setActiveModal(modalType);
//     document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
//   };

//   const closeModal = () => {
//     setActiveModal(null);
//     setArtistId('');
//     document.body.style.overflow = 'auto';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Here you would typically make an API call with the artistId
//     try{
//     console.log(`Processing ${activeModal} for artist ID: ${artistId}`);

//    const response = await axios.post("http://localhost:5000/api/artist/by-id",{
//   artistID: artistId
//     })
//   console.log(response.data)

//     }catch(error){

//     }

//     closeModal();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-indigo-900 to-neutral-900">
//       {/* Header */}
//       <header className="flex items-center justify-between p-6 border-b border-slate-700/50">
//         <div className="flex items-center space-x-6">
//           <img
//             src={artistPic}
//             alt="Artist"
//             className="w-14 h-14 rounded-full object-cover ring-4 ring-fuchsia-800 shadow-lg"
//           />
//           <motion.h1
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-2xl font-bold text-white"
//           >
//             NetGenome
//           </motion.h1>
//           <motion.h2
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="text-lg text-slate-300 tracking-wider"
//           >
//             ARTIST DASHBOARD
//           </motion.h2>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="flex items-center space-x-4"
//         >
//           <div className="flex items-center space-x-2 text-white">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
//             <span>Settings</span>
//             <ChevronDown className="w-4 h-4" />
//           </div>
//         </motion.div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-20 p-6 space-y-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="flex flex-col items-center space-y-6"
//           >
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//               <Home className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//               <Edit3 className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//               <Users className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//               <Calendar className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
//             </motion.div>
//           </motion.div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">

//             {/* Edit My Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               whileHover={{ y: -5 }}
//               className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
//             >
//               <div className="flex items-start space-x-4 mb-6">
//                 <motion.div
//                   animate={{
//                     rotate: [0, 10, -10, 0],
//                     scale: [1, 1.1, 1.1, 1]
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     repeatDelay: 3
//                   }}
//                   className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
//                 >
//                   <Edit3 className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white mb-2">EDIT MY PROFILE</h3>
//                   <p className="text-slate-400 text-sm">Customize your artist identity</p>
//                 </div>
//               </div>

//               <p className="text-slate-300 mb-8 leading-relaxed">
//                 Edit your bio, genres, media, and more using the universal profile schema.
//               </p>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => openModal('edit')}
//                 className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-200"
//               >
//                 EDIT PROFILE
//               </motion.button>
//             </motion.div>

//             {/* View My Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1 }}
//               whileHover={{ y: -5 }}
//               className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
//             >
//               <div className="flex items-start space-x-4 mb-6">
//                 <motion.div
//                   animate={{
//                     rotate: [0, 10, -10, 0],
//                     scale: [1, 1.1, 1.1, 1]
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                     repeatDelay: 3,
//                     delay: 0.5
//                   }}
//                   className="p-3 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl"
//                 >
//                   <Eye className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white mb-2">VIEW MY PROFILE</h3>
//                   <p className="text-slate-400 text-sm">Preview your public artist page</p>
//                 </div>
//               </div>

//               <p className="text-slate-300 mb-8 leading-relaxed">
//                 See how others view your musical identity
//               </p>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => openModal('view')}
//                 className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-200"
//               >
//                 VIEW PAGE
//               </motion.button>
//             </motion.div>

//           </div>
//         </main>

//         {/* Right Sidebar */}
//         <aside className="w-64 p-6 space-y-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2 }}
//             className="text-right space-y-2"
//           >
//             <div className="text-white font-medium">Socout</div>
//             <div className="text-slate-400">Settings</div>
//           </motion.div>
//         </aside>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {activeModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
//             onClick={closeModal}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 50 }}
//               className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-700/50 relative"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>

//               <div className="flex items-center space-x-4 mb-6">
//                 <div className={`p-3 rounded-xl ${activeModal === 'edit' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-teal-600 to-blue-600'}`}>
//                   {activeModal === 'edit' ? (
//                     <Edit3 className="w-6 h-6 text-white" />
//                   ) : (
//                     <Eye className="w-6 h-6 text-white" />
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     {activeModal === 'edit' ? 'EDIT PROFILE' : 'VIEW PROFILE'}
//                   </h3>
//                   <p className="text-slate-400 text-sm">
//                     {activeModal === 'edit' ? 'Enter your artist ID to edit profile' : 'Enter artist ID to view profile'}
//                   </p>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-6">
//                   <label htmlFor="artistId" className="block text-slate-300 mb-2">Artist ID</label>
//                   <input
//                     type="text"
//                     id="artistId"
//                     value={artistId}
//                     onChange={(e) => setArtistId(e.target.value)}
//                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     placeholder="Enter your artist ID"
//                     required
//                   />
//                 </div>

//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     type="submit"
//                     className={`w-full py-3 text-white font-medium rounded-lg transition-colors duration-200 ${activeModal === 'edit' ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700'}`}
//                   >
//                     {activeModal === 'edit' ? 'EDIT PROFILE' : 'VIEW PROFILE'}
//                   </motion.button>
//                 </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { FiEye, FiUser } from "react-icons/fi";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import your actual images from the assets folder
import bgImage from "../assets/i16.jpg";
import artist1 from "../assets/artist1.jpg";
import artist2 from "../assets/artist2.jpg";
import artist3 from "../assets/artist3.jpg";
import artist4 from "../assets/artist4.jpg";
import gif10 from "../assets/gif10.gif";
import gif12 from "../assets/gif12.gif";
import logo from "../assets/logo.png";
import viewImage from "../assets/view.jpg";
import progressImage from "../assets/gif11.gif";

const artists = [
  { name: "Weeknd", genre: "singer", price: "$2,400", image: artist1 },
  { name: "Arijit", genre: "singer", price: "$1,800", image: artist2 },
  { name: "Krsna", genre: "rapper", price: "$2,000", image: artist3 },
  { name: "Taylor", genre: "singer", price: "$3,000", image: artist4 },
  { name: "Ed Sheeran", genre: "singer", price: "$2,200", image: artist1 },
];

// Enhanced Card Component without glass effect
const Card = ({ children, className = "" }) => (
  <motion.div
    className={`p-6 rounded-3xl bg-black/50 border border-white/10 hover:bg-black/70 transition-all duration-300 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const ArtistDashboard = () => {
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeModal, setActiveModal] = useState(null);
  const [artistId, setArtistId] = useState("");
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const handleNextArtist = () => {
    setCurrentArtistIndex((prevIndex) => (prevIndex + 1) % artists.length);
  };

  const handlePrevArtist = () => {
    setCurrentArtistIndex(
      (prevIndex) => (prevIndex - 1 + artists.length) % artists.length
    );
  };

  // Enhanced auto-swap with pause on hover
  useEffect(() => {
    let interval;
    const startInterval = () => {
      interval = setInterval(handleNextArtist, 3000);
    };

    const container = document.querySelector(".artist-carousel-container");
    if (container) {
      container.addEventListener("mouseenter", () => clearInterval(interval));
      container.addEventListener("mouseleave", startInterval);
    }

    startInterval();
    return () => {
      clearInterval(interval);
      if (container) {
        container.removeEventListener("mouseenter", () =>
          clearInterval(interval)
        );
        container.removeEventListener("mouseleave", startInterval);
      }
    };
  }, []);

  // Calendar logic remains the same
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      today.getDate() === i &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear;
    const hasEvent = [3, 10, 17].includes(i);
    const eventColors = hasEvent ? ["blue", "purple", "teal"] : [];
    calendarDays.push({ date: i, events: eventColors, isToday });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const liveProgressPercentage = Math.floor(
    (currentTime.getSeconds() / 60) * 100
  );

  // Modal handlers
  const openModal = (modalType) => {
    setActiveModal(modalType);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    setArtistId("");
    document.body.style.overflow = "auto";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://netgenome-1.onrender.com/api/artist/by-id",
        {
          artistID: artistId,
        }
      );

      if (activeModal === "edit") {
        navigate("/artist/edit-profile", { state: response.data });
      } else if (activeModal === "view") {
        navigate("/artist/profile", { state: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch artist profile:", error);
    }
    closeModal();
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-white font-monda p-8 md:p-16 relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-[1920px] mx-auto">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="NetGenome Logo"
              className="h-12 md:h-16 object-contain"
            />
            <span className="text-xl hidden md:block">Artist Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Removed glass effect from header items */}
            <div className="hidden md:flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10">
              <FiUser />
              <span className="text-xl font-monda">Welcome</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10">
              <FaCalendarAlt />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Subscriptions Card */}
            <Card className="h-[400px] flex flex-col overflow-hidden artist-carousel-container">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div className="text-xl font-bold flex items-center gap-2">
                  <span className="text-yellow-400">★</span> Your Subscriptions
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevArtist}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                  >
                    <FaChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNextArtist}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                  >
                    <FaChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-2xl">
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentArtistIndex * 100}%)`,
                  }}
                >
                  {artists.map((artist, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full h-full relative"
                    >
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <div className="text-base text-white/70 mb-1">
                          {artist.genre}
                        </div>
                        <div className="text-3xl font-bold mb-3">
                          {artist.name}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg text-white/90">
                            {artist.price}
                          </span>
                          <span className="px-4 py-1 text-sm bg-black/60 rounded-full border border-yellow-400/30">
                            Subscribed
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Enhanced Progress Card */}
            <Card className="h-[220px] relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${progressImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-400/20 rounded-full">
                    <FaCheck className="text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold">Monthly Progress</h3>
                </div>
                <div className="mt-2 text-7xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  {liveProgressPercentage}%
                </div>
                <div className="text-lg text-white/70 mt-2">
                  Current milestone
                </div>
                <div className="w-full h-2.5 mt-4 rounded-full bg-white/20 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000"
                    style={{ width: `${liveProgressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          </div>

          {/* Column 2 */}
          <div className="lg:col-span-1 space-y-30">
            {/* Enhanced Edit Profile Card */}
            <Card className="relative overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${gif10})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-400/20 rounded-full">
                    <FaEdit className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Edit Your Profile</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Customize your artist profile to showcase your unique style
                  and connect with fans. Update your bio, social links, and
                  portfolio to attract more collaborations.
                </p>
                <button
                  onClick={() => openModal("edit")}
                  className="w-full py-3 rounded-lg text-lg font-semibold text-white
                           bg-white-500/30 hover:bg-white/0
                           backdrop-blur-md border border-white/20
                           hover:shadow-lg transition-all mt-20"
                >
                  EDIT PROFILE
                </button>
              </div>
            </Card>

            {/* Enhanced Cards Section */}
            <div className="flex gap-6">
              {/* AI Matchmaking Card - already bg-black */}
              <Card className="h-[220px] flex flex-col bg-black">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold">
                      AI
                    </div>
                    <h3 className="text-xl font-bold">MATCHMAKING</h3>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                    Our advanced AI finds perfect collaborators based on your
                    music style, preferences, and career goals.
                  </p>
                </div>
                <button className="mt-auto w-full py-2 border border-white/30 rounded-lg text-lg font-semibold hover:bg-white/10 transition">
                  EXPLORE
                </button>
              </Card>

              {/* Collab Invites Card - removed glass effect from items */}
              <Card className="h-[220px] flex flex-col bg-gradient-to-br from-blue-900/80 to-black">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                    CI
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    COLLAB INVITES
                  </h3>
                </div>
                <div className="space-y-2 overflow-y-auto flex-grow">
                  {[
                    "New request from DJ Khaled",
                    "Producer XYZ wants to work",
                    "Featured artist opportunity",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-2 bg-white/5 rounded-lg text-sm text-white hover:bg-white/10 transition"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Column 3 */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced View Profile Card */}
            <Card className="relative overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${viewImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-400/20 rounded-full">
                    <FiEye className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold">View Your Profile</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  See how fans and collaborators view your profile. Make sure it
                  effectively represents your brand and artistic identity.
                </p>
                <button
                  onClick={() => openModal("view")}
                  className="w-full py-3 rounded-lg text-lg font-semibold text-white
                           bg-white-500/30 hover:bg-white/0
                           backdrop-blur-md border border-white/20
                           hover:shadow-lg transition-all"
                >
                  VIEW PROFILE
                </button>
              </div>
            </Card>

            {/* Combined Calendar and Events Card - already bg-black */}
            <Card className="flex flex-col lg:flex-row bg-black rounded-2xl overflow-hidden h-[550px] w-[500px]">
              {/* Calendar Section */}
              <div className="lg:w-1/2 p-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold">
                    {monthNames[currentMonth]}{" "}
                    <span className="text-red-500">{currentYear}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-white/10 rounded-full transition"
                    >
                      <FaChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-white/10 rounded-full transition"
                    >
                      <FaChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="py-1 text-white/70">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className="min-h-[50px] p-1 flex flex-col items-center"
                    >
                      {day ? (
                        <>
                          <div
                            className={`
                            w-8 h-8 flex items-center justify-center rounded-full
                            ${
                              day.isToday
                                ? "bg-red-500 text-black font-bold"
                                : day.events.length > 0
                                ? "text-white"
                                : "text-white/50"
                            }
                            transition-colors duration-200
                          `}
                          >
                            {day.date}
                          </div>
                          {day.events.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {day.events.map((color, i) => (
                                <div
                                  key={i}
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    color === "blue"
                                      ? "bg-blue-500"
                                      : color === "purple"
                                      ? "bg-purple-500"
                                      : "bg-teal-500"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="h-8" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px bg-white/10 my-6" />

              {/* Events Panel */}
              <div className="lg:w-1/2 p-6 flex flex-col overflow-y-auto">
                <div className="text-xl font-bold mb-4">Upcoming Events</div>
                <div className="space-y-4 flex-grow">
                  {/* Today's Events */}
                  <div className="mb-6">
                    <div className="text-lg font-semibold mb-2">
                      TODAY •{" "}
                      {today.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                        <div className="font-medium mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          All Hands Company Meeting
                        </div>
                        <div className="text-sm text-white/70">
                          8:30 - 9:00 AM
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                        <div className="font-medium mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Quarterly Review
                        </div>
                        <div className="text-sm text-white/70">
                          9:30 - 10:30 AM
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tomorrow's Events */}
                  <div>
                    <div className="text-lg font-semibold mb-2">
                      TOMORROW •{" "}
                      {new Date(today.getTime() + 86400000).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                      <div className="font-medium mb-1 flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        Product Discussion
                      </div>
                      <div className="text-sm text-white/70">
                        10:00 - 11:00 AM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="relative z-1 -mt-20 text-center py-1 rounded-t-3xl overflow-hidden w-4xl"
        style={{
          backgroundImage: `url(${gif12})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-20 text-white">
          <p className="text-xl font-bold">NetGenome</p>
          <p className="text-sm text-white/70 mt-2">
            © 2024 All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glossy gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f8] to-[#e0e0e0] opacity-20"></div>

              {/* Main content */}
              <div className="relative bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-[#333333]">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${
                          activeModal === "edit"
                            ? "from-[#444444] to-[#2a2a2a]"
                            : "from-[#3a3a3a] to-[#1f1f1f]"
                        }`}
                      >
                        {activeModal === "edit" ? (
                          <FaEdit className="w-5 h-5 text-[#f0f0f0]" />
                        ) : (
                          <FiEye className="w-5 h-5 text-[#f0f0f0]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#f0f0f0]">
                          {activeModal === "edit"
                            ? "Edit Profile"
                            : "View Profile"}
                        </h3>
                        <p className="text-[#a0a0a0] text-sm mt-1">
                          {activeModal === "edit"
                            ? "Enter your artist ID to continue"
                            : "Enter artist ID to view your profile"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-[#a0a0a0] hover:text-[#f0f0f0] transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="mb-6">
                    <label
                      htmlFor="artistId"
                      className="block text-[#c0c0c0] text-sm font-medium mb-2"
                    >
                      Artist ID
                    </label>
                    <input
                      type="text"
                      id="artistId"
                      value={artistId}
                      onChange={(e) => setArtistId(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-3 text-[#f0f0f0] focus:outline-none focus:ring-1 focus:ring-[#a0a0a0] placeholder-[#6a6a6a] transition-all"
                      placeholder="Enter your Artist ID (e.g., 'weeknd', 'taylorswift')"
                      required
                      autoFocus
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full py-3 font-medium rounded-lg transition-all bg-gradient-to-br ${
                      activeModal === "edit"
                        ? "from-[#3a3a3a] to-[#2a2a2a] hover:from-[#4a4a4a] hover:to-[#3a3a3a]"
                        : "from-[#2a2a2a] to-[#3a3a3a] hover:from-[#3a3a3a] hover:to-[#4a4a4a]"
                    } text-[#f0f0f0] border border-[#3a3a3a] shadow-sm`}
                  >
                    {activeModal === "edit"
                      ? "Continue Editing"
                      : "View Profile"}
                  </motion.button>
                </form>

                {/* Footer */}
                <div className="px-6 pb-6 text-center">
                  <p className="text-xs text-[#808080]">
                    Need help?{" "}
                    <span className="text-[#c0c0c0] hover:text-[#f0f0f0] cursor-pointer transition-colors">
                      Contact support
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistDashboard;
