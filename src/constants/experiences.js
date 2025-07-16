export const EXPERIENCES = [
  {
    period: "Mar 2025 – Present",
    role: "Full-Stack Developer (Core Engineer)",
    company: {
      name: "ByteCroniX",
      url: "#",
    },
    type: "Full-time",
    highlights: [
      "Brought Co-PR (10+ Docker microservices & Next.js 15) from prototype to GKE staging in four months—powered first live demos and stakeholder feedback loops.",
      "Owned Auth, Portal-BFF & Core API services; architected Express REST endpoints, ramping test coverage from 55% to 90% and cutting CI feedback cycles by 3×.",
      "Halved staging-to-production rollout times (4 h → 1.5 h) with GitLab CI/CD–driven Docker-to-Kubernetes blue-green deployments.",
      "Engineered NGINX reverse-proxy & load-balancing strategy to sustain 99.9% uptime under 10× peak load scenarios.",
      "Standardised shared controller contracts for Web, iOS & Android clients—reducing cross-platform integration bugs by 45%.",
      "Authored 12+ Confluence runbooks and custom CLI tooling to unblock dev teams, boosting sprint velocity by 20%.",
    ],
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs"],
      architecture: ["Clean Architecture", "BFF Pattern", "Microservices"],
      devops: ["Docker", "Kubernetes", "GitLab CI/CD", "Blue-Green Deployments"],
      tools: ["Git", "Swagger", "Postman", "Jira", "Confluence", "Slack"],
    },
  },
  {
    period: "Jun 2023 – Oct 2024",
    role: "Graduate Full-Stack Developer",
    company: {
      name: "Expresso Carwash Pty Ltd",
      url: "#",
    },
    type: "Part-time",
    highlights: [
      "Collaborated with stakeholders to translate business needs into 10+ technical epics, each delivered within 1-week sprints.",
      "Built a responsive React SPA with Tailwind CSS, increasing mobile bookings by 60% and reducing bounce rate by 25%.",
      "Optimised global state with Redux Toolkit & custom React hooks—cutting redundant renders by 50% and smoothing page transitions.",
      "Authored secure RESTful endpoints in Node.js/Express for booking, payment & auth flows—achieving 100% audit compliance in QA.",
      "Implemented unit tests (Jest) and API smoke tests (Postman), elevating release confidence and reducing post-release bugs by 70%.",
    ],
    techStack: {
      frontend: ["React", "JavaScript", "Redux Toolkit", "Tailwind CSS"],
      backend: ["Node.js", "Express", "REST APIs"],
      testing: ["Jest", "Postman"],
    },
  },
  {
    period: "Sep 2019 – Feb 2021",
    role: "Web Developer",
    company: {
      name: "Shanghai Anling Computer Technology Co., Ltd",
      url: "#",
    },
    type: "Full-Time",
    highlights: [
      "Led the implementation of a dynamic product gallery and mobile-responsive layouts using JavaScript, HTML5 & CSS3—raising session duration by 40%.",
      "Reengineered legacy PHP and Ruby on Rails endpoints to support AJAX-driven features, cutting API response times by 25%.",
      "Integrated MySQL data sources for real-time inventory updates, reducing out-of-stock errors by 50%.",
      "Built an in-house Chinese localization module that streamlined UI translation workflows by 70%.",
      "Partnered with QA to triage and resolve cross-browser bugs, improving front-end stability and cutting post-release issues by 30%.",
    ],
    techStack: {
      frontend: ["JavaScript", "HTML5", "CSS3"],
      backend: ["PHP", "Ruby on Rails"],
      database: ["MySQL"],
      tools: ["Git", "JIRA", "Confluence"],
    },
  },
];
