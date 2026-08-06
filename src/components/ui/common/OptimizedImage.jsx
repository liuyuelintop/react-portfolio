import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

const OptimizedImage = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  aspectRatio = "aspect-video",
  showSkeleton = true,
  onLoad,
  onError,
  ...props
}) => {
  const imageRef = useRef(null);
  const [imageState, setImageState] = useState({ src, status: "loading" });
  const imageLoaded = imageState.src === src && imageState.status === "loaded";
  const imageError = imageState.src === src && imageState.status === "error";

  // Statically rendered images can finish loading or fail before hydration
  // attaches event handlers, so sync the state from the DOM for each source.
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) {
      setImageState({
        src,
        status: image.naturalWidth > 0 ? "loaded" : "error",
      });
    }
  }, [src]);

  const handleLoad = (e) => {
    setImageState({ src, status: "loaded" });
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setImageState({ src, status: "error" });
    if (onError) onError(e);
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Skeleton loading state */}
      {showSkeleton && !imageLoaded && !imageError && (
        <Skeleton 
          variant="image" 
          className="absolute inset-0 w-full h-full" 
        />
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
          <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded && !imageError ? 1 : 0 }}
        transition={{ duration: 0.24 }}
        className="absolute inset-0 w-full h-full object-cover"
        {...props}
      />
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['eager', 'lazy']),
  aspectRatio: PropTypes.string,
  showSkeleton: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default OptimizedImage;
