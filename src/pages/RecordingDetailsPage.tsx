import { useParams, Link } from "react-router-dom";
import { useRecording } from "features/recordings/useRecording";
import { useAI } from "features/ai/useAI";
import { Card, Button, Spinner } from "components/ui";

export const RecordingDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: recording, isLoading: isRecordingLoading } = useRecording(id!);

    // Hook AI : enabled = false pour ne pas lancer automatiquement
    const { data: aiSummary, isFetching: isAnalyzing, refetch } = useAI(recording);

    if (isRecordingLoading) return <Spinner />;
    if (!recording) return <div>Recording not found</div>;

    return (
        <div className="p-8 space-y-4">
            <Link to="/" className="text-blue-500 hover:underline">
                ← Back to recordings
            </Link>

            <h1 className="text-2xl font-bold">{recording.title}</h1>
            <p>Date: {new Date(recording.date).toLocaleString()}</p>
            <p>Duration: {recording.duration}</p>
            <p>Industry: {recording.industry}</p>
            <p>Participants: {recording.participants.join(", ")}</p>

            <Card className="p-4 bg-gray-100">
                <h2 className="font-bold mb-2">Transcript</h2>
                <pre className="whitespace-pre-wrap">{recording.transcript}</pre>
            </Card>

            <Button onClick={() => refetch()} disabled={isAnalyzing}>
                {isAnalyzing ? <Spinner /> : "Summarize with AI"}
            </Button>

            {aiSummary && (
                <Card className="mt-4 p-4 bg-yellow-100">
                    <h2 className="font-bold">AI Summary</h2>
                    <p>{aiSummary}</p>
                </Card>
            )}
        </div>
    );
};
