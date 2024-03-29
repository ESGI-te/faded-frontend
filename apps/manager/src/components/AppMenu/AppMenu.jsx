import styled from 'styled-components';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'shared/src/components/Link';
import { ESTABLISHMENT_STATUS, USER_ROLES } from 'shared/src/utils/constants';
import { useMemo } from 'react';
import AppMenuSkeleton from './AppMenuSkeleton';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { shimmering } from 'shared/src/styles/animations';
import PublishEstablishmentButton from '@components/PublishEstablishmentButton';
import MoveToDraftEstablishmentButton from '@components/MoveToDraftEstablishmentButton';

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
    margin-right: 0.5rem;
`;
const NavLink = styled(Link)`
    display: flex;
    row-gap: 0.125rem;
    align-items: center;
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

        & > ${NavItemIcon} {
            color: inherit;
        }

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
const ButtonSkeleton = styled.div`
    display: none;
    height: 31px;
    width: 100px;
    border-radius: var(--r-s);
    ${shimmering}

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: block;
    }
`;

const BARBER_NAVIGATION_ITEMS = (establishmentId) => [
    {
        name: <FormattedMessage defaultMessage="Overview" />,
        icon: <NavItemIcon icon={icon({ name: 'chart-line', style: 'solid' })} />,
        url: `/${establishmentId}`,
    },
    {
        name: <FormattedMessage defaultMessage="Équipe" />,
        icon: <NavItemIcon icon={icon({ name: 'users', style: 'solid' })} />,
        url: `/${establishmentId}/team`,
    },
    {
        name: <FormattedMessage defaultMessage="Gestion de RDV" />,
        icon: <NavItemIcon icon={icon({ name: 'calendar-check', style: 'solid' })} />,
        url: `/${establishmentId}/appointments?page=1`,
    },
    {
        name: <FormattedMessage defaultMessage="Horaires" />,
        icon: <NavItemIcon icon={icon({ name: 'clock', style: 'solid' })} />,
        url: `/${establishmentId}/schedules`,
    },
    {
        name: <FormattedMessage defaultMessage="Prestations" />,
        icon: <NavItemIcon icon={icon({ name: 'calendar-days', style: 'solid' })} />,
        url: `/${establishmentId}/services`,
    },
    {
        name: <FormattedMessage defaultMessage="Paramètres" />,
        icon: <NavItemIcon icon={icon({ name: 'gear', style: 'solid' })} />,
        url: `/${establishmentId}/settings`,
    },
];

const PROVIDER_NAVIGATION_ITEMS = [
    {
        name: <FormattedMessage defaultMessage="Overview" />,
        icon: <NavItemIcon icon={icon({ name: 'chart-line', style: 'solid' })} />,
        url: '/',
    },
    {
        name: <FormattedMessage defaultMessage="Équipe" />,
        icon: <NavItemIcon icon={icon({ name: 'users', style: 'solid' })} />,
        url: '/team?page=1',
    },
    {
        name: <FormattedMessage defaultMessage="Gestion de RDV" />,
        icon: <NavItemIcon icon={icon({ name: 'calendar-check', style: 'solid' })} />,
        url: '/appointments?page=1',
    },
    {
        name: <FormattedMessage defaultMessage="Établissements" />,
        icon: <NavItemIcon icon={icon({ name: 'calendar-days', style: 'solid' })} />,
        url: '/establishments',
    },
    {
        name: <FormattedMessage defaultMessage="Prestations" />,
        icon: <NavItemIcon icon={icon({ name: 'wand-magic-sparkles', style: 'solid' })} />,
        url: '/services',
    },
    {
        name: <FormattedMessage defaultMessage="Paramètres" />,
        icon: <NavItemIcon icon={icon({ name: 'gear', style: 'solid' })} />,
        url: '/settings',
    },
];

const AppMenu = () => {
    const user = useUserQuery();
    const { establishmentId } = useParams();
    const { data: establishment, isLoading } = useEstablishmentQuery(establishmentId);
    const navItems = useMemo(() => {
        if (user.data?.roles.includes(USER_ROLES.PROVIDER) && !establishmentId) {
            return PROVIDER_NAVIGATION_ITEMS;
        }

        if (
            (user.data?.roles.includes(USER_ROLES.BARBER) ||
                user.data?.roles.includes(USER_ROLES.PROVIDER)) &&
            establishmentId
        ) {
            return BARBER_NAVIGATION_ITEMS(establishmentId);
        }

        return [];
    }, [user.data, establishmentId]);
    const isDraft = establishment?.status === ESTABLISHMENT_STATUS.DRAFT;

    if (user.isLoading || !navItems) return <AppMenuSkeleton />;

    return (
        <Nav>
            <NavList>
                {navItems.map((navItem) => (
                    <NavItem key={navItem.name}>
                        <NavLink to={navItem.url}>
                            {navItem.icon}
                            {navItem.name}
                        </NavLink>
                    </NavItem>
                ))}
            </NavList>
            {establishmentId && isLoading && <ButtonSkeleton />}
            {establishmentId &&
                !isLoading &&
                (isDraft ? <PublishEstablishmentButton /> : <MoveToDraftEstablishmentButton />)}
        </Nav>
    );
};

export default AppMenu;
