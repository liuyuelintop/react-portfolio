import React from 'react';

export const Skeleton = ({ 
  className = "", 
  variant = "default",
  width,
  height,
  rounded = true,
  animate = true,
  children
}) => {
  const variants = {
    default: "bg-neutral-200 dark:bg-neutral-800",
    card: "bg-neutral-100 dark:bg-neutral-900 rounded-xl",
    text: "bg-neutral-200 dark:bg-neutral-800 rounded h-4",
    avatar: "bg-neutral-200 dark:bg-neutral-800 rounded-full",
    button: "bg-neutral-200 dark:bg-neutral-800 rounded-lg h-10",
    image: "bg-neutral-200 dark:bg-neutral-800 rounded-lg"
  };

  const baseClasses = [
    variants[variant],
    animate && "animate-pulse",
    rounded && variant === "default" && "rounded",
    className
  ].filter(Boolean).join(" ");

  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  if (children) {
    return (
      <div className={baseClasses} style={style}>
        {children}
      </div>
    );
  }

  return <div className={baseClasses} style={style} />;
};

// Specific skeleton components for common use cases
export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        variant="text" 
        width={i === lines - 1 ? "75%" : "100%"}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = "" }) => (
  <Skeleton variant="card" className={`p-4 ${className}`}>
    <div className="space-y-3">
      <Skeleton variant="image" className="h-32 w-full" />
      <Skeleton variant="text" width="80%" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="button" width="80px" />
        <Skeleton variant="button" width="80px" />
      </div>
    </div>
  </Skeleton>
);

export const SkeletonAvatar = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  return (
    <Skeleton 
      variant="avatar" 
      className={`${sizes[size]} ${className}`}
    />
  );
};

export const SkeletonProject = ({ className = "" }) => (
  <div className={`space-y-4 ${className}`}>
    <Skeleton variant="image" className="aspect-video w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" width="70%" className="h-5" />
      <SkeletonText lines={2} />
      <div className="flex flex-wrap gap-2 mt-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonExperience = ({ className = "" }) => (
  <div className={`grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4 md:gap-8 ${className}`}>
    <div className="space-y-2">
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="70%" />
    </div>
    <div className="space-y-2">
      <SkeletonText lines={3} />
    </div>
  </div>
);

export default Skeleton;