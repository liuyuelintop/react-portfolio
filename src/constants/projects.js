import { projectImages } from "./assets";

export const PROJECTS = [
  {
    title: "MoneyGuard AI Finance Pipeline",
    image: projectImages.careerChatbot,
    roleFit: "AI workflow reliability, privacy boundaries and TypeScript validation.",
    description: {
      summary:
        "A multi-LLM wage-audit pipeline that turns timecard images into validated financial reports instead of trusting raw model output.",
      detailed:
        "This project is strongest as an engineering-judgment case study: Gemini Vision and DeepSeek produce candidate OCR/analysis output, but TypeScript and Zod validation, local deterministic calculations, masking, retry/backoff and throttling make the workflow safer to use.",
      features: [
        "Extracts timecard data with Gemini Vision and validates AI output with TypeScript and Zod",
        "Computes burn rate, surplus and hours-to-spend locally instead of outsourcing sensitive calculations",
        "Masks income and personal asset data in memory before external AI calls",
        "Uses retry/backoff and timestamp throttling to avoid HTTP 429 failures during high-frequency updates",
      ],
    },
    evidence: [
      "Structured LLM output validation",
      "Privacy-first data boundary",
      "Fault-tolerant API integration",
    ],
    technologies: {
      main: ["TypeScript", "Node.js", "Gemini LLM", "DeepSeek LLM"],
      additional: ["Zod", "Telegram Bot API", "Async Pipelines", "Privacy Design"],
      others: ["OCR", "Rate Limiting", "Structured LLM Outputs"],
    },
    year: "2026",
  },
  {
    title: "Production AI Agent System",
    image: projectImages.nextCodeCraft,
    roleFit: "Serverless AI architecture, repeatable infrastructure and observability.",
    description: {
      summary:
        "A cloud-deployed multi-agent AI architecture provisioned with Terraform and AWS Lambda.",
      detailed:
        "This case study shows cloud maturity around AI systems: repeatable infrastructure, serverless execution, deployment automation and lifecycle observability rather than a local-only AI demo.",
      features: [
        "Built and deployed a multi-agent AI architecture on AWS Lambda",
        "Provisioned infrastructure with Terraform for repeatable cloud environments",
        "Integrated observability for agent behaviour, state transitions and LLM tracing",
        "Configured GitHub Actions delivery workflows for reliable deployments",
      ],
    },
    evidence: [
      "Infrastructure as Code",
      "Agent lifecycle tracing",
      "Serverless deployment path",
    ],
    technologies: {
      main: ["Terraform", "AWS Lambda", "Amazon Bedrock", "GitHub Actions"],
      additional: ["Serverless", "Observability", "Infrastructure as Code", "LLM Tracing"],
      others: ["Agentic Workflows", "Cloud Automation"],
    },
    year: "2026",
  },
  {
    title: "Melbourne University Ultimate Club Platform",
    image: projectImages.melbUniUltimate,
    roleFit: "Local product ownership, community workflows and maintainable Next.js delivery.",
    description: {
      summary:
        "An open-source Next.js 15 platform for sports club management, player stats and community engagement.",
      detailed:
        "This project shows practical product thinking: it translates a real local community need into maintainable workflows for events, announcements, player statistics and responsive dashboards.",
      features: [
        "Architected a modular open-source template for sports club management",
        "Implemented player statistics tracking, events, announcements and community workflows",
        "Used Next.js 15 server-side logic and optimized layouts for multi-device dashboards",
        "Designed a maintainable base that can be adapted by other clubs and teams",
      ],
    },
    evidence: [
      "Local stakeholder context",
      "Responsive dashboard UI",
      "Reusable product template",
    ],
    url: "https://melb-uni-ultimate.vercel.app",
    technologies: {
      main: ["Next.js 15", "TypeScript", "Tailwind CSS", "Open Source"],
      additional: ["shadcn/ui", "MongoDB", "Responsive UI", "Vercel"],
      others: ["Club Management", "Player Statistics"],
    },
    year: "2026",
  },
];

export const SUPPORTING_PROJECTS = [
  {
    title: "SaaS IDE Platform",
    summary: "Next.js IDE-style product with auth, payments, snippets and real-time collaboration concepts.",
    whyItMatters: "Shows SaaS product thinking beyond a static portfolio.",
    url: "https://codecraft.liuyuelin.dev/",
    stack: ["Next.js", "Convex", "Clerk", "Webhooks", "Lemon Squeezy"],
  },
  {
    title: "Remote Interview Platform",
    summary: "Technical interview workflow with coding environment, video/audio and candidate review flows.",
    whyItMatters: "Relevant to collaborative tooling, dashboards and workflow-heavy SaaS.",
    url: "https://codeinterview.liuyuelin.dev/",
    stack: ["Next.js", "Stream", "Convex", "Clerk", "shadcn/ui"],
  },
  {
    title: "ApeUni FIB Extractor Monorepo",
    summary: "Browser automation toolkit packaged as both a Tampermonkey userscript and Chrome extension.",
    whyItMatters: "Shows practical automation, packaging and monorepo delivery.",
    url: "https://github.com/liuyuelintop/apeuni-fib-extractor-monorepo",
    stack: ["JavaScript", "TypeScript", "Chrome Extension", "ESBuild"],
  },
  {
    title: "Next Markdown Blog",
    summary: "Technical writing platform with MDX, syntax highlighting, SEO and static content workflows.",
    whyItMatters: "Shows documentation mindset and content infrastructure.",
    url: "https://blog.liuyuelin.dev/",
    stack: ["Next.js", "MDX", "Velite", "Tailwind CSS", "Vercel"],
  },
];
