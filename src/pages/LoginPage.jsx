import Login from '@components/Login';
import styled from 'styled-components';

const LoginPage = () => {
    return (
        <Page>
            <Login />
        </Page>
    );
};

const Page = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.tabletAndUp} {
        padding: var(--container-padding);
    }
`;

export default LoginPage;
