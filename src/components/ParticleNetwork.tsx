import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const ORB_COUNT = 5;
const DIGIT_COUNT = 60;

function GlowOrb({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * (1.8 + Math.sin(state.clock.elapsedTime * 1.5 + position[0] * 2) * 0.3));
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.04} />
      </mesh>
      {/* Core orb */}
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      {/* Inner bright core */}
      <mesh position={position} scale={scale * 0.4}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function OrbitingDigit({ orbCenter, radius, speed, offset, digit }: {
  orbCenter: [number, number, number];
  radius: number;
  speed: number;
  offset: number;
  digit: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = orbCenter[0] + Math.cos(t) * radius;
      ref.current.position.y = orbCenter[1] + Math.sin(t * 0.7) * radius * 0.6;
      ref.current.position.z = orbCenter[2] + Math.sin(t) * radius * 0.5;
    }
  });

  return (
    <group ref={ref}>
      <Text
        fontSize={0.12}
        color="#33ddff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.5}
        font={undefined}
      >
        {digit}
      </Text>
    </group>
  );
}

function BinaryOrbs() {
  const orbs = useMemo(() => [
    { pos: [-4, 1.5, -2] as [number, number, number], scale: 0.5, color: "#33ddff" },
    { pos: [4, -1, -1.5] as [number, number, number], scale: 0.4, color: "#8b5cf6" },
    { pos: [-2, -2.5, -3] as [number, number, number], scale: 0.35, color: "#33ddff" },
    { pos: [2, 2.5, -2] as [number, number, number], scale: 0.3, color: "#8b5cf6" },
    { pos: [0, -1, -2.5] as [number, number, number], scale: 0.25, color: "#33ddff" },
  ], []);

  const digits = useMemo(() => {
    const items: { orbIdx: number; radius: number; speed: number; offset: number; digit: string }[] = [];
    for (let i = 0; i < DIGIT_COUNT; i++) {
      const orbIdx = i % ORB_COUNT;
      items.push({
        orbIdx,
        radius: 0.6 + Math.random() * 1.2,
        speed: 0.3 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
        digit: Math.random() > 0.5 ? "1" : "0",
      });
    }
    return items;
  }, []);

  return (
    <>
      {orbs.map((orb, i) => (
        <GlowOrb key={i} position={orb.pos} scale={orb.scale} color={orb.color} />
      ))}
      {digits.map((d, i) => (
        <OrbitingDigit
          key={i}
          orbCenter={orbs[d.orbIdx].pos}
          radius={d.radius}
          speed={d.speed}
          offset={d.offset}
          digit={d.digit}
        />
      ))}
    </>
  );
}

const ParticleNetwork = () => (
  <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <BinaryOrbs />
    </Canvas>
  </div>
);

export default ParticleNetwork;
