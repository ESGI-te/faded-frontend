import ResetPasswordForm from '@components/ResetPasswordForm';
import useResetPasswordTokensQuery from 'shared/src/queries/resetPasswordToken/useResetPasswordTokensQuery.hook';
import useUpdateUserPasswordMutation from 'shared/src/queries/user/useUpdateUserPasswordMutation.hook';

import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const updateUserPassword = useUpdateUserPasswordMutation();
    const resetPasswordTokens = useResetPasswordTokensQuery(token);

    const handleResetPassword = async ({ passwordConfirmation, ...data }) => {
        if (!token) return;
        await resetPasswordTokens.refetch({ throwOnError: true });

        if (resetPasswordTokens.isError || !resetPasswordTokens.data) return;

        updateUserPassword.mutate(
            {
                userId: resetPasswordTokens.data.data?.[0]?.user.id,
                user: data,
            },
            {
                onSuccess: () => {
                    navigate('/login');
                },
            },
        );
    };

    return (
        <ResetPasswordForm
            onSubmit={handleResetPassword}
            isLoading={resetPasswordTokens.isLoading || updateUserPassword.isLoading}
        />
    );
};

export default ResetPassword;
