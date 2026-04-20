"use client";
/**
 * AccessibilityPanel
 *
 * Slides in just below the NavBar (z-40, behind nav at z-50).
 * Uses container-wide so horizontal margins match the nav exactly.
 * Cards have a fixed min-width and scroll horizontally on narrow screens.
 *
 * Icons are from the provided SVG files, converted to use currentColor
 * so they adapt to both light and dark mode automatically.
 */

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useA11y, Theme } from "@/context/AccessibilityContext";

// ─── Setting icons (from provided SVG files) ──────────────────

function IconAppearance({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54.6094 54.3945" fill="none" aria-hidden="true">
      <path
        d="M27.1094 9.39453C28.1445 9.39453 28.9648 8.55469 28.9648 7.53906L28.9648 1.85547C28.9648 0.839844 28.1445 0 27.1094 0C26.0938 0 25.2734 0.839844 25.2734 1.85547L25.2734 7.53906C25.2734 8.55469 26.0938 9.39453 27.1094 9.39453ZM39.668 14.6289C40.3906 15.332 41.5625 15.3711 42.3047 14.6289L46.3281 10.6055C47.0508 9.88281 47.0312 8.69141 46.3281 7.96875C45.6055 7.26562 44.4336 7.24609 43.7109 7.96875L39.668 12.0117C38.9453 12.7344 38.9648 13.9062 39.668 14.6289ZM44.8633 27.1875C44.8633 28.2031 45.7031 29.0234 46.7188 29.0234L52.3828 29.0234C53.3984 29.0234 54.2383 28.2031 54.2383 27.1875C54.2383 26.1719 53.3984 25.332 52.3828 25.332L46.7188 25.332C45.7031 25.332 44.8633 26.1719 44.8633 27.1875ZM39.668 39.7461C38.9648 40.4688 38.9453 41.6602 39.668 42.3633L43.7109 46.4062C44.4336 47.1289 45.6055 47.0898 46.3281 46.3867C47.0312 45.6641 47.0508 44.4922 46.3281 43.7891L42.2852 39.7461C41.5625 39.043 40.3906 39.043 39.668 39.7461ZM27.1094 44.9805C26.0938 44.9805 25.2734 45.8008 25.2734 46.8164L25.2734 52.5C25.2734 53.5352 26.0938 54.3555 27.1094 54.3555C28.1445 54.3555 28.9648 53.5352 28.9648 52.5L28.9648 46.8164C28.9648 45.8008 28.1445 44.9805 27.1094 44.9805ZM14.5703 39.7461C13.8477 39.043 12.6562 39.043 11.9336 39.7461L7.91016 43.7695C7.1875 44.4727 7.20703 45.6445 7.89062 46.3672C8.61328 47.0703 9.80469 47.1094 10.5078 46.3867L14.5508 42.3633C15.2539 41.6602 15.2539 40.4688 14.5703 39.7461ZM9.35547 27.1875C9.35547 26.1719 8.53516 25.332 7.51953 25.332L1.85547 25.332C0.839844 25.332 0 26.1719 0 27.1875C0 28.2031 0.839844 29.0234 1.85547 29.0234L7.51953 29.0234C8.53516 29.0234 9.35547 28.2031 9.35547 27.1875ZM14.5508 14.6289C15.2539 13.9258 15.2539 12.7148 14.5703 12.0117L10.5273 7.96875C9.84375 7.28516 8.65234 7.26562 7.92969 7.96875C7.22656 8.69141 7.20703 9.88281 7.91016 10.5859L11.9336 14.6289C12.6562 15.3516 13.8281 15.332 14.5508 14.6289Z"
        fill="currentColor"
      />
      <path
        d="M27.0898 39.7461C34.0234 39.7461 39.668 34.1211 39.668 27.1875C39.668 20.2539 34.0234 14.6094 27.0898 14.6094C20.1562 14.6094 14.5312 20.2539 14.5312 27.1875C14.5312 34.1211 20.1562 39.7461 27.0898 39.7461ZM27.0898 36.4648L27.0898 17.8906C32.2266 17.8906 36.3867 22.0312 36.3867 27.1875C36.3867 32.3242 32.2266 36.4648 27.0898 36.4648Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconLineHeight({ size = 20 }: { size?: number }) {
  // line height.svg has a non-square viewBox — preserve aspect ratio
  const w = size;
  const h = Math.round(size * (45.8643 / 65.5664));
  return (
    <svg width={w} height={h} viewBox="0 0 65.5664 45.8643" fill="none" aria-hidden="true">
      <path
        d="M23.125 4.85598L63.4375 4.85598C64.4141 4.85598 65.1953 4.11379 65.1953 3.13723C65.1953 2.16067 64.4141 1.39895 63.4375 1.39895L23.125 1.39895C22.1484 1.39895 21.4062 2.16067 21.4062 3.13723C21.4062 4.11379 22.1484 4.85598 23.125 4.85598ZM23.125 18.0591L63.4375 18.0591C64.4141 18.0591 65.1953 17.2974 65.1953 16.3208C65.1953 15.3443 64.4141 14.5825 63.4375 14.5825L23.125 14.5825C22.1484 14.5825 21.4062 15.3443 21.4062 16.3208C21.4062 17.2974 22.1484 18.0591 23.125 18.0591ZM23.125 31.2427L63.4375 31.2427C64.4141 31.2427 65.1953 30.481 65.1953 29.5044C65.1953 28.5279 64.4141 27.7857 63.4375 27.7857L23.125 27.7857C22.1484 27.7857 21.4062 28.5279 21.4062 29.5044C21.4062 30.481 22.1484 31.2427 23.125 31.2427ZM23.125 44.4263L45.3906 44.4263C46.3672 44.4263 47.1289 43.6841 47.1289 42.7075C47.1289 41.7114 46.3672 40.9693 45.3906 40.9693L23.125 40.9693C22.1484 40.9693 21.4062 41.7114 21.4062 42.7075C21.4062 43.6841 22.1484 44.4263 23.125 44.4263Z"
        fill="currentColor"
      />
      <path
        d="M1.64062 9.91457L11.4844 9.91457C13.0664 9.91457 13.6328 8.39113 12.6758 7.14113L7.8125 0.637228C7.16797-0.222147 5.9375-0.202616 5.3125 0.637228L0.46875 7.14113C-0.488281 8.39113 0.078125 9.91457 1.64062 9.91457ZM11.4844 35.9107L1.64062 35.9107C0.078125 35.9107-0.488281 37.4341 0.46875 38.6841L5.3125 45.188C5.95703 46.0669 7.16797 46.0474 7.8125 45.188L12.6758 38.6841C13.5938 37.4732 13.1055 35.9107 11.4844 35.9107ZM7.87109 6.77004C7.87109 6.06692 7.28516 5.48098 6.58203 5.48098C5.87891 5.48098 5.29297 6.06692 5.29297 6.77004L5.29297 39.0747C5.29297 39.7779 5.87891 40.3638 6.58203 40.3638C7.28516 40.3638 7.87109 39.7779 7.87109 39.0747Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconContrast({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 51.25 50.918" fill="none" aria-hidden="true">
      <path
        d="M25.4297 48.6523C38.5742 48.6523 48.6523 38.5742 48.6523 25.4492C48.6523 12.3047 38.5742 2.22656 25.4297 2.22656Z"
        fill="currentColor"
      />
      <path
        d="M25.4297 50.8789C39.4727 50.8789 50.8789 39.4922 50.8789 25.4492C50.8789 11.4062 39.4727 0 25.4297 0C11.3867 0 0 11.4062 0 25.4492C0 39.4922 11.3867 50.8789 25.4297 50.8789ZM25.4297 47.2461C13.3789 47.2461 3.63281 37.5 3.63281 25.4492C3.63281 13.3984 13.3789 3.65234 25.4297 3.65234C37.4805 3.65234 47.2266 13.3984 47.2266 25.4492C47.2266 37.5 37.4805 47.2461 25.4297 47.2461Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconReduceMotion({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 49.7168 48.1983" fill="none" aria-hidden="true">
      <path
        d="M29.1593 35.358L13.8721 44.3433C13.1885 44.7339 12.4658 44.9487 11.7822 44.9487C10.2002 44.9487 8.85254 43.8745 8.85254 41.5698L8.85254 15.0619ZM13.8721 3.81593L43.2471 21.0816C45.0635 22.1362 45.7275 22.8784 45.7275 24.0894C45.7275 25.2808 45.0635 26.023 43.2471 27.0776L36.9808 30.7607L9.99694 3.80534C10.4946 3.41606 11.1177 3.22999 11.7822 3.22999C12.4658 3.22999 13.1885 3.4253 13.8721 3.81593Z"
        fill="currentColor"
      />
      <path
        d="M40.2393 42.5659C40.8838 43.23 41.958 43.23 42.583 42.5659C43.2275 41.9019 43.2471 40.8667 42.583 40.2222L5.57129 3.21046C4.92676 2.56593 3.85254 2.5464 3.18848 3.21046C2.56348 3.85499 2.56348 4.92921 3.18848 5.57374Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Toggle switch ─────────────────────────────────────────────
function ToggleSwitch({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-10 flex-shrink-0 rounded-full
                 cursor-pointer transition-colors duration-200
                 focus-visible:outline focus-visible:outline-2
                 focus-visible:outline-[var(--color-focus)]"
      style={{ background: checked ? "var(--color-terracotta)" : "var(--color-border-warm)" }}
    >
      <span
        className="pointer-events-none inline-block h-5 w-5 rounded-full
                   transition-transform duration-200 mt-0.5"
        style={{
          background: "#faf9f5", /* constant warm white — visible on any track color */
          transform: checked ? "translateX(18px)" : "translateX(2px)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

// ─── Card shell ────────────────────────────────────────────────
function Card({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex-shrink-0 w-[248px] rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: "var(--color-ivory)",
        border: "1px solid var(--color-border-cream)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Icon + label header */}
      <div className="flex items-center gap-2.5">
        <span style={{ color: "var(--color-stone-gray)", display: "flex", flexShrink: 0 }}>
          {icon}
        </span>
        <span
          className="text-[10px] font-sans font-medium tracking-[0.08em] uppercase"
          style={{ color: "var(--color-stone-gray)" }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

// ─── Card 1: Appearance (Light / Dark) ────────────────────────
function AppearanceCard() {
  const { theme, setTheme } = useA11y();
  return (
    <Card icon={<IconAppearance size={18} />} label="Appearance">
      <div
        className="flex rounded-xl p-1 gap-1"
        style={{ background: "var(--color-warm-sand)" }}
        role="radiogroup"
        aria-label="Color theme"
      >
        {([
          { value: "light" as Theme, label: "Light" },
          { value: "dark"  as Theme, label: "Dark" },
        ] as { value: Theme; label: string }[]).map(({ value, label: lbl }) => (
          <button
            key={value}
            role="radio"
            aria-checked={theme === value}
            onClick={() => setTheme(value)}
            className="flex-1 flex items-center justify-center py-1.5 px-2 rounded-lg
                       text-[12px] font-sans font-medium transition-all duration-150"
            style={{
              background: theme === value ? "var(--color-ivory)" : "transparent",
              color: theme === value ? "var(--color-text-primary)" : "var(--color-stone-gray)",
              /* ring makes selection visible in dark mode where ivory ≈ warm-sand */
              boxShadow: theme === value
                ? "0 1px 3px rgba(0,0,0,0.12), 0 0 0 1px var(--color-border-warm)"
                : "none",
            }}
          >
            {lbl}
          </button>
        ))}
      </div>
      <p className="text-[11px] font-sans leading-snug" style={{ color: "var(--color-stone-gray)" }}>
        Follows your device setting by default.
      </p>
    </Card>
  );
}

// ─── Card 2: Line Spacing ──────────────────────────────────────
function LineSpacingCard() {
  const { lineSpacing, setLineSpacing } = useA11y();

  function clamp(n: number) { return Math.min(2, Math.max(1, n)); }

  return (
    <Card icon={<IconLineHeight size={20} />} label="Line Spacing">
      {/* Slider and numeric input sit on the same row */}
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="1"
          max="2"
          step="0.05"
          value={lineSpacing}
          onChange={(e) => setLineSpacing(parseFloat(e.target.value))}
          className="a11y-slider flex-1 min-w-0"
          aria-label="Line spacing"
          aria-valuemin={1}
          aria-valuemax={2}
          aria-valuenow={lineSpacing}
          aria-valuetext={`${lineSpacing.toFixed(2)}x line spacing`}
        />
        <input
          type="number"
          min="1"
          max="2"
          step="0.05"
          value={lineSpacing.toFixed(2)}
          onChange={(e) => {
            const n = parseFloat(e.target.value);
            if (!isNaN(n)) setLineSpacing(clamp(n));
          }}
          className="w-[4.5rem] flex-shrink-0 px-3 py-1.5 rounded-lg
                     text-[13px] font-sans text-center border outline-none
                     transition-colors focus:border-[var(--color-focus)]"
          style={{
            background: "var(--color-bg)",
            borderColor: "var(--color-border-warm)",
            color: "var(--color-text-primary)",
          }}
          aria-label="Line spacing value"
        />
      </div>
      {/* Range hint — mt-auto pushes it to the card bottom, matching other cards' status text */}
      <p className="text-[11px] font-sans leading-snug mt-auto" style={{ color: "var(--color-stone-gray)" }}>
        Default is 1.0, can be adjusted up to 2.0
      </p>
    </Card>
  );
}

// ─── Card 3: High Contrast ─────────────────────────────────────
function ContrastCard() {
  const { highContrast, setHighContrast } = useA11y();
  return (
    <Card icon={<IconContrast size={18} />} label="High Contrast">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] font-sans leading-snug flex-1" style={{ color: "var(--color-olive-gray)" }}>
          Increases contrast of text and surfaces.
        </p>
        <ToggleSwitch id="contrast-toggle" checked={highContrast} onChange={setHighContrast} />
      </div>
      <p
        className="text-[11px] font-sans mt-auto"
        style={{ color: highContrast ? "var(--color-terracotta)" : "var(--color-stone-gray)" }}
      >
        {highContrast ? "Enhanced contrast active" : "Standard contrast"}
      </p>
    </Card>
  );
}

// ─── Card 4: Reduce Motion ─────────────────────────────────────
function ReduceMotionCard() {
  const { reduceMotion, setReduceMotion } = useA11y();
  return (
    <Card icon={<IconReduceMotion size={18} />} label="Reduce Motion">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] font-sans leading-snug flex-1" style={{ color: "var(--color-olive-gray)" }}>
          Replaces video content with static images.
        </p>
        <ToggleSwitch id="motion-toggle" checked={reduceMotion} onChange={setReduceMotion} />
      </div>
      <p
        className="text-[11px] font-sans mt-auto"
        style={{ color: reduceMotion ? "var(--color-terracotta)" : "var(--color-stone-gray)" }}
      >
        {reduceMotion ? "Reduced motion active" : "Standard animations"}
      </p>
    </Card>
  );
}

// ─── Panel ─────────────────────────────────────────────────────
export function AccessibilityPanel() {
  const { panelOpen, togglePanel } = useA11y();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelOpen) togglePanel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [panelOpen, togglePanel]);

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          {/* Backdrop — transparent, captures outside clicks */}
          <motion.div
            key="a11y-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[39]"
            onClick={togglePanel}
            aria-hidden="true"
          />

          {/* Panel — sits below the nav (top-[60px]), same z-level as dropdowns */}
          <motion.div
            key="a11y-panel"
            id="a11y-panel"
            role="region"
            aria-label="Accessibility settings"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[60px] left-0 right-0 z-40 py-4"
            style={{
              background: "var(--color-bg)",
              borderBottom: "1px solid var(--color-border-cream)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
            }}
          >
            {/* Header — inside container-wide so it aligns with nav items */}
            <div className="container-wide">
              <div className="flex items-center justify-between mb-4">
                <p
                  className="text-[11px] font-sans font-medium tracking-[0.08em] uppercase"
                  style={{ color: "var(--color-stone-gray)" }}
                >
                  Accessibility
                </p>
                <button
                  onClick={togglePanel}
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                             transition-colors duration-150"
                  style={{ color: "var(--color-stone-gray)" }}
                  aria-label="Close accessibility panel"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5"
                      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/*
              Card tray — outside container-wide so cards scroll freely to
              the window edge. Left padding matches container-wide's px-6/md:px-10
              to keep card alignment flush with the nav. No right padding constraint.
            */}
            <div
              className="overflow-x-auto card-tray-pl"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              <div className="flex gap-3 pb-1 pr-6 md:pr-10">
                <AppearanceCard />
                <LineSpacingCard />
                <ContrastCard />
                <ReduceMotionCard />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
