import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterText from "./TypewriterText";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 noise-bg"
      aria-labelledby="hero-heading"
    >
      {/* Gradient orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(205 100% 55%), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Lightning bolt decoration */}
      <svg
        className="absolute top-[15%] right-[10%] w-32 h-64 opacity-10 pointer-events-none"
        viewBox="0 0 120 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M70 0L30 100H60L20 240L100 120H65L110 0H70Z"
          fill="url(#lightning-grad)"
          filter="drop-shadow(0 0 20px hsl(205 100% 55%))"
        />
        <defs>
          <linearGradient id="lightning-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(205 100% 70%)" />
            <stop offset="100%" stopColor="hsl(205 100% 40%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Second smaller bolt */}
      <svg
        className="absolute bottom-[20%] left-[8%] w-20 h-40 opacity-[0.07] pointer-events-none rotate-12"
        viewBox="0 0 120 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M70 0L30 100H60L20 240L100 120H65L110 0H70Z"
          fill="hsl(205 100% 60%)"
          filter="drop-shadow(0 0 15px hsl(205 100% 55%))"
        />
      </svg>

      <div className="relative z-10 max-w-3xl">
        <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 glow-text whitespace-nowrap">
          <TypewriterText text="Welcome to HumanZero" speed={120} />
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
          <TypewriterText text="When seeing isn't believing, verify." speed={80} delay={2600} />
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/try">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box hover-lift text-base px-8">
              Try it out for free
            </Button>
          </Link>
          <a href="#what-is">
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary hover-lift text-base px-8">
              Learn what we do
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#what-is"
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce-slow" />
      </a>
    </section>
  );
};

export default HeroSection;
