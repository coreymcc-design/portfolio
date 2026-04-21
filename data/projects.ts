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
    title: "Axiom Station Crew Interfaces",
    description:
      "Designing mission-critical interfaces for a next-generation space station, built for clarity in extreme conditions.",
    tags: ["Systems Thinking", "Platform Design", "Design Systems", "Emerging Technology", "Accessibility", "Mission-Critical UX"],
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
        "The next generation of space stations won't be operated the same way as the last. Axiom is building a commercial space station to eventually replace the International Space Station. As part of that effort, they partnered with NASA to align on technical and usability standards. I worked with Axiom to design a new system of crew interfaces that modernize how astronauts interact with onboard systems. The goal was to reduce cognitive load, improve clarity, and make these tools more accessible to a broader range of astronauts.",
      problem: {
        heading: "Problem",
        body: `How do you design interfaces for an environment you can't fully simulate, where usability directly impacts safety, and the underlying systems were designed over 30 years ago?`,
      },
      context: {
        heading: "Context",
        body: `Many of the systems on the ISS were built decades ago and reflect the constraints of that time. They're functional, but not always intuitive. At the same time, Axiom's long-term goal is to support a broader, more international group of astronauts — raising the bar for usability, accessibility, and clarity. Designing for this environment introduced a unique set of challenges: microgravity affects vision and fine motor control, the station is loud making communication more difficult, interfaces need to work reliably under mission-critical conditions, and the platform itself was evolving, shifting from tablet-native to a platform-agnostic web-based system. We had to design something modern, without losing the reliability of what came before.`,
      },
      constraints: {
        heading: "Solution",
        body: `We developed a flexible, tablet-first design system and interface model built specifically for spaceflight conditions. The system prioritized high legibility across lighting conditions, large forgiving touch targets to account for movement and motor limitations, intentional use of color to communicate system status, and accessibility standards at AA and AAA levels to reduce the risk of user error. This system became the foundation for a suite of applications, including communications, inventory management, system monitoring, procedures, and experiment tracking. Everything was designed to be clear, consistent, and reliable under pressure.`,
      },
      process: {
        heading: "Process",
        body: `The work required designing for conditions we couldn't fully experience, while a shifting technical platform meant some decisions had to be made and then remade.`,
        subsections: [
          {
            heading: "Starting Without a Clear Environment",
            body: `One of the hardest parts was designing for conditions we couldn't fully experience. We relied heavily on research, astronaut input, and first principles to guide decisions. Early on, we were designing for a tablet-native experience. Midway through, the platform shifted to a web-based system running on a local server, which required rethinking how the system would scale across devices.`,
          },
          {
            heading: "Defining the System",
            body: `I co-led the design system effort, defining principles, accessibility standards, and interaction patterns. We used Material as a starting point, but quickly moved to a more bespoke system tailored to the environment. The system included tokens, components, and detailed usage guidelines, and was used across all applications.`,
          },
          {
            heading: "Designing for Extreme Constraints",
            body: `We made deliberate choices based on the environment: increased spacing and padding for usability in motion, high contrast for changing lighting conditions, reduced reliance on fine motor precision, and clear system status indicators to support quick decision-making.`,
          },
          {
            heading: "Working with Astronauts",
            body: `We worked directly with Axiom astronauts, including Peggy Whitson, through interviews, whiteboarding sessions, and moderated usability testing. Their feedback shaped everything from interaction patterns to information hierarchy. As Michael López-Alegría put it, Axiom is "at an inflection point… allowing non-government astronauts to fly" — that shift made usability and accessibility even more critical.`,
          },
          {
            heading: "Designing the Applications",
            body: `I owned the end-to-end design for the communications and inventory management apps, including flows, states, and interaction patterns.`,
          },
        ],
      },
      outcome: {
        heading: "Results",
        body: `We established a foundational design system for Axiom's future station interfaces and validated designs through direct astronaut testing and feedback. The work was deployed in early testing environments, including SpaceX partnership flights. Interaction patterns for legacy system behaviors were modernized, and qualitative feedback confirmed meaningful improvements to clarity and usability in mission-critical scenarios.`,
        subsections: [
          {
            heading: "Next Steps",
            body: `Continued testing in real and simulated spaceflight environments, expansion of the system across additional onboard applications, and further refinement based on astronaut feedback and mission learnings.`,
          },
        ],
      },
      takeaways: {
        heading: "Takeaways",
        body: `Designing for extreme environments forces clarity in every decision. Accessibility becomes critical when physical conditions change. You can't rely on intuition alone when you can't experience the environment. Systems thinking matters more when the stakes are high. Good design reduces cognitive load so people can focus on what actually matters.`,
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
    title: "Hulu Account Migration & Unification",
    description:
      "A multi-year migration to unify Hulu's account and billing experience onto the Disney+ platform without losing subscribers.",
    tags: ["Platform Design", "Systems Thinking", "Migration & Unification", "Payments", "0→1 & Scale", "Cross-functional Leadership"],
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
        "After the Disney acquisition, Hulu's account and billing systems remained largely untouched for a few years. When we finally started the migration to the Disney+ commerce platform, it wasn't just a redesign. It was a full unification effort across systems, subscription types, and millions of users with very different states. I led design across this initiative, working with product and engineering over a multi-year rollout to bring Hulu onto a shared platform while maintaining continuity for over 20 million subscribers.",
      problem: {
        heading: "Problem",
        body: `How do you migrate tens of millions of users, across a wide range of subscription types and edge cases, onto a new platform without disrupting their experience or risking churn?`,
      },
      context: {
        heading: "Context",
        body: `Hulu had years of legacy systems, plans, and partner integrations that didn't align with the Disney+ commerce stack. Users included direct subscribers, third-party bundles (Spotify, T-Mobile), in-app purchase subscribers (Apple, Google), and users on deprecated plans, payment methods, and promotions. At the same time, there was a clear directive from the business: no user left behind. The migration couldn't break existing experiences or cause subscriber loss. On the product side, this was also an opportunity. Moving to the Disney+ platform unlocked features like add-ons and free trials that hadn't previously existed in the same way.`,
      },
      constraints: {
        heading: "Solution",
        body: `We unified Hulu's account and billing experience onto the Disney+ commerce platform, creating a single system that could support all subscription types while preserving existing user states. This included a full redesign of the account management experience, support for legacy plans, deprecated payment methods, and promotional states, clear handling of complex scenarios like grace periods, holds, and stacked subscriptions, and unified partner activation flows across third-party and direct subscriptions. The goal wasn't just consistency. It was continuity. Users should move to the new system without feeling like anything broke.`,
      },
      process: {
        heading: "Process",
        body: `The work was less like designing something new and more like remodeling an old house. Every time we opened something up, there were surprises.`,
        subsections: [
          {
            heading: "Understanding What We Were Working With",
            body: `We started with ongoing audits of the existing Hulu experience. A lot of institutional knowledge had been lost, so we often had to reverse engineer how things worked.`,
          },
          {
            heading: "Mapping the Full System",
            body: `We documented all subscription permutations across D2C, third-party, and in-app purchase users. This became the foundation for making sure nothing was missed.`,
          },
          {
            heading: "Creating Structure Across Teams",
            body: `I led design strategy and worked closely with product and engineering to define priorities, resourcing, and sequencing across the migration. We also ran a weekly UX working session for over a year and a half — the core space for design, product, and engineering to review work, align on decisions, and move forward together.`,
          },
          {
            heading: "Designing for Edge Cases, Not Just the Happy Path",
            body: `A large part of the work was handling scenarios like deprecated plans and payment methods, promotional states (student, military, etc.), and stacked subscriptions across different channels. The system needed to account for all of it without becoming overwhelming.`,
          },
          {
            heading: "Phased Rollout",
            body: `The migration was executed over multiple phases across more than two years, allowing us to test, learn, and reduce risk as we moved users onto the new platform.`,
          },
        ],
      },
      outcome: {
        heading: "Results",
        body: `We migrated 20M+ subscribers to a unified platform while maintaining continuity under a strict "no user left behind" directive. Consolidating two separate commerce systems reduced operational overhead, and moving to the shared platform unlocked new capabilities like add-ons and free trials. Billing states and account scenarios became meaningfully clearer across the product.`,
        subsections: [
          {
            heading: "Next Steps",
            body: `Continue refining edge case handling as new subscription types are introduced, further align with the Disney+ design system for consistency across products, and build on the unified platform to support future growth and new features.`,
          },
        ],
      },
      takeaways: {
        heading: "Takeaways",
        body: `Large migrations are as much about continuity as they are about improvement. Most of the complexity lives in edge cases, not primary flows. Shared systems reduce long-term cost, even if they increase short-term effort. Alignment across product, design, and engineering is what makes this work possible. Sometimes the job is less about designing something new and more about understanding what already exists.`,
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
      "A framework for launching global payment methods faster, while keeping the experience consistent across regions.",
    tags: ["Platform Design", "Systems Thinking", "0→1 & Scale", "Globalization", "Payments", "Cross-functional Leadership"],
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
        "Launching new payment methods globally sounds straightforward until you actually try to do it. Each market has its own expectations, technical constraints, and legal requirements. Over time, this led to inconsistent experiences and one-off solutions that were hard to maintain and even harder to scale. I led the design of a framework to standardize how payment methods are implemented across Disney+. The goal was simple: make it easier to launch new methods without starting from scratch every time.",
      problem: {
        heading: "Problem",
        body: `How do we support a growing set of global payment methods, each with different requirements, without slowing teams down or creating inconsistent user experiences?`,
      },
      context: {
        heading: "Context",
        body: `Disney+ operates in markets where preferred payment methods vary widely. Supporting those methods is directly tied to conversion and retention. On the backend, integrations with partners like Boku and Adyen were already underway. On the frontend, things were less consistent. Each new payment method required a custom approach, which meant longer timelines and more room for fragmentation. At the time, launching a new method could take anywhere from 8 to 12 weeks.`,
      },
      constraints: {
        heading: "Solution",
        body: `We created a flexible framework based on three core payment flow types. This gave teams a shared model to design and build against, while still allowing for regional differences.\n\nType A: fully on-platform (credit and debit cards)\nType B: redirect flows (PayPal)\nType C: asynchronous flows (Mercado Pago)\n\nInstead of designing each payment method from scratch, teams could map new methods to one of these patterns and adapt from there. It made the work faster, and the experience more consistent.`,
      },
      process: {
        heading: "Process",
        body: `The process was as much about alignment as it was about design. We worked across product, engineering, legal, and regional teams to build something everyone could actually use.`,
        subsections: [
          {
            heading: "Looking for Patterns",
            body: `We started by auditing existing and upcoming payment methods. The goal was to understand where things were consistent and where they weren't.`,
          },
          {
            heading: "Defining the Framework",
            body: `Working with a senior designer, I led the effort to define the three flow types. We focused on covering the majority of use cases without overcomplicating the system.`,
          },
          {
            heading: "Getting Alignment",
            body: `A big part of the work was making sure product, engineering, and design were all aligned. The framework only works if everyone uses it.`,
          },
          {
            heading: "Designing for Global Nuance",
            body: `We accounted for regional differences like legal requirements and cultural expectations. The system needed to be consistent, but not rigid.`,
          },
          {
            heading: "Building with Engineering",
            body: `We partnered closely with engineering as they developed their own templates. This helped ensure what we designed could actually scale in implementation.`,
          },
        ],
      },
      outcome: {
        heading: "Results",
        body: `The framework reduced time to launch from 8–12 weeks to 4–6 weeks and enabled 12 payment methods to launch across 14 countries. Each new method contributed between $2M and $21M in annualized operating income. Experiences became more consistent across regions, and designers gained more time to focus on new problems instead of repeating the same work.`,
        subsections: [
          {
            heading: "Next Steps",
            body: `We're continuing to evolve the framework to handle more complex regional requirements, like tax information collection. We're also working with the design systems team to translate these patterns into more flexible Figma components using slots.`,
          },
        ],
      },
      takeaways: {
        heading: "Takeaways",
        body: `Systems make it easier to move faster without losing consistency. A shared model is more valuable than a set of one-off solutions — and a lot of design problems are really alignment problems. Constraints aren't the blocker, they're the work. The goal isn't to remove complexity, it's to make it manageable.`,
      },
    },
  },
];
