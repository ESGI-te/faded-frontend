import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '@components/ErrorBoundary';

const FullPageLayout = ({ children }) => {
    return (
        <Main>
            <ErrorBoundary>{children}</ErrorBoundary>
        </Main>
    );
};

const Main = styled.main`
    min-height: 100dvh;
    width: 100%;

    & > * {
        min-height: inherit;
        width: 100%;
    }
`;

export default FullPageLayout;
