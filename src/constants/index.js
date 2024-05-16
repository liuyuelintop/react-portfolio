import eCommerce from "../assets/projects/ecommerce.png";
import mernEstate from "../assets/projects/mern-estate.png";
import portfolio from "../assets/projects/portfolio.png";
import mernBlog from "../assets/projects/mern-blog.png";
import gameHub from "../assets/projects/game-hub.png";
import mernChat from "../assets/projects/mern-chat.png";
import biomechAnalysis from "../assets/projects/biomech-analysis.png";
import googleNext from "../assets/projects/google-next.png";
import nextBlog from "../assets/projects/next-blog.png";
export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With 1.5 years of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, Express, MySQL, PostgreSQL, and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 1.5 years of professional experience, I have worked with a variety of technologies, including React, Node.js, MongoDB, MySQL, and PostgreSQL. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "April 2024 - Present",
    role: "Software Engineer Internship",
    company: "Deakin University",
    description:
      "In the Biomech Analysis Pipeline project, I led the integration of advanced keypoints detection models like YOLOv8-pose and AlphaPose, optimizing video input processing across single and multi-view camera setups. I automated the transformation of detected keypoints into OpenSim format using Open2Sim, and conducted initial simulations to ensure accuracy. Additionally, I developed a user-friendly, interactive dashboard using React for real-time visualization and managed a robust data backend with SQL and NoSQL databases to efficiently store and retrieve extensive biomechanical data sets.",
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
    year: "2023 - Present",
    role: "Frontend Developer",
    company: "Expresso Carwash Pty Ltd.",
    description: `I lead a team at Expresso Carwash, overseeing operations, customer service, and system management for optimal efficiency. Designed and developed user interfaces for web applications using JavaScript, React.js and worked closely with non-technical stakeholders`,
    technologies: ["Javascript", "React.js", "Tailwind"],
  },
  {
    year: "2020 - 2021",
    role: "Fullstack Developer Internship",
    company: "Shanghai Anling Computer Technology Co.,Ltd",
    description: `Contributed to the development web applications using JavaScript, React.js. Integrated PHP and MySQL for RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
    technologies: ["JavaScript", "HTML", "PHP", "MySQL"],
  },
  {
    year: "2019 - 2020",
    role: "Frontend Developer",
    company: "Beijing Caihuahengyi Technology Co., Ltd",
    description: `Contributed to the development web applications using Ruby on Rails and MVC framework, deployed applications to production environments using Heroku and managed server configurations and optimizations on Apache.`,
    technologies: ["Ruby", "MVC", "Heroku", "Apache"],
  },
];

export const PROJECTS = [
  {
    title: "Next Markdown Blog",
    image: nextBlog,
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
    title: "Rich Text Blog Website",
    image: mernBlog,
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
    image: mernEstate,
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
    image: mernChat,
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
    image: gameHub,
    description:
      "Game Hub is an engaging online platform where gamers can explore and enjoy a variety of browser-based games. It offers a diverse library of games across multiple genres, providing entertainment for players of all ages and interests.",
    url: "https://google-next-blond.vercel.app/",
    technologies: ["vanilla CSS", "React", "TypeScript", "Vercel"],
  },
  {
    title: "Google Next",
    image: googleNext,
    description:
      "Google Next is an open source Google-Clone project using React, Next.js and TailwindCSS, aiming for learning Next.js framework",
    url: "https://google-clone-blond.vercel.app/",
    technologies: ["React", "Next.js", "TailwindCSS", "Vercel"],
  },
  {
    title: "Biomech Analysis Pipeline",
    image: biomechAnalysis, // You'll need to replace this with the actual variable or path to the image in your project files.
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
    title: "Portfolio",
    image: portfolio,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    url: "https://react-portfolio-tau-eight-56.vercel.app/",
    technologies: ["React", "Tailwind", "Framer Motion"],
  },
  {
    title: "E-Commerce Website",
    image: eCommerce,
    description:
      "A front-end-only e-commerce website with features like product listing, shopping cart.",
    url: "https://liuyuelintop.github.io/ecommerce-website-react/",
    technologies: ["HTML", "CSS", "React", "Vercel"],
  },
];

export const CONTACT = {
  address: "464 Collins St, MEL, VIC 3000",
  phoneNo: "+61 451 690 105 ",
  email: "liuyuelintop@gmail.com",
};
