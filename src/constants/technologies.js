// techStackData.js
import { RiReactjsLine, RiBearSmileLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiTypescript, SiZod, SiRedux, SiTailwindcss, SiShadcnui, SiVite, SiStorybook } from "react-icons/si";
import { FaNodeJs, FaSlack } from "react-icons/fa";
import { FaMasksTheater, FaAws } from "react-icons/fa6";
import { SiExpress, SiPrisma, SiMongodb, SiSupabase, SiRedis, SiGraphql } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { SiKubernetes, SiVercel, SiTurborepo, SiConfluence } from "react-icons/si";
import { SiOpenai, SiLangchain, SiOllama } from "react-icons/si";
import { SiJest, SiPostman, SiSwagger } from "react-icons/si";
import { SiClerk } from "react-icons/si";

export const TECH_STACK = [
  {
    group: "Core Frontend",
    items: [
      { name: "React", icon: RiReactjsLine, color: "text-cyan-400" },
      { name: "Next.js", icon: TbBrandNextjs, color: "text-neutral-100" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
      { name: "Zustand", icon: RiBearSmileLine, color: "text-gray-400" },
      { name: "Zod", icon: SiZod, color: "text-purple-400" },
      { name: "Redux Toolkit", icon: SiRedux, color: "text-purple-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "shadcn/ui", icon: SiShadcnui, color: "text-sky-400" },
      { name: "Vite", icon: SiVite, color: "text-yellow-400" },
      { name: "Storybook", icon: SiStorybook, color: "text-pink-300" }
    ]
  },
  {
    group: "Core Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Express.js", icon: SiExpress, color: "text-blue-400" },
      { name: "Prisma", icon: SiPrisma, color: "text-green-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "Supabase", icon: SiSupabase, color: "text-lime-400" },
      { name: "Redis", icon: SiRedis, color: "text-red-500" },
      { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
    ]
  },
  {
    group: "Cloud & DevOps",
    items: [
      { name: "Docker", icon: FaDocker, color: "text-blue-500" },
      { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-600" },
      { name: "AWS", icon: FaAws, color: "text-amber-600" },
      { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
      { name: "Turborepo", icon: SiTurborepo, color: "text-neutral-400" },
      { name: "CI/CD", icon: SiConfluence, color: "text-blue-400" },
    ]
  },
  {
    group: "AI, LLM & Data",
    items: [
      { name: "OpenAI", icon: SiOpenai, color: "text-green-400/80" },
      { name: "LangChain", icon: SiLangchain, color: "text-yellow-300" },
      { name: "LlamaIndex", icon: SiOpenai, color: "text-green-500" },
      { name: "Ollama", icon: SiOllama, color: "text-emerald-400" },
    ]
  },
  {
    group: "Testing & Automation",
    items: [
      { name: "Jest", icon: SiJest, color: "text-red-500" },
      { name: "Playwright", icon: FaMasksTheater, color: "text-pink-400" },
      { name: "Postman", icon: SiPostman, color: "text-orange-500" },
      { name: "Swagger", icon: SiSwagger, color: "text-yellow-400" },
    ]
  },
  {
    group: "Communication & Auth",
    items: [
      { name: "Clerk", icon: SiClerk, color: "text-purple-500/80" },
      { name: "Slack", icon: FaSlack, color: "text-purple-400" },
    ]
  },
  {
    group: "Learning & Next Focus",
    items: [
      { name: "LangChain", icon: SiLangchain, color: "text-yellow-300" },
      { name: "LlamaIndex", icon: SiOpenai, color: "text-green-500" },
      { name: "Ollama", icon: SiOllama, color: "text-emerald-400" },
    ]
  },
];
