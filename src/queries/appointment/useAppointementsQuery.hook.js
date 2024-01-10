import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '@/api/api';
import appointmentKeys from '@/queries/appointment/appointmentKeys';

const queryFn = async ({ queryKey: [{ page, perPage, entity, scope, ...q }] }) => {
    const data = await getAppointments({ page, perPage, ...q });

    return data;
};

const useAppointmentsQuery = ({ page, perPage, ...q } = {}) => {
    return useQuery({
        queryKey: appointmentKeys.list({ page, perPage, ...q }),
        queryFn,
    });
};

export default useAppointmentsQuery;
