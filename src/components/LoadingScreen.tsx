"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Simple progress bar animation
    tl.to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    })
      // Fade out text
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      })
      // Slide up loading screen
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center gap-6">
        <h1
          ref={textRef}
          className="font-display text-4xl font-bold tracking-widest text-white md:text-5xl"
        >
          STRINGZ
        </h1>
        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gold-light"
          />
        </div>
      </div>
    </div>
  );
}
