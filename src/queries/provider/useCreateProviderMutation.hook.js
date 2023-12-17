import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProvider } from '@api/api';

const mutationFn = async (provider) => {
    const data = await createProvider(provider);
    return data;
};

const useCreateProviderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn
    });
};

export default useCreateProviderMutation;
