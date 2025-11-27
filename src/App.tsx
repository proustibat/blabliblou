import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RecordingsPage } from 'pages/RecordingsPage';
import { RecordingDetailsPage } from 'pages/RecordingDetailsPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    { path: '/', element: <RecordingsPage /> },
    { path: '/recordings/:id', element: <RecordingDetailsPage /> },
]);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
