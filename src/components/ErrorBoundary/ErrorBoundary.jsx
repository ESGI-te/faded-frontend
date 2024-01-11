import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (error) => {
            console.error('Error caught by error boundary:', error);
            setHasError(true);
        };

        window.addEventListener('error', errorHandler);

        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, []);

    return hasError ? (
        <Wrapper>
            <TitleWrapper>
                <Title>Something went wrong</Title>
                <Subtitle>We're sorry, but an error occurred in the application.</Subtitle>
            </TitleWrapper>
            <Video src="/videos/error.mp4" autoPlay loop muted width="100%"></Video>
        </Wrapper>
    ) : (
        <>{children}</>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    padding: 2rem;
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.25rem;
`;
const Video = styled.video`
    width: 100%;
    max-width: 400px;
    border-radius: var(--r-s);
`;
const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.75rem;
    text-align: center;
`;
const Subtitle = styled.h2`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    text-align: center;
`;

export default ErrorBoundary;
