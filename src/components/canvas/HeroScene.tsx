"use client";
import { GuitarModel } from "./Instruments";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

function StudioRoom() {
  return (
    <group>
      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[24, 18]} />
        <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.15} />
      </mesh>

      {/* BACK WALL */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <boxGeometry args={[24, 10, 0.3]} />
        <meshStandardMaterial color="#171717" roughness={0.95} />
      </mesh>

      {/* LEFT WALL */}
      <mesh position={[-9, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 10, 0.3]} />
        <meshStandardMaterial color="#101010" roughness={0.95} />
      </mesh>

      {/* RIGHT WALL */}
      <mesh position={[9, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 10, 0.3]} />
        <meshStandardMaterial color="#101010" roughness={0.95} />
      </mesh>
      {/* CEILING */}
<mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
  <planeGeometry args={[24, 18]} />
  <meshStandardMaterial color="#0d0d0d" />
</mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
  gl={{ alpha: true }}
        shadows
        camera={{ position: [0, 1.5, 10], fov: 48 }}
      >
        

        <ambientLight intensity={0.35} />

        <spotLight
          position={[0, 7, 4]}
          intensity={80}
          angle={0.45}
          penumbra={1}
          color="#d4a432"
          castShadow
        />

        <pointLight
          position={[-5, 1, 2]}
          intensity={12}
          color="#8b5a2b"
        />

        <pointLight
          position={[5, 1, 2]}
          intensity={12}
          color="#8b5a2b"
        />

       <>
  <StudioRoom />

  <group position={[3.2, -0.3, -1]} scale={1.3}>
  <GuitarModel />
</group>
</>

        <Environment preset="warehouse" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}