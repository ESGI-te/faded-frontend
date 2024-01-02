import * as yup from 'yup';

export const registerFormSchema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    plainPassword: yup.string().min(6).required(),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('plainPassword'), null], 'Passwords must match')
        .required(),
});
