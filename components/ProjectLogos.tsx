"use client";
import React from "react";

/**
 * Project brand logos.
 *
 * Each logo renders with `currentColor` so its fill inherits from Tailwind
 * text utility classes. This lets us shift between a per-brand color in
 * light mode and pure white in dark mode via `dark:` variants.
 *
 * All logos are file-backed — the real SVG lives in /public/logos and
 * defines the shape, while `background-color: currentColor` provides the fill
 * via the CSS `mask-image` technique.
 */

// Logical display height; each logo gets a width tuned for visual balance.
const LOGO_HEIGHT = 48;

// Tailwind color classes per slug. First value is the brand color used in
// light mode; dark mode always flips to ivory for contrast on dark surfaces.
const BRAND_COLOR: Record<string, string> = {
  "axiom-interfaces": "text-near-black dark:text-ivory",
  "tmobile-app":      "text-[#E20074] dark:text-[#E20074]",
  "hulu-account":     "text-[#00bf6f] dark:text-[#1CE682]",
  "gs-wearable":      "text-[#529BB9] dark:text-ivory",
  "global-payments":  "text-near-black dark:text-ivory",
};

// Visual widths per logo, tuned so each mark feels similar in weight.
// Heights are fixed by LOGO_HEIGHT; widths are derived from aspect ratio then
// nudged so the denser marks don't dominate.
const LOGO_WIDTH: Record<string, number> = {
  "axiom-interfaces": 96, // wordmark — widest
  "tmobile-app":      112, // "T··Mobile" wordmark
  "hulu-account":     60,
  "gs-wearable":      100, // Imagineering mark
  "global-payments":  64, // Disney+
};

// Maps slug → public asset path for file-backed logos.
const LOGO_ASSET: Record<string, string> = {
  "axiom-interfaces": "/logos/axiom.svg",
  "tmobile-app":      "/logos/T-Mobile.svg",
  "hulu-account":     "/logos/Hulu.svg",
  "gs-wearable":      "/logos/Imagineering.svg",
  "global-payments":  "/logos/DisneyPlus.svg",
};

/**
 * Renders the appropriate brand logo for a given project slug, colored via
 * currentColor so Tailwind text utilities drive the fill in both themes.
 */
export function ProjectLogo({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const colorClass = BRAND_COLOR[slug] ?? "text-near-black dark:text-ivory";
  const width = LOGO_WIDTH[slug] ?? 48;
  const asset = LOGO_ASSET[slug];
  if (!asset) return null;

  // CSS mask technique: the SVG defines the shape (via its alpha/luminance);
  // background-color: currentColor paints it. This sidesteps the need to
  // edit every path in every source SVG to use currentColor.
  return (
    <span
      className={`inline-block ${colorClass} ${className}`}
      style={{
        width,
        height: LOGO_HEIGHT,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${asset})`,
        maskImage: `url(${asset})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
      aria-hidden="true"
    />
  );
}
