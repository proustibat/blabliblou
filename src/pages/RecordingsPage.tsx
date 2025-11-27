import { Link } from "react-router-dom";
import { useRecordings } from "features/recordings/useRecordings";
import { Spinner } from "components/ui";

export const RecordingsPage = () => {
    const { data: recordings, isLoading } = useRecordings();

    if (isLoading) return <Spinner />;

    return (
        <div className="p-8 space-y-2">
            <h1 className="text-2xl font-bold">Recordings</h1>
            <ul>
                {recordings?.map(rec => (
                    <li key={rec.id}>
                        <Link to={`/recordings/${rec.id}`} className="text-blue-500 hover:underline">
                            {rec.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
