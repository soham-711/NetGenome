import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function PurchasedList({
  visible,
  setVisible,
  purchasedProfiles,
  setPurchasedProfiles,
}) {
  const handleDelete = (id) => {
    const updated = purchasedProfiles.filter((item) => item._id !== id);
    setPurchasedProfiles(updated);
    localStorage.setItem("purchased", JSON.stringify(updated));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-gray-900 p-8 rounded-xl max-w-3xl w-full text-white overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold mb-4">Purchased Profiles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {purchasedProfiles.length === 0 ? (
                <p className="text-gray-400">No purchased profiles yet.</p>
              ) : (
                purchasedProfiles.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative"
                  >
                    <h3 className="font-semibold text-lg">
                      {item.displayName}
                    </h3>
                    <p className="text-sm text-gray-400">${item.priceUSD}</p>
                    <Link to={`/catalog/${item._id}`}>
                      <p className="text-blue-400 underline hover:text-blue-200 mt-2">
                        View Profile
                      </p>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="mt-3 px-4 py-1 text-sm font-bold bg-red-600 hover:bg-red-700 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => setVisible(false)}
              className="mt-6 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md font-bold"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
