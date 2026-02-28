import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  targetId: string;
}

const ScrollIndicator = ({ targetId }: ScrollIndicatorProps) => (
  <div className="flex justify-center mt-12">
    <a
      href={`#${targetId}`}
      className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Scroll to next section"
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <ChevronDown size={20} className="animate-bounce" />
    </a>
  </div>
);

export default ScrollIndicator;
