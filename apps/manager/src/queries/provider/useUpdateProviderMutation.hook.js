import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProvider } from '../../api';
import providerKeys from './providerKeys';

const mutationFn = async ({ providerId, provider }) => {
    const data = await updateProvider(providerId, provider);
    return data;
};

const useUpdateProviderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data, { providerId }) => {
            queryClient.invalidateQueries({
                queryKey: providerKeys.detailById(providerId),
            });
        },
    });
};

export default useUpdateProviderMutation;
