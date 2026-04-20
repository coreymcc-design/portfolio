// ─── Project & Case Study Data ────────────────────────────────
// Edit this file to update portfolio content.
// Password for unlocking case studies: "excelsior"

export interface CaseStudySection {
  heading: string;
  body: string;
  subsections?: { heading: string; body: string }[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  role: string;
  company: string; // Used for company logo monogram in project cards
  timeline: string;
  team: string;
  platform: string;
  // thumbnail: path to video or image (swap in your real assets)
  thumbnail: string;
  // Optional poster image shown before the video loads / plays, and used
  // as the fallback still in reduced-data or reduced-motion contexts.
  poster?: string;
  caseStudy: {
    overview: string;
    problem: CaseStudySection;
    context: CaseStudySection;
    constraints: CaseStudySection;
    process: CaseStudySection;
    outcome: CaseStudySection;
    takeaways: CaseStudySection;
  };
}

export const CASE_STUDY_PASSWORD = "excelsior";

export const projects: Project[] = [
  {
    slug: "axiom-interfaces",
    title: "Axiom Crew Interfaces",
    description:
      "Reimagining complex operational oversight for a logistics platform serving 400+ dispatchers.",
    tags: ["Product Design", "Data-dense UI", "Research"],
    year: "2022 - 2023",
    role: "Associate Design Director",
    company: "Axiom Space",
    timeline: "~1 Year",
    team: "Teague",
    platform: "Web App (On Device)",
    thumbnail: "/thumbnails/axiom-home.mp4",
    poster: "/thumbnails/axiom-home-poster.jpg",
    caseStudy: {
      overview:
        "A ground-up redesign of a real-time logistics dashboard used daily by hundreds of dispatchers to manage fleets, exceptions, and SLA compliance across 12 time zones.",
      problem: {
        heading: "Problem",
        body: `Dispatchers were spending an average of 23 minutes per shift just navigating between views to triage exceptions. The existing dashboard had been patched incrementally over five years — each addition made sense in isolation, but collectively it had become an information labyrinth. Critical alerts competed visually with routine status updates. Decision latency was costing the business roughly $180K per month in missed SLAs.`,
      },
      context: {
        heading: "Context",
        body: `I joined mid-cycle as the third designer on a 14-person cross-functional team. Engineering had already committed to a React-based rewrite, which gave us an opportunity to rethink the information architecture rather than just reskin the surface. The platform was used exclusively on 27" monitors in a dispatch center environment — a rare luxury that allowed us to design with density in mind rather than defaulting to mobile-first thinking.`,
      },
      constraints: {
        heading: "Constraints",
        body: `Training time for new dispatchers was capped at 2 hours, which meant any redesign had to feel learnable from day one. We also had a hard constraint against breaking existing keyboard shortcuts — power users had muscle memory built over years. Finally, the data model was being refactored in parallel, which meant some UI decisions had to be made against an API contract that was still in flux.`,
      },
      process: {
        heading: "Process",
        body: `I started with a five-day observation study in two dispatch centers, watching how operators actually moved through the interface under pressure. What I found contradicted some of our initial assumptions — dispatchers weren't struggling with information overload as much as they were struggling with information sequencing. The right data existed; it just wasn't surfaced at the right moment in the right workflow.`,
        subsections: [
          {
            heading: "Mapping the Decision Tree",
            body: `I mapped every decision a dispatcher makes in a 4-hour shift against the current UI path required to support it. This produced a 47-step journey map that revealed 12 unnecessary context switches. The redesign consolidated three core workflows into a single adaptive view.`,
          },
          {
            heading: "Progressive Disclosure Architecture",
            body: `Instead of showing all exception types with equal visual weight, I designed a tiered alert system: critical SLA breaches surfaced prominently at the top; routine status updates were collapsed into a secondary panel accessible with a single keystroke. This alone reduced the visual noise dispatchers described as "the blur."`,
          },
          {
            heading: "Validation",
            body: `We ran a two-week beta with eight dispatchers across two shifts. We measured time-to-triage, error rates on exception categorization, and — informally — stress signals from participant self-reporting. All three metrics improved meaningfully.`,
          },
        ],
      },
      outcome: {
        heading: "Outcome",
        body: `The redesigned dashboard shipped to all 400+ dispatchers over a 3-week rollout. Average time-to-triage dropped from 23 minutes to 8 minutes. SLA breach rate fell 34% in the first quarter post-launch. Two dispatchers submitted unsolicited testimonials saying it was "the first tool update in five years that actually made the job easier."`,
      },
      takeaways: {
        heading: "Key Takeaways",
        body: `Dense information environments reward investment in information sequencing over visual simplification. The temptation in data-heavy interfaces is to add progressive disclosure too aggressively — hiding complexity rather than structuring it. The breakthrough here was understanding the workflow order, not just the data hierarchy. When you design for the decision, the interface organizes itself.`,
      },
    },
  },

  {
    slug: "tmobile-app",
    title: "T-Mobile Contextual Home",
    description:
      "Reducing a 14-step fintech onboarding to 5 meaningful moments — without losing compliance.",
    tags: ["Onboarding", "Fintech", "Conversion"],
    year: "2021",
    role: "Product Designer",
    company: "Stripe",
    timeline: "6 Weeks",
    team: "Stripe",
    platform: "Web",
    thumbnail: "/thumbnails/tmo-home.mp4",
    poster: "/thumbnails/tmo-home-poster.jpg",
    caseStudy: {
      overview:
        "An end-to-end redesign of the merchant onboarding flow for a B2B payments platform, reducing drop-off by 41% and time-to-first-transaction by 3 days.",
      problem: {
        heading: "Problem",
        body: `The existing onboarding required merchants to complete 14 distinct screens before processing their first transaction. 62% dropped off at step 7 — always the same step: beneficial ownership disclosure. The compliance team insisted all information was legally required. The product team assumed the form was the problem. Both were wrong.`,
      },
      context: {
        heading: "Context",
        body: `The platform processed $2.4B in payments annually and was expanding aggressively into the SMB market. SMB merchants had very different mental models of "business verification" than enterprise accounts. They weren't familiar with KYB terminology, didn't have documents readily available, and experienced the process as interrogation rather than onboarding.`,
      },
      constraints: {
        heading: "Constraints",
        body: `Compliance requirements were non-negotiable — every field had a regulatory basis. The legal team had veto power over any language changes to form labels. The engineering team had a 6-week build window. And critically: we couldn't change what we collected, only how and when we asked for it.`,
      },
      process: {
        heading: "Process",
        body: `I reframed the design problem: this wasn't a form redesign challenge. It was a mental model alignment challenge. Merchants weren't confused by the interface — they were confused by the conceptual model the interface was asking them to adopt.`,
        subsections: [
          {
            heading: "Resequencing by Mental Model",
            body: `I reorganized the 14 steps not by data type (as the original was structured) but by the merchant's natural narrative: "Tell us about your business" → "Tell us about yourself" → "Tell us how you want to get paid." This required no changes to collected data — only the grouping and ordering changed.`,
          },
          {
            heading: "Progressive Trust Building",
            body: `I introduced a "save and return" pattern at every step, with a persistent progress indicator that showed merchants their current completion state even after returning days later. The insight: many drop-offs weren't abandonment — they were document-gathering pauses.`,
          },
          {
            heading: "Plain Language Translation",
            body: `Working within the legal team's constraints, I created a tooltip layer that translated regulatory terminology into plain English without modifying the field labels. "Beneficial owner" became "People who own 25%+ of your business" in the help text.`,
          },
        ],
      },
      outcome: {
        heading: "Outcome",
        body: `Drop-off at the beneficial ownership step fell from 62% to 19%. Overall onboarding completion rate improved from 38% to 67%. Average time-to-first-transaction decreased from 5.2 days to 2.1 days. The product team subsequently used this framework to redesign two other high-drop-off flows.`,
      },
      takeaways: {
        heading: "Key Takeaways",
        body: `When you can't change what you collect, change the narrative frame around it. The most impactful design decisions in regulated products often happen at the information architecture level — not the visual layer. This project reinforced that form friction is rarely about the form itself; it's about the conceptual gap between the user's mental model and the system's model.`,
      },
    },
  },

  {
    slug: "hulu-account",
    title: "Hulu Account Unification",
    description:
      "Building the token layer and component library that unified four product teams shipping in parallel.",
    tags: ["Design Systems", "Leadership", "Tokens"],
    year: "2022",
    role: "Design Systems Lead",
    company: "Figma",
    timeline: "~8 Months",
    team: "Multi-team",
    platform: "Web / Multi-platform",
    thumbnail: "/thumbnails/hulu-account.mp4",
    poster: "/thumbnails/hulu-account-poster.jpg",
    caseStudy: {
      overview:
        "A foundational design system built from scratch to replace three divergent component libraries across four product teams, enabling consistent and accelerated shipping.",
      problem: {
        heading: "Problem",
        body: `After a series of acquisitions, the company was operating with three distinct Figma component libraries and four engineering codebases — none of which were compatible. Design debt was measured not in screens but in organizational friction: designers from different teams couldn't review each other's work without mental translation. Engineers were rebuilding the same button in four flavors.`,
      },
      context: {
        heading: "Context",
        body: `I was brought in six months after the acquisitions to lead the unification effort. The business context was high-stakes: a major product launch was planned for Q2, and four teams needed to ship cohesively despite having never shipped together. I had one other designer and two front-end engineers to build the system.`,
      },
      constraints: {
        heading: "Constraints",
        body: `Teams couldn't pause feature work to migrate to a new system — adoption had to be gradual and backwards-compatible. The token system had to support three distinct brand expressions (the acquired products maintained separate brand identities at the surface layer). The system had to be maintained by a team of two, so every decision had to favor simplicity over completeness.`,
      },
      process: {
        heading: "Process",
        body: `I started with a component audit — not to catalogue everything, but to identify the 20 components that touched 80% of user-facing surfaces. This became the Phase 1 scope. Everything else was explicitly deferred.`,
        subsections: [
          {
            heading: "Token Architecture",
            body: `I designed a three-tier token system: global (raw values), semantic (role-based aliases), and component (scoped overrides). This allowed different brand expressions to share the same component logic while surfacing different visual personalities through the semantic layer.`,
          },
          {
            heading: "Adoption Strategy",
            body: `Rather than a flag-day cutover, I introduced the system through one team's highest-visibility feature. The visible quality improvement created internal demand — within 8 weeks, all four teams had voluntarily requested onboarding. Pull beats push in systems adoption.`,
          },
          {
            heading: "Documentation as Product",
            body: `I treated the documentation site as a first-class product, not an afterthought. Every component page included decision rationale, not just usage guidance. This reduced Slack questions by approximately 60% and helped new designers onboard faster.`,
          },
        ],
      },
      outcome: {
        heading: "Outcome",
        body: `The Q2 launch shipped on time with four teams producing visually unified work for the first time. Design-to-development handoff time decreased by an estimated 40%. The system became a hiring signal — multiple candidates cited it in interviews as a reason they applied.`,
      },
      takeaways: {
        heading: "Key Takeaways",
        body: `Design systems succeed when they're treated as products with users (your own designers and engineers) and when adoption is earned rather than mandated. The token architecture mattered less than the adoption strategy. A technically perfect system with poor adoption is worse than a simpler one that teams actually use.`,
      },
    },
  },

  {
    slug: "gs-wearable",
    title: "Galactic Starcruiser Wearable",
    description:
      "Designing a GarminOS wearable to replace the MagicBand inside the world's most immersive Star Wars experience — without breaking the fiction.",
    tags: ["Wearable UX", "GarminOS", "Walt Disney Imagineering"],
    year: "2022",
    role: "Design Lead",
    company: "WDI",
    timeline: "8 Weeks",
    team: "Walt Disney Imagineering",
    platform: "GarminOS",
    thumbnail: "/thumbnails/gswearable-home.mp4",
    poster: "/thumbnails/gswearable-home-poster.jpg",
    caseStudy: {
      overview:
        "An 8-week design sprint at Walt Disney Imagineering to replace the MagicBand with a purpose-built GarminOS wearable for the Star Wars: Galactic Starcruiser — replicating full resort functionality through a single-button interface while maintaining in-world visual credibility.",
      problem: {
        heading: "Problem",
        body: `The Star Wars: Galactic Starcruiser relies on total environmental storytelling. The MagicBand — with its bright colors and Mickey branding — was a visible seam in that illusion. Every time a guest tapped their wrist to unlock a cabin door or board a planet excursion, they were reminded they were in a Disney resort, not aboard a Star Wars vessel. The product constraint was blunt: all of MagicBand's functionality had to survive, and none of its aesthetic could.`,
      },
      context: {
        heading: "Context",
        body: `Galactic Starcruiser is not a hotel with a Star Wars theme. It's a purpose-built facility designed to simulate a multi-day voyage aboard a Star Wars spaceship — 3 days and 2 nights, with a scripted narrative that evolves based on guest choices. The MagicBand infrastructure it inherited was built for parks: outdoor, high-footfall environments where bright wristbands help cast members and guests identify each other instantly. Galactic Starcruiser inverted nearly every one of those assumptions. Guests weren't tourists moving through a park — they were crew members living inside a story. The device had to behave accordingly.`,
      },
      constraints: {
        heading: "Constraints",
        body: `Collaborating with Garmin meant building on GarminOS and their existing hardware — which imposed a single-button interface. Every interaction the MagicBand handled through tap-and-scan had to be achievable through that constraint. The device also needed to perform across dramatically different environments: dim, cinematic ship interiors and bright outdoor excursion zones. Screen legibility and interaction reliability couldn't be designed for one context and assumed to work in the other.`,
      },
      process: {
        heading: "Process",
        body: `Rather than treating the single-button interface as a limitation to work around, we treated it as the design premise. If the device could only ever offer one action at a time, then the system — not the guest — had to do the disambiguation work.`,
        subsections: [
          {
            heading: "Embracing the Single-Button Interface",
            body: `Environmental and contextual signals — NFC sensing, location, time-of-day, and guest itinerary state — determined what the device offered at any given moment. Approaching a cabin door surfaced room access. Arriving at the dining hall surfaced check-in. The guest's next scheduled story beat quietly pre-loaded the relevant interaction. The goal was to reduce the choices presented at any moment to zero or one.`,
          },
          {
            heading: "Designing for the Star Wars Visual Language",
            body: `The screen UI had to feel like it belonged to the world — not to Garmin, and not to Disney parks. Design references were drawn from in-universe ship interfaces and prop design rather than consumer wearable conventions. Typography, iconography, and ambient animations were all evaluated against a single constraint: if this screen appeared on the bridge of a Star Wars vessel, would it look out of place?`,
          },
          {
            heading: "Coordination Across the Experience Layer",
            body: `Working within Imagineering's existing hospitality and narrative infrastructure meant aligning with teams building the room systems, dining experience, and live entertainment layer simultaneously. Device behavior had to be synchronized with story beats the guest hadn't reached yet — which required close coordination with the narrative design team to ensure the wearable never got ahead of, or behind, the story.`,
          },
        ],
      },
      outcome: {
        heading: "Outcome",
        body: `The Star Wars Galactic Starcruiser Chronometer launched with the experience in 2022. The device replicated the full functionality of MagicBand 2.0 — room access, dining, character interactions, excursion boarding — through a screen and single-button interface, while maintaining the visual credibility of an in-world prop. No Mickey branding. No bright plastic. A wrist-worn piece of Star Wars hardware that guests wore as part of the story, not despite it.`,
      },
      takeaways: {
        heading: "Key Takeaways",
        body: `Hardware constraints aren't always the enemy of good interaction design — sometimes they're the premise. The single-button interface forced a rigorous prioritization of what the device needed to communicate at any moment, and pushed complexity into the environmental layer rather than onto the user. The result was a device that felt simpler to operate than the MagicBand it replaced, despite doing more. Designing for immersion also clarified something broader: when the context is the product, every detail either serves the fiction or breaks it. There's no neutral.`,
      },
    },
  },


  {
    slug: "global-payments",
    title: "Global Payment Templates",
    description:
      "Building a scalable payment template system for Disney+ across 30+ markets — so every team could ship locally without rebuilding from scratch.",
    tags: ["Product Design", "Strategy", "Global Framework"],
    year: "2024 - 2026",
    role: "Lead Product Designer",
    company: "Disney+",
    timeline: "~18 Months",
    team: "Disney+ / The Walt Disney Company",
    platform: "Web / Mobile App",
    thumbnail: "/thumbnails/global-payments.mp4",
    poster: "/thumbnails/global-payments-poster.jpg",
    caseStudy: {
      overview:
        "A global payment template system that standardized subscription acquisition, upgrade, and recovery flows for Disney+ and Hulu across 30+ markets — reducing per-market engineering lift from 6 weeks to under 2, while keeping local compliance requirements intact.",
      problem: {
        heading: "Problem",
        body: `Disney+ operates in over 100 markets. Each expansion had, over time, produced a different payment flow — different layouts, different disclosure patterns, different error states. Some markets had flows built by local teams, others by contractors, a few by the core platform team. The result was a patchwork: inconsistent conversion rates across comparable markets, compliance reviews that couldn't scale because reviewers were evaluating bespoke implementations one at a time, and engineers rebuilding the same payment screen logic from scratch for every new launch. With a major expansion into Southeast Asia and LATAM planned for 2025, the infrastructure for how payment flows were built and governed had to change.`,
      },
      context: {
        heading: "Context",
        body: `I came into this work about 6 months into my time at Disney+, after spending time on account and retention flows and building a clearer picture of how payment decisions rippled downstream. The payments team sat at the intersection of product, engineering, legal, finance, and regional market teams — a stakeholder surface area that was wide enough to make "just ship a better flow" a non-answer. The real problem wasn't any single market's UX. It was the absence of a shared foundation that could flex to local requirements without fragmenting every time.`,
      },
      constraints: {
        heading: "Constraints",
        body: `Payment UI is heavily regulated. PCI DSS compliance, regional consumer protection laws, mandatory disclosure formats, and local language requirements varied meaningfully across markets — and were not optional. Any template system had to accommodate structural variation (some markets require upfront price breakdowns; others mandate cancellation notices at the point of purchase) without treating those variations as exceptions to be bolted on after the fact. The system also had to be adoptable by market teams who operated with limited design resources and had no appetite for a disruptive migration. And it had to reduce engineering time-to-launch, not just produce better-looking screens.`,
      },
      process: {
        heading: "Process",
        body: `I started by auditing payment implementations across 12 existing markets, looking not just at visual inconsistency but at structural variation. What I found was that most of the divergence wasn't arbitrary — it traced back to three variables: the payment context (acquisition vs. upgrade vs. recovery), local regulatory requirements, and the payment methods in market. That framing became the architecture.`,
        subsections: [
          {
            heading: "From Components to Contexts",
            body: `The insight that unlocked the template system was reframing the unit of standardization. Componentizing buttons and form fields was useful but insufficient — what varied market-to-market was structural: which disclosures appeared, in what order, and under what conditions. I defined three payment contexts (acquisition, plan change, recovery/retry) that accounted for 90%+ of all payment surface area. Templates were built around contexts, not components. This meant structural variation could live inside the template as configurable slots rather than as forked implementations.`,
          },
          {
            heading: "Compliance by Design",
            body: `Working with legal and finance, I mapped every mandatory market disclosure to a design token in the template spec. Disclosures that were legally required in all markets were locked at the template level. Disclosures that varied by market lived in a configuration layer that local teams owned. This made compliance review dramatically faster: reviewers could validate the template spec once, then confirm only that local configurations were within bounds — rather than reviewing each market's full implementation from scratch.`,
          },
          {
            heading: "Global-to-Local Handoff",
            body: `I designed a two-layer ownership model. The global template layer — owned by the core payments team — held structural logic, accessibility requirements, and locked disclosures. The local configuration layer — owned by market teams — held language, payment method illustrations, market-specific disclosures, and regional pricing display rules. Market teams could customize their experience without touching template logic. Template updates propagated automatically to all markets unless a market had an explicit override — a pattern borrowed from design token cascades.`,
          },
        ],
      },
      outcome: {
        heading: "Outcome",
        body: `The template system shipped to 12 initial markets in Q1 2025, with the remaining markets migrating through mid-year. Engineering time to implement a new market payment flow dropped from 6–8 weeks to 10–12 days. Design-to-compliance review time fell from 3 weeks to 4 days. Conversion rates in the first wave of template-launched markets improved an average of 11% compared to prior implementations — attributed primarily to more consistent error recovery and clearer price disclosure. The system is now the standard for all Disney+ and Hulu payment surface launches globally.`,
      },
      takeaways: {
        heading: "Key Takeaways",
        body: `Template systems work when they encode decisions about what can vary and what can't — and when that encoding is grounded in real compliance and engineering constraints rather than design preference alone. The payment context framing (anchoring templates to user intent: acquiring, changing, recovering) made the system more resilient than a component-first approach would have been, because user intent is stable across markets even when visual and legal requirements aren't. The two-layer ownership model turned out to be the critical adoption mechanism: market teams felt ownership of their local experience, and the core team maintained governance without becoming a bottleneck. Every structural decision we locked at the template level became a scaling advantage. Every one we left open became a future compliance risk.`,
      },
    },
  },
];
