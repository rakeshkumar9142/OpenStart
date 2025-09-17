import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// --- HELPER COMPONENTS ---

// Countdown Timer Component
const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-10-28T23:59:59") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return null;
        }
        return (
            <div key={interval} className="text-center">
                <span className="text-4xl md:text-5xl font-bold text-white tracking-wider">
                    {String(timeLeft[interval]).padStart(2, '0')}
                </span>
                <span className="block text-sm text-teal-300 uppercase">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center gap-4 md:gap-8 p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 max-w-lg mx-auto">
            {timerComponents.length ? timerComponents : <span className="text-2xl font-bold text-white">Applications have closed!</span>}
        </div>
    );
};

// Custom Icon Components
const MissionIcon = () => (
    <svg className="w-6 h-6 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8-12V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 9h6"></path></svg>
);
const SkillIcon = () => (
    <svg className="w-8 h-8 mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);

// --- MAIN COMPONENT ---

function CohortAlphaPage() {
    const learningTopics = [
        "Lean Startup", "Market Research", "MVP Validation", "Business Model", "Startup Finance", "Pitching"
    ];

    return (
        <div className="bg-[#0D0C1D] text-gray-200 font-sans overflow-x-hidden">
             {/* Animated Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute top-[10%] left-[50%] w-[500px] h-[500px] bg-teal-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                 <div className="absolute bottom-[-10%] left-[25%] w-[400px] h-[400px] bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <main className="container mx-auto px-6 py-12 relative z-10">

                {/* Hero Section */}
                <section className="text-center py-16 sm:py-24">
                    <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                        Genesis Program: Cohort Alpha{" "}
                        <span >🚀</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
                        Your 10-week mission to forge an idea into a world-changing venture starts now.
                    </p>
                    <div className="mb-10">
                        <CountdownTimer />
                    </div>
                    <button className="bg-teal-500 text-white font-bold px-8 py-3 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 relative group overflow-hidden shadow-lg shadow-teal-500/20">
                         <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/20 rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <Link
                        to={"/contact"}
                        >
                        <span className="relative">Apply Now</span>
                        </Link>
                    </button>
                </section>

                {/* What is Cohort Alpha? */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto text-center p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-4">What is Cohort Alpha?</h2>
                        <p className="text-lg leading-relaxed text-gray-300">
                            This isn't school. It's a <span className="text-teal-400 font-semibold">10-week, 100% free launchpad</span>. Join a global squad of teen founders, get mentored by industry pros in live sessions, and build something real.
                        </p>
                    </div>
                </section>

                {/* Program Timeline */}
                <section className="py-16">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Your 10-Week Mission 🗓️</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 max-w-4xl mx-auto">
                        {/* Step 1 */}
                        <div className="flex items-center flex-col md:flex-row">
                             <div className="flex items-center justify-center flex-col text-center p-4">
                                <div className="flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-full mb-2 border-2 border-teal-400 shadow-lg shadow-teal-500/10">
                                    <MissionIcon />
                                </div>
                                <h3 className="font-bold text-white">Apply</h3>
                                <p className="text-sm text-gray-400">Sep 22 – Oct 28</p>
                            </div>
                            <div className="hidden md:block w-20 h-1 bg-white/20 mx-4"></div>
                        </div>
                         {/* Step 2 */}
                        <div className="flex items-center flex-col md:flex-row">
                            <div className="flex items-center justify-center flex-col text-center p-4">
                                <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-2 border-2 border-purple-400 shadow-lg shadow-purple-500/10">
                                    <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-bold text-white">Build</h3>
                                <p className="text-sm text-gray-400">Nov – Jan</p>
                            </div>
                            <div className="hidden md:block w-20 h-1 bg-white/20 mx-4"></div>
                        </div>
                         {/* Step 3 */}
                        <div className="flex items-center justify-center flex-col text-center p-4">
                            <div className="flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-2 border-2 border-pink-400 shadow-lg shadow-pink-500/10">
                                <svg className="w-6 h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M17 3l4 4M3 17l4 4m10-4l4-4M7 3l-4 4" /></svg>
                            </div>
                            <h3 className="font-bold text-white">Launch</h3>
                            <p className="text-sm text-gray-400">Demo Day</p>
                        </div>
                    </div>
                </section>
                
                {/* What You Will Learn */}
                <section className="py-16">
                     <h2 className="text-3xl font-bold text-center text-white mb-12">Level Up Your Founder Skills 💡</h2>
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                        {learningTopics.map((topic) => (
                            <div key={topic} className="group aspect-square flex flex-col items-center justify-center p-4 text-center bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-400 hover:-translate-y-2">
                                <SkillIcon />
                                <h3 className="font-bold text-sm md:text-base text-white transition-colors duration-300 group-hover:text-purple-300">{topic}</h3>
                            </div>
                        ))}
                     </div>
                </section>
                
                {/* Expert Mentorship */}
                <section className="py-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">The Guild of Mentors</h2>
                    <p className="text-lg leading-relaxed text-gray-300">
                        You're not alone. Get 1-on-1 guidance from 5 industry titans in SaaS, E-commerce, and VC. This is your chance to ask anything. (Full lineup coming soon!)
                    </p>
                </section>
                
                {/* Program Outcomes */}
                <section className="py-16">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Your Founder's Loot</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 text-center"><h3 className="text-xl font-bold text-teal-400 mb-2">Certificate of Completion</h3><p>Proof you've got the skills. Looks great on college apps.</p></div>
                        <div className="p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 text-center"><h3 className="text-xl font-bold text-teal-400 mb-2">Project Showcase</h3><p>Pitch your venture at our exclusive Demo Day.</p></div>
                        <div className="p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 text-center"><h3 className="text-xl font-bold text-teal-400 mb-2">Global Network</h3><p>Join the OpenStart alumni, a worldwide crew of founders.</p></div>
                    </div>
                </section>

                 {/* Final CTA */}
                <section className="text-center py-20">
                     <h2 className="text-3xl font-bold text-white mb-4">Your Legacy Starts Here.</h2>
                     <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
                        The clock is ticking. Don't sleep on your dreams. Applications for Cohort Alpha close October 28, 2025.
                    </p>
                    <button className="bg-teal-500 text-white font-bold px-8 py-3 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 relative group overflow-hidden shadow-lg shadow-teal-500/20">
                         <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/20 rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <Link
                        to="/contact"
                        >
                        <span className="relative">Apply to Cohort Alpha</span>
                        </Link>
                    </button>
                </section>
            </main>
             <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 10s infinite; }
                .animation-delay-2000 { animation-delay: -2s; }
                .animation-delay-4000 { animation-delay: -4s; }
            `}</style>
        </div>
    );
}

export default CohortAlphaPage;
