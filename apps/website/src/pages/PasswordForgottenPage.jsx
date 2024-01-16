import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import BlobIllustration from '@public/images/illustration-login.svg?react';
import Link from 'shared/src/components/Link';
import { FormattedMessage } from 'react-intl';
import PasswordForgotten from '@components/PasswordForgotten';

const PasswordForgottenPage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <LoginWrapper>
                    <Stack gap="0.25rem">
                        <Text variant="headingXL" fontWeight="--fw-bold">
                            <FormattedMessage defaultMessage="Vous avez oublié votre mot de passe ?" />
                        </Text>
                        <Text>
                            <FormattedMessage defaultMessage="Entrez l'adresse e-mail associée à votre compte, et nous vous enverrons un lien pour réinitialiser votre mot de passe." />
                        </Text>
                    </Stack>
                    <PasswordForgotten />
                    <Link to="/login">
                        <FormattedMessage defaultMessage="Retourner en arrière" />
                    </Link>
                </LoginWrapper>
                <IllustrationWrapper>
                    <Illustration />
                </IllustrationWrapper>
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    width: 100%;
    display: flex;
    align-self: stretch;
    justify-content: center;
    background-image: url('/images/blob-login.svg');
    background-repeat: no-repeat;
    background-position: top 20% left 50%;
    background-size: 18rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        background: none;
    }
`;
const PageInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    column-gap: 4rem;
    max-width: var(--container-width);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        column-gap: 6rem;
    }
`;
const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    max-width: 500px;
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
        flex: 1;
    }
`;

export default PasswordForgottenPage;
