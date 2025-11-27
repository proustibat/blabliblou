// src/features/recordings/types.ts

export interface Recording {
  id: string;
  title: string;
  date: string;          // ISO string
  duration: string;      // ex: "45 min"
  industry: string;
  participants: string[];
  transcript: string;
}
