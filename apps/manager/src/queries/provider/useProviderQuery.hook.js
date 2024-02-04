import { useQuery } from '@tanstack/react-query';
import { getProvider } from '@api/api';
import providerKeys from './providerKeys';

const queryFn = async ({ queryKey: [{ providerId }] }) => {
    const data = await getProvider(providerId);

    return data;
};

const useProviderQuery = (providerId) => {
    return useQuery({
        queryKey: providerKeys.detailById(providerId),
        queryFn,
        enabled: !!providerId,
    });
};

export default useProviderQuery;
