"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CASE_STUDY_PASSWORD } from "@/data/projects";
import { Button } from "@/components/ui/Button";

const SESSION_KEY = "portfolio_unlocked";

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function setUnlocked() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_KEY, "true");
  }
}

interface PasswordGateProps {
  onUnlock: () => void;
  prefillPassword?: string;
}

export function PasswordGate({ onUnlock, prefillPassword }: PasswordGateProps) {
  const [value, setValue] = useState(prefillPassword ?? "");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-attempt when password arrives via URL param
  useEffect(() => {
    if (prefillPassword) attemptUnlock(prefillPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intentionally no auto-focus on mount: on iOS, focusing an input
  // programmatically triggers the keyboard and the autofill accessory bar
  // even before the user intends to type. Users tap to focus when ready.

  function attemptUnlock(pw: string) {
    if (pw.trim().toLowerCase() === CASE_STUDY_PASSWORD) {
      setUnlocked();
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setValue("");
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-16 px-6 text-center">

      {/* Hero lock icon — large, terracotta, no container */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <svg
          width="36"
          height="52"
          viewBox="0 0 34.6484 50.4492"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5.46875 49.1016L28.8086 49.1016C32.3047 49.1016 34.2773 47.0703 34.2773 43.3203L34.2773 25.5469C34.2773 21.8164 32.3047 19.7852 28.8086 19.7852L5.46875 19.7852C1.95312 19.7852 0 21.8164 0 25.5469L0 43.3203C0 47.0703 1.95312 49.1016 5.46875 49.1016ZM4.47266 21.4453L7.91016 21.4453L7.91016 13.457C7.91016 6.95312 12.0312 3.26172 17.1289 3.26172C22.2266 3.26172 26.3867 6.95312 26.3867 13.457L26.3867 21.4453L29.8242 21.4453L29.8242 13.8672C29.8242 4.76562 23.8867 0 17.1289 0C10.3906 0 4.47266 4.76562 4.47266 13.8672Z"
            fill="#ce6355"
          />
        </svg>
      </motion.div>

      {/* Headline */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="font-serif text-[1.5rem] font-[500] text-near-black mb-2"
      >
        Case studies are gated
      </motion.h3>

      {/* Sub-copy — no session-persistence line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="text-[14px] font-sans text-stone-gray mb-8 max-w-[240px]"
      >
        Enter the password to unlock all case studies.
      </motion.p>

      {/* Input form */}
      <motion.form
        animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={(e) => {
          e.preventDefault();
          attemptUnlock(value);
        }}
        className="flex flex-col items-center gap-3 w-full max-w-[260px]"
      >
        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          autoComplete="off"
          className={[
            "w-full px-4 py-2.5 rounded-lg font-sans text-[16px] text-near-black",
            "bg-white border transition-colors duration-150 outline-none",
            "placeholder:text-stone-gray",
            error
              ? "border-[#b53333] focus:border-[#b53333]"
              : "border-border-warm focus:border-[var(--color-focus)]",
          ].join(" ")}
          aria-label="Case study password"
          aria-describedby={error ? "pw-error" : undefined}
        />
        {error && (
          <p id="pw-error" className="text-[12px] font-sans text-[#b53333] -mt-1 self-start">
            Incorrect password.
          </p>
        )}
        <Button type="submit" variant="dark" size="md" className="w-full">
          Unlock
        </Button>
      </motion.form>
    </div>
  );
}
