import React from 'react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS for FRAMER MOTION ---

// Staggered animation for the grid container
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation for each card in the grid
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    }
  },
};

// Animation for the headline text
const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            staggerChildren: 0.08,
        },
    },
};

const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
    },
};


// --- DATA ---
const projects = [
    { id: 1, title: "StudySync", description: "An AI-powered platform creating personalized study schedules.", imageUrl: "https://placehold.co/600x400/818cf8/0f172a?text=StudySync&font=inter", tags: [{ name: "EdTech", color: "indigo" }, { name: "AI", color: "pink" }], link: "#" },
    { id: 2, title: "EcoPrints", description: "A marketplace for students to sell their own upcycled products.", imageUrl: "https://placehold.co/600x400/4ade80/0f172a?text=EcoPrints&font=inter", tags: [{ name: "Sustainability", color: "green" }], link: "#" },
    { id: 3, title: "ConnectVerse", description: "A safe social platform for students to find collaborators.", imageUrl: "https://placehold.co/600x400/38bdf8/0f172a?text=ConnectVerse&font=inter", tags: [{ name: "Social", color: "sky" }], link: "#" },
    { id: 4, title: "Taskify", description: "A gamified to-do list app designed to help students stay focused.", imageUrl: "https://placehold.co/600x400/fb923c/0f172a?text=Taskify&font=inter", tags: [{ name: "Productivity", color: "orange" }], link: "#" },
    { id: 5, title: "CodePals", description: "Connecting beginner high school coders with student mentors.", imageUrl: "https://placehold.co/600x400/94a3b8/0f172a?text=CodePals&font=inter", tags: [{ name: "Mentorship", color: "slate" }], link: "#" },
    { id: 6, title: "ArtGen", description: "A web tool that uses generative AI to create unique art prompts.", imageUrl: "https://placehold.co/600x400/f472b6/0f172a?text=ArtGen&font=inter", tags: [{ name: "Creative", color: "rose" }, { name: "AI", color: "pink" }], link: "#" }
];

// --- REUSABLE COMPONENTS ---

const tagColorClasses = {
    indigo: "border-indigo-400/50 text-indigo-300",
    pink: "border-pink-400/50 text-pink-300",
    green: "border-green-400/50 text-green-300",
    yellow: "border-yellow-400/50 text-yellow-300",
    sky: "border-sky-400/50 text-sky-300",
    purple: "border-purple-400/50 text-purple-300",
    orange: "border-orange-400/50 text-orange-300",
    red: "border-red-400/50 text-red-300",
    slate: "border-slate-400/50 text-slate-300",
    rose: "border-rose-400/50 text-rose-300",
};

const ProjectCard = ({ project }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-[#1e1e20] rounded-xl overflow-hidden cursor-pointer border border-white/10 shadow-lg"
    >
        <div className="relative">
            <img src={project.imageUrl} alt={`${project.title} Logo`} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-slate-50">{project.title}</h3>
            <p className="text-slate-400 mb-4 text-sm h-12">{project.description}</p>
            <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <span key={tag.name} className={`text-xs font-semibold px-3 py-1 border rounded-full ${tagColorClasses[tag.color]}`}>
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

// --- MAIN SHOWCASE COMPONENT ---

function ShowcasePage() {
    const heroText = "What We've Built".split(" ");

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }} className="bg-[#111113] text-slate-300 min-h-screen">
            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden py-28 md:py-40">
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <motion.h1
                          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4"
                          variants={sentenceVariants}
                          initial="hidden"
                          animate="visible"
                        >
                            {heroText.map((word, index) => (
                                <span key={word + "-" + index} className="inline-block mr-4">
                                    {word.split("").map((char, charIndex) => (
                                        <motion.span key={char + "-" + charIndex} variants={letterVariants} className="inline-block">
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </motion.h1>

                        <motion.p
                          className="text-lg md:text-xl max-w-2xl mx-auto text-slate-400"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            A collection of ventures, experiments, and passion projects from our latest cohort.
                        </motion.p>
                    </div>
                </section>

                {/* Showcase Section */}
                <section className="pb-24 sm:pb-32">
                    <div className="container mx-auto px-6">
                        <motion.div
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                          variants={gridContainerVariants}
                          initial="hidden"
                          animate="show"
                        >
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ShowcasePage;

