import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Cluster from '@components/Cluster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '@components/Text';
import { useAuth } from '@contexts/AuthProvider';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Link from '@components/Link';
import { FormattedMessage, useIntl } from 'react-intl';
import InputSelect from '@components/InputSelect';
import { LOCALES, useChangeLocale } from '@contexts/IntlProvider';
import ErrorBoundary from '@components/ErrorBoundary';

const Header = () => {
    const { isAuthenticated } = useAuth();
    const { locale } = useIntl();
    const localeItems = Object.values(LOCALES).map((locale) => ({
        name: locale.toUpperCase(),
        id: locale,
    }));
    const changeLocale = useChangeLocale();

    return (
        <HeaderStyled>
            <Text as={Link} to="/" variant="bodyL" fontWeight="--fw-bold">
                BARBERS
            </Text>
            <Cluster gap="2rem" align="center">
                <LanguageSelect
                    onSelectionChange={(locale) => changeLocale(locale)}
                    defaultSelectedKey={locale}
                    items={localeItems}
                />
                {isAuthenticated ? (
                    <ProfileLink to="/profile">
                        <ProfileIcon icon={icon({ name: 'circle-user', style: 'solid' })} />
                        <ProfileLinkText>
                            <FormattedMessage defaultMessage="Mon compte" />
                        </ProfileLinkText>
                    </ProfileLink>
                ) : (
                    <Cluster align="center" gap="1rem">
                        <ProviderLink to="/provider-request">
                            <FormattedMessage defaultMessage="Je deviens un prestataire" />
                        </ProviderLink>
                        <LoginLink to="/login">
                            <FormattedMessage defaultMessage="Je m'identifie" />
                        </LoginLink>
                    </Cluster>
                )}
            </Cluster>
        </HeaderStyled>
    );
};

const DefaultLayout = () => (
    <Container>
        <Header />
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
const HeaderStyled = styled.header`
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
    column-gap: 0.5rem;
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
const LanguageSelect = styled(InputSelect)`
    width: fit-content;
    height: 2rem;

    & > button {
        padding: 0.5rem;
        border: none;
    }
`;

export default DefaultLayout;
