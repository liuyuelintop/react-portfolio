export const HERO_CONTENT = {
  name: "Yuelin Liu",
  roles: [
    "Full-Stack Software Engineer",
    "React & Next.js Product Engineer",
    "Node.js API Developer",
    "AI Workflow Builder"
  ],
  summary: `Melbourne-based full-stack software engineer who turns messy operational workflows into usable React/Node products. My strongest fit is with teams that need practical ownership across product UI, API contracts, authentication, cloud delivery and AI-assisted workflows.`,
  highlights: [
    "Product-minded full-stack delivery",
    "React/Next.js frontends with clean component systems",
    "Node.js/Express APIs, auth and data workflows",
    "Docker, Kubernetes and CI/CD deployment ownership",
    "LLM features with validation, privacy and retry guardrails",
    "Melbourne-based with full work rights until Mar 2029",
  ],
  interviewSignals: [
    {
      label: "Best fit",
      value: "Full-stack product teams shipping SaaS, internal tools or AI-enabled workflows",
    },
    {
      label: "Work style",
      value: "Comfortable with ambiguity, stakeholder discovery and end-to-end delivery",
    },
    {
      label: "Local fit",
      value: "Melbourne hybrid/on-site, full Australian work rights until Mar 2029",
    },
  ],
};

export const CONTACT = {
  address: "Melbourne, VIC, Australia",
  phoneNo: "+61 451 690 105",
  email: "liuyuelintop@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/liuyuelintop",
    github: "https://github.com/liuyuelintop",
    blog: "https://blog.liuyuelin.dev/",
  },
};

export const CAREER_SNAPSHOT = {
  eyebrow: "Candidate Positioning",
  headline: "What I can take off your team's plate",
  summary:
    "My value is not one isolated metric. I am useful when a team needs someone who can clarify the workflow, design the product surface, build the API layer, add quality gates and ship with enough cloud discipline for a small team to trust the result.",
  strengths: [
    {
      title: "I translate messy workflows into shipped product.",
      statement:
        "I can talk to non-technical stakeholders, map the real workflow, and deliver software people can actually use.",
      evidence: [
        "Digitised Expresso Carwash spreadsheet workflows into a React/Node management portal.",
        "Mapped API integrations, wireframes and SaaS feature scope for Melbourne clients and local sports clubs.",
        "Built dashboards and role-based access around operational records, users and reporting workflows.",
      ],
      recruiterRead:
        "Less ramp-up risk for product teams that need someone who can work beyond a ticket queue.",
    },
    {
      title: "I reduce risk between feature branch and production.",
      statement:
        "I have worked beyond UI screens: APIs, auth, data flows, Docker, Kubernetes, CI/CD and test coverage.",
      evidence: [
        "Maintained 4 Node.js microservices in a GCP/GKE AI SaaS environment.",
        "Optimised GitHub Actions, Docker and Kubernetes deployment paths for near-zero-downtime releases.",
        "Added Jest and Playwright coverage so API and UI changes were safer to merge.",
      ],
      recruiterRead:
        "Useful in lean engineering teams where one developer often owns the path from feature branch to deployment.",
    },
    {
      title: "I build AI workflows with engineering guardrails.",
      statement:
        "The AI projects are not demos only; they show structured outputs, deterministic validation, privacy boundaries and failure handling.",
      evidence: [
        "Used OpenAI function calling in Node.js/Express microservice features at ByteCroniX.",
        "Designed a TypeScript/Zod finance engine to validate LLM OCR output before using it.",
        "Added masking, retry/backoff and timestamp throttling to keep AI integrations private and reliable.",
      ],
      recruiterRead:
        "Relevant for teams adding AI without wanting fragile prompt-only systems in production.",
    },
  ],
  interviewHooks: [
    {
      prompt: "Ask me how I would modernise a spreadsheet-heavy workflow.",
      answer: "I would start with users, permissions, data model, failure cases and reporting before choosing UI components.",
    },
    {
      prompt: "Ask me how I keep LLM output safe to use.",
      answer: "I use schemas, local deterministic checks, privacy boundaries, retries and clear fallback states.",
    },
    {
      prompt: "Ask me where I add tests first in a product team.",
      answer: "I start around auth, API contracts, money/data calculations and the highest-risk user path.",
    },
  ],
  targetStack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Playwright",
  ],
};

export const WORKING_STYLE = {
  eyebrow: "How I Work",
  headline: "Pragmatic builder, calm teammate",
  summary:
    "I am more than a stack list. I build useful software with practical judgment, stay effective under pressure and collaborate like someone who understands team execution.",
  pillars: [
    {
      title: "Pragmatic Developer",
      subtitle: "I choose the right level of engineering for the problem.",
      details: [
        "Strongest in the JavaScript, TypeScript, React and Next.js ecosystem.",
        "Prefer clean deployments, maintainable data flows and tools that serve the business goal.",
        "Question over-engineering instead of chasing buzzwords for their own sake.",
      ],
    },
    {
      title: "High Grit and Adaptability",
      subtitle: "I have learned to execute in high-pressure environments.",
      details: [
        "Balanced a Master of IT, freelance development and demanding service work.",
        "Comfortable switching context, communicating quickly and finishing under pressure.",
        "Not fragile when priorities change or the path is ambiguous.",
      ],
    },
    {
      title: "Competitively Collaborative",
      subtitle: "I bring team-first energy into engineering work.",
      details: [
        "Ultimate Frisbee shaped how I think about positioning, communication and trust.",
        "I care about moving the team forward, not just completing my own ticket.",
        "Useful in product teams where code quality and collaboration both matter.",
      ],
    },
  ],
  introOptions: [
    {
      label: "Product-focused version",
      headline: "I build clean, efficient web applications that solve real-world problems without over-engineering.",
    },
    {
      label: "Team-fit version",
      headline: "Technical expertise meets real-world execution.",
    },
  ],
};
