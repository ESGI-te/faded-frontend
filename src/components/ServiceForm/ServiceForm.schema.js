import * as yup from 'yup';

export const serviceFormSchema = yup.object({
    service: yup.string(),
    localisation: yup.string().min(6),
});
