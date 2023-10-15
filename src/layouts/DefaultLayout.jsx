import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from '@public/images/faded-logo-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import IconButton from '@components/IconButton';
import { useState } from 'react';
import DefaultLayoutNav from '@components/DefaultLayoutNav';
import DefaultLayoutFooter from '@components/DefaultLayoutFooter';

const DefaultLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Container>
            <Header>
                <Logo src={logo} />
                <IconButton
                    variant="ghost"
                    icon={<MenuIcon icon={icon({ name: 'bars', style: 'solid' })} />}
                    aria-label="Menu"
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                />
            </Header>
            <Aside isOpen={isMenuOpen}>
                <MenuIconButton
                    variant="ghost"
                    icon={<MenuIcon icon={icon({ name: 'bars', style: 'solid' })} />}
                    aria-label="Menu"
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                />
                <DefaultLayoutNav />
                <div>social networks icons goes here</div>
            </Aside>
            <Main>
                <Outlet />
                <DefaultLayoutFooter />
            </Main>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
    }
`;
const Aside = styled.aside`
    position: fixed;
    top: 0;
    right: 0;
    transform: translate3d(100%, 0, 0);
    width: 100%;
    height: 100%;
    max-width: 275px;
    background: transparent;
    padding: 1.5rem;
    background-color: var(--primary);
    transition: transform 0.25s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    row-gap: 1rem;

    ${({ isOpen }) =>
        isOpen &&
        css`
            transform: translate3d(0, 0, 0);
            transition: transform 0.25s;
        `}

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        position: static;
        transform: translate3d(0, 0, 0);
    }
`;
const Logo = styled.img`
    width: 4rem;
`;
const MenuIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: var(--white);
`;
const MenuIconButton = styled(IconButton)`
    align-self: flex-end;
`;
const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: var(--primary);
    color: var(--white);
    padding: 1.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const Main = styled.main`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    background-color: var(--white);

    & > :first-child {
        height: 100%;
    }
`;
export default DefaultLayout;
