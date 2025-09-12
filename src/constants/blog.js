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
  
  // Fallback data using real blog posts from API
  fallbackPosts: [
    {
      slug: 'blog/four-sum-algorithm-one-character-bug',
      title: 'Four Sum Algorithm: How One Character Can Break Your Solution',
      description: 'Discover how a single character difference in duplicate-skipping logic can silently break your Four Sum solution. Learn why j > 1 fails across different loop iterations and how j > i + 1 ensures all valid quadruplets are found through real debugging examples.',
      date: '2025-08-27T12:00:00.000Z',
      tags: ['JavaScript', 'Algorithms', 'Data Structures', 'Best Practices'],
      canonicalUrl: 'https://blog.liuyuelin.dev/blog/four-sum-algorithm-one-character-bug'
    },
    {
      slug: 'blog/javascript-array-pitfalls-nums-negative-index-3sum',
      title: 'JavaScript Array Pitfalls: Why nums[-1] Doesn\'t Break Your 3Sum Solution',
      description: 'Discover why nums[-1] doesn\'t crash JavaScript and how understanding arrays as objects can help you debug algorithm problems like 3Sum. Learn about negative indexing, property access patterns, and JavaScript\'s unique array behavior.',
      date: '2025-08-26T10:30:00.000Z',
      tags: ['JavaScript', 'Algorithms', 'Data Structures', 'Best Practices'],
      canonicalUrl: 'https://blog.liuyuelin.dev/blog/javascript-array-pitfalls-nums-negative-index-3sum'
    },
    {
      slug: 'blog/detect-cycle-floyd-tortoise-hare-algorithm',
      title: 'LeetCode 142: Detect Cycle Start with Floyd\'s Tortoise & Hare Algorithm',
      description: 'Master Floyd\'s cycle detection algorithm for finding cycle entry points in linked lists. Covers both compact interview solution and teaching-friendly implementation with mathematical intuition.',
      date: '2025-08-25T19:30:00.000Z',
      tags: ['JavaScript', 'Data Structures', 'Algorithms', 'Best Practices'],
      canonicalUrl: 'https://blog.liuyuelin.dev/blog/detect-cycle-floyd-tortoise-hare-algorithm'
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