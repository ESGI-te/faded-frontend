import { useQuery } from '@tanstack/react-query';
import { getAppointmentRate } from '@api/api';

const queryFn = async ({ queryKey: [{ start, end, establishmentId }] }) => {
    const data = await getAppointmentRate({ start, end, establishmentId });

    return data;
};

const useAppointmentsRateQuery = ({ start, end, establishmentId }) => {
    return useQuery({
        queryKey: [
            { entity: 'statistics', scope: 'appointmentsRate', start, end, establishmentId },
        ],
        queryFn,
        enabled: !!start && !!end,
    });
};

export default useAppointmentsRateQuery;
