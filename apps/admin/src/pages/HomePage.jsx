import Text from 'shared/src/components/Text';
import Stack from 'shared/src/components/Stack';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import BlobIllustration from '@public/images/illustration-home.svg?react';

const HomePage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <SearchWrapper>
                    <Stack gap="0.25rem">
                        <Text variant="headingXL" fontWeight="--fw-bold">
                            <FormattedMessage defaultMessage="Votre style, votre horaire. Simplifiez vos rdv." />
                        </Text>
                        <Text>
                            <FormattedMessage defaultMessage="Depuis votre lit, ou dans le bus réservez en quelques clics." />
                        </Text>
                    </Stack>
                    <h1>Home</h1>
                </SearchWrapper>
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
    background-image: url('/images/blob-home.svg');
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
const SearchWrapper = styled.div`
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
    }
`;

export default HomePage;
