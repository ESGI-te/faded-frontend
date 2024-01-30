import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';
import * as yup from 'yup';

export const getEstablishmentServiceSchema = (intl) => {
    return yup.object({
        name: yup
            .string()
            .min(2, intl.formatMessage(FORM_VALIDATION_MESSAGE.minLength, { min: 2 }))
            .max(140, intl.formatMessage(FORM_VALIDATION_MESSAGE.maxLength, { max: 140 }))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        price: yup
            .number()
            .min(0, intl.formatMessage(FORM_VALIDATION_MESSAGE.min, { min: 0 }))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        duration: yup
            .number()
            .min(0, intl.formatMessage(FORM_VALIDATION_MESSAGE.min, { min: 0 }))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        category: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
    });
};
