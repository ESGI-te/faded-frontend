import styled from 'styled-components';
import EstablishmentServices from '@components/EstablishmentServices';

const EstablishmentServicesPage = () => (
    <Page>
        <PageInnerWrapper>
            <EstablishmentServices />
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
    padding: var(--container-padding-mobile);
    max-width: var(--container-width);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;

export default EstablishmentServicesPage;
