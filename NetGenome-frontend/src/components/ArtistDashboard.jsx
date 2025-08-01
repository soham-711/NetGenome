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

import React, { useState } from "react";
import { Edit3, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../assets/4.jpg";
import logo from "../assets/logo.png"; // ✅ Ensure this path is correct
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NetGenomeDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [artistId, setArtistId] = useState("");
const navigate = useNavigate();
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
        "http://localhost:5000/api/artist/by-id",
        {
          artistID: artistId,
        }
      );


      if (activeModal === "edit") {
        navigate("/artist/edit-profile", { state: response.data }); // ✅ Pass data via state
      } else if (activeModal === "view") {
        navigate("/view-artist-profile", { state: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch artist profile:", error);
    }
    closeModal();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <motion.img
          src={logo}
          alt="Logo"
          className="h-12 w-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-slate-300 tracking-wider"
        >
          ARTIST DASHBOARD
        </motion.h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Edit My Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
            className="bg-black/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
          >
            <div className="flex items-start space-x-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="p-3 bg-gradient-to-r from-yellow-600 to-white-600 rounded-xl"
              >
                <Edit3 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  EDIT MY PROFILE
                </h3>
                <p className="text-slate-300 text-sm">
                  Customize your artist identity
                </p>
              </div>
            </div>

            <p className="text-slate-200 mb-8 leading-relaxed">
              Edit your bio, genres, media, and more using the universal profile
              schema.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal("edit")}
              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-white-600 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              EDIT PROFILE
            </motion.button>
          </motion.div>

          {/* View My Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ y: -5 }}
            className="bg-black/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
          >
            <div className="flex items-start space-x-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 0.5,
                }}
                className="p-3 bg-gradient-to-r from-black-600 to-blue-600 rounded-xl"
              >
                <Eye className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  VIEW MY PROFILE
                </h3>
                <p className="text-slate-300 text-sm">
                  Preview your public artist page
                </p>
              </div>
            </div>

            <p className="text-slate-200 mb-8 leading-relaxed">
              See how others view your musical identity.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal("view")}
              className="px-6 py-3 bg-gradient-to-r from-black-600 to-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              VIEW PAGE
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-700 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    activeModal === "edit"
                      ? "bg-gradient-to-r from-yellow-600 to-white-600"
                      : "bg-gradient-to-r from-black-600 to-blue-600"
                  }`}
                >
                  {activeModal === "edit" ? (
                    <Edit3 className="w-6 h-6 text-white" />
                  ) : (
                    <Eye className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {activeModal === "edit" ? "EDIT PROFILE" : "VIEW PROFILE"}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {activeModal === "edit"
                      ? "Enter your artist ID to edit profile"
                      : "Enter artist ID to view profile"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="artistId"
                    className="block text-slate-300 mb-2"
                  >
                    Artist ID
                  </label>
                  <input
                    type="text"
                    id="artistId"
                    value={artistId}
                    onChange={(e) => setArtistId(e.target.value)}
                    className="w-full bg-slate-800 border border-yellow-100 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ass-500"
                    placeholder="Enter your artist ID"
                    required
                    autoFocus
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className={`w-full py-3 text-white font-medium rounded-lg transition-colors duration-200 ${
                    activeModal === "edit"
                      ? "bg-gradient-to-r from-yellow-600 to-white-600"
                      : "bg-gradient-to-r from-black-600 to-blue-600"
                  }`}
                >
                  {activeModal === "edit" ? "EDIT PROFILE" : "VIEW PROFILE"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
