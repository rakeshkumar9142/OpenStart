import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Globe from './Globe.jsx';

export default function HeroSection() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#020b18] via-[#01060f] to-black">
      {/* 3D Globe Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} />
          <Globe />
          <Stars radius={150} depth={60} count={4000} factor={4} fade />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-44 md:pt-56">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-300 drop-shadow-lg"
        >
          Empowering Global Innovation
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed font-light"
        >
          OpenStart is a worldwide accelerator uniting entrepreneurs, creators, and thinkers from 
          <span className="text-teal-400 font-semibold"> 10+ countries</span> — 
          driving impactful solutions that shape the future of business and humanity.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Link
            to="/contact"
            className="mt-12 inline-block px-10 py-4 bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:shadow-teal-500/40 transition-all duration-300 transform hover:scale-110"
          >
            Join the Global Movement 🌐
          </Link>
        </motion.div>
      </div>

      {/* Gradient overlay for focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none"></div>
    </header>
  );
}
