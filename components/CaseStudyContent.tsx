import React from "react";
import { Project } from "@/data/projects";
import { useA11y } from "@/context/AccessibilityContext";

interface CaseStudyContentProps {
  project: Project;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="text-[11px] font-mono font-semibold tracking-[0.07em] uppercase mb-3"
      style={{ color: "var(--color-stone-gray)" }}
    >
      {children}
    </h4>
  );
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="mb-10">
      <SectionLabel>{heading}</SectionLabel>
      <p className="body-large" style={{ color: "var(--color-charcoal-warm)" }}>
        {body}
      </p>
    </div>
  );
}

/**
 * MediaPlaceholder — swap src for real media when assets are ready.
 *
 * When reduceMotion is enabled, renders a static-image placeholder
 * instead of a video placeholder. All real video embeds added here
 * must also have a static thumbnail companion (see DESIGN.md §11).
 */
function MediaPlaceholder({
  label,
  staticLabel,
  aspect = "video",
  reduceMotion = false,
}: {
  label: string;
  staticLabel?: string;
  aspect?: "video" | "wide" | "square";
  reduceMotion?: boolean;
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square"
    : aspect === "wide"  ? "aspect-[3/1]"
    : "aspect-video";

  const isStatic = reduceMotion;

  return (
    <div
      className={`w-full ${aspectClass} rounded-xl overflow-hidden
                  flex flex-col items-center justify-center gap-2`}
      style={{
        background: "var(--color-warm-sand)",
        boxShadow: "0px 0px 0px 1px var(--color-border-warm)",
      }}
    >
      {isStatic ? (
        /* Static image placeholder */
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="28" height="24" rx="3" stroke="var(--color-ring-deep)" strokeWidth="1.5" />
          <circle cx="10" cy="12" r="2.5" fill="var(--color-ring-deep)" />
          <path d="M2 22l7-6 5 4 4-3 12 7" stroke="var(--color-ring-deep)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ) : (
        /* Video placeholder */
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="2" y="6" width="28" height="20" rx="3" stroke="var(--color-ring-deep)" strokeWidth="1.5" />
          <path d="M14 12L20 16L14 20V12Z" fill="var(--color-ring-deep)" />
        </svg>
      )}
      <span
        className="text-[11px] font-mono tracking-wide"
        style={{ color: "var(--color-stone-gray)" }}
      >
        {isStatic ? (staticLabel ?? label.replace(/recording|video/gi, "image")) : label}
      </span>
    </div>
  );
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const { reduceMotion } = useA11y();
  const { caseStudy, title, role, tags, timeline, team, platform } = project;

  const meta = [
    { label: "Role",     value: role },
    { label: "Timeline", value: timeline },
    { label: "Team",     value: team },
    { label: "Platform", value: platform },
  ];

  return (
    <article>
      {/*
        Content column: grows with the modal but stops scaling at 720px.
        The modal itself continues to expand (up to 95vw) giving the
        content room to breathe against the modal background.
      */}
      <div className="w-full max-w-[720px] mx-auto">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="px-6 md:px-10 pt-14 pb-8">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded-md"
                style={{
                  background: "var(--color-warm-sand)",
                  color: "var(--color-stone-gray)",
                  boxShadow: "var(--shadow-ring)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h2
            className="heading-sub mb-4"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            {title}
          </h2>
          <p
            className="text-[15px] font-sans leading-relaxed"
            style={{ color: "var(--color-olive-gray)" }}
          >
            {caseStudy.overview}
          </p>
        </div>

        {/* ── Metadata: Role / Timeline / Team / Platform ───────── */}
        <div
          className="mx-6 md:mx-10 mb-8 pt-6 pb-7 border-t border-b
                     grid grid-cols-2 md:grid-cols-4 gap-y-7"
          style={{ borderColor: "var(--color-border-cream)" }}
        >
          {meta.map(({ label, value }) => (
            <div key={label}>
              <p
                className="text-[10px] font-mono font-medium tracking-[0.12em] uppercase mb-2.5"
                style={{ color: "var(--color-stone-gray)" }}
              >
                {label}
              </p>
              <p
                className="text-[17px] font-sans leading-snug text-near-black"
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Hero media ───────────────────────────────────────── */}
        <div className="px-6 md:px-10 mb-10">
          <MediaPlaceholder
            label="Project overview — replace with screen recording"
            staticLabel="Project overview thumbnail"
            aspect="video"
            reduceMotion={reduceMotion}
          />
        </div>

        <div
          className="mx-6 md:mx-10 border-t mb-10"
          style={{ borderColor: "var(--color-border-cream)" }}
        />

        {/* ── Problem + Context ─────────────────────────────────── */}
        <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-2">
          <Block heading={caseStudy.problem.heading} body={caseStudy.problem.body} />
          <Block heading={caseStudy.context.heading} body={caseStudy.context.body} />
        </div>

        {/* ── Research media ───────────────────────────────────── */}
        <div className="px-6 md:px-10 mb-10">
          <MediaPlaceholder
            label="Research artifacts, sketches, or whiteboard photos"
            aspect="wide"
            reduceMotion={reduceMotion}
          />
        </div>

        {/* ── Constraints ───────────────────────────────────────── */}
        <div className="px-6 md:px-10 mb-2">
          <Block heading={caseStudy.constraints.heading} body={caseStudy.constraints.body} />
        </div>

        {/* ── Process ───────────────────────────────────────────── */}
        <div className="px-6 md:px-10 mb-4">
          <SectionLabel>{caseStudy.process.heading}</SectionLabel>
          <p className="body-large mb-8" style={{ color: "var(--color-charcoal-warm)" }}>
            {caseStudy.process.body}
          </p>

          {caseStudy.process.subsections?.map((sub, i) => (
            <div key={sub.heading} className="mb-8">
              <div
                className="pl-4 border-l mb-4"
                style={{ borderColor: "var(--color-border-warm)" }}
              >
                <h5
                  className="text-[13px] font-sans font-semibold mb-1.5"
                  style={{ color: "var(--color-dark-warm)" }}
                >
                  {sub.heading}
                </h5>
                <p
                  className="text-[14px] font-sans leading-relaxed"
                  style={{ color: "var(--color-olive-gray)" }}
                >
                  {sub.body}
                </p>
              </div>

              {i === 0 && (
                <MediaPlaceholder
                  label="Early explorations / flow diagrams"
                  staticLabel="Early explorations thumbnail"
                  aspect="video"
                  reduceMotion={reduceMotion}
                />
              )}
              {i === 1 && (
                <div className="grid grid-cols-2 gap-3">
                  <MediaPlaceholder label="Before" aspect="square" reduceMotion={reduceMotion} />
                  <MediaPlaceholder label="After" aspect="square" reduceMotion={reduceMotion} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Final design walkthrough ──────────────────────────── */}
        <div className="px-6 md:px-10 mb-10">
          <SectionLabel>Final Design</SectionLabel>
          <MediaPlaceholder
            label="Final design walkthrough — replace with Loom or screen recording"
            staticLabel="Final design thumbnail"
            aspect="video"
            reduceMotion={reduceMotion}
          />
        </div>

        {/* ── Outcome + Takeaways ───────────────────────────────── */}
        <div
          className="mx-6 md:mx-10 mb-12 rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ background: "var(--color-warm-sand)", boxShadow: "var(--shadow-ring)" }}
        >
          <div>
            <SectionLabel>{caseStudy.outcome.heading}</SectionLabel>
            <p
              className="text-[14px] font-sans leading-relaxed"
              style={{ color: "var(--color-charcoal-warm)" }}
            >
              {caseStudy.outcome.body}
            </p>
          </div>
          <div>
            <SectionLabel>{caseStudy.takeaways.heading}</SectionLabel>
            <p
              className="text-[14px] font-sans leading-relaxed italic"
              style={{ color: "var(--color-charcoal-warm)" }}
            >
              {caseStudy.takeaways.body}
            </p>
          </div>
        </div>

      </div>
    </article>
  );
}
