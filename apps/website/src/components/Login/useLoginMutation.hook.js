import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from 'shared/src/api';
import userKeys from 'shared/src/queries/user/userKeys';

const mutationFn = async (credentials) => {
    const data = await login(credentials);
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
