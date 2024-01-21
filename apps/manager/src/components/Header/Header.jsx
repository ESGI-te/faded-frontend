import styled from 'styled-components';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import Text from 'shared/src/components/Text';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DialogTrigger } from 'react-aria-components';
import { useSelectedEstablishment } from '@contexts/SelectedEstablishmentProvider';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import ProfileDropdown from '@components/ProfileDropdown';
import EstablishmentDropdown from '@components/EstablishmentDropdown';
import { shimmering } from 'shared/src/styles/animations';

const Header = () => {
    const user = useUserQuery();
    const { establishment } = useSelectedEstablishment();
    const intl = useIntl();
    const [isEstablishmentDropdownOpen, setIsEstablishmentDropdownOpen] = useState(false);

    return (
        <Wrapper>
            <LeftWrapper>
                <Logo>logo</Logo>
                <Divider>/</Divider>
                {user.isLoading ? (
                    <OrganizationSkeleton />
                ) : (
                    <Organization>
                        <RoundedImage />
                        <TextEllipsis numberOfLines={1}>
                            {user.data?.provider?.name || 'Organization'}
                        </TextEllipsis>
                    </Organization>
                )}
                <Divider>/</Divider>
                {user.isLoading ? (
                    <EstablishmentSkeleton />
                ) : (
                    <DialogTrigger
                        isOpen={isEstablishmentDropdownOpen}
                        onOpenChange={setIsEstablishmentDropdownOpen}
                    >
                        <EstablishmentDropdownButton
                            onPress={() => setIsEstablishmentDropdownOpen(true)}
                        >
                            <RoundedImage />
                            <TextEllipsis numberOfLines={1}>
                                {establishment?.name ||
                                    intl.formatMessage({
                                        defaultMessage: 'Sélectionner un établissement',
                                    })}
                            </TextEllipsis>
                            <EstablishmentDropdownIcon
                                icon={icon({ name: 'chevron-up', style: 'solid' })}
                            />
                        </EstablishmentDropdownButton>
                        <EstablishmentDropdown
                            onClose={() => setIsEstablishmentDropdownOpen(false)}
                        />
                    </DialogTrigger>
                )}
            </LeftWrapper>
            <DialogTrigger>
                <ProfileButton />
                <ProfileDropdown />
            </DialogTrigger>
        </Wrapper>
    );
};

const Wrapper = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--container-padding-mobile);
    padding-block: 1rem;
    background-color: var(--white);
    column-gap: 0.5rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
    }
`;
const RoundedImage = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--r-full);
    background-color: var(--info);
    flex-shrink: 0;
`;
const ProfileButton = styled(Button)`
    width: 2rem;
    height: 2rem;
    border-radius: var(--r-full);
    background-color: var(--info);
    border: none;
    flex-shrink: 0;
    flex-grow: 0;
    cursor: pointer;
`;
const EstablishmentDropdownButton = styled(Button)`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    background: none;
    border: none;
    flex-shrink: 1;
    flex-grow: 2;
    min-width: 0;
    cursor: pointer;
    position: relative;
    isolation: isolate;
    z-index: 1;

    &[data-hovered] {
        &::before {
            content: '';
            display: block;
            width: calc(100% + 0.5rem);
            height: calc(100% + 0.5rem);
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
    &[data-focused] {
        outline: none;
    }
`;
const TextEllipsis = styled(Text)`
    min-width: 0;
    flex-grow: 1;
`;
const EstablishmentDropdownIcon = styled(FontAwesomeIcon)`
    font-size: 0.75rem;
    color: var(--neutral500);
`;
const Divider = styled.div`
    color: var(--neutral200);
`;
const Logo = styled.div`
    display: none;

    & + ${Divider} {
        display: none;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: block;

        & + ${Divider} {
            display: block;
        }
    }
`;
const Organization = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        min-width: unset;
    }
`;
const SkeletonBlock = styled.div`
    height: 1.25rem;
    border-radius: var(--r-s);
    background-color: var(--neutral200);
    ${shimmering}
`;
const OrganizationSkeleton = styled(SkeletonBlock)`
    width: 5rem;
    flex-grow: 1;
    flex-shrink: 1;
    ${shimmering}
`;
const EstablishmentSkeleton = styled(SkeletonBlock)`
    width: 10rem;
    flex-grow: 2;
    flex-shrink: 1;
    ${shimmering}
`;
const LeftWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    flex: 1;
    max-width: max-content;
    min-width: 0;
`;

export default Header;
