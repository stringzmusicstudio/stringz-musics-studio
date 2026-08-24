"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Lighting from "./Lighting";
import { KeyboardModel } from "./Instruments";
export default function KeyboardScene() {
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
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: mobile ? "250px 0px" : "600px 0px",
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
          shadows={!isMobile}
          camera={{ position: [0, 5, 11], fov: 35 }}
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
  <KeyboardModel />
</Suspense>
        </Canvas>
      )}
    </div>
  );
}