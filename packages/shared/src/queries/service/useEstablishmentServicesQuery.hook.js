import { useQuery } from '@tanstack/react-query';
import { getEstablishmentServices } from '@/api/api';
import serviceKeys from '@/queries/service/serviceKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, perPage }] }) => {
    const data = await getEstablishmentServices(establishmentId, { page, perPage });

    return data;
};

const useEstablishmentServicesQuery = (establishmentId, { page, perPage } = {}) => {
    return useQuery({
        queryKey: serviceKeys.listByEstablishmentId({ establishmentId, page, perPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentServicesQuery;
