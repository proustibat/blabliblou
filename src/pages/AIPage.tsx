import { Link } from 'react-router-dom';

export const AIPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">AI Results</h1>
            <p>Résumés, actions extraites, etc...</p>
            <Link to="/" className="text-blue-500 hover:underline mt-4 block">
                Back to Recordings
            </Link>
        </div>
    );
};