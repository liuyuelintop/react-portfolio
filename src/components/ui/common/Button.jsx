import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { getThemeFocusRing } from '../../../utils/accessibility';

const Button = ({ 
  as: Comp = "button",
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  children,
  className = "",
  onClick,
  ...props 
}) => {
  const { currentTheme } = useTheme();

  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: {
      default: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
      neon: "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5",
      minimal: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
      corporate: "bg-blue-700 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    },
    secondary: {
      default: "border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 hover:shadow-md",
      neon: "border border-cyan-400 text-cyan-400 hover:bg-cyan-950 hover:shadow-md hover:shadow-cyan-400/20",
      minimal: "border border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-sm",
      corporate: "border border-blue-700 text-blue-700 hover:bg-blue-50 hover:shadow-sm"
    },
    ghost: {
      default: "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 hover:shadow-sm",
      neon: "text-cyan-400 hover:bg-cyan-950 hover:shadow-sm",
      minimal: "text-blue-600 hover:bg-blue-50 hover:shadow-sm",
      corporate: "text-blue-700 hover:bg-blue-50 hover:shadow-sm"
    }
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl"
  };

  const variantClasses = variants[variant][currentTheme] || variants[variant].default;
  const sizeClasses = sizes[size];
  const focusClasses = getThemeFocusRing(currentTheme);

  const buttonClasses = [
    baseClasses,
    variantClasses,
    sizeClasses,
    focusClasses,
    className
  ].join(" ");

  const handleClick = (e) => {
    if (disabled || loading || !onClick) return;
    onClick(e);
  };

  const buttonContent = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </>
  );

  if (Comp === "button") {
    return (
      <motion.button
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }

  return (
    <Comp
      className={buttonClasses}
      onClick={handleClick}
      {...props}
    >
      {buttonContent}
    </Comp>
  );
};

export default Button;