import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Award, Briefcase, Globe, BrainCircuit, Star, Zap } from 'lucide-react';

// --- EXPANDED MOCK DATA ---
const mockMentors = [
    // Featured Mentor
    {
        name: 'Dr. Alena Kovalenko',
        title: 'Quantum Computing Researcher & Founder',
        expertise: ['Deep Tech', 'Quantum AI', 'Fundraising'],
        industry: 'Tech',
        country: 'Ukraine',
        bio: 'Pioneering the next wave of computation. A Forbes 30 Under 30 laureate, I guide young innovators turning complex science into viable businesses. Let\'s solve the unsolvable.',
        image: 'https://i.pravatar.cc/150?u=alena',
        availability: 'High',
        isFeatured: true,
    },
    // India
    {
        name: 'Rohan Verma',
        title: 'FinTech Entrepreneur & Angel Investor',
        expertise: ['FinTech', 'Blockchain', 'Angel Investing'],
        industry: 'Finance',
        country: 'India',
        bio: 'Scaled a digital payment gateway from zero to 100 million users. Now investing in and mentoring the next generation of financial disruptors.',
        image: 'https://i.pravatar.cc/150?u=rohan',
        availability: 'Medium',
    },
    // Tunisia
    {
        name: 'Yasmine Kchaou',
        title: 'AgriTech Innovator, Founder of GreenAtlas',
        expertise: ['Sustainability', 'AgriTech', 'IoT'],
        industry: 'Green Tech',
        country: 'Tunisia',
        bio: 'Using IoT and data to revolutionize farming in North Africa. Passionate about sustainable solutions and empowering rural entrepreneurs.',
        image: 'https://i.pravatar.cc/150?u=yasmine',
        availability: 'High',
    },
    // More Mentors
    {
        name: 'Ben Carter',
        title: 'CEO, EcoSolutions',
        expertise: ['Sustainability', 'Business Strategy', 'B2B Sales'],
        industry: 'Green Tech',
        country: 'USA',
        bio: 'Built a multi-million dollar company focused on sustainable packaging. Loves helping young founders navigate the B2B landscape.',
        image: 'https://i.pravatar.cc/150?u=ben',
        availability: 'Low',
    },
    {
        name: 'Chloe Nguyen',
        title: 'Lead Product Designer, FinConnect',
        expertise: ['UI/UX Design', 'Figma', 'User Research'],
        industry: 'FinTech',
        country: 'Vietnam',
        bio: 'Specializes in creating intuitive and beautiful user experiences for financial applications that people love to use.',
        image: 'https://i.pravatar.cc/150?u=chloe',
        availability: 'High',
    },
    {
        name: 'David Rodriguez',
        title: 'Growth Marketing Lead, SocialSphere',
        expertise: ['Marketing', 'SEO', 'Social Media'],
        industry: 'Social Media',
        country: 'Spain',
        bio: 'Expert in scaling user acquisition for consumer apps. Grew SocialSphere from 10k to 2M users in 18 months.',
        image: 'https://i.pravatar.cc/150?u=david',
        availability: 'Medium',
    },
    {
        name: 'Eva Mensah',
        title: 'Senior Software Engineer, HealthWell',
        expertise: ['Software Development', 'React', 'HealthTech'],
        industry: 'HealthTech',
        country: 'Ghana',
        bio: 'Building technology that improves healthcare access across Africa. Strong advocate for diversity and inclusion in tech.',
        image: 'https://i.pravatar.cc/150?u=eva',
        availability: 'High',
    },
    {
        name: 'Kenji Tanaka',
        title: 'Venture Capitalist, Innovate Capital',
        expertise: ['Venture Capital', 'Pitch Decks', 'Term Sheets'],
        industry: 'Finance',
        country: 'Japan',
        bio: 'Invests in the next generation of disruptive startups. I can help you understand the investor mindset and perfect your pitch.',
        image: 'https://i.pravatar.cc/150?u=kenji',
        availability: 'Low',
    },
    {
        name: 'Priya Singh',
        title: 'EdTech Founder, LearnSphere',
        expertise: ['EdTech', 'Product Management', 'SaaS'],
        industry: 'Education',
        country: 'India',
        bio: 'Passionate about making education accessible through technology. Bootstrapped LearnSphere to profitability.',
        image: 'https://i.pravatar.cc/150?u=priya',
        availability: 'Medium',
    },
    {
        name: 'Tariq Al-Jamil',
        title: 'Cybersecurity Analyst & Consultant',
        expertise: ['Cybersecurity', 'Python', 'Risk Assessment'],
        industry: 'Tech',
        country: 'UAE',
        bio: 'Protecting the digital world from threats. I help startups build secure and resilient products from day one.',
        image: 'https://i.pravatar.cc/150?u=tariq',
        availability: 'High',
    },
     {
        name: 'Sofia Volkov',
        title: 'Lead Game Developer, Quantum Leap',
        expertise: ['Game Development', 'Unity', 'C#'],
        industry: 'Gaming',
        country: 'Ukraine',
        bio: 'Crafting immersive worlds and interactive experiences. If you want to build the next big thing in gaming, let\'s talk.',
        image: 'https://i.pravatar.cc/150?u=sofia',
        availability: 'Medium',
    },
];

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

                {/* Mentor Grid */}
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

// --- SUB-COMPONENTS ---

const FeaturedMentorCard = ({ mentor }) => (
    <motion.div className="relative bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-2xl border border-purple-400/50 p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
    >
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500 text-white flex flex-col items-center justify-center rounded-full transform -rotate-12">
            <Star size={32} />
            <span className="font-bold text-sm">FEATURED</span>
        </div>
        <motion.img src={mentor.image} alt={mentor.name} className="w-40 h-40 rounded-full border-4 border-cyan-400 object-cover"
            whileHover={{ scale: 1.05 }}
        />
        <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-white">{mentor.name}</h2>
            <p className="text-cyan-300 text-xl">{mentor.title}</p>
            <p className="mt-2 text-gray-200">{mentor.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {mentor.expertise.map(skill => (
                    <span key={skill} className="bg-cyan-400/20 text-cyan-200 text-xs font-semibold px-3 py-1 rounded-full">{skill}</span>
                ))}
            </div>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                Connect with {mentor.name.split(' ')[0]}
            </button>
        </div>
    </motion.div>
);

const FilterDropdown = ({ label, options, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all">
                <span>{selectedValue === 'All' ? label : selectedValue}</span>
                <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg z-30 max-h-60 overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    >
                        {options.map(option => (
                            <li key={option} onClick={() => { onSelect(option); setIsOpen(false); }} className="px-4 py-2 hover:bg-purple-600/50 cursor-pointer">{option}</li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

const MentorCard = ({ mentor }) => {
    const availabilityColor = {
        High: 'bg-green-500',
        Medium: 'bg-yellow-500',
        Low: 'bg-red-500',
    };
    return (
        <motion.div layout className="group relative bg-[#1a1a2e]/60 rounded-2xl border border-gray-700/50 overflow-hidden backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            whileHover="hover"
        >
            <div className="p-6 flex flex-col items-center text-center transition-opacity duration-300 group-hover:opacity-0">
                <img src={mentor.image} alt={mentor.name} className="w-28 h-28 rounded-full border-4 border-gray-600" />
                <h3 className="mt-4 text-2xl font-bold text-white">{mentor.name}</h3>
                <p className="text-purple-400 h-12">{mentor.title}</p>
            </div>
            
            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-6 opacity-0 flex flex-col justify-end text-center"
                variants={{ hover: { opacity: 1 } }} transition={{ duration: 0.3 }}
            >
                <p className="text-gray-200 text-sm mb-4">{mentor.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {mentor.expertise.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-cyan-400/20 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
                 <div className="mt-4">
                    <span className="text-xs text-gray-400">Availability</span>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div className={`h-2 rounded-full ${availabilityColor[mentor.availability]}`} style={{width: mentor.availability === 'High' ? '90%' : mentor.availability === 'Medium' ? '60%' : '30%'}}></div>
                    </div>
                </div>
                 <motion.button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg transform "
                    variants={{ hover: { scale: 1.05, y: 0 } }} initial={{ scale: 0.9, y: 10 }}
                 >
                    Connect
                </motion.button>
            </motion.div>
        </motion.div>
    );
};