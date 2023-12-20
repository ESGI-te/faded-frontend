import Establishments from '@components/Establishments';
import Text from '@components/Text';
import styled from 'styled-components';

const ProviderEstablishmentsPage = () => (
    <Page>
        <PageInnerWrapper>
            <TitleWrapper>
                <Text variant="headingM" fontWeight="--fw-bold">
                    Gérer mes établissements
                </Text>
                <Text variant="bodyL" color="--neutral500">
                    Ajoutez, modifiez ou supprimez des établissements
                </Text>
            </TitleWrapper>
            <Establishments />
        </PageInnerWrapper>
    </Page>
);

const Page = styled.section`
    align-self: stretch;
    background-color: var(--background);
`;
const PageInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    background-color: var(--background);
    padding: var(--container-padding-mobile);
    max-width: var(--container-width);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;

export default ProviderEstablishmentsPage;
