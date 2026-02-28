import { Upload, Cpu, BarChart3 } from "lucide-react";

const cards = [
  {
    icon: Upload,
    title: "Upload media",
    desc: "Drag and drop an image or video you want to verify.",
  },
  {
    icon: Cpu,
    title: "We analyze signals",
    desc: "Our models examine probabilistic signals across the media.",
  },
  {
    icon: BarChart3,
    title: "Get results",
    desc: "Receive a confidence score and detailed signal breakdown.",
  },
];

const WhatIsSection = () => {
  return (
    <section
      id="what-is"
      className="py-24 sm:py-32 px-4"
      aria-labelledby="what-is-heading"
    >
      <div className="container max-w-5xl">
        <h2 id="what-is-heading" className="text-3xl sm:text-4xl font-bold mb-6 gradient-text inline-block">
          What is HumanZero?
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-4 text-lg">
          HumanZero is an AI authenticity checker that helps people estimate whether media is AI-generated or manipulated.
        </p>
        <p className="text-muted-foreground max-w-2xl mb-12">
          We provide probabilistic signals — not absolute truth — to help you make more informed decisions about the media you encounter.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass rounded-lg p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <card.icon size={20} className="text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
