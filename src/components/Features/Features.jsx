import React, { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
// The fix is on this line: added AnimatePresence
import { motion, AnimatePresence } from 'framer-motion'; 
import { Book, Network, Rocket, Lightbulb, X } from 'lucide-react';

// --- DATA & CONFIGURATION ---
const featuresData = [
    { id: 'learn', icon: Book, title: 'Learn', color: '#00ffff', description: "Access curated learning paths and workshops." },
    { id: 'connect', icon: Network, title: 'Connect', color: '#8A2BE2', description: "Find co-founders and mentors in a global network." },
    { id: 'build', icon: Rocket, title: 'Build', color: '#FF4500', description: "Utilize our incubator and tools to launch your project." },
    { id: 'inspire', icon: Lightbulb, title: 'Inspire', color: '#FFD700', description: "Get inspired by success stories and challenges." },
];

// --- 3D COMPONENTS ---

// The central pulsating core
const Core = ({ activatedCount }) => {
    const meshRef = useRef();
    const lightRef = useRef();
    const intensity = 1 + activatedCount * 0.5;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y += 0.005;
        const scale = 1 + Math.sin(time) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
        lightRef.current.intensity = intensity + Math.sin(time * 2) * 0.5;
    });

    return (
        <group>
            <pointLight ref={lightRef} color="#ffffff" intensity={1} distance={10} />
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, 6]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                    metalness={1}
                    roughness={0.1}
                />
            </mesh>
        </group>
    );
};

// A single feature module orbiting the core
const FeatureModule = ({ feature, position, onSelect, isSelected }) => {
    const groupRef = useRef();
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        groupRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <group ref={groupRef} position={position} onClick={() => onSelect(feature.id)}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[0.5, 0.1, 100, 16]} />
                <meshStandardMaterial
                    color={feature.color}
                    emissive={feature.color}
                    emissiveIntensity={isSelected ? 4 : 1}
                    metalness={0.8}
                    roughness={0.2}
                    wireframe={!isSelected}
                />
            </mesh>
            <Text position={[0, -1, 0]} fontSize={0.3} color="white" anchorX="center">
                {feature.title}
            </Text>
        </group>
    );
};

// Manages camera movement and scene state
const SceneController = ({ selectedId, onSelect, activatedCount }) => {
    const targetPosition = useMemo(() => {
        if (!selectedId) return new THREE.Vector3(0, 0, 10);
        const featureIndex = featuresData.findIndex(f => f.id === selectedId);
        const angle = (featureIndex / featuresData.length) * Math.PI * 2;
        const radius = 4;
        return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    }, [selectedId]);

    useFrame((state) => {
        state.camera.position.lerp(targetPosition, 0.05);
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <Core activatedCount={activatedCount} />
            {featuresData.map((feature, index) => {
                const angle = (index / featuresData.length) * Math.PI * 2;
                const radius = 3;
                const position = [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
                return (
                    <FeatureModule
                        key={feature.id}
                        feature={feature}
                        position={position}
                        onSelect={onSelect}
                        isSelected={selectedId === feature.id}
                    />
                );
            })}
        </>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function Features() {
    const [selectedId, setSelectedId] = useState(null);
    const [activated, setActivated] = useState([]);
    const selectedFeature = featuresData.find(f => f.id === selectedId);

    const handleSelect = (id) => {
        setSelectedId(id);
        if (!activated.includes(id)) {
            setActivated([...activated, id]);
        }
    };

    const handleClose = () => {
        setSelectedId(null);
    };

    return (
        <div className="relative w-full h-screen bg-black font-sans">
            <Canvas camera={{ fov: 75, position: [0, 0, 10] }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <SceneController selectedId={selectedId} onSelect={handleSelect} activatedCount={activated.length} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            {/* Title & Instructions */}
            <AnimatePresence>
                {!selectedId && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200px] text-center pointer-events-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h1 className="text-6xl font-bold text-white tracking-tighter">The Idea Engine</h1>
                        <p className="text-lg text-gray-400 mt-2">Click a module to explore its function.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Holographic Detail Panel */}
            <AnimatePresence>
                {selectedFeature && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md h-auto p-8"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 150 }}
                    >
                        <div 
                            className="relative w-full h-full bg-black/50 backdrop-blur-md rounded-xl border-2"
                            style={{ borderColor: selectedFeature.color, boxShadow: `0 0 40px ${selectedFeature.color}50` }}
                        >
                             <div className="p-8 text-center">
                                <div className="flex justify-center mb-4">
                                     <div className="p-3 rounded-full" style={{ border: `2px solid ${selectedFeature.color}` }}>
                                        <selectedFeature.icon size={40} style={{ color: selectedFeature.color }} />
                                     </div>
                                </div>
                                <h2 className="text-4xl font-bold" style={{ color: selectedFeature.color }}>
                                    {selectedFeature.title}
                                </h2>
                                <p className="text-gray-200 mt-2 text-lg">{selectedFeature.description}</p>
                                <button
                                    onClick={handleClose}
                                    className="mt-6 px-6 py-2 text-white font-semibold rounded-full transition-all"
                                    style={{ border: `1px solid ${selectedFeature.color}`, textShadow: `0 0 10px ${selectedFeature.color}` }}
                                >
                                    Return to Engine
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}