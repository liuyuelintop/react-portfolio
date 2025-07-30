// Only the max-h and max-w breakpoints are changed here
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";

export default function Modal({ open, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    setTimeout(() => { ref.current?.focus(); }, 0);
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <FocusLock>
          <motion.div
            ref={ref}
            tabIndex={-1}
            className="
              relative bg-neutral-900 rounded-xl p-0
              w-[97vw] max-w-lg
              md:max-w-xl lg:max-w-2xl
              h-auto
              max-h-[75svh] md:max-h-[60vh] lg:max-h-[55vh]
              flex flex-col shadow-2xl overflow-hidden outline-none
            "
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 40 }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </FocusLock>
      </motion.div>
    </AnimatePresence>
  );
}
