import styled, { keyframes, css } from 'styled-components';

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

const shimmer = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`;
const shimmering = css`
    background: var(--neutral50);
    background-image: linear-gradient(
        to right,
        var(--neutral50) 0%,
        #edeef1 20%,
        var(--neutral50) 40%,
        var(--neutral50) 100%
    );
    background-repeat: no-repeat;
    background-size: 800px;
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${shimmer};
    animation-timing-function: linear;
`;
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
