import eCommerce from "../assets/projects/ecommerce.png";
import mernEstate from "../assets/projects/mern-estate.png";
import portfolio from "../assets/projects/portfolio.png";
import mernBlog from "../assets/projects/mern-blog.png";

export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With 1.5 years of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, Express, MySQL, PostgreSQL, and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 1.5 years of professional experience, I have worked with a variety of technologies, including React, Node.js, MongoDB, MySQL, and PostgreSQL. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
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
    title: "Blog Website",
    image: mernBlog,
    description:
      "A platform for creating and publishing blog posts, with features like admin dashboards, rich text editing, comments management, users management and advanced search...",
    url: "https://mern-blog-6atr.onrender.com/",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind", "Flowbite"],
  },
  {
    title: "Real Estate Website",
    image: mernEstate,
    description:
      "An application for creating and publishing listings of real estate properties, with features such as advanced property search filters and real-time listings to connect buyers with their ideal homes.",
    url: "https://mern-estate-zw5b.onrender.com/",
    technologies: ["React", "Tailwind", "Node.js", "Express", "MongoDB", "Firebase"],
  },
  {
    title: "Portfolio Website",
    image: portfolio,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    url: "#",
    technologies: ["React", "Tailwind", "Framer Motion"],
  },
  {
    title: "E-Commerce Website",
    image: eCommerce,
    description:
      "A front-end-only e-commerce website with features like product listing, shopping cart.",
    url: "https://liuyuelintop.github.io/ecommerce-website-react/",
    technologies: ["HTML", "CSS", "React"],
  }

];

export const CONTACT = {
  address: "464 Collins St, MEL, VIC 3000",
  phoneNo: "+61 451 690 105 ",
  email: "liuyuelintop@gmail.com",
};
