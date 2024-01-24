import styled from 'styled-components';
import EstablishmentFormResume from './EstablishmentFormResume';
import EstablishmentFormAccordion from './EstablishmentFormAccordion';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem 2rem;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        flex-direction: row;
        max-width: calc(var(--container-width) - 4rem);
    }
`;
const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;

    ${({ theme }) => theme.mediaQueries.desktopLargeAndUp} {
        max-width: 25rem;
    }
`;
const Content = styled.div`
    flex: 1;
`;
const StickyContainer = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

const EstablishmentFormContent = () => {
    return (
        <Container>
            <Sidebar>
                <StickyContainer>
                    <EstablishmentFormResume />
                </StickyContainer>
            </Sidebar>
            <Content>
                <EstablishmentFormAccordion />
            </Content>
        </Container>
    );
};

export default EstablishmentFormContent;
