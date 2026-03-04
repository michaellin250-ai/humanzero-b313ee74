import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollIndicator from "./ScrollIndicator";
import { Reveal } from "@/hooks/use-scroll-reveal";

const TryCtaSection = () => {
  return (
    <section
      id="try-cta"
      className="py-24 sm:py-32 px-4 bg-secondary/30 text-center"
      aria-labelledby="try-cta-heading"
    >
      <div className="container max-w-2xl">
        <Reveal>
          <h2 id="try-cta-heading" className="text-3xl sm:text-4xl font-bold mb-4 gradient-text inline-block">
            Try it out
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-muted-foreground mb-2 text-lg">
            No signup required for the demo.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            We don't store your uploads in this prototype. All processing is in-memory.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Link to="/try">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box animate-pulse-glow hover-lift text-base px-10">
              Try it out for free
            </Button>
          </Link>
        </Reveal>
        <ScrollIndicator targetId="who-we-are" />
      </div>
    </section>
  );
};

export default TryCtaSection;
