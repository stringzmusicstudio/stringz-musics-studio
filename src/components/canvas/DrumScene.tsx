"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Lighting from "./Lighting";
import { DrumModel } from "./Instruments";

export default function DrumScene() {
  return (
   <Canvas
  camera={{ position: [0, 0, 7], fov: 45 }}
  gl={{ antialias: true, alpha: true }}
  style={{ width: "100%", height: "100%", background: "transparent" }}
>
     

      <Lighting isLowPerformance={false} />

      <Suspense fallback={null}>
        <DrumModel />
      </Suspense>
    </Canvas>
  );
}