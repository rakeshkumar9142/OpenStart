import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  Network,
  Rocket,
  Lightbulb,
  MessageSquare,
  X,
  ArrowRight,
  Repeat,
  CheckCircle,
  Zap,
  Gem,
  ScrollText,
  Award,
  Crown,
  Star,
  Trophy,
  Settings as SettingsIcon,
  Volume2,
  VolumeX,
  History,
  User as UserIcon,
} from "lucide-react";

/**
 * Advanced single-file version of "The Entrepreneur's Odyssey".
 *
 * What's new vs your baseline:
 * - Orbiting artifacts around a rotating Catalyst Core
 * - Artifact level system (0-3) with circular progress rings
 * - Dynamic ARIA chat log + adaptive tone
 * - Achievements & badges
 * - Mock leaderboard
 * - Persistent progress (localStorage)
 * - Settings panel (sound on/off, reset, name)
 * - Polished animations & micro-interactions
 * - Final Codex enhanced with endings based on your build
 */

const MAX_LEVEL = 3; // levels: 0..3
const STORAGE_KEY = "odyssey_v2_progress";

const BASE_ARTIFACTS = [
  {
    id: "knowledge_nexus",
    name: "Knowledge Nexus Glyph",
    icon: Book,
    color: "#00ffff",
    description:
      "Unlocks the vast archives of entrepreneurial wisdom: courses, guides, and expert insights.",
    challenge: {
      question: "You have an idea but lack direction. Do you...",
      choices: [
        { text: "Seek an expert mentor's guidance.", impact: { power: 20, insight: 10, level: 1 } },
        { text: "Blindly start building and learn on the fly.", impact: { power: -8, insight: 4, level: 0 } },
      ],
    },
  },
  {
    id: "synergy_conduit",
    name: "Synergy Conduit Shard",
    icon: Network,
    color: "#8A2BE2",
    description:
      "Enables connections: find co-founders, join communities, and collaborate on projects.",
    challenge: {
      question: "You need a co-founder for your project. Do you...",
      choices: [
        { text: "Actively network and seek complementary skills.", impact: { power: 18, connection: 10, level: 1 } },
        { text: "Try to do everything yourself.", impact: { power: -10, connection: 3, level: 0 } },
      ],
    },
  },
  {
    id: "innovation_forge",
    name: "Innovation Forge Core",
    icon: Rocket,
    color: "#FF4500",
    description:
      "Provides the tools and environment to build, iterate, and launch your Minimum Viable Product (MVP).",
    challenge: {
      question: "Your MVP needs funding. Do you...",
      choices: [
        { text: "Pitch to investors with a solid plan.", impact: { power: 20, execution: 10, level: 1 } },
        { text: "Self-fund and delay development.", impact: { power: -8, execution: 4, level: 0 } },
      ],
    },
  },
  {
    id: "aetheric_spark",
    name: "Aetheric Spark Crystal",
    icon: Lightbulb,
    color: "#FFD700",
    description:
      "Ignites creativity and resilience: get inspired by success stories and participate in challenges.",
    challenge: {
      question: "You face a major setback. Do you...",
      choices: [
        { text: "Analyze, learn, and pivot your strategy.", impact: { power: 20, resilience: 10, level: 1 } },
        { text: "Give up, believing your idea was flawed.", impact: { power: -12, resilience: 0, level: 0 } },
      ],
    },
  },
];

export default function Features() {
  // Core state
  const [questStage, setQuestStage] = useState("intro"); // 'intro' | 'map' | 'artifact_detail' | 'challenge' | 'codex'
  const [artifacts, setArtifacts] = useState(() => BASE_ARTIFACTS);
  const [levels, setLevels] = useState(() => ({ // id -> level (0..3)
    knowledge_nexus: 0,
    synergy_conduit: 0,
    innovation_forge: 0,
    aetheric_spark: 0,
  }));
  const [unlocked, setUnlocked] = useState([]); // ids with level >=1
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [questPower, setQuestPower] = useState(50);
  const [questStats, setQuestStats] = useState({ insight: 0, connection: 0, execution: 0, resilience: 0 });

  // Meta / UX
  const [showAria, setShowAria] = useState(true);
  const [ariaMessage, setAriaMessage] = useState(
    "Greetings, Initiate! Welcome to the Entrepreneur's Odyssey. Your mission: uncover the Arcane Artifacts and forge your Venture Codex."
  );
  const [ariaLog, setAriaLog] = useState([]); // {ts, text}
  const [playerName, setPlayerName] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const orbitRef = useRef(null);

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setQuestStage(data.questStage || "intro");
        setLevels(data.levels || levels);
        setUnlocked(data.unlocked || []);
        setQuestPower(typeof data.questPower === "number" ? data.questPower : 50);
        setQuestStats(data.questStats || questStats);
        setAriaLog(data.ariaLog || []);
        setPlayerName(data.playerName || "");
        setSoundOn(typeof data.soundOn === "boolean" ? data.soundOn : true);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const payload = {
      questStage,
      levels,
      unlocked,
      questPower,
      questStats,
      ariaLog,
      playerName,
      soundOn,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [questStage, levels, unlocked, questPower, questStats, ariaLog, playerName, soundOn]);

  // --- Helpers ---
  const unlockedCount = useMemo(
    () => Object.values(levels).filter((lv) => lv > 0).length,
    [levels]
  );
  const allActivated = unlockedCount === artifacts.length;

  const pushAria = (text) => {
    setAriaMessage(text);
    setAriaLog((prev) => [...prev, { ts: Date.now(), text }]);
  };

  const tone = useMemo(() => {
    if (questPower < 35) return "candid";
    if (questStats.resilience > 12) return "grit";
    if (questStats.insight > 12) return "sage";
    return "balanced";
  }, [questPower, questStats]);

  const toneWrap = (msg) => {
    switch (tone) {
      case "candid":
        return `Heads up: ${msg}`;
      case "grit":
        return `Steel nerves, Initiate. ${msg}`;
      case "sage":
        return `Consider this, seeker: ${msg}`;
      default:
        return msg;
    }
  };

  // Achievements
  const achievements = useMemo(() => {
    const list = [];
    if (questStats.insight >= 20) list.push({ id: "sage", name: "Sage of Insight", icon: Book });
    if (questStats.connection >= 20) list.push({ id: "connector", name: "Master Connector", icon: Network });
    if (questStats.execution >= 20) list.push({ id: "launcher", name: "MVP Launcher", icon: Rocket });
    if (questStats.resilience >= 20) list.push({ id: "unyielding", name: "Unyielding", icon: Lightbulb });
    if (allActivated) list.push({ id: "collector", name: "Relic Collector", icon: Gem });
    if (questPower >= 90) list.push({ id: "overcharge", name: "Overcharged", icon: Zap });
    return list;
  }, [questStats, allActivated, questPower]);

  // Mock leaderboard (deterministic shuffle by player name)
  const leaderboard = useMemo(() => {
    const seed = (playerName || "You").split("").reduce((a, c) => a + c.charCodeAt(0), 0) || 1;
    const rng = (n) => {
      let x = Math.sin(seed + n) * 10000;
      return x - Math.floor(x);
    };
    const rivals = [
      { name: "Aarav", power: 70 + Math.floor(rng(1) * 20) },
      { name: "Diya", power: 60 + Math.floor(rng(2) * 30) },
      { name: "Kabir", power: 55 + Math.floor(rng(3) * 35) },
      { name: playerName || "You", power: questPower },
      { name: "Ira", power: 65 + Math.floor(rng(4) * 25) },
    ].sort((a, b) => b.power - a.power);
    return rivals;
  }, [playerName, questPower]);

  // --- Stage transitions ---
  const handleArtifactClick = (artifact) => {
    setCurrentArtifact(artifact);
    setQuestStage("artifact_detail");
    const isNew = (levels[artifact.id] || 0) === 0;
    pushAria(
      toneWrap(
        `${isNew ? "New Artifact" : "Artifact"} detected: ${artifact.name}. ${
          isNew ? "Unlock details and initiate challenge." : "Review or level it up further."
        }`
      )
    );
  };

  const proceedToChallenge = () => {
    setQuestStage("challenge");
    pushAria(toneWrap(`Challenge Protocol Initiated for ${currentArtifact.name}. Choose wisely.`));
  };

  const applyImpact = (impact) => {
    setQuestPower((prev) => Math.max(0, Math.min(100, prev + (impact.power || 0))));
    setQuestStats((prev) => ({
      insight: prev.insight + (impact.insight || 0),
      connection: prev.connection + (impact.connection || 0),
      execution: prev.execution + (impact.execution || 0),
      resilience: prev.resilience + (impact.resilience || 0),
    }));
  };

  const levelUpArtifact = (id, delta) => {
    setLevels((prev) => {
      const curr = prev[id] || 0;
      const next = Math.max(0, Math.min(MAX_LEVEL, curr + delta));
      const updated = { ...prev, [id]: next };
      // maintain unlocked list
      setUnlocked(Object.keys(updated).filter((k) => updated[k] > 0));
      return updated;
    });
  };

  const handleChallengeChoice = (choice) => {
    applyImpact(choice.impact);
    if (choice.impact.level > 0) levelUpArtifact(currentArtifact.id, 1);
    pushAria(toneWrap(`Choice registered. Power ${choice.impact.power > 0 ? "+" : ""}${
      choice.impact.power || 0
    }. ${choice.impact.level > 0 ? "Level increased." : "No level gain."}`));
    setQuestStage("map");
  };

  const forgeCodex = () => {
    if (allActivated) {
      setQuestStage("codex");
      pushAria(toneWrap("Venture Codex successfully forged!"));
    } else {
      pushAria(toneWrap("You must activate all Artifacts before forging the Codex."));
    }
  };

  const resetAll = () => {
    setQuestStage("intro");
    setLevels({ knowledge_nexus: 0, synergy_conduit: 0, innovation_forge: 0, aetheric_spark: 0 });
    setUnlocked([]);
    setCurrentArtifact(null);
    setQuestPower(50);
    setQuestStats({ insight: 0, connection: 0, execution: 0, resilience: 0 });
    setAriaLog([]);
    pushAria("Welcome back, Initiate! A fresh Odyssey begins now.");
  };

  // --- Advice ---
  const finalAdvice = useMemo(() => {
    const { insight, connection, execution, resilience } = questStats;
    if (insight > 10 && connection > 10)
      return "You learn fast and connect faster. Validate problems with mentors; try co-founder matchmaking next.";
    if (execution > 10 && resilience > 10)
      return "Builder mindset detected. Use Innovation Forge kits and ship quickly. Iterate relentlessly.";
    if (insight > 15) return "Deep thinker. Dive into Market Research + BMC modules for strategic clarity.";
    if (connection > 15)
      return "Your network is your edge. Hit meetups, join teams, and court mentors weekly.";
    if (questPower < 40)
      return "Power low isn’t failure—it’s feedback. Revisit Aetheric Spark to rebuild momentum.";
    return "Balanced path. Start with Lean Startup 101 to solidify fundamentals and move with intent.";
  }, [questStats, questPower]);

  // --- Endings ---
  const ending = useMemo(() => {
    const { execution, resilience, insight, connection } = questStats;
    if (questPower >= 90 && allActivated) return { title: "Radiant Unicorn Pivot", icon: Crown };
    if (execution >= 18 && resilience >= 18) return { title: "Relentless Builder", icon: Trophy };
    if (insight >= 18 && connection >= 18) return { title: "Networked Strategist", icon: Star };
    if (questPower <= 20) return { title: "Phoenix Seed", icon: Lightbulb };
    return { title: "Steady Founder", icon: Award };
  }, [questPower, questStats, allActivated]);

  // --- UI helpers ---
  const LevelRing = ({ level, color }) => {
    const pct = (level / MAX_LEVEL) * 100;
    const r = 28;
    const C = 2 * Math.PI * r;
    const dash = (pct / 100) * C;
    return (
      <svg width={70} height={70} className="absolute -top-2 -right-2">
        <circle cx={35} cy={35} r={r} stroke="#2b2b44" strokeWidth={6} fill="none" />
        <motion.circle
          cx={35}
          cy={35}
          r={r}
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDasharray: `0 ${C}` }}
          animate={{ strokeDasharray: `${dash} ${C - dash}` }}
          transition={{ duration: 0.8 }}
        />
        <text x={35} y={40} textAnchor="middle" className="fill-white text-[12px] font-bold">
          Lv {level}
        </text>
      </svg>
    );
  };

  const ArtifactCard = ({ artifact, index }) => {
    const isActive = (levels[artifact.id] || 0) > 0;
    const level = levels[artifact.id] || 0;
    const radius = 260;
    const angle = (index / artifacts.length) * Math.PI * 2; // distributed

    return (
      <motion.button
        onClick={() => handleArtifactClick(artifact)}
        className="absolute w-44 h-44 bg-[#141428] rounded-2xl border-2 flex flex-col items-center justify-center"
        style={{
          borderColor: isActive ? artifact.color : "#35355f",
          boxShadow: isActive ? `0 0 30px ${artifact.color}80` : "0 0 15px #ffffff10",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 * index }}
      >
        <motion.div
          className="absolute"
          style={{
            transform: `translate(calc(${Math.cos(angle) * radius}px), calc(${Math.sin(angle) * radius}px))`,
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        />
        <artifact.icon size={42} style={{ color: isActive ? artifact.color : "white" }} />
        <div className="mt-2 text-sm font-semibold text-center px-2">
          {artifact.name.split(" ")[0]}
        </div>
        {level > 0 && <LevelRing level={level} color={artifact.color} />}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ background: `${artifact.color}22` }}
          />
        )}
      </motion.button>
    );
  };

  const PowerBar = () => (
    <motion.div
      className="p-4 bg-gray-900/80 backdrop-blur-md rounded-lg border border-purple-500 max-w-[220px]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <div className="flex items-center mb-2">
        <Zap size={18} className="text-purple-400 mr-2" />
        <span className="font-bold text-purple-400">Quest Power</span>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${questPower}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${questPower}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-right text-xs text-gray-400 mt-1">{questPower}/100</p>
    </motion.div>
  );

  // --- Render ---
  return (
    <div className="relative w-full h-screen bg-[#020218] text-white font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      {/* subtle background */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/crissxcross.png')] animate-[pulse_30s_infinite_alternate]"></div>
      <div className="absolute top-1/2 left-1/2 w-[650px] h-[650px] bg-gradient-radial from-purple-800/30 to-transparent rounded-full blur-3xl animate-spin-slow" />

      {/* Header Bar */}
      <div className="absolute top-3 left-3 right-3 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Gem size={18} className={allActivated ? "text-cyan-400" : "text-gray-400"} />
          <span>Artifacts Activated:</span>
          <span className="font-semibold">{unlockedCount}/{artifacts.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 flex items-center gap-2"
          >
            <SettingsIcon size={16} /> Settings
          </button>
        </div>
      </div>

      {/* ARIA Bubble */}
      <AnimatePresence>
        {showAria && questStage !== "codex" && (
          <motion.div
            className="absolute top-16 left-4 z-50 p-4 bg-gray-900/80 backdrop-blur-md rounded-lg border border-cyan-500 max-w-sm text-sm"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="flex items-center mb-2">
              <MessageSquare size={18} className="text-cyan-400 mr-2" />
              <span className="font-bold text-cyan-400">A.R.I.A. Protocol</span>
            </div>
            <p className="text-gray-200">{ariaMessage}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <button onClick={() => setShowAria(false)} className="hover:text-white flex items-center gap-1">
                <X size={14} /> Hide
              </button>
              <button
                onClick={() => pushAria(toneWrap("Log updated."))}
                className="hover:text-white flex items-center gap-1"
              >
                <History size={14} /> Log {ariaLog.length}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right HUD */}
      <div className="absolute top-16 right-4 z-50 space-y-3">
        <PowerBar />
        {/* Leaderboard */}
        {(questStage === "map" || questStage === "challenge") && (
          <motion.div
            className="p-4 bg-gray-900/80 backdrop-blur-md rounded-lg border border-amber-500 min-w-[220px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="flex items-center mb-2">
              <Trophy size={18} className="text-amber-400 mr-2" />
              <span className="font-bold text-amber-400">Leaderboard</span>
            </div>
            <ul className="text-sm space-y-1">
              {leaderboard.map((p, i) => (
                <li key={p.name} className="flex items-center justify-between">
                  <span className={`truncate ${p.name === (playerName || "You") ? "text-white" : "text-gray-300"}`}>
                    {i + 1}. {p.name}
                  </span>
                  <span className="text-gray-400">{p.power}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Intro */}
      <AnimatePresence>
        {questStage === "intro" && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center z-20 max-w-3xl"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500">
              The Entrepreneur's Odyssey
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-300">Uncover the Arcane Artifacts. Forge Your First Venture.</p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300">
              <UserIcon size={16} />
              <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your founder name (optional)"
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                setQuestStage("map");
                setShowAria(true);
                pushAria("The Odyssey Grid is active. Select an artifact to begin.");
              }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Begin Odyssey <ArrowRight className="inline-block ml-2" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map */}
      <AnimatePresence>
        {questStage === "map" && (
          <motion.div
            key="odyssey-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center z-20"
            ref={orbitRef}
          >
            {/* Core */}
            <motion.div
              className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white text-lg font-bold"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              style={{
                boxShadow: `0 0 50px ${allActivated ? "#00ffff" : "#8A2BE2"}`,
              }}
            >
              <Gem size={60} className={`${allActivated ? "text-cyan-400" : "text-gray-400"} mb-2`} />
              <span className="text-sm">CATALYST CORE</span>
              <span className="text-xs text-gray-400">{unlockedCount}/{artifacts.length} Activated</span>
              {allActivated && (
                <button
                  onClick={forgeCodex}
                  className="absolute bottom-4 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-sm font-semibold"
                >
                  Forge Codex <ScrollText size={16} className="inline-block ml-1" />
                </button>
              )}
            </motion.div>

            {/* Orbiting Artifacts */}
            {artifacts.map((a, i) => (
              <ArtifactCard key={a.id} artifact={a} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artifact Detail */}
      <AnimatePresence>
        {questStage === "artifact_detail" && currentArtifact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#1a1a2e] rounded-xl max-w-md w-full border border-gray-600 shadow-2xl p-6"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              style={{ boxShadow: `0 0 60px ${currentArtifact.color}50` }}
            >
              <button onClick={() => setQuestStage("map")} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                <X size={24} />
              </button>
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: currentArtifact.color }}>
                  <currentArtifact.icon size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: currentArtifact.color }}>
                  {currentArtifact.name}
                </h2>
              </div>
              <p className="text-gray-300 text-center leading-relaxed">{currentArtifact.description}</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-300">
                <span>Current Level:</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{levels[currentArtifact.id] || 0}/{MAX_LEVEL}</span>
              </div>
              {(levels[currentArtifact.id] || 0) < MAX_LEVEL && (
                <button
                  onClick={proceedToChallenge}
                  className="mt-6 w-full py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600"
                >
                  Initiate Challenge Protocol
                </button>
              )}
              {(levels[currentArtifact.id] || 0) >= MAX_LEVEL && (
                <button
                  onClick={() => setQuestStage("map")}
                  className="mt-6 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700"
                >
                  Max Level Reached • Return
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge */}
      <AnimatePresence>
        {questStage === "challenge" && currentArtifact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#1a1a2e] rounded-xl max-w-md w-full border border-purple-600 shadow-2xl p-6"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              style={{ boxShadow: `0 0 60px ${currentArtifact.color}50` }}
            >
              <h2 className="text-2xl font-bold text-center text-purple-400 mb-4">Challenge: {currentArtifact.name}</h2>
              <p className="text-gray-300 text-center mb-6">{currentArtifact.challenge.question}</p>
              <div className="space-y-4">
                {currentArtifact.challenge.choices.map((choice, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleChallengeChoice(choice)}
                    className="w-full py-3 bg-gray-700/70 text-white font-semibold rounded-lg hover:bg-gray-600/70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {choice.text}
                    <span className={`ml-2 text-sm ${choice.impact.power > 0 ? "text-green-400" : "text-red-400"}`}>
                      ({choice.impact.power > 0 ? "+" : ""}{choice.impact.power || 0} Power)
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Codex */}
      <AnimatePresence>
        {questStage === "codex" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#101020] rounded-xl max-w-3xl w-full border-2 border-cyan-400 shadow-3xl p-8"
              initial={{ scale: 0.8, rotateX: 30 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              style={{ boxShadow: "0 0 100px #00ffff50, 0 0 50px #8A2BE250" }}
            >
              <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-3">
                Venture Codex Forged
              </h2>
              <div className="flex items-center justify-center gap-2 text-amber-300 mb-6">
                {ending.icon && React.createElement(ending.icon, { size: 22 })}
                <span className="font-semibold uppercase tracking-wide text-sm">Ending: {ending.title}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-cyan-400 mb-2">Activated Artifacts & Levels</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {artifacts.map((a) => (
                      <li key={a.id}>
                        {a.name} <span className="text-gray-400">• Lv {levels[a.id] || 0}/{MAX_LEVEL}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-purple-400 mb-2">Your Quest Profile</h3>
                  <p className="text-gray-300">Founder: <span className="font-semibold">{playerName || "Anonymous"}</span></p>
                  <p className="text-gray-300">Final Power: <span className="font-semibold">{questPower}/100</span></p>
                  <p className="text-gray-300">Insight: <span className="font-semibold">{questStats.insight}</span></p>
                  <p className="text-gray-300">Connections: <span className="font-semibold">{questStats.connection}</span></p>
                  <p className="text-gray-300">Execution: <span className="font-semibold">{questStats.execution}</span></p>
                  <p className="text-gray-300">Resilience: <span className="font-semibold">{questStats.resilience}</span></p>
                </div>
              </div>

              {/* Achievements */}
              {achievements.length > 0 && (
                <div className="bg-gray-900/70 p-4 rounded-lg border border-yellow-500/50 mb-6">
                  <h3 className="font-bold text-lg text-yellow-400 mb-2">Achievements Unlocked</h3>
                  <div className="flex flex-wrap gap-3">
                    {achievements.map((a) => (
                      <div key={a.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        {React.createElement(a.icon, { size: 18 })}
                        <span className="text-sm">{a.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-900/70 p-4 rounded-lg border border-yellow-500/50 mb-6">
                <h3 className="font-bold text-lg text-yellow-400 mb-2">A.R.I.A.'s Strategic Advice</h3>
                <p className="text-gray-200 leading-relaxed">{finalAdvice}</p>
              </div>

              <button
                onClick={() => {
                  setQuestStage("map");
                  pushAria("Codex consulted. Return to the Odyssey Grid.");
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-blue-600 hover:to-purple-700 mb-3"
              >
                Return to Odyssey Grid
              </button>
              <button
                onClick={resetAll}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-lg rounded-lg hover:from-green-600 hover:to-teal-600"
              >
                Embark on a New Odyssey <Repeat className="inline-block ml-2" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#17172b] rounded-xl max-w-md w-full border border-gray-700 p-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
            >
              <button onClick={() => setShowSettings(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><SettingsIcon size={18} /> Settings</h3>

              <div className="space-y-3 mb-4">
                <label className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 flex items-center gap-2"><Volume2 size={16} /> Sound</span>
                  <button
                    onClick={() => setSoundOn((s) => !s)}
                    className="px-3 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10"
                  >
                    {soundOn ? (
                      <span className="flex items-center gap-1"><Volume2 size={14} /> On</span>
                    ) : (
                      <span className="flex items-center gap-1"><VolumeX size={14} /> Off</span>
                    )}
                  </button>
                </label>

                <label className="grid grid-cols-3 items-center gap-2 text-sm">
                  <span className="text-gray-300 col-span-1 flex items-center gap-2"><UserIcon size={16} /> Name</span>
                  <input
                    className="col-span-2 px-3 py-2 rounded bg-white/5 border border-white/10"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Your name"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    resetAll();
                    setShowSettings(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 font-semibold"
                >
                  Reset Progress
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              {/* ARIA Log */}
              {ariaLog.length > 0 && (
                <div className="mt-5">
                  <h4 className="font-semibold text-sm text-cyan-300 mb-2 flex items-center gap-2"><History size={14} /> ARIA Log</h4>
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {ariaLog.slice(-10).reverse().map((e, idx) => (
                      <div key={idx} className="text-xs text-gray-300 bg-white/5 border border-white/10 rounded p-2">
                        {new Date(e.ts).toLocaleTimeString()} — {e.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
