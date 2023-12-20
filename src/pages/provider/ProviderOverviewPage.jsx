import styled from 'styled-components';

const ProviderOverviewPage = (props) => {
    return <Page>ProviderOverviewPage</Page>;
};

const Page = styled.section`
    align-self: stretch;
    display: flex;
    align-items: start;
    background-color: var(--background);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;

ProviderOverviewPage.propTypes = {};

export default ProviderOverviewPage;
