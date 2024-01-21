import PropTypes from 'prop-types';
import styled from 'styled-components';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'shared/src/components/Link';
import { USER_ROLES } from 'shared/src/utils/constants';
import { useSelectedEstablishment } from '@contexts/SelectedEstablishmentProvider';
import { useMemo } from 'react';
import AppMenuSkeleton from './AppMenuSkeleton';

const BARBER_NAVIGATION = [
    {
        name: 'Overview',
        icon: icon({ name: 'chart-line', style: 'solid' }),
        url: '/establishment/overview',
    },
    {
        name: 'Équipe',
        icon: icon({ name: 'users', style: 'solid' }),
        url: '/establishment/team?page=1',
    },
    {
        name: 'Gestion de RDV',
        icon: icon({ name: 'calendar-check', style: 'solid' }),
        url: '/establishment/appointments?page=1',
    },
    {
        name: 'Planning',
        icon: icon({ name: 'calendar-days', style: 'solid' }),
        url: '/establishment/planning',
    },
    {
        name: 'Paramètres',
        icon: icon({ name: 'gear', style: 'solid' }),
        url: '/establishment/settings',
    },
];

const PROVIDER_NAVIGATION = [
    {
        name: 'Overview',
        icon: icon({ name: 'chart-line', style: 'solid' }),
        url: '/overview',
    },
    {
        name: 'Équipe',
        icon: icon({ name: 'users', style: 'solid' }),
        url: '/team?page=1',
    },
    {
        name: 'Gestion de RDV',
        icon: icon({ name: 'calendar-check', style: 'solid' }),
        url: '/appointments?page=1',
    },
    {
        name: 'Établissements',
        icon: icon({ name: 'calendar-days', style: 'solid' }),
        url: '/establishments',
    },
    {
        name: 'Paramètres',
        icon: icon({ name: 'gear', style: 'solid' }),
        url: '/settings',
    },
];

const AppMenu = (props) => {
    const user = useUserQuery();
    const { establishment } = useSelectedEstablishment();
    const navItems = useMemo(() => {
        if (user.data?.roles.includes(USER_ROLES.PROVIDER) && !establishment) {
            return PROVIDER_NAVIGATION;
        }

        if (
            (user.data?.roles.includes(USER_ROLES.BARBER) ||
                user.data?.roles.includes(USER_ROLES.PROVIDER)) &&
            establishment
        ) {
            return BARBER_NAVIGATION;
        }

        return [];
    }, [user.data, establishment]);

    if (user.isLoading || !navItems) return <AppMenuSkeleton />;

    return (
        <Nav>
            <NavList>
                {navItems.map((navItem) => (
                    <NavItem key={navItem.name}>
                        <NavLink to={navItem.url}>
                            {/* <NavItemIcon icon={navItem.icon} /> */}
                            {navItem.name}
                        </NavLink>
                    </NavItem>
                ))}
            </NavList>
        </Nav>
    );
};

const Nav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: var(--container-padding-mobile);
    background-color: var(--white);
    border-bottom: 1px solid var(--neutral100);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    position: sticky;
    top: 0;
    margin-top: -0.75rem;
    z-index: 1;

    &::-webkit-scrollbar {
        display: none;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
    }
`;
const NavList = styled.ul`
    display: flex;
    /* column-gap: 1.5rem; */
`;
const NavItem = styled.li`
    flex-shrink: 0;
`;
const NavItemIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral500);
`;
const NavLink = styled(Link)`
    /* display: flex; */
    /* row-gap: 0.125rem; */
    /* align-items: center; */
    /* width: 100%; */
    padding: 1rem 0.75rem;
    border-radius: var(--r-s);
    color: var(--neutral500);
    font-size: var(--fs-body-m);
    line-height: var(--lh-body-m);
    display: inline-block;
    text-decoration: none !important;
    position: relative;
    isolation: isolate;
    z-index: 1;

    &.active {
        color: var(--black);
        font-weight: var(--fw-semibold);

        /* & > ${NavItemIcon} {
            color: inherit;
        } */

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 0.125rem;
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: var(--r-full);
            background-color: var(--black);
            text-size-adjust: 100%;
        }
    }

    &:hover {
        color: var(--black);

        &::before {
            content: '';
            display: block;
            width: 100%;
            height: calc(100% - 1.125rem);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: var(--r-s);
            background-color: var(--primary50);
            opacity: 0.75;
            z-index: -1;
        }
    }
`;

AppMenu.propTypes = {};

export default AppMenu;