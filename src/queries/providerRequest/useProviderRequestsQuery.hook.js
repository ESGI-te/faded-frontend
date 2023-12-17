import { useQuery } from '@tanstack/react-query';
import { getProviderRequests } from '@/api/api';
import providerRequestKey from '@/queries/providerRequest/providerRequestKeys';

const queryFn = async ({ queryKey: [{ token, page , perPage }] }) => {
    const data = await getProviderRequests({ token, page , perPage });
    return data;
};

const useProviderRequestsQuery = ({token, page , perPage} = {}) => {
    return useQuery({
        queryKey: providerRequestKey.list({token,page,perPage}),
        queryFn,
        enabled: !!token,
    });
};

export default useProviderRequestsQuery;