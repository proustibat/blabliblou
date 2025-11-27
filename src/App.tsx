import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { RecordingDetailsPage } from 'pages/RecordingDetailsPage';
import { RecordingsPage } from 'pages/RecordingsPage';

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
