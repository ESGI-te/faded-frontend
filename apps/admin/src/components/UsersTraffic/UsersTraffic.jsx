import UsersTrafficAreaChart from '@components/UsersTrafficAreaChart';
import { useMemo } from 'react';
import DateRangePicker from 'shared/src/components/DateRangePicker';
import styled from 'styled-components';
import { parseDate } from '@internationalized/date';

const UsersTraffic = ({ users, dates, onChangeDates }) => {
    const series = useMemo(() => {
        return [
            {
                name: 'New user',
                data: users?.map((user) => user.value),
            },
        ];
    }, [users]);
    const categories = useMemo(() => {
        return users?.map((user) => user.date);
    }, [users]);

    return (
        <ChartWrapper>
            <DateRangePicker
                defaultValue={{
                    start: parseDate(dates.start),
                    end: parseDate(dates.end),
                }}
                onChange={onChangeDates}
            />
            <UsersTrafficAreaChart series={series} categories={categories} />
        </ChartWrapper>
    );
};

const ChartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & > :first-child {
        align-self: flex-end;
    }
`;

export default UsersTraffic;
