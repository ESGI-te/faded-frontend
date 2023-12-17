import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@components/IconButton';
import { useState } from 'react';
import Text from '@components/Text';
import Link from '@components/Link';
import ErrorBoundary from '@components/ErrorBoundary';

const Drawer = ({ isOpen, onToggleDrawer }) => {
    return (
        <Aside $isOpen={isOpen}>
            <DrawerHeader>
                <Text as={Link} to="/pro" variant="headingS" fontWeight="--fw-bold">
                    BARBERS
                </Text>
                <DrawerButtonPanel
                    variant="ghost"
                    icon={<DrawerIcon icon={icon({ name: 'table-columns', style: 'solid' })} />}
                    onPress={onToggleDrawer}
                />
            </DrawerHeader>
            <Nav>
                <NavList>
                    <NavItem>
                        <NavLink to="overview">
                            <NavItemIcon icon={icon({ name: 'table-columns', style: 'solid' })} />
                            Dashboard
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="team">
                            <NavItemIcon icon={icon({ name: 'table-columns', style: 'solid' })} />
                            Mon équipe
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="appointments">
                            <NavItemIcon icon={icon({ name: 'table-columns', style: 'solid' })} />
                            Établissements
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="appointments">
                            <NavItemIcon icon={icon({ name: 'table-columns', style: 'solid' })} />
                            Gestion de RDV
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="profile">
                            <NavItemIcon icon={icon({ name: 'table-columns', style: 'solid' })} />
                            Gestion de planning
                        </NavLink>
                    </NavItem>
                </NavList>
            </Nav>
        </Aside>
    );
};

const Header = ({ onToggleDrawer }) => {
    return (
        <HeaderStyled>
            <DrawerButton
                variant="ghost"
                icon={<DrawerIcon icon={icon({ name: 'table-columns', style: 'solid' })} />}
                onPress={onToggleDrawer}
            />
        </HeaderStyled>
    );
};

const ProviderLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState();

    const handleToggleDrawer = () =>
        setIsDrawerOpen((isOpen) => {
            if (isOpen === undefined) {
                return true;
            }
            return !isOpen;
        });

    return (
        <Container>
            <Drawer isOpen={isDrawerOpen} onToggleDrawer={handleToggleDrawer} />
            <InnerWrapper>
                <Header onToggleDrawer={handleToggleDrawer} />
                <Main>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </Main>
            </InnerWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    height: 100%;
`;
const InnerWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
const Aside = styled.aside`
    width: 280px;
    height: 100%;
    background-color: var(--white);
    position: fixed;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.25s ease-in-out;
    padding-inline: var(--container-padding-mobile);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 4rem;

    ${({ $isOpen }) =>
        $isOpen &&
        css`
            transform: translateX(0);
        `}

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        transform: translateX(0);
        position: initial;
        padding-inline: var(--container-padding);
        border-right: 1px solid var(--neutral100);

        ${({ $isOpen }) =>
            $isOpen === false &&
            css`
                position: fixed;
                transform: translateX(-100%);
            `}
    }
`;
const DrawerHeader = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        align-self: initial;
    }
`;
const HeaderStyled = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
    padding-inline: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
        border-bottom: 1px solid var(--neutral100);
    }
`;
const Main = styled.main`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    background-color: var(--white);
    display: flex;
    align-items: start;

    & > * {
        flex: 1;
    }
`;
const DrawerIcon = styled(FontAwesomeIcon)`
    width: 1.25rem;
    height: 1.25rem;
    color: var(--black);
`;
const DrawerButton = styled(IconButton)`
    padding: 0;
`;
const DrawerButtonPanel = styled(IconButton)`
    padding: 0;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const Nav = styled.nav`
    align-self: stretch;
`;
const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
const NavItem = styled.li`
    display: flex;
`;
const NavItemIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--neutral500);
`;
const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    width: 100%;
    column-gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--r-s);
    color: var(--neutral500);

    &.active {
        background-color: var(--black);
        color: var(--white);

        & > ${NavItemIcon} {
            color: var(--white);
        }
    }

    &:not(.active) {
        &:hover {
            background-color: var(--primary50);
            text-decoration: none;
        }
    }
`;

ProviderLayout.propTypes = {};

export default ProviderLayout;
