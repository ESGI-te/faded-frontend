import { useEffect, useState } from 'react';
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
    const [data, setData] = useState();

    useEffect(() => {
        if (
            resetPasswordTokens.isError ||
            (!resetPasswordTokens.data && !resetPasswordTokens.isRefetching)
        )
            return;

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
    }, [
        resetPasswordTokens.data,
        resetPasswordTokens.isError,
        resetPasswordTokens.isRefetching,
        data,
    ]);

    const handleResetPassword = async ({ passwordConfirmation, ...formData }) => {
        if (!token) return;
        setData(formData);
        await resetPasswordTokens.refetch({ throwOnError: true });
    };
    return (
        <ResetPasswordForm
            onSubmit={handleResetPassword}
            isLoading={resetPasswordTokens.isLoading || updateUserPassword.isLoading}
        />
    );
};

export default ResetPassword;
