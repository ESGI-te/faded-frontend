import styled from 'styled-components';
import { shimmering } from 'shared/src/styles/animations';

const AppointmentSummaryPageSkeleton = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <Line height="1rem" />
                <Block height="20rem" />
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
`;
const PageInnerWrapper = styled.div`
    width: 40rem;
    padding: var(--container-padding-mobile);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding: var(--container-padding);
    }
`;
const Block = styled.div`
    background-color: var(--neutral100);
    border-radius: var(--r-s);
    width: 100%;
    padding: 1rem;

    ${({ height }) => height && `height: ${height};`}
    ${({ width }) => width && `max-width: ${width};`}
    ${({ color }) => color && `background-color: var(${color});`}
    
    ${shimmering}
`;
const Line = styled.div`
    width: 100%;
    height: 1rem;
    border-radius: var(--r-full);
    background-color: var(--neutral300);

    ${({ height }) => height && `height: ${height};`}
    ${({ width }) => width && `max-width: ${width};`}
    ${({ color }) => color && `background-color: var(${color});`}
    
    ${shimmering}
`;

export default AppointmentSummaryPageSkeleton;
