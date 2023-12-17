import styled from 'styled-components';

const DashboardPage = (props) => {
    return <Page>DashboardPage</Page>;
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

DashboardPage.propTypes = {};

export default DashboardPage;
