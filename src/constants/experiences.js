export const EXPERIENCES = [
  {
    period: "Sep 2025 - Present",
    role: "Independent Developer",
    company: {
      name: "Prospective Client Demos for a Melbourne Consultancy",
      url: "#",
    },
    location: "Melbourne, Australia",
    highlights: [
      "Build demonstration applications for prospective clients, including a specialty coffee retailer and a drone training provider, translating informal briefs into working prototypes for business pitches.",
      "Implement authenticated, database-backed prototypes with Next.js 15 App Router, Clerk OAuth and Convex as requirements become clearer.",
    ],
    techStack: {
      frontend: ["Next.js 15 App Router"],
      auth: ["Clerk OAuth"],
      backend: ["Convex"],
    },
  },
  {
    period: "Mar 2025 - Jun 2025",
    role: "Full-Stack Developer",
    company: {
      name: "ByteCroniX — Early-Stage AI SaaS",
      url: "#",
    },
    location: "Melbourne, Australia",
    highlights: [
      "Implemented OpenAI function-calling flows in a Node.js/Express codebase for AI-assisted product interactions.",
      "Added timing instrumentation to an inherited points-summary path and identified current/proposed scoring services as the dominant latency contributors.",
      "Profiled an inherited points-summary pipeline and parallelised independent service calls, reducing an observed local integration-test response from 26.7s to 5.6s.",
    ],
    techStack: {
      backend: ["Node.js", "Express", "OpenAI Function Calling"],
      testing: ["Docker/Postman Integration Testing"],
    },
  },
];
