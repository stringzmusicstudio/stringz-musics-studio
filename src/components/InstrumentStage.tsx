"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Scene = dynamic(
  () => import("@/components/canvas/Scene"),
  { ssr: false }
);
export default function InstrumentStage() {
    const [activeInstrument, setActiveInstrument] = useState<
  "guitar" | "drums" | "keyboard"
>("guitar");

useEffect(() => {
  const handleScroll = () => {
    const stage = document.getElementById("instrument-stage");
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const totalScrollable = stage.offsetHeight - window.innerHeight;

    const progress = Math.min(
      Math.max(-rect.top / totalScrollable, 0),
      1
    );

    if (progress < 0.33) {
      setActiveInstrument("guitar");
    } else if (progress < 0.66) {
      setActiveInstrument("drums");
    } else {
      setActiveInstrument("keyboard");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    <section
      id="instrument-stage"
      className="relative h-[300vh] w-full bg-black"
    >
      {/* This stays on screen while we scroll through all 3 instruments */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Temporary marker — we'll replace this with the 3D scene */}
        <div className="absolute inset-0 grid grid-cols-1 items-center px-8 md:px-16 lg:grid-cols-2 lg:px-24">
  {/* LEFT TEXT */}
 <div className="relative z-10 max-w-xl">
  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-yellow-400">
    {activeInstrument === "guitar"
      ? "Guitar"
      : activeInstrument === "drums"
      ? "Drums"
      : "Keyboard"}
  </p>

  <h2 className="text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-white md:text-7xl lg:text-[5.8rem]">
    {activeInstrument === "guitar"
      ? "Find Your Sound."
      : activeInstrument === "drums"
      ? "Feel the Rhythm."
      : "Create Every Note."}
  </h2>

  <p className="mt-8 max-w-xl text-lg leading-9 text-white/65">
    {activeInstrument === "guitar"
      ? "Acoustic, electric, or classical — build technique, learn songs, and discover the voice of your instrument through structured lessons designed around you."
      : activeInstrument === "drums"
      ? "Build timing, coordination, and confidence through energetic drum lessons designed for every skill level."
      : "Learn chords, melody, rhythm, and performance through structured keyboard lessons designed for beginners and growing musicians."}
  </p>
</div>

  {/* RIGHT SIDE */}
  <div className="relative h-[600px] w-full">
   <div className="absolute inset-0">
  <Scene />
</div>
  </div>
</div>
      </div>
    </section>
  );
}