"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GuitarModel } from "./Instruments";
import Lighting from "./Lighting";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
      }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <Lighting isLowPerformance={false} />

      <Suspense fallback={null}>
        <GuitarModel />
      </Suspense>
    </Canvas>
  );
}