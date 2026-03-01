import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, mediaType } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image data provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert forensic media analyst specializing in detecting AI-generated and manipulated images. Analyze the provided image carefully and respond using the tool provided.

Evaluate the image for these signals:
1. Lighting and shadow consistency
2. Facial feature anomalies (asymmetry, warping, blending artifacts)
3. Skin texture regularity (too smooth, repetitive patterns)
4. Background coherence (warped lines, impossible geometry)
5. Frequency domain anomalies (compression artifacts inconsistent with single encoding)
6. Metadata and provenance indicators
7. Edge artifacts around subjects
8. Hair and fine detail rendering quality
9. Text or symbol coherence
10. Overall photographic plausibility

Be honest and precise. If the image appears authentic, say so. If it shows signs of AI generation or manipulation, identify the specific signals.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze this ${mediaType || "image"} for signs of AI generation or manipulation. Use the analyze_media tool to return your findings.`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "analyze_media",
                description:
                  "Return the analysis results for the media file.",
                parameters: {
                  type: "object",
                  properties: {
                    score: {
                      type: "number",
                      description:
                        "AI likelihood score from 0-100. 0 = definitely authentic, 100 = definitely AI-generated.",
                    },
                    signals: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "List of 3-6 specific forensic signals detected, each as a short sentence.",
                    },
                    summary: {
                      type: "string",
                      description:
                        "A one-sentence summary of the overall assessment.",
                    },
                  },
                  required: ["score", "signals", "summary"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "analyze_media" },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("Unexpected AI response shape:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Could not parse analysis results." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-media error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
