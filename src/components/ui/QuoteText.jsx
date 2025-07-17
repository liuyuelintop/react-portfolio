import { useState, useRef, useEffect } from "react";

const CLAMP_LINES = 5;

const QuoteText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const quoteRef = useRef();

  useEffect(() => {
    const element = quoteRef.current;
    if (!element) return;

    const checkTruncation = () => {
      const overflow = element.scrollHeight > element.clientHeight + 1;
      setIsTruncated(overflow);
    };

    checkTruncation();

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(element);

    window.addEventListener("resize", checkTruncation);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkTruncation);
    };
  }, [text]);

  return (
    <div>
      <p
        ref={quoteRef}
        className={`text-gray-200 italic text-base leading-snug sm:text-[1rem] sm:leading-relaxed transition-all duration-200 ${!expanded ? `line-clamp-${CLAMP_LINES}` : ""
          }`}
      >
        "{text}"
      </p>
      {isTruncated && (
        <button
          aria-label="Toggle Quote Expansion"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-purple-400 hover:underline text-sm font-medium"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default QuoteText;
