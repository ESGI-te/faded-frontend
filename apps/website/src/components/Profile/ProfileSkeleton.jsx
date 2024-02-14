import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import { shimmering } from 'shared/src/styles/animations';

const InputBlock = () => (
    <Stack gap="0.5rem">
        <Block height="0.865rem" width="5rem" />
        <Block height="2.5rem" />
    </Stack>
);

const ProfileSkeleton = () => {
    return (
        <Stack gap="2rem">
            <Group>
                <InputBlock />
                <InputBlock />
            </Group>
            <InputBlock />
            <InputBlock />
            <InputBlock />
            <ButtonBlock />
        </Stack>
    );
};

const Block = styled.div`
    background-color: var(--neutral100);
    border-radius: var(--r-s);
    width: 100%;
    flex-grow: 1;

    ${({ height }) => height && `height: ${height};`}
    ${({ width }) => width && `max-width: ${width};`}
    ${({ color }) => color && `background-color: var(${color});`}
    
    ${shimmering}
`;
const ButtonBlock = styled(Block)`
    margin-top: 1rem;
    height: 3rem;
`;
const Group = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 2rem;

        & > * {
            flex: 1;
        }
    }
`;

export default ProfileSkeleton;
