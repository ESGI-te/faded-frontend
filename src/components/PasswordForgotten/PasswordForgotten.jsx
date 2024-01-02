import PasswordForgottenForm from '@components/PasswordForgottenForm';
import useCreateResetPasswordTokenMutation from '@queries/resetPasswordToken/useCreateResetPasswordTokenMutation.hook';
import { useState } from 'react';

const PasswordForgotten = () => {
    const resetPassword = useCreateResetPasswordTokenMutation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = (data) => {
        resetPassword.mutate(data, {
            onSuccess: () => {
                setIsError(false);
                setIsSuccess(true);
            },
            onError: (error) => {
                setIsSuccess(false);
                setIsError(error);
            },
        });
    };
    return (
        <PasswordForgottenForm
            onSubmit={onSubmit}
            isLoading={resetPassword.isLoading}
            isSuccess={isSuccess}
            isError={isError}
        />
    );
};

export default PasswordForgotten;
