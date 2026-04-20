"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection, scrollToTop } from "@/lib/utils";
import { useA11y } from "@/context/AccessibilityContext";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";

const NAV_ITEMS = [
  { label: "Work",    href: "work" },
  { label: "About",  href: "about" },
  { label: "Experience", href: "experience" },
];

interface NavBarProps {
  activeSection: string;
}

/**
 * Accessibility icon — from /Desktop/accessibility.svg
 * Paths converted to use currentColor (fill="white" → fill="currentColor").
 */
function A11yIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 51.25 50.918"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M25.4297 50.8789C39.4727 50.8789 50.8789 39.4922 50.8789 25.4492C50.8789 11.4062 39.4727 0 25.4297 0C11.3867 0 0 11.4062 0 25.4492C0 39.4922 11.3867 50.8789 25.4297 50.8789ZM25.4297 47.2461C13.3789 47.2461 3.63281 37.5 3.63281 25.4492C3.63281 13.3984 13.3789 3.65234 25.4297 3.65234C37.4805 3.65234 47.2266 13.3984 47.2266 25.4492C47.2266 37.5 37.4805 47.2461 25.4297 47.2461Z"
        fill="currentColor"
      />
      <path
        d="M25.4102 16.8555C21.8164 16.8555 16.6797 16.25 14.2188 15.8789C14.0039 15.8398 13.7695 15.7812 13.5352 15.7812C12.8906 15.7812 12.2461 16.3086 12.2461 17.2266C12.2461 17.9102 12.6562 18.4961 13.3203 18.6523C14.1211 18.8867 19.9023 19.5703 20.625 19.707C21.3477 19.8438 21.7773 20.4492 21.8164 21.3281C21.8164 22.6562 21.8164 26.8555 21.4844 28.7891C21.1719 30.6836 18.9648 39.8633 18.8672 40.2539C18.5938 41.2305 19.1992 42.1094 20.1758 42.1094C20.8789 42.1094 21.3867 41.7188 21.6406 40.7812C22.0898 38.9258 23.6719 32.5781 24.1992 31.0352C24.5117 29.9414 24.7852 29.5312 25.4102 29.5312C26.0156 29.5312 26.2891 29.9414 26.6406 31.0352C27.0898 32.5586 28.7109 38.9062 29.1602 40.7812C29.4141 41.7188 29.9219 42.1094 30.625 42.1094C31.6211 42.1094 32.1875 41.2305 31.9336 40.2539C31.8555 39.8633 29.6094 30.6836 29.3164 28.7891C29.0234 26.8555 29.0234 22.6562 29.0234 21.3281C29.0234 20.4492 29.4531 19.8633 30.1758 19.707C30.8984 19.5703 36.6797 18.9258 37.4805 18.6523C38.1445 18.4766 38.5547 17.9102 38.5547 17.2266C38.5547 16.3086 37.8711 15.7812 37.2656 15.7812C37.0312 15.7812 36.7969 15.8398 36.582 15.8789C34.1211 16.25 29.0234 16.8555 25.4102 16.8555ZM25.4102 15.1953C27.2266 15.1953 28.6914 13.6914 28.6914 11.8945C28.6914 10.0586 27.2266 8.59375 25.4102 8.59375C23.5742 8.59375 22.1094 10.0586 22.1094 11.8945C22.1094 13.6914 23.5742 15.1953 25.4102 15.1953Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function NavBar({ activeSection }: NavBarProps) {
  const [scrolled, setScrolled]    = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const { panelOpen, togglePanel } = useA11y();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          "border-b border-near-black/10",
          scrolled
            ? "bg-[#f5f4edee] dark:bg-[#1a1918ee] backdrop-blur-sm"
            : "bg-bg",
        ].join(" ")}
      >
        <div className="container-wide flex items-center justify-between h-[60px]">

          {/* Wordmark */}
          <button
            onClick={() => scrollToTop()}
            className="font-mono text-[1.35rem] font-[300] text-near-black tracking-tight
                       hover:text-terracotta transition-colors duration-150"
            aria-label="Scroll to top"
          >
            Corey McClelland
          </button>

          {/* Desktop nav + a11y button */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8" aria-label="Main navigation">
              {NAV_ITEMS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className={[
                    "relative py-1 text-[16px] font-sans transition-colors duration-150",
                    activeSection === href
                      ? "text-near-black font-medium"
                      : "text-olive-gray hover:text-near-black",
                  ].join(" ")}
                >
                  {label}
                  {activeSection === href && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-[1px] -left-3 -right-3 h-[3px] bg-terracotta rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Accessibility icon button — no container, color-only states */}
            <button
              onClick={togglePanel}
              aria-label={panelOpen ? "Close accessibility settings" : "Open accessibility settings"}
              aria-expanded={panelOpen}
              aria-controls="a11y-panel"
              className={[
                "w-11 h-11 flex items-center justify-center",
                "transition-colors duration-150",
                panelOpen
                  ? "text-terracotta"
                  : "text-stone-gray hover:text-near-black",
              ].join(" ")}
            >
              <A11yIcon size={20} />
            </button>
          </div>

          {/* Mobile: a11y + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={togglePanel}
              aria-label={panelOpen ? "Close accessibility settings" : "Open accessibility settings"}
              aria-expanded={panelOpen}
              className={[
                "w-11 h-11 flex items-center justify-center",
                "transition-colors duration-150",
                panelOpen
                  ? "text-terracotta"
                  : "text-stone-gray hover:text-near-black",
              ].join(" ")}
            >
              <A11yIcon size={20} />
            </button>

            {/*
              Hamburger — bars use bg-[color:var(--color-text-primary)] so they
              flip from near-black in light mode to warm-white in dark mode,
              staying visible against the nav background in both themes.
            */}
            <button
              className="flex flex-col gap-[5px] p-2 -mr-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={[
                  "block w-5 h-[1.5px] transition-transform duration-200",
                  menuOpen ? "translate-y-[6.5px] rotate-45" : "",
                ].join(" ")}
                style={{ background: "var(--color-text-primary)" }}
              />
              <span
                className={[
                  "block w-5 h-[1.5px] transition-opacity duration-200",
                  menuOpen ? "opacity-0" : "",
                ].join(" ")}
                style={{ background: "var(--color-text-primary)" }}
              />
              <span
                className={[
                  "block w-5 h-[1.5px] transition-transform duration-200",
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : "",
                ].join(" ")}
                style={{ background: "var(--color-text-primary)" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden bg-bg border-b border-near-black/10 px-6 pb-6 pt-3 flex flex-col gap-5"
            >
              {NAV_ITEMS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className={[
                    "text-left text-[17px] font-sans transition-colors",
                    activeSection === href
                      ? "text-near-black font-medium"
                      : "text-olive-gray hover:text-near-black",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Accessibility panel — rendered here so it sits behind the nav (z-40 < z-50) */}
      <AccessibilityPanel />
    </>
  );
}
