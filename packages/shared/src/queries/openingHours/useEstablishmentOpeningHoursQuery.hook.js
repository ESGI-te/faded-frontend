import { useQuery } from '@tanstack/react-query';
import { getEstablishmentOpeningHours } from '@/api/api';
import openingHoursKeys from '@/queries/openingHours/openingHoursKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, perPage }] }) => {
    const data = await getEstablishmentOpeningHours(establishmentId, { page, perPage });

    return data;
};

const useEstablishmentOpeningHoursQuery = (establishmentId, { page, perPage } = {}) => {
    return useQuery({
        queryKey: openingHoursKeys.listByEstablishmentId({ establishmentId, page, perPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentOpeningHoursQuery;
