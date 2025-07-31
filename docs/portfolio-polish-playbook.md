# Portfolio Polish – Claude Code Playbook

> Goal: apply tasteful visual polish to **liuyuelin.dev** with small, high‑impact changes. Ships in ~1–2 sessions. Keep motion subtle, type/radius/shadow consistent, and content clear.

---

## ✅ Deliverables (Definition of Done)

- Unified type scale, one brand accent, consistent radius/shadow.
- Accessible focus states on all interactive elements.
- Hero trimmed to a clear value prop + two CTAs.
- Projects: consistent thumbnails, concise impact copy, top 4 featured first.
- Experience: cleaner two‑column layout.
- Skills: chips (Core / Tooling / Learning), no charts.
- Respect `prefers-reduced-motion`; lighter hover effects.
- Images lazy‑loaded with stable aspect ratios.

---

## How to run locally

```bash
npm i
npm run dev
```

---

## Step 1 — Design tokens (Tailwind)

### 1.1 Update **tailwind.config.js**

> Unify font sizes, radius, shadows, and add an accent token.

```diff
*** Begin Patch
*** Update File: tailwind.config.js
@@
 export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
-    extend: {},
+    extend: {
+      container: { center: true, screens: { lg: "1024px", xl: "1152px", "2xl": "1280px" } },
+      colors: {
+        accent: "hsl(var(--accent))",
+        surface: "hsl(var(--surface))",
+      },
+      borderRadius: {
+        xl: "12px",
+      },
+      boxShadow: {
+        sm: "0 1px 2px 0 rgb(0 0 0 / 0.06)",
+        md: "0 4px 12px -2px rgb(0 0 0 / 0.10)",
+      },
+      fontSize: {
+        xs: ["0.75rem", "1.1"],
+        sm: ["0.875rem", "1.3"],
+        base: ["1rem", "1.6"],
+        lg: ["1.125rem", "1.5"],
+        "2xl": ["1.5rem", "1.3"],
+        "4xl": ["2.25rem", "1.15"],
+        "6xl": ["3.75rem", "1.05"],
+      },
+    },
   },
   plugins: [],
 }
*** End Patch
```

### 1.2 Add CSS variables for light/dark

> Create a small stylesheet with tokens you can tweak later.

```diff
*** Begin Patch
*** Add File: src/styles/tokens.css
+:root {
+  --accent: 217 91% 56%;      /* #2F81F7 */
+  --surface: 0 0% 100%;
+}
+.dark {
+  --accent: 217 91% 60%;      /* slightly brighter in dark */
+  --surface: 222 47% 11%;     /* neutral-900 */
+}
+
+/* Helpers */
+.focus-ring {
+  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg;
+}
*** End Patch
```

### 1.3 Import tokens in your app entry

```diff
*** Begin Patch
*** Update File: src/main.jsx
@@
 import React from 'react'
 import ReactDOM from 'react-dom/client'
 import App from './App.jsx'
 import './index.css'
+import './styles/tokens.css'
*** End Patch
```

---

## Step 2 — Reusable Button + Link styles

> One primary accent, one secondary. Subtle hover and visible focus.

```diff
*** Begin Patch
*** Add File: src/components/ui/Button.jsx
+import React from "react";
+
+const base =
+  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-[transform,box-shadow,background-color] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
+
+const variants = {
+  primary:
+    "bg-[hsl(var(--accent))] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
+  secondary:
+    "bg-transparent text-[hsl(var(--accent))] ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5",
+};
+
+export default function Button({ as: Comp = "button", variant = "primary", className = "", ...props }) {
+  return <Comp className={`${base} ${variants[variant]} ${className}`} {...props} />;
+}
*** End Patch
```

Optional: a **TextLink** helper.

```diff
*** Begin Patch
*** Add File: src/components/ui/TextLink.jsx
+export default function TextLink({ className = "", ...props }) {
+  return (
+    <a
+      className={`underline decoration-transparent hover:decoration-[hsl(var(--accent))] underline-offset-4 transition-colors ${className}`}
+      {...props}
+    />
+  );
+}
*** End Patch
```

---

## Step 3 — Navigation tidy

- Cap top‑level items at 4–5.
- Right‑align a single CTA (“Contact”).
- Use the focus ring helper.

```diff
*** Begin Patch
*** Update File: src/components/layout/Navbar/Navbar.jsx
@@
-// existing imports...
+import Button from "../../ui/Button";
+
@@
-  return (
-    <nav className="...">
-      {/* links... */}
-    </nav>
-  )
+  return (
+    <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60">
+      <div className="container flex h-14 items-center justify-between">
+        <a href="#home" className="font-semibold">Yuelin Liu</a>
+        <div className="hidden md:flex items-center gap-6">
+          <a href="#projects" className="focus-ring">Projects</a>
+          <a href="#experience" className="focus-ring">Experience</a>
+          <a href="#skills" className="focus-ring">Skills</a>
+          <a href="#about" className="focus-ring">About</a>
+        </div>
+        <Button as="a" href="#contact" className="ml-4">Contact</Button>
+      </div>
+    </nav>
+  )
*** End Patch
```

---

## Step 4 — Hero clarity

> One value prop + two CTAs. Add a low‑key “proof bar”.

```diff
*** Begin Patch
*** Update File: src/components/sections/Hero/Hero.jsx
@@
-import {/* existing */} from 'react'
+import Button from "../../ui/Button";
+import TextLink from "../../ui/TextLink";
@@
-  return (
-    <section id="home" className="...">
-      {/* complex grid and shapes */}
-    </section>
-  )
+  return (
+    <section id="home" className="container py-20 md:py-28">
+      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
+        Full‑stack developer focused on reliable UX and clean architecture.
+      </h1>
+      <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300">
+        I build fast, accessible web apps with React, Node, and thoughtful motion.
+      </p>
+      <div className="mt-8 flex items-center gap-3">
+        <Button as="a" href="#projects">View projects</Button>
+        <Button as="a" variant="secondary" href="/cv.pdf">Download CV</Button>
+      </div>
+      <div className="mt-8 flex items-center gap-6 opacity-80">
+        <span className="text-sm">100 Lighthouse SEO</span>
+        <span className="text-sm">Type‑safe ready codebase</span>
+        <TextLink href="https://github.com/liuyuelintop">GitHub</TextLink>
+      </div>
+    </section>
+  )
*** End Patch
```

---

## Step 5 — Projects grid polish

- Consistent thumbnail ratio and keyline.
- Short copy: **problem → solution → impact**.
- Feature top 4 first.

```diff
*** Begin Patch
*** Update File: src/components/sections/Projects/ProjectCard.jsx
@@
 export default function ProjectCard({ project }) {
-  return (
-    <article className="...">
-      {/* existing content */}
-    </article>
-  )
+  return (
+    <article className="group rounded-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow">
+      <div className="relative aspect-[16/10] overflow-hidden">
+        <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
+      </div>
+      <div className="p-4">
+        <h3 className="text-lg font-semibold">{project.title}</h3>
+        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{project.problem}</p>
+        <p className="mt-1 text-sm">{project.solution}</p>
+        {project.impact && <p className="mt-2 text-sm font-medium">Impact: {project.impact}</p>}
+        <div className="mt-3 flex flex-wrap gap-2">
+          {project.stack?.slice(0, 4).map(s => (
+            <span key={s} className="rounded-full px-2 py-0.5 text-xs ring-1 ring-black/10 dark:ring-white/10">{s}</span>
+          ))}
+        </div>
+        <div className="mt-4 flex gap-3">
+          {project.demo && <a className="text-sm underline decoration-transparent hover:decoration-[hsl(var(--accent))]" href={project.demo} target="_blank" rel="noreferrer">Live</a>}
+          {project.github && <a className="text-sm underline decoration-transparent hover:decoration-[hsl(var(--accent))]" href={project.github} target="_blank" rel="noreferrer">Code</a>}
+        </div>
+      </div>
+    </article>
+  )
 }
*** End Patch
```

Ensure your `PROJECTS` data has `problem`, `solution`, `impact` fields for the highlighted ones.

---

## Step 6 — Experience two‑column

```diff
*** Begin Patch
*** Update File: src/components/sections/Experience/Experience.jsx
@@
-<section id="experience" className="...">
-  {/* timeline layout */}
-</section>
+<section id="experience" className="container py-20">
+  <h2 className="text-2xl font-semibold">Experience</h2>
+  <div className="mt-8 space-y-8">
+    {experiences.map((exp) => (
+      <article key={exp.id} className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4 md:gap-8">
+        <div className="text-sm text-neutral-600 dark:text-neutral-300">
+          <div className="font-medium">{exp.company}</div>
+          <div>{exp.title}</div>
+          <div>{exp.range}</div>
+        </div>
+        <ul className="space-y-2">
+          {exp.bullets.slice(0,3).map((b, i) => (
+            <li key={i} className="leading-relaxed">{b}</li>
+          ))}
+        </ul>
+      </article>
+    ))}
+  </div>
+</section>
*** End Patch
```

---

## Step 7 — Skills → chips

```diff
*** Begin Patch
*** Update File: src/components/sections/Skills/Skills.jsx
@@
-import Charts from './Charts'
+const Chip = ({children}) => (
+  <span className="rounded-full px-2.5 py-1 text-xs ring-1 ring-black/10 dark:ring-white/10">{children}</span>
+);
@@
-export default function Skills(){ /* charts */ }
+export default function Skills(){
+  return (
+    <section id="skills" className="container py-20">
+      <h2 className="text-2xl font-semibold">Skills</h2>
+      <div className="mt-6 grid gap-8 md:grid-cols-3">
+        <div>
+          <h3 className="text-sm font-medium">Core</h3>
+          <div className="mt-3 flex flex-wrap gap-2">{core.map(s => <Chip key={s}>{s}</Chip>)}</div>
+        </div>
+        <div>
+          <h3 className="text-sm font-medium">Tooling</h3>
+          <div className="mt-3 flex flex-wrap gap-2">{tooling.map(s => <Chip key={s}>{s}</Chip>)}</div>
+        </div>
+        <div>
+          <h3 className="text-sm font-medium">Learning</h3>
+          <div className="mt-3 flex flex-wrap gap-2">{learning.map(s => <Chip key={s}>{s}</Chip>)}</div>
+        </div>
+      </div>
+    </section>
+  )
+}
*** End Patch
```

Populate `core`, `tooling`, `learning` arrays from your constants.

---

## Step 8 — Contact simplification

```diff
*** Begin Patch
*** Update File: src/components/sections/Contact/Contact.jsx
@@
-/* multiple forms / categories */
+/* single clear form with response‑time note */
 export default function Contact(){
   return (
     <section id="contact" className="container py-20">
       <h2 className="text-2xl font-semibold">Contact</h2>
       <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">I usually reply within 24 hours.</p>
       <form className="mt-6 grid gap-4 max-w-xl">
         <input className="focus-ring rounded-xl ring-1 ring-black/10 dark:ring-white/10 px-3 py-2" name="name" placeholder="Your name" required/>
         <input className="focus-ring rounded-xl ring-1 ring-black/10 dark:ring-white/10 px-3 py-2" type="email" name="email" placeholder="Email" required/>
         <textarea className="focus-ring rounded-xl ring-1 ring-black/10 dark:ring-white/10 px-3 py-2 min-h-[140px]" name="message" placeholder="How can I help?" required/>
-        <button className="...">Send</button>
+        <button className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-[hsl(var(--accent))] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">Send</button>
       </form>
       <p className="mt-4 text-sm">Prefer email? <a className="underline decoration-transparent hover:decoration-[hsl(var(--accent))]" href="mailto:liuyuelintop@gmail.com">liuyuelintop@gmail.com</a></p>
     </section>
   )
 }
*** End Patch
```

---

## Step 9 — Motion & accessibility

Respect `prefers-reduced-motion` and use light entrances only.

```diff
*** Begin Patch
*** Add File: src/hooks/useMotionPref.js
+import { useEffect, useState } from "react";
+export function useReducedMotion() {
+  const [reduced, setReduced] = useState(false);
+  useEffect(() => {
+    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
+    const update = () => setReduced(!!mq.matches);
+    update(); mq.addEventListener?.("change", update);
+    return () => mq.removeEventListener?.("change", update);
+  }, []);
+  return reduced;
+}
*** End Patch
```

Example usage in a section:

```diff
*** Begin Patch
*** Update File: src/components/sections/SomeSection.jsx
@@
-import { motion } from "framer-motion";
+import { motion } from "framer-motion";
+import { useReducedMotion } from "../../hooks/useMotionPref";
@@
-  return <motion.section initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} />
+  const prefersReduced = useReducedMotion();
+  return (
+    <motion.section
+      initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
+      whileInView={{ opacity: 1, y: 0 }}
+      transition={{ duration: 0.25, ease: "easeOut" }}
+      viewport={{ once: true, margin: "-10%" }}
+    />
+  )
*** End Patch
```

---

## Step 10 — Images & performance

- Ensure **all** project images use `loading="lazy"` and a stable `aspect-[16/10]` wrapper.
- Convert heavy PNGs to WebP/AVIF where possible.
- Defer iframes until click (for live previews).

```diff
*** Begin Patch
*** Update File: src/components/sections/Projects/Projects.jsx
@@
-<img src={img} alt="" />
+<div className="relative aspect-[16/10] overflow-hidden">
+  <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
+</div>
*** End Patch
```

---

## Step 11 — Optional: Hide empty sections

```diff
*** Begin Patch
*** Update File: src/components/sections/References/References.jsx
@@
-if (!testimonials?.length) {
-  // keep placeholder
-}
+if (!testimonials?.length) return null;
*** End Patch
```

---

## Step 12 — Content tweaks (data)

Update `src/constants/projects.js` (example shape for featured items):

```diff
*** Begin Patch
*** Update File: src/constants/projects.js
@@
 export const PROJECTS = [
   {
     title: "CodeCraft – cloud IDE",
-    description: "…",
+    problem: "Slow onboarding for new devs to experiment with multiple languages.",
+    solution: "Built a React + Convex powered IDE with server execution and VSCode theming.",
+    impact: "Avg. time‑to‑first‑run down from 3m → 20s (‑88%).",
     stack: ["React", "TypeScript", "Convex", "Clerk"],
     image: "/images/projects/codecraft.webp",
     demo: "https://codecraft.liuyuelin.dev",
     github: "https://github.com/liuyuelintop/codecraft",
     featured: true
   },
 ]
*** End Patch
```

---

## QA checklist

- [ ] Tab through the page; focus is visible everywhere.
- [ ] Dark mode has clear contrast (text ≥ 4.5:1 where possible).
- [ ] No layout shift on image load (aspect wrappers applied).
- [ ] Motion feels subtle; set OS to “Reduce motion” and retest.
- [ ] Mobile: headings legible, buttons comfortable (44px min height).
- [ ] Lighthouse mobile ≥ 90 Performance, ≥ 95 Accessibility.

---

## Commit message

```
feat(ui): unify design tokens, refine hero/projects/experience/skills, add accessible motion & focus states
```

---

## Notes

- Keep radii to **rounded-xl** and shadows to **sm/md** only.
- Use **accent** for CTA, links hover underline, and small highlights—nowhere else.
- If a section doesn’t add trust (e.g., empty testimonials), omit it.
