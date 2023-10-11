import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '@api/api';
import userKeys from './userKeys';

const mutationFn = async (formData) => {
    const { data } = await register(formData);
    return data;
};

const useCreateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: (data) =>
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(),
            }),
    });
};

export default useCreateUserMutation;
