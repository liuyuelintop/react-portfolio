import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GITHUB_CONFIG } from '../constants/github';

const ACTIVITY_TYPES = {
  'PushEvent': { icon: '📤', label: 'Pushed code', color: 'text-green-400' },
  'CreateEvent': { icon: '✨', label: 'Created', color: 'text-blue-400' },
  'IssuesEvent': { icon: '🐛', label: 'Issue activity', color: 'text-orange-400' },
  'PullRequestEvent': { icon: '🔄', label: 'Pull request', color: 'text-purple-400' },
  'ForkEvent': { icon: '🍴', label: 'Forked', color: 'text-cyan-400' },
  'WatchEvent': { icon: '⭐', label: 'Starred', color: 'text-yellow-400' },
  'DeleteEvent': { icon: '🗑️', label: 'Deleted', color: 'text-red-400' }
};

const ActivityCard = ({ activity, index, theme }) => {
  const activityType = ACTIVITY_TYPES[activity.type] || { 
    icon: '📋', 
    label: 'Activity', 
    color: 'text-neutral-400' 
  };

  const getActivityDescription = () => {
    const repo = activity.repo.name.split('/')[1];
    
    switch (activity.type) {
      case 'PushEvent':
        const commitCount = activity.payload.commits?.length || 1;
        return `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repo}`;
      case 'CreateEvent':
        return `Created ${activity.payload.ref_type} in ${repo}`;
      case 'IssuesEvent':
        return `${activity.payload.action} issue in ${repo}`;
      case 'PullRequestEvent':
        return `${activity.payload.action} pull request in ${repo}`;
      case 'ForkEvent':
        return `Forked ${repo}`;
      case 'WatchEvent':
        return `Starred ${repo}`;
      case 'DeleteEvent':
        return `Deleted ${activity.payload.ref_type} in ${repo}`;
      default:
        return `Activity in ${repo}`;
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const activityTime = new Date(dateString);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / (24 * 7))}w ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`
        flex items-center gap-3 p-3 rounded-lg cursor-pointer group transition-colors duration-200
        ${theme.currentTheme === 'minimal'
          ? 'hover:bg-gray-50 border border-gray-100'
          : 'hover:bg-neutral-700/50 border border-neutral-700/30'
        }
      `}
      onClick={() => window.open(`https://github.com/${activity.repo.name}`, '_blank')}
    >
      {/* Activity Icon */}
      <div className={`
        text-2xl transition-transform duration-200 group-hover:scale-110
      `}>
        {activityType.icon}
      </div>

      {/* Activity Details */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
        }`}>
          {getActivityDescription()}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${
            theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
          }`}>
            {formatTimeAgo(activity.created_at)}
          </span>
          {activity.payload.commits && activity.payload.commits.length > 0 && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              theme.currentTheme === 'minimal'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-neutral-700 text-neutral-300'
            }`}>
              +{activity.payload.commits[0].message.split('\n')[0].substring(0, 30)}
              {activity.payload.commits[0].message.length > 30 ? '...' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Repository Link Indicator */}
      <div className={`
        text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200
        ${theme.currentTheme === 'minimal' ? 'text-gray-400' : 'text-neutral-500'}
      `}>
        →
      </div>
    </motion.div>
  );
};

const ActivityStats = ({ activities, theme }) => {
  const stats = activities.reduce((acc, activity) => {
    acc.totalCommits += activity.type === 'PushEvent' ? (activity.payload.commits?.length || 0) : 0;
    acc.repositories.add(activity.repo.name);
    acc.activityTypes.add(activity.type);
    return acc;
  }, { totalCommits: 0, repositories: new Set(), activityTypes: new Set() });

  const statItems = [
    { label: 'Commits', value: stats.totalCommits, icon: '💻' },
    { label: 'Repos', value: stats.repositories.size, icon: '📂' },
    { label: 'Activities', value: activities.length, icon: '⚡' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`
            text-center p-3 rounded-lg
            ${theme.currentTheme === 'minimal'
              ? 'bg-gray-50 border border-gray-100'
              : 'bg-neutral-800/50 border border-neutral-700/30'
            }
          `}
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className={`text-xl font-bold ${
            theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
          }`}>
            {stat.value}
          </div>
          <div className={`text-xs ${
            theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
          }`}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const LoadingState = ({ theme }) => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className={`
          flex items-center gap-3 p-3 rounded-lg animate-pulse
          ${theme.currentTheme === 'minimal' ? 'bg-gray-100' : 'bg-neutral-700/30'}
        `}
      >
        <div className={`w-8 h-8 rounded ${
          theme.currentTheme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
        }`} />
        <div className="flex-1 space-y-2">
          <div className={`h-4 rounded ${
            theme.currentTheme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
          } w-3/4`} />
          <div className={`h-3 rounded ${
            theme.currentTheme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
          } w-1/2`} />
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ onRetry, theme }) => (
  <div className="text-center py-8">
    <div className="text-4xl mb-4">😅</div>
    <h3 className={`text-lg font-bold mb-2 ${
      theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
    }`}>
      GitHub Taking a Coffee Break
    </h3>
    <p className={`text-sm mb-4 ${
      theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
    }`}>
      Couldn't fetch latest activity. GitHub API might be rate limited.
    </p>
    <motion.button
      onClick={onRetry}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${theme.currentTheme === 'minimal'
          ? 'bg-gray-800 hover:bg-gray-700 text-white'
          : 'bg-purple-500 hover:bg-purple-400 text-white'
        }
      `}
    >
      Try Again
    </motion.button>
  </div>
);

export default function GitHubActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const theme = useTheme();

  const fetchGitHubActivity = async () => {
    try {
      setLoading(true);
      setError(false);
      
      // Fetch recent public events from GitHub API
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_CONFIG.username}/events/public?per_page=${GITHUB_CONFIG.maxActivities}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub activity');
      }
      
      const data = await response.json();
      
      // Filter for interesting activity types
      const filteredActivities = data.filter(activity => 
        ['PushEvent', 'CreateEvent', 'IssuesEvent', 'PullRequestEvent', 'ForkEvent', 'WatchEvent'].includes(activity.type)
      );
      
      setActivities(filteredActivities);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching GitHub activity:', error);
      setError(true);
      // Fallback to mock data for demo purposes
      setActivities([
        {
          id: '1',
          type: 'PushEvent',
          repo: { name: `${GITHUB_CONFIG.username}/react-portfolio` },
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          payload: {
            commits: [{ message: 'feat: add GitHub activity integration' }]
          }
        },
        {
          id: '2',
          type: 'CreateEvent',
          repo: { name: `${GITHUB_CONFIG.username}/awesome-project` },
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          payload: { ref_type: 'repository' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubActivity();
    
    // Auto-refresh every configured interval
    const interval = setInterval(fetchGitHubActivity, GITHUB_CONFIG.refreshInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-4xl mx-auto py-16 px-4 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Live from GitHub
        </h2>
        <p className={`text-lg max-w-2xl mx-auto mb-4 ${
          theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
          Real-time activity from my GitHub repositories. See what I'm building right now!
        </p>
        {lastUpdated && (
          <p className={`text-sm ${
            theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-500'
          }`}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </motion.div>

      {/* Activity Content */}
      <div className={`
        rounded-xl p-6 
        ${theme.currentTheme === 'minimal'
          ? 'bg-white border border-gray-200'
          : 'bg-neutral-800/50 border border-neutral-700/50'
        }
      `}>
        {loading && <LoadingState theme={theme} />}
        
        {error && !activities.length && (
          <ErrorState onRetry={fetchGitHubActivity} theme={theme} />
        )}
        
        {!loading && activities.length > 0 && (
          <>
            <ActivityStats activities={activities} theme={theme} />
            
            <div className="space-y-2">
              <AnimatePresence>
                {activities.map((activity, index) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    index={index}
                    theme={theme}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {/* View More Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-6"
            >
              <motion.a
                href={`https://github.com/${GITHUB_CONFIG.username}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors
                  ${theme.currentTheme === 'minimal'
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-purple-500 hover:bg-purple-400 text-white'
                  }
                `}
              >
                <span>View Full GitHub Profile</span>
                <span>→</span>
              </motion.a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}