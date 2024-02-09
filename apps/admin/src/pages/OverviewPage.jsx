// import AppointmentsRate from '@components/AppointmentsRate';
import Text from 'shared/src/components/Text';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import OverviewDailyIndicators from '@components/OverviewDailyIndicators';
import dayjs from 'dayjs';
import useAdminIndicatorsQuery from '@queries/stats/useAdminIndicatorsQuery.hook';
import UsersTraffic from '@components/UsersTraffic';
import useUsersTrafficQuery from '@queries/stats/useAppointmentsRateQuery.hook';
import { useState } from 'react';

const OverviewPage = () => {
    const [dates, setDates] = useState({
        start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD'),
    });
    const adminIndicators = useAdminIndicatorsQuery();

    const users = useUsersTrafficQuery({
        ...dates,
    })

    if (
        adminIndicators.isLoading ||
        users.isLoading
    )
        return <div>Loading...</div>; // Add loading state

    return (
        <Page>
            <PageInner>
                <OverviewDailyIndicators indicators={adminIndicators.data} />
                <ResponsiveWrapper>
                    <UserCreationTrafficContainer>
                        <UsersTraffic
                            users={users.data}
                            dates={dates}
                            onChangeDates={setDates}
                        />
                    </UserCreationTrafficContainer>
                    <GlobalIndicatorsContainer>
                        <Text variant="headingS" fontWeight="--fw-semibold">
                            <FormattedMessage defaultMessage="Categories list " />
                        </Text>
                    </GlobalIndicatorsContainer>
                </ResponsiveWrapper>

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
const UserCreationTrafficContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    flex-grow: 1;
`;

OverviewPage.propTypes = {};

export default OverviewPage;