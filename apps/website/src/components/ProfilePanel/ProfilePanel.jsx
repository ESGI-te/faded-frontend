import styled from 'styled-components';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'shared/src/components/Link';
import { FormattedMessage } from 'react-intl';

const ProfilePanel = () => {
    return (
        <Container>
            <NavList>
                <NavItem>
                    <Link to="">
                        <NavItemIcon icon={icon({ name: 'circle-user', style: 'solid' })} />
                        <FormattedMessage defaultMessage="Mes informations" />
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="appointments">
                        <NavItemIcon icon={icon({ name: 'calendar', style: 'regular' })} />
                        <FormattedMessage defaultMessage="Mes RDV" />
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="settings">
                        <NavItemIcon icon={icon({ name: 'gear', style: 'solid' })} />
                        <FormattedMessage defaultMessage="Paramètres" />
                    </Link>
                </NavItem>
            </NavList>
        </Container>
    );
};

const Container = styled.nav`
    width: 100%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    align-items: center;
    border-top: 1px solid var(--neutral100);
    border-bottom: 1px solid var(--neutral100);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        border-radius: var(--r-s);
        padding: var(--container-padding);
        align-items: start;
        border: none;
    }
`;
const NavList = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: column;
        align-items: start;
        row-gap: 1.5rem;
    }
`;
const NavItem = styled.li`
    flex: 1;
    text-align: center;
    padding-inline: 1rem;

    &:not(:last-child) {
        border-right: 1px solid var(--neutral100);
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        & > a {
            display: flex;
            align-items: center;
            column-gap: 0.5rem;
        }

        &:not(:last-child) {
            border-right: none;
        }
    }
`;
const NavItemIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--black);
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: initial;
    }
`;
export default ProfilePanel;
