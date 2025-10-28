import React from 'react';
import Vy_P from '../../assets/Viktoriia Babchenko.jpg';
import { motion } from 'framer-motion';

export default function FounderStorySection() {
    return (
        <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 py-24 px-6 md:px-16 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-bold mb-4"
                    >
                        <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                            Meet Our Founder
                        </span>
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 120 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                    {/* Founder Image - Enhanced */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <div className="relative">
                            {/* Outer Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
                            
                            {/* Main Image Container */}
                            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-2xl shadow-2xl">
                                <img
                                    src={Vy_P}
                                    alt="Viktoriia Babchenko - Founder of OpenStart"
                                    className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl object-cover shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                                
                                {/* Badge */}
                                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                                    <div className="text-sm font-semibold">Founder & CEO</div>
                                </div>
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl"></div>
                        </div>
                    </motion.div>

                    {/* Founder Story - Enhanced */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="order-2 lg:order-1 space-y-8"
                    >
                        {/* Name and Title */}
                        <div>
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                Viktoriia Babchenko
                            </h3>
                            <div className="text-xl text-indigo-300 font-light mb-6">
                                Visionary Leader & Entrepreneur
                            </div>
                        </div>

                        {/* Main Story */}
                        <div className="space-y-6">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                <span className="text-indigo-400 font-semibold">Viktoriia Babchenko</span> is the driving force behind <span className="text-purple-400 font-semibold">OpenStart</span>, 
                                a young visionary from Ukraine whose exceptional leadership and relentless curiosity are 
                                redefining the landscape of student innovation.
                            </p>

                            {/* Achievement Highlight */}
                            <div className="bg-gradient-to-r from-gray-800/50 to-indigo-900/30 p-6 rounded-2xl border border-indigo-500/20">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">🏆</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-2">Global Recognition</h4>
                                        <p className="text-gray-300">
                                            Her groundbreaking project secured a position among the 
                                            <strong className="text-yellow-400"> Top 3 out of 250 international teams</strong> in the prestigious 
                                            <span className="text-indigo-300"> Nazarbayev University Summer Research Program 2025</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-lg text-gray-300 leading-relaxed">
                                Viktoriia's vision is both profound and practical: to democratize access to 
                                <span className="text-indigo-400"> world-class mentorship</span>, 
                                <span className="text-purple-400"> global networks</span>, and 
                                <span className="text-cyan-400"> transformative opportunities </span> 
                                 for students worldwide, regardless of their background or location.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">250+</div>
                                <div className="text-sm text-gray-400">Teams Outranked</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">Top 3</div>
                                <div className="text-sm text-gray-400">Global Ranking</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">2025</div>
                                <div className="text-sm text-gray-400">Program Year</div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300"
                        >
                            Connect with Viktoriia
                        </motion.button>
                    </motion.div>
                </div>

                {/* Vision Statement */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 text-center max-w-4xl mx-auto"
                >
                    <blockquote className="text-2xl md:text-3xl font-light text-gray-300 italic leading-relaxed">
                        "Empowering the next generation of innovators to build a future where 
                        <span className="text-indigo-400"> great ideas know no boundaries</span> 
                        and every student has the tools to change the world."
                    </blockquote>
                    <div className="mt-6 text-indigo-300 font-medium">— Viktoriia Babchenko</div>
                </motion.div>
            </div>

            <style jsx>{`
                .bg-grid-white\/\[0\.02\] {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='m0 .5h31.5m-32 0v31.5m32-31.5v31.5m0-32h-31.5m31.5 32h-31.5'/%3e%3c/svg%3e");
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}