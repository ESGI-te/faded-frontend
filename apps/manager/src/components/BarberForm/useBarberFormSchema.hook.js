import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';
import * as yup from 'yup';
import { useIntl } from 'react-intl';

const useBarberFormSchema = () => {
    const intl = useIntl();
    const daySchema = yup.object({
        open: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        close: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        isOpen: yup.boolean().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
    });
    return yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        planning: yup.object({
            monday: daySchema,
            tuesday: daySchema,
            wednesday: daySchema,
            thursday: daySchema,
            friday: daySchema,
            saturday: daySchema,
            sunday: daySchema,
        }),
    });
};

export default useBarberFormSchema;
