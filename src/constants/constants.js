export const HERO_CONTENT = {
  name: "Yuelin Liu",
  resumeUrl: "/resume/yuelin-liu-resume.pdf",
  eyebrow: "Melbourne Full-Stack Software Engineer",
  headline:
    "I turn messy operational workflows into usable React/Node products.",
  summary:
    "My strongest fit is with teams that need practical ownership across product UI, API contracts, authentication, cloud delivery and AI-assisted workflows.",
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
  intro: "I choose the right level of engineering for the problem.",
  principles: [
    {
      title: "I translate messy workflows into shipped product.",
      statement:
        "I can talk to non-technical stakeholders, map the real workflow, and deliver software people can actually use.",
      evidence: [
        "Digitised Expresso Carwash spreadsheet workflows into a React/Node management portal.",
        "Mapped API integrations, wireframes and SaaS feature scope for Melbourne clients and local sports clubs.",
      ],
    },
    {
      title: "I reduce risk between feature branch and production.",
      statement:
        "I have worked beyond UI screens: APIs, auth, data flows, Docker, Kubernetes, CI/CD and test coverage.",
      evidence: [
        "Maintained 4 Node.js microservices in a GCP/GKE AI SaaS environment.",
        "Added Jest and Playwright coverage so API and UI changes were safer to merge.",
      ],
    },
    {
      title: "I build AI workflows with engineering guardrails.",
      statement:
        "The AI projects are not demos only; they show structured outputs, deterministic validation, privacy boundaries and failure handling.",
      evidence: [
        "Designed a TypeScript/Zod finance engine to validate LLM OCR output before using it.",
        "Added masking, retry/backoff and timestamp throttling to keep AI integrations private and reliable.",
      ],
    },
  ],
  toolbox: [
    {
      label: "Frontend",
      tools: ["React", "Next.js 14/15", "TypeScript", "Tailwind CSS", "Responsive UI"],
    },
    {
      label: "Backend",
      tools: ["Node.js", "Express", "REST APIs", "JWT/OAuth", "PostgreSQL", "MongoDB"],
    },
    {
      label: "Cloud & Quality",
      tools: ["Docker", "Kubernetes", "GitHub Actions", "AWS Lambda", "GCP GKE", "Jest", "Playwright"],
    },
    {
      label: "AI Workflow",
      tools: ["OpenAI SDK", "Gemini", "DeepSeek", "Bedrock", "Structured Outputs", "Zod"],
    },
  ],
};
