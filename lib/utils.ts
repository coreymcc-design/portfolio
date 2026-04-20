import { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  // Simple class merger — install clsx if desired, otherwise stringify
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ");
}

/**
 * Returns true if motion should be reduced — either because the OS setting
 * is on (`prefers-reduced-motion: reduce`) or the user has flipped the
 * in-app accessibility toggle, which applies `.reduce-motion` on <html>.
 */
function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return document.documentElement.classList.contains("reduce-motion");
}

/**
 * Smoothly scroll a section into view by ID.
 *
 * Uses a custom rAF-driven easing curve so we can tune duration and feel
 * independently of the browser's default smooth-scroll (which is typically
 * too quick). Animation is longer and eases out for a more considered feel.
 *
 * Respects prefers-reduced-motion and the in-app reduce-motion toggle:
 * jumps instantly in those cases.
 */
export function scrollToSection(id: string, durationMs = 1100) {
  const el = document.getElementById(id);
  if (!el) return;

  // Account for the fixed 60px nav at the top.
  const navHeight = 60;
  const targetTop =
    el.getBoundingClientRect().top + window.scrollY - navHeight;

  if (shouldReduceMotion()) {
    window.scrollTo({ top: targetTop, behavior: "auto" });
    return;
  }

  const startY = window.scrollY;
  const delta = targetTop - startY;
  if (Math.abs(delta) < 1) return;

  const startT = performance.now();

  // easeOutCubic — fast start, gentle deceleration.
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  function step(now: number) {
    const elapsed = now - startT;
    const t = Math.min(1, elapsed / durationMs);
    const eased = easeOut(t);
    window.scrollTo(0, startY + delta * eased);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Smoothly scroll to the top of the page with the same eased curve used
 * by scrollToSection. Respects the reduced-motion preference (OS + in-app).
 */
export function scrollToTop(durationMs = 1100) {
  if (shouldReduceMotion()) {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  const startY = window.scrollY;
  if (startY < 1) return;

  const startT = performance.now();
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  function step(now: number) {
    const elapsed = now - startT;
    const t = Math.min(1, elapsed / durationMs);
    const eased = easeOut(t);
    window.scrollTo(0, startY - startY * eased);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
