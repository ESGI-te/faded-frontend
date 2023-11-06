import * as yup from 'yup';

export const HomeSearchEstablishmentsFormSchema = yup.object({
    service: yup.string(),
    address: yup.string(),
});
