import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import { shimmering } from 'shared/src/styles/animations';

const EstablishmentCardSkeleton = () => (
    <Stack gap="1rem">
        <Block height="10rem" />
        <Stack gap="0.5rem">
            <Line height="0.75rem" width="10rem" />
            <Stack gap="0.25rem">
                <Line height="0.5rem" width="10rem" color="--neutral200" />
                <Line height="0.5rem" width="10rem" color="--neutral200" />
                <Line height="0.5rem" width="10rem" color="--neutral200" />
            </Stack>
        </Stack>
        <Block height="1rem" />
    </Stack>
);

const EstablishmentResultsSkeleton = () => {
    return (
        <Wrapper>
            <EstablishmentsWrapper>
                <TitleWrapper>
                    <Line height="0.75rem" width="30rem" />
                    <Line height="0.5rem" width="10rem" color="--neutral200" />
                    <Line height="0.5rem" width="10rem" color="--neutral200" />
                </TitleWrapper>
                <Stack>
                    <EstablishmentCardSkeleton />
                    <EstablishmentCardSkeleton />
                    <EstablishmentCardSkeleton />
                    <EstablishmentCardSkeleton />
                    <EstablishmentCardSkeleton />
                    <EstablishmentCardSkeleton />
                    <EstablishmentCardSkeleton />
                    <EstablishmentCardSkeleton />
                </Stack>
            </EstablishmentsWrapper>
            <MapBlock />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    min-height: 0;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        display: flex;
    }
`;
const EstablishmentsWrapper = styled.div`
    width: 100%;
    padding-inline: var(--container-padding-mobile);
    padding-bottom: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        max-width: 750px;
        height: 100%;
        padding-inline: var(--container-padding);
        padding-bottom: var(--container-padding);
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    padding-block: 1.5rem;
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
const MapBlock = styled(Block)`
    height: 100%;
    width: 100%;
    position: sticky;
    top: 0;
    display: none;
    border-radius: 0;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        display: flex;
    }
`;
export default EstablishmentResultsSkeleton;
