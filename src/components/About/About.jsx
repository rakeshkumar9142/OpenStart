import {useState, useEffect } from 'react';
import { Canvas} from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import PropTypes from 'prop-types';
import ParticlePlexus  from './ParticlePlexus.jsx';
import Gemini1 from "../../assets/Gemini2.png"
import TeamMemberCard from './TeamMemberCard.jsx';
import { MissionIcon, VisionIcon, ValuesIcon } from "./Icons.jsx";
import teamMembers from './teamMembers.jsx';
import { Link } from 'react-router-dom';
//import LearnMore from "../LearnMore/LearnMore.jsx";
// --- Statistics Component ---
const StatCard = ({ number, label, icon }) => (
    <div className="text-center group">
        <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div className="text-4xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {number}
        </div>
        <div className="text-gray-400 text-sm font-medium">
            {label}
        </div>
    </div>
);

StatCard.propTypes = {
    number: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};

// --- Team Member Card ---


TeamMemberCard.propTypes = {
    member: PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        flag: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
    }).isRequired
};

// --- Main About Page Component ---
export default function About() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

   
    return (
        <div className="bg-gray-900 text-white overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-indigo-900/20 to-black">
                    <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
                        <ambientLight intensity={0.2} />
                        <pointLight position={[100, 100, 100]} intensity={2} color="white" />
                        <ParticlePlexus />
                        <Stars radius={200} depth={50} count={8000} factor={6} saturation={0} fade />
                    </Canvas>
                </div>
                <div className={`relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center px-4 py-2 mb-6 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                        <span className="w-5 h-5 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
                        Empowering the Next Generation
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        About OpenStart
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl leading-relaxed text-gray-300 max-w-4xl mx-auto mb-8">
                        We are a global movement dedicated to igniting the entrepreneurial spirit in young minds, breaking down barriers, and building the next generation of changemakers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                         to="/Contact"
                         className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25">
                            Join Our Mission
                        </Link>
                        <Link 
                            to="/about-learn-more"
                            className="px-8 py-4 border-2 border-indigo-500 text-indigo-400 font-semibold rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                            Learn More
                        </Link>

            
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-20 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Building a global community of young innovators and changemakers
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCard 
                            number="3" 
                            label="Continents" 
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        />
                        <StatCard 
                            number="250+" 
                            label="Students Reached" 
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>}
                        />
                        <StatCard 
                            number="15+" 
                            label="Projects Launched" 
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                        />
                        <StatCard 
                            number="100%" 
                            label="Passion Driven" 
                            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center px-4 py-2 mb-4 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                                    Our Story
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                    Driven by a Passion for Youth Empowerment
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                                <p>
                                    OpenStart was born from a simple yet powerful idea: <span className="text-indigo-400 font-semibold">what if every high school student, regardless of their location, had access to the tools, mentorship, and network needed to turn their ideas into reality?</span>
                                </p>
                                <p>
                                    We are a team of passionate young entrepreneurs and leaders from across the globe—from Ukraine to India to Tunisia—united by this vision. We believe that by nurturing innovation at an early age, we can empower a new wave of leaders who will solve the world's most pressing challenges.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                                    Read Our Story
                                </button>
                                <button className="px-6 py-3 border border-indigo-500 text-indigo-400 font-semibold rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300">
                                    Watch Video
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                                <img
                                    src={Gemini1}
                                    alt="A diverse team of young people collaborating"
                                    className="w-full h-96 object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <h3 className="text-white text-xl font-bold mb-2">Global Collaboration</h3>
                                    <p className="text-gray-200 text-sm">Students from around the world working together to build the future</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Showcase Section */}
            <div className="py-24 sm:py-32 bg-gradient-to-b from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 mb-4 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                            Meet the Team
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            The Visionaries Behind OpenStart
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            A diverse team of passionate young leaders from around the world, united by a common vision to empower the next generation of entrepreneurs.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Journey Timeline Section */}
            <div className="py-24 sm:py-32 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 mb-4 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                            Our Journey
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            From Vision to Reality
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            The story of how a simple idea became a global movement for youth empowerment
                        </p>
                    </div>
                    
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
                        
                        {/* Timeline Items */}
                        <div className="space-y-16">
                            {/* Item 1 */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8 text-right">
                                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="flex items-center justify-end mb-3">
                                            <span className="text-indigo-400 text-sm font-medium">2024</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">The Spark</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            An idea is born from Vikusyaaa&apos;s experience at the Nazarbayev University Summer Research Program, aiming to globalize opportunities for young innovators.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-gray-900 z-10"></div>
                                <div className="flex-1 pl-8"></div>
                            </div>

                            {/* Item 2 */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-gray-900 z-10"></div>
                                <div className="flex-1 pl-8">
                                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="flex items-center mb-3">
                                            <span className="text-purple-400 text-sm font-medium">2024</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Team Formation</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            Passionate student entrepreneurs from India and Tunisia join the mission, forming the core global team of OpenStart.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="relative flex items-center">
                                <div className="flex-1 pr-8 text-right">
                                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="flex items-center justify-end mb-3">
                                            <span className="text-pink-400 text-sm font-medium">2025</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Vision Solidified</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            The program&apos;s focus is sharpened: a global accelerator for high school students, designed to nurture talent and foster collaboration.
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full border-4 border-gray-900 z-10"></div>
                                <div className="flex-1 pl-8"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mission, Vision, Values Section */}
            <div className="py-24 sm:py-32 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 mb-4 bg-teal-600/20 border border-teal-500/30 rounded-full text-teal-300 text-sm font-medium">
                            Our Foundation
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What Drives Us Forward
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            The core principles that guide our mission and shape our vision for the future
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex flex-col items-center p-8 bg-gray-800 rounded-2xl border border-gray-700 group-hover:border-indigo-500/50 transform transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <MissionIcon />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                                <p className="text-gray-300 text-center leading-relaxed">
                                    To break down geographical and economic barriers, providing high school students worldwide with access to world-class entrepreneurial education, mentorship, and resources.
                                </p>
                            </div>
                        </div>
                        
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex flex-col items-center p-8 bg-gray-800 rounded-2xl border border-gray-700 group-hover:border-purple-500/50 transform transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 mb-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <VisionIcon />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                                <p className="text-gray-300 text-center leading-relaxed">
                                    To create a vibrant, interconnected global network of young innovators who collaborate, inspire, and build meaningful projects that shape a better future for all.
                                </p>
                            </div>
                        </div>
                        
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex flex-col items-center p-8 bg-gray-800 rounded-2xl border border-gray-700 group-hover:border-pink-500/50 transform transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 mb-6 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <ValuesIcon />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
                                <p className="text-gray-300 text-center leading-relaxed">
                                    Collaboration, Inclusivity, Innovation, and a relentless belief in the potential of young people to drive positive change.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="py-24 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Join Our Mission?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Be part of the next generation of global entrepreneurs. Together, we can build a better future through innovation, collaboration, and youth empowerment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Get Started Today
                        </button>
                        <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-900 transition-all duration-300 transform hover:scale-105">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
