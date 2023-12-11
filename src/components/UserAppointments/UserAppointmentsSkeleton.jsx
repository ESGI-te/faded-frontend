import Stack from '@components/Stack';
import styled, { keyframes, css } from 'styled-components';

const UserAppointmentsSkeleton = () => {
    return (
        <Stack gap="1rem">
            <Block height="22rem" width="100%" />
            <Block height="22rem" width="100%" />
            <Block height="22rem" width="100%" />
            <Block height="22rem" width="100%" />
            <Block height="22rem" width="100%" />
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
const ResponsiveWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;

    & > * {
        flex: 1;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        & > * {
            flex: none;
            width: 10rem;
        }
    }
`;
export default UserAppointmentsSkeleton;
