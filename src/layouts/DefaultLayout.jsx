import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Cluster from '@components/Cluster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from '@components/Link';
import Text from '@components/Text';
import { useAuth } from '@contexts/AuthProvider';

const DefaultLayout = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Container>
            <Header>
                <Text as={Link} to="/" variant="bodyL" fontWeight="--fw-bold">
                    BARBERS
                </Text>
                {isAuthenticated ? (
                    <ProfileLink>
                        <ProfileIcon />
                        <ProfileLinkText>Mon compte</ProfileLinkText>
                    </ProfileLink>
                ) : (
                    <Cluster align="center" gap="1rem">
                        <ProviderLink to="/login">Je suis un prestataire</ProviderLink>
                        <LoginLink to="/login">Je m'identifie</LoginLink>
                    </Cluster>
                )}
            </Header>
            <Main>
                <Outlet />
            </Main>
        </Container>
    );
};

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
const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: var(--white);
    padding-inline: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
    }
`;
const ProfileIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: var(--primary);
`;
const ProfileLink = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
`;
const ProfileLinkText = styled(Text)`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: initial;
    }
`;
const ProviderLink = styled(Link)`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: initial;
    }
`;
const LoginLink = styled(Link)`
    font-weight: var(--fw-semibold);
    color: var(--primary500);
`;
export default DefaultLayout;
