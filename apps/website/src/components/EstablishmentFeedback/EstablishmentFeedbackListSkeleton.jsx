import Stack from 'shared/src/components/Stack';
import styled, { css, keyframes } from 'styled-components';

const EstablishmentFeedbackListSkeleton = () => {
    return (
        <Stack gap="0.5rem">
            <Block height="1.5rem" width="1.5rem" />
            <Line height="0.75rem" width="100%" />
            <Line height="0.75rem" width="100%" />
            <Line height="0.75rem" width="100%" />
            <Line height="0.75rem" width="100%" />
            <Line height="0.75rem" width="30%" />
        </Stack>
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
const Circle = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: var(--r-full);
    background-color: var(--neutral100);

    ${({ height }) => height && `height: ${height};`}
    ${({ width }) => width && `width: ${width};`}
    ${({ color }) => color && `background-color: var(${color});`}

    ${shimmering}
`;

export default EstablishmentFeedbackListSkeleton;
