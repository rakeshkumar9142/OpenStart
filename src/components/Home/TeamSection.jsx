import React from 'react';
// Assuming teamMembers.jsx is in the same directory as OpenStartPage.jsx
import { teamMembers } from './teamMembers.jsx'; 

export default function TeamSection() {
    return (
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
    );
}

