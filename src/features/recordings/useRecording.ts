import { useQuery } from "@tanstack/react-query";
import { fetchRecordingById } from "./api";
import { type Recording } from "./types";

export const useRecording = (id: string) => {
    return useQuery<Recording | undefined>({
        queryKey: ["recording", id],
        queryFn: () => fetchRecordingById(id),
    });
};