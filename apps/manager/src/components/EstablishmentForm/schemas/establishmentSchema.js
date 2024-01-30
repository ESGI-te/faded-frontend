import * as yup from 'yup';
import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const getEstablishmentFormSchema = (intl) => {
    const daySchema = yup
        .object({
            open: yup.string(),
            close: yup.string(),
            isOpen: yup.boolean(),
        })
        .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required));

    return yup.object({
        information: yup.object({
            name: yup
                .string()
                .min(2, intl.formatMessage(FORM_VALIDATION_MESSAGE.minLength, { min: 2 }))
                .max(140, intl.formatMessage(FORM_VALIDATION_MESSAGE.maxLength, { max: 140 }))
                .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
            address: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
            email: yup.string().email(intl.formatMessage(FORM_VALIDATION_MESSAGE.isEmail)),
            phone: yup
                .string()
                .matches(phoneRegExp, intl.formatMessage(FORM_VALIDATION_MESSAGE.isPhone))
                .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        }),
        planning: yup.object({
            monday: daySchema,
            tuesday: daySchema,
            wednesday: daySchema,
            thursday: daySchema,
            friday: daySchema,
            saturday: daySchema,
            sunday: daySchema,
        }),
        services: yup
            .array()
            .of(
                yup.object({
                    name: yup
                        .string()
                        .min(2, intl.formatMessage(FORM_VALIDATION_MESSAGE.minLength, { min: 2 }))
                        .max(
                            140,
                            intl.formatMessage(FORM_VALIDATION_MESSAGE.maxLength, { max: 140 }),
                        )
                        .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
                    price: yup
                        .number()
                        .min(0, intl.formatMessage(FORM_VALIDATION_MESSAGE.min, { min: 0 }))
                        .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
                    duration: yup
                        .number()
                        .min(0, intl.formatMessage(FORM_VALIDATION_MESSAGE.min, { min: 0 }))
                        .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
                    category: yup
                        .string()
                        .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
                }),
            )
            .min(1, intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        barbers: yup
            .array()
            .of(yup.object({}))
            .min(1, intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        images: yup.array().of(yup.object({})),
    });
};

export default getEstablishmentFormSchema;
