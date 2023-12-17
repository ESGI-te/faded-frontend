import { useMutation } from '@tanstack/react-query';
import { createProviderRequest } from '@api/api';

const mutationFn = async (formData) => {
    const data = await createProviderRequest(formData);
    return data;
};

const useCreateProviderRequestMutation = () => {
    return useMutation({
        mutationFn,
    });
};

export default useCreateProviderRequestMutation;
