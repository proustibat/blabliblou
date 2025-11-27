// src/features/ai/useAI.ts
import { useQuery } from "@tanstack/react-query";
import type {Recording} from "../recordings/types.ts";

const fetchAISummary = async (recording: Recording): Promise<string> => {
    await new Promise(res => setTimeout(res, 1000)); // simulate API call
    const sentences = recording.transcript.split(".").filter(s => s.trim().length > 0);
    return sentences.slice(0, 2).join(". ") + ".";
};

export const useAI = (recording: Recording | undefined) => {
    return useQuery({
        queryKey: ["aiSummary", recording?.id],
        queryFn: () => fetchAISummary(recording!),
        enabled: false, // NE PAS lancer automatiquement
    });
};
