import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Single subtle reveal wrapper: one per major section, opacity/transform only.
const Reveal = ({ children, className = "", onMount = false }) => {
  const hidden = { opacity: 0, y: 16 };
  const visible = { opacity: 1, y: 0 };
  const transition = { duration: 0.22, ease: "easeOut" };

  if (onMount) {
    return (
      <motion.div initial={hidden} animate={visible} transition={transition} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-64px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onMount: PropTypes.bool,
};

export default Reveal;
