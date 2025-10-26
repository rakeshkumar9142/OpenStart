import React from 'react';
// Assuming differentiators.jsx is in the same directory as OpenStartPage.jsx
import { differentiators } from './differentiators.jsx'; 

export default function DifferentiatorsSection() {
    return (
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
    );
}

