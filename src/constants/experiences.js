export const EXPERIENCES = [
  {
    period: "Sep 2025 - Present",
    role: "Freelance Full-Stack Developer & Consultant",
    company: {
      name: "Independent Practice",
      url: "#",
    },
    location: "Melbourne, Australia · Hybrid",
    type: "Freelance",
    highlights: [
      "Architected and delivered responsive, production-ready SaaS features using Next.js 15 App Router structures, improving frontend performance and SEO readiness.",
      "Conducted technical discovery, application wireframing and API integration mapping to digitise legacy workflows for Melbourne-based commercial clients and local sports clubs.",
      "Implemented secure user authentication and serverless data storage layers with Clerk OAuth and Convex for fast-moving product builds.",
    ],
    techStack: {
      frontend: ["Next.js 15", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Server Actions", "REST APIs", "Convex"],
      auth: ["Clerk", "OAuth", "Role-Based Access"],
      delivery: ["Vercel", "GitHub Actions", "SEO", "Responsive UI"],
    },
  },
  {
    period: "Mar 2025 - Aug 2025",
    role: "Full-Stack Developer",
    company: {
      name: "ByteCroniX - AI SaaS Platform",
      url: "#",
    },
    location: "Melbourne, Australia · Hybrid",
    type: "Full-time",
    highlights: [
      "Reduced API response time by 81%, from 29s to 5.6s, by optimising data-fetching logic and improving reliability under peak production loads.",
      "Built Node.js/Express microservice features for AI-assisted user pathways using OpenAI function calling, directly increasing user form completion rates.",
      "Maintained 4 core Node.js microservices in a GCP/GKE environment supporting secure authentication and internal data processing flows.",
      "Optimised CI/CD pipelines with GitHub Actions, Docker and Kubernetes to support near-zero-downtime releases.",
      "Improved release confidence by adding Jest and Playwright coverage, achieving 90% PR test coverage for API and UI changes.",
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "REST APIs", "OpenAI Function Calling"],
      architecture: ["Microservices", "Authentication", "Internal Data Flows"],
      devops: ["Docker", "Kubernetes", "GCP GKE", "GitHub Actions"],
      testing: ["Jest", "Playwright", "API Testing", "Regression Testing"],
    },
  },
  {
    period: "Mar 2024 - Oct 2024",
    role: "Full-Stack Developer",
    company: {
      name: "Expresso Carwash Pty Ltd",
      url: "#",
    },
    location: "Melbourne, Australia",
    type: "Commercial Project",
    highlights: [
      "Built a full-stack React and Node.js management portal that digitised legacy spreadsheet workflows, saving approximately 6 hours per week per site.",
      "Designed and scaled REST API endpoints and MongoDB/PostgreSQL schemas to handle operational records, users and reporting workflows.",
      "Implemented secure role-based access control using JWT and Google OAuth, aligning data access with internal admin and staff hierarchy.",
      "Containerised services with Docker and built GitHub Actions pipelines to automate deployments, eliminating manual server updates.",
      "Collaborated directly with non-technical stakeholders to translate operational requirements into intuitive dashboard features.",
    ],
    techStack: {
      frontend: ["React", "JavaScript", "Tailwind CSS", "Dashboard UI"],
      backend: ["Node.js", "Express", "REST APIs", "JWT"],
      databases: ["MongoDB", "PostgreSQL"],
      devops: ["Docker", "GitHub Actions", "Automated Deployments"],
      collaboration: ["Stakeholder Workshops", "Requirement Mapping"],
    },
  },
];
