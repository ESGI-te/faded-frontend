import * as yup from 'yup';

export const searchProviderFormSchema = yup.object({
    service: yup.string(),
    localisation: yup.string().min(6),
});
