import { Button, Card, Spinner } from "components/ui";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAI } from "features/ai/useAI";
import { useRecording } from "features/recordings/useRecording";


export const RecordingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recording, isLoading: isRecordingLoading } = useRecording(id!);

  // Hook AI : enabled = false pour ne pas lancer automatiquement
  const { data: aiSummary, isFetching: isAnalyzing, refetch, isLoading:iseLoadingSummary } = useAI(recording);

  if (isRecordingLoading) return <Spinner />;
  if (!recording) return <div>Recording not found</div>;

  return (
    <div className="p-8 space-y-4">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to recordings
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight">
        {recording.title}
      </h1>
      <span className="inline-block bg-slate-900 text-slate-50 text-xs px-3 py-1 rounded-full font-medium">
        {recording.industry}
      </span>

      <div className="space-y-3 text-sm mt-4">

        {/* Date */}
        <div>
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Date
          </p>
          <p className="text-slate-800">
            {new Date(recording.date).toLocaleString()}
          </p>
        </div>

        {/* Duration */}
        <div>
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Duration
          </p>
          <span className="inline-block bg-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full">
            {recording.duration}
          </span>
        </div>

        {/* Participants */}
        <div>
          <p className="text-xs uppercase font-medium text-slate-400 tracking-wider">
            Participants
          </p>
          <ul className="mt-1 space-y-1 text-slate-800 leading-relaxed list-disc list-inside">
            {recording.participants.map((participant) => (
              <li key={participant}>{participant}</li>
            ))}
          </ul>
        </div>
      </div>


      {!aiSummary &&  <Button onClick={() => refetch()} disabled={isAnalyzing}>
        {isAnalyzing||iseLoadingSummary ? <Spinner/> : "Summarize with AI"}
      </Button>}


      {aiSummary && (
        <Card className="mt-4 p-4 bg-yellow-50">
          <h2 className="font-bold text-xl mb-3">AI Summary</h2>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold mt-4 mb-2 text-indigo-700">
                    {children}
                  </h3>
                ),
                li: ({ children }) => (
                  <li className="ml-6 list-disc text-gray-800">{children}</li>
                ),
              }}
            >
              {aiSummary}
            </ReactMarkdown>
          </div>
        </Card>
      )}

      <Card className="p-4 bg-gray-100">
        <h2 className="font-bold mb-2">Transcript</h2>
        <pre className="whitespace-pre-wrap">{recording.transcript}</pre>
      </Card>
    </div>
  );
};
