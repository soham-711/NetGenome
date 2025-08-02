import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { FiX, FiTrash2, FiExternalLink, FiMusic, FiUser, FiStar } from "react-icons/fi";
import { IoMdMusicalNote } from "react-icons/io";
import { RiVipCrownLine } from "react-icons/ri";

export default function PurchasedList({
  visible,
  setVisible,
  purchasedProfiles,
  setPurchasedProfiles,
}) {
  const handleDelete = async (id, name) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in");
      return;
    }

    if (!window.confirm(`Are you sure you want to remove ${name} from your purchases?`)) {
      return;
    }

    try {
      const res = await axios.post("https://netgenome-1.onrender.com/api/deletePurchase", {
        userId: user.uid,
        artistId: id,
      });

      if (res.data.success) {
        const updated = purchasedProfiles.filter((item) => item._id !== id);
        setPurchasedProfiles(updated);
      } else {
        alert("Failed to delete artist");
      }
    } catch (err) {
      console.error("Failed to delete purchase", err);
      alert("Error deleting artist");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center p-4"
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 max-w-4xl w-full text-white overflow-y-auto max-h-[90vh] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <FiX className="text-xl" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <RiVipCrownLine className="text-3xl text-yellow-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                Your Purchased Profiles
              </h2>
              <span className="ml-auto px-3 py-1 text-sm font-bold rounded-full bg-gray-700">
                {purchasedProfiles.length} item{purchasedProfiles.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Empty state */}
            {purchasedProfiles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center py-12"
              >
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <IoMdMusicalNote className="text-4xl text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Artists you purchase will appear here with their contact information and links.
                </p>
                <button
                  onClick={() => setVisible(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium"
                >
                  Browse Artists
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {purchasedProfiles.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-gray-600 transition-all relative group"
                  >
                    {/* Artist image and basic info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={item.imageUrl}
                          alt={item.identity.realName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black rounded-full p-1">
                          <FiStar className="text-xs" />
                        </div>
                      </div>
                      <div>
                        <Link 
                          to={`/catalog/${item._id}`}
                          className="font-semibold text-lg hover:text-yellow-400 transition-colors flex items-center gap-1"
                        >
                          {item.identity.realName}
                          <FiExternalLink className="text-sm opacity-70" />
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <FiUser className="opacity-70" />
                          <span>{item.identity.stageName || "No stage name"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Artist details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <FiMusic className="text-yellow-400" />
                        <span className="text-gray-300">
                          {item.artistic_background?.roles?.join(", ") || "Role not specified"}
                        </span>
                      </div>
                      
                      {item.vibeTags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.vibeTags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Contact info section - would be populated with actual contact info after purchase */}
                      <div className="mt-4 pt-3 border-t border-gray-700">
                        <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          {item.contactInfo?.email && (
                            <div className="text-sm">
                              <span className="text-gray-400">Email: </span>
                              <a 
                                href={`mailto:${item.contactInfo.email}`} 
                                className="text-blue-400 hover:underline"
                              >
                                {item.contactInfo.email}
                              </a>
                            </div>
                          )}
                          {item.contactInfo?.socialLinks?.length > 0 && (
                            <div className="text-sm">
                              <span className="text-gray-400">Links: </span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {item.contactInfo.socialLinks.map((link, i) => (
                                  <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-blue-400"
                                  >
                                    {link.platform}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                          {(!item.contactInfo?.email && !item.contactInfo?.socialLinks) && (
                            <p className="text-xs text-gray-500">
                              Contact information not available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(item._id, item.identity.realName)}
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label={`Remove ${item.identity.realName}`}
                    >
                      <FiTrash2 />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                {purchasedProfiles.length} purchased artist{purchasedProfiles.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={() => setVisible(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}