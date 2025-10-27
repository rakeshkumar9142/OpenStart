import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function Globe() {
  const globeRef = useRef();

  // Gentle rotation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0012;
    }
  });

  // Create high-quality texture (elegant dark blue with subtle land)
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Ocean gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#021024');
    gradient.addColorStop(1, '#030b17');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Minimalistic continents (soft teal tone)
    ctx.fillStyle = '#1a9c93';
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.ellipse(600, 420, 250, 150, 0, 0, 2 * Math.PI);
    ctx.ellipse(1300, 520, 290, 170, 0, 0, 2 * Math.PI);
    ctx.ellipse(900, 250, 200, 130, 0, 0, 2 * Math.PI);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Light network lines (symbolizing global connections)
  const lines = useMemo(() => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      const start = new THREE.Vector3(
        Math.sin(i) * 2.5,
        Math.cos(i * 1.2) * 1.2,
        Math.cos(i) * 2.5
      );
      const end = new THREE.Vector3(
        -start.x,
        -start.y * 0.8,
        -start.z
      );
      points.push({ start, end });
    }
    return points;
  }, []);

  return (
    <group ref={globeRef}>
      {/* Base globe with subtle metallic surface */}
      <Sphere args={[2.5, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          metalness={0.3}
          roughness={0.9}
          emissive={new THREE.Color('#093b74')}
          emissiveIntensity={0.15}
        />
      </Sphere>

      {/* Elegant outer glow */}
      <Sphere args={[2.65, 64, 64]}>
        <meshBasicMaterial
          color="#1a9c93"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Subtle connection lines */}
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#1a9c93"
          lineWidth={0.8}
          transparent
          opacity={0.15}
        />
      ))}

      {/* Lighting for soft depth */}
      <pointLight color="#1a9c93" intensity={0.6} distance={12} position={[0, 0, 4]} />
      <ambientLight intensity={0.25} />
    </group>
  );
}
