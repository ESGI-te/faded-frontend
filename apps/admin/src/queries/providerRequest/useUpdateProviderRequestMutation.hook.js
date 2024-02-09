import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProviderRequest } from '@api/api';
import providerRequestKeys from './providerRequestKeys';

const mutationFn = async ({ providerRequestId, providerRequest }) => {
    const data = await updateProviderRequest(providerRequestId, providerRequest);
    return data;
};

const useUpdateProviderRequestMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: providerRequestKeys.list() });
        },
    });
};

export default useUpdateProviderRequestMutation;
