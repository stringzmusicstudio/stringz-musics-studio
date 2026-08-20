"use client";
import FloatingSocialDock from "@/components/FloatingSocialDock";
import { useEffect, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

// Dynamically import the 3D Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });
const DrumScene = dynamic(
  () => import("@/components/canvas/DrumScene"),
  { ssr: false }
);
const KeyboardScene = dynamic(
  () => import("../components/canvas/KeyboardScene"),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInstrument, setSelectedInstrument] = useState("Guitar");
  const [studioOpen, setStudioOpen] = useState(false);
const [studioIndex, setStudioIndex] = useState(0);
const [wheelLocked, setWheelLocked] = useState(false);
const [galleryType, setGalleryType] =
 useState<"studio" | "guitar" | "drums" | "keyboard">("studio");
const [galleryIndex, setGalleryIndex] = useState(0);

const studioImages = [
  "/images/Gallery/Studio/studio-1.jpg",
  "/images/Gallery/Studio/studio-2.jpg",
  "/images/Gallery/Studio/studio-3.jpg",
  "/images/Gallery/Studio/studio-4.jpg",
  "/images/Gallery/Studio/studio-5.jpg",
  "/images/Gallery/Studio/studio-6.jpg",
  "/images/Gallery/Studio/studio-7.jpg",
];
const guitarMedia = [
  { type: "image", src: "/images/Gallery/Guitar/guitar-1.jpg" },
  { type: "image", src: "/images/Gallery/Guitar/guitar-2.jpg" },
  { type: "video", src: "/images/Gallery/Guitar/guitar-3.mp4" },
  { type: "video", src: "/images/Gallery/Guitar/guitar-4.mp4" },
  { type: "image", src: "/images/Gallery/Guitar/guitar-5.jpg" },
];
const drumsMedia = [
  { type: "image", src: "/images/Gallery/Drums/drums-1.jpg" },
  { type: "image", src: "/images/Gallery/Drums/drums-2.jpg" },
  { type: "image", src: "/images/Gallery/Drums/drums-3.jpg" },
  { type: "video", src: "/images/Gallery/Drums/drums-4.mp4" },
  { type: "video", src: "/images/Gallery/Drums/drums-5.mp4" },
  { type: "video", src: "/images/Gallery/Drums/drums-6.mp4" },
  { type: "image", src: "/images/Gallery/Drums/drums-7.jpg" },
];
const keyboardMedia = [
  { type: "image", src: "/images/Gallery/Keyboard/keyboard-1.jpg" },
  { type: "image", src: "/images/Gallery/Keyboard/keyboard-2.jpg" },
  { type: "image", src: "/images/Gallery/Keyboard/keyboard-3.jpg" },
  { type: "video", src: "/images/Gallery/Keyboard/keyboard-4.mp4" },
  { type: "video", src: "/images/Gallery/Keyboard/keyboard-5.mp4" },
  { type: "video", src: "/images/Gallery/Keyboard/keyboard-6.mp4" },
  { type: "image", src: "/images/Gallery/Keyboard/keyboard-7.jpg" },
  { type: "image", src: "/images/Gallery/Keyboard/keyboard-8.jpg" },
  { type: "image", src: "/images/Gallery/Keyboard/keyboard-9.jpg" },
];
const activeMedia =
  galleryType === "studio"
    ? studioImages.map((src) => ({ type: "image", src }))
    : galleryType === "guitar"
    ? guitarMedia
    : galleryType === "drums"
    ? drumsMedia
    : keyboardMedia;
const [touchStart, setTouchStart] = useState<number | null>(null);
const [touchEnd, setTouchEnd] = useState<number | null>(null);
const [mouseStart, setMouseStart] = useState<number | null>(null);
const [isDragging, setIsDragging] = useState(false);

const nextStudioImage = () => {
  setGalleryIndex(
    (current) => (current + 1) % activeMedia.length
  );
};

const previousStudioImage = () => {
  setGalleryIndex(
    (current) =>
      (current - 1 + activeMedia.length) % activeMedia.length
  );
};

const handleTouchStart = (e: React.TouchEvent) => {
  setTouchEnd(null);
  setTouchStart(e.targetTouches[0].clientX);
};

const handleTouchMove = (e: React.TouchEvent) => {
  setTouchEnd(e.targetTouches[0].clientX);
};

const handleTouchEnd = () => {
  if (touchStart === null || touchEnd === null) return;

  const distance = touchStart - touchEnd;

  if (distance > 50) {
    nextStudioImage();
  }

  if (distance < -50) {
    previousStudioImage();
  }
};

const handleMouseDown = (e: React.MouseEvent) => {
  setMouseStart(e.clientX);
  setIsDragging(true);
};

const handleMouseUp = (e: React.MouseEvent) => {
  if (!isDragging || mouseStart === null) return;

  const distance = mouseStart - e.clientX;

  if (distance > 50) {
    nextStudioImage();
  }

  if (distance < -50) {
    previousStudioImage();
  }

  setIsDragging(false);
  setMouseStart(null);
};

const handleMouseLeave = () => {
  setIsDragging(false);
  setMouseStart(null);
};

const handleWheel = (e: React.WheelEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (wheelLocked) return;

  // Ignore mostly vertical scrolling
  if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

  // Ignore tiny trackpad movements
  if (Math.abs(e.deltaX) < 20) return;

  setWheelLocked(true);

  if (e.deltaX > 0) {
    nextStudioImage();
  } else {
    previousStudioImage();
  }

  setTimeout(() => {
    setWheelLocked(false);
  }, 500);
};

const handleTrialSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

 

  const formData = new FormData(event.currentTarget);

  const name = formData.get("studentName");
  const age = formData.get("age");
  const phone = formData.get("phone");
  const message = formData.get("message");

 const selectedDays = formData.get("preferredDay");
  const whatsappMessage = `Hi Stringz Music Studio! I would like to book a free trial class.

Student Name: ${name}
Age: ${age}
Phone Number: ${phone}
Instrument: ${selectedInstrument}
Preferred Day: ${selectedDays}
Message: ${message || "None"}`;

  const whatsappUrl = `https://wa.me/917259784221?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};
useEffect(() => {
  if (!studioOpen) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      nextStudioImage();
    }

    if (event.key === "ArrowLeft") {
      previousStudioImage();
    }

    if (event.key === "Escape") {
      setStudioOpen(false);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [studioOpen]);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Content (hidden until loaded to avoid visual jumps) */}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navigation />

        {/* 
          3D Canvas Container Foundation
          This acts as the background for the entire scroll experience.
        */}
        

        {/* Scrollable Content Engine */}
        <div className="relative z-10 flex flex-col">
          <section id="home">
  <Hero />
</section>

          {/* Placeholders for future sections to allow scrolling */}
     <section
  id="guitar"
 className="relative flex h-[110vh] w-full items-center overflow-hidden px-6"
>
{/* GUITAR BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Warm cinematic gradient */}
  <div className="absolute inset-0 bg-[linear-gradient(110deg,#020202_0%,#090603_38%,#211004_72%,#060301_100%)]" />

  {/* Large amber glow behind the guitar */}
  <div className="absolute right-[-5%] top-1/2 h-[720px] w-[950px] -translate-y-1/2 rounded-full bg-amber-600/20 blur-[170px]" />

  {/* Upper warm glow */}
  <div className="absolute right-[14%] top-[8%] h-[420px] w-[520px] rounded-full bg-yellow-500/10 blur-[135px]" />

  {/* Lower golden glow */}
  <div className="absolute bottom-[-150px] right-[4%] h-[320px] w-[760px] rounded-full bg-amber-500/15 blur-[120px]" />

  {/* Left gold LED */}
  <div className="absolute left-[50%] top-1/2 h-[250px] w-[3px] -translate-y-1/2 bg-amber-100 shadow-[0_0_12px_#fef3c7,0_0_28px_#fbbf24,0_0_60px_#d97706]" />

  {/* Right gold LED */}
  <div className="absolute right-[6%] top-1/2 h-[250px] w-[3px] -translate-y-1/2 bg-amber-100 shadow-[0_0_12px_#fef3c7,0_0_28px_#fbbf24,0_0_60px_#d97706]" />

  {/* Contact shadow under guitar */}
  <div className="absolute bottom-[11%] left-[73%] h-[38px] w-[425px] -translate-x-1/2 rounded-full bg-black/60 blur-[30px]" />

  {/* Dark vignette */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_69%_48%,transparent_22%,rgba(0,0,0,0.86)_88%)]" />


</div>
  <div
  className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2"
  data-scroll-section
>
   <div data-scroll-speed="0.25">
     <p className="mb-8 text-base font-semibold tracking-[0.3em] text-yellow-400">
        Guitar
      </p>

     <h2 className="mt-6 whitespace-nowrap text-[4rem] font-bold leading-none tracking-[-0.04em] text-white">
  Craft Your Sound.
</h2>

     <p className="mt-8 mb-0 max-w-2xl text-lg leading-9 text-white/65">
        Master chords, techniques, and songs through personalized guitar lessons designed for every skill level.
      </p>

      <a
        href="#book"
       className="mt-8 inline-flex w-60 items-center justify-center rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/10"
      >
        Start with Guitar →
      </a>
    </div>

  <div
  data-scroll-model
  className="relative h-[560px] w-full overflow-visible lg:h-[650px]"
>
  <Scene />
</div>
  </div>
  <a
  href="#drums"
  aria-label="Scroll to drums"
  className="absolute bottom-[calc(10vh+2rem)] left-1/2 z-20 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xl text-white/70 transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:translate-y-1"
>
  ↓
</a>
</section>
          
         
{/* DRUMS */}
<section
  id="drums"
 className="relative grid h-[110vh] grid-cols-1 items-center overflow-hidden px-8 md:px-16 lg:grid-cols-2 lg:px-24"
>
  {/* Full drums background */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Deep blue base */}
    <div className="absolute inset-0 bg-[linear-gradient(110deg,#020407_0%,#04101f_42%,#071d3b_72%,#020407_100%)]" />

    {/* Top spotlight */}
<div className="absolute left-[70%] top-[-180px] h-[520px] w-[420px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-[110px]" />

    {/* Main blue glow */}
    <div className="absolute right-[-6%] top-1/2 h-[720px] w-[950px] -translate-y-1/2 rounded-full bg-blue-600/20 blur-[170px]" />

    {/* Secondary cyan glow */}
    <div className="absolute right-[12%] top-[18%] h-[420px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />

    {/* Lower atmospheric glow */}
    <div className="absolute bottom-[-160px] right-[4%] h-[320px] w-[760px] rounded-full bg-blue-500/15 blur-[120px]" />

    {/* Left blue LED */}
    <div className="absolute left-[50%] top-1/2 h-[250px] w-[3px] -translate-y-1/2 bg-blue-100 shadow-[0_0_12px_#dbeafe,0_0_28px_#60a5fa,0_0_60px_#2563eb]" />

    {/* Right blue LED */}
    <div className="absolute right-[6%] top-1/2 h-[250px] w-[3px] -translate-y-1/2 bg-blue-100 shadow-[0_0_12px_#dbeafe,0_0_28px_#60a5fa,0_0_60px_#2563eb]" />

   {/* Shadow under drums */}
<div
  className="
    absolute
    bottom-[24%]
    left-[72%]
    -translate-x-1/2
    h-[48px]
    w-[600px]
    rounded-full
    bg-black/55
    blur-[30px]
  "
/>

    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_69%_48%,transparent_22%,rgba(0,0,0,0.86)_88%)]" />
    
  {/* Floor shadow under drums */}

</div>
  

  {/* Text */}
  <div data-scroll-content className="relative z-10 max-w-xl">
   <p className="mb-8 text-base font-semibold tracking-[0.3em] text-yellow-400">
      DRUMS
    </p>

    <h2 className="mt-6 whitespace-nowrap text-[4rem] font-bold leading-none tracking-[-0.04em] text-white">
     Feel the Groove.
    </h2>

    <p className="mt-8 mb-0 max-w-2xl text-lg leading-9 text-white/65">
  Build rhythm, timing, and confidence through energetic drum lessons that keep you inspired every session.
</p>

    <a
      href="#book"
     className="mt-8 inline-flex w-60 items-center justify-center rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/10">
      Start with Drums →
    </a>
  </div>

  {/* Drum model */}
  <div className="relative z-10 h-[520px] w-full overflow-visible lg:h-[620px]">
    <DrumScene />
  </div>
  <a
  href="#keyboard"
  aria-label="Scroll to keyboard"
  className="absolute bottom-[calc(10vh+2rem)] left-1/2 z-20 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xl text-white/70 transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 hover:translate-y-1"
>
  ↓
</a>
</section>

{/* KEYBOARD */}
<section
  id="keyboard"
  className="relative grid h-[110vh] grid-cols-1 items-center overflow-hidden bg-black px-8 md:px-16 lg:grid-cols-2 lg:px-24"
>
  {/* Full cinematic background */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Dark purple base */}
    <div className="absolute inset-0 bg-[linear-gradient(110deg,#020203_0%,#07000d_38%,#150021_68%,#030005_100%)]" />

    {/* Main purple atmosphere */}
    <div className="absolute right-[-5%] top-1/2 h-[720px] w-[950px] -translate-y-1/2 rounded-full bg-purple-700/20 blur-[170px]" />

    {/* Top spotlight beam */}
    <div className="absolute right-[22%] top-[-180px] h-[700px] w-[260px] rotate-[7deg] bg-[linear-gradient(180deg,rgba(216,180,254,0.32)_0%,rgba(168,85,247,0.12)_45%,transparent_100%)] blur-[35px]" />

    {/* Second spotlight beam */}
    <div className="absolute right-[4%] top-[-160px] h-[680px] w-[220px] -rotate-[8deg] bg-[linear-gradient(180deg,rgba(192,132,252,0.22)_0%,rgba(126,34,206,0.10)_48%,transparent_100%)] blur-[40px]" />

    {/* Left fog */}
    <div className="absolute bottom-[8%] left-[34%] h-[180px] w-[500px] rounded-full bg-purple-500/10 blur-[90px]" />

    {/* Right fog */}
    <div className="absolute bottom-[12%] right-[2%] h-[220px] w-[520px] rounded-full bg-violet-400/10 blur-[100px]" />

    {/* Floor glow */}
    <div className="absolute bottom-[-80px] right-[5%] h-[260px] w-[760px] rounded-[50%] bg-purple-500/18 blur-[80px]" />

    {/* Side neon bars */}
    <div className="absolute left-[50%] top-1/2 h-[250px] w-[3px] -translate-y-1/2 bg-violet-200 shadow-[0_0_12px_#e9d5ff,0_0_28px_#c084fc,0_0_60px_#7e22ce]" />

    <div className="absolute right-[6%] top-1/2 h-[250px] w-[3px] -translate-y-1/2 bg-violet-200 shadow-[0_0_12px_#e9d5ff,0_0_28px_#c084fc,0_0_60px_#7e22ce]" />

    {/* Dark vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_48%,transparent_22%,rgba(0,0,0,0.88)_88%)]" />
  </div>

  {/* Text */}
  <div className="relative z-10 order-2 max-w-xl lg:order-1">
    <p className="mb-8 text-base font-semibold tracking-[0.3em] text-yellow-400">
      KEYBOARD
    </p>
<h2 className="mt-6 whitespace-nowrap text-[4rem] font-bold leading-none tracking-[-0.04em] text-white">
     Unlock Every Note.
    </h2>

   <p className="mt-8 mb-0 max-w-2xl text-lg leading-9 text-white/65">
  Learn chords, melody, rhythm, and performance through structured keyboard lessons that grow with you.
</p>

    <a
      href="#book"
     className="mt-5 inline-flex w-60 items-center justify-center rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/10">
      Start with Keyboard →
    </a>
  </div>

  {/* Keyboard stage */}
  <div className="relative z-10 order-1 h-[520px] w-full overflow-visible lg:order-2 lg:h-[620px]">

    {/* Soft shadow under keyboard */}
    <div className="pointer-events-none absolute bottom-[15%] left-1/2 h-[80px] w-[500px] -translate-x-1/2 rounded-[50%] bg-black/80 blur-[30px]" />

    {/* Purple reflection under keyboard */}
    <div className="pointer-events-none absolute bottom-[12%] left-1/2 h-[75px] w-[460px] -translate-x-1/2 rounded-[50%] bg-purple-500/20 blur-[40px]" />

    <div className="relative z-10 h-full">
      <KeyboardScene />
    </div>
  </div>
</section>


{/* WHY STRINGZ */}
<section
  id="why-stringz"
  className="relative w-full overflow-hidden border-t border-white/5 bg-[#070605] px-8 pt-12 pb-10 md:px-16 lg:px-24"
>
  <div
    id="why-stringz-anchor"
    className="absolute -top-10 left-0 h-px w-px"
  />

  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.10),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.06),transparent_30%)]" />

  <div className="relative z-10 mx-auto max-w-7xl">
  <div className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">
      Why Stringz
    </p>

   <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
      Built for players.{" "}
      <span className="text-yellow-400">Not just students.</span>
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-400">
      Learn with structure, perform with confidence, and grow through a musical
      journey designed around your pace.
    </p>
  </div>

    <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          number: "01",
          title: "Trinity Curriculum",
          text: "Follow the internationally recognized Trinity College London syllabus with clear grades and steady progress.",
        },
        {
          number: "02",
          title: "Experienced Instructors",
          text: "Learn from passionate musicians with years of teaching, stage, and performance experience.",
        },
        {
          number: "03",
          title: "Beginner Friendly",
          text: "No experience? No problem. We guide every student from the very first lesson at a comfortable pace.",
        },
        {
          number: "04",
          title: "Performance Focused",
          text: "Build confidence through recitals, jam sessions, recordings, and live stage performances.",
        },
        {
          number: "05",
          title: "8 Sessions Every Month",
          text: "Enjoy eight structured lessons every month to build consistency, confidence, and musical growth.",
        },
        {
          number: "06",
          title: "Classes for All Ages",
          text: "Whether you're a child, teenager, or adult, our lessons are designed for every stage of your musical journey.",
        },
      ].map((item) => (
        <article
          key={item.number}
          className="group rounded-[28px] border border-yellow-500/20 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-yellow-400/50 hover:bg-yellow-400/[0.04]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/40 text-sm font-semibold text-yellow-400">
            {item.number}
          </div>

          <h3 className="mt-5 text-xl font-semibold text-white">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-neutral-400">
            {item.text}
          </p>
        </article>
      ))}
    </div>

   <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-4">
      {[
        ["2025", "Founded"],
        ["3", "Instruments"],
        ["Mon–Sat", "Classes"],
        ["Trinity", "Curriculum"],
      ].map(([value, label]) => (
        <div key={label}>
          <p className="text-3xl font-bold text-white md:text-4xl">
            {value}
          </p>

          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
            {label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section> 

         {/* STUDENT EXPERIENCE */}
<section
  id="experience"
  className="relative flex min-h-[100vh] items-center overflow-hidden border-t border-white/5 bg-[#120c05] px-8 py-10 md:px-16 lg:px-24"
>
  <div
    id="experience-anchor"
    className="absolute -top-10 left-0 h-px w-px"
  />

  {/* BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Dark warm base */}
  <div className="absolute inset-0 bg-[linear-gradient(180deg,#080706_0%,#0d0a07_48%,#100b06_100%)]" />

  {/* Main subtle amber glow behind cards */}
  <div className="absolute bottom-[-210px] left-1/2 h-[500px] w-[950px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

  {/* Very soft warmth in center */}
  <div className="absolute left-1/2 top-[55%] h-[360px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/[0.035] blur-[130px]" />

  {/* Tiny warm atmosphere behind heading */}
  <div className="absolute left-1/2 top-[18%] h-[260px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/[0.025] blur-[140px]" />

  {/* Soft edge darkness */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.68)_100%)]" />

  {/* Bottom stage line */}
  <div className="absolute bottom-0 left-1/2 h-px w-[68%] -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent" />

</div>

  <div className="relative z-10 mx-auto w-full max-w-7xl">
    <div className="mx-auto max-w-5xl text-center">

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">
        Student Experience
      </p>

      <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
        From your first lesson{" "}
        <span className="text-yellow-400">
          to your first performance.
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-neutral-400">
        Every student's journey at Stringz is carefully planned—from your first free
        trial to performing confidently on stage through structured learning and
        consistent practice.
      </p>
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          number: "01",
          title: "Free Trial",
          text: "Visit the studio, meet your instructor, and experience your first lesson before enrolling.",
        },
        {
          number: "02",
          title: "Personal Learning Plan",
          text: "Your instructor creates a learning path based on your age, experience, and musical goals.",
        },
        {
          number: "03",
          title: "Weekly Lessons",
          text: "Attend structured weekly classes that steadily build technique, confidence, and musical skills.",
        },
        {
          number: "04",
          title: "Perform",
          text: "Showcase your progress through recitals, recordings, jam sessions, and live performances.",
        },
      ].map((step) => (
        <article
          key={step.number}
          className="group rounded-[28px] border border-yellow-500/25 bg-black/25 p-6 backdrop-blur-[2px] transition duration-300 hover:-translate-y-2 hover:border-yellow-400/55 hover:bg-yellow-400/[0.055] hover:shadow-[0_18px_60px_rgba(245,158,11,0.10)]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/45 bg-black/10 text-sm font-semibold text-yellow-400">
            {step.number}
          </div>

          <h3 className="mt-5 text-xl font-semibold text-white">
            {step.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-neutral-400">
            {step.text}
          </p>
        </article>
      ))}
    </div>
  </div>
</section>

{/* GALLERY */}
<section
  id="gallery"
  className="relative overflow-hidden border-t border-white/5 bg-[#050505] px-8 py-16 md:px-16 lg:px-24"
>
 {/* GALLERY BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Deep charcoal base */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(180deg, #050505 0%, #090704 45%, #050505 100%)",
    }}
  />

  {/* MAIN WARM STUDIO SPOTLIGHT */}
  <div
    className="absolute left-1/2 top-[-170px] h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-[115px]"
    style={{
      background:
        "radial-gradient(circle, rgba(255,190,70,0.20) 0%, rgba(190,115,25,0.09) 35%, rgba(100,55,10,0.03) 55%, transparent 75%)",
    }}
  />

  {/* LEFT SOFT SPOTLIGHT */}
  <div
    className="absolute left-[8%] top-[-120px] h-[500px] w-[280px] rotate-[8deg] blur-[75px]"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,200,100,0.12) 0%, rgba(190,120,35,0.05) 45%, transparent 88%)",
    }}
  />

  {/* RIGHT SOFT SPOTLIGHT */}
  <div
    className="absolute right-[7%] top-[-120px] h-[500px] w-[280px] -rotate-[8deg] blur-[75px]"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,200,100,0.12) 0%, rgba(190,120,35,0.05) 45%, transparent 88%)",
    }}
  />

  {/* WARMTH BEHIND GALLERY CARDS */}
  <div
    className="absolute left-1/2 top-[48%] h-[420px] w-[950px] -translate-x-1/2 rounded-full blur-[170px]"
    style={{
      background:
        "radial-gradient(circle, rgba(155,90,20,0.07) 0%, transparent 70%)",
    }}
  />

  {/* VERY SUBTLE FLOOR GLOW */}
  <div
    className="absolute bottom-[-120px] left-1/2 h-[260px] w-[900px] -translate-x-1/2 rounded-full blur-[100px]"
    style={{
      background:
        "radial-gradient(ellipse, rgba(220,145,35,0.08) 0%, transparent 68%)",
    }}
  />

  {/* LIGHT TEXTURE */}
  <div
    className="absolute inset-0 opacity-[0.09]"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,210,120,0.25) 1px, transparent 1px)",
      backgroundSize: "42px 42px",
    }}
  />

  {/* EDGE VIGNETTE */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0.80) 100%)",
    }}
  />

  {/* TOP + BOTTOM FADE */}
  <div className="absolute inset-x-0 top-0 h-[110px] bg-gradient-to-b from-black/55 to-transparent" />

  <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/65 to-transparent" />
</div>

  <div className="relative z-10 mx-auto max-w-6xl">

    {/* Heading */}
    <div className="text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
        Gallery
      </p>

      <h2 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-white md:text-5xl">
        Moments at <span className="text-yellow-400">Stringz.</span>
      </h2>

      <p className="mx-auto mt-3 text-base leading-7 text-neutral-400">
        A look inside our lessons, instruments, and the students who make the
        studio come alive.
      </p>
    </div>

    {/* STACKED GALLERY CARDS */}
    <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2">

      {[
        {
          title: "Studio",
          type: "studio",
          number: "01",
          count: 7,
          images: [
            "/images/Gallery/Studio/studio-1.jpg",
            "/images/Gallery/Studio/studio-2.jpg",
            "/images/Gallery/Studio/studio-3.jpg",
          ],
        },

        {
          title: "Guitar",
          type: "guitar",
          number: "02",
          count: 5,
          images: [
            "/images/Gallery/Guitar/guitar-1.jpg",
            "/images/Gallery/Guitar/guitar-2.jpg",
            "/images/Gallery/Guitar/guitar-5.jpg",
          ],
        },

        {
          title: "Drums",
          type: "drums",
          number: "03",
          count: 6,
          images: [
            "/images/Gallery/Drums/drums-2.jpg",
            "/images/Gallery/Drums/drums-1.jpg",
            "/images/Gallery/Drums/drums-3.jpg",
          ],
        },

        {
          title: "Keyboard",
          type: "keyboard",
          number: "04",
          count: 9,
          images: [
            "/images/Gallery/Keyboard/keyboard-1.jpg",
            "/images/Gallery/Keyboard/keyboard-2.jpg",
            "/images/Gallery/Keyboard/keyboard-3.jpg",
          ],
        },
      ].map((item) => (

        <div
          key={item.title}
          onClick={() => {
            setGalleryType(
              item.type as "studio" | "guitar" | "drums" | "keyboard"
            );
            setGalleryIndex(0);
            setStudioOpen(true);
          }}
          className="group relative h-[330px] cursor-pointer"
        >

          {/* BACK PHOTO 1 */}
          <div className="absolute inset-x-8 top-4 h-[285px] rotate-[-3deg] overflow-hidden rounded-[26px] border border-white/15 bg-black transition-all duration-500 group-hover:-translate-x-5 group-hover:-rotate-[6deg] group-hover:border-yellow-400/30">
            <img
              src={item.images[1]}
              alt=""
              className="h-full w-full object-cover opacity-55"
            />
          </div>

          {/* BACK PHOTO 2 */}
          <div className="absolute inset-x-8 top-4 h-[285px] rotate-[3deg] overflow-hidden rounded-[26px] border border-white/15 bg-black transition-all duration-500 group-hover:translate-x-5 group-hover:rotate-[6deg] group-hover:border-yellow-400/30">
            <img
              src={item.images[2]}
              alt=""
              className="h-full w-full object-cover opacity-55"
            />
          </div>

          {/* MAIN CARD */}
          <div className="absolute inset-x-4 top-5 overflow-hidden rounded-[26px] border border-white/10 bg-[#0a0908] shadow-2xl shadow-black/40 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-yellow-400/50 group-hover:shadow-yellow-400/10">

            {/* IMAGE */}
            <div className="relative h-[205px] overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              />

              {/* Image gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

              {/* Number badge */}
              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold tracking-[0.2em] text-white backdrop-blur-md">
                {item.number}
              </div>

              {/* Count badge */}
              <div className="absolute right-5 top-5 rounded-full border border-yellow-400/30 bg-black/60 px-3 py-1.5 text-xs font-medium text-yellow-400 backdrop-blur-md">
                {item.count} moments
              </div>
            </div>

            {/* INFO */}
            <div className="flex items-end justify-between px-6 py-5 text-left">

              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-neutral-500 transition-colors duration-300 group-hover:text-yellow-400">
                  Click to view gallery →
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-yellow-400/40 group-hover:bg-yellow-400 group-hover:text-black">
                →
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



       {/* REVIEWS */}
<section
  id="reviews"
 className="relative min-h-[calc(100vh-68px)] overflow-hidden border-t border-white/5 bg-black px-8 py-12 md:px-16 lg:px-24"
>
 {/* PREMIUM REVIEW BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Warm charcoal base */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(180deg, #050505 0%, #0b0804 48%, #050505 100%)",
    }}
  />

  {/* LARGE CENTRAL GOLDEN BLOOM */}
  <div
    className="absolute left-1/2 top-[36%] h-[650px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
    style={{
      background:
        "radial-gradient(ellipse, rgba(205,135,35,0.16) 0%, rgba(135,75,15,0.075) 38%, transparent 72%)",
    }}
  />

  {/* LEFT OVERHEAD SPOTLIGHT */}
  <div
    className="absolute left-[27%] top-[-190px] h-[600px] w-[260px] rotate-[5deg] blur-[75px]"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,210,115,0.16) 0%, rgba(200,125,30,0.065) 45%, transparent 88%)",
    }}
  />

  {/* RIGHT OVERHEAD SPOTLIGHT */}
  <div
    className="absolute right-[25%] top-[-190px] h-[600px] w-[260px] -rotate-[5deg] blur-[75px]"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,210,115,0.13) 0%, rgba(200,125,30,0.05) 45%, transparent 88%)",
    }}
  />

  {/* GLOW DIRECTLY BEHIND REVIEW CARDS */}
  <div
    className="absolute bottom-[7%] left-1/2 h-[330px] w-[1050px] -translate-x-1/2 rounded-full blur-[150px]"
    style={{
      background:
        "radial-gradient(ellipse, rgba(180,105,20,0.09) 0%, transparent 70%)",
    }}
  />

  {/* SUBTLE GOLD DUST */}
  <div
    className="absolute inset-0 opacity-[0.10]"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,205,90,0.32) 1px, transparent 1px)",
      backgroundSize: "58px 58px",
    }}
  />

  {/* DARK EDGE VIGNETTE */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.30) 62%, rgba(0,0,0,0.82) 100%)",
    }}
  />

  {/* TOP TRANSITION */}
  <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-black/50 to-transparent" />

  {/* BOTTOM TRANSITION */}
  <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-black/55 to-transparent" />

</div>

  <div className="relative z-10 mx-auto max-w-7xl">
    <div className="grid items-center gap-5 lg:grid-cols-[220px_1fr_220px]">

      {/* LEFT RATING */}
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-center">
        <p className="text-5xl font-semibold text-yellow-400">
          5.0★
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
          Google Rated
        </p>
      </div>

      {/* CENTER HEADING */}
      <div className="text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
          Reviews
        </p>

        <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-white md:text-4xl">
          Loved by{" "}
          <span className="text-yellow-400">
            students & parents.
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-neutral-400">
          Real experiences from students and families who have been part of the
          Stringz journey.
        </p>
      </div>

      {/* RIGHT REVIEW COUNT */}
      <a
        href="https://www.google.com/search?q=Stringz+Music+Studio#lrd=0x3bae1112b53a5b1d:0x6cd9339f14c03bff,1"
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06] hover:shadow-[0_0_30px_rgba(250,204,21,0.10)]"
      >
        <p className="text-5xl font-semibold text-yellow-400">
          100+
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
          Google Reviews
        </p>

        <p className="mt-2 text-xs font-semibold text-yellow-400 opacity-70 transition group-hover:opacity-100">
          View on Google ↗
        </p>
      </a>
    </div>

    {/* REVIEW CARDS */}
    <div className="mx-auto mt-7 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
      {[
        {
          quote:
            "My kid is going for Guitar classes and its a pretty awesome place with a great vibe. The newly opened Studio is very lively and special mention of Guitar Sir Srikanth for his patience and teaching very nicely and he is very flexible",
          name: "Viswam Srinivasan",
          role: "7 months ago",
        },
        {
          quote:
            "My daughter is learning guitar in Stringz for more than a year now. Best in guitar education with highly dedicated faculty. The environment at Stringz is always exciting for the students. My daughter thoroughly enjoys her time at Stringz and we are seeing her growth with guitar. Awesome place, awesome teachers.",
          name: "Amita Sahoo",
          role: "3 years ago",
        },
        {
          quote:
            "Very professional and knowledgeable instructors. They pay attention to each student and make sure everyone feels comfortable. Learning music is fun @Stringz. I would highly recommend if you want to actually enjoy learning Guitar, Keyboard or Drum.",
          name: "Raviraj Shetty",
          role: "10 months ago",
        },
        {
          quote:
            "Five years here and I'm still learning. Great environment and I've stuck with the instrument longer than I ever thought possible.",
          name: "Nishanth Tangirala",
          role: "a month ago",
        },
      ].map((review) => (
        <article
          key={`${review.name}-${review.role}`}
          className="flex min-h-[285px] flex-col rounded-[20px] border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400/30 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]"
        >
          <p className="text-2xl text-yellow-400">
            ★★★★★
          </p>

          <p className="mt-3 text-sm leading-6 text-neutral-300">
            “{review.quote}”
          </p>

          <div className="mt-auto border-t border-white/10 pt-3">
            <p className="text-sm font-semibold text-yellow-300">
              {review.name}
            </p>

            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-neutral-500">
              {review.role}
            </p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

        {/* VISIT US */}
<section
  id="visit"
  className="relative overflow-hidden border-t border-white/5 bg-[#070605] px-8 py-6 md:px-16 lg:px-24"
>
  {/* VISIT BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Deep warm base */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(180deg, #050504 0%, #090805 50%, #050504 100%)",
    }}
  />

  {/* MAIN WARM GLOW FROM UPPER CENTER */}
  <div
    className="absolute left-[48%] top-[-170px] h-[650px] w-[700px] -translate-x-1/2 rounded-full blur-[145px]"
    style={{
      background:
        "radial-gradient(circle, rgba(212,150,45,0.17) 0%, rgba(135,85,20,0.07) 40%, transparent 72%)",
    }}
  />

  {/* LEFT AMBIENT WARMTH BEHIND INFO CARD */}
  <div
    className="absolute left-[8%] top-[38%] h-[480px] w-[520px] rounded-full blur-[170px]"
    style={{
      background:
        "radial-gradient(circle, rgba(160,100,25,0.09) 0%, transparent 72%)",
    }}
  />

  {/* RIGHT SOFT GLOW BEHIND MAP */}
  <div
    className="absolute right-[3%] top-[35%] h-[470px] w-[620px] rounded-full blur-[180px]"
    style={{
      background:
        "radial-gradient(circle, rgba(125,90,30,0.065) 0%, transparent 72%)",
    }}
  />

  {/* SUBTLE DIAGONAL LIGHT WASH */}
  <div
    className="absolute left-[32%] top-[-15%] h-[680px] w-[260px] rotate-[20deg] blur-[95px]"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,205,100,0.09) 0%, rgba(180,120,35,0.035) 50%, transparent 90%)",
    }}
  />

  {/* VERY SUBTLE TEXTURE */}
  <div
    className="absolute inset-0 opacity-[0.08]"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,210,120,0.22) 1px, transparent 1px)",
      backgroundSize: "54px 54px",
    }}
  />

  {/* EDGE VIGNETTE */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.38) 70%, rgba(0,0,0,0.82) 100%)",
    }}
  />

  {/* TOP + BOTTOM FADE */}
  <div className="absolute inset-x-0 top-0 h-[95px] bg-gradient-to-b from-black/45 to-transparent" />

  <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/50 to-transparent" />

</div>
  <div className="relative z-10 mx-auto max-w-7xl">

    {/* HEADING */}
    <div className="mx-auto max-w-4xl text-center">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
        Visit Stringz
      </p>

      <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-white md:text-4xl">
        Learn. Play.{" "}
        <span className="text-yellow-400">Grow with us.</span>
      </h2>

      <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-neutral-400 md:text-base">
        Visit Stringz Music Studio in Kalkere, Bengaluru, and experience a
        welcoming space built for focused learning and confident performance.
      </p>
    </div>

    {/* CONTENT */}
    <div className="mt-5 grid items-stretch gap-6 lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="h-full">
        <div className="h-full overflow-hidden rounded-[24px] border border-yellow-500/20 bg-white/[0.025]">

          {/* ADDRESS */}
          <div className="p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Address
            </p>

            <p className="mt-2 text-sm leading-6 text-white md:text-base">
              1st Cross, K Channasandra Main Road, next to Capital Glass,
              Sanjeevappa Garden, Kalkere, Bengaluru, Karnataka 560113
            </p>

            <a
              href="https://maps.app.goo.gl/dyEW2WgtLfsUFR5f6"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
            >
              Get Directions →
            </a>
          </div>

          <div className="mx-4 border-t border-white/10" />

          {/* HOURS */}
          <div className="p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Hours
            </p>

            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between gap-6">
                <span className="text-sm text-neutral-400">Mon – Fri</span>
                <span className="text-sm font-medium text-white">
                  4:00 PM – 9:00 PM
                </span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <span className="text-sm text-neutral-400">Saturday</span>
                <span className="text-sm font-medium text-white">
                  11:00 AM – 7:30 PM
                </span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <span className="text-sm text-neutral-400">Sunday</span>
                <span className="text-sm font-medium text-yellow-400">
                  Closed
                </span>
              </div>
            </div>
          </div>

          <div className="mx-4 border-t border-white/10" />

          {/* CONTACT */}
          <div className="p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Contact
            </p>

            <div className="mt-2 space-y-2">

              {/* SRIKANTH */}
              <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                    Srikanth
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white">
                    +91 90085 44221
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href="tel:+919008544221"
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400"
                  >
                    Call
                  </a>

                  <a
                    href={`https://wa.me/919008544221?text=${encodeURIComponent(
                      "Hi, I’m interested in joining Stringz Music Studio. Please share more details about the classes."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-yellow-300"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* STRINGZ */}
              <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                    Stringz Music Studio
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white">
                    +91 72597 84221
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href="tel:+917259784221"
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400"
                  >
                    Call
                  </a>

                  <a
                    href={`https://wa.me/917259784221?text=${encodeURIComponent(
                      "Hi, I’m interested in joining Stringz Music Studio. Please share more details about the classes."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-yellow-300"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE — GOOGLE MAP */}
      <div className="h-full">
        <div className="h-full w-full overflow-hidden rounded-[24px] border border-yellow-500/20 bg-white/[0.02]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15547.1163787942!2d77.66506545!3d13.04972855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bae1112b53a5b1d%3A0x6cd9339f14c03bff!2sStringz%20Music%20Studio%2C%201st%20Cross%2C%20K%20Channasandra%20Main%20Rd%2C%20next%20to%20Capital%20Glass%2C%20Sanjeevappa%20Garden%2C%20Kalkere%2C%20Bengaluru%2C%20Karnataka%20560113!3m2!1d13.0404732!2d77.6771534!5e0!3m2!1sen!2sin!4v1785229653302!5m2!1sen!2sin"
            className="h-full min-h-[405px] w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Stringz Music Studio Location"
          />
        </div>
      </div>

    </div>
  </div>
</section>
{/* BOOK FREE TRIAL */}
<section
  id="book"
  className="relative overflow-hidden border-t border-white/5 bg-[#070605] px-8 py-7 md:px-16 lg:px-24"
>
  {/* BOOK FREE TRIAL BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Deep warm base */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(180deg, #070604 0%, #0d0904 48%, #050403 100%)",
    }}
  />

  {/* MAIN GOLDEN SPOTLIGHT */}
  <div
    className="absolute left-1/2 top-[-220px] h-[700px] w-[760px] -translate-x-1/2 rounded-full blur-[135px]"
    style={{
      background:
        "radial-gradient(circle, rgba(255,185,55,0.24) 0%, rgba(195,115,20,0.11) 38%, rgba(120,65,10,0.04) 58%, transparent 75%)",
    }}
  />

  {/* LIGHT BEAM FROM ABOVE */}
  <div
    className="absolute left-1/2 top-[-180px] h-[580px] w-[280px] -translate-x-1/2 blur-[80px]"
    style={{
      background:
        "linear-gradient(180deg, rgba(255,215,125,0.17) 0%, rgba(220,145,40,0.07) 48%, transparent 90%)",
    }}
  />

  {/* WIDE AMBER GLOW BEHIND FORM */}
  <div
    className="absolute bottom-[-80px] left-1/2 h-[430px] w-[1200px] -translate-x-1/2 rounded-full blur-[170px]"
    style={{
      background:
        "radial-gradient(ellipse, rgba(190,105,15,0.13) 0%, rgba(120,65,10,0.045) 45%, transparent 72%)",
    }}
  />

  {/* LEFT AMBIENT GLOW */}
  <div
    className="absolute -left-[180px] top-[20%] h-[500px] w-[500px] rounded-full blur-[170px]"
    style={{
      background:
        "radial-gradient(circle, rgba(170,95,15,0.07) 0%, transparent 70%)",
    }}
  />

  {/* RIGHT AMBIENT GLOW */}
  <div
    className="absolute -right-[180px] top-[20%] h-[500px] w-[500px] rounded-full blur-[170px]"
    style={{
      background:
        "radial-gradient(circle, rgba(170,95,15,0.07) 0%, transparent 70%)",
    }}
  />

  {/* SUBTLE GOLD DUST */}
  <div
    className="absolute inset-0 opacity-[0.10]"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,205,100,0.30) 1px, transparent 1px)",
      backgroundSize: "55px 55px",
    }}
  />

  {/* VIGNETTE */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.30) 68%, rgba(0,0,0,0.76) 100%)",
    }}
  />

  {/* BOTTOM FADE INTO FOOTER */}
  <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/75 to-transparent" />

</div>
  <div className="relative z-10 mx-auto max-w-5xl">

    {/* HEADING */}
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
        Book Free Trial
      </p>

      <h2 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-4xl">
        Your first lesson is
        <span className="text-yellow-400"> on us.</span>
      </h2>

      <p className="mt-2 text-sm text-neutral-400">
        Fill this in and we&apos;ll confirm your slot on WhatsApp within a few
        hours.
      </p>
    </div>

    {/* FORM */}
    <form
      onSubmit={handleTrialSubmit}
      className="mt-5 rounded-[24px] border border-yellow-500/20 bg-[#0b0906]/75 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-6"
    >
      {/* NAME + AGE */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* STUDENT NAME */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-neutral-400">
            Student Name
          </label>

          <input
            type="text"
            name="studentName"
            required
            placeholder="Your full name"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-yellow-400/60"
          />
        </div>

        {/* AGE */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-neutral-400">
            Age
          </label>

          <input
            type="number"
            name="age"
            required
            placeholder="e.g. 14"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-yellow-400/60"
          />
        </div>
      </div>

      {/* PHONE NUMBER */}
      <div className="mt-3">
        <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-neutral-400">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          required
          placeholder="+91 ..."
          className="w-full rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-yellow-400/60"
        />
      </div>

      {/* INSTRUMENT + PREFERRED DAY */}
      <div className="mt-3 grid gap-4 md:grid-cols-2">

        {/* INSTRUMENT */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-neutral-400">
            Instrument
          </label>

          <select
            value={selectedInstrument}
            onChange={(e) => setSelectedInstrument(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#151311] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
          >
            <option>Guitar</option>
            <option>Drums</option>
            <option>Keyboard</option>
          </select>
        </div>

        {/* PREFERRED DAY */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-neutral-400">
            Preferred Day
          </label>

          <select
            name="preferredDay"
            className="w-full rounded-2xl border border-white/10 bg-[#151311] px-4 py-3 text-white outline-none transition focus:border-yellow-400/60"
            defaultValue="Monday"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </div>
      </div>

      {/* MESSAGE */}
      <div className="mt-3">
        <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-neutral-400">
          Message
        </label>

        <textarea
          name="message"
          rows={2}
          placeholder="Anything we should know?"
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 focus:border-yellow-400/60"
        />
      </div>

      {/* SUBMIT */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-neutral-500">
          By submitting, you agree to be contacted on WhatsApp.
        </p>

        <button
          type="submit"
          className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          Send via WhatsApp →
        </button>
      </div>
    </form>
  </div>
</section>
    </div>
  </div>
  <footer className="relative overflow-hidden border-t border-white/10 bg-black">
  {/* FOOTER BACKGROUND */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Pure black base */}
  <div className="absolute inset-0 bg-black" />

  {/* Soft glow carrying over from Book Free Trial */}
  <div
    className="absolute left-1/2 top-[-240px] h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[150px]"
    style={{
      background:
        "radial-gradient(ellipse, rgba(205,125,25,0.11) 0%, rgba(120,70,15,0.045) 42%, transparent 72%)",
    }}
  />

  {/* Very faint left warmth */}
  <div
    className="absolute -left-[160px] top-[18%] h-[420px] w-[420px] rounded-full blur-[170px]"
    style={{
      background:
        "radial-gradient(circle, rgba(150,85,20,0.045) 0%, transparent 72%)",
    }}
  />

  {/* Very faint right warmth */}
  <div
    className="absolute -right-[160px] top-[18%] h-[420px] w-[420px] rounded-full blur-[170px]"
    style={{
      background:
        "radial-gradient(circle, rgba(150,85,20,0.045) 0%, transparent 72%)",
    }}
  />

  {/* Tiny texture */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,205,100,0.22) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />

  {/* Fade fully to black toward bottom */}
  <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/90 to-transparent" />

  {/* Vignette */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0.92) 100%)",
    }}
  />
</div>
  <div className="relative z-10 mx-auto max-w-7xl px-8 py-16 md:px-16 lg:px-24">

    <div className="grid gap-12 md:grid-cols-4">

      {/* Brand */}
      <div>
       <h3 className="text-2xl font-bold text-yellow-400">
  Stringz
</h3>

<p className="mt-1 text-xs uppercase tracking-[0.35em] text-white/50">
  Music Studio LLP
</p>

<p className="mt-5 text-neutral-400 leading-7">
  Professional Guitar, Drum and Keyboard lessons in Bengaluru.
</p>

<p className="mt-4 text-xs uppercase tracking-[0.4em] text-yellow-400/80">
  STRUM • DRUM • KEY
</p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="mb-5 text-white font-semibold">
          Quick Links
        </h4>

        <ul className="space-y-3 text-neutral-400">
          <li><a href="#home" className="hover:text-yellow-400">Home</a></li>
          <li><a href="#guitar" className="hover:text-yellow-400">Guitar</a></li>
          <li><a href="#drums" className="hover:text-yellow-400">Drums</a></li>
          <li><a href="#keyboard" className="hover:text-yellow-400">Keyboard</a></li>
          <li><a href="#gallery" className="hover:text-yellow-400">Gallery</a></li>
          <li><a href="#visit" className="hover:text-yellow-400">Visit</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="mb-5 text-white font-semibold">
          Contact
        </h4>
        <a
  href="tel:+917259784221"
  className="block text-neutral-400 transition hover:text-yellow-400"
>
  +91 72597 84221
</a>

<a
  href="tel:+919008544221"
  className="block text-neutral-400 transition hover:text-yellow-400"
>
  +91 90085 44221
</a>

<a
  href="mailto:stringzmusicstudio@gmail.com"
  className="mt-2 block text-neutral-400 transition hover:text-yellow-400"
>
  stringzmusicstudio@gmail.com
</a>

        

        <p className="mt-2 text-neutral-400">
          Bengaluru, Karnataka
        </p>
      </div>

      {/* Social */}
      <div>
        <h4 className="mb-5 text-white font-semibold">
          Connect 
        </h4>

        <div className="space-y-3">
          <a href="https://www.instagram.com/stringz.music.studio/"
target="_blank"
rel="noreferrer" className="block text-neutral-400 hover:text-yellow-400">
            Instagram
          </a>

          <a href="https://www.facebook.com/100095015471247"
target="_blank"
rel="noreferrer" className="block text-neutral-400 hover:text-yellow-400">
            Facebook
          </a>

          <a href="https://whatsapp.com/channel/0029Vb8XHtG30LKNFN6Xr61F"
target="_blank"
rel="noreferrer" className="block text-neutral-400 hover:text-yellow-400">
            WhatsApp
          </a>
        </div>
      </div>

    </div>

    <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-sm text-neutral-500">
     <p>
  © 2026 Stringz Music Studio LLP. All rights reserved.
</p>

      <p>Registered LLP • Founded in 2025 • Bengaluru</p>
    </div>

  </div>
</footer>
<FloatingSocialDock />
{studioOpen && (
 <div
  onClick={(e) => {
  if (e.target === e.currentTarget) {
    setStudioOpen(false);
  }
}}
  className="fixed inset-0 z-[999] flex items-center justify-center overscroll-x-none bg-black/90 px-4 backdrop-blur-sm"
>

    {/* Close */}
    <button
      onClick={() => setStudioOpen(false)}
      className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-white transition hover:bg-white/10"
      aria-label="Close gallery"
    >
      ×
    </button>

    {/* Counter */}
    <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm font-medium text-white">
      {galleryIndex + 1} / {activeMedia.length}
    </div>

    {/* Previous */}
    <button
     onClick={previousStudioImage}
      className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-3xl text-white transition hover:bg-white/10"
      aria-label="Previous image"
    >
      ‹
    </button>

    {/* Image */}
   <div
    onClick={(e) => e.stopPropagation()}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  onMouseDown={handleMouseDown}
onMouseUp={handleMouseUp}
onMouseLeave={handleMouseLeave}
onWheel={handleWheel}
  className="relative flex max-h-[82vh] max-w-[88vw] cursor-grab select-none items-center justify-center overflow-hidden overscroll-x-none rounded-[24px] border border-white/10 bg-black shadow-2xl active:cursor-grabbing"
>
    {activeMedia[galleryIndex].type === "video" ? (
 <video
  key={activeMedia[galleryIndex].src}
  src={activeMedia[galleryIndex].src}
  controls
  autoPlay
  playsInline
  className="max-h-[82vh] max-w-[88vw] object-contain"
/>
) : (
  <img
    src={activeMedia[galleryIndex].src}
    alt={`${galleryType} ${galleryIndex + 1}`}
    draggable={false}
    onDragStart={(e) => e.preventDefault()}
    className="max-h-[82vh] max-w-[88vw] select-none object-contain"
  />
)}
    </div>
    <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2">
  {activeMedia.map((_, index) => (
    <button
      key={index}
      onClick={() => setGalleryIndex(index)}
      aria-label={`Go to image ${index + 1}`}
      className={`rounded-full transition-all duration-300 ${
        galleryIndex === index
          ? "h-2.5 w-6 bg-yellow-400"
          : "h-2.5 w-2.5 bg-white/30 hover:bg-white/60"
      }`}
    />
  ))}
</div>
   
    {/* Next */}
    <button
      onClick={nextStudioImage}
      className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-3xl text-white transition hover:bg-white/10"
      aria-label="Next image"
    >
      ›
    </button>

  </div>
)}
</main>
);
}
