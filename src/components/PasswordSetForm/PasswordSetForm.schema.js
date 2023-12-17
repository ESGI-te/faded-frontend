import * as yup from 'yup';

export const passwordSetSchema = yup.object({
    password: yup.string().min(6).required(),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required(),
});