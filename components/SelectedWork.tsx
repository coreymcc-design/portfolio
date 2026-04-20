"use client";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectLogo } from "@/components/ProjectLogos";
import { useA11y } from "@/context/AccessibilityContext";

interface SelectedWorkProps {
  onOpenProject: (slug: string) => void;
}

// Aspect ratio from spec: 655.77 × 281.21 ≈ 2.332 : 1
// Expressed as padding-top percentage: (281.21 / 655.77) * 100 ≈ 42.88%
const VIDEO_ASPECT = "42.88%";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  onOpen: () => void;
}) {
  const { reduceMotion } = useA11y();
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.11 }}
      className="group cursor-pointer border-t border-near-black/8 pt-8 pb-10"
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      tabIndex={0}
      role="button"
      aria-label={`Open case study: ${project.title}`}
    >
      {/* ── Video thumbnail — fixed aspect ratio, full width, overflow clipped ── */}
      <div className="relative w-full overflow-hidden rounded-xl bg-warm-sand shadow-ring mb-0">
        {/* Intrinsic aspect ratio box: 281.21 / 655.77 = 42.88% */}
        <div style={{ paddingTop: VIDEO_ASPECT }} className="relative">
          {/*
            If a real video+poster pair is configured we render a looping,
            muted, inline video. Otherwise we fall back to a neutral play
            glyph — useful while case-study assets are still being produced.
          */}
          {project.thumbnail?.endsWith(".mp4") && project.poster ? (
            reduceMotion ? (
              /* Reduce-motion: render the static poster instead of the looping video. */
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={project.poster}
                alt={`${project.title} preview`}
              />
            ) : (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={project.thumbnail}
                poster={project.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${project.title} preview`}
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                <circle cx="26" cy="26" r="24" stroke="#d1cfc5" strokeWidth="1.5" />
                <path d="M22 18L36 26L22 34V18Z" fill="#c2c0b6" />
              </svg>
            </div>
          )}

          {/* Badges */}
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-md
                        text-[11px] font-mono text-stone-gray font-medium tabular-nums"
            style={{ background: "color-mix(in srgb, var(--color-bg) 94%, transparent)", boxShadow: "var(--shadow-ring)" }}
          >
            {project.year}
          </div>
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1
                        rounded-md text-[11px] font-mono text-stone-gray font-medium uppercase tracking-wider"
            style={{ background: "color-mix(in srgb, var(--color-bg) 94%, transparent)", boxShadow: "var(--shadow-ring)" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <rect x="1.5" y="4.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3 4.5V3a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Case Study
          </div>
        </div>
      </div>

      {/* ── Content row — inset from video edges ── */}
      <div className="px-1 pt-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">

          {/* Left: name + logo + tags */}
          <div className="sm:w-52 flex-shrink-0">
            {/* Brand logo + project name. Logos use currentColor so they
                pick up their per-brand Tailwind text utility and flip to
                ivory in dark mode. Fixed height, intrinsic widths tuned
                in ProjectLogos.tsx for visual consistency. */}
            <div className="flex h-fit items-center gap-3 mb-3">
              <ProjectLogo slug={project.slug} />
            </div>

            <h3
              className="heading-feature mb-3 group-hover:text-terracotta transition-colors duration-150"
              style={{ fontWeight: 500 }}
            >
              {project.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[11px] font-mono text-stone-gray
                             bg-warm-sand rounded-md shadow-ring"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: description + open link */}
          <div className="flex-1 flex flex-col justify-between gap-5">
            <p className="text-[14px] font-sans text-olive-gray leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-2 text-[13px] font-sans font-medium text-near-black
                            group-hover:text-terracotta transition-colors duration-150 w-fit">
              Open case study
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SelectedWork({ onOpenProject }: SelectedWorkProps) {
  return (
    <section id="work" className="w-full py-24 md:py-32 bg-bg border-b border-near-black/10">
      <div className="container-wide">
        {/* Section header — capped width to match project cards */}
        <div className="max-w-[860px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mb-3"
          >
            <p className="label-overline mb-4">Selected Work</p>
            <h2 className="heading-section">
              A few projects I had fun working on
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.11 }}
            className="body-large mt-4 mb-14"
          >
          Some of this work is under NDA. If you don’t have the password, reach out at corey.p.mcclelland@gmail.com!
          </motion.p>

          {/* Project list — single column, full width within max-w container */}
          <div>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                onOpen={() => onOpenProject(project.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
