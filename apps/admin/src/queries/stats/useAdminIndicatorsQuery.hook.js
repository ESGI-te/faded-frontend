import { useQuery } from '@tanstack/react-query';
import { getAdminIndicators } from '@api/api';

const queryFn = async () => {
    const data = await getAdminIndicators();

    return data;
};

const useAdminIndicatorsQuery = () => {
    return useQuery({
        queryKey: [{ entity: 'statistics', scope: 'adminIndicators'}],
        queryFn,
    });
};

export default useAdminIndicatorsQuery;
