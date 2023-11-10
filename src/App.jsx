import { Theme, mediaQueries } from '@styles/theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import IntlProvider from '@contexts/IntlProvider';
import AuthProvider from '@contexts/AuthProvider';
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
        <QueryClientProvider client={queryClient}>
            <IntlProvider>
                <ThemeProvider theme={mediaQueries}>
                    <Theme />
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </IntlProvider>
        </QueryClientProvider>
    );
}

export default App;
