import styled from 'styled-components';
import useUserQuery from 'shared/src/queries/user/useUserQuery.hook';
import Text from 'shared/src/components/Text';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DialogTrigger } from 'react-aria-components';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import ProfileDropdown from '@components/ProfileDropdown';
import EstablishmentDropdown from '@components/EstablishmentDropdown';
import { shimmering } from 'shared/src/styles/animations';
import { useParams } from 'react-router-dom';
import useEstablishmentQuery from 'shared/src/queries/establishment/useEstablishmentQuery.hook';
import { ESTABLISHMENT_STATUS, USER_ROLES } from 'shared/src/utils/constants';
import Link from 'shared/src/components/Link';
import SelectLanguage from '@components/SelectLanguage';
import placeholderIllustration from 'shared/src/assets/images/placeholder-img.png';
import EstablishmentStatusBadge from '@components/EstablishmentStatusBadge';

const establishmentStatuscolorLookup = {
    [ESTABLISHMENT_STATUS.ACTIVE]: '--success',
    [ESTABLISHMENT_STATUS.DRAFT]: '--neutral500',
};

const Header = () => {
    const { establishmentId } = useParams();
    const user = useUserQuery();
    const establishment = useEstablishmentQuery(establishmentId);
    const intl = useIntl();
    const [isEstablishmentDropdownOpen, setIsEstablishmentDropdownOpen] = useState(false);
    const isBarber = user.data && user.data.roles.includes(USER_ROLES.BARBER);

    return (
        <Wrapper>
            <LeftWrapper>
                <Logo>B.</Logo>
                <Divider>/</Divider>
                {user.isLoading || user.isError ? (
                    <OrganizationSkeleton />
                ) : (
                    <Organization to="/">
                        <RoundedImage src={user.data.provider.image || placeholderIllustration} />
                        <TextEllipsis fontWeight="--fw-semibold" numberOfLines={1}>
                            {user.data.provider.name ||
                                user.data.barber.establishment.provider.name}
                        </TextEllipsis>
                    </Organization>
                )}
                <Divider>/</Divider>
                {user.isLoading || user.isError || establishment.isFetching ? (
                    <EstablishmentSkeleton />
                ) : (
                    <>
                        <DialogTrigger
                            isOpen={isEstablishmentDropdownOpen}
                            onOpenChange={setIsEstablishmentDropdownOpen}
                        >
                            <EstablishmentDropdownButton
                                isDisabled={isBarber}
                                onPress={() => setIsEstablishmentDropdownOpen(true)}
                            >
                                <RoundedImage
                                    $borderColor={
                                        establishmentStatuscolorLookup?.[establishment.data?.status]
                                    }
                                    src={establishment.data?.cover || placeholderIllustration}
                                />
                                <TextEllipsis
                                    fontWeight={
                                        establishment.data?.name ? '--fw-semibold' : '--fw-normal'
                                    }
                                    numberOfLines={1}
                                >
                                    {establishment.data?.name ||
                                        intl.formatMessage({
                                            defaultMessage: 'Sélectionner un établissement',
                                        })}
                                </TextEllipsis>
                                {establishment.data && (
                                    <StatusBadge status={establishment.data?.status} />
                                )}
                                <EstablishmentDropdownIcon
                                    icon={icon({ name: 'chevron-up', style: 'solid' })}
                                />
                            </EstablishmentDropdownButton>
                            <EstablishmentDropdown
                                onClose={() => setIsEstablishmentDropdownOpen(false)}
                            />
                        </DialogTrigger>
                    </>
                )}
            </LeftWrapper>
            <RightWrapper>
                <SelectLanguage />
                {user.isLoading ? (
                    <ProfileButtonSkeleton />
                ) : (
                    <DialogTrigger>
                        <ProfileButton>
                            <ProfileImagePlaceholder>
                                {user?.data?.firstName?.[0]}
                            </ProfileImagePlaceholder>
                        </ProfileButton>
                        <ProfileDropdown />
                    </DialogTrigger>
                )}
            </RightWrapper>
        </Wrapper>
    );
};

const RightWrapper = styled.div`
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
`;
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
const RoundedImage = styled.img`
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--r-full);
    flex-shrink: 0;
    object-fit: cover;

    ${({ $borderColor }) => $borderColor && `border: 2px solid var(${$borderColor});`}
`;
const ProfileButton = styled(Button)`
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &[data-focused] {
        outline: none;
    }
`;
const ProfileButtonSkeleton = styled.div`
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: var(--r-full);
    background-color: var(--neutral200);
    ${shimmering}
`;
const ProfileImagePlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--black);
    color: var(--white);
    font-weight: var(--fw-semibold);
    border-radius: var(--r-full);
`;
const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: var(--r-full);
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
    font-size: var(--fs-heading-m);
    font-weight: var(--fw-bold);

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
const Organization = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0;
    cursor: pointer;
    text-decoration: none !important;

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

    & > :not(:first-child) {
        margin-top: -0.25rem;
    }
`;
const StatusBadge = styled(EstablishmentStatusBadge)`
    display: none;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        display: block;
    }
`;

export default Header;
