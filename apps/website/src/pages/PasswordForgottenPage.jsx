import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import Link from 'shared/src/components/Link';
import { FormattedMessage } from 'react-intl';
import PasswordForgotten from '@components/PasswordForgotten';

const PasswordForgottenPage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <RegisterWrapper>
                    <RegisterInner>
                        <Stack gap="0.25rem">
                            <Text variant="headingXL" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Retrouvez l'accès à votre espace prestataire." />
                            </Text>
                            <Text>
                                <FormattedMessage defaultMessage="Si vous avez oublié votre mot de passe, pas de souci. Entrez simplement votre adresse e-mail ci-dessous, et nous vous enverrons un lien pour créer un nouveau mot de passe." />
                            </Text>
                        </Stack>
                        <PasswordForgotten />
                        <Link to="/login">
                            <FormattedMessage defaultMessage="Retourner en arrière" />
                        </Link>
                    </RegisterInner>
                </RegisterWrapper>
                <IllustrationWrapper />
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
const RegisterInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    width: 100%;
    max-width: 500px;
`;
const RegisterWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const IllustrationWrapper = styled.div`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        background-image: url('images/password-forgotten.webp');
        background-size: cover;
    }
`;

export default PasswordForgottenPage;
