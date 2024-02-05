import AppointmentRateAreaChart from '@components/AppointmentsRateAreaChart';
import { useMemo } from 'react';
import DateRangePicker from 'shared/src/components/DateRangePicker';
import styled from 'styled-components';
import { parseDate } from '@internationalized/date';

const AppointmentsRate = ({ appointments, dates, onChangeDates }) => {
    const series = useMemo(() => {
        return [
            {
                name: 'Appointments count',
                data: appointments?.entries?.map((appointment) => appointment.value),
            },
        ];
    }, [appointments]);
    const categories = useMemo(() => {
        return appointments?.entries?.map((appointment) => appointment.date);
    }, [appointments]);

    return (
        <ChartWrapper>
            <DateRangePicker
                defaultValue={{
                    start: parseDate(dates.start),
                    end: parseDate(dates.end),
                }}
                onChange={onChangeDates}
            />
            <AppointmentRateAreaChart series={series} categories={categories} />
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

export default AppointmentsRate;
