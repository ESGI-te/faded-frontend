import ProfilePanel from '@components/ProfilePanel';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const ProfilePage = () => {
    return (
        <Page>
            <PageInnerWrapper>
                <PanelWrapper>
                    <ProfilePanel />
                </PanelWrapper>
                <TabWrapper>
                    <Outlet />
                </TabWrapper>
            </PageInnerWrapper>
        </Page>
    );
};

const Page = styled.section`
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: start;
    background-color: var(--background);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        justify-content: center;
    }
`;
const PageInnerWrapper = styled.div`
    width: 100%;
    max-width: var(--container-width);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    background-color: var(--background);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 2rem;
        padding: var(--container-padding);
    }
`;
const PanelWrapper = styled.div`
    width: 100%;
    height: 56px;
    position: sticky;
    top: 0;
    z-index: 1;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        max-width: 350px;
        top: var(--container-padding);
        height: 500px;
    }
`;
const TabWrapper = styled.div`
    flex: 1;
    padding-inline: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: 0;
    }
`;
export default ProfilePage;
