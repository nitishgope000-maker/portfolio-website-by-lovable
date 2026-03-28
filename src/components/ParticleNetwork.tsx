import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 2.2;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const pos = [];
    const vel = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      vel.push(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.002
      );
    }
    return { positions: new Float32Array(pos), velocities: new Float32Array(vel) };
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const maxLines = PARTICLE_COUNT * 6;
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));  
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const { positions, velocities } = particles;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      if (positions[i3] > 7 || positions[i3] < -7) velocities[i3] *= -1;
      if (positions[i3 + 1] > 4 || positions[i3 + 1] < -4) velocities[i3 + 1] *= -1;
      if (positions[i3 + 2] > 3 || positions[i3 + 2] < -3) velocities[i3 + 2] *= -1;

      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Lines
    const posAttr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = lineGeometry.getAttribute("color") as THREE.BufferAttribute;
    let lineIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const i3 = i * 3, j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const li = lineIdx * 6;
          posAttr.array[li] = positions[i3];
          posAttr.array[li + 1] = positions[i3 + 1];
          posAttr.array[li + 2] = positions[i3 + 2];
          posAttr.array[li + 3] = positions[j3];
          posAttr.array[li + 4] = positions[j3 + 1];
          posAttr.array[li + 5] = positions[j3 + 2];

          const ci = lineIdx * 6;
          colAttr.array[ci] = 0.2 * alpha;
          colAttr.array[ci + 1] = 0.85 * alpha;
          colAttr.array[ci + 2] = 0.95 * alpha;
          colAttr.array[ci + 3] = 0.2 * alpha;
          colAttr.array[ci + 4] = 0.85 * alpha;
          colAttr.array[ci + 5] = 0.95 * alpha;

          lineIdx++;
        }
      }
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineIdx * 2);
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#33ddff" transparent opacity={0.7} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.4} />
      </lineSegments>
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
      <Particles />
    </Canvas>
  </div>
);

export default ParticleNetwork;
