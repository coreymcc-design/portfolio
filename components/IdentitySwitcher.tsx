"use client";
/**
 * IdentitySwitcher
 *
 * A small, non-destructive floating control for exploring alternate visual
 * identities (accent color + type pairing) on the live site. Collapsed to a
 * pill by default so it never blocks content; expands to a compact list of
 * options. State is driven by the shared A11y context, which applies a
 * `theme-<id>` class to <html> and persists the choice to localStorage.
 */

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useA11y, IDENTITIES } from "@/context/AccessibilityContext";

export function IdentitySwitcher() {
  const { identity, setIdentity } = useA11y();
  const [open, setOpen] = useState(false);
  const active = IDENTITIES.find((i) => i.id === identity) ?? IDENTITIES[0];

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-[248px] rounded-2xl bg-ivory p-2 shadow-card"
            style={{ boxShadow: "var(--shadow-card)" }}
            role="radiogroup"
            aria-label="Visual identity"
          >
            <p className="label-overline px-2 pt-1.5 pb-2">Identity</p>
            <div className="flex flex-col gap-1">
              {IDENTITIES.map((opt) => {
                const selected = opt.id === identity;
                return (
                  <button
                    key={opt.id}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setIdentity(opt.id)}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors duration-150"
                    style={{
                      backgroundColor: selected ? "var(--color-warm-sand)" : "transparent",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      style={{
                        backgroundColor: opt.swatch,
                        boxShadow: selected
                          ? "0 0 0 2px var(--color-ivory), 0 0 0 3.5px " + opt.swatch
                          : "var(--shadow-ring-sm)",
                      }}
                    />
                    <span className="flex flex-col">
                      <span
                        className="text-[14px] font-medium leading-tight text-near-black"
                        style={{ fontFamily: opt.serif }}
                      >
                        {opt.name}
                      </span>
                      <span className="text-[11px] font-mono leading-tight text-stone-gray">
                        {opt.tag}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close identity switcher" : "Open identity switcher"}
        className="flex h-11 items-center gap-2.5 rounded-full bg-ivory pl-2 pr-4 shadow-card transition-transform duration-150 hover:scale-[1.02] active:scale-95"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <span
          aria-hidden="true"
          className="h-7 w-7 rounded-full"
          style={{ backgroundColor: active.swatch, boxShadow: "var(--shadow-ring-sm)" }}
        />
        <span className="text-[13px] font-mono font-medium text-near-black">
          {active.name}
        </span>
      </button>
    </div>
  );
}
