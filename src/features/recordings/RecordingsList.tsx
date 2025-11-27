import {Card} from "components/ui/Card.tsx";
import { Link } from 'react-router-dom';
import {Spinner} from "components/ui/Spinner.tsx";
import { useRecordings } from './useRecordings';

export const RecordingsList = () => {
  const { data, isLoading, error } = useRecordings();

  if (isLoading) return <Spinner size={48} className="mx-auto mt-8" />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      {data?.map(recording => (
        <Link key={recording.id} to={`/recordings/${recording.id}`}>
          <Card title={recording.title} />
        </Link>
      ))}
    </div>
  );
};
