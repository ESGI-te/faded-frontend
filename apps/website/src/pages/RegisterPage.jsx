import Register from '@components/Register';
import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import Link from 'shared/src/components/Link';
import { FormattedMessage } from 'react-intl';

const RegisterPage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <RegisterWrapper>
                    <RegisterInner>
                        <Stack gap="0.25rem">
                            <Text variant="headingXL" fontWeight="--fw-bold">
                                <FormattedMessage defaultMessage="Bienvenue sur Barbers." />
                            </Text>
                            <Text>
                                <FormattedMessage defaultMessage="Votre nouveau compagnon pour des rendez-vous coiffure sans effort." />
                            </Text>
                        </Stack>
                        <Register />
                        <Link to="/login">
                            <FormattedMessage defaultMessage="Déjà inscrit ? Connectez-vous." />
                        </Link>
                    </RegisterInner>
                </RegisterWrapper>
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
const Illustration = styled.div`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        background-image: url('images/register.webp');
        background-size: cover;
    }
`;

export default RegisterPage;
