// src/features/ai/useAI.ts
import type {Recording} from "../recordings/types.ts";
import { useQuery } from "@tanstack/react-query";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;


const detailPrompt = `
You are an expert assistant specialized in summarizing business meetings.
Produce a clear and concise summary based strictly on the transcript.
Do NOT invent or infer information that is not explicitly stated.

Rules:
- Ignore filler words, chit-chat, hesitations, or repeated ideas.
- Keep sentences short and factual.
- Use bullet points only.
- No introduction or conclusion.
- No fluff.

Structure the output exactly like this:

**Key Points**
• …

**Decisions Made**
• …

**Risks / Concerns**
• …

**Next Steps**
• …
`;
const simplePrompt = "Summarize this meeting transcript in 3-5 clear bullet points. No intro, no fluff.";


export async function fetchAISummary(transcript: string, detailed: boolean): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing VITE_OPENAI_API_KEY");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: detailed ? detailPrompt : simplePrompt,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
    }),
  });

  if (!response.ok) {
    const txt = await response.text();
    console.error("OpenAI error:", txt);
    throw new Error("Failed to generate summary");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

export const useAI = (recording?: Recording, detailed=true) => {
  return useQuery<string>({
    queryKey: ["ai-summary", recording?.id, `${detailed ? "detailed" : "simple"}`],
    enabled: false,
    queryFn: async () => {
      if (!recording) throw new Error("Missing recording");
      return await fetchAISummary(recording.transcript, detailed);
    },
  });
};

// const fetchAISummary = async (recording: Recording): Promise<string> => {
//     await new Promise(res => setTimeout(res, 1000)); // simulate API call
//     const sentences = recording.transcript.split(".").filter(s => s.trim().length > 0);
//     return sentences.slice(0, 2).join(". ") + ".";
// };



// export const useAI = (recording: Recording | undefined) => {
//     return useQuery({
//         queryKey: ["aiSummary", recording?.id],
//         queryFn: () => fetchAISummary(recording!),
//         enabled: false, // NE PAS lancer automatiquement
//     });
// };
