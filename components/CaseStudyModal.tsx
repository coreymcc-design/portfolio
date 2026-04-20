"use client";
/**
 * CaseStudyModal
 *
 * Desktop:
 *   A centered card that expands to near-full-screen as the user scrolls.
 *   Expansion is SCROLL-TRACKED — not a snap. The container's width/maxHeight/
 *   borderRadius are driven by scrollTop, mapping 0→250px scroll to 0→1 progress.
 *   Interpolation runs via direct DOM style mutation (no React state → no
 *   re-renders → no jank). The wrapper div holds `.modal-size-wrapper` for
 *   initial CSS values; the inner motion.div animates entrance/exit only.
 *
 * Mobile (<768px):
 *   Bottom sheet that slides up via a `useMotionValue`. Drag gesture is handled
 *   with raw pointer events on the grabber strip only — content scrolls freely.
 *   Exit is a smooth ease-in tween, not a spring, so it feels like the sheet
 *   slides off rather than bouncing away.
 */

import React, {
  useEffect, useRef, useState, useCallback,
} from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import { projects } from "@/data/projects";
import { PasswordGate, isUnlocked } from "@/components/PasswordGate";
import { CaseStudyContent } from "@/components/CaseStudyContent";

interface CaseStudyModalProps {
  slug: string | null;
  prefillPassword?: string;
  onClose: () => void;
}

// ─── Easing helpers ────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// Smooth ease-out curve so expansion decelerates naturally
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

export function CaseStudyModal({ slug, prefillPassword, onClose }: CaseStudyModalProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const sizeRef      = useRef<HTMLDivElement>(null); // desktop wrapper

  const project = projects.find((p) => p.slug === slug) ?? null;

  useEffect(() => { setUnlocked(isUnlocked()); }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.classList.toggle("modal-open", !!slug);
    return () => document.body.classList.remove("modal-open");
  }, [slug]);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Reset scroll when project changes
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    // Reset desktop size wrapper to initial CSS values
    if (sizeRef.current) {
      sizeRef.current.style.removeProperty("width");
      sizeRef.current.style.removeProperty("max-height");
      sizeRef.current.style.removeProperty("border-radius");
    }
  }, [slug]);

  /**
   * Desktop scroll → size expansion.
   * Maps scrollTop 0→250px to progress 0→1.
   * Directly mutates the wrapper element's style — zero React state,
   * zero re-renders, smooth at 60fps.
   */
  const handleScroll = useCallback(() => {
    const scrollEl = scrollRef.current;
    const sizeEl   = sizeRef.current;
    if (!scrollEl || !sizeEl || isMobile) return;

    const raw  = scrollEl.scrollTop;
    const p    = easeOutCubic(Math.min(1, raw / 250));
    const vw   = window.innerWidth;
    const vh   = window.innerHeight;

    const startW  = Math.min(760, vw * 0.92);
    const endW    = vw * 0.95;
    const startH  = vh * 0.88;
    const endH    = vh * 0.95;

    sizeEl.style.width        = `${lerp(startW, endW, p)}px`;
    sizeEl.style.maxHeight    = `${lerp(startH, endH, p)}px`;
    sizeEl.style.borderRadius = `${lerp(20, 12, p)}px`;
  }, [isMobile]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {slug && (
        <>
          {/* ── Backdrop ─────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-[rgba(20,20,19,0.6)] backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {isMobile ? (
            // ── Mobile sheet (self-managed lifecycle) ─────────
            <MobileSheet
              key="mobile-sheet"
              onClose={onClose}
              scrollRef={scrollRef}
              onScroll={handleScroll}
            >
              {unlocked
                ? <CaseStudyContent project={project} />
                : <PasswordGate prefillPassword={prefillPassword} onUnlock={() => setUnlocked(true)} />}
            </MobileSheet>
          ) : (
            // ── Desktop centered modal ────────────────────────
            <div
              key="desktop-wrapper"
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              {/*
                .modal-size-wrapper supplies CSS initial values.
                handleScroll mutates width/maxHeight/borderRadius directly
                so React never touches those properties after mount.
              */}
              <div
                ref={sizeRef}
                className="modal-size-wrapper pointer-events-auto flex flex-col overflow-hidden"
                style={{ boxShadow: "0px 0px 0px 1px var(--color-border-warm), 0px 32px 72px rgba(0,0,0,0.28)" }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Case study: ${project.title}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-ivory flex flex-col w-full h-full overflow-hidden relative"
                  style={{ borderRadius: "inherit" }}
                >
                  {/* Close — bare button, no container */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center
                               justify-center text-stone-gray hover:text-near-black
                               transition-colors duration-150"
                    aria-label="Close case study"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>

                  <ScrollArea ref={scrollRef} onScroll={handleScroll}>
                    {unlocked
                      ? <CaseStudyContent project={project} />
                      : <PasswordGate prefillPassword={prefillPassword} onUnlock={() => setUnlocked(true)} />}
                  </ScrollArea>
                </motion.div>
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

// ── Shared scrollable area with top/bottom edge fades ─────────
const ScrollArea = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; onScroll?: () => void }
>(function ScrollArea({ children, onScroll }, ref) {
  return (
    <div ref={ref} onScroll={onScroll} className="flex-1 overflow-y-auto overscroll-contain">
      {/* Top fade */}
      <div
        className="pointer-events-none sticky top-0 left-0 right-0 h-12 z-10"
        style={{ background: "linear-gradient(to bottom, var(--color-ivory) 30%, transparent)" }}
      />
      <div className="-mt-12">
        {children}
      </div>
      {/* Bottom fade */}
      <div
        className="pointer-events-none sticky bottom-0 left-0 right-0 h-14"
        style={{ background: "linear-gradient(to top, var(--color-ivory) 30%, transparent)" }}
      />
    </div>
  );
});

// ── Mobile bottom sheet ────────────────────────────────────────
function MobileSheet({
  children, onClose, scrollRef, onScroll,
}: {
  children: React.ReactNode;
  onClose: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll?: () => void;
}) {
  /**
   * useMotionValue drives the Y position directly.
   * - Entry: animate from windowHeight → 0 with a spring
   * - Drag: pointer events on the grabber strip set Y directly
   * - Snap-back: if not dragged far enough, spring back to 0
   * - Exit: ease-in tween so the sheet slides off smoothly,
   *         then calls onClose after the animation finishes
   */
  const sheetY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight : 900
  );

  // Entry animation on mount
  useEffect(() => {
    animate(sheetY, 0, { type: "spring", stiffness: 380, damping: 40 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerClose = useCallback(() => {
    const h = typeof window !== "undefined" ? window.innerHeight : 900;
    animate(sheetY, h, {
      duration: 0.28,
      ease: [0.4, 0, 1, 1], // ease-in — accelerates off-screen
    }).then(onClose);
  }, [sheetY, onClose]);

  /**
   * Grabber pointer events.
   * - Touch-action:none on the grabber prevents browser scroll interference.
   * - We track velocity manually so a fast flick closes even if < 100px.
   */
  const handleGrabberPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const startY      = e.clientY;
      const startSheetY = sheetY.get();
      let lastY         = startY;
      let lastTime      = Date.now();
      let velocity      = 0;

      function onMove(ev: PointerEvent) {
        const now = Date.now();
        const dt  = now - lastTime;
        if (dt > 0) velocity = ((ev.clientY - lastY) / dt) * 1000;
        lastY    = ev.clientY;
        lastTime = now;
        sheetY.set(Math.max(0, startSheetY + (ev.clientY - startY)));
      }

      function onUp() {
        const y = sheetY.get();
        if (y > 100 || velocity > 500) {
          triggerClose();
        } else {
          // Spring back to closed position
          animate(sheetY, 0, { type: "spring", stiffness: 450, damping: 40 });
        }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [sheetY, triggerClose]
  );

  return (
    <motion.div
      style={{ y: sheetY, height: "92dvh" as string }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-ivory rounded-t-[20px]
                 flex flex-col shadow-[0px_-4px_40px_rgba(0,0,0,0.16)]"
    >
      {/* Grabber strip — drag target, full-width for easy grab */}
      <div
        className="flex-shrink-0 flex justify-center pt-3 pb-2
                   cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handleGrabberPointerDown}
        aria-hidden="true"
      >
        <div className="w-10 h-1.5 rounded-full bg-border-warm" />
      </div>

      {/* Close button */}
      <button
        onClick={triggerClose}
        className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center
                   text-stone-gray hover:text-near-black transition-colors duration-150"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Scrollable content — stopPropagation prevents any accidental drag interference */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        onPointerDown={(e) => e.stopPropagation()}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ height: "92dvh" }}
      >
        <div
          className="pointer-events-none sticky top-0 left-0 right-0 h-12 z-10"
          style={{ background: "linear-gradient(to bottom, var(--color-ivory) 30%, transparent)" }}
        />
        <div className="-mt-12">{children}</div>
        <div
          className="pointer-events-none sticky bottom-0 left-0 right-0 h-14"
          style={{ background: "linear-gradient(to top, var(--color-ivory) 30%, transparent)" }}
        />
      </div>
    </motion.div>
  );
}
