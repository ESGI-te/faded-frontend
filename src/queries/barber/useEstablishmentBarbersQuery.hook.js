import { useQuery } from '@tanstack/react-query';
import { getEstablishmentBarbers } from '@/api/api';
import barberKeys from '@/queries/barber/barberKeys';

const queryFn = async ({ queryKey: [{ establishmentId }] }) => {
    const data = await getEstablishmentBarbers(establishmentId);

    return data;
};

const useEstablishmentBarbersQuery = (establishmentId) => {
    return useQuery({
        queryKey: barberKeys.listByEstablishmentId(establishmentId),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentBarbersQuery;
