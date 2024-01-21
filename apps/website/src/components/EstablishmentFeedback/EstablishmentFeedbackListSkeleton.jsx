import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import { shimmering } from 'shared/src/styles/animations';

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
