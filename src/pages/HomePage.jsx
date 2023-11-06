import Text from '@components/Text';
import Stack from '@components/Stack';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import BlobIllustration from '@public/images/illustration-home.svg?react';
import HomeSearchEstablishments from '@components/HomeSearchEstablishments';

const HomePage = () => {
    return (
        <Page>
            <RegisterWrapper>
                <Stack gap="0.25rem">
                    <Text variant="headingXL" fontWeight="--fw-bold">
                        <FormattedMessage defaultMessage="Barber appointment Solution in Single Platform." />
                    </Text>
                    <Text>
                        <FormattedMessage defaultMessage="Depuis votre lit, ou dans le bus réservez en quelques clics." />
                    </Text>
                </Stack>
                <HomeSearchEstablishments />
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
    background-image: url('/public/images/blob-home.svg');
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

export default HomePage;
