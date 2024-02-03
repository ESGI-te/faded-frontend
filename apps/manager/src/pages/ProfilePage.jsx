import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Profile from '@components/Profile';
import { FormattedMessage } from 'react-intl';

const ProfilePage = () => (
    <Page>
        <PageInnerWrapper>
            <Text variant="headingM" fontWeight="--fw-bold">
                <FormattedMessage defaultMessage="Profil" />
            </Text>
            <ProfileContainer>
                <Profile />
            </ProfileContainer>
        </PageInnerWrapper>
    </Page>
);

const Page = styled.section`
    align-self: stretch;
    background-color: var(--background);
`;
const PageInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    background-color: var(--background);
    padding: var(--container-padding-mobile);
    max-width: var(--container-width);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const ProfileContainer = styled.div`
    background-color: var(--white);
    border-radius: var(--r-l);
    padding: var(--container-padding-mobile);
    max-width: 940px;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;

export default ProfilePage;
