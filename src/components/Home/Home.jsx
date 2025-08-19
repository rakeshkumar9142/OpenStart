import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Rakesh_P from "../../assets/Rakesh_P.jpg"


// Helper components for icons
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2 text-indigo-400">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2 text-indigo-400">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2 text-indigo-400">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-2 text-indigo-400">
        <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
    </svg>
);


// 3D Globe Component
function Globe() {
  const globeRef = useRef();

  // Use useFrame for continuous rotation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.01;
    }
  });

  // Create a texture loader
  const textureLoader = new THREE.TextureLoader();
  // Load the texture (using a placeholder for the map)
  // A simple world map texture would work well here.
  // For this example, we'll use a generated texture.
  
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const context = canvas.getContext('2d');
  
  // Draw continents (simplified)
  context.fillStyle = '#4F4F4F'; // Land color
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#82cafa'; // Water color
  // Simplified land masses
  context.fillRect(500, 300, 400, 300);
  context.fillRect(1200, 400, 500, 400);
  context.fillRect(200, 700, 300, 200);
  context.fillRect(1000, 100, 200, 150);
  
  const texture = new THREE.CanvasTexture(canvas);


  return (
    <group ref={globeRef}>
      <Sphere args={[2.5, 64, 64]}>
        <meshStandardMaterial 
          map={texture}
          metalness={0.5}
          roughness={0.7}
        />
      </Sphere>
    </group>
  );
}


// Main Component
export default function OpenStartPage() {
    const teamMembers = [
        {
            name: "Vikusyaaa",
            country: "Ukraine",
            bio: "Visionary founder with a passion for empowering young changemakers.",
            img: "https://placehold.co/400x400/7c3aed/ffffff?text=V",
        },
        {
            name: "Rakesh Kumar",
            country: "India",
            bio: "Student entrepreneur building XfBeeN to reduce food wastage using computer vision.",
            img: {Rakesh_P},
        },
        {
            name: "Cheedhe",
            country: "Tunisia",
            bio: "Bringing a global perspective and cultural diversity from North Africa.",
            img: "https://placehold.co/400x400/16a34a/ffffff?text=C",
        },
    ];

    const differentiators = [
        {
            icon: <ZapIcon />,
            title: "Early Age Focus",
            description: "Encouraging entrepreneurial thinking specifically in high school students.",
        },
        {
            icon: <BriefcaseIcon />,
            title: "Hands-On Experience",
            description: "Providing practical experience in building and scaling real-world projects.",
        },
        {
            icon: <UsersIcon />,
            title: "Global Network",
            description: "Fostering a worldwide community of ambitious student innovators.",
        },
        {
            icon: <TargetIcon />,
            title: "Essential Skills",
            description: "Equipping participants with business, tech, and leadership tools for success.",
        },
    ];

    return (
        <div className="bg-gray-900 text-white font-sans">
            {/* Hero Section */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                        <ambientLight intensity={0.2} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <Globe />
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                    </Canvas>
                </div>
                <div className="relative z-10 text-center p-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                        OpenStart
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
                        Building the Next Generation of Global Entrepreneurs
                    </p>
                    <button className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
                        Join the Movement
                    </button>
                </div>
            </header>

            <main className="py-20 px-4 sm:px-6 lg:px-8">
                {/* Founder's Story Section */}
                <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-indigo-400 mb-4">The Spark of a Visionary</h2>
                        <p className="text-gray-300 mb-4">
                            OpenStart is an ambitious project founded by <strong>Vikusyaaa</strong>, a visionary young leader from Ukraine. Her entrepreneurial spark grew even stronger after her project was ranked among the top 3 out of 250 teams worldwide in the Nazarbayev University Summer Research Program 2025.
                        </p>
                        <p className="text-gray-300">
                            The vision is simple yet powerful: break down geographical barriers and provide high school students with access to world-class mentorship, networks, and tools that are usually limited to only a few.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 p-1 shadow-2xl">
                             <img src="https://placehold.co/400x400/1e1b4b/ffffff?text=Founder" alt="Vikusyaaa" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="max-w-7xl mx-auto text-center mb-24">
                    <h2 className="text-4xl font-bold mb-2">The Team Behind OpenStart</h2>
                    <p className="text-indigo-400 mb-12">A Global Collaboration of Passionate Innovators</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                                <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500" />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-indigo-400 mb-2">{member.country}</p>
                                <p className="text-gray-400 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What Makes OpenStart Different Section */}
                <section className="max-w-7xl mx-auto text-center mb-24">
                     <h2 className="text-4xl font-bold mb-2">What Makes OpenStart Different?</h2>
                    <p className="text-indigo-400 mb-12">Nurturing the Innovators of Tomorrow</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {differentiators.map((item, index) => (
                            <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                                {item.icon}
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Vision Ahead Section */}
                <section className="relative max-w-7xl mx-auto py-20 px-10 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-center">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                     <div className="relative z-10">
                        <GlobeIcon />
                        <h2 className="text-4xl font-bold mt-4 mb-4">The Vision Ahead</h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            OpenStart is not just a project – it’s a movement to inspire and accelerate young changemakers globally. We're building a hub for future entrepreneurs who will shape industries, economies, and societies.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
