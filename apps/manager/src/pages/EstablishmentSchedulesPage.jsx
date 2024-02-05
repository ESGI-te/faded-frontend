import styled from 'styled-components';
import EstablishmentSchedules from '@components/EstablishmentSchedules';

const EstablishmentSchedulesPage = () => (
    <Page>
        <PageInner>
            <SchedulesContainer>
                <EstablishmentSchedules />
            </SchedulesContainer>
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
const SchedulesContainer = styled.div`
    background-color: var(--white);
    border-radius: var(--r-l);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;

export default EstablishmentSchedulesPage;
