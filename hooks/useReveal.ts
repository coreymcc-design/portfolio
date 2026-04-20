"use client";
import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the given ref's children
 * that have the `.reveal` class, adding `.visible` when they enter view.
 */
export function useReveal(threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  return containerRef;
}
