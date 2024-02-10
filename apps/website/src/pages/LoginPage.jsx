import Login from '@components/Login';
import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import Link from 'shared/src/components/Link';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <LoginWrapper>
                    <LoginInner>
                        <Stack gap="0.25rem">
                            <Text variant="headingXL" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Ravi de vous revoir." />
                            </Text>
                            <Text>
                                <FormattedMessage defaultMessage="Reconnectez-vous pour continuer à explorer, réserver et gérer vos rendez-vous en quelques clics." />
                            </Text>
                        </Stack>
                        <Login />
                        <Link to="/register">
                            <FormattedMessage defaultMessage="Pas encore inscrit ? Rejoignez nous !" />
                        </Link>
                    </LoginInner>
                </LoginWrapper>
                <Illustration />
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
    }
`;
const PageInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    column-gap: 1rem;
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: 0;
    }
`;
const LoginInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    width: 100%;
    max-width: 500px;
`;
const LoginWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Illustration = styled.div`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        background-image: url('images/login.webp');
        background-size: cover;
    }
`;

export default LoginPage;
