 const TeamMemberCard = ({ member }) => (
    <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-gray-800 rounded-2xl p-6 border border-gray-700 group-hover:border-indigo-500/50 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <img 
                        src={member.img} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 group-hover:border-indigo-500 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{member.flag}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-indigo-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
            </div>
        </div>
    </div>
);

export default TeamMemberCard;