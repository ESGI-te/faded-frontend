import PropTypes from 'prop-types';
import IconButton from '@components/IconButton';
import Link from '@components/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useEstablishmentsQuery from '@queries/establishment/useEstablishmentsQuery.hook';
import { ListBoxItem, Separator } from 'react-aria-components';
import styled, { css } from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import Cluster from '@components/Cluster';
import InputSelect from '@components/InputSelect';
import Text from '@components/Text';
import Button from '@components/Button';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '@contexts/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import useUserQuery from '@queries/user/useUserQuery.hook';
import { USER_ROLES } from '@utils/constants';

const ProDrawer = ({ isOpen, onToggleDrawer }) => {
    const { data: user } = useUserQuery();
    const { data: establishments } = useEstablishmentsQuery();
    const { logout } = useAuth();
    const { establishmentId } = useParams();
    const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);
    const navigate = useNavigate();

    const items = establishments?.data?.map((establishment) => ({
        id: establishment.id,
        name: establishment.name,
        image: 'https://cdn1.treatwell.net/images/view/v2.i3867704.w720.h480.xB88E4050/',
    }));

    const handleSelectEstablishment = (selectedEstablishmentId) => {
        if (!selectedEstablishmentId) return;
        navigate(`/pro/establishment/${selectedEstablishmentId}`);
    };

    return (
        <Aside $isOpen={isOpen}>
            <DrawerHeader>
                <InputSelect
                    onSelectionChange={handleSelectEstablishment}
                    items={items}
                    defaultSelectedKey={establishmentId || ''}
                    placeholder="Votre établissement"
                >
                    {(item) => (
                        <EstablishmentSelectListItem id={item.id}>
                            <Cluster gap="0.5rem" align="center">
                                <EstablishmentImage src={item.image} />
                                <Text slot="label">{item.name}</Text>
                            </Cluster>
                        </EstablishmentSelectListItem>
                    )}
                </InputSelect>
                <DrawerButtonPanel
                    variant="ghost"
                    icon={<DrawerIcon icon={icon({ name: 'table-columns', style: 'solid' })} />}
                    onPress={onToggleDrawer}
                />
            </DrawerHeader>
            <Nav>
                <NavListWrapper isDisabled={!establishmentId}>
                    <NavTitle>Mon établissement</NavTitle>
                    <NavList>
                        <NavItem>
                            <NavLink to={`/pro/establishment/${establishmentId}/overview`}>
                                <NavItemIcon icon={icon({ name: 'chart-line', style: 'solid' })} />
                                Overview
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/pro/establishment/${establishmentId}/team`}>
                                <NavItemIcon icon={icon({ name: 'users', style: 'solid' })} />
                                Équipe
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/pro/establishment/${establishmentId}/appointments`}>
                                <NavItemIcon
                                    icon={icon({ name: 'calendar-check', style: 'solid' })}
                                />
                                Gestion de RDV
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/pro/establishment/${establishmentId}/planning`}>
                                <NavItemIcon
                                    icon={icon({ name: 'calendar-days', style: 'solid' })}
                                />
                                Planning
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={`/pro/establishment/${establishmentId}/settings`}>
                                <NavItemIcon icon={icon({ name: 'gear', style: 'solid' })} />
                                Paramètres
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
                                <NavLink to="team">
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
                                <NavLink to="appointments">
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
    width: 280px;
    height: 100%;
    background-color: var(--white);
    position: fixed;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.25s ease-in-out;
    padding-inline: var(--container-padding-mobile);
    padding-bottom: var(--container-padding-mobile);
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
        padding-bottom: var(--container-padding);
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
const EstablishmentSelectListItem = styled(ListBoxItem)`
    border-radius: var(--r-xs);
    padding: 0.25rem;
    cursor: pointer;

    &[data-selected] {
        background-color: var(--primary400);

        [slot='label'] {
            color: var(--white);
            font-weight: var(--fw-semibold);
        }
    }

    &:hover:not([data-selected]) {
        background-color: var(--primary50);
    }

    &[data-focused] {
        outline: none;
    }

    &[data-focus-visible] {
        outline: 2px solid var(--primary500);
    }
`;
const EstablishmentImage = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: var(--r-s);
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

ProDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
};
ProDrawer.defaultProps = {
    isOpen: false,
    onToggleDrawer: () => {},
};

export default ProDrawer;
