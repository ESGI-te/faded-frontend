import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from '@components/ErrorBoundary';
import Header from '@components/Header';
import AppMenu from '@components/AppMenu';

const DefaultLayout = () => {
    return (
        <Container>
            <Header />
            <AppMenu />
            <Main>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </Main>
        </Container>
    );
};

const Container = styled.div`
    min-height: 100vh;
    position: relative;
`;
const Main = styled.main`
    min-height: calc(100vh - 105px); // 101px = header height
    background-color: var(--white);
    overflow-x: hidden;

    & > * {
        min-height: inherit;
        width: 100%;
    }
`;

DefaultLayout.propTypes = {};

export default DefaultLayout;
