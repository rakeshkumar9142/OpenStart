import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- Helper Components for Icons ---
const MissionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const VisionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const ValuesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

// --- 3D Interactive Particle Plexus ---
function ParticlePlexus({ count = 200 }) {
    const mesh = useRef();
    const light = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);
            particle.mx += (state.mouse.x * state.viewport.width - particle.mx) * 0.01;
            particle.my += (state.mouse.y * state.viewport.height - particle.my) * 0.01;
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshPhongMaterial color="#fff" />
            </instancedMesh>
        </>
    );
}


// --- Main About Page Component ---
export default function About() {
    return (
        <div className="bg-gray-900 text-white overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-black">
                    <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
                        <ambientLight intensity={0.2} />
                        <pointLight position={[100, 100, 100]} intensity={2} color="white" />
                        <ParticlePlexus />
                        <Stars radius={200} depth={50} count={8000} factor={6} saturation={0} fade />
                    </Canvas>
                </div>
                <div className="relative z-10 text-center animate-fade-in-down">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-indigo-400">
                        About OpenStart
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                        We are a global movement dedicated to igniting the entrepreneurial spirit in young minds, breaking down barriers, and building the next generation of changemakers.
                    </p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="py-24 sm:py-32">
                <div className="container mx-auto px-6 text-gray-300 md:px-12 xl:px-6">
                    <div className="space-y-12 md:space-y-0 md:flex md:gap-12 lg:items-center lg:gap-16">
                        <div className="md:w-6/12 lg:w-6/12">
                            <h2 className="text-3xl text-white font-bold md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-indigo-400 pb-2">
                                Driven by a Passion for Youth Empowerment
                            </h2>
                            <p className="mt-6 text-gray-400">
                                OpenStart was born from a simple yet powerful idea: what if every high school student, regardless of their location, had access to the tools, mentorship, and network needed to turn their ideas into reality?
                            </p>
                            <p className="mt-4 text-gray-400">
                                We are a team of passionate young entrepreneurs and leaders from across the globe—from Ukraine to India to Tunisia—united by this vision. We believe that by nurturing innovation at an early age, we can empower a new wave of leaders who will solve the world's most pressing challenges.
                            </p>
                        </div>
                        <div className="md:w-6/12 lg:w-6/12">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/40 transform transition-transform duration-500 hover:scale-105">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="A diverse team of young people collaborating"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Journey Timeline Section */}
            <div className="py-24 sm:py-32 bg-gray-900/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-center text-3xl font-bold text-white mb-16">Our Journey</h2>
                    <div className="relative wrap overflow-hidden p-10 h-full">
                        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left: '50%'}}></div>
                        {/* <!-- right timeline --> */}
                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
                            </div>
                            <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                <h3 className="mb-3 font-bold text-white text-xl">The Spark</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-400">An idea is born from Vikusyaaa's experience at the Nazarbayev University Summer Research Program, aiming to globalize opportunities for young innovators.</p>
                            </div>
                        </div>
                        {/* <!-- left timeline --> */}
                        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                            </div>
                            <div className="order-1 bg-indigo-900/50 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                <h3 className="mb-3 font-bold text-white text-xl">Team Formation</h3>
                                <p className="text-sm font-medium leading-snug tracking-wide text-gray-300">Passionate student entrepreneurs from India and Tunisia join the mission, forming the core global team of OpenStart.</p>
                            </div>
                        </div>
                        {/* <!-- right timeline --> */}
                        <div className="mb-8 flex justify-between items-center w-full right-timeline">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
                            </div>
                            <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                <h3 className="mb-3 font-bold text-white text-xl">Vision Solidified</h3>
                                <p className="text-sm leading-snug tracking-wide text-gray-400">The program's focus is sharpened: a global accelerator for high school students, designed to nurture talent and foster collaboration.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mission, Vision, Values Section */}
            <div className="py-24 sm:py-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center p-8 bg-gray-800/50 rounded-2xl transform transition-transform duration-300 hover:-translate-y-2">
                            <MissionIcon />
                            <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                            <p className="mt-2 text-gray-400">
                                To break down geographical and economic barriers, providing high school students worldwide with access to world-class entrepreneurial education, mentorship, and resources.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-8 bg-gray-800/50 rounded-2xl transform transition-transform duration-300 hover:-translate-y-2">
                            <VisionIcon />
                            <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                            <p className="mt-2 text-gray-400">
                                To create a vibrant, interconnected global network of young innovators who collaborate, inspire, and build meaningful projects that shape a better future for all.
                            </p>
                        </div>
                        <div className="flex flex-col items-center p-8 bg-gray-800/50 rounded-2xl transform transition-transform duration-300 hover:-translate-y-2">
                            <ValuesIcon />
                            <h3 className="text-2xl font-bold text-white">Our Values</h3>
                            <p className="mt-2 text-gray-400">
                                Collaboration, Inclusivity, Innovation, and a relentless belief in the potential of young people to drive positive change.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
