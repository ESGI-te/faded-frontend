import styled from 'styled-components';
import EstablishmentSettings from '@components/EstablishmentSettings';
import { TabList, TabPanel as AriaTabPanel, Tabs, Tab as AriaTab } from 'react-aria-components';
import { FormattedMessage } from 'react-intl';
import Text from 'shared/src/components/Text';
import EstablishmentDelete from '@components/EstablishmentDelete';

const EstablishmentSettingsPage = () => (
    <Page>
        <SettingsTabs>
            <TabListWrapper>
                <SettingsTabList>
                    <Tab id="settings">
                        <FormattedMessage defaultMessage="Général" />
                    </Tab>
                    <Tab id="delete">
                        <FormattedMessage defaultMessage="Supprimer" />
                    </Tab>
                </SettingsTabList>
            </TabListWrapper>
            <TabPanel id="settings">
                <Text variant="headingS" fontWeight="--fw-bold">
                    <FormattedMessage defaultMessage="Général" />
                </Text>
                <Container>
                    <EstablishmentSettings />
                </Container>
            </TabPanel>
            <TabPanel id="delete">
                <Text variant="headingS" fontWeight="--fw-bold">
                    <FormattedMessage defaultMessage="Supprimer" />
                </Text>
                <Container>
                    <EstablishmentDelete />
                </Container>
            </TabPanel>
        </SettingsTabs>
    </Page>
);

const Page = styled.section`
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: var(--background);
`;
const SettingsTabs = styled(Tabs)`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    max-width: var(--container-width);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
        flex-direction: row;
        column-gap: 1rem;
    }
`;
const TabPanel = styled(AriaTabPanel)`
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
const SettingsTabList = styled(TabList)`
    display: flex;
    align-items: center;
    column-gap: 0.75rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: column;
        align-items: start;
        row-gap: 1rem;
        width: max-content;
    }
`;
const TabListWrapper = styled.div`
    flex: 1;
    align-self: flex-end;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        align-self: start;
        max-width: 250px;
        display: flex;
        justify-content: center;
    }
`;
const Tab = styled(AriaTab)`
    color: var(--neutral500);
    cursor: pointer;
    padding-block: 0.5rem 0;
    padding-inline: 0.5rem;
    font-size: var(--fs-body-m);

    &[data-selected] {
        color: var(--primary);
        font-weight: var(--fw-semibold);
        position: relative;

        &::before {
            content: '';
            display: block;
            width: 0.125rem;
            height: 100%;
            background-color: var(--primary);
            position: absolute;
            left: 0;
        }
    }
`;
const Container = styled.div`
    background-color: var(--white);
    border-radius: var(--r-l);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;

export default EstablishmentSettingsPage;
