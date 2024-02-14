import PropTypes from 'prop-types';
import IconButton from 'shared/src/components/IconButton';
import Link from 'shared/src/components/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Separator } from 'react-aria-components';
import styled, { css } from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Text from 'shared/src/components/Text';
import Button from 'shared/src/components/Button';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@contexts/AuthProvider';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { USER_ROLES } from 'shared/src/utils/constants';
import usePreventBodyScroll from 'shared/src/hooks/usePreventBodyScroll.hook';

const Drawer = ({ isOpen, onToggleDrawer }) => {
    const { data: user } = useUserQuery();
    const { logout } = useAuth();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    usePreventBodyScroll(isOpen);

    return (
        <Aside $isOpen={isOpen}>
            <DrawerHeader>
                <DrawerButtonPanel
                    variant="ghost"
                    icon={<DrawerIcon icon={icon({ name: 'table-columns', style: 'solid' })} />}
                    onPress={onToggleDrawer}
                />
            </DrawerHeader>
            <Nav>
                <NavListWrapper>
                    <NavTitle>Géneral</NavTitle>
                    <NavList>
                        <NavItem>
                            <NavLink to={`/`}>
                                <NavItemIcon icon={icon({ name: 'chart-line', style: 'solid' })} />
                                Overview
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/admin/provider-request`}>
                                <NavItemIcon icon={icon({ name: 'users', style: 'solid' })} />
                                Provider requests
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/admin/categories`}>
                                <NavItemIcon
                                    icon={icon({ name: 'calendar-check', style: 'solid' })}
                                />
                                Catégories
                            </NavLink>
                        </NavItem>
                    </NavList>
                </NavListWrapper>
                <Divider />
                {isProvider && (
                    <NavListWrapper>
                        <NavTitle>Général</NavTitle>
                        <NavList>
                            <NavItem>
                                <NavLink to="overview">
                                    <NavItemIcon
                                        icon={icon({ name: 'chart-line', style: 'solid' })}
                                    />
                                    Overview
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="team?page=1">
                                    <NavItemIcon icon={icon({ name: 'users', style: 'solid' })} />
                                    Mon équipe
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="establishments">
                                    <NavItemIcon icon={icon({ name: 'shop', style: 'solid' })} />
                                    Établissements
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="appointments?page=1">
                                    <NavItemIcon
                                        icon={icon({ name: 'calendar-check', style: 'solid' })}
                                    />
                                    Gestion de RDV
                                </NavLink>
                            </NavItem>
                        </NavList>
                    </NavListWrapper>
                )}
            </Nav>
            <LogoutButton
                onPress={logout}
                variant="ghost"
                startIcon={<LogoutIcon icon={icon({ name: 'right-from-bracket' })} />}
            >
                <FormattedMessage defaultMessage="Se déconnecter" />
            </LogoutButton>
        </Aside>
    );
};

const Aside = styled.aside`
    width: 100vw;
    height: 100%;
    overflow-y: auto;
    background-color: var(--white);
    position: fixed;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.25s ease-in-out;
    padding-inline: var(--container-padding-mobile);
    padding-block: var(--container-padding-mobile);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 4rem;
    z-index: 1;

    ${({ $isOpen }) =>
        $isOpen &&
        css`
            transform: translateX(0);
        `}

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        transform: translateX(0);
        position: initial;
        padding-inline: var(--container-padding);
        /* padding-block: var(--container-padding); */
        border-right: 1px solid var(--neutral100);
        max-width: 280px;
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
const DrawerButtonPanel = styled(IconButton)`
    padding: 0;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const Nav = styled.nav`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
`;
const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding-left: 0.25rem;
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
const DrawerIcon = styled(FontAwesomeIcon)`
    width: 1.25rem;
    height: 1.25rem;
    color: var(--black);
`;
const Divider = styled(Separator)`
    width: 100%;
    border: solid 1px var(--neutral100);
`;
const NavListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ isDisabled }) =>
        isDisabled &&
        css`
            opacity: 0.5;
            pointer-events: none;
        `}
`;
const NavTitle = styled(Text)`
    font-weight: var(--fw-semibold);
    text-transform: uppercase;
`;
const LogoutIcon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    color: var(--neutral500);
    transition: color 200ms;
`;
const LogoutButton = styled(Button)`
    margin-top: auto;
    color: var(--neutral500);

    &[data-hovered] {
        color: var(--alert);
        background-color: var(--alert50);

        & > ${LogoutIcon} {
            color: var(--alert);
        }
    }
`;

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
};
Drawer.defaultProps = {
    isOpen: false,
    onToggleDrawer: () => {},
};

export default Drawer;
