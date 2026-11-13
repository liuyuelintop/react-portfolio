export const HERO_CONTENT = {
  name: "Yuelin Liu",
  role: "Software engineer in Melbourne",
  resumeUrl: "/resume/yuelin-liu-resume.pdf",
  // The opening is about the person: who, what kind of work, and how far it
  // ranges. Individual pieces of work start one screen down, in the overview.
  headline: "I design the interfaces and build the systems behind them.",
  summary:
    "My recent work includes an iPhone app for ultimate frisbee players, a self-hosted job application workspace and a wage planner for hourly workers.",
  before: "Before those, I was a full-stack developer at ByteCroniX, an early-stage AI SaaS.",
  workLink: "Browse the work",
  // The field stays on the first screen: it is where Flickside came from.
  photo: {
    src: "/images/photos/forehand.webp",
    alt: "Yuelin mid-throw on a grass field at golden hour, releasing a white disc",
    width: 1000,
    height: 1334,
  },
  caption: {
    place: "On the field.",
    detail: "About ten years of ultimate frisbee, and the friends that came with it.",
    note: "They are who I built Flickside for.",
  },
};

export const CONTACT = {
  intro: "Based in Melbourne and open to junior and early-career software engineering, full-stack, backend and AI implementation roles in Australia. Email me for role details or to discuss the engineering behind these projects.",
  address: "Melbourne, VIC, Australia",
  phoneNo: "+61 451 690 105",
  email: "liuyuelintop@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/liuyuelintop/",
    github: "https://github.com/liuyuelintop",
    blog: "https://blog.liuyuelin.dev/",
  },
};

// The fast path for a reader with thirty seconds: who, where, what, and what for.
export const AT_A_GLANCE = [
  {
    label: "Now",
    title: "Independent Developer",
    detail: "Prospective-client demos for a Melbourne consultancy, Sep 2025 to present.",
  },
  {
    label: "Before",
    title: "Full-Stack Developer",
    detail: "ByteCroniX, an early-stage AI SaaS, Mar to Jun 2025.",
  },
  {
    label: "Works in",
    title: "TypeScript, end to end",
    detail: "React and Next.js, Node.js and Express, with tests around the boundaries.",
  },
  {
    label: "Open to",
    title: "Early-career roles",
    detail: "Software engineering, full-stack, backend and AI implementation, in Australia.",
  },
];

export const TOOLBOX = [
  {
    label: "Product UI",
    tools: ["React 19", "Next.js 15/16", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "APIs and data",
    tools: ["Node.js", "Express", "REST APIs", "MongoDB", "Convex"],
  },
  {
    // Clerk and NextAuth are named rather than a generic "JWT/OAuth" entry:
    // both trace to work the page already describes. pytest and Playwright
    // were dropped because nothing in the accepted evidence demonstrates them.
    label: "Auth and delivery",
    tools: ["Clerk OAuth", "NextAuth", "GitHub Actions", "Docker", "Vitest"],
  },
  {
    label: "AI and validation",
    tools: ["OpenAI Function Calling", "Gemini", "DeepSeek", "Zod"],
  },
];

// Life away from the desk, as one sideways strip. The order is the owner's.
// The field opens the page beside Flickside, so the strip starts one place
// further out and comes home to the table. One photograph and one line per place. This section supports the work above and must never
// grow into a hobbies list.
// `ratio` is width / height and sizes the card on wide screens; on phones every
// card is cropped to 4:5, so `focus` says which part of the frame to keep.
export const FURTHER_OUT = {
  heading: "Further out",
  standfirst:
    "Most of what I build starts at a desk by a window. The rest of the day happens a little further from it each time.",
  stripLabel: "Further out, in four photographs",
  places: [
    {
      place: "Away",
      detail: "Tournaments that turned into travel.",
      photo: {
        src: "/images/photos/huddle.webp",
        alt: "An ultimate team in a huddle on a tournament field, seen from behind",
        width: 1200,
        height: 900,
        ratio: 1.3333,
      },
    },
    {
      place: "In town",
      detail: "A camera in the gardens, a pool table, and Hawthorn at the footy.",
      photo: {
        src: "/images/photos/park-tram.webp",
        alt: "A green Melbourne tram passing a park lawn where people sit in the shade",
        width: 1200,
        height: 800,
        ratio: 1.5,
        focus: "62% 50%",
      },
    },
    {
      place: "On the sill",
      detail: "Three cats and three houseplants, all thriving.",
      photo: {
        src: "/images/photos/cat-window.webp",
        alt: "A tabby cat sitting upright on a windowsill, city towers behind the glass",
        width: 900,
        height: 1200,
        ratio: 0.75,
      },
    },
    {
      place: "At the table",
      detail: "A bottle is how an evening gets kept. The evenings go into a small",
      link: { label: "Wine Log", href: "https://wine-log-two.vercel.app/" },
      after: "I built.",
      photo: {
        src: "/images/photos/wine-log-bottle.webp",
        // The highest-rated entry in the log, and the older of the two that tie.
        alt: "A bottle of Katnook Estate Odyssey Cabernet Sauvignon 2013, cut out from its Wine Log entry",
        width: 400,
        height: 1360,
        ratio: 0.75,
        // A cut-out object rather than a photograph: shown whole on a paper panel.
        object: true,
      },
    },
  ],
};
