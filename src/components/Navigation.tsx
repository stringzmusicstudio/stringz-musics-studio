"use client";
import Image from "next/image";
import { useEffect, useState } from "react";



const navLinks = [
  { name: "Guitar", href: "#guitar" },
  { name: "Drums", href: "#drums" },
  { name: "Keyboard", href: "#keyboard" },
  { name: "Why Stringz", href: "#why-stringz-anchor" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Visit", href: "#visit" },
];

export default function Navigation() {
  
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const handleScrollTo = (
  event: React.MouseEvent<HTMLAnchorElement>,
  target: string
) => {
  event.preventDefault();
  setMenuOpen(false);

  const element = document.querySelector(target);
  if (!element) return;

  const navbar = document.querySelector("nav");
  const navbarHeight = navbar?.getBoundingClientRect().height ?? 64;

  // Full-screen sections should NOT be pushed down
  const fullScreenSections = [
    "#home",
    "#guitar",
    "#drums",
    "#keyboard",
  ];

  // Special anchors already handle their own positioning
const customAnchors = [
  "#why-stringz-anchor",
  "#experience-anchor",
  "#gallery",
  "#reviews",
  "#visit",
  "#book",
];
  let offset = navbarHeight;

  if (
    fullScreenSections.includes(target) ||
    customAnchors.includes(target)
  ) {
    offset = 0;
  }

  const elementTop =
    element.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top: elementTop,
    behavior: "smooth",
  });

  window.history.replaceState(null, "", target);
};

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
  ? "border-white/10 bg-black/85 py-2 shadow-xl shadow-black/30 backdrop-blur-xl"
  : "border-transparent bg-black/45 py-3 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href="#home"
          onClick={(event) => handleScrollTo(event, "#home")}
          className="flex items-center gap-3"
        >
         <img
  src="/images/logo.jpg"
  alt=""
  className="h-10 w-10 shrink-0 rounded-lg object-cover"
/>



          <span className="text-lg font-semibold tracking-tight text-gold">
  Stringz Music Studio
</span>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
  {navLinks.map((link) =>
    link.name === "Why Stringz" ? (
      <div key={link.name} className="group relative">
        <a
          href={link.href}
          onClick={(event) => handleScrollTo(event, link.href)}
          className="flex items-center gap-1 text-sm font-medium text-white/65 transition-colors hover:text-white"
        >
          Why Stringz

          <svg
            className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m6 9 6 6 6-6"
            />
          </svg>
        </a>

        {/* Dropdown */}
        <div className="invisible absolute left-1/2 top-full z-50 w-44 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="rounded-lg border border-yellow-500/20 bg-black/95 p-1.5 shadow-xl shadow-black/40 backdrop-blur-xl">
            <a
             href="#experience-anchor"
onClick={(event) => handleScrollTo(event, "#experience-anchor")}
             className="block rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-all hover:bg-yellow-400/10 hover:text-yellow-400"
            >
              Student Experience
            </a>
          </div>
        </div>
      </div>
    ) : (
      <a
        key={link.name}
        href={link.href}
        onClick={(event) => handleScrollTo(event, link.href)}
        className="text-sm font-medium text-white/65 transition-colors hover:text-white"
      >
        {link.name}
      </a>
    )
  )}
</div>

        <a
          href="#book"
          onClick={(event) => handleScrollTo(event, "#book")}
         className="hidden rounded-md bg-gold px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition-transform hover:scale-[1.03] lg:inline-flex"
        >
          Book Free Trial
        </a>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((current) => !current)}
          className="rounded-lg border border-white/15 p-2 text-white lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

     {menuOpen && (
  <div className="mx-5 mt-4 rounded-2xl border border-white/10 bg-black/95 p-5 backdrop-blur-xl lg:hidden">
    <div className="flex flex-col gap-4">
      {navLinks.map((link) => (
        <div key={link.name}>
          <a
            href={link.href}
            onClick={(event) => handleScrollTo(event, link.href)}
            className="text-sm font-medium text-white/75"
          >
            {link.name}
          </a>

          {link.name === "Why Stringz" && (
            <a
              href="#experience-anchor"
              onClick={(event) =>
                handleScrollTo(event, "#experience-anchor")
              }
              className="mt-3 block pl-4 text-sm font-medium text-yellow-400/85"
            >
              Student Experience
            </a>
          )}
        </div>
      ))}

      <a
        href="#book"
        onClick={(event) => handleScrollTo(event, "#book")}
        className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-black"
      >
        Book Free Trial
      </a>
    </div>
  </div>
)}
    </nav>
  );
}
