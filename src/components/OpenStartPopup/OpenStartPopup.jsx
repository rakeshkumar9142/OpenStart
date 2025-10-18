import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const DEFAULT_STORAGE_KEY = "alphacohort_popup_seen_v2";

export default function OpenStartPopup({
  showOnce = true,
  storageKey = DEFAULT_STORAGE_KEY,
}) {
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "🚀",
      title: "Build Real Ventures",
      description: "Transform ideas into funded startups",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🌍",
      title: "Global Network",
      description: "Connect with worldwide mentors",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "💼",
      title: "Practical Skills",
      description: "Learn by building real products",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🎯",
      title: "Demo Day",
      description: "Pitch to real investors",
      color: "from-orange-500 to-red-500"
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full"
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="max-w-6xl w-full relative"
          >
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"
            />
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-400 rounded-full shadow-lg"
            />

            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
              {/* Animated Header */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-6 px-8 text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30 shadow-lg"
                    >
                      <span className="font-black text-xl tracking-wider">ALPHA COHORT</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
                      <span className="text-blue-100 font-semibold text-lg">Applications Open</span>
                    </motion.div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 6L18 18M6 18L18 6" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Interactive Content */}
                <div className="p-8">
                  {/* Animated Hero */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <h1 className="text-5xl font-black bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent mb-4 leading-tight">
                      Build The Future
                      <br />
                      <span className="text-3xl">With Alpha Cohort</span>
                    </h1>
                    
                    <motion.p 
                      className="text-xl text-slate-700 mb-6 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Where high school innovators create world-changing ventures
                    </motion.p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-100"
                      >
                        <div className="text-2xl font-bold text-blue-600">50</div>
                        <div className="text-sm text-blue-800">Seats Only</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-red-50 rounded-2xl border border-red-100"
                      >
                        <div className="text-2xl font-bold text-red-600">Oct 28</div>
                        <div className="text-sm text-red-800">Deadline</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-green-50 rounded-2xl border border-green-100"
                      >
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <div className="text-sm text-green-800">Scholarship</div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Rotating Feature Showcase */}
                  <motion.div 
                    key={currentFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[currentFeature].color} flex items-center justify-center text-2xl shadow-lg`}
                      >
                        {features[currentFeature].icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          {features[currentFeature].title}
                        </h3>
                        <p className="text-slate-600">
                          {features[currentFeature].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Interactive CTA Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                        <Link
                          to="/contact"
                          onClick={closeModal}
                          className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-5 px-8 rounded-2xl font-black text-lg text-center flex items-center justify-center gap-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                        >
                          <span>Join Alpha Cohort</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            🚀
                          </motion.span>
                        </Link>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                        <Link
                          to="/cohorts/alpha"
                          onClick={closeModal}
                          className="block border-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-5 px-8 rounded-2xl font-bold text-lg text-center transition-all duration-300 group"
                        >
                          Explore Program
                          <span className="block text-sm font-normal mt-1 group-hover:text-white/90">
                            Detailed Information
                          </span>
                        </Link>
                      </motion.div>
                    </div>

                    {/* Interactive Checkbox */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm cursor-pointer"
                      onClick={() => setDontShowAgain(!dontShowAgain)}
                    >
                      <motion.div
                        animate={{ scale: dontShowAgain ? 1 : 0.8 }}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                          dontShowAgain 
                            ? 'bg-blue-600 border-blue-600 shadow-inner' 
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {dontShowAgain && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </motion.div>
                      <span className="text-slate-700 font-medium select-none">
                        Don't show this again
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right Side - Animated Timeline */}
                <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8 text-white relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400 rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
                  </div>

                  <div className="relative h-full flex flex-col">
                    <motion.h3 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl font-black mb-8 text-white text-center"
                    >
                      Your Journey
                    </motion.h3>
                    
                    {/* Interactive Timeline */}
                    <div className="space-y-8 flex-1">
                      {[
                        { phase: 1, title: "Foundation", desc: "Idea Validation & Research", duration: "4 weeks", icon: "🔍" },
                        { phase: 2, title: "Build", desc: "MVP Development", duration: "6 weeks", icon: "🛠️" },
                        { phase: 3, title: "Launch", desc: "Go-to-Market & Funding", duration: "4 weeks", icon: "🎯" }
                      ].map((stage, index) => (
                        <motion.div
                          key={stage.phase}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.2 }}
                          whileHover={{ scale: 1.05, x: 10 }}
                          className="flex items-center gap-6 group cursor-pointer"
                        >
                          <motion.div 
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center text-2xl shadow-lg group-hover:bg-white/20"
                          >
                            {stage.icon}
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                                {stage.phase}
                              </div>
                              <h4 className="text-xl font-bold text-white">{stage.title}</h4>
                              <span className="text-cyan-300 text-sm font-semibold bg-white/10 px-3 py-1 rounded-full">
                                {stage.duration}
                              </span>
                            </div>
                            <p className="text-blue-200 text-lg">{stage.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Floating Contact Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                    >
                      <div className="text-center">
                        <p className="text-white font-semibold text-lg mb-2">
                          Ready to start your journey?
                        </p>
                        <p className="text-cyan-300 text-sm">
                          Contact: <span className="font-mono font-bold text-white">+91 9905307658</span>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}