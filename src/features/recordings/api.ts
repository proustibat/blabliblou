import { type Recording } from "./types";
import recordingsData from "mocks/recordings.json";

const recordings: Recording[] = recordingsData as Recording[];

export const fetchRecordings = async (): Promise<Recording[]> => {
  await new Promise(res => setTimeout(res, 500));
  return recordings;
};

export const fetchRecordingById = async (id: string): Promise<Recording | undefined> => {
  await new Promise(res => setTimeout(res, 300));
  return recordings.find(r => r.id === id);
};
