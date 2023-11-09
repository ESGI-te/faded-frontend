import { useQuery } from '@tanstack/react-query';
import { getEstablishmentOpeningHours } from '@/api/api';
import openingHoursKeys from '@/queries/openingHours/openingHoursKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, itemsPerPage }] }) => {
    const data = await getEstablishmentOpeningHours(establishmentId, { page, itemsPerPage });

    return data;
};

const useEstablishmentOpeningHoursQuery = (establishmentId, { page, itemsPerPage } = {}) => {
    return useQuery({
        queryKey: openingHoursKeys.listByEstablishmentId({ establishmentId, page, itemsPerPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentOpeningHoursQuery;
