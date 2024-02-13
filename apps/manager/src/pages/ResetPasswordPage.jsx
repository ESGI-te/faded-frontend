import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import ResetPassword from '@components/ResetPassword';

const ResetPasswordPage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <ResetPasswordWrapper>
                    <ResetPasswordInner>
                        <Stack gap="0.25rem">
                            <Text variant="headingXL" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Définissez votre nouveau mot de passe." />
                            </Text>
                            <Text>
                                <FormattedMessage defaultMessage="Vous êtes à un pas de retrouver l'accès à votre espace prestataire. Veuillez créer un nouveau mot de passe pour votre compte." />
                            </Text>
                        </Stack>
                        <ResetPassword />
                    </ResetPasswordInner>
                </ResetPasswordWrapper>
                <IllustrationWrapper>{/* <Illustration /> */}</IllustrationWrapper>
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
        padding: var(--container-padding);
    }
`;
const ResetPasswordInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    width: 100%;
    max-width: 500px;
`;
const ResetPasswordWrapper = styled.div`
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
        background-color: var(--primary200);
        border-radius: var(--r-l);
    }
`;

export default ResetPasswordPage;
