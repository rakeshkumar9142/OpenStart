import React, { useState, useEffect, useRef } from 'react';
import {PhoneIcon,MailIcon,LocationIcon,ArrowRightIcon} from './Icons.jsx';
// Icon components for clarity and reusability


export default function Contact() {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            const { left, top, width, height } = cardRef.current.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            setStyle({
                '--x': `${x}px`,
                '--y': `${y}px`,
                background: `radial-gradient(600px circle at var(--x) var(--y), rgba(129, 140, 248, 0.15), transparent 40%)`
            });
        };

        const cardElement = cardRef.current;
        cardElement.addEventListener('mousemove', handleMouseMove);

        return () => {
            cardElement.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/30 via-black to-black"></div>

            <div className="relative w-full max-w-6xl animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Let's Build Together
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Your next big idea is one conversation away. Reach out and let's make it happen.
                    </p>
                </div>

                {/* Main Interactive Card */}
                <div ref={cardRef} style={style} className="relative group w-full p-1 bg-gradient-to-br from-white/20 to-white/0 rounded-3xl">
                     <div className="w-full bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-12">
                        {/* Left Column: Contact Information */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Contact Information</h2>
                                <p className="text-gray-400 mb-8">
                                    Our team is ready to assist. Find us at our headquarters or through our digital channels.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4"><div className="text-indigo-400"><PhoneIcon /></div> <span className="text-gray-300">+44 12345 67890</span></div>
                                    <div className="flex items-center gap-4"><div className="text-indigo-400"><MailIcon /></div> <span className="text-gray-300">contact@openstart.com</span></div>
                                    <div className="flex items-center gap-4"><div className="text-indigo-400"><LocationIcon /></div> <span className="text-gray-300">123 Startup Lane, Innovation City</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div>
                            <form action="#" method="POST" className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                        <input type="text" id="first-name" className="input-field" placeholder="John" />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                        <input type="text" id="last-name" className="input-field" placeholder="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                    <input type="email" id="email" className="input-field" placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea id="message" rows="4" className="input-field" placeholder="Tell us about your project..."></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="group w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 transform hover:scale-105">
                                        Send Message
                                        <div className="group-hover:translate-x-2 transition-transform duration-300">
                                            <ArrowRightIcon />
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
