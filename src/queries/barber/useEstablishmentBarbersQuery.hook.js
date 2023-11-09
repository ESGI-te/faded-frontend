import { useQuery } from '@tanstack/react-query';
import { getEstablishmentBarbers } from '@/api/api';
import barberKeys from '@/queries/barber/barberKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, itemsPerPage }] }) => {
    const data = await getEstablishmentBarbers(establishmentId, { page, itemsPerPage });

    return data;
};

const useEstablishmentBarbersQuery = (establishmentId, { page, itemsPerPage } = {}) => {
    return useQuery({
        queryKey: barberKeys.listByEstablishmentId({ establishmentId, page, itemsPerPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentBarbersQuery;
