import React from 'react';
import { motion } from 'framer-motion';

// A distinct but complementary gradient for Cohort Beta
const BETA_GRADIENT = "bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400";

export default function CohortBetaComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 p-6 text-center text-white">
      
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <div className="absolute top-[-10rem] left-[-10rem] h-96 w-96 rounded-full bg-gradient-to-br from-teal-500 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10rem] right-[-10rem] h-96 w-96 rounded-full bg-gradient-to-tl from-indigo-500 to-transparent blur-3xl"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-4 text-6xl animate-pulse">🔭</div>

        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
          Cohort <span className={`bg-clip-text text-transparent ${BETA_GRADIENT}`}>Beta</span>
        </h1>

        <p className="mt-4 text-2xl font-bold text-slate-300">
          Is On The Horizon
        </p>

        <p className="mt-2 max-w-lg text-lg text-slate-400">
          Our next program is currently under construction. We're refining the curriculum and gathering top-tier mentors to bring you an even more impactful experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 mt-8 text-sm text-slate-500"
      >
        Stay tuned for the official launch date and application details!
      </motion.div>
    </div>
  );
}