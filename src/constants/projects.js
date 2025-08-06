import { projectImages } from "./assets";

export const PROJECTS = [
    {
      title: "Career Chatbot",
      image: projectImages.careerChatbot,
      description: {
        summary: "A personal AI assistant chatbot to act as a digital representative of Yuelin Liu.",
        features: [
          "Acts as a digital representative of Yuelin Liu",
          "Initialized with Yuelin's professional information from a summary.txt file and a linkedin.pdf",
          "Interactive and helpful to visitors on a website",
          "Can answer questions about Yuelin's career, skills, and background",
          "Records questions it cannot answer",
          "Records contact details if a user wishes to get in touch",
          "Uses a Gemini model with a toolset for recording functions"
        ]
      },
      url: "https://huggingface.co/spaces/liuyuelintop/career_chatbots",
      technologies: {
        main: ["OpenAI","Agents","Gradio", "Python"],
        others: ["Gemini"]
      }
    },
    {
    title: "Melbourne University Ultimate Frisbee Club",
    image: projectImages.melbUniUltimate, // Add the relevant image to your assets
    description: {
      summary:
        "A modern, open-source web platform for ultimate frisbee clubs. Built for the Melbourne University Ultimate community—ready for your team!",
      features: [
        "Beautiful, modern UI with Tailwind, shadcn/ui, and Lucide icons",
        "All-in-one club management: events, announcements, roster, alumni, tournaments, and more",
        "Admin dashboard for easy content and user management",
        "Open source, MIT licensed – ready for your club or team",
        "Easy deploy to Vercel (or your own server)",
        "Role-based access with NextAuth.js (admin/member/public)",
        "Trusted by the Melbourne University Ultimate community"
      ]
    },
    url: "https://melb-uni-ultimate.vercel.app",
    technologies: {
      main: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "MongoDB",
      ],
      others: [
        "Lucide React",
        "Jest",
        "ESLint",
        "Prettier",
        "Husky",
        "Vercel"
      ]
    }
    },
  {
    title: "Netflix Clone",
    image: projectImages.mernNetflixClone,
    description: {
      summary: "Feature-rich video streaming platform clone.",
      features: [
        "JWT authentication system",
        "Dynamic content recommendation engine",
        "Advanced search with actor/film filters",
        "Responsive cross-device UI",
      ],
    },
    url: "https://netwatch.liuyuelin.xyz/",
    technologies: {
      main: ["MERN", "Zustand", "AWS"],
      others: [],
    },
  },
  {
    title: "SaaS IDE Platform",
    image: projectImages.nextCodeCraft,
    description: {
      summary:
        "Next.js IDE inspired by VS Code with real-time collaboration tools.",
      features: [
        "Real-time code editing with multiplayer support",
        "Secure payment gateway integration",
        "Code snippet sharing system",
        "VS Code-like interface customization",
      ],
    },
    url: "https://codecraft.liuyuelin.dev/",
    technologies: {
      main: ["Next.js", "Convex", "Webhooks", "Clerk"],
      others: ["Lemon Squeezy", "SaaS"],
    },
  },
  {
    title: "Remote Interview Platform",
    image: projectImages.nextRemoteInterviewPlatform,
    description: {
      summary:
        "Integrated technical interview solution with coding environment.",
      features: [
        "Real-time video/audio with screen recording",
        "Live code collaboration with OT algorithms",
        "Preloaded coding challenges library",
        "Candidate performance analytics dashboard",
      ],
    },
    url: "https://codeinterview.liuyuelin.dev/",
    technologies: {
      main: ["Next.js", "Stream", "Convex", "Shadcn/ui"],
      others: ["WebRockets API", "Clerk"],
    },
  },
    {
    title: "ApeUni FIB Extractor Monorepo",
    image: projectImages.apeUniFibExtractor,  // make sure you add this asset to your `projectImages`
    description: {
      summary:
        "Unified toolkit for extracting, copying, and exporting “Fill in the Blank” answers from ApeUni practice pages.",
      features: [
        "Accurate extraction for both Reading and Writing FIB questions",
        "SPA navigation support with per-question caching",
        "Modern floating UI for instant copy, preview, and export",
        "Dual output: Tampermonkey userscript & Chrome extension"
      ]
    },
    url: "https://github.com/liuyuelintop/apeuni-fib-extractor-monorepo",  // replace with your actual repo URL
    technologies: {
      main: ["JavaScript", "Userscript", "Chrome Extension", "Monorepo"],
      others: ["TypeScript", "ESBuild", "npm"]
    }
  },
  {
    title: "Next Markdown Blog",
    image: projectImages.nextBlog,
    description: {
      summary: "Modern static site generator for technical content.",
      features: [
        "MDX components support",
        "Dynamic Open Graph generation",
        "Syntax highlighting with Prism",
        "Automated content pagination",
      ],
    },
    url: "https://blog.liuyuelin.dev/",
    technologies: {
      main: ["Next.js", "Shadcn/ui", "Velite", "SEO"],
      others: ["Tailwind CSS", "Vercel"],
    },
  },
  {
    title: "Twitter Clone",
    image: projectImages.twitterClone,
    description: {
      summary: "Full-stack social media platform replica.",
      features: [
        "Real-time post creation/deletion",
        "Interactive comment threads",
        "Cloudinary image management",
        "Push notification system",
      ],
    },
    url: "https://twitter-clone-qhpp.onrender.com/",
    technologies: {
      main: ["MERN", "React Query", "Cloudinary", "JWT"],
      others: ["DaisyUI"],
    },
  },
  {
    title: "MERN E-commerce",
    image: projectImages.mernEcommerce,
    description: {
      summary: "Complete online retail solution.",
      features: [
        "Stripe payment integration",
        "Redis caching system",
        "Product variant management",
        "Real-time sales analytics",
      ],
    },
    url: "https://mern-e-commerce-store-8w0a.onrender.com/",
    technologies: {
      main: ["MERN", "Stripe", "Redis", "Zustand"],
      others: ["Cloudinary", "Tailwind"],
    },
  },
  {
    title: "Stripe Subscriptions",
    image: projectImages.nextStripeStarter,
    description: {
      summary: "Subscription management system with Stripe.",
      features: [
        "Recurring payment workflows",
        "Dark/light theme system",
        "Webhook event handling",
        "Kinde authentication",
      ],
    },
    url: "https://stripe-subscriptions-yl.vercel.app/",
    technologies: {
      main: ["Next.js", "Stripe", "Prisma", "Kinde"],
      others: ["MongoDB", "Vercel"],
    },
  },
  {
    title: "Real-Time Chat",
    image: projectImages.mernChat,
    description: {
      summary: "Instant messaging platform with presence detection.",
      features: [
        "Socket.io real-time engine",
        "Online status indicators",
        "Message history persistence",
        "Error boundary handling",
      ],
    },
    url: "https://mern-chat-app-9ybq.onrender.com/",
    technologies: {
      main: ["MERN", "Daisy UI", "Socket.io", "JWT"],
      others: [],
    },
  },
  {
    title: "Real Estate Portal",
    image: projectImages.mernEstate,
    description: {
      summary: "Property listing marketplace.",
      features: [
        "Advanced search filters",
        "Geolocation tagging",
        "Image gallery management",
        "Lead generation system",
      ],
    },
    url: "https://mern-estate-zw5b.onrender.com/",
    technologies: {
      main: ["MERN", "Firebase", "Tailwind"],
      others: [],
    },
  },
  {
    title: "Game Hub",
    image: projectImages.gameHub,
    description: {
      summary: "Multi-genre browser gaming platform.",
      features: [
        "Cross-browser compatibility",
        "Game progress saving",
        "Social sharing integration",
        "Responsive controls",
      ],
    },
    url: "https://game-hub-two-zeta.vercel.app/",
    technologies: {
      main: ["React", "TypeScript", "CSS", "Vercel"],
      others: [],
    },
  },
  {
    title: "Blog Platform",
    image: projectImages.mernBlog,
    description: {
      summary: "Content management system for publishers.",
      features: [
        "Rich text editor with embeds",
        "Role-based access control",
        "SEO-friendly markup",
        "Comment moderation tools",
      ],
    },
    url: "https://mern-blog-6atr.onrender.com/",
    technologies: {
      main: ["MERN", "Firebase", "Tailwind", "Flowbite"],
      others: [],
    },
  },
  {
    title: "Biomech Analysis",
    image: projectImages.biomechAnalysis,
    description: {
      summary: "Motion capture data processing pipeline.",
      features: [
        "YOLOv8 pose estimation",
        "OpenSim model conversion",
        "Real-time visualization",
        "Multi-database storage",
      ],
    },
    url: "#",
    technologies: {
      main: ["React", "YOLOv8", "OpenSim", "SQL"],
      others: ["NoSQL", "Python"],
    },
  },
];
