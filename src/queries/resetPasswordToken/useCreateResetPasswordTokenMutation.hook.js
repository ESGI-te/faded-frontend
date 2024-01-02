import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@api/api';

const mutationFn = async (email) => {
    const data = await resetPassword(email);
    return data;
};

const useCreateResetPasswordTokenMutation = () => {
    return useMutation({
        mutationFn,
    });
};

export default useCreateResetPasswordTokenMutation;
