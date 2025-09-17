import React from 'react';
import { motion } from 'framer-motion';

// A new, distinct gradient for Cohort Gamma
const GAMMA_GRADIENT = "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400";

export default function CohortGammaComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 p-6 text-center text-white">
      
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <div className="absolute top-[-5rem] right-[-12rem] h-96 w-96 rounded-full bg-gradient-to-br from-rose-500 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-15rem] left-[-10rem] h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500 to-transparent blur-3xl"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-4 text-9xl">
            <motion.div
              animate={{ rotate: [0, 60, 120, 240], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🛰️
            </motion.div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
          <motion.h1
          animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
          Cohort <span className={`bg-clip-text text-transparent ${GAMMA_GRADIENT}`}>Gamma</span>
          </motion.h1>
          
        </h1>

        <p className="mt-4 text-2xl font-bold text-slate-300">
          Preparing For Launch
        </p>

        <p className="mt-2 max-w-lg text-lg text-slate-400">
          The next evolution of the OpenStart program is in development. Building on the success of Alpha and Beta, Cohort Gamma will push new boundaries.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 mt-8 text-sm text-slate-500"
      >
        Further mission details will be broadcast soon.
      </motion.div>
    </div>
  );
}