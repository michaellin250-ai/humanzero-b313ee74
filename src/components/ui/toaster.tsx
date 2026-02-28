import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

const TOAST_DURATION = 3000;

function ToastWithProgress({ id, title, description, action, ...props }: any) {
  const [progress, setProgress] = useState(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger float-in
    requestAnimationFrame(() => setMounted(true));

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / TOAST_DURATION) * 100);
      setProgress(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Toast
      key={id}
      {...props}
      className={`relative overflow-hidden transition-all duration-500 ease-out ${
        mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      }`}
    >
      <div className="grid gap-1">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>
      {action}
      <ToastClose />
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
        <div
          className="h-full bg-primary transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Toast>
  );
}

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, ...props }) {
        return <ToastWithProgress key={id} id={id} {...props} />;
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
