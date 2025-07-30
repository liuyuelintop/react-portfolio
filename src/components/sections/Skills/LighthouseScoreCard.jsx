import { useState, useEffect, memo } from 'react';
import { ExternalLink, Zap } from 'lucide-react';
import { LIGHTHOUSE_SCORES, LIGHTHOUSE_DATE, LIGHTHOUSE_REPORT_URL } from '../../../constants/lighthouseScores';
import { useLighthouseScoreAnimation } from '../../../hooks/useLighthouseScoreAnimation';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

// Memoized CircularProgress for performance
const CircularProgress = memo(function CircularProgress({ value, size = 50, strokeWidth = 4, color = '#4caf50' }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Use requestAnimationFrame for smoother animation
    let raf;
    if (animatedValue !== value) {
      raf = requestAnimationFrame(() => setAnimatedValue(value));
    }
    return () => raf && cancelAnimationFrame(raf);
  }, [value, animatedValue]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90" aria-label={`Score: ${Math.round(animatedValue)}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-white font-semibold text-sm">
          {Math.round(animatedValue)}
        </span>
      </div>
    </div>
  );
});

const LighthouseScoreCard = memo(function LighthouseScoreCard() {
  const [isHovered, setIsHovered] = useState(false);
  const showScores = useLighthouseScoreAnimation();

  return (
    <section
      className="flex justify-center w-full my-8 md:my-12"
      aria-label="Lighthouse Score Card"
    >
      <div
        className={`bg-gradient-to-br from-purple-900/30 via-gray-800/40 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-purple-500/30 transition-all duration-300 w-full max-w-md mx-4 ${isHovered ? 'border-purple-400/50 shadow-lg shadow-purple-500/20 scale-105' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="region"
        aria-label="Lighthouse scores"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-purple-400" aria-hidden="true" />
            <h3 className="text-white font-semibold text-sm">Lighthouse Score</h3>
          </div>
          <div className="text-xl font-bold text-green-400" aria-label="Overall Score">100</div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {LIGHTHOUSE_SCORES.map((score) => (
            <div key={score.name} className="flex items-center space-x-2">
              <CircularProgress
                value={showScores ? score.value : 0}
                size={32}
                strokeWidth={3}
                color={score.color}
              />
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs font-medium truncate">
                  {score.name}
                </div>
                <div className="text-gray-400 text-xs" aria-label={`${score.name} score`}>
                  {showScores ? score.value : 0}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">{LIGHTHOUSE_DATE}</span>
          <a
            href={LIGHTHOUSE_REPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
            aria-label="View full Lighthouse report"
          >
            <span>Report</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
});

export default LighthouseScoreCard;