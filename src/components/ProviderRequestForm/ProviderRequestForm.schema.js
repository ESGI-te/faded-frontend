import * as yup from 'yup';

export const providerRequestFormSchema = yup.object({
    personalEmail: yup.string().email().required(),
    professionalEmail: yup.string().email().required(),
    phone: yup.string().required(),
    kbis: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    companyName: yup.string().required(),
    companyAddress: yup.string().required(),
});
