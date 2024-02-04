import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProviderImage } from '../../api';
import providerKeys from './providerKeys';

const mutationFn = async ({ providerId, image }) => {
    const data = await updateProviderImage(providerId, image);
    return data;
};

const useUpdateProviderImageMutation = () => {
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

export default useUpdateProviderImageMutation;
