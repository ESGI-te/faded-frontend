import * as yup from 'yup';

const useResetPasswordFormSchema = () => {
    return yup.object({
        plainPassword: yup.string().min(6).required(),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('plainPassword'), null], 'Passwords must match')
            .required(),
    });
};

export default useResetPasswordFormSchema;
