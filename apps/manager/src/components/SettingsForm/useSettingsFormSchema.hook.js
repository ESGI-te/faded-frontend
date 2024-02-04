import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';
import * as yup from 'yup';
import { useIntl } from 'react-intl';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const useSettingsFormSchema = () => {
    const intl = useIntl();

    return yup.object({
        name: yup
            .string()
            .min(2, intl.formatMessage(FORM_VALIDATION_MESSAGE.minLength, { min: 2 }))
            .max(140, intl.formatMessage(FORM_VALIDATION_MESSAGE.maxLength, { max: 140 }))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        address: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        phone: yup
            .string()
            .matches(phoneRegExp, intl.formatMessage(FORM_VALIDATION_MESSAGE.isPhone))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        email: yup.string().email(intl.formatMessage(FORM_VALIDATION_MESSAGE.isEmail)),
    });
};

export default useSettingsFormSchema;
