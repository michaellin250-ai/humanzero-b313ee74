import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 80, className = "" }: TypewriterTextProps) => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedCount(text.length);
      return;
    }
    if (displayedCount < text.length) {
      const timer = setTimeout(() => setDisplayedCount((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }
  }, [displayedCount, text, speed, prefersReducedMotion]);

  return (
    <span className={className} aria-label={text} role="heading" aria-level={1}>
      <span aria-hidden="true">
        {text.slice(0, displayedCount)}
        {displayedCount < text.length && (
          <span className="animate-blink text-primary">|</span>
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
};

export default TypewriterText;
