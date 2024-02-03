import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';
import * as yup from 'yup';
import { useIntl } from 'react-intl';

const useProfileFormSchema = () => {
    const intl = useIntl();

    return yup.object({
        email: yup.string().email().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        currentPassword: yup
            .string()
            .min(6, intl.formatMessage(FORM_VALIDATION_MESSAGE.minLength, { min: 6 }))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
    });
};

export default useProfileFormSchema;
