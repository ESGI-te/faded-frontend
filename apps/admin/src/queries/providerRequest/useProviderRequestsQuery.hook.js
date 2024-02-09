import { useQuery } from '@tanstack/react-query';
import { getProviderRequests } from '@api/api';

const queryFn = async () => {
    const data = await getProviderRequests();

    return data;
};

const useProviderRequestQuery = () => {
    return useQuery({
        queryKey: [{ entity: 'providerRequest', scope: 'adminIndicators'}],
        queryFn,
    });
};

export default useProviderRequestQuery;
