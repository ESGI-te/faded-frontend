import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Button from '@components/Button';
import { useState } from 'react';
import SearchServiceForm from '@components/SearchServiceForm';
import SearchProviderForm from '@components/SearchProviderForm';

const FORM_TABS = {
    SERVICE: 'service',
    PROVIDER: 'provider',
};

const formsLookup = {
    [FORM_TABS.SERVICE]: <SearchServiceForm />,
    [FORM_TABS.PROVIDER]: <SearchProviderForm />,
};

const SearchServiceOrProvider = () => {
    const [selectedTab, setSelectedTab] = useState(FORM_TABS.SERVICE);
    return (
        <>
            <TabsWrapper>
                <Tab
                    variant="ghost"
                    isSelected={selectedTab === FORM_TABS.SERVICE}
                    onPress={() => setSelectedTab(FORM_TABS.SERVICE)}
                >
                    <FormattedMessage defaultMessage="Prestations" />
                </Tab>
                <Tab
                    variant="ghost"
                    isSelected={selectedTab === FORM_TABS.PROVIDER}
                    onPress={() => setSelectedTab(FORM_TABS.PROVIDER)}
                >
                    <FormattedMessage defaultMessage="Établissement" />
                </Tab>
            </TabsWrapper>
            {formsLookup[selectedTab]}
        </>
    );
};

const TabsWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.5rem;
    width: 100%;
`;
const Tab = styled(Button)`
    color: var(--typo);
    padding-inline: 0;
    padding-top: 0;
    padding-bottom: 0.25rem;
    border-radius: 0;

    ${({ isSelected }) =>
        isSelected &&
        css`
            border-bottom: 2px solid var(--black);
        `}
`;

SearchServiceOrProvider.propTypes = {};

export default SearchServiceOrProvider;
