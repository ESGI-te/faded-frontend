import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Link from '@components/Link';
import ErrorBoundary from '@components/ErrorBoundary';

const AuthenticationLayout = () => (
    <Container>
        <Header>
            <HomeLink to="/">BARBERS</HomeLink>
        </Header>
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
    flex-grow: 1;
    min-height: 0;
    overflow-y: auto;
    background-color: var(--white);
    display: flex;
    align-items: start;

    & > * {
        flex: 1;
    }
`;
const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 4.5rem;
    background-color: var(--white);
    padding-inline: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: 2.5rem;
    }
`;
const HomeLink = styled(Link)`
    font-size: var(--fs-heading-s);
    color: var(--black);
    font-weight: var(--fw-bold);
`;

export default AuthenticationLayout;
