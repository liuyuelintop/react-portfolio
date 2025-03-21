import { DiRedis } from "react-icons/di";
import { FaAws, FaNodeJs, FaPaintBrush } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import {
  SiClerk,
  SiGraphql,
  SiJest,
  SiMongodb,
  SiOpenai,
  SiPostman,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

export const TECH_STACK = [
  {
    name: "AWS",
    icon: FaAws,
    color: "text-amber-600",
    usage: "cloud",
    docs: "https://aws.amazon.com",
  },
  {
    name: "ChatGPT",
    icon: SiOpenai,
    color: "text-green-400/80",
    usage: "ai",
    docs: "https://openai.com/chatgpt",
  },
  {
    name: "Clerk",
    icon: SiClerk,
    color: "text-purple-500/80",
    usage: "authentication",
    docs: "https://clerk.dev",
  },
  {
    name: "GraphQL",
    icon: SiGraphql,
    color: "text-pink-600",
    usage: "api",
    docs: "https://graphql.org",
  },
  {
    name: "Jest",
    icon: SiJest,
    color: "text-red-500",
    usage: "testing",
    docs: "https://jestjs.io",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-green-500",
    usage: "database",
    docs: "https://mongodb.com",
  },
  {
    name: "Next.js",
    icon: TbBrandNextjs,
    color: "text-neutral-100",
    usage: "primary",
    docs: "https://nextjs.org",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "text-green-600",
    usage: "backend",
    docs: "https://nodejs.org",
  },
  {
    name: "Postman",
    icon: SiPostman,
    color: "text-orange-500",
    usage: "api",
    docs: "https://postman.com",
  },
  {
    name: "React",
    icon: RiReactjsLine,
    color: "text-cyan-400",
    usage: "primary",
    docs: "https://react.dev",
  },
  {
    name: "Redis",
    icon: DiRedis,
    color: "text-red-500",
    usage: "database",
    docs: "https://redis.io",
  },
  {
    name: "shadcn/ui",
    icon: SiShadcnui,
    color: "text-sky-400",
    usage: "components",
    docs: "https://ui.shadcn.com",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-cyan-400",
    usage: "styling",
    docs: "https://tailwindcss.com",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-400",
    usage: "core",
    docs: "https://typescriptlang.org",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "text-black dark:text-white",
    usage: "deployment",
    docs: "https://vercel.com",
  },
];
