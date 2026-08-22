"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GuitarModel } from "./Instruments";
import Lighting from "./Lighting";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldRender(entry.isIntersecting);
      },
      {
        // Start loading BEFORE the guitar enters the screen.
        rootMargin: "700px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldRender && (
        <Canvas
          dpr={isMobile ? 1 : [1, 1.5]}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        >
          <Lighting isLowPerformance={isMobile} />

          <Suspense fallback={null}>
            <GuitarModel />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}