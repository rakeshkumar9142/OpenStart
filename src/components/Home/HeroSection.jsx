import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Link } from 'react-router-dom';
// Assuming Globe.jsx is in the same directory as OpenStartPage.jsx
import Globe from './Globe.jsx'; 

export default function HeroSection() {
    return (
        <header className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Globe />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>
            <div className="relative z-10 text-center p-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                    OpenStart
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
                    Building the Next Generation of Global Entrepreneurs
                </p>
                <Link
                    to="/contact"
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
                >
                    Join the Movement
                </Link>
            </div>
        </header>
    );
}

