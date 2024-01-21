import styled from 'styled-components';
import { shimmering } from 'shared/src/styles/animations';

const AppMenuSkeleton = () => {
    return (
        <SkeletonNav>
            {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonNavItem key={index} />
            ))}
        </SkeletonNav>
    );
};

const SkeletonNav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
    padding-left: var(--container-padding-mobile);
    background-color: var(--white);
    border-bottom: 1px solid var(--neutral100);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    position: sticky;
    top: 0;
    margin-top: -0.75rem;
    height: 52px;

    &::-webkit-scrollbar {
        display: none;
    }

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding-inline: var(--container-padding);
    }
`;

const SkeletonNavItem = styled.div`
    width: 6rem;
    height: 50%;
    border-radius: var(--r-s);
    background-color: var(--neutral200);
    ${shimmering}
`;

export default AppMenuSkeleton;
