import styled from 'styled-components';
import OverviewIndicators from '@components/OverviewIndicators';

const GlobalIndicators = () => {
    return <Indicators />;
};

const Indicators = styled(OverviewIndicators)`
    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        width: 100%;
    }
`;

export default GlobalIndicators;
