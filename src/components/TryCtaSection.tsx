import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TryCtaSection = () => {
  return (
    <section
      id="try-cta"
      className="py-24 sm:py-32 px-4 bg-secondary/30 text-center"
      aria-labelledby="try-cta-heading"
    >
      <div className="container max-w-2xl">
        <h2 id="try-cta-heading" className="text-3xl sm:text-4xl font-bold mb-4 gradient-text inline-block">
          Try it out
        </h2>
        <p className="text-muted-foreground mb-2 text-lg">
          No signup required for the demo.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          We don't store your uploads in this prototype. All processing is in-memory.
        </p>
        <Link to="/try">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box animate-pulse-glow text-base px-10">
            Try it out for free
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TryCtaSection;
