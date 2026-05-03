"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function BobaCup() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Boba Pearls
  const pearls = Array.from({ length: 15 }).map((_, i) => (
    <mesh
      key={i}
      position={[
        (Math.random() - 0.5) * 1.5,
        -1.5 + Math.random() * 0.8,
        (Math.random() - 0.5) * 1.5,
      ]}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#1f1f1f" roughness={0.1} />
    </mesh>
  ));

  // Spin slightly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      
      // Interactive pop on hover
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      {/* Cup Body (Glass) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.2, 4, 32]} />
        <meshPhysicalMaterial 
          color="#fce4ec" 
          transmission={0.9} 
          opacity={1} 
          roughness={0.1} 
          thickness={0.5} 
          clearcoat={1}
        />
      </mesh>

      {/* Milk Tea Liquid */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.4, 1.15, 3.5, 32]} />
        <meshStandardMaterial color="#d7ccc8" roughness={0.4} />
      </mesh>

      {/* Cup Lid */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[1.6, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Straw */}
      <mesh position={[0.5, 1.5, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.2, 0.2, 5, 16]} />
        <meshStandardMaterial color="#ff4081" roughness={0.2} />
      </mesh>

      {/* Pearls */}
      {pearls}
    </group>
  );
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--color-telegram)] rounded-full animate-spin"></div>
    </div>
  );
}

export default function Boba3D() {
  return (
    // Padding x (px-8) gives space on mobile to scroll without touching the canvas
    <div className="w-full h-full cursor-pointer relative px-8 sm:px-0">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }} className="w-full h-full">
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <BobaCup />
          </Float>
          
          <Environment preset="city" />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          {/* Disable zoom and pan to prevent mobile users getting stuck */}
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
