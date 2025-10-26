import React from 'react';
// Assuming assets folder is at the same level as this component's parent
import Vy_P from '../../assets/Viktoriia Babchenko.jpg'; 

export default function FounderStorySection() {
    return (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold text-indigo-400 mb-4">The Spark of a Visionary</h2>
                <p className="text-gray-1000 text-center mb-5">
                    OpenStart is an ambitious project founded by <strong>Viktoriia Babchenko</strong>,
                    a visionary young leader from Ukraine. Her entrepreneurial
                    spark grew even stronger after her project was ranked among the top 3 out of 250 teams worldwide
                    in the <br /> Nazarbayev University Summer Research Program 2025.
                </p>
                <p className="text-gray-1000">
                    The vision is simple yet powerful: break down geographical barriers and
                    provide high school students with access to world-class mentorship, networks,
                    and tools that are usually limited to only a few.
                </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 p-1 shadow-2xl">
                    <img src={Vy_P} alt="Viktoriia Babchenko" className="w-full h-full rounded-full object-cover" />
                </div>
            </div>
        </section>
    );
}

