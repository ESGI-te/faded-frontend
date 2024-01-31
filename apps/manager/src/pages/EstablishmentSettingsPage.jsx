import styled from 'styled-components';
import EstablishmentSettings from '@components/EstablishmentSettings';

const EstablishmentSettingsPage = () => (
    <Page>
        <PageInnerWrapper>
            <EstablishmentSettings />
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

export default EstablishmentSettingsPage;
