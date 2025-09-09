import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Award, Briefcase, Globe, BrainCircuit, Star, Zap } from 'lucide-react';
import { MentorCard } from './MentorCard';
import { mockMentors } from './mockMentors';
import { FeaturedMentorCard } from './FeaturedMentorCard';
import { FilterDropdown } from './FilterDropdown'
// --- EXPANDED MOCK DATA ---

const getUnique = (data, key) => [...new Set(data.flatMap(item => item[key]))];

// --- MAIN MENTORS COMPONENT ---
export default function Mentors() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ industry: 'All', expertise: 'All' });

    const industries = ['All', ...getUnique(mockMentors, 'industry')];
    const expertises = ['All', ...getUnique(mockMentors, 'expertise')];
    
    const featuredMentor = mockMentors.find(m => m.isFeatured);

    const filteredMentors = useMemo(() => {
        return mockMentors.filter(mentor => {
            if (mentor.isFeatured) return false; // Exclude featured mentor from main grid
            const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  mentor.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesIndustry = filters.industry === 'All' || mentor.industry === filters.industry;
            const matchesExpertise = filters.expertise === 'All' || mentor.expertise.includes(filters.expertise);
            return matchesSearch && matchesIndustry && matchesExpertise;
        });
    }, [searchTerm, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="relative w-full min-h-screen bg-[#05051a] text-white font-sans overflow-y-auto p-4 md:p-8">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500">
                        The Mentor Hub
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Connect with visionary leaders and industry veterans dedicated to nurturing the next generation of entrepreneurs.
                    </p>
                </motion.div>

                {/* Featured Mentor */}
                {featuredMentor && <FeaturedMentorCard mentor={featuredMentor} />}

                {/* Filters & Search */}
                <div className="sticky top-4 z-20 bg-[#1a1a2e]/80 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 my-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <input type="text" placeholder="Search by name, title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        <FilterDropdown label="Industry" options={industries} selectedValue={filters.industry} onSelect={(value) => handleFilterChange('industry', value)} />
                        <FilterDropdown label="Expertise" options={expertises} selectedValue={filters.expertise} onSelect={(value) => handleFilterChange('expertise', value)} />
                    </div>
                </div>

                
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
                    <AnimatePresence>
                        {filteredMentors.map(mentor => (
                            <MentorCard key={mentor.name} mentor={mentor} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredMentors.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <h3 className="text-2xl font-semibold">No mentors match your criteria</h3>
                        <p>Try adjusting your search or filters to discover your perfect guide.</p>
                    </div>
                )}
            </div>
        </div>
    );
}



