"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { scrollToSection } from "@/lib/utils";
import { BirdCompanion } from "@/components/bird/BirdCompanion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-bg pt-[60px] border-b border-near-black/10 overflow-hidden"
    >
      <div className="container-wide container-wide-padded w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl pt-24 pb-20 md:pt-32 md:pb-24"
        >
          {/* Headline — weight comes from .heading-display (500, matches Cormorant spec) */}
          <motion.h1
            variants={item}
            className="heading-display max-w-xl mb-7"
          >
            I make complicated products{" "}
            <span className="text-terracotta">feel simple.</span>
          </motion.h1>

          {/* Intro */}
          <motion.p variants={item} className="body-large max-w-2xl mb-10">
          I’m Corey, a product designer and design leader who likes messy problems, good teams, and a good cup of coffee. I work across product and strategy, helping teams turn complexity into something people can actually use.
          <br></br><br></br>Currently at Disney+ Hulu. Previously at frog, Walt Disney Imagineering, and Code + Theory (Kettle).
          </motion.p>

          {/* Ghost CTA with trailing arrow */}
          <motion.div variants={item}>
            <button
              onClick={() => scrollToSection("work")}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg
                         border border-near-black text-near-black text-[15px] font-sans font-medium
                         hover:bg-near-black hover:text-ivory transition-all duration-200
                         group"
            >
              View Selected Work
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path
                  d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Pixel bird companion — enters from the bottom-right and lives along
          the hero's bottom edge. Scrolls off with the section. */}
      <BirdCompanion />
    </section>
  );
}
