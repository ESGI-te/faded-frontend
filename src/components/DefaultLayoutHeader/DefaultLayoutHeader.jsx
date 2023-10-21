import Text from '@components/Text';
import Cluster from '@components/layout/Cluster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DefaultLayoutHeader = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Header>
            <Text variant="bodyL" fontWeight="--fw-bold">
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
    );
};

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4.5rem;
    background-color: var(--white);
    padding-inline: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: 2.5rem;
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
    color: var(--primary);
`;

export default DefaultLayoutHeader;
