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



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Instagram,
  Twitter,
  Youtube,
  Music,
  Play,
  Heart,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import axios from "axios";
import backgroundImg from "../assets/catalog.png";

export default function Catalog() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("tracks");
  const [loading, setLoading] = useState(true);

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
        <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Artist not found
      </div>
    );
  }

  const recentTracks = artist.recentTracks || [
    { title: "Sample Track 1", duration: "3:45", plays: "10K", isFavorite: true },
    { title: "Sample Track 2", duration: "4:10", plays: "20K", isFavorite: false },
  ];

  const upcomingEvents = artist.events || [
    { name: "Coming Soon", date: "TBD", venue: "TBD" },
  ];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-fixed bg-center relative overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Custom scrollbar */}
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

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20"
      >
        {/* Artist Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.div whileHover={{ scale: 1.03 }} className="relative group">
            <img
              src={artist.imageUrl || "https://via.placeholder.com/150"}
              alt={artist.identity?.realName || "Artist"}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-white/20 group-hover:border-purple-500/50 transition-all"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            <div className="absolute inset-0 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-3xl sm:text-4xl font-bold">
                  {artist.identity?.realName || "Unknown Artist"}
                </h1>
                <p className="text-gray-300 mt-1 flex items-center">
                  <Music className="w-4 h-4 mr-1" />
                  {artist.genres?.join(" | ") || artist.artistic_background?.roles?.join(" | ") || "Unknown Genre"}
                </p>
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isFollowing
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
              <div className="flex items-center text-gray-300">
                <span className="font-semibold text-white mr-1">
                  {artist.followers || "–"}
                </span>{" "}
                Followers
              </div>
              <div className="flex items-center text-gray-300">
                <span className="font-semibold text-white mr-1">
                  {artist.tracks?.length || "–"}
                </span>{" "}
                Tracks
              </div>
              <div className="flex items-center text-gray-300">
                <span className="font-semibold text-white mr-1">
                  {artist.likes || "–"}
                </span>{" "}
                Likes
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mt-8">
          {["tracks", "events", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium relative ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6"
          >
            {activeTab === "tracks" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">
                  Popular Tracks
                </h2>
                {recentTracks.map((track, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                          <Music className="text-gray-400" />
                        </div>
                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded transition-opacity">
                          <Play
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                          />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {track.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {track.duration} • {track.plays} plays
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Heart
                          className={`w-5 h-5 ${
                            track.isFavorite ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "events" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">
                  Upcoming Events
                </h2>
                {upcomingEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-900/30 p-3 rounded-lg flex flex-col items-center justify-center">
                        <CalendarDays className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{event.name}</h3>
                        <p className="text-sm text-gray-300">{event.date}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {event.venue}
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
                        Get Tickets
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">About</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {artist.biography ||
                      `${artist.identity?.realName || "This artist"} is available for collaboration.`}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Stats Card */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
                    <h3 className="font-semibold text-white mb-3">
                      Quick Stats
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">
                          Monthly Listeners
                        </p>
                        <p className="text-lg font-bold text-white">
                          {artist.monthlyListeners || "–"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Plays</p>
                        <p className="text-lg font-bold text-white">
                          {artist.totalPlays || "–"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Countries</p>
                        <p className="text-lg font-bold text-white">
                          {artist.countries || "–"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Card */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
                    <h3 className="font-semibold text-white mb-3">Connect</h3>
                    <div className="flex space-x-4 justify-center">
                      {artist.socialLinks?.instagram && (
                        <a
                          href={artist.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-700 hover:bg-pink-600 rounded-full transition-colors"
                        >
                          <Instagram className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {artist.socialLinks?.twitter && (
                        <a
                          href={artist.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-700 hover:bg-blue-400 rounded-full transition-colors"
                        >
                          <Twitter className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {artist.socialLinks?.youtube && (
                        <a
                          href={artist.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-700 hover:bg-red-600 rounded-full transition-colors"
                        >
                          <Youtube className="w-5 h-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Latest Release */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 shadow-lg">
                    <h3 className="font-semibold text-white mb-3">
                      Latest Release
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/10 p-3 rounded-lg">
                        <Music className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {artist.latestRelease?.title || "Coming Soon"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {artist.latestRelease?.date || "TBD"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
