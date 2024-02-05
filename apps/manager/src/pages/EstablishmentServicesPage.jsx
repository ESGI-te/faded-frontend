import styled from 'styled-components';
import EstablishmentServicesForm from '@components/EstablishmentServicesForm';

const EstablishmentServicesPage = () => (
    <Page>
        <PageInner>
            <EstablishmentServicesForm />
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

export default EstablishmentServicesPage;
