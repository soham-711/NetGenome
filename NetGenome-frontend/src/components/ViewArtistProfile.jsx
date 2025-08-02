// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ViewArtistProfile = () => {
//   const { state } = useLocation();
//   const artist = state;
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);

//   useEffect(() => {
//     // Simulate loading time for better UX
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Add custom styles to head
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.textContent = `
//       @keyframes fadeIn {
//         from { opacity: 0; transform: translateY(10px); }
//         to { opacity: 1; transform: translateY(0); }
//       }
//       .animate-fadeIn {
//         animation: fadeIn 0.4s ease-out forwards;
//       }
//       .line-clamp-2 {
//         display: -webkit-box;
//         -webkit-line-clamp: 2;
//         -webkit-box-orient: vertical;
//         overflow: hidden;
//       }
//       .text-balance {
//         text-wrap: balance;
//       }
//       .platform-icon {
//         transition: all 0.3s ease;
//       }
//       .platform-card:hover .platform-icon {
//         transform: scale(1.1);
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Dark mode color palette
//   const colors = {
//     primary: "bg-gradient-to-r from-indigo-600 to-purple-600",
//     primaryHover: "hover:from-indigo-700 hover:to-purple-700",
//     primaryText: "text-indigo-400",
//     secondary: "bg-gradient-to-r from-emerald-500 to-teal-500",
//     accent: "bg-gradient-to-r from-rose-500 to-orange-500",
//     cardBg: "bg-gray-800/80",
//     cardBorder: "border border-gray-700/50 shadow-lg shadow-gray-900/30",
//     sectionTitle: "text-gray-100",
//     bodyText: "text-gray-300",
//     lightBg: "bg-gradient-to-br from-gray-900 to-gray-800",
//     tagBg: "bg-indigo-900/50 text-indigo-200 border border-indigo-800/50",
//     tabActive: "bg-gray-700/80 text-white border-gray-600 shadow",
//     tabInactive:
//       "bg-gray-700/30 text-gray-300 border-gray-600 hover:bg-gray-700/50",
//     hoverEffect:
//       "hover:shadow-xl hover:shadow-indigo-900/20 hover:-translate-y-1 transition-all duration-300 ease-out",
//     divider: "border-gray-700",
//   };

//   const tabs = [
//     { id: "overview", label: "Overview", icon: "👤" },
//     { id: "career", label: "Career", icon: "🎵" },
//     { id: "creative", label: "Creative", icon: "🎨" },
//     { id: "presence", label: "Online", icon: "🌐" },
//   ];

//   // Helper functions
//   const getYearDisplay = (year) => {
//     if (!year) return "??";
//     const yearStr = String(year);
//     return yearStr.length >= 2 ? yearStr.slice(-2) : yearStr;
//   };

//   const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

//   // Platform icons mapping
//   const platformIcons = {
//     spotify: "🎵",
//     "apple music": "",
//     "youtube music": "▶️",
//     soundcloud: "☁️",
//     tidal: "🌊",
//     deezer: "🌀",
//     "amazon music": "🅰️",
//     bandcamp: "🅱️",
//     default: "🎧",
//   };

//   const getPlatformIcon = (platformName) => {
//     const lowerName = platformName.toLowerCase();
//     for (const [key, icon] of Object.entries(platformIcons)) {
//       if (lowerName.includes(key)) return icon;
//     }
//     return platformIcons.default;
//   };

//   const TabContent = ({ tabId }) => {
//     switch (tabId) {
//       case "overview":
//         return (
//           <div className="space-y-8 animate-fadeIn">
//             {/* Identity & Artistic Background */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
//               >
//                 <div className="flex items-center mb-4">
//                   <div
//                     className={`w-10 h-10 ${colors.primary} rounded-lg flex items-center justify-center text-white mr-3`}
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.5}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className={`text-xl font-bold ${colors.sectionTitle}`}>
//                     Identity
//                   </h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
//                     <div>
//                       <span className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
//                         Real Name
//                       </span>
//                       <p className={`${colors.bodyText} mt-1`}>
//                         {artist.identity?.realName || "Not specified"}
//                       </p>
//                     </div>
//                   </div>
//                   {safeArray(artist.identity?.aliases).length > 0 && (
//                     <div className="flex items-start space-x-3">
//                       <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
//                       <div>
//                         <span className="text-xs font-semibold uppercase tracking-wide text-purple-300">
//                           Aliases
//                         </span>
//                         <p className={`${colors.bodyText} mt-1`}>
//                           {artist.identity.aliases.join(", ")}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
//                     <div>
//                       <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
//                         Origin
//                       </span>
//                       <p className={`${colors.bodyText} mt-1`}>
//                         {artist.identity?.origin || "Not specified"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
//                     <div>
//                       <span className="text-xs font-semibold uppercase tracking-wide text-rose-300">
//                         Based In
//                       </span>
//                       <p className={`${colors.bodyText} mt-1`}>
//                         {artist.identity?.location || "Not specified"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
//               >
//                 <div className="flex items-center mb-4">
//                   <div
//                     className={`w-10 h-10 ${colors.secondary} rounded-lg flex items-center justify-center text-white mr-3`}
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.5}
//                         d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className={`text-xl font-bold ${colors.sectionTitle}`}>
//                     Artistic Background
//                   </h3>
//                 </div>
//                 <div className="grid grid-cols-1 gap-4">
//                   <div className="p-4 rounded-xl border border-gray-700 bg-gray-700/30">
//                     <h4 className="font-semibold text-emerald-300 mb-2">
//                       Roles
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {safeArray(artist.artistic_background?.roles).map(
//                         (role, i) => (
//                           <span
//                             key={i}
//                             className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-200"
//                           >
//                             {role}
//                           </span>
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <div className="p-4 rounded-xl border border-gray-700 bg-gray-700/30">
//                     <h4 className="font-semibold text-purple-300 mb-2">
//                       Genres
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {safeArray(artist.artistic_background?.genres).map(
//                         (genre, i) => (
//                           <span
//                             key={i}
//                             className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200"
//                           >
//                             {genre}
//                           </span>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Discography Preview */}
//             {safeArray(artist.discography).length > 0 && (
//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//               >
//                 <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-6`}>
//                   Latest Releases
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {safeArray(artist.discography)
//                     .slice(0, 4)
//                     .map((work, index) => (
//                       <div
//                         key={index}
//                         className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 p-5"
//                       >
//                         <div
//                           className={`absolute top-0 left-0 right-0 h-1 ${colors.primary}`}
//                         ></div>
//                         <div className="flex items-center mb-3">
//                           <div
//                             className={`w-9 h-9 ${colors.primary} rounded-lg flex items-center justify-center text-white mr-3 text-xs font-bold`}
//                           >
//                             {getYearDisplay(work.year)}
//                           </div>
//                           <div>
//                             <h4 className="font-bold text-gray-100">
//                               {work.title || "Untitled"}
//                             </h4>
//                             <p className="text-xs text-gray-400">
//                               {work.type || "Unknown"}
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-xs font-medium text-gray-400">
//                           Label: {work.label || "Independent"}
//                         </p>
//                         <p className="mt-2 text-xs text-gray-300 line-clamp-2">
//                           {work.details || "No details available"}
//                         </p>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       case "career":
//         return (
//           <div className="space-y-8 animate-fadeIn">
//             {/* Career Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div
//                 className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
//               >
//                 <div
//                   className={`w-12 h-12 ${colors.primary} rounded-xl flex items-center justify-center text-white mx-auto mb-3`}
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
//                   Education
//                 </h3>
//                 <p className={`${colors.bodyText} text-xs`}>
//                   {artist.career?.education || "Not specified"}
//                 </p>
//               </div>

//               <div
//                 className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
//               >
//                 <div
//                   className={`w-12 h-12 ${colors.secondary} rounded-xl flex items-center justify-center text-white mx-auto mb-3`}
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
//                   Collaborations
//                 </h3>
//                 <p className={`${colors.bodyText} text-xs`}>
//                   {safeArray(artist.career?.collaborations).length} projects
//                 </p>
//               </div>

//               <div
//                 className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
//               >
//                 <div
//                   className={`w-12 h-12 ${colors.accent} rounded-xl flex items-center justify-center text-white mx-auto mb-3`}
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
//                   Awards
//                 </h3>
//                 <p className={`${colors.bodyText} text-xs`}>
//                   {safeArray(artist.career?.awards).length} recognitions
//                 </p>
//               </div>
//             </div>

//             {/* Detailed Career Info */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//               >
//                 <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
//                   Recent Collaborations
//                 </h3>
//                 <div className="space-y-3">
//                   {safeArray(artist.career?.collaborations).length > 0 ? (
//                     safeArray(artist.career.collaborations)
//                       .slice(0, 5)
//                       .map((collab, i) => (
//                         <div
//                           key={i}
//                           className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/30"
//                         >
//                           <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
//                           <p className={`text-sm ${colors.bodyText}`}>
//                             {collab}
//                           </p>
//                         </div>
//                       ))
//                   ) : (
//                     <p
//                       className={`${colors.bodyText} text-center italic text-sm`}
//                     >
//                       No collaborations listed
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//               >
//                 <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
//                   Notable Performances
//                 </h3>
//                 <div className="space-y-3">
//                   {safeArray(artist.career?.performances).length > 0 ? (
//                     safeArray(artist.career.performances)
//                       .slice(0, 5)
//                       .map((performance, i) => (
//                         <div
//                           key={i}
//                           className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/30"
//                         >
//                           <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></div>
//                           <p className={`text-sm ${colors.bodyText}`}>
//                             {performance}
//                           </p>
//                         </div>
//                       ))
//                   ) : (
//                     <p
//                       className={`${colors.bodyText} text-center italic text-sm`}
//                     >
//                       No performances listed
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case "creative":
//         return (
//           <div className="space-y-8 animate-fadeIn">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
//               >
//                 <div className="flex items-center mb-4">
//                   <div
//                     className={`w-10 h-10 ${colors.primary} rounded-lg flex items-center justify-center text-white mr-3`}
//                   >
//                     ✍️
//                   </div>
//                   <h3 className={`text-lg font-bold ${colors.sectionTitle}`}>
//                     Songwriting Process
//                   </h3>
//                 </div>
//                 <div className={`text-sm ${colors.bodyText} space-y-3`}>
//                   {artist.creative_process?.songwriting_process ? (
//                     artist.creative_process.songwriting_process
//                       .split("\n")
//                       .map((paragraph, i) => (
//                         <p key={i} className="leading-relaxed">
//                           {paragraph}
//                         </p>
//                       ))
//                   ) : (
//                     <p className="italic">
//                       No songwriting process information available
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
//               >
//                 <div className="flex items-center mb-4">
//                   <div
//                     className={`w-10 h-10 ${colors.secondary} rounded-lg flex items-center justify-center text-white mr-3`}
//                   >
//                     🎛️
//                   </div>
//                   <h3 className={`text-lg font-bold ${colors.sectionTitle}`}>
//                     Production Process
//                   </h3>
//                 </div>
//                 <div className={`text-sm ${colors.bodyText} space-y-3`}>
//                   {artist.creative_process?.production_process ? (
//                     artist.creative_process.production_process
//                       .split("\n")
//                       .map((paragraph, i) => (
//                         <p key={i} className="leading-relaxed">
//                           {paragraph}
//                         </p>
//                       ))
//                   ) : (
//                     <p className="italic">
//                       No production process information available
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Current Availability */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//               >
//                 <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
//                   Current Projects
//                 </h3>
//                 <div className="space-y-2">
//                   {safeArray(artist.availability?.current_projects).length >
//                   0 ? (
//                     safeArray(artist.availability.current_projects).map(
//                       (project, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center space-x-3 p-3 rounded-lg bg-amber-900/20"
//                         >
//                           <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
//                           <span className={`text-sm ${colors.bodyText}`}>
//                             {project}
//                           </span>
//                         </div>
//                       )
//                     )
//                   ) : (
//                     <p
//                       className={`${colors.bodyText} text-center italic text-sm`}
//                     >
//                       No current projects listed
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//               >
//                 <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
//                   Looking For
//                 </h3>
//                 <div className="space-y-2">
//                   {safeArray(artist.availability?.looking_for).length > 0 ? (
//                     safeArray(artist.availability.looking_for).map(
//                       (item, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center space-x-3 p-3 rounded-lg bg-green-900/20"
//                         >
//                           <div className="w-2 h-2 rounded-full bg-green-400"></div>
//                           <span className={`text-sm ${colors.bodyText}`}>
//                             {item}
//                           </span>
//                         </div>
//                       )
//                     )
//                   ) : (
//                     <p
//                       className={`${colors.bodyText} text-center italic text-sm`}
//                     >
//                       No specific requirements listed
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case "presence":
//         return (
//           <div className="space-y-8 animate-fadeIn">
//             {/* Enhanced Streaming Section */}
//             <div
//               className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//             >
//               <h3
//                 className={`text-xl font-bold ${colors.sectionTitle} mb-6 flex items-center`}
//               >
//                 <span className="mr-2">🎧</span> Streaming Platforms
//               </h3>

//               {safeArray(artist.online_presence?.streaming_platforms).length >
//               0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                   {safeArray(artist.online_presence.streaming_platforms).map(
//                     (platform, i) => (
//                       <a
//                         key={i}
//                         href={platform.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="platform-card group"
//                       >
//                         <div
//                           className={`p-4 rounded-xl border border-gray-700 bg-gray-800/50 flex flex-col items-center text-center ${colors.hoverEffect}`}
//                         >
//                           <div className="platform-icon w-12 h-12 text-2xl mb-2 flex items-center justify-center">
//                             {getPlatformIcon(platform.platform)}
//                           </div>
//                           <span className="text-sm font-medium text-gray-200 group-hover:text-white">
//                             {platform.platform}
//                           </span>
//                           <span className="text-xs text-gray-400 mt-1">
//                             Stream now
//                           </span>
//                         </div>
//                       </a>
//                     )
//                   )}
//                 </div>
//               ) : (
//                 <p className={`${colors.bodyText} text-center italic`}>
//                   No streaming platforms listed
//                 </p>
//               )}
//             </div>

//             {/* Social Media & Website */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Website */}
//               {artist.online_presence?.website && (
//                 <div
//                   className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//                 >
//                   <h3
//                     className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
//                   >
//                     <span className="mr-2">🌐</span> Official Website
//                   </h3>
//                   <a
//                     href={artist.online_presence.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`inline-flex items-center justify-center w-full px-4 py-3 ${colors.primary} ${colors.primaryHover} text-white rounded-xl font-medium transition-all duration-300`}
//                   >
//                     Visit Website
//                     <svg
//                       className="w-4 h-4 ml-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//                       />
//                     </svg>
//                   </a>
//                 </div>
//               )}

//               {/* Social Media */}
//               {safeArray(artist.online_presence?.social_media).length > 0 && (
//                 <div
//                   className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//                 >
//                   <h3
//                     className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
//                   >
//                     <span className="mr-2">📱</span> Social Media
//                   </h3>
//                   <div className="grid grid-cols-2 gap-3">
//                     {safeArray(artist.online_presence.social_media).map(
//                       (platform, i) => (
//                         <a
//                           key={i}
//                           href={platform.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-200 hover:text-white transition-colors duration-300 flex items-center justify-center text-sm font-medium"
//                         >
//                           {platform.platform}
//                         </a>
//                       )
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Quotes Section */}
//             {safeArray(artist.quotes).length > 0 && (
//               <div
//                 className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
//               >
//                 <h3
//                   className={`text-xl font-bold ${colors.sectionTitle} mb-6 text-center`}
//                 >
//                   Artist Quotes
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {safeArray(artist.quotes).map((quote, i) => (
//                     <div
//                       key={i}
//                       className="relative p-4 rounded-xl bg-gray-800/50 border border-gray-700"
//                     >
//                       <div className="absolute -top-1 -left-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs text-white">
//                         "
//                       </div>
//                       <blockquote
//                         className={`italic ${colors.bodyText} text-sm leading-relaxed`}
//                       >
//                         {quote}
//                       </blockquote>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (isLoading || !artist) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-indigo-500 mx-auto mb-4"></div>
//           <div className="text-lg font-medium text-gray-300 animate-pulse">
//             Loading artist profile...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-6 px-4 sm:px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Hero Section */}
//         <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 mb-6 shadow-xl overflow-hidden relative border border-gray-700/50">
//           {/* Subtle texture overlay */}
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700/10 to-transparent opacity-20"></div>

//           {/* Content container */}
//           <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
//             {artist.imageUrl && (
//               <div className="relative group">
//                 {/* Artist image with elegant frame */}
//                 <div
//                   className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-indigo-400/30 shadow-lg transition-all duration-500 ${
//                     isImageLoaded ? "group-hover:scale-105" : ""
//                   }`}
//                 >
//                   <img
//                     src={artist.imageUrl}
//                     alt={artist.displayName || "Artist"}
//                     className={`w-full h-full object-cover transition-opacity duration-500 ${
//                       isImageLoaded ? "opacity-100" : "opacity-0"
//                     }`}
//                     onLoad={() => setIsImageLoaded(true)}
//                   />
//                   {!isImageLoaded && (
//                     <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
//                   )}
//                 </div>
//                 {/* Decorative element */}
//                 <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
//                   ★
//                 </div>
//               </div>
//             )}

//             <div className="flex-1 text-center md:text-left space-y-4">
//               {/* Artist name with subtle gradient */}
//               <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-100 to-gray-100">
//                 {artist.displayName || "Unknown Artist"}
//               </h1>

//               {/* Pricing and tags section */}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 {/* Pricing badge */}
//                 <div className="px-5 py-2.5 bg-indigo-600/20 backdrop-blur-md rounded-xl border border-indigo-400/30 inline-flex items-center justify-center gap-2 hover:bg-indigo-600/30 transition-colors duration-300">
//                   <span className="font-bold text-indigo-100">
//                     ${artist.priceUSD?.toLocaleString() || "0"}
//                   </span>
//                   <span className="text-sm text-indigo-200/80">Artist Fee</span>
//                   <div className="w-4 h-4 flex items-center justify-center text-indigo-300">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                       className="w-3 h-3"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 {safeArray(artist.vibeTags).length > 0 && (
//                   <div className="flex flex-wrap gap-2 justify-center md:justify-start">
//                     {safeArray(artist.vibeTags)
//                       .slice(0, 3)
//                       .map((tag, i) => (
//                         <span
//                           key={i}
//                           className="px-3 py-1 bg-gray-700/60 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-200 border border-gray-600/50 hover:bg-gray-700/80 transition-colors duration-200"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* Optional subtitle */}
//               <p className="text-gray-400 text-sm md:text-base max-w-lg">
//                 {artist.artistic_background?.roles?.join(" • ") ||
//                   "Professional Artist"}
//               </p>
//             </div>
//           </div>

//           {/* Decorative corner elements */}
//           <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-indigo-400/20 rounded-bl-2xl"></div>
//           <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-indigo-400/20 rounded-tr-2xl"></div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="mb-6 overflow-x-auto">
//           <div className="flex space-x-2 pb-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
//                   activeTab === tab.id ? colors.tabActive : colors.tabInactive
//                 }`}
//               >
//                 <span className="text-base">{tab.icon}</span>
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="min-h-[400px]">
//           <TabContent tabId={activeTab} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewArtistProfile;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ViewArtistProfile = () => {
  const { state } = useLocation();
  const artist = state;
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Add custom styles to head
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.4s ease-out forwards;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .text-balance {
        text-wrap: balance;
      }
      .platform-icon {
        transition: all 0.3s ease;
      }
      .platform-card:hover .platform-icon {
        transform: scale(1.1);
      }
      .glossy-black {
        background: linear-gradient(145deg, #030303 0%, #1a1a1a 100%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
      .neon-yellow {
        color: #e0ff00;
        text-shadow: 0 0 5px rgba(224, 255, 0, 0.5);
      }
      .neon-yellow-bg {
        background: rgba(224, 255, 0, 0.1);
        box-shadow: 0 0 10px rgba(224, 255, 0, 0.2);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Updated color palette with requested colors
  const colors = {
    primary: "bg-gradient-to-r from-gray-700 to-gray-800",
    primaryHover: "hover:from-gray-800 hover:to-gray-900",
    primaryText: "text-gray-400",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700",
    accent: "neon-yellow-bg",
    cardBg: "glossy-black",
    cardBorder: "border border-gray-800 shadow-lg shadow-black/50",
    sectionTitle: "text-gray-100",
    bodyText: "text-gray-400",
    lightBg: "bg-gradient-to-br from-gray-900 to-gray-800",
    tagBg: "bg-gray-800/80 text-gray-300 border border-gray-700",
    tabActive: "bg-gray-800 text-neon-yellow border-gray-700 shadow",
    tabInactive:
      "bg-gray-800/30 text-gray-400 border-gray-700 hover:bg-gray-800/50",
    hoverEffect:
      "hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 ease-out",
    divider: "border-gray-800",
    neonText: "neon-yellow",
    neonBorder: "border border-gray-700 hover:border-neon-yellow",
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "career", label: "Career", icon: "🎵" },
    { id: "creative", label: "Creative", icon: "🎨" },
    { id: "presence", label: "Online", icon: "🌐" },
  ];

  // Helper functions
  const getYearDisplay = (year) => {
    if (!year) return "??";
    const yearStr = String(year);
    return yearStr.length >= 2 ? yearStr.slice(-2) : yearStr;
  };

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  // Platform icons mapping
  const platformIcons = {
    spotify: "🎵",
    "apple music": "",
    "youtube music": "▶️",
    soundcloud: "☁️",
    tidal: "🌊",
    deezer: "🌀",
    "amazon music": "🅰️",
    bandcamp: "🅱️",
    default: "🎧",
  };

  const getPlatformIcon = (platformName) => {
    const lowerName = platformName.toLowerCase();
    for (const [key, icon] of Object.entries(platformIcons)) {
      if (lowerName.includes(key)) return icon;
    }
    return platformIcons.default;
  };

  const TabContent = ({ tabId }) => {
    switch (tabId) {
      case "overview":
        return (
          <div className="space-y-8 animate-fadeIn">
            {/* Identity & Artistic Background */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.primary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${colors.sectionTitle}`}>
                    Identity
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}></div>
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}>
                        Real Name
                      </span>
                      <p className={`${colors.bodyText} mt-1`}>
                        {artist.identity?.realName || "Not specified"}
                      </p>
                    </div>
                  </div>
                  {safeArray(artist.identity?.aliases).length > 0 && (
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}></div>
                      <div>
                        <span className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}>
                          Aliases
                        </span>
                        <p className={`${colors.bodyText} mt-1`}>
                          {artist.identity.aliases.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}></div>
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}>
                        Origin
                      </span>
                      <p className={`${colors.bodyText} mt-1`}>
                        {artist.identity?.origin || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}></div>
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}>
                        Based In
                      </span>
                      <p className={`${colors.bodyText} mt-1`}>
                        {artist.identity?.location || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.secondary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${colors.sectionTitle}`}>
                    Artistic Background
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}>
                    <h4 className={`font-semibold ${colors.neonText} mb-2`}>
                      Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safeArray(artist.artistic_background?.roles).map(
                        (role, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.tagBg}`}
                          >
                            {role}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}>
                    <h4 className={`font-semibold ${colors.neonText} mb-2`}>
                      Genres
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safeArray(artist.artistic_background?.genres).map(
                        (genre, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.tagBg}`}
                          >
                            {genre}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discography Preview */}
            {safeArray(artist.discography).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-6`}>
                  Latest Releases
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {safeArray(artist.discography)
                    .slice(0, 4)
                    .map((work, index) => (
                      <div
                        key={index}
                        className={`group relative overflow-hidden rounded-xl ${colors.cardBg} border ${colors.neonBorder} p-5`}
                      >
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 ${colors.primary}`}
                        ></div>
                        <div className="flex items-center mb-3">
                          <div
                            className={`w-9 h-9 ${colors.primary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3 text-xs font-bold`}
                          >
                            {getYearDisplay(work.year)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-100">
                              {work.title || "Untitled"}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {work.type || "Unknown"}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-400">
                          Label: {work.label || "Independent"}
                        </p>
                        <p className="mt-2 text-xs text-gray-300 line-clamp-2">
                          {work.details || "No details available"}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case "career":
        return (
          <div className="space-y-8 animate-fadeIn">
            {/* Career Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
              >
                <div
                  className={`w-12 h-12 ${colors.primary} rounded-xl flex items-center justify-center ${colors.neonText} mx-auto mb-3`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
                  Education
                </h3>
                <p className={`${colors.bodyText} text-xs`}>
                  {artist.career?.education || "Not specified"}
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
              >
                <div
                  className={`w-12 h-12 ${colors.secondary} rounded-xl flex items-center justify-center ${colors.neonText} mx-auto mb-3`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
                  Collaborations
                </h3>
                <p className={`${colors.bodyText} text-xs`}>
                  {safeArray(artist.career?.collaborations).length} projects
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
              >
                <div
                  className={`w-12 h-12 ${colors.accent} rounded-xl flex items-center justify-center ${colors.neonText} mx-auto mb-3`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
                  Awards
                </h3>
                <p className={`${colors.bodyText} text-xs`}>
                  {safeArray(artist.career?.awards).length} recognitions
                </p>
              </div>
            </div>

            {/* Detailed Career Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Recent Collaborations
                </h3>
                <div className="space-y-3">
                  {safeArray(artist.career?.collaborations).length > 0 ? (
                    safeArray(artist.career.collaborations)
                      .slice(0, 5)
                      .map((collab, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.neonText} bg-opacity-20`}></div>
                          <p className={`text-sm ${colors.bodyText}`}>
                            {collab}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No collaborations listed
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Notable Performances
                </h3>
                <div className="space-y-3">
                  {safeArray(artist.career?.performances).length > 0 ? (
                    safeArray(artist.career.performances)
                      .slice(0, 5)
                      .map((performance, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.neonText} bg-opacity-20`}></div>
                          <p className={`text-sm ${colors.bodyText}`}>
                            {performance}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No performances listed
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.primary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    ✍️
                  </div>
                  <h3 className={`text-lg font-bold ${colors.sectionTitle}`}>
                    Songwriting Process
                  </h3>
                </div>
                <div className={`text-sm ${colors.bodyText} space-y-3`}>
                  {artist.creative_process?.songwriting_process ? (
                    artist.creative_process.songwriting_process
                      .split("\n")
                      .map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                  ) : (
                    <p className="italic">
                      No songwriting process information available
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.secondary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    🎛️
                  </div>
                  <h3 className={`text-lg font-bold ${colors.sectionTitle}`}>
                    Production Process
                  </h3>
                </div>
                <div className={`text-sm ${colors.bodyText} space-y-3`}>
                  {artist.creative_process?.production_process ? (
                    artist.creative_process.production_process
                      .split("\n")
                      .map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                  ) : (
                    <p className="italic">
                      No production process information available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Current Availability */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Current Projects
                </h3>
                <div className="space-y-2">
                  {safeArray(artist.availability?.current_projects).length >
                  0 ? (
                    safeArray(artist.availability.current_projects).map(
                      (project, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div className={`w-2 h-2 rounded-full ${colors.neonText} animate-pulse`}></div>
                          <span className={`text-sm ${colors.bodyText}`}>
                            {project}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No current projects listed
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Looking For
                </h3>
                <div className="space-y-2">
                  {safeArray(artist.availability?.looking_for).length > 0 ? (
                    safeArray(artist.availability.looking_for).map(
                      (item, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div className={`w-2 h-2 rounded-full ${colors.neonText}`}></div>
                          <span className={`text-sm ${colors.bodyText}`}>
                            {item}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No specific requirements listed
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "presence":
        return (
          <div className="space-y-8 animate-fadeIn">
            {/* Enhanced Streaming Section */}
            <div
              className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
            >
              <h3
                className={`text-xl font-bold ${colors.sectionTitle} mb-6 flex items-center`}
              >
                <span className="mr-2">🎧</span> Streaming Platforms
              </h3>

              {safeArray(artist.online_presence?.streaming_platforms).length >
              0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {safeArray(artist.online_presence.streaming_platforms).map(
                    (platform, i) => (
                      <a
                        key={i}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-card group"
                      >
                        <div
                          className={`p-4 rounded-xl border ${colors.neonBorder} ${colors.cardBg} flex flex-col items-center text-center ${colors.hoverEffect}`}
                        >
                          <div className="platform-icon w-12 h-12 text-2xl mb-2 flex items-center justify-center">
                            {getPlatformIcon(platform.platform)}
                          </div>
                          <span className="text-sm font-medium text-gray-200 group-hover:text-neon-yellow">
                            {platform.platform}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            Stream now
                          </span>
                        </div>
                      </a>
                    )
                  )}
                </div>
              ) : (
                <p className={`${colors.bodyText} text-center italic`}>
                  No streaming platforms listed
                </p>
              )}
            </div>

            {/* Social Media & Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Website */}
              {artist.online_presence?.website && (
                <div
                  className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
                >
                  <h3
                    className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
                  >
                    <span className="mr-2">🌐</span> Official Website
                  </h3>
                  <a
                    href={artist.online_presence.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-full px-4 py-3 ${colors.primary} ${colors.primaryHover} text-white rounded-xl font-medium transition-all duration-300`}
                  >
                    Visit Website
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {/* Social Media */}
              {safeArray(artist.online_presence?.social_media).length > 0 && (
                <div
                  className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
                >
                  <h3
                    className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
                  >
                    <span className="mr-2">📱</span> Social Media
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {safeArray(artist.online_presence.social_media).map(
                      (platform, i) => (
                        <a
                          key={i}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-200 hover:text-neon-yellow transition-colors duration-300 flex items-center justify-center text-sm font-medium"
                        >
                          {platform.platform}
                        </a>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quotes Section */}
            {safeArray(artist.quotes).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3
                  className={`text-xl font-bold ${colors.sectionTitle} mb-6 text-center`}
                >
                  Artist Quotes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeArray(artist.quotes).map((quote, i) => (
                    <div
                      key={i}
                      className="relative p-4 rounded-xl bg-gray-800/50 border border-gray-700"
                    >
                      <div className={`absolute -top-1 -left-1 w-6 h-6 ${colors.neonText} bg-opacity-20 rounded-full flex items-center justify-center text-xs`}>
                        "
                      </div>
                      <blockquote
                        className={`italic ${colors.bodyText} text-sm leading-relaxed`}
                      >
                        {quote}
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading || !artist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-neon-yellow mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-300 animate-pulse">
            Loading artist profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="rounded-2xl glossy-black p-6 md:p-8 mb-6 shadow-xl overflow-hidden relative border border-gray-800">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700/10 to-transparent opacity-20"></div>

          {/* Content container */}
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
            {artist.imageUrl && (
              <div className="relative group">
                {/* Artist image with elegant frame */}
                <div
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-lg transition-all duration-500 ${
                    isImageLoaded ? "group-hover:scale-105" : ""
                  }`}
                >
                  <img
                    src={artist.imageUrl}
                    alt={artist.displayName || "Artist"}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
                  )}
                </div>
                {/* Decorative element */}
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 ${colors.neonText} bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold shadow-md`}>
                  ★
                </div>
              </div>
            )}

            <div className="flex-1 text-center md:text-left space-y-4">
              {/* Artist name with subtle gradient */}
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50">
                {artist.displayName || "Unknown Artist"}
              </h1>

              {/* Pricing and tags section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Pricing badge */}
                <div className={`px-5 py-2.5 ${colors.neonText} bg-opacity-20 backdrop-blur-md rounded-xl border ${colors.neonBorder} inline-flex items-center justify-center gap-2 hover:bg-opacity-30 transition-colors duration-300`}>
                  <span className="font-bold">
                    ${artist.priceUSD?.toLocaleString() || "0"}
                  </span>
                  <span className="text-sm">Artist Fee</span>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Tags */}
                {safeArray(artist.vibeTags).length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {safeArray(artist.vibeTags)
                      .slice(0, 3)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 ${colors.tagBg} rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors duration-200`}
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* Optional subtitle */}
              <p className="text-gray-400 text-sm md:text-base max-w-lg">
                {artist.artistic_background?.roles?.join(" • ") ||
                  "Professional Artist"}
              </p>
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-700 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gray-700 rounded-tr-2xl"></div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === tab.id ? colors.tabActive : colors.tabInactive
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <TabContent tabId={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default ViewArtistProfile;