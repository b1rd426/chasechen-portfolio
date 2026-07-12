"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const interactionQuery = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );

    if (!spotlight || motionQuery.matches || !interactionQuery.matches) {
      return;
    }

    let frame = 0;

    const moveSpotlight = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        spotlight.style.opacity = "1";
        spotlight.style.transform = `translate3d(${event.clientX - 160}px, ${
          event.clientY - 160
        }px, 0)`;
      });
    };

    const hideSpotlight = () => {
      spotlight.style.opacity = "0";
    };

    window.addEventListener("pointermove", moveSpotlight, { passive: true });
    window.addEventListener("pointerleave", hideSpotlight);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveSpotlight);
      window.removeEventListener("pointerleave", hideSpotlight);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.2),rgba(168,85,247,0.08)_38%,transparent_70%)] opacity-0 blur-2xl transition-opacity duration-300 will-change-transform md:block"
    />
  );
}
