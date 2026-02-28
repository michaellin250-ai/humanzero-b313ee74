import { Image, Video, Eye, FileSearch } from "lucide-react";
import ScrollIndicator from "./ScrollIndicator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const bullets = [
  { icon: Image, text: "Detect AI-generated images" },
  { icon: Video, text: "Detect manipulated / deepfake video (frame sampling)" },
  { icon: Eye, text: "Provide interpretable results (highlights / keyframes)" },
  { icon: FileSearch, text: "Show provenance / metadata status" },
];

const accordionItems = [
  { value: "preprocessing", title: "Preprocessing", content: "Media is normalized, resized, and prepared for model ingestion. Metadata is extracted and preserved for provenance checks." },
  { value: "detection", title: "Detection models", content: "Multiple classification models analyze the media for synthetic artifacts, inconsistencies, and statistical anomalies." },
  { value: "frame-scoring", title: "Frame scoring for video", content: "Video is sampled at key intervals. Each frame is scored independently, then aggregated into a timeline of confidence scores." },
  { value: "limitations", title: "Limitations & responsible use", content: "Results are probabilistic. Heavily compressed or re-encoded media may reduce reliability. Do not use as sole evidence for accusations or enforcement." },
];

const WhatWeDoSection = () => {
  return (
    <section
      id="what-we-do"
      className="py-24 sm:py-32 px-4 bg-secondary/30"
      aria-labelledby="what-we-do-heading"
    >
      <div className="container max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left - text */}
          <div>
            <h2 id="what-we-do-heading" className="text-3xl sm:text-4xl font-bold mb-8 gradient-text inline-block">
              What do we do?
            </h2>
            <ul className="space-y-5">
              {bullets.map((b) => (
                <li key={b.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <b.icon size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-foreground">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - accordion */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">How it works</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {accordionItems.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="glass rounded-lg px-4 border border-border/50"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <ScrollIndicator targetId="who-we-are" />
      </div>
    </section>
  );
};

export default WhatWeDoSection;
