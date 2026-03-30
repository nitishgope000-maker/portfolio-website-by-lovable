import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Octahedron({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.3;
      ref.current.rotation.y += delta * speed * 0.5;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#33ddff" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

function Torus({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.2;
      ref.current.rotation.z += delta * speed * 0.4;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 8, 20]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

function Icosahedron({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed * 0.3;
      ref.current.rotation.z += delta * speed * 0.2;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#33ddff" wireframe transparent opacity={0.1} />
      </mesh>
    </Float>
  );
}

const FloatingShapes = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: "none" }}>
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Octahedron position={[-4, 1.5, -2]} scale={0.6} speed={0.8} />
      <Torus position={[4.5, -1, -1]} scale={0.5} speed={0.6} />
      <Icosahedron position={[-3, -2, -3]} scale={0.8} speed={0.4} />
      <Octahedron position={[3, 2.5, -2.5]} scale={0.4} speed={1} />
      <Torus position={[0, -3, -2]} scale={0.35} speed={0.7} />
    </Canvas>
  </div>
);

export default FloatingShapes;
