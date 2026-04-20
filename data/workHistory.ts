// ─── Work History Data ─────────────────────────────────────────
// Edit this file to update your work timeline.

export interface WorkEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  companyType: string; // e.g. "Series B SaaS", "Public Fintech"
  description: string;
  highlights: string[];
}

export const workHistory: WorkEntry[] = [
  {
    id: "disney",
    period: "2024 — Present",
    role: "Lead Product Designer",
    company: "Disney+ Hulu",
    companyType: "Streaming",
    description:
      "Working on payments, account, and retention for Hulu and Disney+ globally. It’s a mix of systems thinking, business strategy, and getting a lot of teams pointed in the same direction.",
    highlights: [
      "Leading a group of designers across multiple areas (and making sure we’re not all solving different problems)",
      "Helped bring MyDisney Wallet to life; one place for payments across the ecosystem",
      "Built out a marketplace strategy for bundles, add-ons, and plan modifiers",
      "Spend a lot of time aligning product, engineering, legal, and leadership so things actually ship",
    ],
  },
  {
    id: "code",
    period: "2023 — 2024",
    role: "Associate Director, Interaction Design",
    company: "Code + Theory (Kettle)",
    companyType: "Agency & Client Services",
    description:
      "Created experiences for T-Mobile, Fear of God, and Warby Parker to name a few. Defined new features enabled by AI that people might not have known they wanted.",
    highlights: [
      "Led end-to-end redesign of Fear of God's commerce flows",
      "Created a strategic roadmap for transitioning T-Mobile's users to a consolidated super app",
      "Managed executive stakeholders and coordinated across multiple teams to ship new features and ensure alignment",
      "Helped grow the team and mentored designers, building their execution and presentation skills",
    ],
  },
  {
    id: "teague",
    period: "2022 — 2023",
    role: "Associate Design Director",
    company: "Teague",
    companyType: "Agency & Client Services",
    description:
      "Designed interfaces for space. Which, turns out, has very little room for confusion.",
    highlights: [
      "Worked on systems for Axiom Space’s station",
      "Translated NASA requirements into something usable (and safe)",
      "Collaborated with engineers and astronauts, learned a lot, and asked a lot of questions",
    ],
  },
  {
    id: "frog",
    period: "2021 — 2022",
    role: "Associate Design Director",
    company: "frog",
    companyType: "Agency & Client Services",
    description:
      "Led projects for clients like Nike, Netflix, and Progressive. Mostly focused on launching financial products from scratch, quickly (and figuring things out as we went).",
    highlights: [
      "Took multiple products from 0→1 in a matter of weeks",
      "Worked across strategy, design, and delivery; whatever was needed to keep things moving",
      "Ran research to pressure test ideas before they got too expensive",
    ],
  },
  {
    id: "imagineering",
    period: "2017 — 2020",
    role: "Design Lead",
    company: "Walt Disney Imagineering",
    companyType: "Entertainment",
    description:
      "Worked on large-scale experiences where digital meets physical, and everything has to work together.",
    highlights: [
      "Led projects that involved a lot of moving parts and even more stakeholders",
      "Designed across interfaces, environments, and systems",
      "Helped creative, engineering, and leadership stay aligned (most of the time)",
    ],
  },
  {
    id: "r&d",
    period: "2016",
    role: "Research & Development Designer",
    company: "Walt Disney Imagineering",
    companyType: "Entertainment",
    description:
      "Experimented with new ways to design things before they exist.",
    highlights: [
      "Built VR tools to help visualize spaces and experiences earlier",
      "Prototyped ideas that blended hardware, software, and storytelling",
      "Mostly asked “what if we tried this?”",
    ],
  },
  {
    id: "artime",
    period: "2014 — 2015",
    role: "Web Designer",
    company: "Artime Group",
    companyType: "Entertainment",
    description:
      "Cut my teeth learning how sites and apps were made.",
    highlights: [
      "Designed and built websites for a mix of clients",
      "Worked closely with developers and figured out what’s possible (and what isn’t)",
      "Built the foundation for everything I do now",
    ],
  },
];
