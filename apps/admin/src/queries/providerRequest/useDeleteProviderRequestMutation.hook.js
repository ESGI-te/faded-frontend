import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProviderRequest } from '@api/api';
import providerRequestKeys from './providerRequestKeys';

const mutationFn = async (providerRequestId) => {
    const data = await deleteProviderRequest(providerRequestId);
    return data;
};

const useDeleteProviderRequestMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) =>
            queryClient.invalidateQueries({
                queryKey: providerRequestKeys.list(),
            }),
    });
};

export default useDeleteProviderRequestMutation;
