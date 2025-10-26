import React from 'react';
// Assuming Icon.jsx is in this same 'components' folder
import { GlobeIcon } from './Icon.jsx'; 

export default function VisionSection() {
    return (
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
    );
}
