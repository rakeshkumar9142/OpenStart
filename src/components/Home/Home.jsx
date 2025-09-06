import React from 'react';
import { Canvas } from '@react-three/fiber';
import {  OrbitControls, Stars } from '@react-three/drei';
import Vy_P from "../../assets/Vy_P.jpg"
import Globe from './Globe.jsx'
import {teamMembers} from './teamMembers.jsx'
import {GlobeIcon} from './Icon.jsx'
import {differentiators} from './differentiators.jsx'

export default function OpenStartPage() {
    
    return (
        <div className="bg-gray-900 text-white font-sans">
            {/* Hero Section */}
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
                    <button className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
                        Join the Movement
                    </button>
                </div>
            </header>

            {/* Profile Photo Section */}
           

            <main className="py-20 px-4 sm:px-6 lg:px-8">
                {/* Founder's Story Section */}
                <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-indigo-400 mb-4">The Spark of a Visionary</h2>
                        <p className="text-gray-1000 text-center mb-5">
                            OpenStart is an ambitious project founded by <strong>Vikusyaaa</strong>, 
                            a visionary young leader from Ukraine. Her entrepreneurial spark grew even 
                            stronger after her project was ranked among the top 3 out of 250 teams worldwide 
                            in the Nazarbayev University Summer Research Program 2025.
                        </p>
                        <p className="text-gray-1000">
                            The vision is simple yet powerful: break down geographical barriers and 
                            provide high school students with access to world-class mentorship, networks,
                            and tools that are usually limited to only a few.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 p-1 shadow-2xl">
                             <img src={Vy_P} alt="Vikusyaaa" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="max-w-7xl mx-auto text-center ">
                    <h2 className="text-4xl font-bold mb-2">The Team Behind OpenStart</h2>
                    <p className="text-indigo-400 mb-12">A Global Collaboration of Passionate Innovators</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                                <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500" />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-indigo-400 mb-2">{member.country}</p>
                                <p className="text-gray-400 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What Makes OpenStart Different Section */}
                <section className="max-w-7xl mx-auto text-center mb-24">
                     <h2 className="text-4xl font-bold mb-2">What Makes OpenStart Different?</h2>
                    <p className="text-indigo-400 mb-12">Nurturing the Innovators of Tomorrow</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {differentiators.map((item, index) => (
                            <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                                {item.icon}
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Vision Ahead Section */}
                <section className="relative max-w-7xl mx-auto py-20 px-10 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-center">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                     <div className="relative z-10">
                        <GlobeIcon />
                        <h2 className="text-4xl font-bold mt-4 mb-4">The Vision Ahead</h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            OpenStart is not just a project – it’s a movement to inspire and accelerate young changemakers globally. We're building a hub for future entrepreneurs who will shape industries, economies, and societies.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
