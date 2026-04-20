"use client";
/**
 * Main page — single-page portfolio with URL-based case study routing.
 *
 * URL state:
 *   ?project=<slug>    — opens the case study for that project
 *   ?password=<value>  — pre-fills + auto-attempts the password gate
 *
 * History behavior:
 *   - Opening a case study pushes a new history entry (back closes it)
 *   - Closing via X or backdrop uses history.back() if WE pushed the entry
 *   - Direct URL loads (?project=slug) use replaceState to close cleanly
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { About } from "@/components/About";
import { WorkHistory } from "@/components/WorkHistory";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = ["hero", "work", "about", "experience"];

export default function Home() {
  const activeSection = useActiveSection(SECTION_IDS);

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [prefillPassword, setPrefillPassword] = useState<string | undefined>(undefined);

  // Track whether we pushed the current history entry
  const pushedRef = useRef(false);

  // Sync state from URL on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("project");
    const pw = params.get("password") ?? undefined;
    if (slug) {
      setActiveSlug(slug);
      setPrefillPassword(pw);
      // We did NOT push this — it was a direct load
      pushedRef.current = false;
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("project");
      setActiveSlug(slug ?? null);
      pushedRef.current = false;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  /** Push ?project=slug and open modal */
  const openProject = useCallback((slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("project", slug);
    url.searchParams.delete("password"); // clear any stale password param
    window.history.pushState({ project: slug }, "", url.toString());
    pushedRef.current = true;
    setActiveSlug(slug);
    setPrefillPassword(undefined);
  }, []);

  /** Close modal — restores URL cleanly */
  const closeProject = useCallback(() => {
    if (pushedRef.current) {
      // We own this history entry; go back so URL restores automatically
      window.history.back();
      pushedRef.current = false;
    } else {
      // Direct load — replace state to remove the param
      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      url.searchParams.delete("password");
      window.history.replaceState({}, "", url.toString());
      setActiveSlug(null);
    }
  }, []);

  return (
    <>
      <NavBar activeSection={activeSection} />

      <main>
        <Hero />
        <SelectedWork onOpenProject={openProject} />
        <About />
        <WorkHistory />
      </main>

      <footer className="bg-near-black border-t border-dark-surface py-8">
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[0.95rem] font-[500] text-warm-silver">
            Corey McClelland
          </span>
          <p className="text-[12px] font-sans text-stone-gray text-center">
            Designed with intention. Fueled with coffee.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:corey.p.mcclelland@gmail.com"
              className="text-[12px] font-sans text-stone-gray hover:text-warm-silver transition-colors"
            >
              corey.p.mcclelland@gmail.com
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/designcorey/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-stone-gray hover:text-warm-silver transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.344V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://open.spotify.com/user/1222675197?si=c32b0b10519c4b17"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="text-stone-gray hover:text-warm-silver transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.021.599-1.561.3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Case Study Modal — portal at root to overlay everything */}
      <CaseStudyModal
        slug={activeSlug}
        prefillPassword={prefillPassword}
        onClose={closeProject}
      />
    </>
  );
}
