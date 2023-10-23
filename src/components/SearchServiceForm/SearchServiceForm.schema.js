import * as yup from 'yup';

export const searchServiceFormSchema = yup.object({
    service: yup.string(),
    localisation: yup.string().min(6),
});
