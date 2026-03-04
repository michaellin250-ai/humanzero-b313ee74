import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterText from "./TypewriterText";
import { Reveal } from "@/hooks/use-scroll-reveal";

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

      {/* Flicker lights */}
      <div
        className="absolute top-[20%] right-[15%] w-40 h-40 rounded-full pointer-events-none animate-[flicker_4s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, hsl(205 100% 60% / 0.25), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[30%] left-[10%] w-32 h-32 rounded-full pointer-events-none animate-[flicker_5s_ease-in-out_1.5s_infinite]"
        style={{ background: "radial-gradient(circle, hsl(205 100% 55% / 0.2), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[50%] left-[50%] -translate-x-1/2 w-24 h-24 rounded-full pointer-events-none animate-[flicker_3.5s_ease-in-out_3s_infinite]"
        style={{ background: "radial-gradient(circle, hsl(205 100% 65% / 0.2), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[15%] right-[12%] w-28 h-28 rounded-full pointer-events-none animate-[flicker_4.5s_ease-in-out_2s_infinite]"
        style={{ background: "radial-gradient(circle, hsl(205 100% 58% / 0.22), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl">
        <Reveal>
          <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 glow-text whitespace-nowrap">
            <TypewriterText text="Welcome to HumanZero" speed={120} />
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            <TypewriterText text="When seeing isn't believing, verify." speed={80} delay={2600} />
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/try">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box animate-pulse-glow hover-lift text-base px-8">
                Try it out for free
              </Button>
            </Link>
            <a href="#what-is">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary hover-lift text-base px-8">
                Learn what we do
              </Button>
            </a>
          </div>
        </Reveal>
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
