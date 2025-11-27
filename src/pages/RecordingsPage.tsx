import { Link } from "react-router-dom";
import { useRecordings } from "features/recordings/useRecordings";
import { Spinner, Card } from "components/ui";

export const RecordingsPage = () => {
    const { data: recordings, isLoading } = useRecordings();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <Spinner size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
                <header className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Recordings
                    </h1>
                    <p className="text-sm text-slate-500">
                        Browse your recorded meetings and view details & AI summaries.
                    </p>
                </header>

                <section>
                    {(!recordings || recordings.length === 0) ? (
                        <Card className="text-sm text-slate-500">
                            No recordings available yet.
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {recordings.map((rec) => (
                                <Link
                                    key={rec.id}
                                    to={`/recordings/${rec.id}`}
                                    className="block group"
                                >
                                    <Card className="flex items-center justify-between gap-3 transition-colors group-hover:bg-slate-50">
                                        <div className="space-y-1">
                                            <h2 className="text-sm font-medium text-slate-900 group-hover:text-slate-950">
                                                {rec.title}
                                            </h2>

                                            {/* Tag industry */}
                                            <span className="inline-block bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                                                {rec.industry}
                                            </span>

                                            <p className="text-xs text-slate-500">
                                                {new Date(rec.date).toLocaleString()} • {rec.duration}
                                            </p>
                                        </div>

                                        <span className="text-xs text-slate-400 group-hover:text-slate-500">→</span>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};
