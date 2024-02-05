import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Appointments from '@components/Appointments';

const ProviderAppointmentsPage = () => (
    <Page>
        <PageInner>
            <TitleWrapper>
                <Text variant="headingM" fontWeight="--fw-bold">
                    Gérer mes RDV
                </Text>
                <Text variant="bodyL" color="--neutral500">
                    Ajoutez, modifiez ou supprimez des membres de votre équipe
                </Text>
            </TitleWrapper>
            <Appointments />
        </PageInner>
    </Page>
);

const Page = styled.section`
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: var(--background);
`;
const PageInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 100%;
    max-width: var(--container-width);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;

export default ProviderAppointmentsPage;
