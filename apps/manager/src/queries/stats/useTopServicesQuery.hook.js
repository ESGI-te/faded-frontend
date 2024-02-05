import { useQuery } from '@tanstack/react-query';
import { getTopServices } from '@api/api';

const queryFn = async ({ queryKey: [{ establishmentId, limit }] }) => {
    const data = await getTopServices({ establishmentId, limit });

    return data;
};

const useTopServicesQuery = ({ establishmentId, limit = 10 } = {}) => {
    return useQuery({
        queryKey: [{ entity: 'statistics', scope: 'topServices', establishmentId, limit }],
        queryFn,
    });
};

export default useTopServicesQuery;
