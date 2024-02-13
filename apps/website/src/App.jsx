import { Theme, mediaQueries } from 'shared/src/styles/theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import IntlProvider from '@contexts/IntlProvider';
import AuthProvider from '@contexts/AuthProvider';
import routes from './routes';
import { useEffect } from 'react'; 

const router = createBrowserRouter(routes);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 /* ms */ * 60 /* sec */ * 60 /* min */, // 60 min
        },
    },
});
const loadGoogleMapsScript = () => {
    const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=searchPlaces`;
    if (!document.querySelector(`script[src="${googleMapsScriptUrl}"]`)) {
        const script = document.createElement("script");
        script.src = googleMapsScriptUrl;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }
};


function App() {
    useEffect(() => {
        loadGoogleMapsScript();
    }, []);
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
