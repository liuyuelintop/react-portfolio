export const HERO_CONTENT = {
  name: "Yuelin Liu",
  resumeUrl: "/resume/yuelin-liu-resume.pdf",
  eyebrow: "Melbourne · Software Engineer · Full-stack, Backend & AI",
  headline:
    "I build full-stack tools with clear workflows and dependable data boundaries.",
  summary:
    "My work spans self-hosted applications, deterministic finance tools and AI integrations. I design the workflow, build the UI and backend, and test what happens when requests or assumptions fail.",
};

export const CONTACT = {
  intro: "Based in Melbourne and open to junior and early-career software engineering, full-stack, backend and AI implementation roles in Australia. Email me for role details or to discuss the engineering behind these projects.",
  address: "Melbourne, VIC, Australia",
  phoneNo: "+61 451 690 105",
  email: "liuyuelintop@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/liuyuelintop/",
    github: "https://github.com/liuyuelintop",
    blog: "https://blog.liuyuelin.dev/",
  },
};

export const HOW_I_BUILD = {
  intro:
    "I make the workflow concrete, measure what is actually happening, and turn fragile assumptions into explicit checks.",
  principles: [
    {
      title: "I start with the workflow, not the feature.",
      statement:
        "I turn an unclear problem into a concrete working flow before adding abstraction, polish or extra infrastructure.",
      evidence: [
        "Built prospective-client prototypes for a specialty coffee retailer and a drone training provider from informal business briefs.",
        "Simplified Marshal by removing mandatory AI assessment and approval steps, while retaining evidence permissions and checks at export.",
      ],
    },
    {
      title: "I measure before I optimise.",
      statement:
        "I instrument inherited behaviour, trace where time or state is actually going, and change the smallest layer that explains the problem.",
      evidence: [
        "Instrumented ByteCroniX's inherited points-summary path, identified scoring services as the dominant latency contributors, then parallelised independent calls.",
        "Revisited Melbourne Ultimate, traced silent session-role failures to fragmented authentication usage, and centralised session reads behind one database-verified guard.",
      ],
    },
    {
      title: "I turn assumptions into enforceable boundaries.",
      statement:
        "I prefer schemas, explicit write rules and regression checks over relying on UI conventions, model behaviour or code-review memory.",
      evidence: [
        "Restricted Job Search Dispatch drafting to confirmed, permitted evidence and added validation, bounded repair and failure diagnostics before a generated letter replaces saved work.",
        "Turned Melbourne Ultimate authorization and mass-assignment findings into automated regression tests and CI checks.",
      ],
    },
  ],
  toolbox: [
    {
      label: "Product UI",
      tools: ["React 19", "Next.js 15/16", "TypeScript", "Tailwind CSS"],
    },
    {
      label: "APIs & Data",
      tools: ["Node.js", "Express", "REST APIs", "MongoDB", "Convex"],
    },
    {
      // Clerk and NextAuth are named rather than a generic "JWT/OAuth" entry:
      // both trace to work the page already describes. pytest and Playwright
      // were dropped because nothing in the accepted evidence demonstrates them.
      label: "Auth & Delivery",
      tools: ["Clerk OAuth", "NextAuth", "GitHub Actions", "Docker", "Vitest"],
    },
    {
      label: "AI & Validation",
      tools: ["OpenAI Function Calling", "Gemini", "DeepSeek", "Zod"],
    },
  ],
};
