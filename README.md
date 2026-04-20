# Corey — Product Design Portfolio

A production-ready single-page portfolio built with Next.js 13 (App Router),
TypeScript, Tailwind CSS, and Framer Motion.

---

## Running Locally

**Requirements:** Node.js >= 16.8

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Case Study Password

The default password to unlock all case studies is:

```
design
```

Change it in `data/projects.ts` → `CASE_STUDY_PASSWORD`.

### Deep-link directly to an open case study:
```
/?project=orchestration-dashboard
```

### Deep-link with password pre-filled (auto-unlocks):
```
/?project=payments-onboarding&password=design
```

---

## Project Structure

```
app/
  layout.tsx          Root layout, metadata, font import (Google Fonts via CSS)
  page.tsx            Main page — URL state management for case study routing
  globals.css         All CSS variables / design tokens + base styles

components/
  NavBar.tsx          Sticky nav with active section highlighting
  Hero.tsx            Hero section with Framer Motion entrance animation
  SelectedWork.tsx    Project grid (4 cards)
  About.tsx           Philosophy section (dark background)
  WorkHistory.tsx     Timeline accordion (one open at a time)
  EasterEgg.tsx       Placeholder for future interactive element
  CaseStudyModal.tsx  Desktop modal / mobile bottom-sheet + expansion logic
  CaseStudyContent.tsx  Rich case study layout (problem → outcome → takeaways)
  PasswordGate.tsx    Password entry UI + sessionStorage persistence

  ui/
    Button.tsx        Button with variants: terracotta, dark, sand, ghost
    Section.tsx       Section wrapper (light / dark variants)

data/
  projects.ts         All project + case study content (edit here for content)
  workHistory.ts      Work history entries (edit here)

hooks/
  useActiveSection.ts IntersectionObserver-based active section tracking
  useReveal.ts        Scroll-reveal helper (adds .visible to .reveal elements)

lib/
  utils.ts            cn() class helper + scrollToSection()
```

---

## Customization Guide

### Content
| What to change | Where |
|---|---|
| Projects + case studies | `data/projects.ts` |
| Work history | `data/workHistory.ts` |
| About principles | `components/About.tsx` |
| Hero headline/copy | `components/Hero.tsx` |
| Case study password | `data/projects.ts` → `CASE_STUDY_PASSWORD` |
| Contact email | `components/About.tsx` + `app/page.tsx` footer |
| Page metadata | `app/layout.tsx` |

### Colors / Design Tokens
All tokens are CSS variables defined at the top of `app/globals.css`.
They're also registered as Tailwind colors in `tailwind.config.ts`.

Key tokens:
- `--color-terracotta: #ce6355` — brand CTA color
- `--color-bg: #f5f4ed` — parchment background
- `--color-near-black: #141413` — dark sections

### Fonts
Fonts are loaded via Google Fonts `@import` at the top of `globals.css`.
Families used: Source Serif 4 (headings, weight 500), IBM Plex Sans (UI/body).

### Video Thumbnails
Project cards show placeholder SVGs. Replace them by editing the thumbnail
area in `components/SelectedWork.tsx`. The `thumbnail` field in each project
in `data/projects.ts` stores the intended path — add your assets to `public/thumbnails/`.

### Easter Egg / Game
The `#game-container` div inside `components/EasterEgg.tsx` is the mount point.
Swap the placeholder SVG with any React component, canvas element, or iframe.

---

## Design System

Full design system documentation is in `DESIGN.md`.

Key principles:
- Parchment (`#f5f4ed`) as the primary background — no cool grays
- Source Serif 4 at weight 500 for all headings
- Ring-based shadows (`0 0 0 1px`) instead of borders where appropriate
- IBM Plex Sans for all UI/body text
- Terracotta (`#ce6355`) reserved for primary CTAs only

---

## Deployment

Works with any Node >= 16.8 host. For Vercel:

```bash
npx vercel
```

Note: if deploying to a platform requiring Node >= 18, update the runtime setting.
The codebase is fully compatible with Node 18+ — this project uses 13 for local compat.
