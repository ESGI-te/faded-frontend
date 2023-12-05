import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '@/api/api';
import appointmentKeys from '@/queries/appointment/appointmentKeys';

const queryFn = async () => {
    const data = await getAppointments();

    return data;
};

const useAppointmentsQuery = ({ page, perPage } = {}) => {
    return useQuery({
        queryKey: appointmentKeys.list({ page, perPage }),
        queryFn,
    });
};

export default useAppointmentsQuery;
