import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import DefaultLayoutHeader from '@components/DefaultLayoutHeader';

const DefaultLayout = () => (
    <Container>
        <DefaultLayoutHeader />
        <Main>
            <Outlet />
        </Main>
    </Container>
);

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 4.5rem 1fr;
`;
const Main = styled.main`
    width: 100%;
    min-height: 0;
    overflow-y: auto;
    background-color: var(--white);
    display: flex;
    align-items: start;

    & > * {
        flex: 1;
    }
`;
export default DefaultLayout;
