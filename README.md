# React Portfolio 🚀

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=flat-square\&logo=vercel)](https://liuyuelin.dev)
[![Stars](https://img.shields.io/github/stars/liuyuelintop/react-portfolio?style=social)](https://github.com/liuyuelintop/react-portfolio/stargazers)

---

A modern, visually stunning personal portfolio website built with React, Tailwind CSS, and Framer Motion. Showcases your projects, professional journey, references, and technical skills with interactive UI and smooth animations.

![Portfolio Screenshot](./src/assets/og-image.png)

## ✨ Features

* **Animated Hero Section:** Eye-catching intro with summary and highlights.
* **Professional Timeline:** Interactive, animated experience timeline.
* **Project Gallery:** Project Gallery: Responsive grid of project cards with quick modal access to full project details.
* **Polished Project Modal:**

  * Responsive modal with skeleton image loading for better perceived performance
  * Sticky action buttons always visible
  * Drag-to-close gesture and bottom “Close” button are currently available on all devices  
  * Desktop users get a clean experience with “X”/ESC closing and optimized width
* **References Carousel:** Swipeable, animated testimonials with LinkedIn links.
* **Tech Stack Grid:** Icon-based, animated display of technologies.
* **Contact Section:** Accessible contact info with email and phone links.
* **Responsive Design:** Fully mobile-friendly and accessible.
* **Dark Mode:** Sleek, dark-themed UI.
* **SEO Optimized:** Semantic HTML, Open Graph, and Twitter meta tags.
* **CV Download:** Dynamic CV link powered by Google Drive API.
* **Performance:** Code-splitting, lazy loading, and optimized assets.

## 🛠️ Tech Stack

* [React 18](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [React Icons](https://react-icons.github.io/react-icons/)
* [React Swipeable](https://www.npmjs.com/package/react-swipeable)
* [Google Drive API](https://developers.google.com/drive)
* [clsx](https://github.com/lukeed/clsx)
* [dotenv](https://www.npmjs.com/package/dotenv)

## 📦 Getting Started

### 1. Clone the Repo

```sh
git clone https://github.com/your-username/react-portfolio.git
cd react-portfolio
```

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

## 🖼️ Project Structure

```
src/
  components/         # UI components (Hero, Projects, Experience, etc.)
  constants/          # Data for projects, experiences, references, etc.
  assets/             # Images and static assets
  hooks/              # Custom React hooks
  utils/              # Utility functions (API, etc.)
  App.jsx             # Main app entry
  main.jsx            # ReactDOM render
  index.css           # Tailwind and global styles
```

## 🆕 What’s New

* **Fully Responsive Project Modal:**
  Mobile users get a smooth drag-to-close experience, always-visible sticky buttons, and image skeleton loading for slower networks.
  Desktop users enjoy wide modals, instant close with the X button or ESC, and a clutter-free UI.
* **Robust Null Safety:**
  No more runtime errors even if project data is missing.
* **Performance Improvements:**
  Lazy image loading, lightweight skeletons, and no blocking rendering.

## 📈 GitHub Profile Boost

* **Pinned Project:** Pin this repo to your GitHub profile for maximum visibility.
* **GitHub Actions:** Add CI/CD for auto-deploy (e.g., Vercel, Netlify, or GitHub Pages).
* **Open Source:** Encourage contributions and star-gazing.
* **SEO:** Project is optimized for search engines and social sharing.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📝 License

[MIT](LICENSE)

## 🙋‍♂️ Author

**Yuelin Liu**
[LinkedIn](https://linkedin.com/in/liuyuelintop) | [GitHub](https://github.com/liuyuelintop) | [Blog](https://blog.liuyuelin.dev/)

---

> If you like this project, please ⭐️ star it on [GitHub](https://github.com/liuyuelintop/react-portfolio)!