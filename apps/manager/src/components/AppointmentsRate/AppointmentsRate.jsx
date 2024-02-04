import AppointmentRateAreaChart from '@components/AppointmentsRateAreaChart';
import useAppointmentsRateQuery from '@queries/stats/useAppointmentsRateQuery.hook';
import { useMemo, useState } from 'react';
import DateRangePicker from 'shared/src/components/DateRangePicker';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { parseDate } from '@internationalized/date';

const AppointmentsRate = () => {
    const { establishmentId } = useParams();
    const [dates, setDates] = useState({
        start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD'),
    });
    const { data: appointments, isLoading } = useAppointmentsRateQuery({
        ...dates,
        establishmentId,
    });
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

    if (isLoading) return <p>Loading...</p>;

    return (
        <ChartWrapper>
            <DateRangePicker
                defaultValue={{
                    start: parseDate(dates.start),
                    end: parseDate(dates.end),
                }}
                onChange={setDates}
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
