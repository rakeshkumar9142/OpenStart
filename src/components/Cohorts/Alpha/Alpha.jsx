import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from 'react-router-dom';
import { Contact } from "lucide-react";

// --- STYLES (Glitch + Cursor) ---
const styles = `
  .glitch {
    animation: glitch 1.5s linear infinite;
    position: relative;
  }
  @keyframes glitch {
    2%,64% { transform: translate(2px,0) skew(0deg); }
    4%,60% { transform: translate(-2px,0) skew(0deg); }
    62% { transform: translate(0,0) skew(5deg); }
  }
  .glitch:before,
  .glitch:after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: #0D0C1D;
    overflow: hidden;
  }
  .glitch:before {
    left: 3px;
    text-shadow: -2px 0 #00f2ea;
    animation: glitch-anim-1 2.5s linear infinite reverse;
  }
  .glitch:after {
    left: -3px;
    text-shadow: -2px 0 #ff00c1;
    animation: glitch-anim-2 2s linear infinite reverse;
  }
  @keyframes glitch-anim-1 {
    0%,100% { clip-path: inset(50% 0 50% 0); }
    25% { clip-path: inset(0 0 100% 0); }
    50% { clip-path: inset(100% 0 0 0); }
    75% { clip-path: inset(0 100% 0 0); }
  }
  @keyframes glitch-anim-2 {
    0%,100% { clip-path: inset(0 50% 100% 50%); }
    25% { clip-path: inset(50% 0 0 0); }
    50% { clip-path: inset(0 0 50% 0); }
    75% { clip-path: inset(100% 0 0 0); }
  }

  #cursor-dot {
    width: 8px;
    height: 8px;
    background-color: #00f2ea;
    border-radius: 50%;
    position: fixed;
    z-index: 50;
    pointer-events: none;
    box-shadow: 0 0 10px #00f2ea, 0 0 20px #00f2ea;
    transition: transform 0.1s ease-out;
    transform: translate(-50%, -50%);
  }
  #cursor-outline {
    width: 30px;
    height: 30px;
    border: 2px solid #00f2ea;
    border-radius: 50%;
    position: fixed;
    z-index: 50;
    pointer-events: none;
    transition: all 0.2s ease-out;
    transform: translate(-50%, -50%);
  }
  body:hover #cursor-outline { opacity: 0.5; }
  body:hover #cursor-dot { opacity: 1; }
`;

// --- Countdown Timer ---
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-10-28T23:59:59");
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return {};

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 md:gap-8 p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-teal-500/20 max-w-lg mx-auto">
      {Object.keys(timeLeft).length ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <span className="text-4xl md:text-5xl font-bold text-white tracking-wider">
              {String(value).padStart(2, "0")}
            </span>
            <span className="block text-sm text-teal-300 uppercase">{unit}</span>
          </div>
        ))
      ) : (
        <span className="text-2xl font-bold text-white">
          Applications have closed!
        </span>
      )}
    </div>
  );
};

// --- Reusable Animation Section ---
const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      {children}
    </motion.section>
  );
};

// --- MAIN COMPONENT ---
function CohortAlphaPage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const learningTopics = [
    "Lean Startup",
    "Market Research",
    "MVP Validation",
    "Business Model",
    "Startup Finance",
    "Pitching",
  ];

  return (
    <div className="bg-[#0D0C1D] text-gray-200 font-sans overflow-x-hidden cursor-none">
      <style>{styles}</style>

      {/* Custom Cursor */}
      <div
        id="cursor-dot"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div
        id="cursor-outline"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero */}
        <section className="text-center min-h-screen flex flex-col justify-center">
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold text-white mb-4 relative inline-block mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="glitch" data-text="Genesis Program">
              Genesis Program
            </span>
            <span className="block mt-4 text-teal-400">Cohort Alpha 🚀</span>
          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Your 10-week mission to forge an idea into a world-changing venture
            starts now.
          </motion.p>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <CountdownTimer />
          </motion.div>

          <motion.button
            className="bg-teal-500/10 border-2 border-teal-500 text-teal-300 font-bold px-8 py-3 rounded-lg text-lg transform hover:bg-teal-500 hover:text-white hover:shadow-[0_0_20px_theme(colors.teal.500)] transition-all duration-300 self-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
           <Link
          to="/contact"
           >
           Initiate Application
           </Link>
          </motion.button>
        </section>

        {/* Mission Timeline */}
        <AnimatedSection className="py-20">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Mission Phases
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 md:left-1/2 w-1 h-full bg-white/10 transform md:-translate-x-1/2"></div>

            {/* Phase 1 */}
            <div className="mb-16 flex items-center w-full">
              <div className="hidden md:block w-1/2"></div>
              <div className="z-20 flex items-center bg-[#0D0C1D] shadow-md w-8 h-8 rounded-full border-2 border-teal-400"></div>
              <div className="p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 w-full md:w-1/2 ml-4 md:ml-0 md:pl-10">
                <p className="text-teal-400 font-semibold">
                  Phase 01: Recruitment
                </p>
                <h3 className="text-xl font-bold text-white">
                  Applications Open: Sep 22 - Oct 28
                </h3>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="mb-16 flex items-center w-full">
              <div className="hidden md:block w-1/2 md:pr-10 text-right"></div>
              <div className="z-20 flex items-center bg-[#0D0C1D] shadow-md w-8 h-8 rounded-full border-2 border-teal-400"></div>
              <div className="p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 w-full md:w-1/2 ml-4 md:ml-0 md:pl-10">
                <p className="text-purple-400 font-semibold">
                  Phase 02: Incubation
                </p>
                <h3 className="text-xl font-bold text-white">
                  Program Duration: Nov '25 – Jan '26
                </h3>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection className="py-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Skill Unlocks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {learningTopics.map((topic) => (
              <motion.div
                key={topic}
                className="group p-6 text-center bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300"
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  border: "1px solid #00f2ea",
                }}
              >
                <h3 className="font-bold text-lg md:text-xl text-white transition-colors duration-300 group-hover:text-teal-300">
                  {topic}
                </h3>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Field Commanders */}
        <AnimatedSection className="py-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Field Commanders
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-8">
            Receive direct guidance from 5 industry titans. Full profiles are
            classified until program commencement.
          </p>
          <div className="flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-black/30 border border-white/10 rounded-full flex items-center justify-center text-2xl font-bold text-teal-500/50"
              >
                ?
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center py-20">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Legacy Awaits.
          </h2>
          <button className="bg-teal-500 text-white font-bold px-8 py-4 rounded-lg text-xl transform hover:scale-105 transition-all duration-300 relative group overflow-hidden shadow-lg shadow-teal-500/30">
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/20 rounded-full group-hover:w-48 group-hover:h-48 opacity-10"></span>
           <Link
            to="/contact"
           >
           <span className="relative">Join Cohort Alpha</span>
           </Link>
          </button>
        </AnimatedSection>
      </main>
    </div>
  );
}

export default CohortAlphaPage;
