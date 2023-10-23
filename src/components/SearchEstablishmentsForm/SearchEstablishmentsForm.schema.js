import * as yup from 'yup';

export const searchEstablishmentsSchema = yup.object({
    service: yup.string(),
    address: yup.string(),
});
