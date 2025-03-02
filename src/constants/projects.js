import { projectImages } from "./assets";

export const PROJECTS = [
  {
    title: "Remote Interview Platform",
    image: projectImages.nextRemoteInterviewPlatform,
    description: `Integrated Video Interview Suite​: - Real-time video/audio calls with screen sharing (Stream SDK). - Live reactions & session recording (WebRockets API). -Candidate performance tracking with timestamped feedback ​VS Code-like Editor​: -Multi-language support (JavaScript, Python, Java). -Real-time code collaboration (Operational Transform). -Preloaded coding challenges with test cases. Admin Dashboard​: -User role management (Clerk authentication flows). - Interview scheduling & analytics. - Secure session history storage (Convex file system).`,
    url: "https://codeinterview.liuyuelin.dev/",
    technologies: ["Next.js", "Clerk", "Convext", "Stream", "Shadcn ui", "SEO"],
  },

  {
    title: "Netflix Clone",
    image: projectImages.mernNetflixClone,
    description: `🔐 Authentication with JWT,📱 Responsive UI,🎬 Fetch Movies and Tv Show,🔎 Search for Actors and Movies,🎥 Watch Trailers,🔥  Fetch Search History,🐱‍👤 Get  Similar Movies/Tv Shows,💙 Awesome Landing Page,🌐 Deployment,🚀 And Many More Cool Features`,
    url: "https://netwatch.liuyuelin.xyz/",
    technologies: [
      "React.js",
      "Zustand",
      "MongoDB",
      "Node.js",
      "Express",
      "Tailwind",
      "JWT",
      "AWS",
      "SystemD",
      "Caddy",
      "Route 53",
    ],
  },
  {
    title: "Next Markdown Blog",
    image: projectImages.nextBlog,
    description:
      "It is a markdown static blog, features include MDX Components,Shadcn UI, Pagination, Dynamic Open Graph Image and Syntax Highlighting in code block.",
    url: "https://next-blog-alpha-sable-40.vercel.app",
    technologies: [
      "ReactJS 18",
      "NextJS 14",
      "NextJS SEO",
      "TailwindCSS",
      "Shadcn/ui",
      "Velite",
      "Vercel",
    ],
  },
  {
    title: "Stripe Subscription Starter",
    image: projectImages.nextStripeStarter,
    description: `⚛️ Tech Stack: Next.js 14, TypeScript, Prisma, MongoDB, Stripe, 🔐 Authentication with Kinde Auth, 💸 Monthly and Annually Subscriptions with Stripe, 💵 Building a Stripe Billing Portal, 🛠️ What are Webhooks, 🔄 Stripe Event Types, 🌗 Light/Dark Mode, 🌐 Deployment`,
    url: "https://stripe-subscriptions-yl.vercel.app/",
    technologies: [
      "Next.js 14",
      "Prisma",
      "Stripe",
      "MongoDB",
      "Kinde Auth",
      "Vercel",
    ],
  },
  {
    title: "Twitter Clone",
    image: projectImages.twitterClone,
    description: `⚛️ Tech Stack: React.js, MongoDB, Node.js, Express, Tailwind
      🔐 Authentication with JSONWEBTOKENS (JWT)
      🔥 React Query for Data Fetching, Caching etc.
      👥 Suggested Users to Follow
      ✍️ Creating Posts
      🗑️ Deleting Posts
      💬 Commenting on Posts
      ❤️ Liking Posts
      🔒 Delete Posts (if you are the owner)
      📝 Edit Profile Info
      🖼️ Edit Cover Image and Profile Image
      📷 Image Uploads using Cloudinary
      🔔 Send Notifications
      🌐 Deployment`,
    url: "https://twitter-clone-qhpp.onrender.com/",
    technologies: [
      "React.js",
      "React Query",
      "MongoDB",
      "Node.js",
      "Express",
      "Tailwind",
      "DaisyUI",
      "JWT",
    ],
  },
  {
    title: "MERN-Stack Blog Website",
    image: projectImages.mernBlog,
    description:
      "A platform for creating and publishing blog posts, with features like admin dashboards, rich text editing, comments management, users management and advanced search...",
    url: "https://mern-blog-6atr.onrender.com/",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Tailwind",
      "Flowbite",
    ],
  },
  {
    title: "Real Estate Website",
    image: projectImages.mernEstate,
    description:
      "An application for creating and publishing listings of real estate properties, with features such as advanced property search filters and real-time listings to connect buyers with their ideal homes.",
    url: "https://mern-estate-zw5b.onrender.com/",
    technologies: [
      "React",
      "Tailwind",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    title: "Real Time Chat App",
    image: projectImages.mernChat,
    description:
      "A realtime chat app is built on a robust MERN stack integrated with Socket.io for real-time interactions, and styled using TailwindCSS and Daisy UI. Key features include user authentication and authorization via JWT, real-time messaging, and online user status updates. It leverages Zustand for global state management and ensures thorough error handling on both server and client sides.",
    url: "https://mern-chat-app-9ybq.onrender.com/",
    technologies: [
      "React",
      "Node",
      "Express",
      "MongoDB",
      "Socket.io",
      "TailwindCSS",
      "Daisy UI",
      "Vercel",
    ],
  },
  {
    title: "Game Hub",
    image: projectImages.gameHub,
    description:
      "Game Hub is an engaging online platform where gamers can explore and enjoy a variety of browser-based games. It offers a diverse library of games across multiple genres, providing entertainment for players of all ages and interests.",
    url: "https://game-hub-two-zeta.vercel.app/",
    technologies: ["vanilla CSS", "React", "TypeScript", "Vercel"],
  },
  {
    title: "MERN Chinese Poetry",
    image: projectImages.mernPoetry,
    description:
      "This project is a full-stack web application that allows users to search for Chinese poetry based on different dynasties, including Tang and Song poems, as well as Shijing. The application uses React for the frontend and Node.js/Express for the backend. View Random classic Poems at Home Page,Search poems by dynasty (Tang, Song) - Search Shijing poems - Pagination support for browsing multiple pages of results - Responsive design with Tailwind CSS - RESTful API backend with Express and MongoDB",
    url: "https://mern-chinese-poetry.vercel.app/",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "React Query",
      "Node.js",
      "Express",
      "MongoDB",
      "Render",
      "Vercel",
    ],
  },
  {
    title: "Biomech Analysis Pipeline",
    image: projectImages.biomechAnalysis, // You'll need to replace this with the actual variable or path to the image in your project files.
    description:
      "This project entailed leading the integration of advanced keypoints detection using technologies like YOLOv8-pose and AlphaPose to optimize video input processing for biomechanical analysis. It involved automating the transformation of keypoints into OpenSim format for accurate simulation and developing a React-based dashboard for real-time data visualization. The backend was managed with both SQL and NoSQL databases to efficiently store and process large datasets.",
    url: "#",
    technologies: [
      "YOLOv8-pose",
      "AlphaPose",
      "React",
      "Open2Sim",
      "SQL",
      "NoSQL",
    ],
  },
  {
    title: "E-Commerce Website",
    image: projectImages.eCommerce,
    description:
      "A front-end-only e-commerce website with features like product listing, shopping cart.",
    url: "https://liuyuelintop.github.io/ecommerce-website-react/",
    technologies: ["HTML", "CSS", "React", "Vercel"],
  },
];
