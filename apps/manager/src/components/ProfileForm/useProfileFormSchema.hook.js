import { FORM_VALIDATION_MESSAGE } from 'shared/src/utils/validationMessages';
import * as yup from 'yup';
import { useIntl } from 'react-intl';
import { LOCALES } from '@contexts/IntlProvider';

const useProfileFormSchema = () => {
    const intl = useIntl();

    return yup.object({
        firstName: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        lastName: yup.string().required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
        loale: yup
            .string()
            .oneOf(Object.values(LOCALES))
            .required(intl.formatMessage(FORM_VALIDATION_MESSAGE.required)),
    });
};

export default useProfileFormSchema;
