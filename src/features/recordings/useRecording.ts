import { type Recording } from "./types";
import { fetchRecordingById } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useRecording = (id: string) => {
  return useQuery<Recording | undefined>({
    queryKey: ["recording", id],
    queryFn: () => fetchRecordingById(id),
  });
};