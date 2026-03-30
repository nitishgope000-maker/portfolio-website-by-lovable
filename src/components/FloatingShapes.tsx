import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function MiniOrb({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0] * 3) * 0.25;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * (1.6 + Math.sin(state.clock.elapsedTime * 1.2 + position[2]) * 0.2));
    }
  });

  return (
    <group>
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.03} />
      </mesh>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function OrbitingBit({ center, radius, speed, offset, char }: {
  center: [number, number, number]; radius: number; speed: number; offset: number; char: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = center[0] + Math.cos(t) * radius;
      ref.current.position.y = center[1] + Math.sin(t * 0.8) * radius * 0.5;
      ref.current.position.z = center[2] + Math.sin(t) * radius * 0.4;
    }
  });

  return (
    <group ref={ref}>
      <Text fontSize={0.1} color="#33ddff" anchorX="center" anchorY="middle" fillOpacity={0.4} font={undefined}>
        {char}
      </Text>
    </group>
  );
}

function SmallBinaryOrbs() {
  const orbs = useMemo(() => [
    { pos: [-3.5, 1, -2] as [number, number, number], scale: 0.3, color: "#33ddff" },
    { pos: [3.5, -0.5, -1.5] as [number, number, number], scale: 0.25, color: "#8b5cf6" },
    { pos: [0, 2, -2.5] as [number, number, number], scale: 0.2, color: "#33ddff" },
  ], []);

  const bits = useMemo(() => {
    const items: { orbIdx: number; radius: number; speed: number; offset: number; char: string }[] = [];
    for (let i = 0; i < 30; i++) {
      items.push({
        orbIdx: i % 3,
        radius: 0.5 + Math.random() * 0.8,
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        char: Math.random() > 0.5 ? "1" : "0",
      });
    }
    return items;
  }, []);

  return (
    <>
      {orbs.map((o, i) => <MiniOrb key={i} position={o.pos} scale={o.scale} color={o.color} />)}
      {bits.map((b, i) => (
        <OrbitingBit key={i} center={orbs[b.orbIdx].pos} radius={b.radius} speed={b.speed} offset={b.offset} char={b.char} />
      ))}
    </>
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
      <SmallBinaryOrbs />
    </Canvas>
  </div>
);

export default FloatingShapes;
