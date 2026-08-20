"use client";

interface LightingProps {
  isLowPerformance: boolean;
}

export default function Lighting({ isLowPerformance }: LightingProps) {
  return (
   <>
  {/* Base ambient */}
 <ambientLight intensity={0.55} />

  {/* Main overhead spotlight */}
  <spotLight
    position={[0, 9, 3]}
    angle={0.45}
    penumbra={1}
    intensity={12}
    color="#ffffff"
    castShadow={!isLowPerformance}
    shadow-mapSize-width={2048}
    shadow-mapSize-height={2048}
  />

  {/* Purple spotlight from above */}
  <spotLight
    position={[2, 8, -2]}
    angle={0.7}
    penumbra={1}
    intensity={5}
    color="#b54cff"
  />

  {/* Purple rim light */}
  <pointLight
    position={[6, 3, -4]}
    intensity={4}
    color="#8a2be2"
  />

  {/* Soft front fill */}
  <directionalLight
    position={[-5, 4, 5]}
    intensity={1.8}
    color="#ffffff"
  />

  {/* Warm floor bounce */}
  <pointLight
    position={[0, -2, 3]}
    intensity={1.4}
    color="#d4af37"
  />
</>
  );
}