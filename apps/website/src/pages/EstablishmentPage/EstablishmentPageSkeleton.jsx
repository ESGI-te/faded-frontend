import Stack from 'shared/src/components/Stack';
import styled, { keyframes, css } from 'styled-components';

const EstablishmentPageSkeleton = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <ResponsiveWrapper>
                    <ImageBlock />
                    <TitleWrapper>
                        <Line width="30rem" height="1rem" />
                        <Line width="10rem" height="0.75rem" />
                        <Line width="10rem" height="0.75rem" />
                    </TitleWrapper>
                </ResponsiveWrapper>
                <InformationTitleWrapper>
                    <Line width="30rem" height="1rem" />
                    <Line width="10rem" height="0.75rem" />
                </InformationTitleWrapper>
                <ResponsiveContentWrapper>
                    <Stack gap="2rem">
                        <Stack gap="1.25rem">
                            <Line width="10rem" height="1rem" />
                            <Stack gap="1rem">
                                <Block>
                                    <Line width="15rem" />
                                </Block>
                                <Block>
                                    <Line width="15rem" />
                                </Block>
                                <Block>
                                    <Line width="15rem" />
                                </Block>
                                <Block>
                                    <Line width="15rem" />
                                </Block>
                                <Block>
                                    <Line width="15rem" />
                                </Block>
                                <Block>
                                    <Line width="15rem" />
                                </Block>
                            </Stack>
                        </Stack>
                        <Stack gap="1.25rem">
                            <Line width="10rem" height="1rem" />
                            <Block height="25rem" />
                        </Stack>
                        <Stack gap="1.25rem">
                            <Line width="10rem" height="1rem" />
                            <BarberBlock>
                                <Circle width="4rem" height="4rem" />
                                <Circle width="4rem" height="4rem" />
                                <Circle width="4rem" height="4rem" />
                            </BarberBlock>
                        </Stack>
                    </Stack>
                    <Stack gap="2rem">
                        <Block height="10rem" />
                        <Stack gap="1.25rem">
                            <Line width="10rem" height="1rem" />
                            <Block height="30rem" />
                        </Stack>
                    </Stack>
                </ResponsiveContentWrapper>
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
    align-items: start;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        justify-content: center;
    }
`;
const PageInnerWrapper = styled.div`
    width: 100%;
    max-width: var(--container-width);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding-bottom: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding-block: var(--container-padding);
    }
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 1.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);

        & > :first-child {
            order: 1;
        }
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    padding-inline: var(--container-padding-mobile);
    padding-block: 0 var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: 0;
    }
`;
const InformationTitleWrapper = styled.div`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        flex-direction: column;
        row-gap: 0.25rem;
        padding-inline: var(--container-padding);
    }
`;
const ResponsiveContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    padding-inline: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
        flex-direction: row;
        column-gap: 2rem;

        & > :first-child {
            flex: 2;
        }
        & > :last-child {
            flex: 1;
        }
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
const ImageBlock = styled(Block)`
    border-radius: none;
    height: 300px;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        border-radius: var(--r-s);
    }
`;
const BarberBlock = styled(Block)`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`;

export default EstablishmentPageSkeleton;
