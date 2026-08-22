export const HERO_CONTENT = {
  name: "Yuelin Liu",
  resumeUrl: "/resume/yuelin-liu-resume.pdf",
  eyebrow: "Melbourne · Full-Stack Developer · AI & LLM Applications",
  headline:
    "I build reliable full-stack software, with a focus on AI/LLM applications and developer tools.",
  summary:
    "I work across product UI, APIs, authentication, data workflows and model-integrated features—turning messy requirements into reliable software.",
};

export const CONTACT = {
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
        "Built MoneyGuard around a real wage-checking workflow, separating model-assisted extraction from deterministic calculations.",
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
        "Schema-validated MoneyGuard OCR output with Zod before deterministic wage calculations consume it.",
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
