import Text from '@components/Text';
import Stack from '@components/Stack';
import styled from 'styled-components';
import BlobIllustration from '@public/images/illustration-register.svg?react';
import Register from '@components/Register';
import Link from '@components/Link';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {
    return (
        <Page>
            <RegisterWrapper>
                <Stack gap="0.25rem">
                    <Text variant="headingXL" fontWeight="--fw-bold">
                        <FormattedMessage defaultMessage="Rejoignez des milliers d'utilisateurs." />
                    </Text>
                    <Text>Sunt id dolor eu officia ex amet voluptate esse velit.</Text>
                </Stack>
                <Register />
                <Link to="/login">
                    <FormattedMessage defaultMessage="Déjà inscrit ? Connectez-vous." />
                </Link>
            </RegisterWrapper>
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
    width: 100%;
    padding: var(--container-padding-mobile);
    background-image: url('/images/blob-register.svg');
    background-repeat: no-repeat;
    background-position: top 20% left 50%;
    background-size: 18rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
        flex-direction: row;
        column-gap: 2rem;
        background: none;
        align-self: center;

        & > * {
            width: 50%;
        }
    }
`;
const RegisterWrapper = styled.div`
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
