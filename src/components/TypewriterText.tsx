import { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterText = ({ text, speed = 80, delay = 0, className = "" }: TypewriterTextProps) => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [started, setStarted] = useState(delay === 0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (delay > 0 && !started) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay, started]);

  // Natural typing: slight random variation per keystroke
  const getNextDelay = useCallback(() => {
    const variance = speed * 0.4;
    return speed + (Math.random() * variance * 2 - variance);
  }, [speed]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedCount(text.length);
      return;
    }
    if (!started) return;
    if (displayedCount < text.length) {
      const timer = setTimeout(() => setDisplayedCount((c) => c + 1), getNextDelay());
      return () => clearTimeout(timer);
    }
  }, [displayedCount, text, prefersReducedMotion, started, getNextDelay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, displayedCount)}
        {started && displayedCount < text.length && (
          <span className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle animate-blink" />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
};

export default TypewriterText;
