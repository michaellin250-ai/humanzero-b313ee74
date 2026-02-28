const SiteFooter = () => {
  return (
    <footer className="py-10 px-4 border-t border-border/30" role="contentinfo">
      <div className="container max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="font-medium text-foreground">
            Human<span className="text-primary">Zero</span>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Accessibility</a>
          <span>hello@humanzero.ai</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
