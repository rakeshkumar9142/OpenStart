import { motion } from 'framer-motion';

export const MentorCard = ({ mentor }) => {
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