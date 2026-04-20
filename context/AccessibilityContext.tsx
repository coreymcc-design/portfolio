"use client";
import React, {
  createContext, useContext, useEffect, useState, useCallback,
} from "react";
import { MotionConfig } from "framer-motion";

export type Theme = "light" | "dark";

interface A11yState {
  theme: Theme;
  lineSpacing: number;   // 1–2; 1 = default line heights
  highContrast: boolean;
  reduceMotion: boolean;
}

interface A11yContextValue extends A11yState {
  setTheme: (t: Theme) => void;
  setLineSpacing: (n: number) => void;
  setHighContrast: (v: boolean) => void;
  setReduceMotion: (v: boolean) => void;
  panelOpen: boolean;
  togglePanel: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be inside A11yProvider");
  return ctx;
}

const STORAGE_KEY = "portfolio_a11y";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function load(): Partial<A11yState> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function save(patch: Partial<A11yState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...load(), ...patch }));
  } catch {}
}

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const [theme, _setTheme]               = useState<Theme>("light");
  const [lineSpacing, _setLineSpacing]   = useState(1);
  const [highContrast, _setHighContrast] = useState(false);
  const [reduceMotion, _setReduceMotion] = useState(false);
  const [panelOpen, setPanelOpen]        = useState(false);
  const [hydrated, setHydrated]          = useState(false);

  // Hydrate from storage + detect system theme
  useEffect(() => {
    const stored = load();
    _setTheme(stored.theme ?? getSystemTheme());
    _setLineSpacing(stored.lineSpacing ?? 1);
    _setHighContrast(stored.highContrast ?? false);
    _setReduceMotion(stored.reduceMotion ?? false);
    setHydrated(true);
  }, []);

  // Follow system theme changes (only when user hasn't overridden)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!load().theme) _setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, hydrated]);

  // Apply high-contrast class
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast, hydrated]);

  // Apply reduce-motion class
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
  }, [reduceMotion, hydrated]);

  // Apply line spacing via injected <style> — avoids touching every component
  useEffect(() => {
    if (!hydrated) return;
    let el = document.getElementById("__a11y_lh") as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = "__a11y_lh";
      document.head.appendChild(el);
    }
    // Apply to all elements, then reset for the a11y panel so its own
    // layout is unaffected. ID selector wins on specificity over *.
    el.textContent = lineSpacing > 1
      ? `* { line-height: ${(lineSpacing * 1.65).toFixed(2)} !important; }
         #a11y-panel, #a11y-panel * { line-height: initial !important; }`
      : "";
  }, [lineSpacing, hydrated]);

  const setTheme = useCallback((t: Theme) => {
    _setTheme(t); save({ theme: t });
  }, []);

  const setLineSpacing = useCallback((n: number) => {
    _setLineSpacing(n); save({ lineSpacing: n });
  }, []);

  const setHighContrast = useCallback((v: boolean) => {
    _setHighContrast(v); save({ highContrast: v });
  }, []);

  const setReduceMotion = useCallback((v: boolean) => {
    _setReduceMotion(v); save({ reduceMotion: v });
  }, []);

  const togglePanel = useCallback(() => setPanelOpen((p) => !p), []);

  return (
    <A11yContext.Provider value={{
      theme, lineSpacing, highContrast, reduceMotion,
      setTheme, setLineSpacing, setHighContrast, setReduceMotion,
      panelOpen, togglePanel,
    }}>
      {/*
        Bridge the a11y toggle into framer-motion. "always" replaces every
        animation with its target state instantly; "never" keeps behavior
        as-authored. Framer-motion's default is "never" — we override so
        the in-app toggle matches the intent of the system media query.
      */}
      <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </A11yContext.Provider>
  );
}
