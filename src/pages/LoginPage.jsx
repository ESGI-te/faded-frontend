import Login from '@components/Login';
import Text from '@components/Text';
import Stack from '@components/layout/Stack';
import styled from 'styled-components';
import BlobIllustration from '@public/images/illustration-login.svg?react';
import Link from '@components/Link';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {
    return (
        <Page>
            <LoginWrapper>
                <Stack gap="0.25rem">
                    <Text variant="headingXL" fontWeight="--fw-bold">
                        <FormattedMessage defaultMessage="Ravi de vous revoir." />
                    </Text>
                    <Text>Sunt id dolor eu officia ex amet voluptate esse velit.</Text>
                </Stack>
                <Login />
                <Link to="/register">
                    <FormattedMessage defaultMessage="Pas encore inscrit ? Rejoignez nous !" />
                </Link>
            </LoginWrapper>
            <IllustrationWrapper>
                <Illustration />
            </IllustrationWrapper>
        </Page>
    );
};

const Page = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 1rem;
    height: 100%;
    width: 100%;
    padding: var(--container-padding-mobile);
    background-image: url('/public/images/blob-login.svg');
    background-repeat: no-repeat;
    background-position: top 20% left 50%;
    background-size: 18rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
        flex-direction: row;
        column-gap: 2rem;
        background: none;

        & > * {
            width: 50%;
        }
    }
`;
const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    max-width: 600px;
`;
const Illustration = styled(BlobIllustration)`
    width: 40rem;
`;
const IllustrationWrapper = styled.div`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default LoginPage;
