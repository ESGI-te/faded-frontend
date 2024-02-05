import AppointmentsRate from '@components/AppointmentsRate';
import DailyIndicators from '@components/DailyIndicators';
import GlobalIndicators from '@components/GlobalIndicators';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useMemo } from 'react';
import OverviewTopServicesTable from '@components/OverviewTopServicesTable';

const ProviderOverviewPage = (props) => {
    const items = [
        {
            id: 'fb5bdb39-1ca3-4412-aefc-c8bd1df7ffb6',
            name: 'Brushing Express',
            number: 5,
            turnover: '75',
        },
        {
            id: 'c8302270-7de5-4e20-9632-419e8bc5dde5',
            name: 'Massage Relaxant',
            number: 3,
            turnover: '150',
        },
        {
            id: 'c8302270-7de5-4e20-9632-419e8bc5dde7',
            name: 'Soin du visage',
            number: 2,
            turnover: '100',
        },
        {
            id: 'c8302270-7de5-4e20-9632-419e8bc5dks8',
            name: 'Coupe homme',
            number: 1,
            turnover: '20',
        },
    ];

    const sortedItemsWithPosition = useMemo(() => {
        const sortedItems = items
            .sort((a, b) => a.number / parseFloat(a.turnover) - b.number / parseFloat(b.turnover))
            .reverse();
        return sortedItems.map((item, index) => ({ ...item, position: index + 1 }));
    }, [items]);

    return (
        <Page>
            <PageInner>
                <DailyIndicators />
                <ResponsiveWrapper>
                    <AppointmentsRateContainer>
                        <AppointmentsRate />
                    </AppointmentsRateContainer>
                    <GlobalIndicatorsContainer>
                        <Text variant="headingS" fontWeight="--fw-semibold">
                            <FormattedMessage defaultMessage="Indicateurs globaux" />
                        </Text>
                        <GlobalIndicators />
                    </GlobalIndicatorsContainer>
                </ResponsiveWrapper>
                <OverviewTopServicesContainer>
                    <Text variant="headingS" fontWeight="--fw-semibold">
                        <FormattedMessage defaultMessage="Prestations les plus populaires" />
                    </Text>
                    <OverviewTopServicesTable items={sortedItemsWithPosition} />
                </OverviewTopServicesContainer>
            </PageInner>
        </Page>
    );
};

const Page = styled.section`
    display: flex;
    align-items: start;
    justify-content: center;
    background-color: var(--background);
`;
const PageInner = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    max-width: var(--container-width);
    padding: var(--container-padding-mobile);

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        padding: var(--container-padding);
    }
`;
const Container = styled.div`
    background-color: var(--white);
    padding: 1.5rem;
    border-radius: var(--r-m);
`;
const GlobalIndicatorsContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    max-width: 25rem;
    flex-grow: 2;
    flex-shrink: 0;
`;
const ResponsiveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        flex-direction: row;
        column-gap: 1rem;
    }
`;
const AppointmentsRateContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex-grow: 1;
`;
const OverviewTopServicesContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

ProviderOverviewPage.propTypes = {};

export default ProviderOverviewPage;
