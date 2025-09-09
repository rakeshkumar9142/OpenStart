import { motion } from 'framer-motion';
import {  Star} from 'lucide-react';
export const FeaturedMentorCard = ({ mentor }) => (
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