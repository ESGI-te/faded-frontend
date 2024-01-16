import { useQuery } from '@tanstack/react-query';
import { getAppointment } from '@/api/api';
import appointmentKeys from 'shared/src/queries/appointment/appointmentKeys';

const queryFn = async ({ queryKey: [{ appointmentId }] }) => {
    const data = await getAppointment(appointmentId);

    return data;
};

const useAppointmentQuery = (appointmentId) => {
    return useQuery({
        queryKey: appointmentKeys.detailById(appointmentId),
        queryFn,
        enabled: !!appointmentId,
    });
};

export default useAppointmentQuery;
