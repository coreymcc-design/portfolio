"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workHistory } from "@/data/workHistory";
import { BirdCompanion } from "@/components/bird/BirdCompanion";

export function WorkHistory() {
  // No default open — all collapsed on load
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="relative w-full py-24 md:py-32 bg-bg border-b border-near-black/10 overflow-hidden">
      <div className="container-wide container-wide-padded">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="label-overline mb-4">Experience</p>
          <h2 className="heading-section max-w-2xl">
            Places I’ve worked{" "}
            <span className="italic font-[400]">(and things I’ve learned along the way).</span>
          </h2>
        </motion.div>

        {/* Timeline list */}
        <div className="border-t border-near-black/10">
          {workHistory.map((entry, i) => {
            const isOpen = openId === entry.id;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, ease: "easeOut", delay: i * 0.08 }}
                className="border-b border-near-black/10"
              >
                {/* Accordion trigger */}
                <button
                  onClick={() => toggle(entry.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left
                             hover:opacity-80 transition-opacity"
                >
                  {/* Left: period + role + company */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 flex-1 min-w-0">
                    <span className="text-[13px] font-mono text-stone-gray tabular-nums flex-shrink-0 w-36">
                      {entry.period}
                    </span>
                    <div>
                      <span className="block text-[16px] font-sans font-medium text-near-black">
                        {entry.role}
                      </span>
                      <span className="block text-[13px] font-sans text-stone-gray mt-0.5">
                        {entry.company}
                        <span className="mx-2 opacity-30">·</span>
                        {entry.companyType}
                      </span>
                    </div>
                  </div>

                  {/*
                    + / – icon — bare, no container, sized for mobile touch target (44×44).
                    The button itself is full-width so the tap area is already large enough.
                  */}
                  <div
                    className="flex-shrink-0 w-11 h-11 flex items-center justify-center
                               text-stone-gray hover:text-near-black transition-colors"
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      /* Minus */
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M4 9H14"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      /* Plus */
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M9 4V14M4 9H14"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Accordion content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="pb-8 sm:pl-[9rem]">
                        <p className="text-[14px] font-sans text-olive-gray leading-relaxed mb-5 max-w-xl">
                          {entry.description}
                        </p>
                        <ul className="space-y-2.5">
                          {entry.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-3 text-[13px] font-sans text-stone-gray"
                            >
                              <span className="flex-shrink-0 w-1 h-1 rounded-full bg-terracotta mt-[6px]" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pixel bird companion — enters from the bottom-left and lives along
          the Experience section's bottom edge. */}
      <BirdCompanion entry="left" />
    </section>
  );
}
