import AppointmentsRate from '@components/AppointmentsRate';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useMemo, useState } from 'react';
import OverviewTopServicesTable from '@components/OverviewTopServicesTable';
import useDailyIndicatorsQuery from '@queries/stats/useDailyIndicatorsQuery.hook';
import useGlobalIndicatorsQuery from '@queries/stats/useGlobalIndicatorsQuery.hook copy';
import OverviewGlobalIndicators from '@components/OverviewGlobalIndicators';
import OverviewDailyIndicators from '@components/OverviewDailyIndicators';
import useTopServicesQuery from '@queries/stats/useTopServicesQuery.hook';
import useAppointmentsRateQuery from '@queries/stats/useAppointmentsRateQuery.hook';
import dayjs from 'dayjs';

const OverviewPage = () => {
    const [dates, setDates] = useState({
        start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD'),
    });
    const globalIndicators = useGlobalIndicatorsQuery();
    const dailyIndicators = useDailyIndicatorsQuery();
    const topServices = useTopServicesQuery();
    const appointments = useAppointmentsRateQuery({
        ...dates,
    });
    const sortedServicesWithPosition = useMemo(() => {
        return topServices.data
            ?.map((item) => ({
                ...item,
                turnover: Number(item.turnover),
                ratio: Number(item.turnover) / item.number,
            }))
            .sort((a, b) => b.ratio - a.ratio)
            .map((item, index) => ({
                ...item,
                position: index + 1,
            }));
    }, [topServices.data]);

    if (
        globalIndicators.isLoading ||
        dailyIndicators.isLoading ||
        topServices.isLoading ||
        appointments.isLoading
    )
        return <div>Loading...</div>; // Add loading state

    return (
        <Page>
            <PageInner>
                <OverviewDailyIndicators indicators={dailyIndicators.data} />
                <ResponsiveWrapper>
                    <AppointmentsRateContainer>
                        <AppointmentsRate
                            appointments={appointments.data}
                            dates={dates}
                            onChangeDates={setDates}
                        />
                    </AppointmentsRateContainer>
                    <GlobalIndicatorsContainer>
                        <Text variant="headingS" fontWeight="--fw-semibold">
                            <FormattedMessage defaultMessage="Indicateurs globaux" />
                        </Text>
                        <OverviewGlobalIndicators indicators={globalIndicators.data} />
                    </GlobalIndicatorsContainer>
                </ResponsiveWrapper>
                <OverviewTopServicesContainer>
                    <Text variant="headingS" fontWeight="--fw-semibold">
                        <FormattedMessage defaultMessage="Prestations les plus populaires" />
                    </Text>
                    <OverviewTopServicesTable items={sortedServicesWithPosition} />
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
    flex-grow: 2;
    flex-shrink: 0;

    ${({ theme }) => theme.mediaQueries.desktopAndUp} {
        max-width: 25rem;
    }
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

OverviewPage.propTypes = {};

export default OverviewPage;
