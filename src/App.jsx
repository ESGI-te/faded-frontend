import { Theme, mediaQueries } from '@styles/theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter(routes);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 /* ms */ * 60 /* sec */ * 60 /* min */, // 60 min
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={mediaQueries}>
            <QueryClientProvider client={queryClient}>
                <Theme />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
