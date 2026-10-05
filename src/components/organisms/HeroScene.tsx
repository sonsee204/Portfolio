import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Khối 3D đa diện Icosahedron kim loại ánh bạc tương tác theo con trỏ chuột
function InteractiveMesh(): React.JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    // Nội suy góc xoay theo vị trí con trỏ chuột trên viewport (state.pointer)
    targetRotation.current.x = state.pointer.y * 0.4;
    targetRotation.current.y = state.pointer.x * 0.6;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x + state.clock.getElapsedTime() * 0.15,
      0.05,
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y + state.clock.getElapsedTime() * 0.2,
      0.05,
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={2.1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#A5B4FC"
          roughness={0.15}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// Giao diện dự phòng hiển thị hiệu ứng ánh sáng nhẹ khi WebGL chưa sẵn sàng
function SceneFallback(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#646973] to-[#BBCCD7] opacity-60 blur-xl animate-pulse" />
    </div>
  );
}

// Khung nhìn 3D Canvas trung tâm tương tác chuột cho khu vực Hero
export default function HeroScene(): React.JSX.Element {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="w-full h-full pointer-events-auto"
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#BBCCD7" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#B600A8" />
          <InteractiveMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
