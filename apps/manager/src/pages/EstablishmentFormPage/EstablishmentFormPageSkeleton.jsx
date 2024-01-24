import Cluster from 'shared/src/components/Cluster';
import Stack from 'shared/src/components/Stack';
import styled, { css, keyframes } from 'styled-components';

const EstablishmentFormPageSkeleton = () => {
    return (
        <Container>
            <Header>
                <HeaderDarkBlock />
                <ActionsContainer>
                    <HeaderLightBlock />
                    <HeaderDarkBlock />
                </ActionsContainer>
            </Header>
            <Content>
                <ContentInnerWrapper>
                    <ContentLeftBlock>
                        <Stack $gap="1rem">
                            <Block w="5rem" h="2rem" />
                            <Line w="10rem" h="1rem" />
                        </Stack>
                        <Line w="100%" h="0.0625rem" />
                        <Cluster $gap="1rem">
                            <Block w="2rem" h="2rem" />
                            <Stack $gap="0.5rem">
                                <Line w="7.5rem" h="0.5rem" />
                                <LightLine w="2.5rem" h="0.5rem" />
                            </Stack>
                        </Cluster>
                    </ContentLeftBlock>
                    <ContentRightBlock>
                        <ContentAccordionBlock>
                            <Block w="2.5rem" h="2.5rem" />
                            <Line w="10rem" h="1rem" />
                        </ContentAccordionBlock>
                        <ContentAccordionBlock>
                            <Block w="2.5rem" h="2.5rem" />
                            <Line w="10rem" h="1rem" />
                        </ContentAccordionBlock>
                        <ContentAccordionBlock>
                            <Block w="2.5rem" h="2.5rem" />
                            <Line w="10rem" h="1rem" />
                        </ContentAccordionBlock>
                        <ContentAccordionBlock>
                            <Block w="2.5rem" h="2.5rem" />
                            <Line w="10rem" h="1rem" />
                        </ContentAccordionBlock>
                        <ContentAccordionBlock>
                            <Block w="2.5rem" h="2.5rem" />
                            <Line w="10rem" h="1rem" />
                        </ContentAccordionBlock>
                        <ContentAccordionBlock>
                            <Block w="2.5rem" h="2.5rem" />
                            <Line w="10rem" h="1rem" />
                        </ContentAccordionBlock>
                        <ContentAccordionBlock>
                            <Block w="2.5rem" h="2.5rem" />
                            <Line w="10rem" h="1rem" />
                        </ContentAccordionBlock>
                    </ContentRightBlock>
                </ContentInnerWrapper>
            </Content>
            <Footer>
                <FooterLightBlock />
                <FooterBlock />
            </Footer>
        </Container>
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
    background-size: 50rem 6.5rem;
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${shimmer};
    animation-timing-function: linear;
`;
const Container = styled.section`
    background-color: var(--neutral50);
    display: flex;
    flex-direction: column;
    height: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        background-color: var(--white);
    }
`;
const Line = styled.div`
    border-radius: var(--r-full);
    background-color: var(--neutral100);
    ${({ w }) => w && `width: ${w};`}
    ${({ h }) => h && `height: ${h};`}
    ${shimmering};
`;
const LightLine = styled(Line)`
    background-color: var(--neutral50);
`;
const Block = styled.div`
    border-radius: var(--r-s);
    background-color: var(--neutral100);
    ${({ w }) => w && `width: ${w};`}
    ${({ h }) => h && `height: ${h};`}
    ${shimmering};
`;
const HeaderBlock = styled(Block)`
    height: 2.5rem;
`;
const HeaderDarkBlock = styled(HeaderBlock)`
    width: 10rem;
`;
const HeaderLightBlock = styled(HeaderBlock)`
    background-color: var(--neutral50);
    width: 5rem;
`;
const Header = styled.header`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: 2rem;
    }
`;
const ContentLeftBlock = styled.div`
    border-radius: var(--r-l);
    background-color: var(--white);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    row-gap: 1.5rem;
    height: fit-content;
    flex: 1;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        max-width: 25rem;
    }
`;
const ContentRightBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex: 1;
`;
const ContentAccordionBlock = styled.div`
    border-radius: var(--r-l);
    background-color: var(--white);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 1rem;
`;
const ContentInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    max-width: var(--container-width);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 2rem;
    }
`;
const Content = styled.div`
    flex-grow: 1;
    min-height: 0;
    overflow-y: hidden;
    padding: 0 1rem 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        justify-content: center;
        background-color: var(--neutral50);
        border-radius: var(--r-l) var(--r-l) 0 0;
        margin-inline: 2rem;
        padding: 2rem;
    }
`;
const FooterBlock = styled(Block)`
    height: 2.5rem;
`;
const FooterLightBlock = styled(FooterBlock)`
    background-color: var(--neutral100);
`;
const Footer = styled.footer`
    background-color: var(--white);
    border-top: 1px solid var(--neutral100);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding: 1rem;

    > * {
        flex-grow: 1;
    }

    & > :first-child {
        background-color: var(--neutral50);
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const ActionsContainer = styled.div`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 1rem;
    }
`;

export default EstablishmentFormPageSkeleton;
