import { useQuery } from '@tanstack/react-query';
import { getEstablishmentAppointments } from '@/api/api';
import appointmentKeys from '@/queries/appointment/appointmentKeys';

const queryFn = async ({ queryKey: [{ establishmentId }] }) => {
    const data = await getEstablishmentAppointments(establishmentId);

    return data;
};

const useEstablishmentAppointmentsQuery = (establishmentId, { page, perPage } = {}) => {
    return useQuery({
        queryKey: appointmentKeys.listByEstablishmentId(establishmentId, { page, perPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentAppointmentsQuery;
