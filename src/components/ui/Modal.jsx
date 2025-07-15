// src/components/ui/Modal.jsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";

export default function Modal({ open, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    // automatically focus the first actionable element
    setTimeout(() => {
      ref.current?.focus();
    }, 0);
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
            className="relative bg-neutral-900 rounded-xl sm:p-8 p-3 w-[97vw] max-w-lg max-h-[80vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden outline-none"
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
