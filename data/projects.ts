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
    tags: ["Platform Design", "Systems Thinking", "Design Systems", "Emerging Tech"],
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
    title: "T-Mobile Contextual App Home",
    description:
      "A personalized home experience that replaced generic upsells with relevant, context-driven actions.",
    tags: ["Platform Design", "Personalization", "Research & Strategy", "Systems Thinking"],
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
        "The T-Mobile app home was doing what many app homes do. It tried to sell. The problem was it wasn't very good at it. Users were seeing multiple offers they weren't eligible for, while struggling to find basic information about their account. I led the redesign of the home experience to make it more useful, more relevant, and ultimately more valuable to both users and the business.",
      problem: {
        heading: "Problem",
        body: `How do you design a home experience that balances business goals with user needs, when the current experience is overloaded with irrelevant promotions?`,
      },
      context: {
        heading: "Context",
        body: `The existing home screen was largely static and marketing-driven. Most users saw a mix of 5 to 7 upsell cards, many of which didn't apply to them. At the same time, T-Mobile's broader strategy was moving toward a unified "super app." The home screen needed to evolve into something more foundational — not just a place to promote offers, but a place users actually return to. Research and care center data made things clear: users primarily wanted to understand their account status, common actions included reviewing bills, making payments, and checking usage, and support calls were often driven by confusion around these basics. There was also real tension. Marketing drove the business, and reducing upsell surface area required strong alignment and clear rationale.`,
      },
      constraints: {
        heading: "Solution",
        body: `We designed a dynamic home experience that prioritizes utility first, then layers in personalization and upsell. At the core is a system of contextual cards that adapt based on user data — billing cycle and payment status, plan and usage information, eligibility for upgrades or offers, and customer behavior and lifecycle. Instead of showing every possible offer, the experience surfaces clear account status and key actions upfront, alongside a smaller number of relevant, personalized opportunities. Before, users saw a feed of promotions. After, they see what matters to them, with the option to act.`,
      },
      process: {
        heading: "Process",
        body: `The work required grounding business goals in user reality, then building the alignment and systems needed to sustain the shift.`,
        subsections: [
          {
            heading: "Understanding What Users Actually Needed",
            body: `We partnered with user research and care teams to analyze top call drivers and common behaviors. This grounded the work in real user needs, not assumptions.`,
          },
          {
            heading: "Defining Experience Principles",
            body: `I established principles and guardrails to prevent the experience from slipping back into a marketing-heavy surface. This was critical for maintaining focus over time.`,
          },
          {
            heading: "Balancing Business and User Needs",
            body: `A large part of the work was aligning with stakeholders. Reducing upsell required demonstrating that relevance drives better outcomes than volume. User research helped validate that less noise improved perception and increased likelihood of engagement.`,
          },
          {
            heading: "Designing a Flexible System",
            body: `We created a component-based system of cards that could adapt to different user states. This included standardized upgrade and offer cards, a highly flexible billing card supporting 30+ states, and clear prioritization of information hierarchy.`,
          },
          {
            heading: "Partnering on Personalization Logic",
            body: `Working closely with product, I helped define how the experience responds to different inputs from the ML system. The goal was to ensure the output felt intentional, not random.`,
          },
        ],
      },
      outcome: {
        heading: "Results",
        body: `The redesign increased engagement with the home experience and reduced calls to customer care related to account confusion. Surfaced content and actions became more relevant, and the work established a scalable foundation for T-Mobile's "super app" strategy.`,
        subsections: [
          {
            heading: "Next Steps",
            body: `Continue refining personalization as more behavioral data becomes available, expand the system across additional areas of the app, and further tune the balance between utility and promotion.`,
          },
        ],
      },
      takeaways: {
        heading: "Takeaways",
        body: `Relevance outperforms volume when it comes to upsell. A home screen should prioritize utility before promotion. Personalization needs structure to feel intentional. Many product problems are actually alignment problems. Good systems make it easier to maintain product quality over time.`,
      },
    },
  },

  {
    slug: "hulu-account",
    title: "Hulu Account Migration & Unification",
    description:
      "A multi-year migration to unify Hulu's account and billing experience onto the Disney+ platform without losing subscribers.",
    tags: ["Platform Design", "Systems Thinking", "Payments", "Leadership"],
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
    title: "Starcruiser Wearable Concept",
    description:
      "A wearable concept designed to replace MagicBand with a fully in-universe Star Wars experience.",
    tags: ["0→1", "Emerging Tech", "Experience Design", "Storytelling"],
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
        "The Star Wars: Galactic Starcruiser was designed to be a fully immersive, multi-day story. Every detail mattered. The problem was that guests were still going to be using MagicBands to unlock doors, make purchases, and navigate their experience. Functionally it worked. Visually, it broke the illusion. I explored a wearable concept that could replace MagicBand with something that felt native to the Star Wars universe, while still supporting all of the same functionality.",
      problem: {
        heading: "Problem",
        body: `How do you preserve the functionality of MagicBand while making it feel like it actually belongs inside the Star Wars universe?`,
      },
      context: {
        heading: "Context",
        body: `Galactic Starcruiser wasn't a typical theme park experience. Guests were part of a story that unfolded over multiple days, with scheduled moments, branching narratives, and live interactions. The wearable needed to support core functionality like room access, payments, and identity, help guide guests through the story without breaking immersion, align with the visual and experiential standards set by Lucasfilm, and work within real hardware constraints through a partnership with Garmin. There's also a less tangible constraint. The line between "this feels like Star Wars" and "this feels like cheap sci-fi" is thin, and mostly instinct.`,
      },
      constraints: {
        heading: "Solution",
        body: `I designed a wearable "chronometer" that blends into the Star Wars universe while extending the functionality of MagicBand through a simple, contextual interface. The device used a small screen paired with a single-button input, contextual interactions driven by itinerary and location, and visual design inspired by in-universe UI patterns rather than modern apps. Instead of navigating menus, guests interacted with the device based on what was happening around them. Unlocking a cabin door, making a purchase, or triggering a moment in the cantina all felt like part of the story, not a separate system layered on top of it.`,
      },
      process: {
        heading: "Process",
        body: `The project required designing for a world first, and a product second — with real hardware constraints shaping every decision along the way.`,
        subsections: [
          {
            heading: "Designing for a World, Not Just a Product",
            body: `This project started with understanding the role of the device in the broader experience. The goal wasn't just utility. It needed to feel like it belonged in the story.`,
          },
          {
            heading: "Working Within (and Around) Constraints",
            body: `I partnered with Garmin to understand hardware and OS limitations. These constraints shaped everything from interaction patterns to visual design. At the same time, I worked closely with Walt Disney Imagineering and Lucasfilm creative leadership to make sure the experience felt authentic.`,
          },
          {
            heading: "Leaning Into a Simple Interaction Model",
            body: `The single-button interface became a defining constraint. Instead of fighting it, I leaned into contextual interactions based on guest itinerary and location. The device surfaces the right action at the right time, rather than asking users to navigate.`,
          },
          {
            heading: "Prototyping Both Function and Feel",
            body: `I built a digital "works-like" prototype using real itinerary data, and a physical "feels-like" prototype with a simple spring-loaded button. This let us test both the interaction model and the physical experience of using the device.`,
          },
        ],
      },
      outcome: {
        heading: "Results",
        body: `We developed a fully interactive prototype demonstrating core functionality and validated contextual interaction patterns for a narrative-driven experience. The concept aligned with internal and Lucasfilm creative expectations for in-universe design, and informed feasibility discussions around cost, scope, and experience impact. The concept was ultimately cut due to cost, alongside other ambitious ideas. In projects like this, that's part of the process.`,
      },
      takeaways: {
        heading: "Takeaways",
        body: `Designing for immersion means removing anything that feels "external." Constraints like a single-button interface can lead to better interaction models. Story can be a primary input to product design, not just a layer on top. Hardware and software need to be designed together to feel cohesive. Not every good idea ships, but it can still shape what does.`,
      },
    },
  },


  {
    slug: "global-payments",
    title: "Global Payment Templates",
    description:
      "A framework for launching global payment methods faster, while keeping the experience consistent across regions.",
    tags: ["Platform Design", "Systems Thinking", "Payments", "Globalization"],
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

  {
    slug: "financial-wellness",
    title: "Financial Wellness Concept",
    description:
      "A behavioral product concept designed to make credit card debt visible, approachable, and manageable.",
    tags: ["0→1", "Behavioral Design", "Research & Strategy", "Experience Design"],
    year: "2019",
    role: "Associate Design Director",
    company: "frog",
    timeline: "12 Weeks",
    team: "frog / Progressive Insurance",
    platform: "Mobile App",
    thumbnail: "/thumbnails/financial-wellness.mp4",
    poster: "/thumbnails/financial-wellness-poster.jpg",
    caseStudy: {
      overview:
        "While at frog, I partnered with Progressive Insurance on an internal incubator exploring new product opportunities. One concept focused on financial wellness. It started broad, but quickly narrowed to something more specific and more urgent: helping people manage credit card debt. This wasn't just a financial problem. It was emotional. People felt overwhelmed, ashamed, and unsure where to start. We set out to design something that could meet them there and help them move forward.",
      problem: {
        heading: "Problem",
        body: `How do you help people take control of credit card debt when the problem is as much emotional as it is financial?`,
      },
      context: {
        heading: "Context",
        body: `Many of the people we spoke to were carrying significant credit card debt — in some cases over $50K. They weren't irresponsible. They were often overwhelmed. They lacked clear mental models for how debt works, and over time it became something they avoided rather than managed. Through 20+ hours of interviews, a few patterns emerged: debt felt abstract and hard to track, shame prevented people from engaging with it directly, small actions felt insignificant so they were often skipped, and there was little understanding of how debt could be managed constructively. We weren't just designing a tool. We were trying to change behavior.`,
      },
      constraints: {
        heading: "Solution",
        body: `We designed a financial wellness concept centered on making debt visible, manageable, and emotionally approachable. At the core was a simple idea: your debt shouldn't feel invisible or overwhelming — it should feel understandable and something you can actively shape. We introduced a system combining real-time debt tracking through Plaid, clear visibility into balances, interest, and spending behavior, daily and weekly nudges to encourage small consistent actions, and educational content designed to build confidence over time. Debt was represented as a living character — "Bob" — whose size reflected the user's total debt. The goal wasn't to eliminate debt overnight. It was to make progress feel tangible and continuous.`,
      },
      process: {
        heading: "Process",
        body: `The work started with the psychology of debt, not the features of a product. That grounding shaped everything that followed.`,
        subsections: [
          {
            heading: "Starting with People, Not Features",
            body: `I led over 20 hours of user interviews focused on the psychology of debt. These were sensitive conversations that required empathy and trust. The goal was to understand not just behaviors, but motivations, fears, and avoidance patterns.`,
          },
          {
            heading: "Finding Leverage Points for Behavior Change",
            body: `We identified that large, abstract goals were ineffective. What worked better were small, repeatable actions that built momentum over time. This shaped the product direction toward nudges, visibility, and incremental progress.`,
          },
          {
            heading: "Defining the Experience Strategy",
            body: `As Associate Design Director, I led the team in shaping the overall product strategy and experience principles. We focused on reducing emotional friction, making information clear and actionable, and encouraging consistency over intensity.`,
          },
          {
            heading: "Designing the System and Interaction Model",
            body: `We built an MVP experience that included debt tracking across accounts, spending insights, reminder systems, and educational modules. Bob, the character representing debt, became central to the experience. His size and behavior reflected the user's financial state, making progress visible in a way that felt immediate.`,
          },
          {
            heading: "Bringing the Experience to Life",
            body: `I designed and animated Bob, creating multiple states that scaled with the user's debt. These were implemented using Lottie to ensure they worked seamlessly in product.`,
          },
        ],
      },
      outcome: {
        heading: "Results",
        body: `We shipped an MVP experience within a 12-week concept cycle, validated a product direction focused on behavioral change and financial wellness, and established a foundation for future features and iteration. The work demonstrated a differentiated approach to financial tools grounded in empathy. The product was released as a beta to explore market viability and was later shelved as part of broader prioritization decisions.`,
      },
      takeaways: {
        heading: "Takeaways",
        body: `Financial problems are often emotional problems first. Behavior change requires small, consistent actions, not big moments. Making abstract systems visible can shift how people engage with them. Tone and voice matter as much as functionality in sensitive domains. Not every product continues, but strong concepts can shape future thinking.`,
      },
    },
  },
];
