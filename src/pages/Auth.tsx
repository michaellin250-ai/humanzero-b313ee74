import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 noise-bg">
      <div className="relative z-10 text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 glow-text">Coming soon</h1>
        <p className="text-muted-foreground mb-8">
          Account creation and login are on the way. Stay tuned.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default Auth;
