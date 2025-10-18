import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const DEFAULT_STORAGE_KEY = "alphacohort_popup_seen_v3";

export default function OpenStartPopup({
  showOnce = true,
  storageKey = DEFAULT_STORAGE_KEY,
}) {
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    try {
      if (showOnce) {
        const seen = localStorage.getItem(storageKey);
        if (!seen) setVisible(true);
      } else {
        setVisible(true);
      }
    } catch (e) {
      setVisible(true);
    }
  }, [showOnce, storageKey]);

  function closeModal() {
    if (dontShowAgain) {
      try {
        localStorage.setItem(storageKey, "1");
      } catch (e) {}
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="max-w-md w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/30">
                    <span className="font-bold text-sm">ALPHA COHORT</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-100 text-xs">Live</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 6L18 18M6 18L18 6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Hero Section */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Join Alpha Cohort
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Build your startup with expert guidance. 50 full-scholarship seats available.
                </p>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                  <div className="text-blue-600 font-bold text-lg">50</div>
                  <div className="text-blue-800 text-xs">Seats Only</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center border border-red-100">
                  <div className="text-red-600 font-bold text-lg">Oct 28</div>
                  <div className="text-red-800 text-xs">Deadline</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Build real ventures</p>
                    <p className="text-gray-600 text-xs mt-1">Transform ideas into startups</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Global network</p>
                    <p className="text-gray-600 text-xs mt-1">Worldwide mentors & peers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Demo Day</p>
                    <p className="text-gray-600 text-xs mt-1">Pitch to investors</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Program Journey</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Foundation</p>
                      <p className="text-gray-600 text-xs">Idea validation & research</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Build</p>
                      <p className="text-gray-600 text-xs">MVP development</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Launch</p>
                      <p className="text-gray-600 text-xs">Go-to-market & funding</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-4">
                <Link
                  to="/contact"
                  onClick={closeModal}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold text-center text-sm transition-colors shadow-lg"
                >
                  Apply Now - Free
                </Link>
                
                <Link
                  to="/cohorts/alpha"
                  onClick={closeModal}
                  className="block w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-4 rounded-xl font-semibold text-center text-sm transition-colors"
                >
                  Learn More
                </Link>
              </div>

              {/* Contact Info */}
              <div className="text-center mb-4">
                <p className="text-gray-600 text-xs">
                  Questions? <span className="font-semibold text-blue-600">+91 9905307658</span>
                </p>
              </div>

              {/* Don't Show Again */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <label className="text-gray-700 text-xs font-medium">
                  Don't show this again
                </label>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}