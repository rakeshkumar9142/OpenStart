import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Premium Countdown Timer
const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-11-20T23:59:59") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return null;
        }
        return (
            <div key={interval} className="text-center group">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>
                    <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 min-w-[100px] transform group-hover:scale-105 transition-all duration-300">
                        <div className="text-2xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                            {String(timeLeft[interval]).padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 mt-2 font-medium">
                            {interval}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="flex justify-center gap-6 mb-12">
            {timerComponents.length ? timerComponents : 
                <span className="text-xl font-semibold text-gray-400">Applications Closed</span>
            }
        </div>
    );
};

// Animated Background
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"></div>
            
            {/* Animated grid */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0 bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] bg-[size:64px_64px] animate-grid-slow"></div>
            </div>
            
            {/* Floating orbs */}
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-medium"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
            
            {/* Subtle particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-random"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${Math.random() * 10 + 10}s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Fade-in animation component
const FadeInSection = ({ children, delay = 0, direction = "up" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    const getTransform = () => {
        switch (direction) {
            case "left": return 'translate-x-8';
            case "right": return '-translate-x-8';
            case "down": return '-translate-y-8';
            default: return 'translate-y-8';
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${
                isVisible 
                    ? 'translate-x-0 translate-y-0 opacity-100' 
                    : `${getTransform()} opacity-0`
            }`}
        >
            {children}
        </div>
    );
};

// Premium Button Component
const PremiumButton = ({ children, to, variant = "primary", className = "" }) => {
    const baseStyles = "font-semibold px-10 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden group";
    
    const variants = {
        primary: "bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-500 hover:to-blue-500 shadow-2xl hover:shadow-emerald-500/25",
        secondary: "bg-gray-800/80 text-white border border-gray-600 hover:border-gray-400 backdrop-blur-xl hover:bg-gray-700/80 shadow-lg"
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <Link to={to="/contact"}>
                <span className="relative flex items-center justify-center space-x-3">
                    <span className="tracking-wide">{children}</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                </span>
            </Link>
        </button>
    );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
    return (
        <FadeInSection delay={delay}>
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 transform transition-all duration-500 group-hover:scale-105 h-full">
                    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-gray-400 leading-relaxed">{description}</p>
                </div>
            </div>
        </FadeInSection>
    );
};

// Stat Component
const Stat = ({ number, label, delay = 0 }) => {
    return (
        <FadeInSection delay={delay}>
            <div className="text-center group">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>
                    <div className="relative bg-gray-900/60 backdrop-blur-lg border border-gray-700/30 rounded-xl p-8 transform group-hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-2">
                            {number}
                        </div>
                        <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                            {label}
                        </div>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

// Main Component
function OpenStartPage() {
    const curriculum = [
        { 
            icon: "🚀", 
            title: "Lean Startup", 
            description: "Build, measure, learn cycles to validate ideas quickly and efficiently with minimum resources." 
        },
        { 
            icon: "🔍", 
            title: "Market Research", 
            description: "Identify market opportunities and understand customer pain points through data-driven analysis." 
        },
        { 
            icon: "⚡", 
            title: "MVP Development", 
            description: "Create minimum viable products to test your core value proposition and gather user feedback." 
        },
        { 
            icon: "💼", 
            title: "Business Modeling", 
            description: "Develop sustainable business models and revenue strategies for long-term growth." 
        },
        { 
            icon: "📊", 
            title: "Metrics & Analytics", 
            description: "Track key performance indicators and make data-driven decisions to optimize your startup." 
        },
        { 
            icon: "🎯", 
            title: "Investor Pitching", 
            description: "Craft compelling narratives and present to potential investors with confidence and clarity." 
        }
    ];

    const outcomes = [
        { 
            icon: "🏆", 
            title: "OpenStart Certification", 
            description: "Receive a prestigious credential that demonstrates your entrepreneurial skills and program completion." 
        },
        { 
            icon: "🤝", 
            title: "Demo Day Access", 
            description: "Present your venture to mentors and peers in our program showcase event." 
        },
        { 
            icon: "🌐", 
            title: "Founder Community", 
            description: "Join a community of ambitious teen entrepreneurs and build lifelong connections." 
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden relative">
            <AnimatedBackground />
            
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center px-6 py-20">
                    <div className="text-center max-w-6xl mx-auto">
                        <FadeInSection delay={200}>
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 mb-8">
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                                <span className="text-sm text-gray-300 font-medium tracking-wider">OPENSTART COHORT APPLICATIONS OPEN</span>
                            </div>
                        </FadeInSection>

                        <FadeInSection delay={400}>
                            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
                                <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent">
                                    OPENSTART
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                    ACCELERATOR
                                </span>
                            </h1>
                        </FadeInSection>

                        <FadeInSection delay={600}>
                            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                                Where <span className="text-emerald-400 font-semibold">exceptional teen founders</span> become 
                                <span className="text-blue-400 font-semibold"> skilled entrepreneurs</span>. 
                                Your 10-week transformation begins now.
                            </p>
                        </FadeInSection>

                        <FadeInSection delay={800}>
                            <CountdownTimer />
                        </FadeInSection>

                        <FadeInSection delay={1000}>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <PremiumButton to="/apply" variant="primary">
                                    Apply to OpenStart
                                </PremiumButton>
                                <PremiumButton to="/learn-more" variant="secondary">
                                    View Program Details
                                </PremiumButton>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <FadeInSection>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Program Structure
                            </h2>
                            <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                                Intensive learning designed for real-world impact
                            </p>
                        </FadeInSection>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <Stat number="10" label="Weeks" delay={100} />
                            <Stat number="50+" label="Learning Hours" delay={200} />
                            <Stat number="1:1" label="Mentorship" delay={300} />
                            <Stat number="100%" label="Project-Based" delay={400} />
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <FadeInSection>
                            <div className="relative">
                                <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur-3xl"></div>
                                <div className="relative bg-gray-900/60 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-12 text-center">
                                    <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        THE OPENSTART MISSION
                                    </h2>
                                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                                        We're building the next generation of entrepreneurial talent through 
                                        <span className="text-emerald-400 font-semibold"> hands-on learning</span> and 
                                        <span className="text-blue-400 font-semibold"> practical skills</span>. 
                                        Our program focuses on real-world experience, mentorship, and building a strong foundation for future success.
                                    </p>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </section>

                {/* Curriculum Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-900/80">
                    <div className="max-w-7xl mx-auto">
                        <FadeInSection>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                                OpenStart Curriculum
                            </h2>
                            <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                                Master the fundamentals of entrepreneurship through hands-on projects
                            </p>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {curriculum.map((topic, index) => (
                                <FeatureCard
                                    key={topic.title}
                                    icon={topic.icon}
                                    title={topic.title}
                                    description={topic.description}
                                    delay={index * 100}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Outcomes Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <FadeInSection>
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                What You'll Achieve
                            </h2>
                            <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                                Real skills and connections that last beyond the program
                            </p>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {outcomes.map((outcome, index) => (
                                <FeatureCard
                                    key={outcome.title}
                                    icon={outcome.icon}
                                    title={outcome.title}
                                    description={outcome.description}
                                    delay={index * 150}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
                    <div className="max-w-5xl mx-auto text-center">
                        <FadeInSection>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                                Ready to Start Building?
                            </h2>
                        </FadeInSection>

                        <FadeInSection delay={200}>
                            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                                Join OpenStart and gain the skills, network, and confidence to launch your entrepreneurial journey.
                            </p>
                        </FadeInSection>

                        <FadeInSection delay={400}>
                            <PremiumButton to="/apply" variant="primary" className="text-lg px-12 py-5">
                                Begin Your Application
                            </PremiumButton>
                        </FadeInSection>

                        <FadeInSection delay={600}>
                            <p className="text-gray-500 mt-8 font-medium">
                                Applications close November 20, 2025 • Limited spots available
                            </p>
                        </FadeInSection>
                    </div>
                </section>
            </main>

            {/* Global Styles */}
            <style jsx global>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-15px) translateX(10px); }
                }
                
                @keyframes float-random {
                    0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-40px) translateX(20px) scale(1.5); opacity: 0.8; }
                }
                
                @keyframes grid-slow {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(64px) translateX(64px); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.05; }
                    50% { opacity: 0.1; }
                }
                
                .animate-float-slow {
                    animation: float-slow 20s ease-in-out infinite;
                }
                
                .animate-float-medium {
                    animation: float-medium 15s ease-in-out infinite;
                }
                
                .animate-float-random {
                    animation: float-random linear infinite;
                }
                
                .animate-grid-slow {
                    animation: grid-slow 20s linear infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }

                html {
                    scroll-behavior: smooth;
                }
                
                body {
                    font-feature-settings: 'kern' 1;
                    text-rendering: optimizeLegibility;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #1a1a1a;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #10b981, #3b82f6);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #059669, #2563eb);
                }
            `}</style>
        </div>
    );
}

export default OpenStartPage;