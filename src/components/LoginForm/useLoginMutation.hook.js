import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@api/api';
import userKeys from '@queries/user/userKeys';

const mutationFn = async (formData) => {
    const { data } = await login(formData);
    return data;
};

const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: userKeys.detail(),
            }),
    });
};

export default useLoginMutation;
