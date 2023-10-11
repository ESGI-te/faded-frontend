import * as yup from 'yup';

export const registerFormSchema = yup.object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().min(6).required(),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required(),
});
