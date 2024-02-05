import { useQuery } from '@tanstack/react-query';
import { getGlobalIndicators } from '@api/api';

const queryFn = async ({ queryKey: [{ establishmentId }] }) => {
    const data = await getGlobalIndicators(establishmentId);

    return data;
};

const useGlobalIndicatorsQuery = (establishmentId) => {
    return useQuery({
        queryKey: [{ entity: 'statistics', scope: 'globalIndicators', establishmentId }],
        queryFn,
    });
};

export default useGlobalIndicatorsQuery;
