import type { Metadata } from "next";
import "./globals.css";
import { A11yProvider } from "@/context/AccessibilityContext";

export const metadata: Metadata = {
  title: "Corey — Product Designer",
  description:
    "Product designer focused on clarity, systems, and the hard problems worth solving. Currently at Anthropic.",
  openGraph: {
    title: "Corey — Product Designer",
    description:
      "Eight years designing products that earn trust at scale — at Anthropic, Flexport, Stripe, and Figma.",
    type: "website",
  },
};

/**
 * Inline theme-init script — runs before React hydrates to prevent
 * a flash of the wrong color scheme. Reads localStorage and applies
 * the `dark`, `high-contrast`, and `reduce-motion` classes to <html>
 * before the first paint.
 */
const themeInitScript = `
(function() {
  try {
    var s = JSON.parse(localStorage.getItem('portfolio_a11y') || '{}');
    var sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = s.theme || sys;
    if (theme === 'dark') document.documentElement.classList.add('dark');
    if (s.highContrast) document.documentElement.classList.add('high-contrast');
    if (s.reduceMotion) document.documentElement.classList.add('reduce-motion');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Prevent flash of wrong color scheme — runs synchronously before paint */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/* Google Fonts — Cormorant (serif) + IBM Plex Sans + IBM Plex Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="antialiased">
        <A11yProvider>
          {children}
        </A11yProvider>
      </body>
    </html>
  );
}
