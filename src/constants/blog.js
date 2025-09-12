export const BLOG_CONFIG = {
  // API Configuration
  apiUrl: import.meta.env.VITE_BLOG_API_URL || 'http://localhost:3000',
  feedEndpoint: '/api/v1/feed',
  defaultLimit: 3,
  maxPosts: 20,
  
  // Caching Configuration
  cacheTimeout: 5 * 60 * 1000, // 5 minutes in milliseconds
  
  // UI Configuration
  initialVisible: 3,
  loadMoreIncrement: 3,
  
  // Display Configuration
  showDateBadge: true,
  showTags: true,
  maxTagsVisible: 3,
  excerptLength: 150,
  
  // Animation delays
  cardAnimationDelay: 0.1,
  statsAnimationDelay: 0.1,
  
  // Fallback data for demo/offline mode
  fallbackPosts: [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js 14',
      description: 'A comprehensive guide to building modern web applications with Next.js 14, covering app router, server components, and performance optimization.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      tags: ['Next.js', 'React', 'JavaScript'],
      canonicalUrl: 'https://blog.liuyuelin.dev/getting-started-with-nextjs'
    },
    {
      slug: 'react-best-practices-2024',
      title: 'React Best Practices for 2024',
      description: 'Modern React patterns and practices that will make your code more maintainable, performant, and scalable.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      tags: ['React', 'Best Practices', 'JavaScript'],
      canonicalUrl: 'https://blog.liuyuelin.dev/react-best-practices-2024'
    },
    {
      slug: 'building-ai-powered-apps',
      title: 'Building AI-Powered Applications',
      description: 'Learn how to integrate AI capabilities into your applications using modern APIs and frameworks.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      tags: ['AI', 'LangChain', 'OpenAI'],
      canonicalUrl: 'https://blog.liuyuelin.dev/building-ai-powered-apps'
    }
  ]
};

// Blog post type definition for reference
export const BLOG_POST_SCHEMA = {
  slug: 'string',
  slugAsParams: 'string?',
  title: 'string',
  description: 'string?',
  date: 'string', // ISO date string
  tags: 'array?',
  canonicalUrl: 'string'
};

// Navigation configuration
export const BLOG_NAVIGATION = {
  id: 'blog',
  label: 'Blog',
  href: '#blog',
  shortcut: 'Alt+B'
};