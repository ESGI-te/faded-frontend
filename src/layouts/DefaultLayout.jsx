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
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    width: 100%;
    background-color: var(--white);
`;
export default DefaultLayout;
