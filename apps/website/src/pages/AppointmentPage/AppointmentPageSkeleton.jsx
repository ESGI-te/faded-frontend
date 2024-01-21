import Stack from 'shared/src/components/Stack';
import styled from 'styled-components';
import { shimmering } from 'shared/src/styles/animations';

const AppointmentPageSkeleton = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <TitleWrapper>
                    <Line height="1rem" width="30rem" />
                    <SubtitleWrapper>
                        <Line height="0.5rem" width="10rem" color="--neutral200" />
                        <Circle height="0.5rem" width="0.5rem" />
                        <Line height="0.5rem" width="3rem" />
                        <Line height="0.5rem" width="5rem" />
                    </SubtitleWrapper>
                </TitleWrapper>
                <Stack gap="2rem">
                    <Stack gap="1.25rem">
                        <Line height="1rem" width="10rem" />
                        <Stack gap="1rem">
                            <Block>
                                <Line height="0.5rem" width="15rem" />
                            </Block>
                            <Block>
                                <Line height="0.5rem" width="15rem" />
                            </Block>
                            <Block>
                                <Line height="0.5rem" width="15rem" />
                            </Block>
                            <Block>
                                <Line height="0.5rem" width="15rem" />
                            </Block>
                            <Block>
                                <Line height="0.5rem" width="15rem" />
                            </Block>
                            <Block>
                                <Line height="0.5rem" width="15rem" />
                            </Block>
                        </Stack>
                    </Stack>
                    <Stack gap="1.25rem">
                        <Line height="1rem" width="10rem" />
                        <Block height="40rem" />
                    </Stack>
                </Stack>
            </PageInnerWrapper>
        </Page>
    );
};

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
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        row-gap: 2rem;
        padding: var(--container-padding);
    }
`;
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
`;
const SubtitleWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.75rem;
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
export default AppointmentPageSkeleton;
