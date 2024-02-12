import { Menu as AriaMenu, MenuItem as AriaMenuItem, Separator } from 'react-aria-components';
import Dropdown from 'shared/src/components/Dropdown';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Text from 'shared/src/components/Text';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import { useAuth } from '@contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
    const { data: user } = useUserQuery();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const menuHandler = (key) => {
        console.log(key);
        switch (key) {
            case 'profile':
                navigate('/profile');
                break;
            case 'settings':
                break;
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    };

    return (
        <ProfileDropdownStyled placement="bottom right" offset={8}>
            <MobileHandle />
            <ProfileInfo>
                <ProfileImagePlaceholder>
                    <ImagePlaceholderIcon icon={icon({ name: 'user', style: 'solid' })} />
                </ProfileImagePlaceholder>
                <ProfileInfoInnerWrapper>
                    <TextEllipsis fontWeight="--fw-semibold" variant="bodyL" numberOfLines={1}>
                        {user?.firstName} {user?.lastName}
                    </TextEllipsis>
                    <TextEllipsis color="--neutral500" numberOfLines={1}>
                        {user?.email}
                    </TextEllipsis>
                </ProfileInfoInnerWrapper>
            </ProfileInfo>
            <Divider />
            <Menu onAction={menuHandler}>
                <MenuItem id="profile">
                    <MenuItemIcon icon={icon({ name: 'user', style: 'solid' })} />
                    <FormattedMessage defaultMessage="Profil" />
                </MenuItem>
                <MenuItem id="settings">
                    <MenuItemIcon icon={icon({ name: 'gear', style: 'solid' })} />
                    <FormattedMessage defaultMessage="Paramètres" />
                </MenuItem>
                <MenuDivider />
                <LogoutMenuItem id="logout">
                    <MenuItemIcon icon={icon({ name: 'right-from-bracket', style: 'solid' })} />
                    <FormattedMessage defaultMessage="Se déconnecter" />
                </LogoutMenuItem>
            </Menu>
        </ProfileDropdownStyled>
    );
};

const ProfileDropdownStyled = styled(Dropdown)`
    border-radius: var(--r-l);
    padding-block: 1rem;

    ${({ theme }) => theme.mediaQueries.mobileAndTablet} {
        max-width: calc(100% - 2rem);
        bottom: 1.5rem !important;
        left: 1rem !important;
        right: 1rem !important;
        top: unset !important;
        max-height: calc(100% - 2.5rem) !important;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        max-width: 250px;
        max-height: fit-content !important;
    }
`;
const MobileHandle = styled.div`
    width: 4rem;
    height: 0.25rem;
    border-radius: var(--r-full);
    background-color: var(--neutral100);
    margin-inline: auto;
    margin-bottom: 1.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: none;
    }
`;
const Menu = styled(AriaMenu)`
    padding-inline: 1rem;
`;
const MenuItemIcon = styled(FontAwesomeIcon)`
    width: 0.75rem;
    height: 0.75rem;
    color: var(--neutral500);
`;
const MenuItem = styled(AriaMenuItem)`
    padding-inline: 1rem;
    padding-block: 0.5rem;
    border-radius: var(--r-s);
    cursor: pointer;
    font-size: var(--fs-body-m);
    line-height: var(--lh-body-m);
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    transition-duration: 0.2s;
    color: var(--neutral500);
    text-decoration: none;

    &[data-hovered] {
        background-color: var(--neutral50);
    }
    &[data-focused] {
        outline: none;
    }
`;
const LogoutMenuItem = styled(MenuItem)`
    &[data-hovered] {
        background-color: var(--alert50);
        color: var(--alert);

        & > ${MenuItemIcon} {
            color: var(--alert);
        }
    }
`;
const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    min-width: 0;
    padding-inline: 1rem;
`;
const ProfileImagePlaceholder = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--r-full);
    background-color: var(--neutral100);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const TextEllipsis = styled(Text)`
    min-width: 0;
`;
const ProfileInfoInnerWrapper = styled.div`
    min-width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;
const Divider = styled(Separator)`
    border: solid 1px var(--neutral50);
    margin-block: 1.5rem;
    width: calc(100% - 2rem);
    margin-inline: auto;
`;
const MenuDivider = styled(Divider)`
    width: 100%;
`;
const ImagePlaceholderIcon = styled(FontAwesomeIcon)`
    width: 1rem;
    height: 1rem;
    color: var(--neutral500);
`;

export default ProfileDropdown;
