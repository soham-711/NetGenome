// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useLocation } from 'react-router-dom';
// import { ShoppingCart, LogIn } from 'lucide-react';
// import bgImage from '../assets/i8.png';
// import logo from '../assets/logo.png';

// export default function AiFinal() {
//   const location = useLocation();
//   const [inputText, setInputText] = useState('');

//   const navItems = [
//     { label: 'Home', path: '/home' },
//     { label: 'Explore', path: '/explore' },
//     { label: 'AI Chat', path: '/ai_chat_land' },
//     { label: 'Collaborations', path: '/collaborations' },
//     { label: 'Join Community', path: '/join-community' },
//     { label: 'Connect', path: '/connect' },
//   ];

//   const handleSubmit = () => {
//     if (inputText.trim()) {
//       console.log("Input submitted:", inputText);
//       // Add your send logic here
//       setInputText('');
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="relative w-full h-screen font-sans overflow-hidden"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//       }}
//     >
//       {/* Navbar */}
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-24 z-50"
//       >
//         <img src={logo} alt="Logo" className="h-10 w-auto" />
//         <div className="hidden md:flex gap-8 items-center text-white text-sm">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               className="relative group text-white/80 hover:text-white transition duration-300"
//             >
//               {item.label}
//               <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
//             </Link>
//           ))}
//           <Link to="/cart" className="hover:text-white text-white/80 transition duration-300">
//             <ShoppingCart className="w-5 h-5" />
//           </Link>
//         </div>
//       </motion.nav>

//       {/* Blurred background accents */}
//       <div className="absolute w-20 h-[150%] top-[-30%] left-[5%] bg-[#242329] blur-[85px] rounded-full pointer-events-none" />
//       <div className="absolute w-20 h-[150%] top-[-30%] right-[5%] bg-[#242329] blur-[85px] rounded-full pointer-events-none" />

//       {/* Content layout */}
//       <div className="relative z-10 flex justify-between items-center h-full px-10 md:px-24">
//         {/* Left: Chat Bot Heading */}
//         <motion.h1
//           initial={{ x: -80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1.2, ease: 'easeOut' }}
//           className="text-white text-5xl md:text-[96px] font-[Recoleta] leading-tight"
//         >
//           Chat Bot
//         </motion.h1>

//         {/* Right: Description */}
//         <motion.p
//           initial={{ x: 80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
//           className="text-white text-base md:text-lg max-w-80 font-light text-justify"
//         >
//           Our chatbot is a smart, easy-to-use assistant that helps you find the right music artists,
//           producers, or collaborators. Just share your preferences, and it will instantly match you
//           with the most suitable connections based on genre, style, and role.
//         </motion.p>
//       </div>

//       {/* Bottom Input Box with Door Icon */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
//         className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl z-50"
//       >
//         <div className="relative group">
//           <input
//             type="text"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//             placeholder="Ask anything..."
//             className="w-full px-5 pr-12 py-3 text-white bg-white/10 border border-white/30 rounded-xl backdrop-blur-md placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
//           />
//           {/* Door Icon */}
//           <button
//             onClick={handleSubmit}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition"
//           >
//             <LogIn className="w-5 h-5" />
//           </button>

//           {/* Hover Underline */}
//           <div className="absolute bottom-0 left-0 h-0.5 bg-white w-0 group-hover:w-full transition-all duration-500" />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ShoppingCart, LogIn, Users, RefreshCw } from "lucide-react";
// import axios from "axios";
// import bgImage from "../assets/i8.png";
// import logo from "../assets/logo.png";

// export default function AiFinal() {
//   const [inputText, setInputText] = useState("");
//   const [chat, setChat] = useState([]);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [userResponses, setUserResponses] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [showInput, setShowInput] = useState(true);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [currentStep, setCurrentStep] = useState(null);
//   const [awaitingResponse, setAwaitingResponse] = useState(false);
//   const [userProfile, setUserProfile] = useState(null);
//   const [isModifying, setIsModifying] = useState(false);
//   const [matchingData, setMatchingData] = useState(null);

//   const navItems = [
//     { label: "Home", path: "/home" },
//     { label: "Explore", path: "/explore" },
//     { label: "AI Chat", path: "/ai_chat_land" },
//     { label: "Collaborations", path: "/collaborations" },
//     { label: "Join Community", path: "/join-community" },
//     { label: "Connect", path: "/connect" },
//   ];

//   // Initialize the conversation
//   useEffect(() => {
//     initializeChat();
//   }, []);

//   const initializeChat = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(
//         `http://localhost:5000/api/onboarding/step?stepIndex=0`
//       );

//       const data = response.data;
//       if (data.step) {
//         setCurrentStep(data.step);
//         setCurrentStepIndex(data.stepIndex);

//         // Add welcome message and first question
//         setChat([
//           {
//             role: "bot",
//             text: "Hi! I'm here to help you find perfect music collaborators. Let me ask you a few questions to understand your preferences better.",
//           },
//           {
//             role: "bot",
//             text: data.step.question,
//             hint: data.step.hint,
//             options: data.step.options || null,
//             type: data.step.type,
//           },
//         ]);
//         setAwaitingResponse(true);
//       }
//     } catch (error) {
//       console.error("Initialization error:", error);
//       setChat([
//         {
//           role: "bot",
//           text: "Sorry, I'm having trouble connecting. Please try again later.",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (manualInput) => {
//     if (isCompleted && !isModifying) {
//       // Handle post-completion interactions
//       await handlePostCompletionChat(manualInput);
//       return;
//     }

//     const input = manualInput || inputText.trim();
//     if (!input || !awaitingResponse) return;

//     // Add user message to chat
//     setChat((prev) => [...prev, { role: "user", text: input }]);
//     setInputText("");
//     setIsLoading(true);
//     setAwaitingResponse(false);

//     try {
//       let processedAnswer = input;

//       // If it's a natural language response for a structured question, process it first
//       if (
//         currentStep &&
//         currentStep.type !== "text" &&
//         !currentStep.options?.includes(input)
//       ) {
//         try {
//           const nlpResponse = await axios.post(
//             "http://localhost:5000/api/onboarding/process-message",
//             {
//               message: input,
//               stepIndex: currentStepIndex,
//             }
//           );

//           if (nlpResponse.data.processedAnswer) {
//             processedAnswer = nlpResponse.data.processedAnswer;
//             // Add bot explanation of interpretation
//             setChat((prev) => [
//               ...prev,
//               {
//                 role: "bot",
//                 text: `I understand you meant: ${
//                   Array.isArray(processedAnswer)
//                     ? processedAnswer.join(", ")
//                     : processedAnswer
//                 }`,
//               },
//             ]);
//           }
//         } catch (nlpError) {
//           console.log("NLP processing failed, using original input");
//         }
//       }

//       // Process the step with the answer
//       const response = await axios.post(
//         "http://localhost:5000/api/onboarding/step",
//         {
//           stepIndex: currentStepIndex,
//           answer: processedAnswer,
//           userResponses: userResponses,
//         }
//       );

//       const data = response.data;

//       // Update user responses
//       if (data.userResponses) {
//         setUserResponses(data.userResponses);
//       }

//       if (data.completed) {
//         // Onboarding completed
//         setUserProfile(data.profile);
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "bot",
//             text: "Perfect! I've created your profile. Here's what I learned about you:",
//           },
//           {
//             role: "bot",
//             text: `🎵 **Musical Style**: ${data.profile.musicalStyle}\n\n🤝 **Looking for**: ${data.profile.collaborationPreferences}\n\n💪 **Your Strengths**: ${data.profile.strengths}\n\n🎯 **Ideal Matches**: ${data.profile.idealMatches}`,
//             isProfile: true,
//           },
//           {
//             role: "bot",
//             text: "Would you like me to start finding collaborators for you, or would you like to modify any of these preferences?",
//             showActionButtons: true,
//           },
//         ]);
//         setIsCompleted(true);
//         setIsModifying(false);
//         setAwaitingResponse(true);
//       } else if (data.step) {
//         // Move to next step
//         setCurrentStep(data.step);
//         setCurrentStepIndex(data.stepIndex);

//         // Add next question
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "bot",
//             text: data.step.question,
//             hint: data.step.hint,
//             options: data.step.options || null,
//             type: data.step.type,
//           },
//         ]);
//         setAwaitingResponse(true);
//       }
//     } catch (error) {
//       console.error("Step processing error:", error);
//       setChat((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           text: "I'm having trouble processing that. Could you try again?",
//         },
//       ]);
//       setAwaitingResponse(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePostCompletionChat = async (input) => {
//     const message = input || inputText.trim();
//     if (!message) return;

//     // Add user message to chat
//     setChat((prev) => [...prev, { role: "user", text: message }]);
//     setInputText("");
//     setIsLoading(true);
//     setAwaitingResponse(false);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/onboarding/chat",
//         {
//           message: message,
//           userProfile: userProfile,
//           userResponses: userResponses,
//         }
//       );

//       const data = response.data;

//       // Add bot response
//       setChat((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           text: data.response,
//         },
//       ]);

//       setAwaitingResponse(true);
//     } catch (error) {
//       console.error("Post-completion chat error:", error);
//       setChat((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           text: "I'm having trouble processing that. Could you try asking in a different way?",
//         },
//       ]);
//       setAwaitingResponse(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleModifyPreferences = async () => {
//     setIsModifying(true);
//     setIsCompleted(false);
//     setAwaitingResponse(false);

//     // Add message about modification
//     setChat((prev) => [
//       ...prev,
//       {
//         role: "user",
//         text: "I want to modify my preferences",
//       },
//       {
//         role: "bot",
//         text: "No problem! Let's go through your preferences again. I'll ask you the same questions, and you can update any answers you'd like to change.",
//       },
//     ]);

//     // Restart the onboarding process
//     setTimeout(() => {
//       initializeChat();
//     }, 1000);
//   };

//   const handleFindCollaborators = async () => {
//     setIsLoading(true);
//     setAwaitingResponse(false);

//     // Add user action to chat
//     setChat((prev) => [
//       ...prev,
//       {
//         role: "user",
//         text: "Start finding collaborators for me",
//       },
//       {
//         role: "bot",
//         text: "Great! I'm searching for collaborators that match your preferences...",
//       },
//     ]);

//     try {
//       // Prepare matching data to send to your matching endpoint
//       const matchingPayload = {
//         userProfile: userProfile,
//         userResponses: userResponses,
//         searchCriteria: {
//           genres: userResponses.genres || [],
//           roles: userResponses.roles || [],
//           vibeTags: userResponses.vibeTags || [],
//           location: userResponses.location || "Remote",
//           languages: userResponses.language || ["English"],
//           genders: userResponses.genders || "Male",
//         },
//         preferences: {
//           maxDistance: userResponses.location === "Remote" ? null : 50, // km
//           similarityThreshold: 0.7,
//           minProfileScore: 60,
//         },
//       };

//       console.log("Matching payload:", matchingPayload);
//       setMatchingData(matchingPayload);

//       // You can call your matching API here
//       // const matchingResponse = await axios.post(
//       //   "http://localhost:5000/api/matching/find-collaborators",
//       //   matchingPayload
//       // );

//       // For now, simulate the response
//       setTimeout(() => {
//         setChat((prev) => [
//           ...prev,
//           {
//             role: "bot",
//             text: "🎉 Perfect! I've prepared your matching criteria. Here's what I'll use to find your collaborators:",
//           },
//           {
//             role: "bot",
//             text: `📍 **Location**: ${
//               matchingPayload.searchCriteria.location
//             }\n🎵 **Genres**: ${matchingPayload.searchCriteria.genres.join(
//               ", "
//             )}\n🎭 **Looking for**: ${matchingPayload.searchCriteria.roles.join(
//               ", "
//             )}\n✨ **Vibe**: ${matchingPayload.searchCriteria.vibeTags.join(
//               ", "
//             )}\n🌐 **Languages**: ${matchingPayload.searchCriteria.languages.join(
//               ", "
//             )}\n🌐 **Gender**: ${matchingPayload.searchCriteria.genders}`,
//             isMatchingData: true,
//           },
//           {
//             role: "bot",
//             text: "Your matching data is ready! You can now use this to find perfect collaborators. Would you like me to help you with anything else?",
//             showMatchingActions: true,
//           },
//         ]);
//         setAwaitingResponse(true);
//         setIsLoading(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Find collaborators error:", error);
//       setChat((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           text: "I'm having trouble setting up the matching. Please try again.",
//         },
//       ]);
//       setAwaitingResponse(true);
//       setIsLoading(false);
//     }
//   };

//   const handleOptionClick = (option) => {
//     handleSubmit(option);
//   };

//   const handleMultipleSelection = (options) => {
//     handleSubmit(options.join(", "));
//   };

//   const renderMessage = (msg, index) => {
//     // Action buttons for completed profile
//     if (msg.showActionButtons) {
//       return (
//         <div key={index} className="space-y-3">
//           <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
//             {msg.text}
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={handleFindCollaborators}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm rounded-full hover:from-green-600 hover:to-blue-600 transition"
//               disabled={isLoading}
//             >
//               <Users className="w-4 h-4" />
//               Find Collaborators
//             </button>
//             <button
//               onClick={handleModifyPreferences}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-full hover:from-orange-600 hover:to-red-600 transition"
//               disabled={isLoading}
//             >
//               <RefreshCw className="w-4 h-4" />
//               Modify Preferences
//             </button>
//           </div>
//         </div>
//       );
//     }

//     // Matching actions
//     if (msg.showMatchingActions) {
//       return (
//         <div key={index} className="space-y-3">
//           <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
//             {msg.text}
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => {
//                 // You can redirect to collaborators page or show matches
//                 console.log("Matching data:", matchingData);
//                 // Example: navigate to collaborators page with matching data
//                 // navigate('/collaborators', { state: { matchingData } });
//               }}
//               className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full hover:from-purple-600 hover:to-pink-600 transition"
//             >
//               View Matches
//             </button>
//             <button
//               onClick={() => {
//                 // Save matching preferences
//                 localStorage.setItem(
//                   "userMatchingData",
//                   JSON.stringify(matchingData)
//                 );
//                 setChat((prev) => [
//                   ...prev,
//                   {
//                     role: "bot",
//                     text: "Your matching preferences have been saved! You can use them anytime to find collaborators.",
//                   },
//                 ]);
//               }}
//               className="px-4 py-2 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition"
//             >
//               Save Preferences
//             </button>
//           </div>
//         </div>
//       );
//     }

//     if (msg.role === "bot" && msg.options && msg.type === "multiple_choice") {
//       return (
//         <div key={index} className="space-y-3">
//           <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
//             {msg.text}
//             {msg.hint && (
//               <div className="text-xs text-white/70 mt-1">{msg.hint}</div>
//             )}
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {msg.options.map((option, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleOptionClick(option)}
//                 className="px-3 py-1 bg-white/20 text-white text-xs rounded-full hover:bg-white/30 transition"
//                 disabled={!awaitingResponse}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     if (msg.role === "bot" && msg.options && msg.type === "single_choice") {
//       return (
//         <div key={index} className="space-y-3">
//           <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
//             {msg.text}
//             {msg.hint && (
//               <div className="text-xs text-white/70 mt-1">{msg.hint}</div>
//             )}
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {msg.options.map((option, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleOptionClick(option)}
//                 className="px-3 py-1 bg-white/20 text-white text-xs rounded-full hover:bg-white/30 transition"
//                 disabled={!awaitingResponse}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div
//         key={index}
//         className={`text-sm px-4 py-2 rounded-xl max-w-xs ${
//           msg.role === "user"
//             ? "bg-white/20 text-white text-right ml-auto"
//             : "bg-white/10 text-left text-white"
//         } ${
//           msg.isProfile || msg.isMatchingData
//             ? "max-w-md whitespace-pre-line"
//             : ""
//         }`}
//       >
//         {msg.text}
//         {msg.hint && msg.role === "bot" && !msg.options && (
//           <div className="text-xs text-white/70 mt-1">{msg.hint}</div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="relative w-full h-screen font-sans overflow-hidden"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Navbar */}
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-24 z-50"
//       >
//         <img src={logo} alt="Logo" className="h-10 w-auto" />
//         <div className="hidden md:flex gap-8 items-center text-white text-sm">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               className="relative group text-white/80 hover:text-white transition duration-300"
//             >
//               {item.label}
//               <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
//             </Link>
//           ))}
//           <Link
//             to="/cart"
//             className="hover:text-white text-white/80 transition duration-300"
//           >
//             <ShoppingCart className="w-5 h-5" />
//           </Link>
//         </div>
//       </motion.nav>

//       {/* Background accents */}
//       <div className="absolute w-20 h-[150%] top-[-30%] left-[5%] bg-[#242329] blur-[85px] rounded-full pointer-events-none" />
//       <div className="absolute w-20 h-[150%] top-[-30%] right-[5%] bg-[#242329] blur-[85px] rounded-full pointer-events-none" />

//       {/* Heading and description */}
//       <div className="relative z-10 flex justify-between items-center h-full px-10 md:px-24">
//         <motion.h1
//           initial={{ x: -80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//           className="text-white text-5xl md:text-[96px] font-[Recoleta] leading-tight"
//         >
//           Chat Bot
//         </motion.h1>
//         <motion.p
//           initial={{ x: 80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
//           className="text-white text-base md:text-lg max-w-80 font-light text-justify"
//         >
//           Our chatbot helps you find music collaborators based on your
//           preferences—like role, genre, vibe, and location.
//         </motion.p>
//       </div>

//       {/* Progress indicator */}
//       {!isCompleted && currentStep && (
//         <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-64 z-50">
//           <div className="bg-white/10 rounded-full h-2">
//             <div
//               className="bg-white h-2 rounded-full transition-all duration-500"
//               style={{ width: `${((currentStepIndex + 1) / 6) * 100}%` }}
//             />
//           </div>
//           <div className="text-white text-xs text-center mt-1">
//             Step {currentStepIndex + 1} of 6
//           </div>
//         </div>
//       )}

//       {/* Chat Messages */}
//       <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl z-50 space-y-3 overflow-y-auto max-h-80">
//         {chat.map((msg, i) => renderMessage(msg, i))}
//         {isLoading && (
//           <div className="text-white text-sm animate-pulse bg-white/10 px-4 py-2 rounded-xl w-fit">
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
//               <div
//                 className="w-2 h-2 bg-white rounded-full animate-bounce"
//                 style={{ animationDelay: "0.1s" }}
//               ></div>
//               <div
//                 className="w-2 h-2 bg-white rounded-full animate-bounce"
//                 style={{ animationDelay: "0.2s" }}
//               ></div>
//               <span className="ml-2">Thinking...</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input Field */}
//       {showInput && (
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut", delay: 1 }}
//           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl z-50"
//         >
//           <div className="relative group">
//             <input
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//               placeholder={
//                 isCompleted && !isModifying
//                   ? "Ask me anything about your profile or collaborators..."
//                   : currentStep?.type === "text"
//                   ? currentStep.placeholder || "Type your answer..."
//                   : "Type your answer or click the options above..."
//               }
//               className="w-full px-5 pr-12 py-3 text-white bg-white/10 border border-white/30 rounded-xl backdrop-blur-md placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
//               disabled={isLoading}
//             />
//             <button
//               onClick={() => handleSubmit()}
//               disabled={isLoading || !inputText.trim()}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition disabled:opacity-50"
//             >
//               <LogIn className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Input hints */}
//           {currentStep && currentStep.type === "multiple_choice" && (
//             <div className="text-xs text-white/60 mt-2 text-center">
//               💡 You can click the options above or type your answer naturally
//             </div>
//           )}

//           {/* Display matching data info */}
//           {matchingData && (
//             <div className="text-xs text-green-400 mt-2 text-center">
//               🎯 Matching data ready - check console for details
//             </div>
//           )}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  LogIn,
  Users,
  RefreshCw,
  Eye,
  Heart,
} from "lucide-react";
import axios from "axios";
import bgImage from "../assets/i8.png";
import logo from "../assets/logo.png";

export default function AiFinal() {
  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [matchingData, setMatchingData] = useState(null);
  const [foundMatches, setFoundMatches] = useState([]);
  const [isSearchingMatches, setIsSearchingMatches] = useState(false);
  const navigate = useNavigate();
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat, isLoading]); // auto-scroll when new messages arrive or loading starts

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Explore", path: "/explore" },
    { label: "AI Chat", path: "/ai_chat_land" },
    { label: "Collaborations", path: "/collaborations" },
    { label: "Join Community", path: "/join-community" },
    { label: "Connect", path: "/connect" },
  ];

  // Initialize the conversation
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     initializeChat();
  //   }, 2000); // delay 1 second (adjust if needed)

  //   return () => clearTimeout(timer); // cleanup
  // }, []);

  const initializeChat = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/onboarding/step?stepIndex=0`
      );

      const data = response.data;
      if (data.step) {
        setCurrentStep(data.step);
        setCurrentStepIndex(data.stepIndex);

        // Add welcome message and first question
        setChat((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Hi! I'm here to help you find perfect music collaborators. Let me ask you a few questions to understand your preferences better.",
          },
          {
            role: "bot",
            text: data.step.question,
            hint: data.step.hint,
            options: data.step.options || null,
            type: data.step.type,
          },
        ]);
        setAwaitingResponse(true);
      }
    } catch (error) {
      console.error("Initialization error:", error);
      setChat([
        {
          role: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (manualInput) => {
    let input = manualInput || inputText.trim();
    if (!input) return;

    const loweredInput = input.toLowerCase();

    // Step 1: Trigger onboarding when user types "hi" as first message
    if (chat.length === 0 && ["hi", "hello", "hey"].includes(loweredInput)) {
      setChat((prev) => [...prev, { role: "user", text: input }]);
      initializeChat(); // show welcome and first question
      setInputText("");
      setAwaitingResponse(true);
      return;
    }

    // Step 2: If user types something else first
    if (chat.length === 0) {
      setChat([
        {
          role: "bot",
          text: "👋 Please type 'Hi' to begin your onboarding.",
        },
      ]);
      setInputText("");
      setAwaitingResponse(true);
      return;
    }

    // Step 3: Handle post-completion questions
    if (isCompleted && !isModifying) {
      await handlePostCompletionChat(input);
      return;
    }

    // Step 4: Ignore if response isn't expected
    if (!awaitingResponse) return;

    // Step 5: Add user message to chat
    setChat((prev) => [...prev, { role: "user", text: input }]);
    setInputText("");
    setIsLoading(true);
    setAwaitingResponse(false);

    try {
      let processedAnswer = input;

      // Step 6: NLP processing (if input doesn't match options)
      if (
        currentStep &&
        currentStep.type !== "text" &&
        !currentStep.options?.includes(input)
      ) {
        try {
          const nlpResponse = await axios.post(
            "http://localhost:5000/api/onboarding/process-message",
            {
              message: input,
              stepIndex: currentStepIndex,
            }
          );

          if (nlpResponse.data.processedAnswer) {
            processedAnswer = nlpResponse.data.processedAnswer;

            // Add bot clarification message
            setChat((prev) => [
              ...prev,
              {
                role: "bot",
                text: `I understand you meant: ${
                  Array.isArray(processedAnswer)
                    ? processedAnswer.join(", ")
                    : processedAnswer
                }`,
              },
            ]);
          }
        } catch (nlpError) {
          console.log("NLP processing failed, using original input");
        }
      }

      // Step 7: Send answer to backend and get next step
      const response = await axios.post(
        "http://localhost:5000/api/onboarding/step",
        {
          stepIndex: currentStepIndex,
          answer: processedAnswer,
          userResponses: userResponses,
        }
      );

      const data = response.data;

      // Step 8: Update user responses
      if (data.userResponses) {
        setUserResponses(data.userResponses);
      }

      // Step 9: Handle completion
      if (data.completed) {
        setUserProfile(data.profile);
        setChat((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Perfect! I've created your profile. Here's what I learned about you:",
          },
          {
            role: "bot",
            text: `🎵 **Musical Style**: ${data.profile.musicalStyle}\n\n🤝 **Looking for**: ${data.profile.collaborationPreferences}\n\n💪 **Your Strengths**: ${data.profile.strengths}\n\n🎯 **Ideal Matches**: ${data.profile.idealMatches}`,
            isProfile: true,
          },
          {
            role: "bot",
            text: "Would you like me to start finding collaborators for you, or would you like to modify any of these preferences?",
            showActionButtons: true,
          },
        ]);
        setIsCompleted(true);
        setIsModifying(false);
        setAwaitingResponse(true);
      }

      // Step 10: Move to next onboarding step
      else if (data.step) {
        setCurrentStep(data.step);
        setCurrentStepIndex(data.stepIndex);
        setChat((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.step.question,
            hint: data.step.hint,
            options: data.step.options || null,
            type: data.step.type,
          },
        ]);
        setAwaitingResponse(true);
      }
    } catch (error) {
      console.error("Step processing error:", error);
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm having trouble processing that. Could you try again?",
        },
      ]);
      setAwaitingResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (manualInput) => {
  //   if (isCompleted && !isModifying) {
  //     // Handle post-completion interactions
  //     await handlePostCompletionChat(manualInput);
  //     return;
  //   }

  //   const input = manualInput || inputText.trim();
  //   if (!input || !awaitingResponse) return;

  //   // Add user message to chat
  //   setChat((prev) => [...prev, { role: "user", text: input }]);
  //   setInputText("");
  //   setIsLoading(true);
  //   setAwaitingResponse(false);

  //   try {
  //     let processedAnswer = input;

  //     // If it's a natural language response for a structured question, process it first
  //     if (
  //       currentStep &&
  //       currentStep.type !== "text" &&
  //       !currentStep.options?.includes(input)
  //     ) {
  //       try {
  //         const nlpResponse = await axios.post(
  //           "http://localhost:5000/api/onboarding/process-message",
  //           {
  //             message: input,
  //             stepIndex: currentStepIndex,
  //           }
  //         );

  //         if (nlpResponse.data.processedAnswer) {
  //           processedAnswer = nlpResponse.data.processedAnswer;
  //           // Add bot explanation of interpretation
  //           setChat((prev) => [
  //             ...prev,
  //             {
  //               role: "bot",
  //               text: `I understand you meant: ${
  //                 Array.isArray(processedAnswer)
  //                   ? processedAnswer.join(", ")
  //                   : processedAnswer
  //               }`,
  //             },
  //           ]);
  //         }
  //       } catch (nlpError) {
  //         console.log("NLP processing failed, using original input");
  //       }
  //     }

  //     // Process the step with the answer
  //     const response = await axios.post(
  //       "http://localhost:5000/api/onboarding/step",
  //       {
  //         stepIndex: currentStepIndex,
  //         answer: processedAnswer,
  //         userResponses: userResponses,
  //       }
  //     );

  //     const data = response.data;

  //     // Update user responses
  //     if (data.userResponses) {
  //       setUserResponses(data.userResponses);
  //     }

  //     if (data.completed) {
  //       // Onboarding completed
  //       setUserProfile(data.profile);
  //       setChat((prev) => [
  //         ...prev,
  //         {
  //           role: "bot",
  //           text: "Perfect! I've created your profile. Here's what I learned about you:",
  //         },
  //         {
  //           role: "bot",
  //           text: `🎵 **Musical Style**: ${data.profile.musicalStyle}\n\n🤝 **Looking for**: ${data.profile.collaborationPreferences}\n\n💪 **Your Strengths**: ${data.profile.strengths}\n\n🎯 **Ideal Matches**: ${data.profile.idealMatches}`,
  //           isProfile: true,
  //         },
  //         {
  //           role: "bot",
  //           text: "Would you like me to start finding collaborators for you, or would you like to modify any of these preferences?",
  //           showActionButtons: true,
  //         },
  //       ]);
  //       setIsCompleted(true);
  //       setIsModifying(false);
  //       setAwaitingResponse(true);
  //     } else if (data.step) {
  //       // Move to next step
  //       setCurrentStep(data.step);
  //       setCurrentStepIndex(data.stepIndex);

  //       // Add next question
  //       setChat((prev) => [
  //         ...prev,
  //         {
  //           role: "bot",
  //           text: data.step.question,
  //           hint: data.step.hint,
  //           options: data.step.options || null,
  //           type: data.step.type,
  //         },
  //       ]);
  //       setAwaitingResponse(true);
  //     }
  //   } catch (error) {
  //     console.error("Step processing error:", error);
  //     setChat((prev) => [
  //       ...prev,
  //       {
  //         role: "bot",
  //         text: "I'm having trouble processing that. Could you try again?",
  //       },
  //     ]);
  //     setAwaitingResponse(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handlePostCompletionChat = async (input) => {
    const message = input || inputText.trim();
    if (!message) return;

    // Add user message to chat
    setChat((prev) => [...prev, { role: "user", text: message }]);
    setInputText("");
    setIsLoading(true);
    setAwaitingResponse(false);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/onboarding/chat",
        {
          message: message,
          userProfile: userProfile,
          userResponses: userResponses,
        }
      );

      const data = response.data;

      // Add bot response
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.response,
        },
      ]);

      setAwaitingResponse(true);
    } catch (error) {
      console.error("Post-completion chat error:", error);
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm having trouble processing that. Could you try asking in a different way?",
        },
      ]);
      setAwaitingResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModifyPreferences = async () => {
    setIsModifying(true);
    setIsCompleted(false);
    setAwaitingResponse(false);

    // Add message about modification
    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: "I want to modify my preferences",
      },
      {
        role: "bot",
        text: "No problem! Let's go through your preferences again. I'll ask you the same questions, and you can update any answers you'd like to change.",
      },
    ]);

    // Restart the onboarding process
    setTimeout(() => {
      initializeChat();
    }, 1000);
  };

  const handleFindCollaborators = async () => {
    setIsSearchingMatches(true);
    setIsLoading(true);
    setAwaitingResponse(false);

    // Add user action to chat
    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: "Start finding collaborators for me",
      },
      {
        role: "bot",
        text: "Great! I'm searching for collaborators that match your preferences...",
      },
    ]);

    try {
      // Prepare matching data to send to your matching endpoint
      console.log(userResponses);

      const matchingPayload = {
        userProfile: userProfile,
        userResponses: userResponses,
        searchCriteria: {
          genres: userResponses.genres || [],
          roles: userResponses.roles || [],
          vibeTags: userResponses.vibeTags || [],
          location: userResponses.location || "Remote",
          languages: userResponses.language || ["English"],
          genders: userResponses.gender || "Any",
        },
        preferences: {
          maxDistance: userResponses.location === "Remote" ? null : 50, // km
          similarityThreshold: 0.7,
          minProfileScore: 60,
        },
      };

      const backendData = {
        collected: {
          roles: userResponses.roles || [],
          genres: userResponses.genres || [],
          vibeTags: userResponses.vibeTags || [],
          language: userResponses.language || ["English"],
          location: userResponses.location || "Remote",
          genderPreference: userResponses.gender || "Any",
        },
      };

      console.log("Matching payload:", matchingPayload);
      setMatchingData(matchingPayload);

      // Call your matching API
      const matchingResponse = await axios.post(
        "http://localhost:5000/api/match",
        backendData
      );

      console.log("Matching API Response:", matchingResponse.data);
      console.log(matchingResponse.data.perfectMatches);
      console.log(matchingResponse.data.perfectMatches.length);

      // Check if we got matches
      const { perfectMatches = [], suggestedMatches = [] } =
        matchingResponse.data;
      if (perfectMatches.length > 0 || suggestedMatches.length > 0) {
        const matches = { perfectMatches, suggestedMatches };
        setFoundMatches(matches);

        const totalMatches = perfectMatches.length + suggestedMatches.length;

        setChat((prev) => [
          ...prev,
          {
            role: "bot",
            text: `🎉 Fantastic! I found ${totalMatches} potential collaborators for you!`,
          },
          {
            role: "bot",
            text: `📍 **Location**: ${
              matchingPayload.searchCriteria.location
            }\n🎵 **Genres**: ${matchingPayload.searchCriteria.genres.join(
              ", "
            )}\n🎭 **Looking for**: ${matchingPayload.searchCriteria.roles.join(
              ", "
            )}\n✨ **Vibe**: ${matchingPayload.searchCriteria.vibeTags.join(
              ", "
            )}\n🌐 **Languages**: ${matchingPayload.searchCriteria.languages.join(
              ", "
            )}\n👥 **Gender**: ${
              matchingPayload.searchCriteria.genders
            }\n\n🔍 **Found ${totalMatches} matches**`,
            isMatchingData: true,
          },
          {
            role: "bot",
            text: "Perfect! Your matches are ready. Click 'View Matches' to see all the profiles that match your preferences!",
            showMatchingActions: true,
          },
        ]);
      } else {
        setFoundMatches({ perfectMatches: [], suggestedMatches: [] });

        setChat((prev) => [
          ...prev,
          {
            role: "bot",
            text: "I couldn't find any matches at the moment. This could be because there are no users matching your exact criteria, or they might be added later.",
          },
          {
            role: "bot",
            text: `**Your Search Criteria**:\n 📍 **Location**: ${
              matchingPayload.searchCriteria.location
            }\n🎵 **Genres**: ${matchingPayload.searchCriteria.genres.join(
              ", "
            )}\n🎭 **Looking for**: ${matchingPayload.searchCriteria.roles.join(
              ", "
            )}\n✨ **Vibe**: ${matchingPayload.searchCriteria.vibeTags.join(
              ", "
            )}\n🌐 **Languages**: ${matchingPayload.searchCriteria.languages.join(
              ", "
            )}\n👥 **Gender**: ${matchingPayload.searchCriteria.genders}`,
            isMatchingData: true,
          },
          {
            role: "bot",
            text: "Would you like to modify your preferences to find more matches, or try searching again?",
            showRetryActions: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Find collaborators error:", error);

      // Clear any previous matches on error
      setFoundMatches([]);

      // Handle different types of errors - ERROR CASE
      let errorMessage = "I'm having trouble finding collaborators right now. ";

      if (error.response) {
        // Server responded with error
        if (error.response.status === 404) {
          errorMessage +=
            "The matching service is not available. Please try again later.";
        } else if (error.response.status === 500) {
          errorMessage +=
            "There's a server issue. Please try again in a few minutes.";
        } else {
          errorMessage += `Server error: ${
            error.response.data.message || "Unknown error"
          }`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage +=
          "Cannot connect to the matching service. Please check your internet connection.";
      } else {
        // Something else happened
        errorMessage += "An unexpected error occurred. Please try again.";
      }

      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: errorMessage,
        },
        {
          role: "bot",
          text: "Would you like to try again or modify your preferences?",
          showRetryActions: true, // Show "Try Again" button for errors
        },
      ]);
    } finally {
      setIsSearchingMatches(false);
      setIsLoading(false);
      setAwaitingResponse(true);
    }
  };

  const handleViewMatches = () => {
    const perfectMatches = foundMatches.perfectMatches || [];
    const suggestedMatches = foundMatches.suggestedMatches || [];
    const allMatches = [...perfectMatches, ...suggestedMatches];
    // Show summary in chat
    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: "Show me all the matching profiles",
      },
      {
        role: "bot",
        text: `📋 **Profile Summary**:\n\n🔍 **Total Matches**: ${
          allMatches.length
        }\n\n${allMatches
          .map(
            (profile, index) =>
              `${index + 1}. **${
                profile.name || profile.username || "Unknown User"
              }**\n   🎵 ${(profile.genres || []).join(", ")}\n   🎭 ${(
                profile.roles || []
              ).join(", ")}\n   📍 ${
                profile.location || "Unknown"
              }\n   ⭐ Score: ${profile.matchScore || "N/A"}%`
          )
          .join(
            "\n\n"
          )}\n\n💡 **Check your browser console for detailed profile information!**`,
        isProfileList: true,
      },
    ]);
    
    navigate("/matches", {
      state: {
        foundMatches: foundMatches, // contains { perfectMatches, suggestedMatches }
      },
    });
  };

  const handleSavePreferences = () => {
    try {
      // Save to localStorage (Note: This is just for demo, in real app you'd save to your backend)
      const dataToSave = {
        userProfile,
        userResponses,
        matchingData,
        foundMatches,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("userMatchingData", JSON.stringify(dataToSave));

      setChat((prev) => [
        ...prev,
        {
          role: "user",
          text: "Save my preferences",
        },
        {
          role: "bot",
          text: "✅ Your matching preferences and found profiles have been saved successfully! You can use them anytime to find collaborators or continue where you left off.",
        },
      ]);
    } catch (error) {
      console.error("Save preferences error:", error);
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: "❌ Sorry, I couldn't save your preferences. Please try again.",
        },
      ]);
    }
  };

  const handleRetrySearch = () => {
    handleFindCollaborators();
  };

  const handleOptionClick = (option) => {
    handleSubmit(option);
  };

  const handleMultipleSelection = (options) => {
    handleSubmit(options.join(", "));
  };

  const renderMessage = (msg, index) => {
    // Action buttons for completed profile
    if (msg.showActionButtons) {
      return (
        <div key={index} className="space-y-3">
          <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
            {msg.text}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleFindCollaborators}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm rounded-full hover:from-green-600 hover:to-blue-600 transition disabled:opacity-50"
              disabled={isLoading || isSearchingMatches}
            >
              <Users className="w-4 h-4" />
              {isSearchingMatches ? "Searching..." : "Find Collaborators"}
            </button>
            <button
              onClick={handleModifyPreferences}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-full hover:from-orange-600 hover:to-red-600 transition"
              disabled={isLoading || isSearchingMatches}
            >
              <RefreshCw className="w-4 h-4" />
              Modify Preferences
            </button>
          </div>
        </div>
      );
    }

    // Matching actions
    if (msg.showMatchingActions) {
      return (
        <div key={index} className="space-y-3">
          <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
            {msg.text}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleViewMatches}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full hover:from-purple-600 hover:to-pink-600 transition"
            >
              <Eye className="w-4 h-4" />
              View Matches (
              {(foundMatches.perfectMatches?.length || 0) +
                (foundMatches.suggestedMatches?.length || 0)}
              )
            </button>
            <button
              onClick={handleSavePreferences}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition"
            >
              <Heart className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>
      );
    }

    // Retry actions for when no matches or errors
    if (msg.showRetryActions) {
      return (
        <div key={index} className="space-y-3">
          <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
            {msg.text}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRetrySearch}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full hover:from-blue-600 hover:to-purple-600 transition"
              disabled={isLoading || isSearchingMatches}
            >
              <RefreshCw className="w-4 h-4" />
              {isSearchingMatches ? "Searching..." : "Try Again"}
            </button>
            <button
              onClick={handleModifyPreferences}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-full hover:from-orange-600 hover:to-red-600 transition"
              disabled={isLoading || isSearchingMatches}
            >
              <RefreshCw className="w-4 h-4" />
              Modify Preferences
            </button>
          </div>
        </div>
      );
    }

    if (msg.role === "bot" && msg.options && msg.type === "multiple_choice") {
      return (
        <div key={index} className="space-y-3">
          <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
            {msg.text}
            {msg.hint && (
              <div className="text-xs text-white/70 mt-1">{msg.hint}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {msg.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="px-3 py-1 bg-white/20 text-white text-xs rounded-full hover:bg-white/30 transition"
                disabled={!awaitingResponse}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (msg.role === "bot" && msg.options && msg.type === "single_choice") {
      return (
        <div key={index} className="space-y-3">
          <div className="bg-white/10 text-left text-white px-4 py-2 rounded-xl max-w-xs">
            {msg.text}
            {msg.hint && (
              <div className="text-xs text-white/70 mt-1">{msg.hint}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {msg.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="px-3 py-1 bg-white/20 text-white text-xs rounded-full hover:bg-white/30 transition"
                disabled={!awaitingResponse}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        key={index}
        className={`text-sm px-4 py-2 rounded-xl max-w-xs ${
          msg.role === "user"
            ? "bg-white/20 text-white text-right ml-auto"
            : "bg-white/10 text-left text-white"
        } ${
          msg.isProfile || msg.isMatchingData || msg.isProfileList
            ? "max-w-md whitespace-pre-line"
            : ""
        }`}
      >
        {msg.text}
        {msg.hint && msg.role === "bot" && !msg.options && (
          <div className="text-xs text-white/70 mt-1">{msg.hint}</div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen font-sans overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-0" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-24 z-50"
      >
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

      {/* Background accents */}
      <div className="absolute w-20 h-[150%] top-[-30%] left-[5%] bg-[#242329] blur-[85px] rounded-full pointer-events-none" />
      <div className="absolute w-20 h-[150%] top-[-30%] right-[5%] bg-[#242329] blur-[85px] rounded-full pointer-events-none" />

      {/* Heading and description */}
      <div className="relative z-10 flex justify-between items-center h-full px-10 md:px-24">
        <motion.h1
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-white text-5xl md:text-[96px] font-[Recoleta] leading-tight"
        >
          Chat Bot
        </motion.h1>
        <motion.p
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="text-white text-base md:text-lg max-w-80 font-light text-justify"
        >
          Our chatbot helps you find music collaborators based on your
          preferences—like role, genre, vibe, and location.
        </motion.p>
      </div>

      {/* Progress indicator */}
      {!isCompleted && currentStep && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-64 z-50">
          <div className="bg-white/10 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIndex + 1) / 6) * 100}%` }}
            />
          </div>
          <div className="text-white text-xs text-center mt-1">
            Step {currentStepIndex + 1} of 6
          </div>
        </div>
      )}

      {/* Matching Status Indicator */}
      {isSearchingMatches && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-4 py-2 border border-blue-400/30">
            <div className="flex items-center space-x-2 text-blue-200">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                Searching for matches...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div
        className="absolute bottom-40 left-[53.5%]  transform -translate-x-1/2 w-[95%] max-w-2xl z-50 space-y-3 overflow-y-auto max-h-95 pr-2 pb-5 scrollbar-hide"
        ref={chatRef}
      >
        {chat.map((msg, i) => renderMessage(msg, i))}
        {isLoading && (
          <div className="text-white text-sm animate-pulse bg-white/10 px-4 py-2 rounded-xl w-fit">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <span className="ml-2">
                {isSearchingMatches
                  ? "Searching for matches..."
                  : "Thinking..."}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl z-50"
        >
          <div className="relative group">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder={
                isCompleted && !isModifying
                  ? "Ask me anything about your profile or collaborators..."
                  : currentStep?.type === "text"
                  ? currentStep.placeholder || "Type your answer..."
                  : "Type your answer or click the options above..."
              }
              className="w-full px-5 pr-12 py-3 text-white bg-white/10 border border-white/30 rounded-xl backdrop-blur-md placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              disabled={isLoading || isSearchingMatches}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={isLoading || !inputText.trim() || isSearchingMatches}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition disabled:opacity-50"
            >
              <LogIn className="w-5 h-5" />
            </button>
          </div>

          {/* Input hints */}
          {currentStep && currentStep.type === "multiple_choice" && (
            <div className="text-xs text-white/60 mt-2 text-center">
              💡 You can click the options above or type your answer naturally
            </div>
          )}

          {/* Display matching status */}
          {foundMatches.length > 0 && !isSearchingMatches && (
            <div className="text-xs text-green-400 mt-2 text-center">
              🎯 Found {foundMatches.length} potential collaborators - click
              "View Matches" to see them!
            </div>
          )}

          {/* Display matching data info */}
          {matchingData && foundMatches.length === 0 && !isSearchingMatches && (
            <div className="text-xs text-blue-400 mt-2 text-center">
              🔍 Matching criteria ready - click "Find Collaborators" to search
            </div>
          )}

          {/* Searching indicator */}
          {isSearchingMatches && (
            <div className="text-xs text-yellow-400 mt-2 text-center animate-pulse">
              🔍 Searching for perfect matches... This may take a moment
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
