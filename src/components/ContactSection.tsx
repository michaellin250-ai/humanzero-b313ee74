import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Reveal } from "@/hooks/use-scroll-reveal";

const ContactSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: "Thanks!", description: "You've been added to our mailing list." });
    setEmail("");
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-4"
      aria-labelledby="contact-heading"
    >
      <div className="container max-w-2xl text-center">
        <Reveal>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-6 gradient-text inline-block">
            Contact us
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-muted-foreground text-lg mb-2">
            Any questions or feedback you would like to give?
          </p>
          <p className="text-muted-foreground mb-8">
            Please contact us at{" "}
            <a
              href="mailto:michaellin250@gmail.com"
              className="text-primary hover:underline"
            >
              michaellin250@gmail.com
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="glass rounded-lg p-6 max-w-md mx-auto">
            <p className="text-foreground font-medium mb-4">
              Join our mailing list
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                aria-label="Email address for mailing list"
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box animate-pulse-glow hover-lift">
                Subscribe
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
