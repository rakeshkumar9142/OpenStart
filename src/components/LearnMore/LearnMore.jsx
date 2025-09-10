import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


const MotionLink = motion.create(Link);
// --- Floating Orbs Background ---
const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-2xl opacity-70"
          style={{
            background: `radial-gradient(circle, ${
              ["#ff00ff", "#00ffff", "#ff6f61", "#6a5acd"][i % 4]
            } 0%, transparent 70%)`,
            width: `${150 + Math.random() * 200}px`,
            height: `${150 + Math.random() * 200}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// --- Feature Card ---
const FeatureCard = ({ title, description }) => (
  <motion.div
    whileHover={{ scale: 1.07, rotateX: 5, rotateY: -5 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-cyan-400/60"
  >
    <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-slate-200 leading-relaxed">{description}</p>
  </motion.div>
);

// --- Main Component ---
export default function LearnMore() {
  const features = [
    {
      title: "🌍 Global Peer Network",
      description:
        "Connect with a diverse community of innovators worldwide. Collaborate, co-found, and create lasting impact.",
    },
    {
      title: "🛠️ Venture Building Toolkit",
      description:
        "Turn sparks into startups with our structured blueprints, curated resources, and step-by-step guidance.",
    },
    {
      title: "🎓 Expert Mentorship",
      description:
        "Learn directly from entrepreneurs, industry leaders, and professors invested in your journey.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <FloatingOrbs />

      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient"
      >
        Ignite Your Vision.
        <br />
        Shape The Future.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-lg md:text-xl text-slate-300 max-w-2xl text-center mb-16"
      >
        OpenStart is your launchpad to innovate, collaborate, and lead. 🚀
      </motion.p>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.3 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <FeatureCard title={f.title} description={f.description} />
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <MotionLink
         to = {'/contact'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-10 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 shadow-xl hover:shadow-cyan-500/50 transition-all"
      > 
     
      
         Join the Next Generation of Founders
      
       
      </MotionLink>

      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 8s ease infinite;
          }
        `}
      </style>
    </div>
  );
}
