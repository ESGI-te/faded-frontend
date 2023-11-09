import { useQuery } from '@tanstack/react-query';
import { getEstablishmentServices } from '@/api/api';
import serviceKeys from '@/queries/service/serviceKeys';

const queryFn = async ({ queryKey: [{ establishmentId, page, itemsPerPage }] }) => {
    const data = await getEstablishmentServices(establishmentId, { page, itemsPerPage });

    return data;
};

const useEstablishmentServicesQuery = (establishmentId, { page, itemsPerPage } = {}) => {
    return useQuery({
        queryKey: serviceKeys.listByEstablishmentId({ establishmentId, page, itemsPerPage }),
        queryFn,
        enabled: !!establishmentId,
    });
};

export default useEstablishmentServicesQuery;
