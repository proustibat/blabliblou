import { type Recording } from "./types";
import { fetchRecordings } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useRecordings = () => {
  return useQuery<Recording[]>({
    queryKey: ["recordings"],
    queryFn: fetchRecordings,
  });
};