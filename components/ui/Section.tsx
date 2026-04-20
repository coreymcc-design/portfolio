import React from "react";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  narrow?: boolean;
}

/**
 * Consistent section wrapper with container width and vertical padding.
 * dark=true renders the Near Black alternate section style.
 */
export function Section({ id, children, className = "", dark = false, narrow = false }: SectionProps) {
  return (
    <section
      id={id}
      className={[
        "w-full py-24 md:py-32",
        dark ? "bg-near-black" : "bg-bg",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "container-wide",
          narrow ? "max-w-3xl" : "",
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  );
}
