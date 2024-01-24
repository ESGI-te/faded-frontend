import styled from 'styled-components';
import EstablishmentFormContent from './EstablishmentFormContent';

const EstablishmentForm = (props) => {
    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <Header></Header>
            <Content>
                <EstablishmentFormContent />
            </Content>
            <Footer></Footer>
        </Form>
    );
};

const Form = styled.form`
    background-color: var(--neutral50);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: inherit;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        background-color: var(--white);
    }
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

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const Content = styled.div`
    flex-grow: 1;
    min-height: 0;
    overflow-y: auto;
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

EstablishmentForm.propTypes = {};

export default EstablishmentForm;
