import { useState, useEffect, useCallback } from 'react';
import { BLOG_CONFIG } from '../constants/blog';

/**
 * Custom hook for fetching and managing blog posts from the Next.js blog API
 * Follows the same pattern as the existing GitHubActivity component
 */
export const useBlogPosts = ({ limit = BLOG_CONFIG.defaultLimit } = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchBlogPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug environment variable
      console.log('🌐 Environment VITE_BLOG_API_URL:', import.meta.env.VITE_BLOG_API_URL);
      console.log('⚙️ Using API URL:', BLOG_CONFIG.apiUrl);
      
      const apiUrl = `${BLOG_CONFIG.apiUrl}${BLOG_CONFIG.feedEndpoint}?limit=${limit}`;
      console.log('🔗 Fetching blog posts from:', apiUrl);
      
      // First test basic connectivity to the blog API
      try {
        const healthCheck = await fetch(`${BLOG_CONFIG.apiUrl}/api/v1/health`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        console.log('❤️ Health check status:', healthCheck.status);
      } catch (healthError) {
        console.warn('⚠️ Health check failed:', healthError.message);
      }
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Remove cache option for now to avoid potential issues
      });
      
      console.log('📡 API Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        // Handle different HTTP status codes
        if (response.status === 404) {
          throw new Error('Blog API endpoint not found. Make sure your blog server is running.');
        } else if (response.status >= 500) {
          throw new Error('Blog server error. Please try again later.');
        } else {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('📝 API Response data:', data);
      
      // Validate response structure
      if (!data || !Array.isArray(data.data)) {
        console.error('❌ Invalid API response format:', data);
        throw new Error('Invalid API response format');
      }
      
      console.log('✅ Found', data.data.length, 'blog posts');
      
      // Transform and validate each post
      const validPosts = data.data
        .filter(post => post && post.slug && post.title && post.canonicalUrl)
        .map(post => ({
          slug: post.slug,
          title: post.title,
          description: post.description || '',
          date: post.date || new Date().toISOString(),
          tags: Array.isArray(post.tags) ? post.tags : [],
          canonicalUrl: post.canonicalUrl,
          // Add computed fields for UI
          formattedDate: formatDate(post.date),
          excerpt: truncateText(post.description || '', BLOG_CONFIG.excerptLength)
        }));
      
      console.log('🎯 Processed', validPosts.length, 'valid posts');
      setPosts(validPosts);
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('🚨 Error fetching blog posts:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      // Check if it's a CORS error
      if (error.message.includes('CORS') || error.message.includes('blocked')) {
        setError('CORS error: Blog API needs to allow cross-origin requests from your portfolio');
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        setError('Network error: Unable to connect to blog API. Is your Next.js server running on port 3000?');
      } else {
        setError(error.message);
      }
      
      // Only use fallback data if API is completely unreachable and we're in production
      // For development, show the error so we can debug the connection
      if (process.env.NODE_ENV === 'production' && error.message.includes('fetch')) {
        console.log('📦 Using fallback blog posts for production');
        const fallbackWithFormatting = BLOG_CONFIG.fallbackPosts.map(post => ({
          ...post,
          formattedDate: formatDate(post.date),
          excerpt: truncateText(post.description, BLOG_CONFIG.excerptLength)
        }));
        setPosts(fallbackWithFormatting);
      } else {
        console.log('🔧 Development mode: showing error instead of fallback data');
        // In development, don't use fallback - show the error so we can fix it
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Initial fetch on mount
  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  // Retry function for error recovery
  const retry = useCallback(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  return {
    posts,
    loading,
    error,
    lastUpdated,
    retry,
    refetch: fetchBlogPosts
  };
};

/**
 * Helper function to format dates for display
 */
const formatDate = (dateString) => {
  if (!dateString) return 'Recent';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    
    // For older posts, show the actual date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.warn('Error formatting date:', dateString);
    return 'Recent';
  }
};

/**
 * Helper function to truncate text for excerpts
 */
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  
  // Find the last complete word within the limit
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
};

export default useBlogPosts;