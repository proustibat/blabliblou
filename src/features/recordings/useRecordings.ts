import { useQuery } from "@tanstack/react-query";
import { fetchRecordings } from "./api";
import { type Recording } from "./types";

export const useRecordings = () => {
    return useQuery<Recording[]>({
        queryKey: ["recordings"],
        queryFn: fetchRecordings,
    });
};