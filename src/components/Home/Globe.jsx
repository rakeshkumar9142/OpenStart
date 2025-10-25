import React, { useRef } from 'react';

import { useFrame } from '@react-three/fiber';

import { Sphere } from '@react-three/drei';

import * as THREE from 'three';



export default function Globe() {

    const globeRef = useRef();

 

    useFrame(() => {

      if (globeRef.current) {

        globeRef.current.rotation.y += 0.01;

      }

    });

 

    // Create a texture loader

    const textureLoader = new THREE.TextureLoader();

   

   

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