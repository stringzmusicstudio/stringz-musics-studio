"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Lighting from "./Lighting";
import { KeyboardModel } from "./Instruments";

export default function KeyboardScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 11], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <Lighting isLowPerformance={false} />

      <Suspense fallback={null}>
        <KeyboardModel />
      </Suspense>
    </Canvas>
  );
}