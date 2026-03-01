import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, FileImage, FileVideo, AlertTriangle, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type MediaType = "photo" | "video";
type AnalysisState = "idle" | "uploading" | "analyzing" | "done";

interface Result {
  score: number;
  signals: string[];
  summary?: string;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data URL prefix to get raw base64
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const acceptMap: Record<MediaType, string> = {
  photo: ".jpg,.jpeg,.png,.webp",
  video: ".mp4,.mov,.webm",
};

const TryPage = () => {
  const [tab, setTab] = useState<MediaType>("photo");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleFile = useCallback((f: File | null) => {
    setFile(f);
    setResult(null);
    setState("idle");
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const analyze = useCallback(async () => {
    if (!file) return;
    setState("uploading");
    setProgress(0);
    const abortController = new AbortController();
    abortRef.current = abortController;

    // Simulate progress while waiting for the AI response
    const interval = setInterval(() => {
      if (abortController.signal.aborted) {
        clearInterval(interval);
        return;
      }
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + Math.random() * 8;
      });
    }, 300);

    try {
      // Convert file to base64
      setState("uploading");
      const imageBase64 = await fileToBase64(file);

      if (abortController.signal.aborted) {
        clearInterval(interval);
        return;
      }

      setState("analyzing");

      const { data, error } = await supabase.functions.invoke("analyze-media", {
        body: { imageBase64, mediaType: tab },
      });

      if (abortController.signal.aborted) {
        clearInterval(interval);
        return;
      }

      if (error) {
        throw new Error(error.message || "Analysis failed");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      clearInterval(interval);
      setProgress(100);
      setResult({
        score: data.score,
        signals: data.signals,
        summary: data.summary,
      });
      setState("done");
    } catch (e) {
      clearInterval(interval);
      if (abortController.signal.aborted) return;
      console.error("Analysis error:", e);
      toast.error(e instanceof Error ? e.message : "Analysis failed. Please try again.");
      setState("idle");
      setProgress(0);
    }
  }, [file, tab]);

  const cancelAnalysis = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState("idle");
    setProgress(0);
  }, []);

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setFile(null);
    setPreview(null);
    setResult(null);
    setState("idle");
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background noise-bg">
      <div className="container max-w-3xl py-8 px-4 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2 glow-text">Try it out for free</h1>
        <p className="text-muted-foreground mb-8">
          Upload a photo or video to analyze. This is a demo — results are probabilistic.
        </p>

        <Tabs value={tab} onValueChange={(v) => { setTab(v as MediaType); reset(); }}>
          <TabsList className="bg-secondary mb-6">
            <TabsTrigger value="photo" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <FileImage size={16} className="mr-2" aria-hidden="true" />
              Photo
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <FileVideo size={16} className="mr-2" aria-hidden="true" />
              Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tab}>
            {/* Upload zone */}
            {!file && (
              <div
                className="glass rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors p-12 text-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label={`Upload ${tab} file`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
              >
                <Upload size={40} className="mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
                <p className="text-foreground font-medium mb-1">
                  Drag & drop or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  {tab === "photo" ? "JPG, PNG, WebP — max 10 MB" : "MP4, MOV, WebM — max 50 MB"}
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept={acceptMap[tab]}
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] || null)}
                  aria-label={`Select ${tab} file`}
                />
              </div>
            )}

            {/* Preview + actions */}
            {file && (
              <div className="space-y-6">
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-foreground font-medium truncate max-w-[70%]">{file.name}</p>
                    <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground hover:text-foreground">
                      <RotateCcw size={14} className="mr-1" aria-hidden="true" />
                      Change file
                    </Button>
                  </div>

                  {preview && tab === "photo" && (
                    <img
                      src={preview}
                      alt="Uploaded preview"
                      className="rounded-md max-h-64 mx-auto object-contain"
                    />
                  )}
                  {preview && tab === "video" && (
                    <video
                      src={preview}
                      controls
                      className="rounded-md max-h-64 mx-auto"
                      aria-label="Uploaded video preview"
                    />
                  )}
                </div>

                {state === "idle" && (
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
                    onClick={analyze}
                  >
                    Analyze
                  </Button>
                )}

                {(state === "uploading" || state === "analyzing") && (
                  <div className="space-y-3" aria-live="polite">
                    <Progress value={progress} className="h-2 bg-secondary" />
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {state === "uploading" ? "Uploading…" : "Analyzing signals…"}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={cancelAnalysis}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X size={14} className="mr-1" aria-hidden="true" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {state === "done" && result && (
                  <div className="space-y-6" aria-live="polite">
                    {/* Score */}
                    <div className="glass rounded-lg p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">AI Likelihood Score</p>
                      <div className="relative w-32 h-32 mx-auto mb-3">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                          <circle
                            cx="50" cy="50" r="42"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(result.score / 100) * 264} 264`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
                          {result.score}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.summary || (result.score > 60 ? "Likely AI-generated or manipulated" : "Appears mostly authentic")}
                      </p>
                    </div>

                    {/* Signals */}
                    <div className="glass rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-3">Detected Signals</h3>
                      <ul className="space-y-2">
                        {result.signals.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" aria-hidden="true" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disclaimers */}
                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-md p-3">
                      <AlertTriangle size={14} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p>This is a demo. Results are probabilistic and may be wrong.</p>
                        <p>Do not use as sole evidence for accusations or enforcement.</p>
                        <p>Heavily compressed or re-encoded media may reduce reliability.</p>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-border text-foreground hover:bg-secondary"
                      onClick={reset}
                    >
                      Upload another file
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TryPage;
