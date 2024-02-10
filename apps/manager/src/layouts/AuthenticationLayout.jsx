import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '@components/ErrorBoundary';

const AuthenticationLayout = () => (
    <Container>
        <Main>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </Main>
    </Container>
);

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const Main = styled.main`
    width: 100%;
    height: 100%;
    flex-grow: 1;
    background-color: var(--white);

    & > * {
        flex: 1;
    }
`;

export default AuthenticationLayout;
