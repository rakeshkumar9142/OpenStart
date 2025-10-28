import React from 'react';

export default function VisionSection() {
    return (
        <section className="py-16 lg:py-20 px-4 sm:px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-6 h-0.5 bg-blue-600"></div>
                    <span className="text-sm font-semibold text-blue-600 tracking-widest uppercase">
                        Our Vision
                    </span>
                    <div className="w-6 h-0.5 bg-blue-600"></div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    Empowering <span className="text-blue-600">Student Innovators</span>
                </h2>

                {/* Content */}
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    We believe every high school student has the potential to build something amazing. 
                    OpenStart provides the tools, mentorship, and community to turn ideas into reality.
                </p>

                {/* Simple CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        Join the Program
                    </button>
                    <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
}