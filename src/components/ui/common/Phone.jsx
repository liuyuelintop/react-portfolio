import PropTypes from "prop-types";

// A real app capture in a plain device outline. The captures are 430 x 932 pt
// with the iPhone safe areas left clear, so the island is drawn here.
export default function Phone({ src, alt, priority = false, className = "" }) {
  return (
    <span className={`phone ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized local asset */}
      <img
        src={src}
        alt={alt}
        width="860"
        height="1864"
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </span>
  );
}

Phone.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  priority: PropTypes.bool,
  className: PropTypes.string,
};
