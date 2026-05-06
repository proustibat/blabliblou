import {Card} from "components/ui";
import { Link } from 'react-router-dom';
import type {Recording} from "./types.ts";

type RecordingsListProps = {
  recordings: Recording[];
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string) => void;
};
export const RecordingsList = ({ recordings, favoriteIds, onToggleFavorite } :RecordingsListProps) => {
  return (
    <div className="space-y-3">
      {recordings.map((rec) => (
        <Link
          key={rec.id}
          to={`/recordings/${rec.id}`}
          className="block group"
        >
          <Card
            className="flex items-center justify-between gap-3 transition-colors group-hover:bg-slate-50">
            <div className="space-y-1">
              <h2 className="text-sm font-medium text-slate-900 group-hover:text-slate-950">
                {rec.title}
              </h2>

              {/* Tag industry */}
              <span
                className="inline-block bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                {rec.industry}
              </span>

              <p className="text-xs text-slate-500">
                {new Date(rec.date).toLocaleString()} • {rec.duration}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={favoriteIds.has(rec.id) ? "Remove from favorites" : "Add to favorites"}
                aria-pressed={favoriteIds.has(rec.id)}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onToggleFavorite(rec.id);
                }}
                className="rounded-full p-2 text-amber-500 hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={favoriteIds.has(rec.id) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.6a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.492 20.937a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.556l-4.204-3.6a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345l2.125-5.111Z"
                  />
                </svg>
              </button>
              <span className="text-xs text-slate-400 group-hover:text-slate-500">→</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
