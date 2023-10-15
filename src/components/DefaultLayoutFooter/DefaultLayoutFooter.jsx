import styled from 'styled-components';

const DefaultLayoutFooter = () => {
    return <Footer>DefaultLayoutFooter</Footer>;
};

const Footer = styled.footer`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-block: 2rem;
    padding-inline: 1rem;
    background-color: var(--primary);
    color: var(--white);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: 2rem;
    }
`;

export default DefaultLayoutFooter;
