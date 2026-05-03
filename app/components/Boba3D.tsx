"use client";

import { useRef, useState, Suspense, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function BobaCup() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Generate Pearls mathematically around the surface of the cup
  const pearls: ReactNode[] = [];
  const rings = [
    { y: -1.0, radius: 1.18, count: 8, offset: 0 },
    { y: -0.3, radius: 1.25, count: 8, offset: Math.PI / 8 },
    { y: 0.4, radius: 1.32, count: 8, offset: 0 },
  ];

  rings.forEach((ring) => {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 + ring.offset;
      const x = Math.cos(angle) * ring.radius;
      const z = Math.sin(angle) * ring.radius;
      
      // Calculate normal vector to align the pearl slightly (optional, but spheres look fine)
      pearls.push(
        <mesh key={`pearl-${ring.y}-${i}`} position={[x, ring.y, z]}>
          {/* Flatten the sphere slightly to look like it's stuck to the cup */}
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.1} />
        </mesh>
      );
    }
  });

  // Spin slightly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      
      // Interactive pop on hover
      const targetScale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      position={[0, -0.5, 0]} // Center the whole cup visually
    >
      {/* Cup Body (Opaque Pink) */}
      <mesh position={[0, 0, 0]}>
        {/* radiusTop, radiusBottom, height, radialSegments */}
        <cylinderGeometry args={[1.4, 1.1, 3.5, 32]} />
        <meshStandardMaterial color="#F47EA5" roughness={0.3} />
      </mesh>

      {/* Top Rim (Light Pink) */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[1.5, 1.45, 0.2, 32]} />
        <meshStandardMaterial color="#FBD4E1" roughness={0.4} />
      </mesh>

      {/* Dome Lid (Clear Plastic) */}
      <mesh position={[0, 1.95, 0]}>
        {/* radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength */}
        <sphereGeometry args={[1.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={0.9} 
          opacity={1} 
          roughness={0} 
          thickness={0.1} 
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flat cover under the dome (Optional, to make liquid look sealed) */}
      <mesh position={[0, 1.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 32]} />
        <meshStandardMaterial color="#F47EA5" roughness={0.3} />
      </mesh>

      {/* Straw */}
      <mesh position={[0.4, 2.8, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.18, 0.18, 3.5, 16]} />
        <meshStandardMaterial color="#F06292" roughness={0.2} />
      </mesh>

      {/* Pearls embedded on the outside */}
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
    <div className="w-full h-full cursor-pointer relative px-8 sm:px-0">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }} className="w-full h-full">
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
            <BobaCup />
          </Float>
          
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
