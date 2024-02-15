import * as yup from 'yup';

export const searchEstablishmentsFormSchema = yup.object({
    service: yup.string(),
    address: yup.string().required(),
});
