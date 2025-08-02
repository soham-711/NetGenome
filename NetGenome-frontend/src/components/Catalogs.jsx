// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import artistPic from "../assets/artist7.jpg";
// import backgroundImg from "../assets/catalog.png";
// import {
//   CalendarDays,
//   Instagram,
//   Twitter,
//   Youtube,
//   Music,
//   Play,
//   Heart,
//   Share2,
//   MoreHorizontal,
// } from "lucide-react";

// export default function Catalog() {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [activeTab, setActiveTab] = useState("tracks");

//   const recentTracks = [
//     { title: "Tum Hi Ho", duration: "4:22", plays: "88M", isFavorite: true },
//     { title: "Raabta", duration: "3:45", plays: "54M", isFavorite: false },
//     {
//       title: "Channa Mereya",
//       duration: "5:02",
//       plays: "72M",
//       isFavorite: true,
//     },
//   ];

//   const upcomingEvents = [
//     {
//       name: "Delhi Live",
//       date: "Aug 20, 2025",
//       venue: "Jawaharlal Nehru Stadium",
//     },
//     { name: "Mumbai Unplugged", date: "Sep 5, 2025", venue: "NSCI Dome" },
//     { name: "Bangalore Nights", date: "Oct 12, 2025", venue: "Palace Grounds" },
//   ];

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-fixed bg-center relative overflow-y-auto"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), url(${backgroundImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Custom scrollbar */}
//       <style>{`
//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
//         ::-webkit-scrollbar-thumb {
//           background: rgba(255,255,255,0.3);
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: rgba(255,255,255,0.4);
//         }
//       `}</style>

//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20"
//       >
//         {/* Artist Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
//           <motion.div whileHover={{ scale: 1.03 }} className="relative group">
//             <img
//               src={artistPic}
//               alt="Arijit Singh"
//               className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-white/20 group-hover:border-purple-500/50 transition-all"
//             />
//             <div className="absolute inset-0 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//               <Play className="w-8 h-8 text-white" fill="currentColor" />
//             </div>
//           </motion.div>

//           <div className="flex-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-white text-3xl sm:text-4xl font-bold">
//                   Arijit Singh
//                 </h1>
//                 <p className="text-gray-300 mt-1 flex items-center">
//                   <span className="flex items-center">
//                     <Music className="w-4 h-4 mr-1" />
//                     Bollywood | Indie | Acoustic
//                   </span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsFollowing(!isFollowing)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   isFollowing
//                     ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                     : "bg-purple-600 text-white hover:bg-purple-700"
//                 }`}
//               >
//                 {isFollowing ? "Following" : "Follow"}
//               </button>
//             </div>

//             <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
//               <div className="flex items-center text-gray-300">
//                 <span className="font-semibold text-white mr-1">12.3M</span>{" "}
//                 Followers
//               </div>
//               <div className="flex items-center text-gray-300">
//                 <span className="font-semibold text-white mr-1">250+</span>{" "}
//                 Tracks
//               </div>
//               <div className="flex items-center text-gray-300">
//                 <span className="font-semibold text-white mr-1">5.6M</span>{" "}
//                 Likes
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-700 mt-8">
//           {["tracks", "events", "about"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-3 text-sm font-medium relative ${
//                 activeTab === tab
//                   ? "text-white"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               {activeTab === tab && (
//                 <motion.div
//                   layoutId="tabIndicator"
//                   className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
//                 />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="mt-6"
//           >
//             {activeTab === "tracks" && (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   Popular Tracks
//                 </h2>
//                 {recentTracks.map((track, idx) => (
//                   <div
//                     key={idx}
//                     className="group flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-colors"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="relative">
//                         <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
//                           <Music className="text-gray-400" />
//                         </div>
//                         <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded transition-opacity">
//                           <Play
//                             className="w-5 h-5 text-white"
//                             fill="currentColor"
//                           />
//                         </button>
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-white">
//                           {track.title}
//                         </h3>
//                         <p className="text-sm text-gray-400">
//                           {track.duration} • {track.plays} plays
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <button className="text-gray-400 hover:text-white transition-colors">
//                         <Heart
//                           className={`w-5 h-5 ${
//                             track.isFavorite ? "fill-red-500 text-red-500" : ""
//                           }`}
//                         />
//                       </button>
//                       <button className="text-gray-400 hover:text-white transition-colors">
//                         <Share2 className="w-5 h-5" />
//                       </button>
//                       <button className="text-gray-400 hover:text-white transition-colors">
//                         <MoreHorizontal className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === "events" && (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   Upcoming Events
//                 </h2>
//                 {upcomingEvents.map((event, idx) => (
//                   <div
//                     key={idx}
//                     className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-colors"
//                   >
//                     <div className="flex items-start space-x-4">
//                       <div className="bg-purple-900/30 p-3 rounded-lg flex flex-col items-center justify-center">
//                         <CalendarDays className="w-6 h-6 text-purple-400" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-medium text-white">{event.name}</h3>
//                         <p className="text-sm text-gray-300">{event.date}</p>
//                         <p className="text-sm text-gray-400 mt-1">
//                           {event.venue}
//                         </p>
//                       </div>
//                       <button className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
//                         Get Tickets
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === "about" && (
//               <div className="space-y-6">
//                 <div>
//                   <h2 className="text-xl font-bold text-white mb-4">About</h2>
//                   <p className="text-gray-300 leading-relaxed">
//                     Arijit Singh is a soulful playback singer whose music has
//                     touched millions. Known for his emotional ballads and
//                     soothing voice, Arijit has become the voice of a generation.
//                     With global recognition and an enormous fanbase, his songs
//                     continue to dominate the charts and hearts alike.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                   {/* Stats Card */}
//                   <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
//                     <h3 className="font-semibold text-white mb-3">
//                       Quick Stats
//                     </h3>
//                     <div className="space-y-3">
//                       <div>
//                         <p className="text-sm text-gray-400">
//                           Monthly Listeners
//                         </p>
//                         <p className="text-lg font-bold text-white">8.5M</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-400">Total Plays</p>
//                         <p className="text-lg font-bold text-white">320M</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-400">Countries</p>
//                         <p className="text-lg font-bold text-white">105</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Social Card */}
//                   <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
//                     <h3 className="font-semibold text-white mb-3">Connect</h3>
//                     <div className="flex space-x-4 justify-center">
//                       <a
//                         href="#"
//                         className="p-3 bg-gray-700 hover:bg-pink-600 rounded-full transition-colors"
//                       >
//                         <Instagram className="w-5 h-5 text-white" />
//                       </a>
//                       <a
//                         href="#"
//                         className="p-3 bg-gray-700 hover:bg-blue-400 rounded-full transition-colors"
//                       >
//                         <Twitter className="w-5 h-5 text-white" />
//                       </a>
//                       <a
//                         href="#"
//                         className="p-3 bg-gray-700 hover:bg-red-600 rounded-full transition-colors"
//                       >
//                         <Youtube className="w-5 h-5 text-white" />
//                       </a>
//                     </div>
//                   </div>

//                   {/* Latest Release */}
//                   <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
//                     <h3 className="font-semibold text-white mb-3">
//                       Latest Release
//                     </h3>
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-purple-500/10 p-3 rounded-lg">
//                         <Music className="w-6 h-6 text-purple-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-white">Tum Mile</p>
//                         <p className="text-sm text-gray-400">
//                           Released 3 days ago
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CalendarDays,
//   Instagram,
//   Twitter,
//   Youtube,
//   Music,
//   Play,
//   Heart,
//   Share2,
//   MoreHorizontal,
// } from "lucide-react";
// import axios from "axios";
// import backgroundImg from "../assets/catalog.png";

// export default function Catalog() {
//   const { id } = useParams();
//   const [artist, setArtist] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [activeTab, setActiveTab] = useState("tracks");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArtist = async () => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/artist", {
//           artistId: id,
//         });
//         setArtist(res.data.artist);
//         console.log(res.data.artist);

//       } catch (err) {
//         console.error("Failed to fetch artist", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArtist();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!artist) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Artist not found
//       </div>
//     );
//   }

//   const recentTracks = artist.recentTracks || [
//     { title: "Sample Track 1", duration: "3:45", plays: "10K", isFavorite: true },
//     { title: "Sample Track 2", duration: "4:10", plays: "20K", isFavorite: false },
//   ];

//   const upcomingEvents = artist.events || [
//     { name: "Coming Soon", date: "TBD", venue: "TBD" },
//   ];

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-fixed bg-center relative overflow-y-auto"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Custom scrollbar */}
//       <style>{`
//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
//         ::-webkit-scrollbar-thumb {
//           background: rgba(255,255,255,0.3);
//           border-radius: 4px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: rgba(255,255,255,0.4);
//         }
//       `}</style>

//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20"
//       >
//         {/* Artist Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
//           <motion.div whileHover={{ scale: 1.03 }} className="relative group">
//             <img
//               src={artist.imageUrl || "https://via.placeholder.com/150"}
//               alt={artist.identity?.realName || "Artist"}
//               className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-white/20 group-hover:border-purple-500/50 transition-all"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://via.placeholder.com/150";
//               }}
//             />
//             <div className="absolute inset-0 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//               <Play className="w-8 h-8 text-white" fill="currentColor" />
//             </div>
//           </motion.div>

//           <div className="flex-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-white text-3xl sm:text-4xl font-bold">
//                   {artist.identity?.realName || "Unknown Artist"}
//                 </h1>
//                 <p className="text-gray-300 mt-1 flex items-center">
//                   <Music className="w-4 h-4 mr-1" />
//                   {artist.genres?.join(" | ") || artist.artistic_background?.roles?.join(" | ") || "Unknown Genre"}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsFollowing(!isFollowing)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                   isFollowing
//                     ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                     : "bg-purple-600 text-white hover:bg-purple-700"
//                 }`}
//               >
//                 {isFollowing ? "Following" : "Follow"}
//               </button>
//             </div>

//             <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
//               <div className="flex items-center text-gray-300">
//                 <span className="font-semibold text-white mr-1">
//                   {artist.followers || "–"}
//                 </span>{" "}
//                 Followers
//               </div>
//               <div className="flex items-center text-gray-300">
//                 <span className="font-semibold text-white mr-1">
//                   {artist.tracks?.length || "–"}
//                 </span>{" "}
//                 Tracks
//               </div>
//               <div className="flex items-center text-gray-300">
//                 <span className="font-semibold text-white mr-1">
//                   {artist.likes || "–"}
//                 </span>{" "}
//                 Likes
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-700 mt-8">
//           {["tracks", "events", "about"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-3 text-sm font-medium relative ${
//                 activeTab === tab
//                   ? "text-white"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               {activeTab === tab && (
//                 <motion.div
//                   layoutId="tabIndicator"
//                   className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
//                 />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="mt-6"
//           >
//             {activeTab === "tracks" && (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   Popular Tracks
//                 </h2>
//                 {recentTracks.map((track, idx) => (
//                   <div
//                     key={idx}
//                     className="group flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-colors"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="relative">
//                         <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
//                           <Music className="text-gray-400" />
//                         </div>
//                         <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded transition-opacity">
//                           <Play
//                             className="w-5 h-5 text-white"
//                             fill="currentColor"
//                           />
//                         </button>
//                       </div>
//                       <div>
//                         <h3 className="font-medium text-white">
//                           {track.title}
//                         </h3>
//                         <p className="text-sm text-gray-400">
//                           {track.duration} • {track.plays} plays
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <button className="text-gray-400 hover:text-white transition-colors">
//                         <Heart
//                           className={`w-5 h-5 ${
//                             track.isFavorite ? "fill-red-500 text-red-500" : ""
//                           }`}
//                         />
//                       </button>
//                       <button className="text-gray-400 hover:text-white transition-colors">
//                         <Share2 className="w-5 h-5" />
//                       </button>
//                       <button className="text-gray-400 hover:text-white transition-colors">
//                         <MoreHorizontal className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === "events" && (
//               <div className="space-y-4">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   Upcoming Events
//                 </h2>
//                 {upcomingEvents.map((event, idx) => (
//                   <div
//                     key={idx}
//                     className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-colors"
//                   >
//                     <div className="flex items-start space-x-4">
//                       <div className="bg-purple-900/30 p-3 rounded-lg flex flex-col items-center justify-center">
//                         <CalendarDays className="w-6 h-6 text-purple-400" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-medium text-white">{event.name}</h3>
//                         <p className="text-sm text-gray-300">{event.date}</p>
//                         <p className="text-sm text-gray-400 mt-1">
//                           {event.venue}
//                         </p>
//                       </div>
//                       <button className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
//                         Get Tickets
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === "about" && (
//               <div className="space-y-6">
//                 <div>
//                   <h2 className="text-xl font-bold text-white mb-4">About</h2>
//                   <p className="text-gray-300 leading-relaxed">
//                     {artist.biography ||
//                       `${artist.identity?.realName || "This artist"} is available for collaboration.`}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                   {/* Stats Card */}
//                   <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
//                     <h3 className="font-semibold text-white mb-3">
//                       Quick Stats
//                     </h3>
//                     <div className="space-y-3">
//                       <div>
//                         <p className="text-sm text-gray-400">
//                           Monthly Listeners
//                         </p>
//                         <p className="text-lg font-bold text-white">
//                           {artist.monthlyListeners || "–"}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-400">Total Plays</p>
//                         <p className="text-lg font-bold text-white">
//                           {artist.totalPlays || "–"}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-400">Countries</p>
//                         <p className="text-lg font-bold text-white">
//                           {artist.countries || "–"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Social Card */}
//                   <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
//                     <h3 className="font-semibold text-white mb-3">Connect</h3>
//                     <div className="flex space-x-4 justify-center">
//                       {artist.socialLinks?.instagram && (
//                         <a
//                           href={artist.socialLinks.instagram}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="p-3 bg-gray-700 hover:bg-pink-600 rounded-full transition-colors"
//                         >
//                           <Instagram className="w-5 h-5 text-white" />
//                         </a>
//                       )}
//                       {artist.socialLinks?.twitter && (
//                         <a
//                           href={artist.socialLinks.twitter}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="p-3 bg-gray-700 hover:bg-blue-400 rounded-full transition-colors"
//                         >
//                           <Twitter className="w-5 h-5 text-white" />
//                         </a>
//                       )}
//                       {artist.socialLinks?.youtube && (
//                         <a
//                           href={artist.socialLinks.youtube}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="p-3 bg-gray-700 hover:bg-red-600 rounded-full transition-colors"
//                         >
//                           <Youtube className="w-5 h-5 text-white" />
//                         </a>
//                       )}
//                     </div>
//                   </div>

//                   {/* Latest Release */}
//                   <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
//                     <h3 className="font-semibold text-white mb-3">
//                       Latest Release
//                     </h3>
//                     <div className="flex items-center space-x-3">
//                       <div className="bg-purple-500/10 p-3 rounded-lg">
//                         <Music className="w-6 h-6 text-purple-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-white">
//                           {artist.latestRelease?.title || "Coming Soon"}
//                         </p>
//                         <p className="text-sm text-gray-400">
//                           {artist.latestRelease?.date || "TBD"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFlagUsa } from "react-icons/fa";
import bgImg from "../assets/catalog1.png";
import v2Gif from "../assets/gif9.gif";
import profileImg from "../assets/artist5.jpg"; // Added profile image import

// Imports from the second code block
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
import { Link } from "react-router-dom";

// Asset imports
import logo from "../assets/logo.png";
import i15 from "../assets/gif5.gif";
import launch1 from "../assets/launch1.png";
import gif6 from "../assets/gif6.gif";
import footerImg from "../assets/footer.png";

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

// Review card component
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

// Helper function to get country flag component
const getCountryFlag = (country) => {
  const flags = {
    USA: <FaFlagUsa className="text-red-500" />,
    US: <FaFlagUsa className="text-red-500" />,
    "United States": <FaFlagUsa className="text-red-500" />,
  };
  return flags[country] || <FaFlagUsa className="text-red-500" />;
};

// Helper function to safely get array data
const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("Bio");
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/artist", {
          artistId: id,
        });
        setArtist(res.data.artist);
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

  // Dynamic tabs based on available data
  const tabs = ["Bio", "Artistic Background", "Career Highlights"];

  // Get tab content based on artist data
  const getTabContent = () => {
    switch (activeTab) {
      case "Bio":
        const name =
          artist.identity?.realName || artist.displayName || "This artist";
        const origin = artist.identity?.origin
          ? `from ${artist.identity.origin}`
          : "";
        const location = artist.identity?.location
          ? `currently based in ${artist.identity.location}`
          : "";
        const gender = artist.identity?.gender || "";
        const languages = safeArray(artist.identity?.languages).join(", ");
        const aliases = safeArray(artist.identity?.aliases).join(", ");

        const bioParagraph = `
    ${name} is a ${gender.toLowerCase()} artist ${origin}${
          location ? `, ${location}` : ""
        }. 
    ${aliases ? `Also known as ${aliases}. ` : ""} 
    They primarily speak ${languages || "an unspecified language"}. 
    Known for their contributions to the blues and rock scene, ${
      name.split(" ")[0]
    } continues to grow their artistic journey with passion and dedication.
  `;

        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {bioParagraph.trim().replace(/\s+/g, " ")}
            </p>
            <button className="text-sm text-blue-400 hover:underline">
              VIEW MORE
            </button>
          </div>
        );

      case "Artistic Background":
        return (
          <div className="space-y-4">
            {safeArray(artist.artistic_background?.roles).length > 0 && (
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">Roles:</span>{" "}
                {artist.artistic_background.roles.join(", ")}
              </p>
            )}
            {safeArray(artist.artistic_background?.genres).length > 0 && (
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">Genres:</span>{" "}
                {artist.artistic_background.genres.join(", ")}
              </p>
            )}
            {safeArray(artist.artistic_background?.influences).length > 0 && (
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">Influences:</span>{" "}
                {artist.artistic_background.influences.join(", ")}
              </p>
            )}
            {safeArray(artist.artistic_background?.skills).length > 0 && (
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">Skills:</span>{" "}
                {artist.artistic_background.skills.join(", ")}
              </p>
            )}
            <button className="text-sm text-blue-400 hover:underline">
              VIEW MORE
            </button>
          </div>
        );

      case "Career Highlights":
        return (
          <div className="space-y-4">
            {artist.career?.education &&
              artist.career.education !== "Not specified" && (
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-semibold">Education:</span>{" "}
                  {artist.career.education}
                </p>
              )}
            {safeArray(artist.career?.awards).length > 0 && (
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">Awards:</span>{" "}
                {artist.career.awards.join(", ")}
              </p>
            )}
            {safeArray(artist.career?.performances).length > 0 && (
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">Notable Performances:</span>{" "}
                {artist.career.performances.join(", ")}
              </p>
            )}
            {safeArray(artist.career?.collaborations).length > 0 && (
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold">Collaborations:</span>{" "}
                {artist.career.collaborations.join(", ")}
              </p>
            )}
            <button className="text-sm text-blue-400 hover:underline">
              VIEW MORE
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Default album data if none provided
  const defaultAlbums = [
    {
      title: "Echoes of Silence",
      year: "2020-06-12",
      label: "XO Records",
      details: "A haunting yet melodic journey through heartbreak and mystery.",
      coverImage: profileImg,
    },
    {
      title: "Dawn FM",
      year: "2022-01-07",
      label: "Republic Records",
      details: "A synthwave experience wrapped in nostalgia and vision.",
      coverImage: profileImg,
    },
    {
      title: "After Hours",
      year: "2020-03-20",
      label: "XO & Republic",
      details: "Dark, vulnerable, and captivating storytelling through R&B.",
      coverImage: profileImg,
    },
  ];

  // Use artist's discography if available, otherwise use default
  const albums = safeArray(artist.discography);

  // Default reviews if none provided
  const defaultReviews = [
    {
      reviewerName: "Music Producer",
      rating: 5,
      comment:
        "Exceptional talent and professionalism. Working with this artist was a truly inspiring experience.",
    },
    {
      reviewerName: "Fellow Artist",
      rating: 4,
      comment:
        "Creative vision and dedication to craft are remarkable. Highly recommend for collaborations.",
    },
    {
      reviewerName: "Industry Expert",
      rating: 5,
      comment:
        "The artist's ability to blend different genres while maintaining a unique sound is unparalleled in the industry today. A true innovator.",
    },
  ];

  // Use artist's reviews if available, otherwise use default
  const reviews =
    safeArray(artist.reviews).length > 0
      ? safeArray(artist.reviews)
      : defaultReviews;

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Top Background with Overlay */}
      <motion.div
        className="relative w-full h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url(${artist.imageUrl || bgImg})` }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 -mt-16 flex flex-col lg:flex-row p-8 gap-8 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {/* Left section */}
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
          <img
            src={artist.imageUrl || profileImg}
            alt={artist.displayName || "Artist"}
            className="rounded-full w-40 h-40 object-cover border-4 border-gray-700"
          />
          <div className="mt-6">
            <p className="uppercase text-gray-400 text-sm">Location</p>
            <div className="flex items-center space-x-2 mt-1">
              {getCountryFlag(artist.identity?.location || "USA")}
              <span>{artist.identity?.location || "Unknown"}</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="uppercase text-gray-400 text-sm">Languages</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {safeArray(artist.identity?.languages).length > 0 ? (
                safeArray(artist.identity.languages).map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 text-sm rounded-full bg-gray-800"
                  >
                    {lang}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 text-sm rounded-full bg-gray-800">
                  English
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="uppercase text-gray-400 text-sm">Genre</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {safeArray(artist.artistic_background?.genres).length > 0 ? (
                safeArray(artist.artistic_background.genres)
                  .slice(0, 5)
                  .map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 text-sm rounded-full bg-gray-800"
                    >
                      {genre}
                    </span>
                  ))
              ) : (
                <>
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-800">
                    Rock
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-800">
                    Pop
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-800">
                    EDM
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex-1">
          <p className="text-gray-400 uppercase text-sm">
            {safeArray(artist.artistic_background?.roles)[0] || "Artist"}
          </p>
          <h1 className="text-5xl font-bold mt-1">
            {artist.displayName || "Unknown Artist"}
          </h1>

          <div className="flex gap-4 mt-4">
            <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">
              ID : {artist._id || "Unknown"}
            </span>
            <span className="px-4 py-1 bg-gray-800 rounded-full text-sm">
              Price : ${artist.priceUSD || 0} USD
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
          <div className="mt-6 space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {getTabContent()}
          </div>
        </div>
      </motion.div>

      {/* Discography Section */}
      {albums.length === 0 ? (
        <div className="h-[300px] flex justify-center items-center text-lg text-gray-400">
          No discovery found
        </div>
      ) : (
        // carousel logic
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
                <FaMusic className="text-green-400 text-7xl" />
                <h1 className="text-3xl md:text-5xl font-bold">DISCOGRAPHY</h1>
              </div>
              <img src={logo} alt="Logo" className="w-20" />
              <h2 className="text-xl md:text-3xl font-bold">RECENTS</h2>
              <p className="text-sm md:text-base leading-relaxed text-justify">
                Explore the musical evolution through each of these iconic
                albums. From ethereal sounds to bold lyrical storytelling, this
                collection showcases versatility and emotional depth. Get lost
                in melodies, lyrics, and moods.
              </p>
            </div>

            {/* Album Carousel */}
            <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-green-500 rounded-md">
              <div className="flex gap-6 h-[500px] md:h-[600px]">
                {albums.map((album, index) => {
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
                      {console.log(artist)}
                      <img
                        src={artist.imageUrl || profileImg}
                        alt={album.title || `Album ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-start p-4 text-white">
                        <p className="text-lg md:text-xl font-bold mb-2">
                          {album.title || "Untitled"}
                        </p>
                        <p className="text-sm">
                          Release: {album.year || "Unknown"}
                        </p>
                        <p className="text-sm">
                          Label: {album.label || "Independent"}
                        </p>
                        <p className="text-sm mt-2">
                          {album.details || "No details available"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Creative Process Section */}
      {/* Creative Process Section */}
      {(artist.creative_process?.songwriting_process ||
        artist.creative_process?.production_process ||
        artist.availability?.current_projects ||
        artist.availability?.looking_for) && (
        <section className="relative w-full min-h-screen overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="absolute inset-0"
          >
            <img
              src={i15}
              alt="Background"
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto z-0 opacity-60 pointer-events-none"
              style={{ objectFit: "contain" }}
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
              <span>🧠 CREATIVE PROCESSES</span>
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            >
              {/* Songwriting Process */}
              {artist.creative_process?.songwriting_process && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    Songwriting Process
                  </h3>
                  <p className="text-sm md:text-base">
                    {artist.creative_process.songwriting_process}
                  </p>
                  <p className="mt-4 font-semibold">
                    — {artist.displayName || "Artist"}
                  </p>
                </motion.div>
              )}

              {/* Production Process */}
              {artist.creative_process?.production_process && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    Production Process
                  </h3>
                  <p className="text-sm md:text-base">
                    {artist.creative_process.production_process}
                  </p>
                  <p className="mt-4 font-semibold">
                    — {artist.displayName || "Artist"}
                  </p>
                </motion.div>
              )}

              {/* Current Projects */}
              {artist.availability?.current_projects && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    Current Projects
                  </h3>
                  <p className="text-sm md:text-base">
                    {artist.availability.current_projects}
                  </p>
                </motion.div>
              )}

              {/* Looking For */}
              {artist.availability?.looking_for && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">Looking For</h3>
                  <p className="text-sm md:text-base">
                    {artist.availability.looking_for.join(", ")}.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Review Section */}
      <section className="w-full px-4 md:px-20 py-16 bg-black text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <span>💬</span> ONLINE PRESENCE
          </h2>
          <p className="mt-2 font-semibold uppercase">Reviews</p>
          <p className="text-sm text-white/50 mt-1">Scroll to explore →</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.3) rgba(255,255,255,0.1)",
            }}
          >
            {reviews.map((review, idx) => (
              <ReviewCard
                key={idx}
                index={idx}
                name={review.reviewerName || review.name || "Anonymous"}
                rating={review.rating || 5}
                text={
                  review.comment || review.text || "Great artist to work with!"
                }
                width={idx % 3 === 2 ? 898 : 482}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Social Media Section */}
      <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img
            src={launch1}
            alt="Top Right Hands"
            className="absolute right-0 bottom-35 w-[50vw] max-w-[900px] transform rotate-[260deg] z-0 opacity-80"
          />
          <img
            src={launch1}
            alt="Bottom Left Hands"
            className="absolute top-35 left-0 w-[50vw] max-w-[900px] transform rotate-[90deg] z-0 opacity-80"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </motion.div>

        <div className="relative z-20 flex flex-col items-center justify-around h-full py-16 px-6 text-white w-full max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-left text-2xl md:text-3xl font-bold w-full mb-12"
          >
            SOCIAL MEDIA
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col md:flex-row items-center justify-around gap-12 w-full"
          >
            {/* Left Socials */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-10 text-sm md:items-end"
            >
              <a
                href={artist.online_presence?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <FaInstagram size={28} className="text-pink-500 mb-2" />
                <span className="uppercase font-semibold">Instagram</span>
                <span className="text-white/70">
                  @
                  {artist.displayName?.toLowerCase().replace(/\s+/g, "") ||
                    "artist"}
                </span>
              </a>

              <a
                href={artist.online_presence?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <FaFacebookF size={28} className="text-blue-500 mb-2" />
                <span className="uppercase font-semibold">Facebook</span>
                <span className="text-white/70">
                  @
                  {artist.displayName?.toLowerCase().replace(/\s+/g, "") ||
                    "artist"}
                </span>
              </a>
            </motion.div>

            {/* Center Globe GIF */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 w-52 md:w-82 lg:w-96 order-first md:order-none opacity-45"
            >
              <img src={gif6} alt="Globe Animation" className="w-full h-auto" />
            </motion.div>

            {/* Right Socials */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-10 text-sm md:items-start"
            >
              <a
                href={artist.online_presence?.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <FaXTwitter size={28} className="text-white mb-2" />
                <span className="uppercase font-semibold">Twitter</span>
                <span className="text-white/70">
                  @
                  {artist.displayName?.toLowerCase().replace(/\s+/g, "") ||
                    "artist"}
                </span>
              </a>

              <a
                href={artist.online_presence?.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <FaYoutube size={28} className="text-red-600 mb-2" />
                <span className="uppercase font-semibold">YouTube</span>
                <span className="text-white/70">
                  @
                  {artist.displayName?.toLowerCase().replace(/\s+/g, "") ||
                    "artist"}
                  Live
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Streaming Platforms and Quotes Section with Background GIF */}
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
        <img
          src={v2Gif}
          alt="Background Animation"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 max-w-6xl w-full justify-center">
          {/* Streaming Platforms Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white w-full md:w-1/2 shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              STREAMING PLATFORMS
            </h2>
            <p className="text-sm text-white/60 mb-4">
              now streaming on various platforms
            </p>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              "Discover the artist's unique sound across global streaming
              platforms. From chart-topping hits to hidden gems, their music is
              now available for you to experience on Apple Music, Spotify,
              SoundCloud, and more. "
            </p>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <FaApple size={20} />
                <span>Apple Music</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSpotify size={20} />
                <span>Spotify</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSoundcloud size={20} />
                <span>SoundCloud</span>
              </div>
            </div>
          </motion.div>

          {/* Quotes Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white w-full md:w-1/2 shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              QUOTES
            </h2>

            {Array.isArray(artist.quotes) && artist.quotes.length > 0 ? (
              artist.quotes.map((quote, index) => (
                <p
                  key={index}
                  className="text-sm text-white/80 leading-relaxed mb-4 last:mb-0"
                >
                  &quot;{quote}&quot;
                </p>
              ))
            ) : (
              <p className="text-sm text-white/80 leading-relaxed">
                &quot;No quotes found for this artist. Stay tuned for their
                thoughts and inspirations!&quot;
              </p>
            )}
          </motion.div>
        </div>
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
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
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
              src={footerImg}
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
