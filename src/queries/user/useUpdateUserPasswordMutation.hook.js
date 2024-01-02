import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '@api/api';

const mutationFn = async ({ userId, user }) => {
    const data = await updateUserPassword(userId, user);
    return data;
};

const useUpdateUserPasswordMutation = () => {
    return useMutation({
        mutationFn,
    });
};

export default useUpdateUserPasswordMutation;
