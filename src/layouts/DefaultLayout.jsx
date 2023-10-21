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
export default DefaultLayout;
