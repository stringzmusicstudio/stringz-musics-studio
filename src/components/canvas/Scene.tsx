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
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Load once when the section gets close.
        // DO NOT destroy the WebGL canvas after it loads.
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: mobile ? "300px 0px" : "600px 0px",
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
          frameloop="always"
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