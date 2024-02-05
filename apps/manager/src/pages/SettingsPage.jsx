import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import Settings from '@components/Settings';
import { FormattedMessage } from 'react-intl';

const SettingsPage = () => (
    <Page>
        <PageInner>
            <Text variant="headingM" fontWeight="--fw-bold">
                <FormattedMessage defaultMessage="Paramètres de l'organisation" />
            </Text>
            <SettingsContainer>
                <Settings />
            </SettingsContainer>
        </PageInner>
    </Page>
);

const Page = styled.section`
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: var(--background);
`;
const PageInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 100%;
    max-width: 940px;
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const SettingsContainer = styled.div`
    background-color: var(--white);
    border-radius: var(--r-l);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;

export default SettingsPage;
