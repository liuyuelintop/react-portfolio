# React Portfolio 🚀

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat-square&logo=vercel)](https://liuyuelin.dev)
[![Stars](https://img.shields.io/github/stars/liuyuelintop/react-portfolio?style=social)](https://github.com/liuyuelintop/react-portfolio/stargazers)

---

A modern, visually stunning personal portfolio built with **React 18**, **Tailwind CSS**, and **Framer Motion**. Showcase your projects, professional journey, tech stack, and references in a fast, interactive, and mobile-friendly UI.

![Portfolio Screenshot](./src/assets/og-image.png)

---

## 🚦 Lighthouse Report

| Category       | Desktop | Mobile  |
| -------------- | ------- | ------- |
| Performance    | **100** | **89**  |
| Accessibility  | **96**  | **96**  |
| Best Practices | **96**  | **96**  |
| SEO            | **100** | **100** |

- **Core Web Vitals: excellent scores for CLS, LCP, and FCP**
- **Desktop: perfect 100 performance, ultra-fast**
- **Mobile: smooth experience, all scores well above industry average**
- **SEO, Accessibility & Best Practices: exceeds modern standards**

> [View Desktop Report (July 2025)](https://pagespeed.web.dev/analysis/https-www-liuyuelin-dev/df2ampev8u?form_factor=desktop)  
> [View Mobile Report (July 2025)](https://pagespeed.web.dev/analysis/https-www-liuyuelin-dev/df2ampev8u?form_factor=mobile)

---

## ✨ Features

* **⚡ Blazing Fast Performance:**
  - Lighthouse Performance 100 (Desktop), 89 (Mobile)
  - Code-splitting, lazy loading, optimised images and assets
  - Zero layout shift, smooth load and interactions

* **Animated Hero Section:**
  - Custom gradient headline, motion intro, and quick summary.
  - Smooth entry animations, with keyboard and screen reader accessibility.

* **Professional Experience Timeline:**
  - Clean vertical timeline showing company, role, tech stack, and key results.
  - Animated card reveal, company logos, and improved mobile layout.

* **Project Gallery:**
  - Responsive grid of project cards.
  - Modal pops up with full details, always-sticky actions, and drag-to-close on mobile.

* **References Carousel:**
  Animated, swipeable reference cards with avatars and LinkedIn links.

* **Tech Stack Section:**
  - Responsive grid on desktop with tighter gaps, color-highlighted group titles (including yellow "Learning & Next Focus")
  - Mobile-first carousel: swipeable, snap-to-item, and shows 3 cards per row for better visibility
  - Animated, clickable icon cards with fast, subtle hover effects
  - No unnecessary labels—just icon, name, and color
  - Performance-optimized, no re-renders or slowdowns with lots of icons

* **Contact Section:**
  Accessible contact info, with email and phone click-to-copy.

* **Dark Mode:**
  Consistent dark background, accessible color palette.

* **SEO Optimized:**
  Semantic HTML, Open Graph, Twitter cards, and dynamic meta.

* **Accessibility:**
  Keyboard navigation, focus ring, semantic markup, and null-safe data everywhere.

---

## 🛠️ Tech Stack

* [React 18](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [Swiper](https://swiperjs.com/) (TechStack Carousel)
* [React Icons](https://react-icons.github.io/react-icons/)
* [clsx](https://github.com/lukeed/clsx)
* [Google Drive API](https://developers.google.com/drive)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📦 Getting Started

### 1. Clone the Repo

```sh
git clone https://github.com/liuyuelintop/react-portfolio.git
cd react-portfolio
````

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```
VITE_GOOGLE_FOLDER_ID=your_google_drive_folder_id
VITE_GOOGLE_API_KEY=your_google_api_key
```

### 4. Run Locally

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```sh
npm run build
```

---

## 🖼️ Project Structure

```
src/
  components/         # All UI components (Hero, Experience, Projects, Technologies, etc.)
  constants/          # Data for projects, experiences, tech stack, references, etc.
  assets/             # Images and static assets
  hooks/              # Custom React hooks
  utils/              # Utility functions (API, formatting, etc.)
  App.jsx             # Main app entry
  main.jsx            # ReactDOM render
  index.css           # Tailwind and global styles
```

---

## 🆕 What’s New

* **Tech Stack Section Refactor**

  * Desktop: responsive grid, tight spacing, color-highlighted group headings (with yellow for "Learning & Next Focus")
  * Mobile: swipeable carousel (3 visible at a time), infinite looping, touch navigation
  * Polished icon cards: responsive, animated, and minimal—no label spam
  * Hover: super fast, scale and shadow effect for instant feedback
  * Cleaned up data structure (name, icon, color only)

* **Hero & Experience Section Overhaul**

  * Hero: more lively gradient, motion elements, and summary improvements
  * Experience: clearer timeline, better tech highlights, improved mobile stacking

* **Performance & Accessibility**

  * More granular code-splitting and lazy loading
  * Null safety for all data-driven components
  * Focus/keyboard/ARIA improvements

* **SEO & Meta**

  * Updated Open Graph and Twitter meta tags for every page

---

## 📈 GitHub Profile Boost

* **Pin this repo** to your profile
* **CI/CD:** Set up auto-deploy (Vercel/Netlify)
* **Open Source:** Issues and PRs welcome
* **SEO:** All best practices included

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📝 License

[MIT](LICENSE)

---

## 🙋‍♂️ Author

**Yuelin Liu**
[LinkedIn](https://linkedin.com/in/liuyuelintop) | [GitHub](https://github.com/liuyuelintop) | [Blog](https://blog.liuyuelin.dev/)

---

> If you like this project, please ⭐️ star it on GitHub!
