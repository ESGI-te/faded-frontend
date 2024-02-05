import { useQuery } from '@tanstack/react-query';
import { getDailyIndicators } from '@api/api';

const queryFn = async ({ queryKey: [{ establishmentId }] }) => {
    const data = await getDailyIndicators(establishmentId);

    return data;
};

const useDailyIndicatorsQuery = (establishmentId) => {
    return useQuery({
        queryKey: [{ entity: 'statistics', scope: 'dailyIndicators', establishmentId }],
        queryFn,
    });
};

export default useDailyIndicatorsQuery;
