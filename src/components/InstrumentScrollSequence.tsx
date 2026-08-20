"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InstrumentScrollSequence() {
  useEffect(() => {
  const ctx = gsap.context(() => {
    const content = document.querySelector("[data-scroll-content]");
    const model = document.querySelector("[data-scroll-model]");
    const guitar = document.querySelector("#guitar");

    if (!content || !model || !guitar) return;

    gsap.fromTo(
      content,
      {
        y: 120,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: guitar,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      model,
      {
        y: 180,
        scale: 0.85,
        opacity: 0,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: guitar,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );
  });

  return () => ctx.revert();
}, []);

  return null;
}