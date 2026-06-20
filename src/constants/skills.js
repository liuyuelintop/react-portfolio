export const CAPABILITY_AREAS = [
  {
    title: "Product UI to API delivery",
    summary:
      "Build the user-facing workflow and the backend contract together so the feature works as a product, not a collection of disconnected screens.",
    canOwn: [
      "React and Next.js interfaces with responsive component structure",
      "Node.js and Express REST APIs with clear request/response contracts",
      "Auth, role-based access and operational data workflows",
    ],
    evidence: [
      "Expresso Carwash management portal for users, records and reporting",
      "Next.js 15 freelance SaaS features with Clerk OAuth and Convex",
      "Melbourne University Ultimate platform with dashboards and club workflows",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Express", "Clerk", "Convex"],
  },
  {
    title: "Reliable AI-assisted workflows",
    summary:
      "Use LLMs where they add value, then wrap them with schemas, deterministic checks, privacy boundaries and fallback behaviour.",
    canOwn: [
      "Structured LLM outputs and validation with TypeScript/Zod",
      "OpenAI/Gemini/Bedrock integrations inside product workflows",
      "Retry, throttling and masking around unreliable external APIs",
    ],
    evidence: [
      "MoneyGuard multi-LLM finance pipeline with local calculations",
      "ByteCroniX OpenAI function-calling microservice features",
      "Production AI agent system with Lambda, Bedrock and observability",
    ],
    stack: ["OpenAI SDK", "Gemini", "DeepSeek", "Bedrock", "Zod", "AWS Lambda"],
  },
  {
    title: "Deployment and release confidence",
    summary:
      "Reduce the distance between a finished feature and a trusted release through tests, CI/CD, containers and pragmatic cloud choices.",
    canOwn: [
      "Dockerised services and GitHub Actions pipelines",
      "GCP/GKE and AWS Lambda deployment paths",
      "Jest, Playwright and API tests around risky user flows",
    ],
    evidence: [
      "Maintained 4 Node.js microservices in a GCP/GKE environment",
      "Optimised Docker and Kubernetes release paths at ByteCroniX",
      "Added Jest and Playwright coverage for API and UI changes",
    ],
    stack: ["Docker", "Kubernetes", "GCP GKE", "AWS", "GitHub Actions", "Jest", "Playwright"],
  },
];

export const TOOLBOX_GROUPS = [
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
];
