import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Barbers from '@components/Barbers';

const EstablishmentTeamPage = () => (
    <Page>
        <PageInnerWrapper>
            <TitleWrapper>
                <Text variant="headingM" fontWeight="--fw-bold">
                    Gérer mon équipe
                </Text>
                <Text variant="bodyL" color="--neutral500">
                    Ajoutez, modifiez ou supprimez des membres de votre équipe
                </Text>
            </TitleWrapper>
            <Barbers />
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

export default EstablishmentTeamPage;
