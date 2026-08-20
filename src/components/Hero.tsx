"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const animation = gsap.fromTo(
      contentRef.current.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      }
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
   <section
  id="home"
  className="relative h-screen overflow-hidden bg-black"
>
      {/* BACKGROUND IMAGE */}
      <div
className="absolute inset-0 bg-cover bg-[center_32%]"
        style={{
          backgroundImage: "url('/images/hero-studio.jpg.png')",
        }}
      />

      {/* SUBTLE BOTTOM DARKNESS */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

      {/* EST BADGE — EXTREME LEFT ON THE FLOOR */}
{/* Bottom corner badges */}
<div className="absolute bottom-15 left-1/2 z-20 hidden w-full max-w-[1450px] -translate-x-1/2 items-center justify-between px-6 md:flex">

  {/* Left badge */}
  <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/65 px-4 py-2 backdrop-blur-md">
    <span className="h-2 w-2 rounded-full bg-yellow-400" />

    <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/75">
      EST. 2025 · BENGALURU
    </span>
  </div>

  {/* Right badge */}
  <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-md">
    <span className="h-2 w-2 rounded-full bg-yellow-400" />

    <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/75">
      REGISTERED LLP
    </span>
  </div>

</div>

{/* CENTER HERO CONTENT */}
<div
  ref={contentRef}
  className="absolute inset-x-0 bottom-1 z-10 mx-auto flex w-full flex-col items-center px-5 text-center"
>
  <h1 className="text-3xl font-bold leading-none tracking-[-0.045em] text-white md:text-[34px] lg:text-[36px]">
    Master the Art of{" "}
    <span className="text-yellow-400">Music</span>
  </h1>

  <p className="mt-2 max-w-none text-xs leading-5 text-white/75 sm:text-sm lg:whitespace-nowrap">
    Professional Guitar, Keyboard and Drum lessons for students of all ages.
    Performance-focused and taught in a studio built for sound.
  </p>

  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
    <a
      href="#book"
      className="inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
    >
      Book Free Trial
      <span aria-hidden="true">→</span>
    </a>
<button
  onClick={() => {
    document.getElementById("guitar")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
  className="inline-flex items-center justify-center rounded-full border border-yellow-400/50 bg-black/45 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-yellow-400/10 cursor-pointer"
>
  Explore Instruments
</button>
  </div>

  <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.45em] text-yellow-400/85">
    STRUM • DRUM • KEY
  </p>
</div>
    </section>
  );
}