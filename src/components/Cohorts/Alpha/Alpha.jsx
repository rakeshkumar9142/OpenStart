import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Sparkles, Rocket, Target, DollarSign, Lightbulb, Users } from "lucide-react"; // <-- nice icons

// --- Global Styles (Glitch + Cursor) ---
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
    <div className="flex justify-center gap-6 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-teal-400/30 shadow-lg shadow-teal-500/20">
      {Object.keys(timeLeft).length ? (
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <span className="text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
              {String(value).padStart(2, "0")}
            </span>
            <span className="block text-sm text-teal-300 uppercase">{unit}</span>
          </div>
        ))
      ) : (
        <span className="text-xl font-bold text-white">
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

// --- MAIN PAGE ---
function CohortAlphaPage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const skills = [
    { icon: <Rocket />, label: "Lean Startup" },
    { icon: <Target />, label: "Market Research" },
    { icon: <Lightbulb />, label: "MVP Validation" },
    { icon: <DollarSign />, label: "Startup Finance" },
    { icon: <Users />, label: "Business Model" },
    { icon: <Sparkles />, label: "Pitching" },
  ];

  return (
    <div className="bg-[#0D0C1D] text-gray-200 font-sans overflow-x-hidden cursor-none relative">
      <style>{styles}</style>

      {/* Cursor */}
      <div
        id="cursor-dot"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div
        id="cursor-outline"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0D0C1D] to-black/80"></div>

        <motion.h1
          className="text-5xl sm:text-7xl font-extrabold text-white mb-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="glitch" data-text="Genesis Program">
            Genesis Program
          </span>
          <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
            Cohort Alpha 🚀
          </span>
        </motion.h1>

        <motion.p
          className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 mb-10 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A 10-week mission to transform your spark into a world-changing
          venture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="z-10"
        >
          <CountdownTimer />
        </motion.div>

        <motion.button
          className="mt-8 px-10 py-4 rounded-lg text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-purple-500 hover:shadow-[0_0_30px_#00f2ea] transition-all duration-300 z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Initiate Application
        </motion.button>
      </section>

      {/* Mission Timeline */}
      <AnimatedSection className="py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          Mission Phases
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-teal-400/40 to-purple-400/40 transform -translate-x-1/2"></div>

          {[
            {
              phase: "Phase 01: Recruitment",
              details: "Applications Open: Sep 22 - Oct 28",
              color: "text-teal-400",
            },
            {
              phase: "Phase 02: Incubation",
              details: "Program Duration: Nov '25 – Jan '26",
              color: "text-purple-400",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`mb-16 flex items-center w-full ${
                idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="z-20 flex items-center bg-[#0D0C1D] w-10 h-10 rounded-full border-2 border-teal-400 shadow-md"></div>
              <div className="p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 w-full sm:w-1/2 mx-4 shadow-md">
                <p className={`${item.color} font-semibold`}>{item.phase}</p>
                <h3 className="text-lg font-bold text-white">{item.details}</h3>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Skills */}
      <AnimatedSection className="py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Skill Unlocks
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {skills.map((s) => (
            <motion.div
              key={s.label}
              className="group p-6 flex flex-col items-center justify-center text-center bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-md transition-all duration-300"
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0 0 20px #00f2ea",
              }}
            >
              <div className="text-3xl text-teal-400 mb-3">{s.icon}</div>
              <h3 className="font-bold text-lg text-white group-hover:text-teal-300">
                {s.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Commanders */}
      <AnimatedSection className="py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Field Commanders</h2>
        <p className="text-lg text-gray-300 mb-10">
          5 industry titans guiding your journey. Full profiles remain classified
          until launch.
        </p>
        <div className="flex justify-center gap-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-400/20 to-purple-400/20 border border-white/10 flex items-center justify-center text-2xl font-bold text-teal-500/60"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              ?
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="text-center py-20">
        <h2 className="text-4xl font-bold text-white mb-6">
          Your Legacy Awaits.
        </h2>
        <motion.button
          className="px-12 py-5 rounded-lg text-xl font-bold text-white bg-gradient-to-r from-teal-500 to-purple-500 hover:shadow-[0_0_40px_#00f2ea] transition-all duration-300"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Cohort Alpha
        </motion.button>
      </AnimatedSection>
    </div>
  );
}

export default CohortAlphaPage;
